import { useRef } from 'react'
import { useScroll, useTransform } from 'motion/react'
import { finalCta } from '../content/site'
import { Lotus } from './Lotus'
import { Reveal } from './Reveal'

/** Fechamento: a lótus desabrocha conforme a pessoa chega ao convite (ligado ao scroll). */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 0.6'] })
  const bloom = useTransform(scrollYProgress, [0.2, 1], [0, 1])

  return (
    <section ref={ref} aria-labelledby="cta-title" className="relative overflow-hidden bg-tint">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 py-20 text-center md:py-28">
        <Lotus className="w-32 text-peach md:w-40" strokeWidth={1.6} bloom={bloom} />
        <Reveal className="flex flex-col items-center gap-6">
          <h2 id="cta-title" className="text-[clamp(1.6rem,3.6vw,2.4rem)] font-light">{finalCta.title}</h2>
          <p className="text-lg text-ink-2">{finalCta.text}</p>
          <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <a href={finalCta.primary.href} className="btn btn-primary">{finalCta.primary.label}</a>
            <a href={finalCta.secondary.href} className="btn btn-secondary">{finalCta.secondary.label}</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
