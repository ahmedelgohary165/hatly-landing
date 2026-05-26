export function PaymentInstructionCard() {
  return (
    <article className="ip-card ip-card--accent payment-instruction-card">
      <span className="ip-card__icon" aria-hidden>
        💳
      </span>
      <div className="ip-card__body">
        <h2 className="ip-card__title">طريقة تأكيد الطلب</h2>
        <div className="ip-card__content">
          <ol className="payment-instruction-card__steps">
            <li>اختار المنتج واضغط &quot;عرض التفاصيل&quot;.</li>
            <li>حوّل 30% من قيمة الطلب (العربون) على رقم الدفع الظاهر.</li>
            <li>أدخل رقم واتسابك وقيمة التحويل.</li>
            <li>اضغط &quot;تأكيد الطلب وفتح واتساب&quot;.</li>
            <li>ابعت صورة التحويل في نفس المحادثة لتأكيد الطلب.</li>
          </ol>
          <p className="payment-instruction-card__note">
            الطلب لا يُعتمد تلقائيًا — فريق هاتلي يراجع صورة التحويل يدويًا قبل التأكيد.
          </p>
        </div>
      </div>
    </article>
  );
}
