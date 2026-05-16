import { branding } from '@/assets/branding';
import { getAppDownloadUrl } from '@/config/download';
import { landingCopy, offersContent } from '@/config/site';

const offerImages = {
  offer1: branding.offers.offer1,
  offer2: branding.offers.offer2,
  offer3: branding.offers.offer3,
} as const;

export function OffersSection() {
  const downloadHref = getAppDownloadUrl();

  return (
    <section className="lp-sec lp-sec--offers" aria-labelledby="lp-offers-head">
      <div className="lp-sec-head lp-sec-head--tight">
        <span className="lp-sec-badge">{landingCopy.offersBadge}</span>
        <h2 id="lp-offers-head" className="lp-sec-title">
          {landingCopy.offersTitle}
        </h2>
        <p className="lp-sec-sub">{landingCopy.offersSubtitle}</p>
      </div>

      <div className="lp-offers-track" role="list">
        {offersContent.map(({ title, subtitle, imageKey }) => (
          <article key={title} className="lp-offer-card" role="listitem">
            <div className="lp-offer-card__media">
              <img
                src={offerImages[imageKey]}
                alt=""
                className="lp-offer-card__img"
                loading="lazy"
                decoding="async"
              />
              <span className="lp-offer-card__shine" aria-hidden />
            </div>
            <div className="lp-offer-card__body">
              <h3>{title}</h3>
              <p>{subtitle}</p>
              <a
                className="lp-offer-card__cta"
                href={downloadHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {landingCopy.offerCta}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
