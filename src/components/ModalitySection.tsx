import { Clock, MapPin, Monitor, Video } from 'lucide-react'
import { images, modality } from '../content/site'
import { ImagePlaceholder } from './ImagePlaceholder'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

const icons = [Video, MapPin, Clock, Monitor]

export function ModalitySection() {
  return (
    <section id="atendimento" aria-labelledby="atendimento-title" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <div className="flex flex-col gap-12">
        <SectionHeader id="atendimento-title" eyebrow={modality.eyebrow} title={modality.title} />
        <p role="note" className="max-w-2xl rounded-2xl border border-dashed border-clay bg-surface px-5 py-4 text-[0.9375rem] text-ink-2">
          <strong className="text-clay-text">Atenção: </strong>{modality.notice}
        </p>
        <Reveal>
          <figure className="m-0 flex flex-col gap-2">
            <ImagePlaceholder image={images.office} label="Fotografia do consultório ou do ambiente de atendimento" className="aspect-[16/9] w-full rounded-[1.75rem] sm:aspect-[2/1]" />
            {images.office.caption && <figcaption className="text-sm text-ink-2">{images.office.caption}</figcaption>}
          </figure>
        </Reveal>
        <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {modality.cards.map((c, i) => {
            const Icon = icons[i]
            return (
              <li key={c.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <article className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-surface p-7">
                    <span aria-hidden className="inline-flex size-11 items-center justify-center rounded-full bg-sage/35 text-accent"><Icon size={20} /></span>
                    <h3 className="text-2xl">{c.title}</h3>
                    <p className="text-ink-2">{c.text}</p>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
