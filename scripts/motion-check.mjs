/**
 * Conferência de motion e navegação com Playwright (usa o Edge instalado; não baixa navegador).
 *
 *   npm run dev            (em outro terminal)
 *   npm run check:motion   [BASE_URL=http://localhost:5173] [SHOTS=./motion-shots]
 *
 * Roda desktop e celular com `prefers-reduced-motion` em "no-preference" e "reduce", conforme a
 * matriz de validação do agent-project-kit.
 */
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'

const BASE = process.env.BASE_URL ?? 'http://localhost:5173'
const SHOTS = process.env.SHOTS ?? './motion-shots'
mkdirSync(SHOTS, { recursive: true })

const results = []
const check = (scenario, name, ok, info = '') => results.push({ scenario, name, ok, info })

async function sampleScroll(page, ms = 1600) {
  // Amostra a posição a cada quadro para distinguir deslocamento suave de salto.
  return page.evaluate(
    (ms) =>
      new Promise((resolve) => {
        const ys = []
        const t0 = performance.now()
        const tick = () => {
          ys.push(Math.round(window.scrollY))
          if (performance.now() - t0 < ms) requestAnimationFrame(tick)
          else resolve(ys)
        }
        requestAnimationFrame(tick)
      }),
    ms,
  )
}

async function landing(page, id) {
  return page.evaluate((id) => {
    const header = document.querySelector('header').getBoundingClientRect().height
    const top = document.getElementById(id).getBoundingClientRect().top
    return { gap: Math.round(top - header), focused: document.activeElement?.id ?? '', hash: location.hash }
  }, id)
}

async function run(browser, { device, reduced }) {
  const scenario = `${device}/${reduced}`
  const mobile = device === 'mobile'
  const context = await browser.newContext({
    viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    reducedMotion: reduced,
    hasTouch: mobile,
  })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  const lenisOn = await page.evaluate(() => document.documentElement.classList.contains('lenis'))
  check(scenario, 'scroll suave (Lenis) só com movimento permitido', lenisOn === (reduced === 'no-preference'), `lenis=${lenisOn}`)

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  check(scenario, 'sem overflow horizontal', overflow <= 0, `${overflow}px`)

  // 1) Clique no menu → Contato
  if (mobile) {
    await page.getByRole('button', { name: 'Abrir menu' }).click()
    await page.waitForTimeout(450)
    const locked = await page.evaluate(() => document.body.style.overflow === 'hidden')
    check(scenario, 'menu mobile trava o scroll', locked)
    await page.screenshot({ path: `${SHOTS}/${device}-${reduced}-menu.png` })
    await page.locator('#menu-mobile').getByRole('link', { name: 'Contato' }).click()
  } else {
    await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Contato' }).click()
  }
  const ys = await sampleScroll(page)
  const distinct = new Set(ys).size
  const smooth = distinct > 12
  check(scenario, reduced === 'reduce' ? 'âncora salta direto (reduzido)' : 'âncora desliza (vários quadros)', reduced === 'reduce' ? !smooth : smooth, `${distinct} posições`)
  await page.waitForTimeout(400)
  const l1 = await landing(page, 'contato')
  check(scenario, 'para exatamente sob o menu fixo', Math.abs(l1.gap) <= 1, `folga ${l1.gap}px`)
  check(scenario, 'foco movido para a seção', l1.focused === 'contato', l1.focused)
  check(scenario, 'URL atualizada', l1.hash === '#contato', l1.hash)
  if (mobile) {
    const unlocked = await page.evaluate(() => document.body.style.overflow === '' && !document.getElementById('menu-mobile'))
    check(scenario, 'menu fecha e destrava o scroll', unlocked)
  } else {
    const current = await page.getByRole('navigation', { name: 'Principal' }).locator('a[aria-current="true"]').textContent()
    check(scenario, 'indicador ativo no destino', current?.trim() === 'Contato', current ?? 'nenhum')
  }
  await page.screenshot({ path: `${SHOTS}/${device}-${reduced}-contato.png` })

  // 2) Teclado: Enter num link nunca anima
  if (!mobile) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.waitForTimeout(300)
    await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Dúvidas' }).focus()
    await page.keyboard.press('Enter')
    const kys = await sampleScroll(page, 500)
    check(scenario, 'Enter no teclado salta sem animar', new Set(kys).size <= 3, `${new Set(kys).size} posições`)
    const l2 = await landing(page, 'duvidas')
    check(scenario, 'Enter: foco na seção Dúvidas', l2.focused === 'duvidas', l2.focused)

    // FAQ aberto pelo teclado aparece inteiro no quadro seguinte; pelo mouse, anima.
    // Fixa o botão pelo id: o seletor por aria-expanded mudaria de alvo depois do Enter.
    const kbPanel = await page.locator('#duvidas button[aria-expanded="false"]').first().getAttribute('aria-controls')
    const faqBtn = page.locator(`#duvidas button[aria-controls="${kbPanel}"]`)
    await faqBtn.focus()
    await page.keyboard.press('Enter')
    const kbHeights = await page.evaluate(
      (id) => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => {
        const el = document.getElementById(id)
        r({ h: el?.getBoundingClientRect().height ?? 0, full: el?.scrollHeight ?? 0 })
      }))),
      kbPanel,
    )
    check(scenario, 'FAQ pelo teclado abre sem animar', kbHeights.full > 0 && Math.abs(kbHeights.h - kbHeights.full) <= 1, `${Math.round(kbHeights.h)}/${kbHeights.full}px`)
    const mouseBtn = page.locator('#duvidas button[aria-expanded="false"]').first()
    const panelId = await mouseBtn.getAttribute('aria-controls')
    await mouseBtn.click()
    const mid = await page.evaluate((id) => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => {
      const el = document.getElementById(id)
      r({ h: el?.getBoundingClientRect().height ?? 0, full: el?.scrollHeight ?? 0 })
    }))), panelId)
    const animates = mid.h < mid.full - 1
    check(scenario, reduced === 'reduce' ? 'FAQ pelo mouse (reduzido)' : 'FAQ pelo mouse anima a abertura', reduced === 'reduce' ? true : animates, `${Math.round(mid.h)}/${mid.full}px no 2º quadro`)
  }

  // 3) Cenas ligadas ao scroll: medem o estado em dois pontos da rolagem
  const at = async (selector, block) => {
    await page.evaluate(({ selector, block }) => {
      const el = document.querySelector(selector)
      const r = el.getBoundingClientRect()
      const top = r.top + window.scrollY - window.innerHeight * block
      window.scrollTo({ top, behavior: 'instant' })
    }, { selector, block })
    await page.waitForTimeout(700)
  }
  const moving = reduced === 'no-preference'

  // Frase de acolhimento: palavras clareiam conforme a frase sobe
  await at('[aria-label="Acolhimento"]', 0.95)
  const wordsEarly = await page.evaluate(() => {
    const spans = [...document.querySelectorAll('[aria-label="Acolhimento"] p span')]
    return { n: spans.length, last: spans.length ? Number(getComputedStyle(spans[spans.length - 1]).opacity) : 1 }
  })
  await at('[aria-label="Acolhimento"]', 0.1)
  const wordsLate = await page.evaluate(() => {
    const spans = [...document.querySelectorAll('[aria-label="Acolhimento"] p span')]
    return spans.length ? Number(getComputedStyle(spans[spans.length - 1]).opacity) : 1
  })
  await page.screenshot({ path: `${SHOTS}/${device}-${reduced}-acolhimento.png` })
  check(scenario, moving ? 'frase revela palavra a palavra com o scroll' : 'frase inteira, sem efeito (reduzido)',
    moving ? wordsEarly.n > 3 && wordsEarly.last < 0.5 && wordsLate > 0.95 : wordsEarly.n === 0,
    `${wordsEarly.n} palavras, última ${wordsEarly.last.toFixed(2)} → ${wordsLate.toFixed(2)}`)

  // Linha do tempo: preenchimento acompanha o scroll
  const fillOf = () => page.evaluate((mobile) => {
    const lines = [...document.querySelectorAll('#como-funciona .bg-peach')].filter((e) => e.offsetParent)
    const m = new DOMMatrix(getComputedStyle(lines[0]).transform === 'none' ? undefined : getComputedStyle(lines[0]).transform)
    return mobile ? m.d : m.a
  }, mobile)
  await at('#como-funciona ol', 0.95)
  const fillEarly = await fillOf()
  // Medida final com o FIM da lista a 40% da tela (no celular as etapas empilhadas são altas).
  await page.evaluate(() => {
    const r = document.querySelector('#como-funciona ol').getBoundingClientRect()
    window.scrollTo({ top: r.bottom + window.scrollY - window.innerHeight * 0.4, behavior: 'instant' })
  })
  await page.waitForTimeout(700)
  const fillLate = await fillOf()
  await page.screenshot({ path: `${SHOTS}/${device}-${reduced}-timeline.png` })
  check(scenario, moving ? 'linha do tempo avança com o scroll' : 'linha do tempo completa (reduzido)',
    moving ? fillEarly < 0.2 && fillLate > 0.9 : fillEarly > 0.99, `${fillEarly.toFixed(2)} → ${fillLate.toFixed(2)}`)

  // Lótus do fechamento: pétala externa gira até abrir
  const petalAngle = () => page.evaluate(() => {
    const p = document.querySelectorAll('#cta-title')[0].closest('section').querySelectorAll('svg path')[3]
    const t = getComputedStyle(p).transform
    if (t === 'none') return 0
    const m = new DOMMatrix(t)
    return Math.round((Math.atan2(m.b, m.a) * 180) / Math.PI)
  })
  await at('#cta-title', 1.05)
  const bloomEarly = await petalAngle()
  await at('#cta-title', 0.45)
  const bloomLate = await petalAngle()
  await page.screenshot({ path: `${SHOTS}/${device}-${reduced}-lotus.png` })
  check(scenario, moving ? 'lótus desabrocha com o scroll' : 'lótus aberta e parada (reduzido)',
    moving ? Math.abs(bloomEarly) > 15 && Math.abs(bloomLate) < 4 : bloomEarly === 0 && bloomLate === 0, `${bloomEarly}° → ${bloomLate}°`)

  const overflow2 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  check(scenario, 'sem overflow com as cenas em movimento', overflow2 <= 0, `${overflow2}px`)

  // 4) Privacidade → volta para uma seção pelo menu
  await page.goto(`${BASE}/#/privacidade`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  if (mobile) {
    await page.getByRole('button', { name: 'Abrir menu' }).click()
    await page.waitForTimeout(400)
    await page.locator('#menu-mobile').getByRole('link', { name: 'Atendimento' }).click()
  } else {
    await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Atendimento' }).click()
  }
  await page.waitForTimeout(1200)
  const l3 = await landing(page, 'atendimento')
  check(scenario, 'da privacidade volta direto para a seção', Math.abs(l3.gap) <= 1, `folga ${l3.gap}px`)

  check(scenario, 'console sem erros', errors.length === 0, errors.slice(0, 2).join(' | '))
  await context.close()
}

const browser = await chromium.launch({ channel: 'msedge' })
try {
  for (const device of ['desktop', 'mobile'])
    for (const reduced of ['no-preference', 'reduce']) await run(browser, { device, reduced })
} finally {
  await browser.close()
}

let failed = 0
for (const r of results) {
  if (!r.ok) failed++
  console.log(`${r.ok ? '✓' : '✗'} [${r.scenario}] ${r.name}${r.info ? ` (${r.info})` : ''}`)
}
console.log(`\n${results.length - failed}/${results.length} verificações passaram. Capturas em ${SHOTS}`)
process.exit(failed ? 1 : 0)
