import type { VercelRequest, VercelResponse } from '@vercel/node';

import {
  dbNotConfiguredResponse,
  isDatabaseConfigured,
  methodNotAllowed,
  requireOperatorAuth,
} from '../_lib/http';
import { fetchLandingOrders } from '../_lib/orders';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return methodNotAllowed(res, ['GET']);
  }

  if (!requireOperatorAuth(req, res)) return;

  if (!isDatabaseConfigured()) {
    return dbNotConfiguredResponse(res);
  }

  try {
    const orders = await fetchLandingOrders();
    return res.status(200).json({ ok: true, orders });
  } catch (error) {
    console.error('list orders failed', error);
    return res.status(500).json({ error: 'تعذر تحميل الطلبات.', code: 'DB_ERROR' });
  }
}
