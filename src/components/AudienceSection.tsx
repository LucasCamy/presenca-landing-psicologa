import { audience } from '../content/site'
import { Lotus } from './Lotus'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

/** Layout editorial: título fixo à esquerda (desktop) e lista em duas colunas com fios finos. */
export function AudienceSection() {
  return (
    <section aria-labelledby="publico-title" className="bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader id="publico-title" title={audience.title} intro={audience.intro} />
        </div>
        <ul className="m-0 grid list-none gap-x-10 p-0 sm:grid-cols-2">
          {audience.items.map((item, i) => (
            <li key={item.title} className="border-t border-line">
              <Reveal delay={(i % 2) * 0.06} className="flex gap-4 py-6">
                <Lotus className="mt-1 w-7 shrink-0 text-peach" draw={false} strokeWidth={1.3} />
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-[0.9375rem] text-ink-2">{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
