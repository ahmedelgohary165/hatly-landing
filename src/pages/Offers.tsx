import { OfferCard } from '@/components/OfferCard';
import { InnerPageShell } from '@/components/InnerPageShell';
import { PageMeta } from '@/components/PageMeta';
import { getAppDownloadUrl } from '@/config/download';
import { offersCatalog } from '@/config/offers';

export function Offers() {
  const ctaHref = getAppDownloadUrl();

  return (
    <>
      <PageMeta
        title="عروض هاتلي — اختار العرض المناسب"
        description="عروض هاتلي: هدايا، ميكب، ومناسبات. اختار العرض المناسب وسيتم تحويلك لتحميل التطبيق أو التواصل معنا."
        path="/offers"
      />

      <InnerPageShell
        badge="عروض حصرية"
        title="عروض هاتلي"
        lead="اختار العرض المناسب وسيتم تحويلك لتحميل التطبيق أو التواصل معنا."
      >
        <div className="offers-page-grid" role="list">
          {offersCatalog.map((offer) => (
            <OfferCard key={offer.id} offer={offer} ctaHref={ctaHref} />
          ))}
        </div>
        <p className="ip-note offers-page-note">
          الأسعار والعروض قابلة للتحديث — التفاصيل النهائية داخل التطبيق.
        </p>
      </InnerPageShell>
    </>
  );
}
