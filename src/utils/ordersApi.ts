import type { PaymentMethodId } from '@/config/payment';

export type LandingOrder = {
  id: string;
  created_at: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
  customer_whatsapp: string;
  product_code: string;
  product_title: string;
  category_id: string;
  category_name: string;
  price_label: string;
  required_deposit_label: string;
  transferred_amount: string;
  payment_method: string;
  payment_number: string;
  source: string;
  notes: string | null;
};

export type CreateOrderPayload = {
  customerWhatsapp: string;
  productCode: string;
  productTitle: string;
  categoryId: string;
  categoryName: string;
  priceLabel: string;
  requiredDepositLabel: string;
  transferredAmount: string;
  paymentMethod: PaymentMethodId;
  paymentNumber: string;
};

export type CreateOrderResult =
  | { ok: true; orderId: string }
  | { ok: false; code: 'DB_NOT_CONFIGURED' | 'NETWORK' | 'API_ERROR' };

export async function createLandingOrder(
  payload: CreateOrderPayload,
): Promise<CreateOrderResult> {
  try {
    const response = await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerWhatsapp: payload.customerWhatsapp,
        productCode: payload.productCode,
        productTitle: payload.productTitle,
        categoryId: payload.categoryId,
        categoryName: payload.categoryName,
        priceLabel: payload.priceLabel,
        requiredDepositLabel: payload.requiredDepositLabel,
        transferredAmount: payload.transferredAmount,
        paymentMethod: payload.paymentMethod,
        paymentNumber: payload.paymentNumber,
        source: 'hatly-landing',
      }),
    });

    if (response.status === 503) {
      return { ok: false, code: 'DB_NOT_CONFIGURED' };
    }

    if (!response.ok) {
      return { ok: false, code: 'API_ERROR' };
    }

    const data = (await response.json()) as { order?: { id?: string } };
    if (!data.order?.id) {
      return { ok: false, code: 'API_ERROR' };
    }

    return { ok: true, orderId: data.order.id };
  } catch {
    return { ok: false, code: 'NETWORK' };
  }
}

export async function listLandingOrders(
  operatorPassword: string,
): Promise<{ ok: true; orders: LandingOrder[] } | { ok: false; message: string }> {
  try {
    const response = await fetch('/api/orders/list', {
      headers: {
        'X-Operator-Secret': operatorPassword,
        'X-Operator-Password': operatorPassword,
      },
    });

    const data = (await response.json()) as {
      orders?: LandingOrder[];
      error?: string;
      code?: string;
    };

    if (response.status === 503 && data.code === 'OPERATOR_NOT_CONFIGURED') {
      return { ok: false, message: 'لوحة الطلبات غير مفعّلة بعد.' };
    }
    if (response.status === 503 && data.code === 'DB_NOT_CONFIGURED') {
      return { ok: false, message: 'قاعدة بيانات الطلبات غير مفعّلة بعد.' };
    }
    if (response.status === 401) {
      return { ok: false, message: 'كود غير صحيح.' };
    }
    if (!response.ok || !data.orders) {
      return { ok: false, message: data.error ?? 'تعذر تحميل الطلبات.' };
    }

    return { ok: true, orders: data.orders };
  } catch {
    return { ok: false, message: 'تعذر الاتصال بالخادم.' };
  }
}

export async function updateLandingOrderStatus(
  operatorPassword: string,
  id: string,
  status: LandingOrder['status'],
): Promise<boolean> {
  try {
    const response = await fetch('/api/orders/update-status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Secret': operatorPassword,
        'X-Operator-Password': operatorPassword,
      },
      body: JSON.stringify({ id, status }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export function buildCustomerWhatsAppUrl(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const normalized = digits.startsWith('20') ? digits : `20${digits.replace(/^0/, '')}`;
  return `https://wa.me/${normalized}`;
}
