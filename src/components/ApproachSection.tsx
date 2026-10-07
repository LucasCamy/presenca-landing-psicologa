import { approach, images } from '../content/site'
import { ImagePlaceholder } from './ImagePlaceholder'
import { Reveal } from './Reveal'

export function ApproachSection() {
  return (
    <section id="abordagem" aria-labelledby="abordagem-title" className="bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-2 lg:gap-24">
        <Reveal className="flex flex-col gap-5">
          <p className="eyebrow">{approach.eyebrow}</p>
          <h2 id="abordagem-title" className="text-[clamp(1.875rem,4vw,2.5rem)]">{approach.title}</h2>
          <p className="text-lg text-ink-2">{approach.intro}</p>
          <ImagePlaceholder image={images.still} label="Fotografia de detalhe: livros, plantas ou caderno" className="mt-4 aspect-square w-full max-w-md rounded-t-[8rem] rounded-b-3xl" />
        </Reveal>
        <div className="flex flex-col">
          {approach.blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} className="flex flex-col gap-2 border-t border-line py-6 first:border-t-0 first:pt-0">
              <h3 className="text-2xl">{b.title}</h3>
              <p className="text-ink-2">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
