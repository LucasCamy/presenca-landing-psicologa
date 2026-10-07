import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { whatsappUrl } from '../content/site'

/** Botão flutuante compacto: só aparece depois da primeira dobra e some quando a seção de contato está visível. */
export function WhatsAppButton() {
  const [pastHero, setPastHero] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const target = document.getElementById('contato')
    const io = target ? new IntersectionObserver(([e]) => setContactVisible(e.isIntersecting)) : null
    if (target && io) io.observe(target)
    return () => {
      window.removeEventListener('scroll', onScroll)
      io?.disconnect()
    }
  }, [])

  const show = pastHero && !contactVisible
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp (abre em nova aba)"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed bottom-4 right-4 z-30 inline-flex size-14 items-center justify-center rounded-full bg-accent text-accent-on shadow-lg transition duration-300 hover:bg-accent-hover md:bottom-6 md:right-6 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
    >
      <MessageCircle aria-hidden size={24} />
    </a>
  )
}
