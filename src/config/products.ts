import type { ServiceImageKey } from '@/assets/branding';
import { branding } from '@/assets/branding';

export type ProductCategory = {
  id: string;
  title: string;
  description: string;
  imageKey: ServiceImageKey;
};

export type ProductItem = {
  id: string;
  productCode: string;
  categoryId: string;
  title: string;
  description: string;
  priceLabel: string;
  image: string;
  deliveryLabel?: string;
  badge?: string;
  isAvailable: boolean;
};

export const DEFAULT_DELIVERY_LABEL = 'التوصيل مجاني' as const;

/** أقسام المنتجات — عدّل العناوين والأوصاف من هنا */
export const productCategories: ProductCategory[] = [
  {
    id: 'daily',
    title: 'طلبات يومية',
    description: 'بقالة وأساسيات بسرعة — اختار المنتج واطلبه على واتساب.',
    imageKey: 'daily',
  },
  {
    id: 'pharmacy',
    title: 'صيدلية',
    description: 'دوا واحتياجات صحية — اطلب بسهولة واتساب.',
    imageKey: 'pharmacy',
  },
  {
    id: 'library',
    title: 'مكتبات',
    description: 'أدوات وكتب ومدارس — منتجات جاهزة للطلب.',
    imageKey: 'library',
  },
  {
    id: 'gifts',
    title: 'هدايا',
    description: 'هدية لحد قلبك — اختار واطلب على واتساب.',
    imageKey: 'gifts',
  },
  {
    id: 'occasions',
    title: 'مناسبات',
    description: 'تجهيزات وفرحة جاهزة — اطلب اللي يناسب مناسبتك.',
    imageKey: 'occasions',
  },
  {
    id: 'makeup',
    title: 'ميكب',
    description: 'كل اللي البنات بتحبه — منتجات ميكب مختارة.',
    imageKey: 'makeup',
  },
  {
    id: 'mobile',
    title: 'بيت المحمول',
    description: 'إكسسوارات ومستلزمات الموبايل.',
    imageKey: 'mobile',
  },
  {
    id: 'roastery',
    title: 'مقلة وعطارة',
    description: 'مكسرات وعطارة وطلبات البيت.',
    imageKey: 'roastery',
  },
  {
    id: 'cosmetics',
    title: 'مستحضرات تجميل',
    description: 'عناية وبشرة ومنتجات تجميل.',
    imageKey: 'cosmetics',
  },
  {
    id: 'toys',
    title: 'لعب أطفال',
    description: 'ألعاب وهدايا ممتعة للأطفال',
    imageKey: 'toys',
  },
  {
    id: 'digitalMarketing',
    title: 'تسويق إلكتروني',
    description: 'خدمات سوشيال ميديا وتسويق.',
    imageKey: 'digitalMarketing',
  },
  {
    id: 'sportswear',
    title: 'أدوات وملابس رياضية',
    description: 'مستلزمات الجيم والرياضة.',
    imageKey: 'sportswear',
  },
];

/** منتجات ثابتة — عدّل أو أضف منتجات من هنا */
export const productsCatalog: ProductItem[] = [
  {
    id: 'gift-box-rose',
    productCode: 'GIFT-001',
    categoryId: 'gifts',
    title: 'بوكس هدية ورد',
    description: 'بوكس هدية أنيق مع ورد طبيعي — مناسب لكل المناسبات.',
    priceLabel: '٣٤٩ ج',
    image: branding.services.gifts,
    badge: 'الأكثر طلبًا',
    isAvailable: true,
  },
  {
    id: 'gift-chocolate',
    productCode: 'GIFT-002',
    categoryId: 'gifts',
    title: 'بوكس شوكولاتة فاخر',
    description: 'تشكيلة شوكولاتة بلجيكية في علبة هدية.',
    priceLabel: '٢٤٩ ج',
    image: branding.services.gifts,
    isAvailable: true,
  },
  {
    id: 'makeup-set-basic',
    productCode: 'MAKEUP-001',
    categoryId: 'makeup',
    title: 'طقم ميكب أساسي',
    description: 'أساسيات الميكب اليومي — كونسيلر، mascara، وبلاشر.',
    priceLabel: '٤٩٩ ج',
    image: branding.services.makeup,
    badge: 'عرض مميز',
    isAvailable: true,
  },
  {
    id: 'makeup-lipstick',
    productCode: 'MAKEUP-002',
    categoryId: 'makeup',
    title: 'أحمر شفاه مات',
    description: 'درجات ترند — ثبات طويل وملمس ناعم.',
    priceLabel: '١٧٩ ج',
    image: branding.services.makeup,
    isAvailable: true,
  },
  {
    id: 'pharm-vitamin-c',
    productCode: 'PHARM-001',
    categoryId: 'pharmacy',
    title: 'فيتامين C 1000',
    description: 'مكمل غذائي لتقوية المناعة — 30 قرص.',
    priceLabel: '١٢٩ ج',
    image: branding.services.pharmacy,
    isAvailable: true,
  },
  {
    id: 'pharm-panadol',
    productCode: 'PHARM-002',
    categoryId: 'pharmacy',
    title: 'بانادول إكسترا',
    description: 'مسكن للصداع والآلام — علبة 24 قرص.',
    priceLabel: '٤٥ ج',
    image: branding.services.pharmacy,
    isAvailable: true,
  },
  {
    id: 'daily-grocery',
    productCode: 'DAILY-001',
    categoryId: 'daily',
    title: 'بasket أساسيات البيت',
    description: 'سكر، أرز، زيت، ومعكرونة — أساسيات الأسبوع.',
    priceLabel: '٢٩٩ ج',
    image: branding.services.daily,
    isAvailable: true,
  },
  {
    id: 'occasions-balloons',
    productCode: 'OCC-001',
    categoryId: 'occasions',
    title: 'باقة بالونات احتفال',
    description: 'بالونات ملونة مع شريط — جاهزة للتسليم.',
    priceLabel: '١٥٩ ج',
    image: branding.services.occasions,
    badge: 'جديد',
    isAvailable: true,
  },
  {
    id: 'cosmetics-serum',
    productCode: 'COSM-001',
    categoryId: 'cosmetics',
    title: 'سيروم فيتامين C للوجه',
    description: 'ترطيب وتفتيح — مناسب لكل أنواع البشرة.',
    priceLabel: '٢٧٩ ج',
    image: branding.services.cosmetics,
    isAvailable: true,
  },
];

export function getCategoryById(categoryId: string): ProductCategory | undefined {
  return productCategories.find((category) => category.id === categoryId);
}

export function getProductsByCategory(categoryId: string): ProductItem[] {
  return productsCatalog.filter(
    (product) => product.categoryId === categoryId && product.isAvailable,
  );
}

export function getProductByCode(productCode: string): ProductItem | undefined {
  return productsCatalog.find(
    (product) => product.productCode === productCode && product.isAvailable,
  );
}

export function resolveDeliveryLabel(product: ProductItem): string {
  return product.deliveryLabel ?? DEFAULT_DELIVERY_LABEL;
}
