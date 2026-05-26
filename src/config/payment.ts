export type PaymentMethodId = 'instapay' | 'ewallet';

/** طرق الدفع — عدّل الأرقام من هنا فقط */
export const paymentMethods = {
  instapay: {
    id: 'instapay' as const,
    label: 'InstaPay',
    numberLabel: 'رقم InstaPay:',
    numbers: ['01038894564'],
  },
  ewallet: {
    id: 'ewallet' as const,
    label: 'محفظة إلكترونية',
    numbersLabel: 'أرقام المحافظ الإلكترونية:',
    numbers: ['01038894169', '01272501616'],
  },
} as const;

export const paymentFlowNote =
  'بعد التحويل، اضغط "تم التحويل" وسيتم فتح واتساب تلقائيًا لإرسال تفاصيل الطلب وصورة التحويل.';

export const paymentMethodList: PaymentMethodId[] = ['instapay', 'ewallet'];

export function getPaymentMethodLabel(methodId: PaymentMethodId): string {
  return paymentMethods[methodId].label;
}

export function getPaymentNumbersForMethod(methodId: PaymentMethodId): readonly string[] {
  return paymentMethods[methodId].numbers;
}

export function formatSelectedPaymentNumber(methodId: PaymentMethodId): string {
  return paymentMethods[methodId].numbers.join(' / ');
}
