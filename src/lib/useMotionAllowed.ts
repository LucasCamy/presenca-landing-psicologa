import { useReducedMotionConfig } from 'motion/react'

/**
 * true quando o movimento está permitido (respeita "reduzir movimento" e o `?movimento=1`).
 *
 * Necessário para efeitos ligados ao scroll: valores do `useTransform` passados em `style`
 * NÃO são desligados pelo `MotionConfig reducedMotion`, então cada componente decide aqui
 * se aplica o efeito ou mostra o estado final estático.
 */
export function useMotionAllowed() {
  return !useReducedMotionConfig()
}
