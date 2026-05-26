import { productsCatalog } from '@/config/products';

export const CATEGORY_CODE_PREFIX: Record<string, string> = {
  daily: 'DAILY',
  pharmacy: 'PHARM',
  library: 'LIB',
  gifts: 'GIFT',
  occasions: 'OCC',
  makeup: 'MAKEUP',
  mobile: 'MOBILE',
  roastery: 'ROAST',
  cosmetics: 'COSM',
  toys: 'TOYS',
  digitalMarketing: 'DIGI',
  sportswear: 'SPORT',
};

export function getCategoryCodePrefix(categoryId: string): string {
  return CATEGORY_CODE_PREFIX[categoryId] ?? 'ITEM';
}

export function parseSequentialCode(code: string, prefix: string): number | null {
  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = code.trim().toUpperCase().match(new RegExp(`^${escaped}-(\\d+)$`));
  if (!match) return null;
  return Number.parseInt(match[1], 10);
}

export function formatSequentialCode(prefix: string, sequence: number): string {
  return `${prefix}-${String(sequence).padStart(3, '0')}`;
}

export function computeNextProductCode(categoryId: string, existingCodes: readonly string[]): string {
  const prefix = getCategoryCodePrefix(categoryId);
  let max = 0;
  for (const code of existingCodes) {
    const num = parseSequentialCode(code, prefix);
    if (num !== null && num > max) max = num;
  }
  return formatSequentialCode(prefix, max + 1);
}

export function computeNextOfferCode(existingCodes: readonly string[]): string {
  let max = 0;
  for (const code of existingCodes) {
    const num = parseSequentialCode(code, 'OFFER');
    if (num !== null && num > max) max = num;
  }
  return formatSequentialCode('OFFER', max + 1);
}

export function getStaticProductCodes(): string[] {
  return productsCatalog.map((product) => product.productCode);
}

export function previewNextProductCode(
  categoryId: string,
  dbProductCodes: readonly string[],
): string {
  return computeNextProductCode(categoryId, [...getStaticProductCodes(), ...dbProductCodes]);
}

export function previewNextOfferCode(dbOfferCodes: readonly string[]): string {
  return computeNextOfferCode(dbOfferCodes);
}
