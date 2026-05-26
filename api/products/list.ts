import type { VercelRequest, VercelResponse } from '@vercel/node';

import { isOperatorAuthorized } from '../_lib/auth';
import {
  dbNotConfiguredResponse,
  isDatabaseConfigured,
  methodNotAllowed,
} from '../_lib/http';
import { fetchLandingProducts } from '../_lib/products';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return methodNotAllowed(res, ['GET']);
  }

  if (!isDatabaseConfigured()) {
    return dbNotConfiguredResponse(res);
  }

  try {
    const includeHidden = isOperatorAuthorized(req);
    const products = await fetchLandingProducts(includeHidden);
    return res.status(200).json({ ok: true, products, includeHidden });
  } catch (error) {
    console.error('list products failed', error);
    return res.status(500).json({ error: 'تعذر تحميل المنتجات.', code: 'DB_ERROR' });
  }
}
