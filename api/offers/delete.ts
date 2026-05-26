import type { VercelRequest, VercelResponse } from '@vercel/node';

import {
  databaseErrorResponse,
  dbNotConfiguredResponse,
  isDatabaseConfigured,
  methodNotAllowed,
  readJsonBody,
  requireOperatorAuth,
} from '../_lib/http.js';
import { archiveLandingOffer } from '../_lib/offers.js';

type DeleteOfferBody = {
  id?: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }

  if (!requireOperatorAuth(req, res)) return;

  if (!isDatabaseConfigured()) {
    return dbNotConfiguredResponse(res);
  }

  const body = readJsonBody<DeleteOfferBody>(req);
  const id = typeof body?.id === 'string' ? body.id.trim() : '';

  if (!id) {
    return res.status(400).json({ error: 'معرّف العرض مطلوب.' });
  }

  try {
    const offer = await archiveLandingOffer(id);
    if (!offer) {
      return res.status(404).json({ error: 'العرض غير موجود.' });
    }
    return res.status(200).json({ ok: true, offer });
  } catch (error) {
    return databaseErrorResponse(res, 'archive offer failed', error);
  }
}
