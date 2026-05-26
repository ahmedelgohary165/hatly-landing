/**
 * التقاط اختياري قديم (Google Sheet / Apps Script).
 *
 * للمنتجات: استخدم `/api/orders/create` + `DATABASE_URL` (راجع docs/ORDERS_SETUP.md).
 * لتعطيل الحفظ في DB: لا تضبط DATABASE_URL — واتساب يظل يعمل.
 */
export const orderCapture = {
  enabled: false,
  endpointUrl: '',
  source: 'hatly-landing',
} as const;
