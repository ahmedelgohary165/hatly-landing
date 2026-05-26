import type { VercelRequest, VercelResponse } from '@vercel/node';

import { getPostgresErrorCode } from '../_lib/db.js';
import {
  databaseErrorResponse,
  dbNotConfiguredResponse,
  isDatabaseConfigured,
  methodNotAllowed,
  readJsonBody,
  requireOperatorAuth,
} from '../_lib/http.js';
import { updateLandingOffer } from '../_lib/offers.js';

type UpdateOfferBody = {
  id?: string;
  offerCode?: string;
  title?: string;
  description?: string;
  priceLabel?: string;
  oldPriceLabel?: string;
  imageUrl?: string;
  badge?: string;
  isAvailable?: boolean;
  sortOrder?: number;
};

function trim(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }

  if (!requireOperatorAuth(req, res)) return;

  if (!isDatabaseConfigured()) {
    return dbNotConfiguredResponse(res);
  }

  const body = readJsonBody<UpdateOfferBody>(req);
  if (!body) {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  const id = trim(body.id);
  const offerCode = trim(body.offerCode);
  const title = trim(body.title);
  const priceLabel = trim(body.priceLabel);

  if (!id || !offerCode || !title || !priceLabel) {
    return res.status(400).json({ error: 'الحقول الأساسية مطلوبة.' });
  }

  try {
    const offer = await updateLandingOffer(id, {
      offerCode,
      title,
      description: trim(body.description) || undefined,
      priceLabel,
      oldPriceLabel: trim(body.oldPriceLabel) || undefined,
      imageUrl: trim(body.imageUrl) || undefined,
      badge: trim(body.badge) || undefined,
      isAvailable: body.isAvailable ?? true,
      sortOrder: typeof body.sortOrder === 'number' ? body.sortOrder : Number(body.sortOrder) || 0,
    });

    if (!offer) {
      return res.status(404).json({ error: 'العرض غير موجود.' });
    }

    return res.status(200).json({ ok: true, offer });
  } catch (error) {
    if (getPostgresErrorCode(error) === '23505') {
      return res.status(400).json({ ok: false, error: 'كود العرض مستخدم بالفعل.' });
    }
    return databaseErrorResponse(res, 'update offer failed', error);
  }
}
