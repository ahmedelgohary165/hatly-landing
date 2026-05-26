import type { VercelRequest, VercelResponse } from '@vercel/node';

import {
  dbNotConfiguredResponse,
  isDatabaseConfigured,
  methodNotAllowed,
  readJsonBody,
} from '../_lib/http';
import { insertLandingOrder } from '../_lib/orders';

type CreateOrderBody = {
  customerWhatsapp?: string;
  productCode?: string;
  productTitle?: string;
  categoryId?: string;
  categoryName?: string;
  priceLabel?: string;
  requiredDepositLabel?: string;
  transferredAmount?: string;
  paymentMethod?: string;
  paymentNumber?: string;
  source?: string;
  notes?: string;
};

function trim(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }

  if (!isDatabaseConfigured()) {
    return dbNotConfiguredResponse(res);
  }

  const body = readJsonBody<CreateOrderBody>(req);
  if (!body) {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  const customerWhatsapp = trim(body.customerWhatsapp);
  const productCode = trim(body.productCode);
  const productTitle = trim(body.productTitle);
  const categoryId = trim(body.categoryId);
  const categoryName = trim(body.categoryName);
  const priceLabel = trim(body.priceLabel);
  const requiredDepositLabel = trim(body.requiredDepositLabel);
  const transferredAmount = trim(body.transferredAmount);
  const paymentMethod = trim(body.paymentMethod);
  const paymentNumber = trim(body.paymentNumber);

  if (!customerWhatsapp) {
    return res.status(400).json({ error: 'رقم واتساب العميل مطلوب.' });
  }
  if (!transferredAmount) {
    return res.status(400).json({ error: 'قيمة التحويل مطلوبة.' });
  }
  if (!paymentMethod || !paymentNumber) {
    return res.status(400).json({ error: 'طريقة الدفع مطلوبة.' });
  }
  if (!productCode || !productTitle || !categoryId || !categoryName || !priceLabel) {
    return res.status(400).json({ error: 'بيانات المنتج غير مكتملة.' });
  }

  try {
    const order = await insertLandingOrder({
      customerWhatsapp,
      productCode,
      productTitle,
      categoryId,
      categoryName,
      priceLabel,
      requiredDepositLabel: requiredDepositLabel || 'سيتم تأكيد قيمة العربون مع فريق هاتلي.',
      transferredAmount,
      paymentMethod,
      paymentNumber,
      source: trim(body.source) || 'hatly-landing',
      notes: trim(body.notes) || undefined,
    });

    return res.status(201).json({
      ok: true,
      order: {
        id: order.id,
        createdAt: order.created_at,
        status: order.status,
      },
    });
  } catch (error) {
    console.error('create order failed', error);
    return res.status(500).json({
      error: 'تعذر حفظ الطلب. حاول مرة أخرى أو أكّد عبر واتساب.',
      code: 'DB_ERROR',
    });
  }
}
