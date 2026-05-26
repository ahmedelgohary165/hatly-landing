import { NavLink } from 'react-router-dom';

import type { ProductItem } from '@/config/products';

type ProductCardProps = {
  product: ProductItem;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="lp-product-card" role="listitem">
      <div className="lp-product-card__media">
        {product.badge ? (
          <span className="lp-product-card__ribbon">{product.badge}</span>
        ) : null}
        <img
          src={product.image}
          alt=""
          className="lp-product-card__img"
          loading="lazy"
          decoding="async"
        />
        <span className="lp-product-card__shine" aria-hidden />
      </div>
      <div className="lp-product-card__body">
        <p className="lp-product-card__code">{product.productCode}</p>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p className="lp-product-card__price">{product.priceLabel}</p>
        <NavLink
          className="lp-product-card__cta"
          to={`/products/${product.productCode}`}
        >
          عرض التفاصيل
        </NavLink>
      </div>
    </article>
  );
}
