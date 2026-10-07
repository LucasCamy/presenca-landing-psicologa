import { describe, expect, it } from 'vitest'
import * as site from '../src/content/site'

/** Percorre recursivamente o conteúdo e devolve todas as strings. */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(strings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings)
  return []
}

const all = strings({ ...site }).join('\n').toLowerCase()

describe('conteúdo — regras de publicidade e ética (CONTENT_REVIEW.md)', () => {
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

  it('exibe nome, título e CRP', () => {
    expect(site.professional.fullName).toBeTruthy()
    expect(site.professional.title).toBe('Psicóloga')
    expect(site.professional.crp).toMatch(/^CRP \d{2}\/\d{5}$/)
  })

  it('inclui aviso de emergência no FAQ e na política de privacidade', () => {
    expect(site.faq.items.some((i) => i.a === site.emergencyNotice)).toBe(true)
    expect(site.privacy.sections.some((s) => s.text === site.emergencyNotice)).toBe(true)
  })

  it('mantém dados demonstrativos identificados enquanto demoMode estiver ativo', () => {
    expect(site.demoMode).toBe(true)
    expect(site.footer.demoNotice).toContain('demonstrativo')
  })

  it('o formulário avisa para não enviar dados sensíveis', () => {
    expect(site.contact.sensitiveNotice).toContain('informações sensíveis')
  })
})
