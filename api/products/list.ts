import type { VercelRequest, VercelResponse } from '@vercel/node';

import { isOperatorAuthorized } from '../_lib/auth';
import {
  databaseErrorResponse,
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
    return databaseErrorResponse(res, 'list products failed', error);
  }
}
