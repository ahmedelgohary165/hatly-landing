# Hatly Landing — Operator Setup

Internal operator tools for the marketing site only. Not connected to the main Hatly app backend.

## Environment variables

| Variable | Scope | Purpose |
|----------|--------|---------|
| `DATABASE_URL` | Server | Postgres for orders + products + offers |
| `OPERATOR_PASSWORD` | Server | API auth secret (`X-Operator-Secret` or `X-Operator-Password`) |
| `OPERATOR_API_SECRET` | Server | Optional override for API auth (instead of `OPERATOR_PASSWORD`) |
| `VITE_OPERATOR_PASSWORD` | Build | Footer/hub login code |
| `VITE_OPERATOR_ENTRY_CODE` | Build | Optional alias for the same login code |

Use the **same value** for server secret and at least one `VITE_*` code.

Example:

```
OPERATOR_PASSWORD=your-secret-code
VITE_OPERATOR_PASSWORD=your-secret-code
DATABASE_URL=postgres://...
```

## Database setup

1. Create Postgres (Vercel Storage, Neon, or **Supabase**).
2. Set `DATABASE_URL` on Vercel to the **direct** Postgres URI (Supabase: port `5432`).
3. Run **`db/schema.sql`** once (creates `landing_orders`, `landing_products`, `landing_offers`).

If you already ran an older schema, run only the new `landing_offers` block from `db/schema.sql` in Supabase SQL Editor.

API DB access uses the `postgres` npm package with SSL — works with Supabase `DATABASE_URL`. `@vercel/postgres` is not used.

## Access `/operator`

Three ways:

1. **Footer** — tiny field at the very bottom: *كود التشغيل*
2. Direct URL: `/operator`
3. Sub-pages: `/operator/orders`, `/operator/products`, `/operator/offers`

After entering the code, access is stored in `sessionStorage` for the browser session.

## Hub pages

| URL | Purpose |
|-----|---------|
| `/operator` | Hub — links to orders, products & offers |
| `/operator/orders` | Review order intents, update status |
| `/operator/products` | Add/edit/hide products |
| `/operator/offers` | Add/edit/hide offers |

## Manage offers

1. Open `/operator/offers`
2. Fill the form (title, code, price, old price, description, image URL, badge, sort order)
3. **إضافة العرض** — create
4. **تعديل** — edit
5. **إخفاء** / **إظهار** — toggle availability

Image upload is not supported yet — use an **image URL** only.

## Manage products

1. Open `/operator/products`
2. Fill the form (name, code, category, price, description, image URL, etc.)
3. **إضافة المنتج** — create
4. **تعديل** — edit existing row
5. **إخفاء** — soft-hide (`is_available = false`)
6. **إظهار** — make hidden product available again

Image upload is not supported yet — use an **image URL** only.

## Public catalog behavior

Customer pages (`/categories/*`, `/products/*`, `/offers`, `/offers/:offerCode`, homepage offers):

1. Try `GET /api/products/list` or `GET /api/offers/list` (available items only)
2. If DB missing/empty/error → fallback to **`src/config/products.ts`** or **`src/config/offers.ts`**

Orders + WhatsApp flow work the same with or without DB.

## API reference

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/products/list` | Public (available only) | Customer catalog |
| `GET` | `/api/products/list` | `X-Operator-Secret` | All products incl. hidden |
| `POST` | `/api/products/create` | Operator | Add product |
| `POST` | `/api/products/update` | Operator | Edit product |
| `POST` | `/api/products/delete` | Operator | Hide/archive product |
| `GET` | `/api/offers/list` | Public (available only) | Customer offers |
| `GET` | `/api/offers/list` | `X-Operator-Secret` | All offers incl. hidden |
| `POST` | `/api/offers/create` | Operator | Add offer |
| `POST` | `/api/offers/update` | Operator | Edit offer |
| `POST` | `/api/offers/delete` | Operator | Hide/archive offer |
| `POST` | `/api/orders/create` | Public | Save order intent |
| `GET` | `/api/orders/list` | Operator | List orders |
| `PATCH` | `/api/orders/update-status` | Operator | Update order status |

See also: [ORDERS_SETUP.md](./ORDERS_SETUP.md)

## Without database

| Feature | Behavior |
|---------|----------|
| Customer products | Static config in `src/config/products.ts` |
| Customer offers | Static config in `src/config/offers.ts` |
| Customer orders | WhatsApp opens; no order ID saved |
| `/operator/products` | Shows *قاعدة بيانات المنتجات غير مفعّلة بعد.* |
| `/operator/offers` | Shows *قاعدة بيانات العروض غير مفعّلة بعد.* |
| `/operator/orders` | Shows DB disabled message |

## Without operator env vars

Footer entry hidden. `/operator` shows *لوحة التشغيل غير مفعّلة بعد.*
