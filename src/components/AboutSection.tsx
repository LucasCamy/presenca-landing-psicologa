import { ArrowRight } from 'lucide-react'
import { about, images } from '../content/site'
import { ImagePlaceholder } from './ImagePlaceholder'
import { Reveal } from './Reveal'

export function AboutSection() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal>
          <ImagePlaceholder image={images.portraitAbout} label="Retrato natural da profissional, expressão tranquila" className="h-[26rem] w-full max-w-md rounded-t-[10rem] rounded-b-3xl sm:h-[32rem]" />
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-6">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 id="sobre-title" className="text-[clamp(1.875rem,4vw,2.5rem)]">{about.title}</h2>
          {about.story.map((p) => (
            <p key={p} className="max-w-xl text-lg text-ink-2">{p}</p>
          ))}
          <dl className="m-0 grid gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-2">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-sm font-semibold text-ink-2">{f.label}</dt>
                <dd className="m-0 text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
          <a href={about.link.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline">
            {about.link.label}
            <ArrowRight aria-hidden size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
