import { welcome } from '../content/site'
import { Reveal } from './Reveal'

export function WelcomeBlock() {
  return (
    <section aria-label="Acolhimento" className="relative overflow-hidden bg-bg-alt">
      <div aria-hidden className="pointer-events-none absolute -left-20 -top-24 hidden size-80 rounded-full bg-sage/35 md:block" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 right-10 hidden size-44 rounded-full bg-blush/50 md:block" />
      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 py-20 text-center md:py-32">
        <svg aria-hidden width="64" height="12" viewBox="0 0 64 12" fill="none" className="text-clay">
          <path d="M2 6c10-8 20 8 30 0s20 8 30 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">{welcome.quote}</p>
        <p className="max-w-xl text-lg text-ink-2 md:text-xl">{welcome.body}</p>
      </Reveal>
    </section>
  )
}
