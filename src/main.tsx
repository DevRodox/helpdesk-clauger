import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelpDeskApp } from './HelpDeskApp'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelpDeskApp />
  </StrictMode>,
)
