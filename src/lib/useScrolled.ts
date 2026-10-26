import { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'

/** true quando a página rolou além de `threshold` px (sem listener manual de scroll). */
export function useScrolled(threshold = 12) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(() => (typeof window !== 'undefined' ? window.scrollY > threshold : false))
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > threshold))
  return scrolled
}
