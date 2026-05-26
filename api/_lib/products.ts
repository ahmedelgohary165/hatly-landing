import { sql } from '@vercel/postgres';

export type LandingProductRow = {
  id: string;
  created_at: string;
  updated_at: string;
  product_code: string;
  category_id: string;
  title: string;
  description: string | null;
  price_label: string;
  image_url: string | null;
  delivery_label: string;
  is_available: boolean;
  badge: string | null;
  sort_order: number;
};

export type UpsertProductInput = {
  productCode: string;
  categoryId: string;
  title: string;
  description?: string;
  priceLabel: string;
  imageUrl?: string;
  deliveryLabel?: string;
  badge?: string;
  isAvailable?: boolean;
  sortOrder?: number;
};

export async function fetchLandingProducts(includeHidden: boolean): Promise<LandingProductRow[]> {
  if (includeHidden) {
    const result = await sql<LandingProductRow>`
      SELECT *
      FROM landing_products
      ORDER BY sort_order ASC, created_at DESC
    `;
    return result.rows;
  }

  const result = await sql<LandingProductRow>`
    SELECT *
    FROM landing_products
    WHERE is_available = TRUE
    ORDER BY sort_order ASC, created_at DESC
  `;
  return result.rows;
}

export async function insertLandingProduct(input: UpsertProductInput): Promise<LandingProductRow> {
  const result = await sql<LandingProductRow>`
    INSERT INTO landing_products (
      product_code,
      category_id,
      title,
      description,
      price_label,
      image_url,
      delivery_label,
      is_available,
      badge,
      sort_order,
      updated_at
    ) VALUES (
      ${input.productCode},
      ${input.categoryId},
      ${input.title},
      ${input.description ?? null},
      ${input.priceLabel},
      ${input.imageUrl ?? null},
      ${input.deliveryLabel ?? 'التوصيل مجاني'},
      ${input.isAvailable ?? true},
      ${input.badge ?? null},
      ${input.sortOrder ?? 0},
      NOW()
    )
    RETURNING *
  `;

  const row = result.rows[0];
  if (!row) throw new Error('Failed to insert product');
  return row;
}

export async function updateLandingProduct(
  id: string,
  input: UpsertProductInput,
): Promise<LandingProductRow | null> {
  const result = await sql<LandingProductRow>`
    UPDATE landing_products
    SET
      product_code = ${input.productCode},
      category_id = ${input.categoryId},
      title = ${input.title},
      description = ${input.description ?? null},
      price_label = ${input.priceLabel},
      image_url = ${input.imageUrl ?? null},
      delivery_label = ${input.deliveryLabel ?? 'التوصيل مجاني'},
      is_available = ${input.isAvailable ?? true},
      badge = ${input.badge ?? null},
      sort_order = ${input.sortOrder ?? 0},
      updated_at = NOW()
    WHERE id = ${id}::uuid
    RETURNING *
  `;
  return result.rows[0] ?? null;
}

export async function archiveLandingProduct(id: string): Promise<LandingProductRow | null> {
  const result = await sql<LandingProductRow>`
    UPDATE landing_products
    SET is_available = FALSE, updated_at = NOW()
    WHERE id = ${id}::uuid
    RETURNING *
  `;
  return result.rows[0] ?? null;
}
