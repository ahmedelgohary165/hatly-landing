import type { VercelRequest, VercelResponse } from '@vercel/node';

import { generateNextOfferCode } from '../_lib/codeGeneration';
import { getPostgresErrorCode } from '../_lib/db';
import {
  databaseErrorResponse,
  dbNotConfiguredResponse,
  isDatabaseConfigured,
  methodNotAllowed,
  readJsonBody,
  requireOperatorAuth,
} from '../_lib/http';
import { insertLandingOffer } from '../_lib/offers';

type CreateOfferBody = {
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

  const body = readJsonBody<CreateOfferBody>(req);
  if (!body) {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  const title = trim(body.title);
  const priceLabel = trim(body.priceLabel);

  if (!title || !priceLabel) {
    return res.status(400).json({ error: 'الحقول الأساسية مطلوبة.' });
  }

  let offerCode = trim(body.offerCode);
  if (!offerCode) {
    offerCode = await generateNextOfferCode();
  }

  try {
    const offer = await insertLandingOffer({
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
    return res.status(201).json({ ok: true, offer });
  } catch (error) {
    if (getPostgresErrorCode(error) === '23505') {
      return res.status(400).json({ ok: false, error: 'كود العرض مستخدم بالفعل.' });
    }
    return databaseErrorResponse(res, 'create offer failed', error);
  }
}
