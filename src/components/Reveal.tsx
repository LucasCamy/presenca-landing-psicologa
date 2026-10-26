import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { springSoft } from '../lib/motion'

/**
 * Entrada ao aparecer (uma vez): opacidade + 10px + blur 4px → nítido, mola sem overshoot.
 * O blur dá a sensação de "entrar em foco". Com movimento reduzido, o Motion remove o deslocamento
 * e a entrada fica só no fade.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ ...springSoft, delay }}
    >
      {children}
    </motion.div>
  )
}
