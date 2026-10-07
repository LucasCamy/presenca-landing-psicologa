import { motion } from 'motion/react'
import { hero, images, professional } from '../content/site'
import { ImagePlaceholder } from './ImagePlaceholder'

export function HeroProfile() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 hidden size-80 rounded-full bg-sage/25 md:block motion-safe:animate-[drift_26s_ease-in-out_infinite]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative flex flex-col items-start gap-6">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.1]">{hero.headline}</h1>
          <p className="max-w-xl text-lg text-ink-2 md:text-xl">{hero.intro}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={hero.primaryCta.href} className="btn btn-primary">{hero.primaryCta.label}</a>
            <a href={hero.secondaryCta.href} className="btn btn-secondary">{hero.secondaryCta.label}</a>
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {hero.chips.map((c) => (
              <li key={c} className="rounded-full border border-line bg-bg-alt px-3.5 py-1.5 text-sm font-medium">{c}</li>
            ))}
          </ul>
        </motion.div>

        <motion.figure initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.15 }} className="m-0 flex flex-col gap-3 justify-self-center lg:justify-self-end">
          <ImagePlaceholder priority image={images.portraitHero} label="Fotografia natural da profissional, com luz de janela" className="h-[26rem] w-[min(100%,20rem)] rounded-t-[10rem] rounded-b-3xl bg-bg-alt sm:h-[34rem] sm:w-[26rem]" />
          <figcaption className="text-sm text-ink-2">{professional.fullName} · {professional.title} <span className="text-ink-3">(ilustração demonstrativa)</span></figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
