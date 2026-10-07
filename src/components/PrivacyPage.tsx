import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { privacy, professional } from '../content/site'

export function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${privacy.title} — ${professional.fullName}`
    return () => {
      document.title = `${professional.fullName} — ${professional.title} · ${professional.crp}`
    }
  }, [])
  return (
    <section aria-labelledby="privacidade-title" className="mx-auto max-w-3xl px-5 py-16 md:px-10 md:py-24">
      <a href="#inicio" className="mb-10 inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline">
        <ArrowLeft aria-hidden size={18} /> Voltar ao site
      </a>
      <h1 id="privacidade-title" className="mb-4 text-[clamp(2rem,5vw,3rem)]">{privacy.title}</h1>
      <p role="note" className="mb-10 rounded-2xl border border-dashed border-clay bg-surface px-5 py-4 text-ink-2">{privacy.reviewNotice}</p>
      <div className="flex flex-col gap-8">
        {privacy.sections.map((s) => (
          <section key={s.title} className="flex flex-col gap-2">
            <h2 className="text-2xl">{s.title}</h2>
            <p className="text-ink-2">{s.text}</p>
          </section>
        ))}
      </div>
    </section>
  )
}
