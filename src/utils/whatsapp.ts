import { getPaymentMethodLabel, type PaymentMethodId } from '@/config/payment';
import { site } from '@/config/site';

export function buildWhatsAppUrl(message: string): string {
  return `${site.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function buildProductOrderWhatsAppMessage(params: {
  orderId?: string;
  apiFailed: boolean;
  customerWhatsapp: string;
  title: string;
  productCode: string;
  categoryName: string;
  priceLabel: string;
  requiredDepositLabel: string;
  transferredAmount: string;
  selectedPaymentMethod: PaymentMethodId;
  selectedPaymentNumber: string;
}): string {
  const paymentMethodLabel = getPaymentMethodLabel(params.selectedPaymentMethod);
  const orderLine = params.apiFailed
    ? 'لم يتم إنشاء رقم طلب تلقائي — برجاء متابعة الطلب يدويًا'
    : `رقم الطلب: ${params.orderId}`;

  return `السلام عليكم، تم إرسال طلب من موقع هاتلي.

${orderLine}
رقم واتساب العميل: ${params.customerWhatsapp}

المنتج: ${params.title}
كود المنتج: ${params.productCode}
القسم: ${params.categoryName}
السعر: ${params.priceLabel}
العربون المطلوب لتأكيد الطلب: ${params.requiredDepositLabel}
المبلغ المحوّل: ${params.transferredAmount}

طريقة الدفع: ${paymentMethodLabel}
رقم التحويل: ${params.selectedPaymentNumber}

سأرسل صورة التحويل في نفس المحادثة لتأكيد الطلب يدويًا.`;
}

export function getProductOrderWhatsAppUrl(params: {
  orderId?: string;
  apiFailed: boolean;
  customerWhatsapp: string;
  title: string;
  productCode: string;
  categoryName: string;
  priceLabel: string;
  requiredDepositLabel: string;
  transferredAmount: string;
  selectedPaymentMethod: PaymentMethodId;
  selectedPaymentNumber: string;
}): string {
  return buildWhatsAppUrl(buildProductOrderWhatsAppMessage(params));
}

export function buildOfferConfirmationMessage(params: {
  title: string;
  offerCode: string;
  priceLabel: string;
  deliveryLabel: string;
  selectedPaymentMethod: PaymentMethodId;
  selectedPaymentNumber?: string;
}): string {
  const paymentMethodLabel = getPaymentMethodLabel(params.selectedPaymentMethod);
  const paymentNumber = params.selectedPaymentNumber ?? '';

  return `السلام عليكم، تم تحويل قيمة الطلب وعايز أكد الطلب من هاتلي.

اسم العرض: ${params.title}
كود العرض: ${params.offerCode}
السعر: ${params.priceLabel}
التوصيل: ${params.deliveryLabel}
طريقة الدفع: ${paymentMethodLabel}
رقم التحويل المختار: ${paymentNumber}

هرفق صورة التحويل في نفس المحادثة لتأكيد الطلب.`;
}

export function getOfferConfirmationWhatsAppUrl(params: {
  title: string;
  offerCode: string;
  priceLabel: string;
  deliveryLabel: string;
  selectedPaymentMethod: PaymentMethodId;
  selectedPaymentNumber?: string;
}): string {
  return buildWhatsAppUrl(buildOfferConfirmationMessage(params));
}

export function openWhatsAppUrl(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}
