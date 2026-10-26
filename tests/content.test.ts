import { describe, expect, it } from 'vitest'
import * as site from '../src/content/site'

/** Percorre recursivamente o conteúdo e devolve todas as strings. */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(strings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings)
  return []
}

const { pending: _pending, ...content } = site
void _pending
const all = strings(content).join('\n').toLowerCase()

describe('conteúdo: regras de publicidade e ética (CONTENT_REVIEW.md)', () => {
  const forbidden = [
    'a melhor', 'mais procurad', 'resultado garantido', 'resultados garantidos',
    'últimas vagas', 'agende agora', 'perca sua vaga', 'não espere piorar', 'sua mudança começa hoje',
    'você tem ansiedade', 'você tem depressão', 'livre-se', 'resolva seus traumas', 'garanta sua transformação',
    'promoção', 'desconto', 'antes e depois',
  ]
  for (const phrase of forbidden) {
    it(`não contém "${phrase}"`, () => {
      expect(all).not.toContain(phrase)
    })
  }

  it('não promete cura (palavras inteiras "cura"/"curo")', () => {
    expect(all).not.toMatch(/(^|[^a-zà-ú])(cura|curo)([^a-zà-ú]|$)/)
  })

  it('não usa travessão longo em texto visível', () => {
    expect(all).not.toContain('—')
  })

  it('exibe nome, título e CRP (ou pendência visível do CRP)', () => {
    expect(site.professional.fullName).toBe('Elainy Karoliny R M Genova')
    expect(site.professional.title).toBe('Psicóloga clínica')
    const crpOk = /^CRP \d{2}\/\d{4,6}$/.test(site.professional.crp)
    if (!crpOk) {
      expect(site.professional.crp).toContain('pendente')
      expect(site.publishBlockers).toContain('Número do CRP')
    }
  })

  it('não permite desligar o aviso enquanto houver pendências de publicação', () => {
    if (site.publishBlockers.length > 0) expect(site.demoMode).toBe(true)
  })

  it('usa os contatos informados pela profissional', () => {
    expect(site.professional.phoneDisplay).toBe('(67) 99962-2351')
    expect(site.professional.email).toBe('psielainykaroliny@gmail.com')
    expect(site.professional.instagramHandle).toBe('@psielainykaroliny')
    expect(site.whatsappUrl).toContain('wa.me/5567999622351')
  })

  it('inclui aviso de emergência no FAQ e na política de privacidade', () => {
    expect(site.faq.items.some((i) => i.a === site.emergencyNotice)).toBe(true)
    expect(site.privacy.sections.some((s) => s.text === site.emergencyNotice)).toBe(true)
  })

  it('o formulário avisa para não enviar dados sensíveis', () => {
    expect(site.contact.sensitiveNotice).toContain('informações sensíveis')
  })
})
