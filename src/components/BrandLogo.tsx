import { NavLink } from 'react-router-dom';

import { branding } from '@/assets/branding';
import { site } from '@/config/site';

type BrandLogoProps = {
  layout?: 'nav' | 'footer' | 'compact';
  link?: boolean;
  className?: string;
};

export function BrandLogo({
  layout = 'nav',
  link = true,
  className = '',
}: BrandLogoProps) {
  const inner = (
    <span className={`brand-logo brand-logo--${layout} ${className}`.trim()}>
      <img
        src={branding.logoMain}
        alt=""
        className="brand-logo__main"
        width={layout === 'footer' ? 140 : 120}
        height={layout === 'footer' ? 44 : 38}
        decoding="async"
      />
      <span className="brand-logo__ar">{site.appNameAr}</span>
    </span>
  );

  if (link) {
    return (
      <NavLink className="brand-logo-link" end to="/" aria-label={`${site.appNameAr} — الرئيسية`}>
        {inner}
      </NavLink>
    );
  }

  return inner;
}
