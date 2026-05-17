import { branding } from '@/assets/branding';
import { site } from '@/config/site';

export function FooterMail() {
  const email = site.email?.trim();
  if (!email) return null;

  return (
    <a
      href={`mailto:${email}`}
      className="footer-mail-card"
      aria-label={`بريد ${email}`}
    >
      <span className="footer-mail-card__icon-wrap">
        <img
          src={branding.icons.gmail}
          alt=""
          className="footer-mail-card__icon"
          width={32}
          height={32}
          decoding="async"
        />
      </span>
      <span className="footer-mail-card__email">{email}</span>
    </a>
  );
}
