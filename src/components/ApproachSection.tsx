import { approach, images } from '../content/site'
import { Reveal } from './Reveal'
import { ScrollImage } from './ScrollImage'

export function ApproachSection() {
  return (
    <section id="abordagem" aria-labelledby="abordagem-title" className="bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-2 lg:gap-24">
        <Reveal className="flex flex-col gap-5">
          <h2 id="abordagem-title" className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-light">{approach.title}</h2>
          <p className="text-lg text-ink-2">{approach.intro}</p>
          <p className="pending text-[0.9375rem]">{approach.approachNote}</p>
          <ScrollImage image={images.still} label="Fotografia de detalhe: livros, plantas ou caderno" frameClassName="mt-4 aspect-square w-full max-w-sm rounded-t-[8rem] rounded-b-[var(--radius-frame)]" />
        </Reveal>
        <div className="flex flex-col lg:pt-2">
          {approach.blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} className="flex flex-col gap-2 border-t border-line py-7 first:border-t-0 first:pt-0">
              <h3 className="text-xl font-medium">{b.title}</h3>
              <p className="text-ink-2">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
