import { branding } from '@/assets/branding';
import { PageMeta } from '@/components/PageMeta';
import { getAppDownloadUrl } from '@/config/download';
import { site } from '@/config/site';

const linkItems = [
  {
    href: site.whatsappUrl,
    label: 'واتساب',
    icon: branding.icons.whatsapp,
    primary: true,
  },
  {
    href: site.facebookUrl,
    label: 'فيسبوك',
    icon: branding.icons.facebook,
  },
  {
    href: site.instagramUrl,
    label: 'إنستجرام',
    icon: branding.icons.instagram,
  },
  {
    href: site.tiktokUrl,
    label: 'تيك توك',
    icon: branding.icons.tiktok,
  },
] as const;

export function Links() {
  const downloadHref = getAppDownloadUrl();

  return (
    <>
      <PageMeta
        title="روابط هاتلي — تواصل وحمّل التطبيق"
        description="كل روابط هاتلي في مكان واحد: واتساب، فيسبوك، إنستجرام، تيك توك، وتحميل التطبيق."
        path="/links"
      />

      <div className="ip-page ip-links">
        <div className="ip-links-card">
          <img
            src={branding.logoMain}
            alt="هاتلي"
            className="ip-links-logo"
            width={88}
            height={88}
            decoding="async"
          />
          <p className="ip-links-brand">{site.appNameAr}</p>
          <p className="ip-links-slogan">{site.slogan}</p>

          <nav className="ip-links-list" aria-label="روابط هاتلي">
            {linkItems.map((item) => (
              <a
                key={item.label}
                className={`ip-links-btn${'primary' in item && item.primary ? ' ip-links-btn--primary' : ''}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={item.icon}
                  alt=""
                  className="ip-links-btn__icon"
                  width={22}
                  height={22}
                  decoding="async"
                />
                {item.label}
              </a>
            ))}
            <a
              className="ip-links-btn ip-links-btn--download"
              href={downloadHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              حمّل التطبيق
            </a>
          </nav>
        </div>

        <p className="ip-note">{site.launchStatus}</p>
      </div>
    </>
  );
}
