import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { whatsappUrl } from '../content/site'

/**
 * Botão flutuante compacto: aparece depois que o hero sai da tela e some quando o contato ou
 * o rodapé estão visíveis (IntersectionObserver, sem listener de scroll).
 */
export function WhatsAppButton() {
  const [heroVisible, setHeroVisible] = useState(true)
  const [contactVisible, setContactVisible] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('inicio')
    const contato = document.getElementById('contato')
    const rodape = document.querySelector('footer')
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroVisible(e.isIntersecting)
        if (e.target === contato) setContactVisible(e.isIntersecting)
        if (e.target === rodape) setFooterVisible(e.isIntersecting)
      }
    })
    for (const el of [hero, contato, rodape]) if (el) io.observe(el)
    return () => io.disconnect()
  }, [])

  // Some no hero, no contato e no rodapé para não cobrir conteúdo.
  const show = !heroVisible && !contactVisible && !footerVisible
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp (abre em nova aba)"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      // Entrada 320 ms, saída 180 ms e menor: a atenção já está indo para outro lugar.
      className={`fixed bottom-4 right-4 z-30 inline-flex size-14 items-center justify-center rounded-full bg-accent text-accent-on shadow-soft transition-[opacity,transform,background-color] ease-[var(--ease-out)] hover:bg-accent-hover active:scale-[0.96] md:bottom-6 md:right-6 ${show ? 'translate-y-0 scale-100 opacity-100 duration-[320ms]' : 'pointer-events-none translate-y-2 scale-[0.96] opacity-0 duration-[180ms]'}`}
    >
      <MessageCircle aria-hidden size={24} />
    </a>
  )
}
