import { getSql } from './db.js';
import {
  STATIC_PRODUCT_CODES,
  computeNextOfferCode,
  computeNextProductCode,
} from './codes.js';

export async function generateNextProductCode(categoryId: string): Promise<string> {
  const sql = getSql();
  const rows = await sql<{ product_code: string }[]>`SELECT product_code FROM landing_products`;
  const allCodes = [...STATIC_PRODUCT_CODES, ...rows.map((row) => row.product_code)];
  return computeNextProductCode(categoryId, allCodes);
}

export async function generateNextOfferCode(): Promise<string> {
  const sql = getSql();
  const rows = await sql<{ offer_code: string }[]>`SELECT offer_code FROM landing_offers`;
  return computeNextOfferCode(rows.map((row) => row.offer_code));
}
