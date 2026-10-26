/**
 * Tokens e preferências de movimento (espelham as variáveis de src/styles/tokens.css).
 * Peso da skill design-motion-principles: Jakub (polimento sutil) > Jhey (assinatura) > Emil (menu, formulário, teclado).
 */
export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const

/** Mola sem overshoot: padrão de produção. */
export const springSoft = { type: 'spring', duration: 0.7, bounce: 0 } as const
export const springQuick = { type: 'spring', duration: 0.35, bounce: 0 } as const

/** `?movimento=1` força as animações (demonstração em máquina com "reduzir movimento" ligado). */
export const forceMotion =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('movimento') === '1'

export function prefersReducedMotion() {
  if (forceMotion) return false
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** easeInOutCubic: partida e chegada suaves para o deslocamento até as seções. */
export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
