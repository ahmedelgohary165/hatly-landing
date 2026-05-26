import { orderCapture } from '@/config/orderCapture';
import type { PaymentMethodId } from '@/config/payment';

export type OrderIntentPayload = {
  timestamp: string;
  productCode: string;
  productTitle: string;
  categoryId: string;
  categoryName: string;
  priceLabel: string;
  selectedPaymentMethod: string;
  selectedPaymentNumber: string;
  source: string;
};

export type OfferIntentPayload = {
  timestamp: string;
  offerCode: string;
  offerTitle: string;
  priceLabel: string;
  selectedPaymentMethod: string;
  selectedPaymentNumber: string;
  source: string;
};

async function postOrderIntent(body: OrderIntentPayload | OfferIntentPayload): Promise<void> {
  if (!orderCapture.enabled) return;

  const endpointUrl = orderCapture.endpointUrl.trim();
  if (!endpointUrl) return;

  try {
    await fetch(endpointUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    // لا نمنع فتح واتساب عند فشل الإرسال
  }
}

export function captureProductOrderIntent(params: {
  productCode: string;
  productTitle: string;
  categoryId: string;
  categoryName: string;
  priceLabel: string;
  selectedPaymentMethod: PaymentMethodId;
  selectedPaymentNumber: string;
}): void {
  const payload: OrderIntentPayload = {
    timestamp: new Date().toISOString(),
    productCode: params.productCode,
    productTitle: params.productTitle,
    categoryId: params.categoryId,
    categoryName: params.categoryName,
    priceLabel: params.priceLabel,
    selectedPaymentMethod: params.selectedPaymentMethod,
    selectedPaymentNumber: params.selectedPaymentNumber,
    source: orderCapture.source,
  };

  void postOrderIntent(payload);
}

export function captureOfferOrderIntent(params: {
  offerCode: string;
  offerTitle: string;
  priceLabel: string;
  selectedPaymentMethod: PaymentMethodId;
  selectedPaymentNumber: string;
}): void {
  const payload: OfferIntentPayload = {
    timestamp: new Date().toISOString(),
    offerCode: params.offerCode,
    offerTitle: params.offerTitle,
    priceLabel: params.priceLabel,
    selectedPaymentMethod: params.selectedPaymentMethod,
    selectedPaymentNumber: params.selectedPaymentNumber,
    source: orderCapture.source,
  };

  void postOrderIntent(payload);
}
