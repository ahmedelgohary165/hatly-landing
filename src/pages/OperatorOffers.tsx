import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { NavLink } from 'react-router-dom';

import { OperatorGate } from '@/components/OperatorGate';
import { InnerPageShell } from '@/components/InnerPageShell';
import { OperatorImageField } from '@/components/OperatorImageField';
import { PageMeta } from '@/components/PageMeta';
import {
  archiveOperatorOffer,
  createOperatorOffer,
  fetchOperatorOffers,
  updateOperatorOffer,
  type DbLandingOffer,
  type OfferFormInput,
} from '@/utils/offersApi';
import { clearOperatorSession } from '@/utils/operatorAuth';
import { previewNextOfferCode } from '@/utils/operatorCodes';

const EMPTY_FORM: OfferFormInput = {
  offerCode: '',
  title: '',
  description: '',
  priceLabel: '',
  oldPriceLabel: '',
  imageUrl: '',
  badge: '',
  isAvailable: true,
  sortOrder: 0,
};

function offerToForm(offer: DbLandingOffer): OfferFormInput {
  return {
    offerCode: offer.offer_code,
    title: offer.title,
    description: offer.description ?? '',
    priceLabel: offer.price_label,
    oldPriceLabel: offer.old_price_label ?? '',
    imageUrl: offer.image_url ?? '',
    badge: offer.badge ?? '',
    isAvailable: offer.is_available,
    sortOrder: offer.sort_order,
  };
}

export function OperatorOffers() {
  return (
    <>
      <PageMeta
        title="إدارة العروض — هاتلي"
        description="لوحة داخلية لإدارة عروض موقع هاتلي."
        path="/operator/offers"
      />
      <OperatorGate title="إدارة العروض" lead="أدخل كود التشغيل لإدارة العروض.">
        {(sessionSecret) => <OperatorOffersPanel sessionSecret={sessionSecret} />}
      </OperatorGate>
    </>
  );
}

function OperatorOffersPanel({ sessionSecret }: { sessionSecret: string }) {
  const [offers, setOffers] = useState<DbLandingOffer[]>([]);
  const [form, setForm] = useState<OfferFormInput>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadOffers = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    const result = await fetchOperatorOffers(sessionSecret);
    setLoading(false);

    if (!result.ok) {
      setOffers([]);
      setMessage(result.message);
      return;
    }

    setOffers(result.offers);
  }, [sessionSecret]);

  useEffect(() => {
    void loadOffers();
  }, [loadOffers]);

  const generatedOfferCode = useMemo(
    () => previewNextOfferCode(offers.map((offer) => offer.offer_code)),
    [offers],
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload: OfferFormInput = editingId
      ? form
      : { ...form, offerCode: generatedOfferCode };

    const result = editingId
      ? await updateOperatorOffer(sessionSecret, editingId, payload)
      : await createOperatorOffer(sessionSecret, payload);

    setSaving(false);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    setForm(EMPTY_FORM);
    setEditingId(null);
    await loadOffers();
  };

  const handleEdit = (offer: DbLandingOffer) => {
    setEditingId(offer.id);
    setForm(offerToForm(offer));
    setMessage(null);
  };

  const handleArchive = async (id: string) => {
    setMessage(null);
    const result = await archiveOperatorOffer(sessionSecret, id);
    if (!result.ok) {
      setMessage(result.message ?? 'تعذر إخفاء العرض.');
      return;
    }
    if (editingId === id) {
      setEditingId(null);
      setForm(EMPTY_FORM);
    }
    await loadOffers();
  };

  return (
    <InnerPageShell
      badge="داخلي"
      title="إدارة العروض"
      lead="أضف أو عدّل عروض الموقع. الإخفاء لا يحذف العرض من قاعدة البيانات."
      className="ip-page--operator"
    >
      <div className="operator-toolbar">
        <NavLink to="/operator" className="operator-toolbar__btn">
          لوحة التشغيل
        </NavLink>
        <button type="button" className="operator-toolbar__btn" onClick={() => void loadOffers()}>
          تحديث
        </button>
        <button
          type="button"
          className="operator-toolbar__btn operator-toolbar__btn--muted"
          onClick={() => {
            clearOperatorSession();
            window.location.href = '/operator';
          }}
        >
          خروج
        </button>
      </div>

      {loading ? <p className="operator-message">جاري التحميل…</p> : null}
      {message ? <p className="operator-message operator-message--warn">{message}</p> : null}

      <form className="operator-product-form" onSubmit={(event) => void handleSubmit(event)}>
        <h2 className="operator-product-form__title">{editingId ? 'تعديل عرض' : 'إضافة عرض'}</h2>
        <div className="operator-product-form__grid">
          <label className="product-order-flow__field">
            <span>اسم العرض</span>
            <input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              required
            />
          </label>
          <div className="operator-code-preview">
            {editingId ? (
              <>
                <span className="operator-code-preview__label">كود العرض</span>
                <p className="operator-code-preview__value" dir="ltr">
                  {form.offerCode}
                </p>
              </>
            ) : (
              <>
                <span className="operator-code-preview__label">
                  كود العرض سيتم إنشاؤه تلقائيًا
                </span>
                <p className="operator-code-preview__value" dir="ltr">
                  {generatedOfferCode}
                </p>
              </>
            )}
          </div>
          <label className="product-order-flow__field">
            <span>السعر (نص)</span>
            <input
              value={form.priceLabel}
              onChange={(event) => setForm({ ...form, priceLabel: event.target.value })}
              required
            />
          </label>
          <label className="product-order-flow__field">
            <span>السعر القديم (اختياري)</span>
            <input
              value={form.oldPriceLabel}
              onChange={(event) => setForm({ ...form, oldPriceLabel: event.target.value })}
            />
          </label>
          <label className="product-order-flow__field operator-product-form__field--wide">
            <span>الوصف</span>
            <textarea
              rows={3}
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
            />
          </label>
          <OperatorImageField
            imageUrl={form.imageUrl}
            onChange={(imageUrl) => setForm({ ...form, imageUrl })}
            uploadLabel="رفع صورة العرض"
          />
          <label className="product-order-flow__field">
            <span>الشارة (اختياري)</span>
            <input
              value={form.badge}
              onChange={(event) => setForm({ ...form, badge: event.target.value })}
            />
          </label>
          <label className="product-order-flow__field">
            <span>ترتيب العرض</span>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(event) =>
                setForm({ ...form, sortOrder: Number(event.target.value) || 0 })
              }
            />
          </label>
          <label className="product-order-flow__field product-order-flow__field--checkbox">
            <span>متاح للعملاء</span>
            <input
              type="checkbox"
              checked={form.isAvailable}
              onChange={(event) => setForm({ ...form, isAvailable: event.target.checked })}
            />
          </label>
        </div>
        <div className="operator-product-form__actions">
          <button type="submit" className="manual-payment-flow__confirm" disabled={saving}>
            {saving ? 'جاري الحفظ…' : editingId ? 'حفظ التعديل' : 'إضافة العرض'}
          </button>
          {editingId ? (
            <button
              type="button"
              className="operator-toolbar__btn"
              onClick={() => {
                setEditingId(null);
                setForm(EMPTY_FORM);
              }}
            >
              إلغاء
            </button>
          ) : null}
        </div>
      </form>

      {!loading && offers.length === 0 && !message?.includes('غير مفعّلة') ? (
        <p className="operator-message">لا توجد عروض في قاعدة البيانات.</p>
      ) : null}

      <div className="operator-table-wrap">
        <table className="operator-table">
          <thead>
            <tr>
              <th>الكود</th>
              <th>الاسم</th>
              <th>السعر</th>
              <th>الحالة</th>
              <th>ترتيب</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td dir="ltr">{offer.offer_code}</td>
                <td>{offer.title}</td>
                <td>{offer.price_label}</td>
                <td>{offer.is_available ? 'متاح' : 'مخفي'}</td>
                <td>{offer.sort_order}</td>
                <td className="operator-actions">
                  <button type="button" onClick={() => handleEdit(offer)}>
                    تعديل
                  </button>
                  {offer.is_available ? (
                    <button type="button" onClick={() => void handleArchive(offer.id)}>
                      إخفاء
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        void updateOperatorOffer(sessionSecret, offer.id, {
                          ...offerToForm(offer),
                          isAvailable: true,
                        }).then((result) => {
                          if (!result.ok) {
                            setMessage(result.message);
                            return;
                          }
                          void loadOffers();
                        })
                      }
                    >
                      إظهار
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InnerPageShell>
  );
}
