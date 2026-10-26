import { motion, motionValue, useTransform, type MotionValue } from 'motion/react'
import { useMotionAllowed } from '../lib/useMotionAllowed'

/** Pétalas: [path, ângulo quando fechada]. Laterais giram em torno da base (100, 122). */
const petals: [string, number][] = [
  ['M100 18 C121 48 121 90 100 120 C79 90 79 48 100 18Z', 0],
  ['M100 120 C70 101 54 71 59 38 C85 53 98 84 100 120Z', 16],
  ['M100 120 C130 101 146 71 141 38 C115 53 102 84 100 120Z', -16],
  ['M100 122 C60 121 24 97 8 70 C44 63 80 84 100 122Z', 34],
  ['M100 122 C140 121 176 97 192 70 C156 63 120 84 100 122Z', -34],
]
const base = 'M38 130 C70 138 130 138 162 130'

/** MotionValue fixo em 1 (flor aberta) quando não há `bloom`: mantém a ordem dos hooks. */
const zero = motionValue(1)

interface Props {
  className?: string
  /** Desenha o traço uma vez quando entra na tela. */
  draw?: boolean
  strokeWidth?: number
  /** Progresso 0→1 (ligado ao scroll): a flor desabrocha, pétalas fechadas em 0 e abertas em 1. */
  bloom?: MotionValue<number>
}

const drawTransition = (i: number) => ({
  pathLength: { duration: 1.6, ease: [0.65, 0, 0.35, 1] as const, delay: 0.15 + i * 0.12 },
  opacity: { duration: 0.3, delay: 0.15 + i * 0.12 },
})

function Petal({ d, closed, index, animateDraw, bloom, strokeWidth }: { d: string; closed: number; index: number; animateDraw: boolean; bloom?: MotionValue<number>; strokeWidth: number }) {
  // Hook sempre chamado; sem `bloom`, a pétala fica aberta.
  const rotate = useTransform(bloom ?? zero, [0, 1], [closed, 0])
  return (
    <motion.path
      d={d}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      style={bloom ? { rotate, transformOrigin: '100px 122px', transformBox: 'view-box' } : undefined}
      initial={animateDraw ? { pathLength: 0, opacity: 0 } : false}
      whileInView={animateDraw ? { pathLength: 1, opacity: 1 } : undefined}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={drawTransition(index)}
    />
  )
}

/**
 * Elemento-assinatura: a flor de lótus em traço fino do material da profissional.
 * Decorativa (aria-hidden). Com movimento reduzido, aparece pronta e aberta.
 */
export function Lotus({ className = '', draw = true, strokeWidth = 1.6, bloom }: Props) {
  const allowed = useMotionAllowed()
  const animateDraw = draw && allowed
  const bloomValue = allowed ? bloom : undefined
  const baseScale = useTransform(bloomValue ?? zero, [0, 1], [0.55, 1])
  return (
    <svg aria-hidden viewBox="0 0 200 142" fill="none" className={className} overflow="visible">
      {petals.map(([d, closed], i) => (
        <Petal key={d} d={d} closed={closed} index={i} animateDraw={animateDraw} bloom={bloomValue} strokeWidth={strokeWidth} />
      ))}
      <motion.path
        d={base}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={bloomValue ? { scaleX: baseScale, transformOrigin: '100px 132px', transformBox: 'view-box' } : undefined}
        initial={animateDraw ? { pathLength: 0, opacity: 0 } : false}
        whileInView={animateDraw ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={drawTransition(petals.length)}
      />
    </svg>
  )
}
