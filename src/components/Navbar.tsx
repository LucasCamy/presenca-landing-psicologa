import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { nav, professional } from '../content/site'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    firstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-300 ${scrolled || open ? 'border-line bg-bg/95 backdrop-blur' : 'border-transparent bg-bg'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 md:px-10 lg:py-4">
        <a href="#inicio" className="font-serif text-xl leading-tight text-ink no-underline">
          {professional.fullName}
          <span className="block font-sans text-xs text-ink-2">{professional.title} · {professional.crp}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.9375rem] text-ink no-underline transition-colors hover:text-accent hover:underline hover:underline-offset-4">{l.label}</a>
          ))}
          <a href={nav.cta.href} className="btn btn-primary !min-h-11 !px-5">{nav.cta.label}</a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex size-12 items-center justify-center rounded-full border border-line text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Menu mobile" className="border-t border-line bg-surface px-5 pb-8 pt-4 lg:hidden">
          <ul className="m-0 flex list-none flex-col p-0">
            {nav.links.map((l, i) => (
              <li key={l.href}>
                <a ref={i === 0 ? firstLinkRef : undefined} href={l.href} onClick={() => setOpen(false)} className="block py-3.5 font-serif text-2xl text-ink no-underline">{l.label}</a>
              </li>
            ))}
          </ul>
          <a href={nav.cta.href} onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-full">{nav.cta.label}<ArrowRight aria-hidden size={18} /></a>
        </nav>
      )}
    </header>
  )
}
