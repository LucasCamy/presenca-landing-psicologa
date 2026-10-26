import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { principles } from '../content/site'
import { useMotionAllowed } from '../lib/useMotionAllowed'
import { Reveal } from './Reveal'

/** Painel pêssego que "emerge" ao chegar: cresce de 94% para 100% e sobe um pouco, ligado ao scroll. */
export function PrinciplesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const allowed = useMotionAllowed()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.45'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])
  const y = useTransform(scrollYProgress, [0, 1], [48, 0])

  return (
    <section aria-labelledby="principios-title" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <motion.div ref={ref} className="rounded-[var(--radius-frame)] bg-tint px-6 py-12 md:px-14 md:py-16" style={allowed ? { scale, y } : undefined}>
        <h2 id="principios-title" className="mb-10 max-w-xl text-[clamp(1.6rem,3.2vw,2.25rem)] font-light">{principles.title}</h2>
        <ul className="m-0 grid list-none gap-x-12 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {principles.items.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={(i % 3) * 0.07} className="flex flex-col gap-1.5">
                <span aria-hidden className="mb-2 h-px w-10 bg-peach" />
                <h3 className="text-lg font-medium">{p.title}</h3>
                <p className="text-ink-2">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
