import type { VercelRequest, VercelResponse } from '@vercel/node';

import {
  dbNotConfiguredResponse,
  isDatabaseConfigured,
  methodNotAllowed,
  readJsonBody,
  requireOperatorAuth,
} from '../_lib/http';
import { isValidOrderStatus, updateLandingOrderStatus } from '../_lib/orders';

type UpdateStatusBody = {
  id?: string;
  status?: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') {
    return methodNotAllowed(res, ['PATCH']);
  }

  if (!requireOperatorAuth(req, res)) return;

  if (!isDatabaseConfigured()) {
    return dbNotConfiguredResponse(res);
  }

  const body = readJsonBody<UpdateStatusBody>(req);
  const id = typeof body?.id === 'string' ? body.id.trim() : '';
  const status = typeof body?.status === 'string' ? body.status.trim() : '';

  if (!id) {
    return res.status(400).json({ error: 'معرّف الطلب مطلوب.' });
  }
  if (!isValidOrderStatus(status)) {
    return res.status(400).json({ error: 'حالة الطلب غير صالحة.' });
  }

  try {
    const order = await updateLandingOrderStatus(id, status);
    if (!order) {
      return res.status(404).json({ error: 'الطلب غير موجود.' });
    }
    return res.status(200).json({ ok: true, order });
  } catch (error) {
    console.error('update order status failed', error);
    return res.status(500).json({ error: 'تعذر تحديث الحالة.', code: 'DB_ERROR' });
  }
}
