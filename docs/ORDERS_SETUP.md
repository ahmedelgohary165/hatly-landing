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

1. Create a Postgres database (Vercel → Storage → Postgres, or Neon).
2. Copy `DATABASE_URL` into Vercel env vars.
3. Run `db/schema.sql` once in the SQL console (orders + products tables).

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

## Operator access

- Hub: `/operator`
- Orders: `/operator/orders`
- Products: `/operator/products`
- Hidden footer entry: *كود التشغيل* at bottom of site

Requires `VITE_OPERATOR_PASSWORD` (or `VITE_OPERATOR_ENTRY_CODE`) at build time.

## If `DATABASE_URL` is not configured

- Product detail page **still works** (static products + WhatsApp).
- Customer can complete the form and open WhatsApp.
- WhatsApp message includes: *"لم يتم إنشاء رقم طلب تلقائي — برجاء متابعة الطلب يدويًا"*
- Operator pages show friendly disabled messages.

## Disable backend capture (WhatsApp-only)

Remove or unset `DATABASE_URL` on Vercel. The frontend always opens WhatsApp; only DB save is skipped. Static products from `src/config/products.ts` remain available.

Legacy optional hook in `src/config/orderCapture.ts` (Google Sheet) is separate and disabled by default.
