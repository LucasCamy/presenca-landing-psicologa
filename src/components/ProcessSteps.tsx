import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { process } from '../content/site'
import { useMotionAllowed } from '../lib/useMotionAllowed'
import { SectionHeader } from './SectionHeader'

interface StepProps {
  index: number
  total: number
  title: string
  text: string
  progress: MotionValue<number>
  allowed: boolean
}

/** Etapa acende quando a linha a alcança: círculo se preenche, texto ganha cor. */
function Step({ index, total, title, text, progress, allowed }: StepProps) {
  // A linha chega na etapa i em i/(total-1) do percurso.
  const at = total > 1 ? index / (total - 1) : 0
  const lit = useTransform(progress, [Math.max(0, at - 0.08), at + 0.02], [0, 1])
  const textOpacity = useTransform(lit, [0, 1], [0.4, 1])
  const dotScale = useTransform(lit, [0, 1], [0.4, 1])
  return (
    <li className="flex gap-5 lg:flex-col lg:gap-6">
      <span aria-hidden className="relative mt-0.5 inline-flex size-[1.15rem] shrink-0 items-center justify-center rounded-full border-2 border-peach bg-bg lg:mt-0">
        <motion.span className="size-2 rounded-full bg-accent" style={allowed ? { opacity: lit, scale: dotScale } : undefined} />
      </span>
      <motion.div className="flex flex-col gap-2" style={allowed ? { opacity: textOpacity } : undefined}>
        <h3 className="text-xl font-medium"><span className="sr-only">Etapa {index + 1}: </span>{title}</h3>
        <p className="text-ink-2">{text}</p>
      </motion.div>
    </li>
  )
}

/**
 * Linha do tempo ligada ao scroll: a linha avança conforme a seção atravessa a tela
 * (horizontal no desktop, vertical no celular). Com movimento reduzido, tudo aparece aceso.
 */
export function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null)
  const allowed = useMotionAllowed()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })
  const fill = allowed ? scrollYProgress : undefined

  return (
    <section id="como-funciona" aria-labelledby="processo-title" className="bg-bg-alt">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 py-20 md:px-10 md:py-28">
        <SectionHeader id="processo-title" eyebrow={process.eyebrow} title={process.title} intro={process.intro} />
        <div ref={ref} className="relative">
          {/* trilho e preenchimento: desktop (até o centro da última etapa) */}
          <div aria-hidden className="absolute left-[0.575rem] right-[calc((100%-6rem)/4-0.575rem)] top-[0.575rem] hidden h-px bg-line lg:block" />
          <motion.div aria-hidden className="absolute left-[0.575rem] right-[calc((100%-6rem)/4-0.575rem)] top-[0.575rem] hidden h-px origin-left bg-peach lg:block" style={{ scaleX: fill ?? 1 }} />
          {/* trilho e preenchimento: celular */}
          <div aria-hidden className="absolute bottom-10 left-[0.575rem] top-2 w-px bg-line lg:hidden" />
          <motion.div aria-hidden className="absolute bottom-10 left-[0.575rem] top-2 w-px origin-top bg-peach lg:hidden" style={{ scaleY: fill ?? 1 }} />
          <ol className="relative m-0 grid list-none gap-10 p-0 lg:grid-cols-4 lg:gap-8">
            {process.steps.map((s, i) => (
              <Step key={s.title} index={i} total={process.steps.length} title={s.title} text={s.text} progress={scrollYProgress} allowed={allowed} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
