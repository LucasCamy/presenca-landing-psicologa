import { principles } from '../content/site'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

export function PrinciplesSection() {
  return (
    <section aria-labelledby="principios-title" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <div className="flex flex-col gap-12">
        <SectionHeader id="principios-title" eyebrow={principles.eyebrow} title={principles.title} intro={principles.intro} />
        <ul className="m-0 grid list-none gap-x-12 gap-y-2 p-0 md:grid-cols-2 lg:grid-cols-3">
          {principles.items.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={(i % 3) * 0.06} className="flex flex-col gap-1.5 border-t border-line py-5">
                <h3 className="text-xl">{p.title}</h3>
                <p className="text-ink-2">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
