import { NavLink } from 'react-router-dom';

import { OfferCard } from '@/components/OfferCard';
import { getAppDownloadUrl } from '@/config/download';
import { featuredOffers } from '@/config/offers';
import { landingCopy } from '@/config/site';

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
        {featuredOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} ctaHref={downloadHref} />
        ))}
      </div>

      <div className="lp-offers-foot">
        <NavLink to="/offers" className="lp-btn-offers-all">
          {landingCopy.offersViewAll}
        </NavLink>
      </div>
    </section>
  );
}
