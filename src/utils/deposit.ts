const ARABIC_DIGIT_MAP: Record<string, string> = {
  '٠': '0',
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
};

const WESTERN_TO_ARABIC = '٠١٢٣٤٥٦٧٨٩';

export function toArabicNumerals(value: number): string {
  return String(Math.round(value)).replace(/\d/g, (digit) => WESTERN_TO_ARABIC[Number(digit)]);
}

export function parsePriceLabel(priceLabel: string): number | null {
  const normalized = priceLabel
    .replace(/[٠-٩]/g, (char) => ARABIC_DIGIT_MAP[char] ?? char)
    .replace(/[^\d.]/g, ' ');
  const matches = normalized.match(/\d+(?:\.\d+)?/g);
  if (!matches?.length) return null;
  const parsed = Number.parseFloat(matches[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

export function getRequiredDepositLabel(priceLabel: string): string {
  const price = parsePriceLabel(priceLabel);
  if (price === null) {
    return 'سيتم تأكيد قيمة العربون مع فريق هاتلي.';
  }

  const deposit = Math.ceil(price * 0.3);
  return `${toArabicNumerals(deposit)} ج (30% تقريبي من ${priceLabel})`;
}

export const DEPOSIT_HEADLINE = 'لتأكيد الطلب يتم دفع 30% مقدمًا من قيمة الطلب';

export const DEPOSIT_INSTRUCTION =
  'لتأكيد الطلب: حوّل 30% من قيمة الطلب، وبعدها ابعت صورة التحويل على واتساب.';
