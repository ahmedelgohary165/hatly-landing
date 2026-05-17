import { branding } from '@/assets/branding';
import { site } from '@/config/site';

export function FloatingWhatsApp() {
  return (
    <a
      className="fab-wa"
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل واتساب"
    >
      <img
        src={branding.icons.whatsapp}
        alt=""
        className="fab-wa__icon"
        width={26}
        height={26}
        decoding="async"
      />
      <span className="fab-wa__text">واتساب</span>
    </a>
  );
}
