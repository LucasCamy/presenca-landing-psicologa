import { finalCta } from '../content/site'
import { Reveal } from './Reveal'

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-accent text-accent-on">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 py-20 text-center md:py-28">
        <h2 id="cta-title" className="text-[clamp(1.75rem,4vw,2.5rem)]">{finalCta.title}</h2>
        <p className="text-lg opacity-95">{finalCta.text}</p>
        <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <a href={finalCta.primary.href} className="btn btn-on-dark">{finalCta.primary.label}</a>
          <a href={finalCta.secondary.href} className="btn btn-outline-on-dark">{finalCta.secondary.label}</a>
        </div>
      </Reveal>
    </section>
  )
}
