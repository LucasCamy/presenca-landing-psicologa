import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { privacy, professional } from '../content/site'

const baseTitle = `${professional.fullName} · ${professional.title}`

export function PrivacyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = `${privacy.title} · ${professional.shortName}`
    return () => {
      document.title = baseTitle
    }
  }, [])
  return (
    <section aria-labelledby="privacidade-title" className="mx-auto max-w-3xl px-5 py-16 md:px-10 md:py-24">
      <a href="#inicio" className="mb-10 inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline">
        <ArrowLeft aria-hidden size={18} /> Voltar ao site
      </a>
      <h1 id="privacidade-title" className="mb-4 text-[clamp(2rem,5vw,3rem)] font-light">{privacy.title}</h1>
      <p role="note" className="mb-4 rounded-[var(--radius-panel)] border border-dashed border-peach bg-surface px-5 py-4 text-ink-2">{privacy.reviewNotice}</p>
      <p className="pending mb-10 text-sm">{privacy.updatedAt}</p>
      <div className="flex flex-col gap-8">
        {privacy.sections.map((s) => (
          <section key={s.title} className="flex flex-col gap-2">
            <h2 className="text-xl font-medium">{s.title}</h2>
            <p className={s.text.includes('(pendente)') ? 'pending' : 'text-ink-2'}>{s.text}</p>
          </section>
        ))}
      </div>
    </section>
  )
}
