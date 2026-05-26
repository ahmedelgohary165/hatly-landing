import { sql } from '@vercel/postgres';

export type OrderStatus = 'new' | 'contacted' | 'confirmed' | 'cancelled';

export type LandingOrderRow = {
  id: string;
  created_at: string;
  status: OrderStatus;
  customer_whatsapp: string;
  product_code: string;
  product_title: string;
  category_id: string;
  category_name: string;
  price_label: string;
  required_deposit_label: string;
  transferred_amount: string;
  payment_method: string;
  payment_number: string;
  source: string;
  notes: string | null;
};

export type CreateOrderInput = {
  customerWhatsapp: string;
  productCode: string;
  productTitle: string;
  categoryId: string;
  categoryName: string;
  priceLabel: string;
  requiredDepositLabel: string;
  transferredAmount: string;
  paymentMethod: string;
  paymentNumber: string;
  source?: string;
  notes?: string;
};

const ORDER_STATUSES: OrderStatus[] = ['new', 'contacted', 'confirmed', 'cancelled'];

export function isValidOrderStatus(status: string): status is OrderStatus {
  return ORDER_STATUSES.includes(status as OrderStatus);
}

export async function insertLandingOrder(input: CreateOrderInput): Promise<LandingOrderRow> {
  const result = await sql<LandingOrderRow>`
    INSERT INTO landing_orders (
      customer_whatsapp,
      product_code,
      product_title,
      category_id,
      category_name,
      price_label,
      required_deposit_label,
      transferred_amount,
      payment_method,
      payment_number,
      source,
      notes
    ) VALUES (
      ${input.customerWhatsapp},
      ${input.productCode},
      ${input.productTitle},
      ${input.categoryId},
      ${input.categoryName},
      ${input.priceLabel},
      ${input.requiredDepositLabel},
      ${input.transferredAmount},
      ${input.paymentMethod},
      ${input.paymentNumber},
      ${input.source ?? 'hatly-landing'},
      ${input.notes ?? null}
    )
    RETURNING *
  `;

  const row = result.rows[0];
  if (!row) {
    throw new Error('Failed to insert order');
  }

  return row;
}

export async function fetchLandingOrders(): Promise<LandingOrderRow[]> {
  const result = await sql<LandingOrderRow>`
    SELECT *
    FROM landing_orders
    ORDER BY created_at DESC
    LIMIT 200
  `;
  return result.rows;
}

export async function updateLandingOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<LandingOrderRow | null> {
  const result = await sql<LandingOrderRow>`
    UPDATE landing_orders
    SET status = ${status}
    WHERE id = ${id}::uuid
    RETURNING *
  `;
  return result.rows[0] ?? null;
}
