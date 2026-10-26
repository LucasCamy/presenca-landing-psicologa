import { useRef } from 'react'
import { motion, useReducedMotionConfig, useScroll, useTransform } from 'motion/react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { hero, images, phoneUrl, professional } from '../content/site'
import { ImagePlaceholder } from './ImagePlaceholder'
import { ease } from '../lib/motion'
import { Lotus } from './Lotus'

/** Headline revelada palavra a palavra por máscara (uma vez). Leitores de tela recebem o texto inteiro. */
function MaskedHeadline({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <h1 id="hero-title" aria-label={text} className="text-[clamp(2rem,4.2vw,3.5rem)] font-light leading-[1.12] text-ink">
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-top">
          <motion.span className="inline-block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: ease.out, delay: 0.1 + i * 0.045 }}>
            {w}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

export function HeroProfile() {
  const reduce = useReducedMotionConfig()
  const ref = useRef<HTMLElement>(null)
  // Profundidade ao sair do topo: lótus sobe e gira devagar, foto desce um pouco; o texto fica parado e legível.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const lotusY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const lotusRotate = useTransform(scrollYProgress, [0, 1], [0, 14])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 70])
  return (
    <section ref={ref} id="inicio" aria-labelledby="hero-title" className="relative">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 md:px-10 lg:min-h-[calc(100dvh-5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">
        <div className="relative flex flex-col items-start gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="flex flex-col items-start gap-3">
            <p className="wordmark text-[clamp(1.05rem,2.2vw,1.4rem)] leading-snug">{professional.fullName}</p>
            <p className="badge">{hero.badge}</p>
          </motion.div>
          <MaskedHeadline text={hero.headline} />
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: ease.out, delay: 0.55 }} className="flex w-full flex-col items-start gap-7">
            <p className="max-w-xl text-lg text-ink-2 md:text-xl">{hero.intro}</p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={hero.primaryCta.href} className="btn btn-primary">{hero.primaryCta.label}</a>
              <a href={hero.secondaryCta.href} className="btn btn-secondary">{hero.secondaryCta.label}</a>
            </div>
            <ul className="m-0 flex list-none flex-col gap-1 p-0 text-[0.9375rem] text-ink-2">
              <li><a href={phoneUrl} className="inline-flex min-h-11 items-center gap-3 text-ink-2 no-underline hover:text-accent"><Phone aria-hidden size={18} className="text-peach" />{professional.phoneDisplay}</a></li>
              <li><a href={`mailto:${professional.email}`} className="inline-flex min-h-11 items-center gap-3 break-all text-ink-2 no-underline hover:text-accent"><Mail aria-hidden size={18} className="shrink-0 text-peach" />{professional.email}</a></li>
              <li className="inline-flex min-h-11 items-center gap-3"><MapPin aria-hidden size={18} className="text-peach" />{professional.modality}</li>
            </ul>
          </motion.div>
        </div>

        <figure className="relative m-0 flex flex-col items-center gap-3 justify-self-center lg:justify-self-end">
          <motion.div aria-hidden className="pointer-events-none absolute left-1/2 top-[42%] w-[46rem] -translate-x-1/2 -translate-y-1/2 max-sm:w-[27rem]" style={reduce ? undefined : { y: lotusY, rotate: lotusRotate }}>
            <Lotus className="w-full text-peach-soft" strokeWidth={2} />
          </motion.div>
          {/* Foto: desce um pouco mais devagar que a página (profundidade). */}
          <motion.div style={reduce ? undefined : { y: photoY }} className="relative">
            {/* Entrada: cortina de baixo para cima + leve assentamento da imagem (uma vez, no carregamento). */}
            <motion.div
              className="relative overflow-hidden rounded-t-[10rem] rounded-b-[var(--radius-frame)] shadow-soft"
              initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.1, ease: ease.inOut, delay: 0.25 }}
            >
              <motion.div initial={reduce ? false : { scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: ease.out, delay: 0.25 }}>
                <ImagePlaceholder priority image={images.portraitHero} label="Fotografia natural da profissional, com luz de janela" className="block h-[24rem] w-[min(100vw-2.5rem,19rem)] sm:h-[33rem] sm:w-[25rem]" />
              </motion.div>
            </motion.div>
            {/* A legenda acompanha a foto na profundidade, para não passar por cima dela. */}
            {images.portraitHero.caption && (
              <motion.figcaption className="relative mt-3 text-center text-sm text-ink-2" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.1 }}>
                {images.portraitHero.caption}
              </motion.figcaption>
            )}
          </motion.div>
        </figure>
      </div>
    </section>
  )
}
