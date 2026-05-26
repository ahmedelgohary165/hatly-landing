-- Hatly landing — lightweight order-intent table (Vercel Postgres / Neon)
-- Run once in your DATABASE_URL console (Neon SQL editor or Vercel Storage → Query).

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS landing_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'new',
  customer_whatsapp TEXT NOT NULL,
  product_code TEXT NOT NULL,
  product_title TEXT NOT NULL,
  category_id TEXT NOT NULL,
  category_name TEXT NOT NULL,
  price_label TEXT NOT NULL,
  required_deposit_label TEXT NOT NULL,
  transferred_amount TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  payment_number TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'hatly-landing',
  notes TEXT,
  CONSTRAINT landing_orders_status_check
    CHECK (status IN ('new', 'contacted', 'confirmed', 'cancelled'))
);

CREATE INDEX IF NOT EXISTS landing_orders_created_at_idx
  ON landing_orders (created_at DESC);

CREATE INDEX IF NOT EXISTS landing_orders_status_idx
  ON landing_orders (status);

CREATE TABLE IF NOT EXISTS landing_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  product_code TEXT NOT NULL UNIQUE,
  category_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price_label TEXT NOT NULL,
  image_url TEXT,
  delivery_label TEXT NOT NULL DEFAULT 'التوصيل مجاني',
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  badge TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS landing_products_category_idx
  ON landing_products (category_id, sort_order ASC);

CREATE INDEX IF NOT EXISTS landing_products_available_idx
  ON landing_products (is_available, sort_order ASC);
