import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { BrandLogo } from '@/components/BrandLogo';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { MobileNav } from '@/components/MobileNav';
import { SocialLinksRow } from '@/components/SocialLinksRow';
import { useScrolledHeader } from '@/hooks/useScrolledHeader';
import { getAppDownloadUrl } from '@/config/download';
import {
  footerLegalPaths,
  footerTagline,
  headerNavLinks,
} from '@/config/site';

export function SiteLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const downloadHref = getAppDownloadUrl();
  const scrolled = useScrolledHeader();

  return (
    <div className="app-shell" data-page={isHome ? 'home' : 'inner'}>
      <div className="ambient-layer" aria-hidden>
        <div className="ambient-blob ambient-blob--a" />
        <div className="ambient-blob ambient-blob--b" />
        <div className="ambient-blob ambient-blob--c" />
        <div className="ambient-noise" />
      </div>

      <header className={`site-header-v2${scrolled ? ' site-header-v2--scrolled' : ''}`}>
        <div className="nav-cap">
          <span className="nav-cap-gold-dot" aria-hidden />
          <span className="nav-cap-gold-dot" aria-hidden />
          <div className="nav-cap-inner">
            <BrandLogo layout="nav" />

            <nav className="nav-cap-links nav-cap-links--desktop" aria-label="روابط سريعة">
              {headerNavLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <MobileNav downloadHref={downloadHref} />
            <a
              className="nav-download-btn nav-download-btn--header"
              href={downloadHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              تحميل التطبيق
            </a>
          </div>
        </div>
      </header>

      <main
        className={`app-main app-main--landing app-main-v2${isHome ? '' : ' app-main--inner'}`}
      >
        <Outlet />
      </main>

      <footer className="site-footer-v2">
        <div className="site-footer-wrap">
          <div>
            <BrandLogo layout="footer" link={false} />
            <p className="footer-tagline">{footerTagline}</p>
          </div>
          <div>
            <nav className="footer-nav" aria-label="روابط مهمة">
              {footerLegalPaths.map(({ to, label }) => (
                <NavLink key={to} to={to}>
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="footer-social-slot">
              <SocialLinksRow variant="footer" />
            </div>
            <p className="footer-copy-sm">
              الموقع للتواصل والسياسات — لا حساب مستخدم أو دفع هنا حاليًا.
            </p>
          </div>
          <p className="site-credit">Developed by Ahmed Elgohary</p>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}
