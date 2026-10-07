import { useEffect, useState } from 'react'
import { demoMode } from './content/site'
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

export default function App() {
  const [privacy, setPrivacy] = useState(isPrivacy)
  useEffect(() => {
    const onHash = () => setPrivacy(isPrivacy())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo principal</a>
      {demoMode && (
        <p role="note" className="bg-clay-text px-4 py-2 text-center text-sm text-accent-on">
          Modelo com dados demonstrativos: nome, CRP, contatos, textos e imagens devem ser substituídos antes da publicação.
        </p>
      )}
      <Navbar />
      <main id="conteudo" tabIndex={-1}>
        {privacy ? (
          <PrivacyPage />
        ) : (
          <>
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
          </>
        )}
      </main>
      <Footer />
      {!privacy && <WhatsAppButton />}
    </>
  )
}
