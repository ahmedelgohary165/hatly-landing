import { OfferCard } from '@/components/OfferCard';
import { InnerPageShell } from '@/components/InnerPageShell';
import { PageMeta } from '@/components/PageMeta';
import { usePublicOffers } from '@/hooks/usePublicOffers';

export function Offers() {
  const { offers, loading } = usePublicOffers();

  return (
    <>
      <PageMeta
        title="عروض هاتلي — اختار العرض المناسب"
        description="عروض هاتلي: هدايا، ميكب، ومناسبات. اختار العرض واطلبه عبر الدفع اليدوي وتأكيد واتساب."
        path="/offers"
      />

      <InnerPageShell
        badge="عروض حصرية"
        title="عروض هاتلي"
        lead="اختار العرض واضغط «عرض التفاصيل» — اختار طريقة الدفع، حوّل، ثم أكّد على واتساب."
      >
        {loading ? <p className="operator-message">جاري تحميل العروض…</p> : null}

        {!loading ? (
          <div className="offers-page-grid" role="list">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : null}
        <p className="ip-note offers-page-note">
          الأسعار والعروض قابلة للتحديث — التأكيد النهائي بعد مراجعة صورة التحويل يدويًا.
        </p>
      </InnerPageShell>
    </>
  );
}
