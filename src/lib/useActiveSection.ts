import { useCallback, useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { navEvents } from './smoothScroll'

/**
 * Seção do menu em que a pessoa está: a última cujo topo já passou de 45% da altura da tela.
 * Seções fora do menu (ex.: "Para quem é o atendimento") mantêm a anterior ativa.
 * Durante um deslocamento iniciado pelo menu, fica travada no destino para o indicador não
 * "passear" pelas seções intermediárias.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)
  const locked = useRef<string | null>(null)
  const { scrollY } = useScroll()

  const compute = useCallback(() => {
    if (locked.current) return
    const line = window.innerHeight * 0.45
    let current: string | null = null
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= line) current = id
    }
    setActive(current)
  }, [ids])

  useMotionValueEvent(scrollY, 'change', compute)

  useEffect(() => {
    compute()
    let unlockTimer = 0
    const unlock = () => {
      window.clearTimeout(unlockTimer)
      locked.current = null
      compute()
    }
    const onTarget = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      if (!ids.includes(id)) return
      locked.current = id
      setActive(id)
      // Se a pessoa interromper o deslocamento com a roda ou o toque, destrava mesmo assim.
      window.clearTimeout(unlockTimer)
      unlockTimer = window.setTimeout(unlock, 1800)
    }
    window.addEventListener(navEvents.target, onTarget)
    window.addEventListener(navEvents.settled, unlock)
    window.addEventListener('resize', compute)
    return () => {
      window.clearTimeout(unlockTimer)
      window.removeEventListener(navEvents.target, onTarget)
      window.removeEventListener(navEvents.settled, unlock)
      window.removeEventListener('resize', compute)
    }
  }, [ids, compute])

  return active
}
