import type { VercelRequest, VercelResponse } from '@vercel/node';

import {
  databaseErrorResponse,
  dbNotConfiguredResponse,
  isDatabaseConfigured,
  methodNotAllowed,
  requireOperatorAuth,
} from '../_lib/http.js';
import { fetchLandingOrders } from '../_lib/orders.js';

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
    return databaseErrorResponse(res, 'list orders failed', error);
  }
}
