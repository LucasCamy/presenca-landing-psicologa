import { useRef, type Ref } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useMotionAllowed } from '../lib/useMotionAllowed'

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.22, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

interface Props {
  text: string
  className?: string
  as?: 'p' | 'h2'
}

/**
 * Frase lida no ritmo do scroll: cada palavra ganha cor conforme a frase atravessa a tela.
 * O texto completo existe no DOM desde o início (leitores de tela leem normalmente); com movimento
 * reduzido, a frase aparece inteira.
 */
export function ScrollWords({ text, className, as: Tag = 'p' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const allowed = useMotionAllowed()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.35'] })
  const words = text.split(' ')
  return (
    <Tag ref={ref as Ref<never>} className={className}>
      {allowed
        ? words.map((w, i) => {
            const start = i / words.length
            return <Word key={`${w}-${i}`} word={w} progress={scrollYProgress} range={[start, Math.min(1, start + 2 / words.length)]} />
          })
        : text}
    </Tag>
  )
}
