import { process } from '../content/site'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

export function ProcessSteps() {
  return (
    <section id="como-funciona" aria-labelledby="processo-title" className="bg-bg-alt">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 py-20 md:px-10 md:py-28">
        <SectionHeader id="processo-title" eyebrow={process.eyebrow} title={process.title} intro={process.intro} />
        <ol className="m-0 grid list-none gap-10 p-0 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {process.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.08} className="flex flex-col gap-3">
                <span aria-hidden className="font-serif text-4xl text-clay-text">{String(i + 1).padStart(2, '0')}</span>
                <span aria-hidden className="h-px w-full bg-line" />
                <h3 className="text-2xl"><span className="sr-only">Etapa {i + 1}: </span>{s.title}</h3>
                <p className="text-ink-2">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
