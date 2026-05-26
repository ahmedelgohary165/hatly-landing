# Hatly Landing — Order Capture Setup

Lightweight order-intent capture for the marketing site only. No payment processing, no screenshot storage.

See also: [OPERATOR_SETUP.md](./OPERATOR_SETUP.md) for hub, products, and footer access.

## Required environment variables (Vercel project settings)

| Variable | Where | Purpose |
|----------|--------|---------|
| `DATABASE_URL` | Server only | Postgres connection (Vercel Postgres / Neon) |
| `OPERATOR_PASSWORD` | Server only | Protects operator APIs |
| `OPERATOR_API_SECRET` | Server only | Optional API secret override |
| `VITE_OPERATOR_PASSWORD` | Build-time (frontend) | Operator login + footer entry |
| `VITE_OPERATOR_ENTRY_CODE` | Build-time | Optional alias for login code |

Set the **same secret** for server (`OPERATOR_PASSWORD` or `OPERATOR_API_SECRET`) and frontend (`VITE_OPERATOR_PASSWORD`).

## Database setup

1. Create a Postgres database (Vercel → Storage → Postgres, Neon, or **Supabase**).
2. Copy the **direct Postgres** connection string into Vercel as `DATABASE_URL`.
   - Supabase example: `postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres`
   - Use **Session mode / direct** (port `5432`), not the pooler URL, unless you set `prepare: false` (already configured in `api/_lib/db.ts`).
3. Run `db/schema.sql` once in the SQL console (`landing_orders`, `landing_products`, `landing_offers`).

If the database already has orders/products tables, append only the `landing_offers` section from `db/schema.sql`.

The API uses the standard `postgres` npm driver with `ssl: require` — compatible with Supabase and generic Postgres URLs. Do **not** use `@vercel/postgres` with a Supabase URL.

## API endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/orders/create` | Public | Save order intent |
| `GET` | `/api/orders/list` | `X-Operator-Secret` | List orders (newest first) |
| `PATCH` | `/api/orders/update-status` | `X-Operator-Secret` | Update status |
| `GET` | `/api/products/list` | Public / Operator | Product catalog |
| `POST` | `/api/products/create` | Operator | Add product |
| `POST` | `/api/products/update` | Operator | Edit product |
| `POST` | `/api/products/delete` | Operator | Hide product |
| `GET` | `/api/offers/list` | Public / Operator | Offers catalog |
| `POST` | `/api/offers/create` | Operator | Add offer |
| `POST` | `/api/offers/update` | Operator | Edit offer |
| `POST` | `/api/offers/delete` | Operator | Hide offer |

## Operator access

- Hub: `/operator`
- Orders: `/operator/orders`
- Products: `/operator/products`
- Offers: `/operator/offers`
- Hidden footer entry: *كود التشغيل* at bottom of site

Requires `VITE_OPERATOR_PASSWORD` (or `VITE_OPERATOR_ENTRY_CODE`) at build time.

## If `DATABASE_URL` is not configured

- Product detail page **still works** (static products + WhatsApp).
- Customer can complete the form and open WhatsApp.
- WhatsApp message includes: *"لم يتم إنشاء رقم طلب تلقائي — برجاء متابعة الطلب يدويًا"*
- Operator pages show friendly disabled messages.

## Disable backend capture (WhatsApp-only)

Remove or unset `DATABASE_URL` on Vercel. The frontend always opens WhatsApp; only DB save is skipped. Static products from `src/config/products.ts` and static offers from `src/config/offers.ts` remain available.

Legacy optional hook in `src/config/orderCapture.ts` (Google Sheet) is separate and disabled by default.
