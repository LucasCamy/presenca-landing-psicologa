import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useScroll } from 'motion/react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { nav, professional } from '../content/site'
import { ease, springQuick } from '../lib/motion'
import { startScroll, stopScroll } from '../lib/smoothScroll'
import { useActiveSection } from '../lib/useActiveSection'
import { useScrolled } from '../lib/useScrolled'

const sectionIds = nav.links.map((l) => l.href.slice(1))

/** Troca de ícone (menu ↔ fechar) com opacidade, escala e blur: a mudança de estado não passa despercebida. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.span
        key={open ? 'x' : 'menu'}
        className="inline-flex"
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(3px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.9, filter: 'blur(2px)', transition: { duration: 0.12 } }}
        transition={springQuick}
      >
        {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
      </motion.span>
    </AnimatePresence>
  )
}

export function Navbar() {
  const scrolled = useScrolled()
  // Progresso de leitura: orientação (quanto da página falta), não decoração.
  const { scrollYProgress } = useScroll()
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  // Menu aberto pelo teclado (Enter/Espaço) aparece sem animação.
  const [viaKeyboard, setViaKeyboard] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)

  // Menu mobile: foco no primeiro link, foco preso, Esc fecha e devolve o foco, scroll travado (body + Lenis).
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const focusables = () => [toggleRef.current, ...(panel?.querySelectorAll<HTMLElement>('a[href]') ?? [])].filter(Boolean) as HTMLElement[]
    panel?.querySelector<HTMLElement>('a[href]')?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    stopScroll()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const items = focusables()
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      startScroll()
    }
  }, [open])

  // Fecha o menu se a tela passar para o layout desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const raised = scrolled || open

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-[var(--dur-3)] ease-[var(--ease-out)] ${raised ? 'bg-bg/92 shadow-[0_1px_0_var(--line),0_10px_30px_-22px_rgba(154,91,58,0.45)] backdrop-blur-md' : 'bg-bg shadow-[0_1px_0_transparent]'}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 md:px-10 lg:py-4">
        <a href="#inicio" className="flex min-h-11 flex-col justify-center no-underline">
          <span className="wordmark text-[0.95rem] leading-tight">{professional.shortName}</span>
          <span className="text-xs text-ink-2">{professional.title}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex xl:gap-2">
          {nav.links.map((l) => {
            const isActive = active === l.href.slice(1)
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative px-3 py-2.5 text-[0.875rem] no-underline transition-colors duration-[var(--dur-2)] xl:text-[0.9375rem] ${isActive ? 'text-accent' : 'text-ink hover:text-accent'}`}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden
                    className="absolute inset-x-3 bottom-1 h-px bg-accent"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                  />
                )}
              </a>
            )
          })}
          <a href={nav.cta.href} className="btn btn-primary ml-3 !min-h-11 !px-5">{nav.cta.label}</a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex size-12 items-center justify-center rounded-full border border-line text-ink transition-colors duration-[var(--dur-2)] hover:bg-tint lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={(e) => {
            setViaKeyboard(e.detail === 0)
            setOpen((v) => !v)
          }}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      <motion.div
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-peach transition-opacity duration-[var(--dur-3)] ${scrolled && !open ? 'opacity-100' : 'opacity-0'}`}
        style={{ scaleX: scrollYProgress }}
      />

      <AnimatePresence>
        {open && (
          <motion.nav
            ref={panelRef}
            id="menu-mobile"
            aria-label="Menu mobile"
            data-lenis-prevent
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] origin-top overflow-y-auto border-t border-line bg-surface px-5 pb-8 pt-4 shadow-soft lg:hidden"
            initial={viaKeyboard ? false : { opacity: 0, y: -8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', duration: 0.4, bounce: 0 }, transitionEnd: { filter: 'none' } }}
            exit={{ opacity: 0, y: -4, transition: viaKeyboard ? { duration: 0 } : { duration: 0.16, ease: ease.out } }}
          >
            <motion.ul
              className="m-0 flex list-none flex-col p-0"
              initial={viaKeyboard ? false : "hidden"}
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.035, delayChildren: 0.04 } } }}
            >
              {nav.links.map((l) => (
                <motion.li key={l.href} variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: springQuick } }}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === l.href.slice(1) ? 'true' : undefined}
                    className="flex min-h-12 items-center font-display text-2xl font-light text-ink no-underline aria-[current=true]:text-accent"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <a href={nav.cta.href} onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-full">{nav.cta.label}<ArrowRight aria-hidden size={18} /></a>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Véu atrás do menu: fora do header, porque o backdrop-filter dele viraria o bloco de referência do fixed. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              aria-hidden
              className="fixed inset-0 z-30 bg-night/25 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.25, ease: ease.out } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              onClick={() => setOpen(false)}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  )
}
