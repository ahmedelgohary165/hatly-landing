import type { VercelRequest, VercelResponse } from '@vercel/node';

import {
  dbNotConfiguredResponse,
  isDatabaseConfigured,
  methodNotAllowed,
  readJsonBody,
  requireOperatorAuth,
} from '../_lib/http';
import { updateLandingProduct } from '../_lib/products';

type UpdateProductBody = {
  id?: string;
  productCode?: string;
  categoryId?: string;
  title?: string;
  description?: string;
  priceLabel?: string;
  imageUrl?: string;
  deliveryLabel?: string;
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

  const body = readJsonBody<UpdateProductBody>(req);
  if (!body) {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  const id = trim(body.id);
  const productCode = trim(body.productCode);
  const categoryId = trim(body.categoryId);
  const title = trim(body.title);
  const priceLabel = trim(body.priceLabel);

  if (!id || !productCode || !categoryId || !title || !priceLabel) {
    return res.status(400).json({ error: 'الحقول الأساسية مطلوبة.' });
  }

  try {
    const product = await updateLandingProduct(id, {
      productCode,
      categoryId,
      title,
      description: trim(body.description) || undefined,
      priceLabel,
      imageUrl: trim(body.imageUrl) || undefined,
      deliveryLabel: trim(body.deliveryLabel) || undefined,
      badge: trim(body.badge) || undefined,
      isAvailable: body.isAvailable ?? true,
      sortOrder: typeof body.sortOrder === 'number' ? body.sortOrder : Number(body.sortOrder) || 0,
    });

    if (!product) {
      return res.status(404).json({ error: 'المنتج غير موجود.' });
    }

    return res.status(200).json({ ok: true, product });
  } catch (error) {
    console.error('update product failed', error);
    const pgCode = (error as { code?: string }).code;
    const message =
      pgCode === '23505' ? 'كود المنتج مستخدم بالفعل.' : 'تعذر تحديث المنتج.';
    return res.status(500).json({ error: message, code: 'DB_ERROR' });
  }
}
