/**
 * ضبط الموقع — عدّل الروابط والنصوص من هنا فقط.
 * لاحقًا: ضع رابط Google Play في `playStoreUrl` عند النشر.
 */

import type { ServiceImageKey } from '@/assets/branding';

export const site = {
  appNameAr: 'هاتلي',
  appNameEn: 'HATLY',
  /** شعار قصير للفوتر والميتا */
  slogan: 'هاتلي… كل اللي نفسك فيه لحد بابك',
  phone: '01038894169',
  whatsappUrl: 'https://wa.me/201038894169',
  facebookUrl: 'https://www.facebook.com/share/14fxqBB9L9W/',
  instagramUrl: 'https://www.instagram.com/hatly_app1?igsh=MW42ZzBpdXZvbTBkOQ==',
  tiktokUrl: 'https://www.tiktok.com/@.hatly.app?_r=1&_t=ZS-96O3TRXfXxU',
  playStoreUrl: null as string | null,
  email: 'hatlyinfo78@gmail.com',
  launchStatus: 'متاح للتحميل',
  serviceAvailabilityNote: 'الخدمة تبدأ تدريجيًا في مناطق محددة',
} as const;

/** نسخة الهيرو والأقسام — قابلة للتعديل */
export const landingCopy = {
  heroBadge: 'تطبيق هاتلي الرسمي',
  heroHeadlineLine1: 'هاتلي…',
  heroHeadlineLine2: 'كل اللي نفسك فيه',
  heroHeadlineLine3: 'لحد بابك',
  heroSub:
    'طلباتك اليومية، الهدايا، الصيدلية، المناسبات، الميكب، والمزيد… كل اللي محتاجه بقى أسهل مع هاتلي.',
  heroMicro: 'أسرع • أسهل • أقرب',
  primaryCta: 'حمّل التطبيق',
  secondaryCta: 'تواصل واتساب',
  servicesBadge: 'خدمات هاتلي',
  servicesTitle: 'كل اللي محتاجه في مكان واحد',
  offersBadge: 'عروض حصرية',
  offersTitle: 'عروض هاتلي',
  offersSubtitle: 'اختيارات مميزة هتخلي طلباتك أسهل وأوفر.',
  offersViewAll: 'شوف كل العروض',
  offerCta: 'اطلب الآن',
  whyBadge: 'ليه هاتلي؟',
  whyTitle: 'تجربة مصممة لراحتك',
  howTitle: 'اطلب اللي محتاجه… وسيبه على هاتلي',
  finalBadge: 'كن أول المنضمين',
  finalTitle: 'خليك من أول الناس اللي تجرب هاتلي',
  finalSub: 'هاتلي… أسهل من أي وقت — كل احتياجاتك في مكان واحد.',
  finalTrustLines: [
    'اطلب اللي نفسك فيه بسهولة',
    'توصيل سريع لحد بابك',
    'عروض وخدمات متنوعة',
  ] as const,
  finalCtaPrimary: 'حمّل التطبيق',
  finalCtaSecondary: 'واتساب',
} as const;

/** شرائح عائمة حول الموبايل */
export const phoneDeliveryChips = ['توصيل سريع', 'تتبّع الطلب', 'دفع عند الاستلام'] as const;

export const phoneMiniOffers = [
  { label: 'خصم ١٥٪', sub: 'هدايا' },
  { label: 'ميكب', sub: 'من ١٤٩ ج' },
] as const;

export const phoneFloatChips = [
  { label: 'خصم اليوم 🔥', tone: 'hot' },
  { label: 'توصيل سريع', tone: 'mint' },
  { label: 'طلب في دقايق', tone: 'gold' },
] as const;

/** أقسام داخل واجهة التطبيق الوهمية (مختارة للتوازن البصري) */
export const phoneAppCategories = [
  { label: 'يومي', imageKey: 'daily' as ServiceImageKey },
  { label: 'صيدلية', imageKey: 'pharmacy' as ServiceImageKey },
  { label: 'هدايا', imageKey: 'gifts' as ServiceImageKey },
  { label: 'ميكب', imageKey: 'makeup' as ServiceImageKey },
  { label: 'تجميل', imageKey: 'cosmetics' as ServiceImageKey },
  { label: 'ألعاب', imageKey: 'toys' as ServiceImageKey },
  { label: 'تسويق', imageKey: 'digitalMarketing' as ServiceImageKey },
  { label: 'رياضة', imageKey: 'sportswear' as ServiceImageKey },
  { label: 'مناسبات', imageKey: 'occasions' as ServiceImageKey },
  { label: 'موبايل', imageKey: 'mobile' as ServiceImageKey },
] as const;

/** بطاقات «طلب سريع» داخل الموبايل */
export const phoneQuickPicks = [
  { label: 'بقالة اليوم', imageKey: 'daily' as ServiceImageKey, meta: 'من ٣٠ د' },
  { label: 'عناية وتجميل', imageKey: 'cosmetics' as ServiceImageKey, meta: 'توصيل سريع' },
] as const;

export const servicesContent = [
  { title: 'طلبات يومية', desc: 'بقالة وأساسيات بسرعة', imageKey: 'daily' as ServiceImageKey },
  { title: 'صيدلية', desc: 'دوا واحتياجات صحية', imageKey: 'pharmacy' as ServiceImageKey },
  { title: 'مكتبات', desc: 'أدوات وكتب ومدارس', imageKey: 'library' as ServiceImageKey },
  { title: 'هدايا', desc: 'هدية لحد قلبك', imageKey: 'gifts' as ServiceImageKey },
  { title: 'مناسبات', desc: 'تجهيزات وفرحة جاهزة', imageKey: 'occasions' as ServiceImageKey },
  { title: 'ميكب', desc: 'كل اللي البنات بتحبه', imageKey: 'makeup' as ServiceImageKey },
  { title: 'بيت المحمول', desc: 'إكسسوارات ومستلزمات الموبايل', imageKey: 'mobile' as ServiceImageKey },
  { title: 'مقلة وعطارة', desc: 'مكسرات وعطارة وطلبات البيت', imageKey: 'roastery' as ServiceImageKey },
  {
    title: 'مستحضرات تجميل',
    desc: 'عناية وبشرة ومنتجات تجميل',
    imageKey: 'cosmetics' as ServiceImageKey,
  },
  {
    title: 'لعب أطفال',
    desc: 'ألعاب وهدايا ممتعة للأطفال',
    imageKey: 'toys' as ServiceImageKey,
  },
  {
    title: 'تسويق إلكتروني',
    desc: 'خدمات سوشيال ميديا وتسويق',
    imageKey: 'digitalMarketing' as ServiceImageKey,
  },
  {
    title: 'أدوات وملابس رياضية',
    desc: 'مستلزمات الجيم والرياضة',
    imageKey: 'sportswear' as ServiceImageKey,
  },
] as const;

export const serviceAreasContent = {
  title: 'المناطق اللي بنبدأ منها',
  subtitle: 'الخدمة بتبدأ تدريجيًا، وهنوسع منطقة ورا منطقة.',
  footnote: 'قريبًا في مناطق أكتر',
  areas: [
    'بنها',
    'طوخ',
    'التجمع',
    'مدينة نصر',
    'مصر الجديدة',
    'المعادي',
    'الرحاب',
    'مدينتي',
  ],
} as const;

/** روابط الهيدر — سطح المكتب */
export const headerNavLinks = [
  { to: '/offers', label: 'العروض' },
  { to: '/support', label: 'الدعم' },
  { to: '/privacy', label: 'الخصوصية' },
  { to: '/links', label: 'الروابط' },
] as const;

export const whyHatlyCards = [
  { title: 'أسرع', desc: 'توصيل سريع لحد بابك' },
  { title: 'أسهل', desc: 'كل طلباتك في تطبيق واحد' },
  { title: 'أوفر', desc: 'عروض مستمرة' },
  { title: 'أفرح', desc: 'هدايا ومناسبات جاهزة' },
] as const;

export const howItWorksSteps = [
  {
    title: 'اختار أو اكتب طلبك',
    desc: 'من غير تعقيد أو لفّ كتير',
  },
  {
    title: 'نأكد التفاصيل',
    desc: 'وفريق هاتلي يتابع معاك',
  },
  {
    title: 'يوصلك لحد بابك',
    desc: 'بأسرع وأسهل طريقة',
  },
] as const;

/** لروابط الهيدر الثانوية (سطح المكتب) */
export const footerLegalPaths = [
  { to: '/offers', label: 'العروض' },
  { to: '/terms', label: 'الشروط والأحكام' },
  { to: '/privacy', label: 'سياسة الخصوصية' },
  { to: '/support', label: 'الدعم' },
  { to: '/account-deletion', label: 'حذف الحساب' },
] as const;

export const footerTagline =
  'طلباتك اليومية بقت أسهل مع هاتلي.' as const;
