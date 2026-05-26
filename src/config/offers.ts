import offerGifts from '@/assets/branding/offer-gifts.png';
import offerMakeup from '@/assets/branding/offer-makeup.png';
import offerOccasions from '@/assets/branding/offer-occasions.png';

export type OfferCategory = 'gifts' | 'makeup' | 'occasions';

export type OfferItem = {
  id: string;
  offerCode: string;
  title: string;
  description: string;
  priceLabel: string;
  oldPriceLabel?: string;
  image: string;
  category: OfferCategory;
  ctaLabel: string;
  isFeatured: boolean;
  badge?: string;
};

/** نماذج عروض — قابلة للتحديث لاحقًا من لوحة التحكم */
export const offersCatalog: OfferItem[] = [
  {
    id: 'gifts',
    offerCode: 'OFFER-GIFTS',
    title: 'عرض هدايا',
    description: 'هدايا مميزة لكل المناسبات — اختار اللي يناسبك.',
    priceLabel: 'من ١٩٩ ج',
    image: offerGifts,
    category: 'gifts',
    ctaLabel: 'اطلب الآن',
    isFeatured: true,
    badge: 'عرض مميز',
  },
  {
    id: 'makeup',
    offerCode: 'OFFER-MAKEUP',
    title: 'عرض ميكب',
    description: 'مستحضرات وميكب بعناية — توصيل لحد بابك.',
    priceLabel: 'من ١٤٩ ج',
    oldPriceLabel: '١٩٩ ج',
    image: offerMakeup,
    category: 'makeup',
    ctaLabel: 'اطلب الآن',
    isFeatured: true,
    badge: 'الأكثر طلبًا',
  },
  {
    id: 'occasions',
    offerCode: 'OFFER-OCCASIONS',
    title: 'عرض مناسبات',
    description: 'تجهيزات مناسبات جاهزة — وفّر وقتك وجهدك.',
    priceLabel: 'باقات متنوعة',
    image: offerOccasions,
    category: 'occasions',
    ctaLabel: 'اطلب الآن',
    isFeatured: true,
    badge: 'لفترة محدودة',
  },
];

export const featuredOffers = offersCatalog.filter((o) => o.isFeatured);

export function getOfferByCode(offerCode: string): OfferItem | undefined {
  return offersCatalog.find((offer) => offer.offerCode === offerCode);
}
