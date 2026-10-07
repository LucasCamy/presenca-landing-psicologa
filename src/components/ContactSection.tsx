import { useRef, useState, type FormEvent } from 'react'
import { AtSign, Mail, MessageCircle } from 'lucide-react'
import { contact, professional, whatsappUrl } from '../content/site'
import { isValidEmail, submitContact } from '../lib/submitContact'
import { Reveal } from './Reveal'

type Status = 'idle' | 'loading' | 'success' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'consent', string>>

export function ContactSection() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const formRef = useRef<HTMLFormElement>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '')
    const consent = fd.get('consent') === 'on'
    const next: Errors = {}
    if (!name) next.name = 'Informe como prefere ser chamada(o).'
    if (!isValidEmail(email)) next.email = 'Informe um e-mail válido, por exemplo nome@email.com.'
    if (!consent) next.consent = 'Para enviar, é necessário concordar com o uso dos dados.'
    setErrors(next)
    const first = (['name', 'email', 'consent'] as const).find((k) => next[k])
    if (first) {
      setStatus('idle')
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setStatus('loading')
    try {
      await submitContact({ name, email, preference: String(fd.get('preference') ?? ''), message: String(fd.get('message') ?? ''), consent })
      setStatus('success')
      formRef.current?.reset()
    } catch {
      setStatus('error')
    }
  }

  const loading = status === 'loading'

  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-bg-alt">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-2 lg:gap-24">
        <Reveal className="flex flex-col gap-6">
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 id="contato-title" className="text-[clamp(1.875rem,4vw,2.5rem)]">{contact.title}</h2>
          <p className="max-w-lg text-lg text-ink-2">{contact.intro}</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary self-start">
            <MessageCircle aria-hidden size={20} />
            {contact.whatsappLabel}
          </a>
          <ul className="m-0 flex list-none flex-col gap-3 p-0 text-ink">
            <li className="flex items-center gap-3"><MessageCircle aria-hidden size={18} className="text-accent" />WhatsApp: {professional.whatsappDisplay}</li>
            <li className="flex items-center gap-3"><Mail aria-hidden size={18} className="text-accent" /><a href={`mailto:${professional.email}`} className="inline-block py-2 text-ink underline-offset-4 hover:underline">{professional.email}</a></li>
            <li className="flex items-center gap-3"><AtSign aria-hidden size={18} className="text-accent" /><a href={professional.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-block py-2 text-ink underline-offset-4 hover:underline">Instagram {professional.instagramHandle}</a></li>
          </ul>
          <p className="text-[0.9375rem] text-ink-2">{professional.location}<br />Horário preferencial de contato: {professional.preferredContactHours}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[1.75rem] border border-line bg-surface p-6 md:p-8">
            {status === 'success' ? (
              <div role="status" className="flex flex-col gap-3 py-6">
                <h3 className="font-serif text-2xl text-ok">Mensagem recebida</h3>
                <p className="text-ink-2">{contact.success}</p>
                <button type="button" className="btn btn-secondary self-start" onClick={() => setStatus('idle')}>Enviar outra mensagem</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={loading} className="flex flex-col gap-5">
                <p className="text-sm text-ink-2" id="form-note">Campos com * são obrigatórios.</p>
                {status === 'error' && (
                  <p role="alert" className="rounded-xl border-2 border-danger px-4 py-3 text-danger">
                    Não foi possível enviar agora. Por favor, tente o WhatsApp ou o e-mail ao lado.
                  </p>
                )}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-name" className="text-sm font-semibold">Nome *</label>
                  <input id="c-name" name="name" type="text" autoComplete="name" required className="field" placeholder="Como prefere ser chamada(o)" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-name-err' : undefined} />
                  {errors.name && <p id="c-name-err" className="text-sm text-danger">⚠ {errors.name}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-email" className="text-sm font-semibold">E-mail *</label>
                  <input id="c-email" name="email" type="email" autoComplete="email" required className="field" placeholder="nome@email.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'c-email-err' : undefined} />
                  {errors.email && <p id="c-email-err" className="text-sm text-danger">⚠ {errors.email}</p>}
                </div>
                <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
                  <legend className="mb-1 p-0 text-sm font-semibold">Como prefere ser contatado</legend>
                  <div className="flex flex-wrap gap-3">
                    {contact.contactPreferences.map((p, i) => (
                      <label key={p} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-bg px-4 has-[:checked]:border-accent has-[:checked]:bg-bg-alt has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus-ring)]">
                        <input type="radio" name="preference" value={p} defaultChecked={i === 0} className="accent-accent" />
                        {p}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-msg" className="text-sm font-semibold">Mensagem curta</label>
                  <textarea id="c-msg" name="message" rows={4} maxLength={400} className="field" placeholder="Escreva em poucas linhas" aria-describedby="c-sensitive" />
                  <p id="c-sensitive" className="text-sm text-clay-text">{contact.sensitiveNotice}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-start gap-3 text-[0.9375rem]">
                    <input type="checkbox" name="consent" className="mt-1 size-5 accent-accent" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'c-consent-err' : undefined} />
                    <span>Concordo em compartilhar estes dados para receber uma resposta, conforme a <a href="#/privacidade" className="text-accent underline underline-offset-2">política de privacidade</a>. *</span>
                  </label>
                  {errors.consent && <p id="c-consent-err" className="text-sm text-danger">⚠ {errors.consent}</p>}
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary self-start">
                  {loading ? 'Enviando…' : 'Enviar mensagem'}
                </button>
                <p className="text-xs text-ink-2">Envio simulado neste modelo: nenhum dado é transmitido.</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
