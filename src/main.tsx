import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import './styles/landing-v2.css';
import './styles/hero-branding.css';
import './styles/app-visual.css';
import './styles/landing-polish.css';
import './styles/inner-pages.css';
import App from './App';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('جذر الصفحة #root غير موجود');
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
