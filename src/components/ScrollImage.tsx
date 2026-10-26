import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import type { SiteImage } from '../content/site'
import { ease } from '../lib/motion'
import { useMotionAllowed } from '../lib/useMotionAllowed'
import { ImagePlaceholder } from './ImagePlaceholder'

interface Props {
  image: SiteImage
  label: string
  /** Moldura: tamanho, proporção, raios e sombra. */
  frameClassName: string
  /** Direção da cortina ao entrar. */
  from?: 'bottom' | 'left'
}

/**
 * Imagem com abertura em cortina ao entrar (uma vez) e profundidade discreta ligada ao scroll:
 * a imagem se aproxima de 1,08 para 1 e desliza um pouco mais devagar que a página.
 * Com movimento reduzido, aparece pronta.
 */
export function ScrollImage({ image, label, frameClassName, from = 'bottom' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const allowed = useMotionAllowed()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.55], [1.08, 1])
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const hidden = from === 'bottom' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${frameClassName}`}
      initial={allowed ? { clipPath: hidden } : false}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1.1, ease: ease.inOut }}
    >
      <motion.div className="absolute inset-[-5%]" style={allowed ? { scale, y } : undefined}>
        <ImagePlaceholder image={image} label={label} className="block size-full" />
      </motion.div>
    </motion.div>
  )
}
