import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { easeInOutCubic, prefersReducedMotion } from './motion'

/**
 * Scroll suave da página (Lenis) + navegação por âncora.
 *
 * - Lenis só existe com movimento permitido. Com "reduzir movimento", a rolagem é a nativa e as
 *   âncoras saltam direto.
 * - Toque continua nativo (syncTouch desligado): o celular mantém a inércia do sistema.
 * - O deslocamento até a seção tem duração proporcional à distância e pode ser interrompido
 *   pela roda do mouse ou pelo toque (sem `lock`).
 */
let lenis: Lenis | null = null

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: true })
}

export function destroySmoothScroll() {
  lenis?.destroy()
  lenis = null
}

/** Menu aberto e outros diálogos: pausa o scroll suave (o overflow do body também é travado). */
export const stopScroll = () => lenis?.stop()
export const startScroll = () => lenis?.start()

const NAV_TARGET = 'nav:target'
const NAV_SETTLED = 'nav:settled'

/** Eventos para a navbar travar o indicador ativo na seção de destino durante o deslocamento. */
export const navEvents = { target: NAV_TARGET, settled: NAV_SETTLED }

function headerOffset() {
  const header = document.querySelector('header')
  // Para exatamente sob o menu: as seções já têm respiro interno, e uma folga mostraria a emenda da seção anterior.
  return header?.getBoundingClientRect().height ?? 0
}

/** Leva o foco para a seção de destino sem rolar de novo (leitores de tela anunciam o novo lugar). */
function focusTarget(el: HTMLElement) {
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

interface ScrollOptions {
  /** Salto direto: ativação por teclado, movimento reduzido ou troca de página. */
  immediate?: boolean
  focus?: boolean
}

export function scrollToId(id: string, { immediate = false, focus = true }: ScrollOptions = {}) {
  const el = document.getElementById(id)
  if (!el) return false
  const offset = -headerOffset()
  window.dispatchEvent(new CustomEvent(NAV_TARGET, { detail: id }))
  const done = () => {
    if (focus) focusTarget(el)
    window.dispatchEvent(new CustomEvent(NAV_SETTLED, { detail: id }))
  }

  if (lenis && !immediate) {
    const distance = Math.abs(el.getBoundingClientRect().top + offset)
    // ~0,6 s para seções vizinhas, até 1,4 s para atravessar a página inteira.
    const duration = Math.min(1.4, Math.max(0.6, 0.45 + distance / 4000))
    lenis.scrollTo(el, { offset, duration, easing: easeInOutCubic, onComplete: done })
  } else if (lenis) {
    lenis.resize() // a altura da página pode ter mudado (troca de página)
    lenis.scrollTo(el, { offset, immediate: true, force: true })
    done()
  } else {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'instant' })
    done()
  }
  return true
}

/**
 * Espera a seção existir (ex.: logo depois da troca de página) e posiciona direto nela.
 * Desiste em ~1,5 s se o alvo não aparecer.
 */
export function scrollToIdWhenReady(id: string) {
  let frames = 0
  const tryScroll = () => {
    if (document.getElementById(id)) {
      requestAnimationFrame(() => scrollToId(id, { immediate: true }))
      return
    }
    if (++frames < 90) requestAnimationFrame(tryScroll)
  }
  requestAnimationFrame(tryScroll)
}

/**
 * Intercepta cliques em links `#secao` da página.
 * `#/privacidade` (rota) e alvos que não estão na tela seguem o comportamento padrão.
 */
export function bindAnchorNavigation() {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
    if (!a) return
    const href = a.getAttribute('href') ?? ''
    if (href.length < 2 || href.startsWith('#/')) return
    const id = decodeURIComponent(href.slice(1))
    if (!document.getElementById(id)) return
    e.preventDefault()
    if (window.location.hash !== href) history.pushState(null, '', href)
    // Ativação por teclado (detail === 0) nunca anima. Dois quadros: deixa o menu mobile fechar antes de medir.
    const immediate = e.detail === 0 || a.classList.contains('skip-link')
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id, { immediate })))
  }
  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}
