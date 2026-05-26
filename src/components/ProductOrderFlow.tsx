import { useState } from 'react';

import {
  formatSelectedPaymentNumber,
  getPaymentMethodLabel,
  paymentMethodList,
  paymentMethods,
  type PaymentMethodId,
} from '@/config/payment';
import { DEPOSIT_INSTRUCTION, DEPOSIT_HEADLINE } from '@/utils/deposit';

export type ProductOrderFormData = {
  customerWhatsapp: string;
  transferredAmount: string;
  selectedPaymentMethod: PaymentMethodId;
  selectedPaymentNumber: string;
};

type ProductOrderFlowProps = {
  requiredDepositLabel: string;
  onSubmit: (data: ProductOrderFormData) => Promise<void>;
};

export function ProductOrderFlow({ requiredDepositLabel, onSubmit }: ProductOrderFlowProps) {
  const [customerWhatsapp, setCustomerWhatsapp] = useState('');
  const [transferredAmount, setTransferredAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId | null>(null);
  const [selectedWalletNumber, setSelectedWalletNumber] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    customerWhatsapp.trim().length >= 10 &&
    transferredAmount.trim().length > 0 &&
    (selectedMethod === 'instapay' ||
      (selectedMethod === 'ewallet' && selectedWalletNumber !== null));

  const handleSubmit = async () => {
    if (!canSubmit || !selectedMethod || submitting) return;

    setError(null);
    setSubmitting(true);

    const selectedPaymentNumber =
      selectedMethod === 'ewallet' && selectedWalletNumber
        ? selectedWalletNumber
        : formatSelectedPaymentNumber(selectedMethod);

    try {
      await onSubmit({
        customerWhatsapp: customerWhatsapp.trim(),
        transferredAmount: transferredAmount.trim(),
        selectedPaymentMethod: selectedMethod,
        selectedPaymentNumber,
      });
    } catch {
      setError('حدث خطأ. حاول مرة أخرى أو تواصل معنا على واتساب.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="manual-payment-flow product-order-flow">
      <article className="ip-card ip-card--accent product-order-flow__deposit">
        <span className="ip-card__icon" aria-hidden>
          💰
        </span>
        <div className="ip-card__body">
          <h2 className="ip-card__title">{DEPOSIT_HEADLINE}</h2>
          <div className="ip-card__content">
            <p className="product-order-flow__deposit-value">{requiredDepositLabel}</p>
            <p>{DEPOSIT_INSTRUCTION}</p>
          </div>
        </div>
      </article>

      <section className="manual-payment-flow__section" aria-labelledby="payment-method-title">
        <h2 id="payment-method-title" className="manual-payment-flow__title">
          اختار طريقة الدفع
        </h2>
        <div className="manual-payment-flow__methods" role="radiogroup" aria-label="طرق الدفع">
          {paymentMethodList.map((methodId) => {
            const isSelected = selectedMethod === methodId;
            return (
              <button
                key={methodId}
                type="button"
                className={`manual-payment-flow__method${isSelected ? ' is-selected' : ''}`}
                role="radio"
                aria-checked={isSelected}
                onClick={() => {
                  setSelectedMethod(methodId);
                  if (methodId !== 'ewallet') {
                    setSelectedWalletNumber(null);
                  }
                }}
              >
                {getPaymentMethodLabel(methodId)}
              </button>
            );
          })}
        </div>

        {selectedMethod === 'instapay' ? (
          <div className="manual-payment-flow__numbers" role="status">
            <p className="manual-payment-flow__numbers-label">
              {paymentMethods.instapay.numberLabel}
            </p>
            <p className="manual-payment-flow__number" dir="ltr">
              {paymentMethods.instapay.numbers[0]}
            </p>
          </div>
        ) : null}

        {selectedMethod === 'ewallet' ? (
          <div className="manual-payment-flow__numbers" role="group" aria-label="أرقام المحافظ">
            <p className="manual-payment-flow__numbers-label">
              {paymentMethods.ewallet.numbersLabel}
            </p>
            {paymentMethods.ewallet.numbers.map((number) => (
              <button
                key={number}
                type="button"
                className={`manual-payment-flow__wallet-number${
                  selectedWalletNumber === number ? ' is-selected' : ''
                }`}
                dir="ltr"
                onClick={() => setSelectedWalletNumber(number)}
              >
                {number}
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <section className="product-order-flow__fields" aria-labelledby="customer-fields-title">
        <h2 id="customer-fields-title" className="manual-payment-flow__title">
          بيانات التأكيد
        </h2>
        <label className="product-order-flow__field">
          <span>رقم واتساب للتواصل</span>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder="01xxxxxxxxx"
            value={customerWhatsapp}
            onChange={(event) => setCustomerWhatsapp(event.target.value)}
          />
        </label>
        <label className="product-order-flow__field">
          <span>قيمة التحويل</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="مثال: 105"
            value={transferredAmount}
            onChange={(event) => setTransferredAmount(event.target.value)}
          />
        </label>
      </section>

      <article className="ip-card ip-card--trust manual-payment-flow__instructions">
        <span className="ip-card__icon" aria-hidden>
          📋
        </span>
        <div className="ip-card__body">
          <h2 className="ip-card__title">خطوات تأكيد الطلب</h2>
          <div className="ip-card__content">
            <ol className="manual-payment-flow__steps">
              <li>اختار طريقة الدفع.</li>
              <li>حوّل على الرقم الظاهر أمامك.</li>
              <li>أدخل رقم واتسابك وقيمة التحويل.</li>
              <li>اضغط &quot;تأكيد الطلب وفتح واتساب&quot;.</li>
              <li>ابعت صورة التحويل في نفس المحادثة لتأكيد الطلب.</li>
            </ol>
          </div>
        </div>
      </article>

      <div className="manual-payment-flow__cta-wrap">
        {error ? <p className="product-order-flow__error">{error}</p> : null}
        <button
          type="button"
          className="manual-payment-flow__confirm"
          disabled={!canSubmit || submitting}
          onClick={() => void handleSubmit()}
        >
          {submitting ? 'جاري الحفظ…' : 'تأكيد الطلب وفتح واتساب'}
        </button>
        <p className="manual-payment-flow__screenshot-hint">
          بعد فتح واتساب، <strong>ابعت صورة التحويل لتأكيد الطلب يدويًا</strong> — الموقع لا
          يرفع الصورة تلقائيًا.
        </p>
      </div>
    </div>
  );
}
