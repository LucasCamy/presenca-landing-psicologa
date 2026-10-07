import { audience } from '../content/site'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

export function AudienceSection() {
  return (
    <section aria-labelledby="publico-title" className="bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-20 md:px-10 md:py-28">
        <SectionHeader id="publico-title" eyebrow={audience.eyebrow} title={audience.title} intro={audience.intro} />
        <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {audience.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={(i % 4) * 0.06} className="h-full">
                <article className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-bg p-6">
                  <span aria-hidden className="size-3.5 rounded-full bg-sage" />
                  <h3 className="text-xl leading-snug">{item.title}</h3>
                  <p className="text-[0.9375rem] text-ink-2">{item.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
