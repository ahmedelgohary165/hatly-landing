import { NavLink } from 'react-router-dom';

import { branding } from '@/assets/branding';
import { site } from '@/config/site';

type BrandLogoProps = {
  /** شعار كامل أفقي في الشريط العلوي */
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
        src={branding.logoMark}
        alt=""
        className="brand-logo__mark"
        width={40}
        height={40}
        decoding="async"
      />
      <span className="brand-logo__word">
        <img
          src={branding.logoMain}
          alt={site.appNameAr}
          className="brand-logo__main"
          width={120}
          height={36}
          decoding="async"
        />
        {layout !== 'compact' && (
          <span className="brand-logo__en">{site.appNameEn}</span>
        )}
      </span>
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
