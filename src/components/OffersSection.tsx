import { NavLink } from 'react-router-dom';

import { OfferCard } from '@/components/OfferCard';
import { usePublicOffers } from '@/hooks/usePublicOffers';
import { landingCopy } from '@/config/site';

function OffersEmptyState() {
  return (
    <div className="products-empty" role="status">
      <p className="products-empty__title">سيتم إضافة العروض قريبًا</p>
      <p className="products-empty__text">تابع هاتلي لمعرفة أحدث العروض.</p>
    </div>
  );
}

export function OffersSection() {
  const { featuredOffers, loading, hasOffers } = usePublicOffers();

  return (
    <section className="lp-sec lp-sec--offers" aria-labelledby="lp-offers-head">
      <div className="lp-sec-head lp-sec-head--tight">
        <span className="lp-sec-badge">{landingCopy.offersBadge}</span>
        <h2 id="lp-offers-head" className="lp-sec-title">
          {landingCopy.offersTitle}
        </h2>
        <p className="lp-sec-sub">{landingCopy.offersSubtitle}</p>
      </div>

      {loading ? <p className="operator-message">جاري تحميل العروض…</p> : null}

      {!loading && hasOffers ? (
        <div className="lp-offers-track" role="list">
          {featuredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      ) : null}

      {!loading && !hasOffers ? <OffersEmptyState /> : null}

      {hasOffers ? (
        <div className="lp-offers-foot">
          <NavLink to="/offers" className="lp-btn-offers-all">
            {landingCopy.offersViewAll}
          </NavLink>
        </div>
      ) : null}
    </section>
  );
}
