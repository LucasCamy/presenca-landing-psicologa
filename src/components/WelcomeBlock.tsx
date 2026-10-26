import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { welcome } from '../content/site'
import { useMotionAllowed } from '../lib/useMotionAllowed'
import { Lotus } from './Lotus'
import { Reveal } from './Reveal'
import { ScrollWords } from './ScrollWords'

/** Acolhimento: a frase é lida no ritmo do scroll; a lótus grande desliza e gira devagar ao fundo. */
export function WelcomeBlock() {
  const ref = useRef<HTMLElement>(null)
  const allowed = useMotionAllowed()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lotusY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const lotusRotate = useTransform(scrollYProgress, [0, 1], [-10, 10])
  const bloom = useTransform(scrollYProgress, [0.15, 0.5], [0, 1])

  return (
    <section ref={ref} aria-label="Acolhimento" className="relative overflow-hidden bg-bg-alt">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 hidden w-[30rem] -translate-y-1/2 md:block"
        style={allowed ? { y: lotusY, rotate: lotusRotate } : undefined}
      >
        <Lotus className="w-full text-peach-soft" strokeWidth={2} draw={false} />
      </motion.div>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 py-24 text-center md:py-36">
        <Lotus className="w-16 text-peach" draw={false} strokeWidth={1.4} bloom={bloom} />
        <ScrollWords text={welcome.quote} className="font-display text-[clamp(1.6rem,3.6vw,2.4rem)] font-light leading-snug text-display" />
        <Reveal>
          <p className="max-w-xl text-lg text-ink-2 md:text-xl">{welcome.body}</p>
        </Reveal>
      </div>
    </section>
  )
}
