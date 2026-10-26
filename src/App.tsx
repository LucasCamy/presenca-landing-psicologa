import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { demoMode, footer } from './content/site'
import { ease } from './lib/motion'
import { bindAnchorNavigation, destroySmoothScroll, initSmoothScroll, scrollToId, scrollToIdWhenReady } from './lib/smoothScroll'
import { Navbar } from './components/Navbar'
import { HeroProfile } from './components/HeroProfile'
import { WelcomeBlock } from './components/WelcomeBlock'
import { AboutSection } from './components/AboutSection'
import { AudienceSection } from './components/AudienceSection'
import { ProcessSteps } from './components/ProcessSteps'
import { ModalitySection } from './components/ModalitySection'
import { ApproachSection } from './components/ApproachSection'
import { PrinciplesSection } from './components/PrinciplesSection'
import { FAQ } from './components/FAQ'
import { ContactSection } from './components/ContactSection'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { WhatsAppButton } from './components/WhatsAppButton'
import { PrivacyPage } from './components/PrivacyPage'

const isPrivacy = () => window.location.hash === '#/privacidade'
const sectionFromHash = () => {
  const h = window.location.hash
  return h.length > 1 && !h.startsWith('#/') ? decodeURIComponent(h.slice(1)) : null
}

/** Troca de página: saída curta (só opacidade), entrada com blur. Sem deslocamento: a posição da seção de destino é medida durante a entrada. */
const page = {
  initial: { opacity: 0, filter: 'blur(4px)' },
  animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.38, ease: ease.out }, transitionEnd: { filter: 'none' } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: ease.out } },
}

export default function App() {
  const [privacy, setPrivacy] = useState(isPrivacy)

  useEffect(() => {
    initSmoothScroll()
    const unbind = bindAnchorNavigation()
    // Entrou direto em /#secao: posiciona depois que fontes e layout assentarem.
    const initial = sectionFromHash()
    if (initial && !isPrivacy()) document.fonts.ready.then(() => scrollToId(initial, { immediate: true, focus: false }))
    return () => {
      unbind()
      destroySmoothScroll()
    }
  }, [])

  useEffect(() => {
    const onHash = () => {
      const wasPrivacy = document.getElementById('privacidade-title') !== null
      setPrivacy(isPrivacy())
      // Voltando da privacidade para uma seção (ex.: clicou "Contato" no menu): abre já no lugar.
      const id = sectionFromHash()
      if (wasPrivacy && id) scrollToIdWhenReady(id)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo principal</a>
      {demoMode && (
        <p role="note" className="bg-night px-4 py-2 text-center text-sm text-tint">
          {footer.demoNotice}
        </p>
      )}
      <Navbar />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => {
            if (isPrivacy() || !sectionFromHash()) window.scrollTo({ top: 0, behavior: 'instant' })
          }}
        >
          {privacy ? (
            <motion.div key="privacidade" {...page}>
              <PrivacyPage />
            </motion.div>
          ) : (
            <motion.div key="inicio" {...page}>
              <HeroProfile />
              <WelcomeBlock />
              <AboutSection />
              <AudienceSection />
              <ProcessSteps />
              <ModalitySection />
              <ApproachSection />
              <PrinciplesSection />
              <FAQ />
              <ContactSection />
              <FinalCta />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      {!privacy && <WhatsAppButton />}
    </>
  )
}
