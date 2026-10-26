import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './styles/globals.css'
import App from './App'
import { forceMotion } from './lib/motion'

// ?movimento=1: força as animações para demonstração (ignora 'reduzir movimento' do sistema).
if (forceMotion) document.documentElement.classList.add('force-motion')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Respeita prefers-reduced-motion do sistema */}
    <MotionConfig reducedMotion={forceMotion ? "never" : "user"}>
      <App />
    </MotionConfig>
  </StrictMode>,
)
