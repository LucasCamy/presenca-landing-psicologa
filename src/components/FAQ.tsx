import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { faq } from '../content/site'
import { ease } from '../lib/motion'
import { SectionHeader } from './SectionHeader'

/** "+" que vira "−": a barra vertical recolhe (transição CSS, interrompível ao clicar rápido). */
function PlusMinus({ open, instant }: { open: boolean; instant: boolean }) {
  return (
    <span aria-hidden className="relative inline-flex size-6 shrink-0 items-center justify-center text-accent">
      <span className="absolute h-[1.5px] w-4 rounded bg-current" />
      <span className={`absolute h-4 w-[1.5px] rounded bg-current transition-transform ease-[var(--ease-out)] ${instant ? 'duration-0' : 'duration-[var(--dur-3)]'} ${open ? 'scale-y-0' : 'scale-y-100'}`} />
    </span>
  )
}

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  // Ativação por teclado (Enter/Espaço chega com detail === 0) não anima.
  const [viaKeyboard, setViaKeyboard] = useState(false)
  const instant = viaKeyboard ? { duration: 0 } : null
  const uid = useId()
  const panelId = `${uid}-panel`
  const buttonId = `${uid}-button`
  return (
    <div className="border-b border-line">
      <h3 className="m-0 text-base">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={(e) => {
            setViaKeyboard(e.detail === 0)
            setOpen((v) => !v)
          }}
          className="group flex min-h-14 w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-5 text-left font-display text-lg font-normal text-ink transition-colors duration-[var(--dur-2)] hover:text-accent md:text-xl"
        >
          <span>{q}</span>
          <PlusMinus open={open} instant={viaKeyboard} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: instant ?? { height: { duration: 0.38, ease: ease.out }, opacity: { duration: 0.3, delay: 0.06 } } }}
            exit={{ height: 0, opacity: 0, transition: instant ?? { height: { duration: 0.26, ease: ease.inOut }, opacity: { duration: 0.14 } } }}
          >
            <motion.p
              className="max-w-2xl pb-6 text-ink-2"
              initial={{ y: -4, filter: 'blur(3px)' }}
              animate={{ y: 0, filter: 'blur(0px)', transition: instant ?? { duration: 0.34, ease: ease.out, delay: 0.06 } }}
              exit={{ y: -2, transition: instant ?? { duration: 0.14 } }}
            >
              {a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  return (
    <section id="duvidas" aria-labelledby="faq-title" className="bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <SectionHeader id="faq-title" title={faq.title} intro={faq.intro} />
        <div className="border-t border-line">
          {faq.items.map((item, i) => (
            <FaqItem key={item.q} q={item.q} a={item.a} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
