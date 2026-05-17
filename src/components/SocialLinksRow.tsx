import { branding } from '@/assets/branding';
import { site } from '@/config/site';

const socialItems = [
  {
    href: site.whatsappUrl,
    label: 'واتساب',
    icon: branding.icons.whatsapp,
    tone: 'wa',
  },
  {
    href: site.instagramUrl,
    label: 'إنستجرام',
    icon: branding.icons.instagram,
    tone: 'ig',
  },
  {
    href: site.tiktokUrl,
    label: 'تيك توك',
    icon: branding.icons.tiktok,
    tone: 'tt',
  },
  {
    href: site.facebookUrl,
    label: 'فيسبوك',
    icon: branding.icons.facebook,
    tone: 'fb',
  },
] as const;

type SocialLinksRowProps = {
  id?: string;
  className?: string;
  variant?: 'hero' | 'footer';
};

export function SocialLinksRow({
  id,
  className = '',
  variant = 'hero',
}: SocialLinksRowProps) {
  const email = site.email?.trim();
  const isFooter = variant === 'footer';

  return (
    <div
      id={id}
      className={`social-premium social-premium--${variant} ${className}`.trim()}
    >
      <div className="social-premium__glow" aria-hidden />
      <div className="social-premium__grid" role="list">
        {socialItems.map(({ href, label, icon, tone }) => (
          <a
            key={label}
            href={href}
            className={`social-premium__card social-premium__card--${tone}`}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label={label}
            title={label}
          >
            <span className="social-premium__icon-wrap">
              <img src={icon} alt="" className="social-premium__icon" width={32} height={32} />
            </span>
            {!isFooter ? <span className="social-premium__label">{label}</span> : null}
          </a>
        ))}
        {email ? (
          <a
            href={`mailto:${email}`}
            className={`social-premium__card social-premium__card--gm${isFooter ? ' social-premium__card--gm-footer' : ''}`}
            role="listitem"
            aria-label={`بريد ${email}`}
          >
            <span className="social-premium__icon-wrap">
              <img
                src={branding.icons.gmail}
                alt=""
                className="social-premium__icon"
                width={32}
                height={32}
              />
            </span>
            {isFooter ? (
              <span className="social-premium__email-text">{email}</span>
            ) : (
              <span className="social-premium__label">بريد</span>
            )}
          </a>
        ) : null}
      </div>
    </div>
  );
}
