import { getSql } from './db';

export type LandingOfferRow = {
  id: string;
  created_at: string;
  updated_at: string;
  offer_code: string;
  title: string;
  description: string | null;
  price_label: string;
  old_price_label: string | null;
  image_url: string | null;
  badge: string | null;
  is_available: boolean;
  sort_order: number;
};

export type UpsertOfferInput = {
  offerCode: string;
  title: string;
  description?: string;
  priceLabel: string;
  oldPriceLabel?: string;
  imageUrl?: string;
  badge?: string;
  isAvailable?: boolean;
  sortOrder?: number;
};

export async function fetchLandingOffers(includeHidden: boolean): Promise<LandingOfferRow[]> {
  const sql = getSql();

  if (includeHidden) {
    return sql<LandingOfferRow[]>`
      SELECT *
      FROM landing_offers
      ORDER BY sort_order ASC, created_at DESC
    `;
  }

  return sql<LandingOfferRow[]>`
    SELECT *
    FROM landing_offers
    WHERE is_available = TRUE
    ORDER BY sort_order ASC, created_at DESC
  `;
}

export async function insertLandingOffer(input: UpsertOfferInput): Promise<LandingOfferRow> {
  const sql = getSql();
  const rows = await sql<LandingOfferRow[]>`
    INSERT INTO landing_offers (
      offer_code,
      title,
      description,
      price_label,
      old_price_label,
      image_url,
      badge,
      is_available,
      sort_order,
      updated_at
    ) VALUES (
      ${input.offerCode},
      ${input.title},
      ${input.description ?? null},
      ${input.priceLabel},
      ${input.oldPriceLabel ?? null},
      ${input.imageUrl ?? null},
      ${input.badge ?? null},
      ${input.isAvailable ?? true},
      ${input.sortOrder ?? 0},
      NOW()
    )
    RETURNING *
  `;

  const row = rows[0];
  if (!row) throw new Error('Failed to insert offer');
  return row;
}

export async function updateLandingOffer(
  id: string,
  input: UpsertOfferInput,
): Promise<LandingOfferRow | null> {
  const sql = getSql();
  const rows = await sql<LandingOfferRow[]>`
    UPDATE landing_offers
    SET
      offer_code = ${input.offerCode},
      title = ${input.title},
      description = ${input.description ?? null},
      price_label = ${input.priceLabel},
      old_price_label = ${input.oldPriceLabel ?? null},
      image_url = ${input.imageUrl ?? null},
      badge = ${input.badge ?? null},
      is_available = ${input.isAvailable ?? true},
      sort_order = ${input.sortOrder ?? 0},
      updated_at = NOW()
    WHERE id = ${id}::uuid
    RETURNING *
  `;
  return rows[0] ?? null;
}

export async function archiveLandingOffer(id: string): Promise<LandingOfferRow | null> {
  const sql = getSql();
  const rows = await sql<LandingOfferRow[]>`
    UPDATE landing_offers
    SET is_available = FALSE, updated_at = NOW()
    WHERE id = ${id}::uuid
    RETURNING *
  `;
  return rows[0] ?? null;
}
