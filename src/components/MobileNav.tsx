import { useEffect, useId, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { headerNavLinks } from '@/config/site';

type MobileNavProps = {
  downloadHref: string;
};

export function MobileNav({ downloadHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    document.body.classList.toggle('nav-drawer-open', open);
    return () => document.body.classList.remove('nav-drawer-open');
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        className="nav-menu-btn"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-menu-btn__bars" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="nav-menu-btn__label">القائمة</span>
      </button>

      <button
        type="button"
        className={`nav-drawer-backdrop${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />

      <div
        id={panelId}
        className={`nav-drawer${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="قائمة التنقل"
      >
        <div className="nav-drawer__head">
          <span className="nav-drawer__title">هاتلي</span>
          <button
            type="button"
            className="nav-drawer__close"
            aria-label="إغلاق"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="nav-drawer__links">
          {headerNavLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>

        <a
          className="nav-drawer__cta"
          href={downloadHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          تحميل التطبيق
        </a>
      </div>
    </>
  );
}
