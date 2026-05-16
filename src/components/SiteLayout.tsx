import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { branding } from '@/assets/branding';
import { BrandLogo } from '@/components/BrandLogo';
import { SocialLinksRow } from '@/components/SocialLinksRow';
import {
  footerLegalPaths,
  footerTagline,
  site,
} from '@/config/site';

const headerDesktopLinks = [
  { to: '/support', label: 'دعم' },
  { to: '/privacy', label: 'خصوصية' },
  { to: '/links', label: 'روابط' },
] as const;

export function SiteLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="app-shell" data-page={isHome ? 'home' : 'inner'}>
      <div className="ambient-layer" aria-hidden>
        <div className="ambient-blob ambient-blob--a" />
        <div className="ambient-blob ambient-blob--b" />
        <div className="ambient-blob ambient-blob--c" />
        <div className="ambient-noise" />
      </div>

      <header className="site-header-v2">
        <div className="nav-cap">
          <span className="nav-cap-gold-dot" aria-hidden />
          <span className="nav-cap-gold-dot" aria-hidden />
          <div className="nav-cap-inner">
            <BrandLogo layout="nav" />

            <nav className="nav-cap-links" aria-label="روابط سريعة">
              {headerDesktopLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <a
              className="nav-wa-btn"
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={branding.icons.whatsapp}
                alt=""
                className="nav-wa-btn__icon"
                width={18}
                height={18}
              />
              واتساب
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
    </div>
  );
}
