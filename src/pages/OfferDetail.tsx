import { NavLink, useParams } from 'react-router-dom';

import { ManualPaymentFlow } from '@/components/ManualPaymentFlow';
import { InnerPageShell } from '@/components/InnerPageShell';
import { PageMeta } from '@/components/PageMeta';
import { useOfferByCode } from '@/hooks/usePublicOffers';
import { DEFAULT_DELIVERY_LABEL } from '@/config/products';
import type { PaymentMethodId } from '@/config/payment';
import { captureOfferOrderIntent } from '@/utils/orderCapture';
import { getOfferConfirmationWhatsAppUrl, openWhatsAppUrl } from '@/utils/whatsapp';

export function OfferDetail() {
  const { offerCode = '' } = useParams<{ offerCode: string }>();
  const { offer, loading } = useOfferByCode(offerCode);

  if (loading) {
    return (
      <>
        <PageMeta
          title="تفاصيل العرض — هاتلي"
          description="جاري تحميل تفاصيل العرض."
          path={`/offers/${offerCode}`}
        />
        <InnerPageShell badge="عروض حصرية" title="تفاصيل العرض" lead="جاري التحميل…">
          <p className="operator-message">جاري تحميل العرض…</p>
        </InnerPageShell>
      </>
    );
  }

  if (!offer) {
    return (
      <>
        <PageMeta
          title="العرض غير موجود — هاتلي"
          description="العرض المطلوب غير متاح حاليًا."
          path={`/offers/${offerCode}`}
        />
        <InnerPageShell
          badge="عروض حصرية"
          title="العرض غير موجود"
          lead="العرض اللي بتدور عليه مش متاح حاليًا."
        >
          <NavLink to="/offers" className="ip-cta ip-cta--secondary">
            <span className="ip-cta__text">
              <strong>العودة للعروض</strong>
            </span>
          </NavLink>
        </InnerPageShell>
      </>
    );
  }

  const handleConfirm = ({
    selectedPaymentMethod,
    selectedPaymentNumber,
  }: {
    selectedPaymentMethod: PaymentMethodId;
    selectedPaymentNumber: string;
  }) => {
    captureOfferOrderIntent({
      offerCode: offer.offerCode,
      offerTitle: offer.title,
      priceLabel: offer.priceLabel,
      selectedPaymentMethod,
      selectedPaymentNumber,
    });

    const whatsappUrl = getOfferConfirmationWhatsAppUrl({
      title: offer.title,
      offerCode: offer.offerCode,
      priceLabel: offer.priceLabel,
      deliveryLabel: DEFAULT_DELIVERY_LABEL,
      selectedPaymentMethod,
      selectedPaymentNumber,
    });

    openWhatsAppUrl(whatsappUrl);
  };

  return (
    <>
      <PageMeta
        title={`${offer.title} — تفاصيل العرض`}
        description={offer.description}
        path={`/offers/${offer.offerCode}`}
      />

      <InnerPageShell
        badge="عروض حصرية"
        title="تفاصيل العرض"
        lead="اختار طريقة الدفع، حوّل، ثم أكّد الطلب على واتساب."
        className="ip-page--products ip-page--detail"
      >
        <article className="product-detail">
          <div className="product-detail__media">
            {offer.badge ? (
              <span className="product-detail__badge">{offer.badge}</span>
            ) : null}
            <img
              src={offer.image}
              alt=""
              className="product-detail__img"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="product-detail__info">
            <p className="product-detail__code" dir="ltr">
              {offer.offerCode}
            </p>
            <h2 className="product-detail__name">{offer.title}</h2>
            <p className="product-detail__desc">{offer.description}</p>
            <div className="product-detail__meta">
              <span className="product-detail__price">{offer.priceLabel}</span>
              {offer.oldPriceLabel ? (
                <span className="product-detail__old-price">{offer.oldPriceLabel}</span>
              ) : null}
              <span className="product-detail__delivery">{DEFAULT_DELIVERY_LABEL}</span>
            </div>
          </div>
        </article>

        <ManualPaymentFlow onConfirm={handleConfirm} />

        <NavLink to="/offers" className="product-detail__back ip-cta ip-cta--secondary">
          <span className="ip-cta__text">
            <strong>العودة للعروض</strong>
          </span>
        </NavLink>
      </InnerPageShell>
    </>
  );
}
