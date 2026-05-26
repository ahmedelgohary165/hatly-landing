import { useState } from 'react';

import {
  formatSelectedPaymentNumber,
  getPaymentMethodLabel,
  paymentFlowNote,
  paymentMethodList,
  paymentMethods,
  type PaymentMethodId,
} from '@/config/payment';

type ManualPaymentFlowProps = {
  onConfirm: (params: {
    selectedPaymentMethod: PaymentMethodId;
    selectedPaymentNumber: string;
  }) => void;
};

export function ManualPaymentFlow({ onConfirm }: ManualPaymentFlowProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId | null>(null);
  const [selectedWalletNumber, setSelectedWalletNumber] = useState<string | null>(null);

  const canConfirm =
    selectedMethod === 'instapay' ||
    (selectedMethod === 'ewallet' && selectedWalletNumber !== null);

  const handleConfirm = () => {
    if (!selectedMethod) return;

    const selectedPaymentNumber =
      selectedMethod === 'ewallet' && selectedWalletNumber
        ? selectedWalletNumber
        : formatSelectedPaymentNumber(selectedMethod);

    onConfirm({
      selectedPaymentMethod: selectedMethod,
      selectedPaymentNumber,
    });
  };

  return (
    <div className="manual-payment-flow">
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
              <li>اضغط &quot;تم التحويل&quot;.</li>
              <li>هيفتح واتساب تلقائيًا.</li>
              <li>ابعت صورة التحويل في نفس المحادثة لتأكيد الطلب.</li>
            </ol>
            <p className="manual-payment-flow__note">{paymentFlowNote}</p>
            <p className="manual-payment-flow__warn">
              الطلب لا يُعتمد تلقائيًا — فريق هاتلي يراجع صورة التحويل يدويًا قبل التأكيد.
            </p>
          </div>
        </div>
      </article>

      <div className="manual-payment-flow__cta-wrap">
        <button
          type="button"
          className="manual-payment-flow__confirm"
          disabled={!canConfirm}
          onClick={handleConfirm}
        >
          تم التحويل
        </button>
        <p className="manual-payment-flow__screenshot-hint">
          بعد فتح واتساب، <strong>لازم ترفق صورة التحويل يدويًا</strong> في نفس المحادثة — الموقع
          لا يرفع الصورة تلقائيًا.
        </p>
      </div>
    </div>
  );
}
