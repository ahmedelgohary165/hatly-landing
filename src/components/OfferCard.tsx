import type { OfferItem } from '@/config/offers';

type OfferCardProps = {
  offer: OfferItem;
  ctaHref: string;
};

export function OfferCard({ offer, ctaHref }: OfferCardProps) {
  return (
    <article className="lp-offer-card" role="listitem">
      <div className="lp-offer-card__media">
        {offer.badge ? (
          <span className="lp-offer-card__ribbon">{offer.badge}</span>
        ) : null}
        <img
          src={offer.image}
          alt=""
          className="lp-offer-card__img"
          loading="lazy"
          decoding="async"
        />
        <span className="lp-offer-card__shine" aria-hidden />
      </div>
      <div className="lp-offer-card__body">
        <h3>{offer.title}</h3>
        <p>{offer.description}</p>
        <p className="lp-offer-card__price-row">
          {offer.oldPriceLabel ? (
            <span className="lp-offer-card__old-price">{offer.oldPriceLabel}</span>
          ) : null}
          <span className="lp-offer-card__price">{offer.priceLabel}</span>
        </p>
        <a
          className="lp-offer-card__cta"
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {offer.ctaLabel}
        </a>
      </div>
    </article>
  );
}
