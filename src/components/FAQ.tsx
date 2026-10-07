import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus } from 'lucide-react'
import { faq } from '../content/site'
import { SectionHeader } from './SectionHeader'

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
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
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-5 text-left font-serif text-xl text-ink md:text-[1.375rem]"
        >
          <span>{q}</span>
          <span aria-hidden className="shrink-0 text-accent">{open ? <Minus size={22} /> : <Plus size={22} />}</span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-ink-2">{a}</p>
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
        <SectionHeader id="faq-title" eyebrow={faq.eyebrow} title={faq.title} intro={faq.intro} />
        <div className="border-t border-line">
          {faq.items.map((item, i) => (
            <FaqItem key={item.q} q={item.q} a={item.a} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
