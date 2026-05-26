import type { VercelRequest, VercelResponse } from '@vercel/node';

import {
  databaseErrorResponse,
  dbNotConfiguredResponse,
  isDatabaseConfigured,
  methodNotAllowed,
  readJsonBody,
  requireOperatorAuth,
} from '../_lib/http';
import { generateNextProductCode } from '../_lib/codeGeneration';
import { getPostgresErrorCode } from '../_lib/db';
import { insertLandingProduct } from '../_lib/products';

type CreateProductBody = {
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

  const body = readJsonBody<CreateProductBody>(req);
  if (!body) {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  const categoryId = trim(body.categoryId);
  const title = trim(body.title);
  const priceLabel = trim(body.priceLabel);

  if (!categoryId || !title || !priceLabel) {
    return res.status(400).json({ error: 'الحقول الأساسية مطلوبة.' });
  }

  let productCode = trim(body.productCode);
  if (!productCode) {
    productCode = await generateNextProductCode(categoryId);
  }

  try {
    const product = await insertLandingProduct({
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
    return res.status(201).json({ ok: true, product });
  } catch (error) {
    if (getPostgresErrorCode(error) === '23505') {
      return res.status(400).json({ ok: false, error: 'كود المنتج مستخدم بالفعل.' });
    }
    return databaseErrorResponse(res, 'create product failed', error);
  }
}
