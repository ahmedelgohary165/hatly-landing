import type { VercelRequest, VercelResponse } from '@vercel/node';

import { isOperatorAuthorized } from '../_lib/auth.js';
import {
  databaseErrorResponse,
  dbNotConfiguredResponse,
  isDatabaseConfigured,
  methodNotAllowed,
} from '../_lib/http.js';
import { fetchLandingOffers } from '../_lib/offers.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return methodNotAllowed(res, ['GET']);
  }

  if (!isDatabaseConfigured()) {
    return dbNotConfiguredResponse(res);
  }

  try {
    const includeHidden = isOperatorAuthorized(req);
    const offers = await fetchLandingOffers(includeHidden);
    return res.status(200).json({ ok: true, offers, includeHidden });
  } catch (error) {
    return databaseErrorResponse(res, 'list offers failed', error);
  }
}
