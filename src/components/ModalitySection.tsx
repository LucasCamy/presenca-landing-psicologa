import { CalendarClock, Headphones, MessageCircle, Video } from 'lucide-react'
import { images, modality } from '../content/site'
import { Reveal } from './Reveal'
import { ScrollImage } from './ScrollImage'
import { SectionHeader } from './SectionHeader'

const icons = [Video, CalendarClock, Headphones, MessageCircle]

/** Split assimétrico: ilustração do ambiente + lista de orientações. */
export function ModalitySection() {
  return (
    <section id="atendimento" aria-labelledby="atendimento-title" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <ScrollImage image={images.office} label="Fotografia do ambiente de atendimento" from="left" frameClassName="aspect-[4/3] w-full rounded-[var(--radius-frame)] shadow-soft" />
        <div className="flex flex-col gap-8">
          <SectionHeader id="atendimento-title" title={modality.title} intro={modality.intro} />
          <ul className="m-0 flex list-none flex-col gap-5 p-0">
            {modality.items.map((c, i) => {
              const Icon = icons[i]
              return (
                <li key={c.title}>
                  <Reveal delay={i * 0.06} className="flex gap-4">
                    <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-tint text-accent"><Icon size={20} /></span>
                    <div className="flex min-w-0 flex-col gap-1">
                      <h3 className="text-lg font-medium">{c.title}</h3>
                      <p className="break-words text-ink-2">{c.text}</p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
