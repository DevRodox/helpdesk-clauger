import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './contexts';
import { HelpDeskApp } from './HelpDeskApp';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <HelpDeskApp />
    </LanguageProvider>
  </StrictMode>,
);