import type { VercelRequest, VercelResponse } from '@vercel/node';

import {
  dbNotConfiguredResponse,
  isDatabaseConfigured,
  methodNotAllowed,
  readJsonBody,
  requireOperatorAuth,
} from '../_lib/http';
import { archiveLandingProduct } from '../_lib/products';

type DeleteProductBody = {
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

  const body = readJsonBody<DeleteProductBody>(req);
  const id = typeof body?.id === 'string' ? body.id.trim() : '';

  if (!id) {
    return res.status(400).json({ error: 'معرّف المنتج مطلوب.' });
  }

  try {
    const product = await archiveLandingProduct(id);
    if (!product) {
      return res.status(404).json({ error: 'المنتج غير موجود.' });
    }
    return res.status(200).json({ ok: true, product });
  } catch (error) {
    console.error('archive product failed', error);
    return res.status(500).json({ error: 'تعذر إخفاء المنتج.', code: 'DB_ERROR' });
  }
}
