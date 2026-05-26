import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { NavLink } from 'react-router-dom';

import { OperatorGate } from '@/components/OperatorGate';
import { InnerPageShell } from '@/components/InnerPageShell';
import { PageMeta } from '@/components/PageMeta';
import { productCategories, DEFAULT_DELIVERY_LABEL } from '@/config/products';
import {
  archiveOperatorProduct,
  createOperatorProduct,
  fetchOperatorProducts,
  updateOperatorProduct,
  type DbLandingProduct,
  type ProductFormInput,
} from '@/utils/productsApi';
import { clearOperatorSession } from '@/utils/operatorAuth';

const EMPTY_FORM: ProductFormInput = {
  productCode: '',
  categoryId: 'gifts',
  title: '',
  description: '',
  priceLabel: '',
  imageUrl: '',
  deliveryLabel: DEFAULT_DELIVERY_LABEL,
  badge: '',
  isAvailable: true,
  sortOrder: 0,
};

function productToForm(product: DbLandingProduct): ProductFormInput {
  return {
    productCode: product.product_code,
    categoryId: product.category_id,
    title: product.title,
    description: product.description ?? '',
    priceLabel: product.price_label,
    imageUrl: product.image_url ?? '',
    deliveryLabel: product.delivery_label || DEFAULT_DELIVERY_LABEL,
    badge: product.badge ?? '',
    isAvailable: product.is_available,
    sortOrder: product.sort_order,
  };
}

export function OperatorProducts() {
  return (
    <>
      <PageMeta
        title="إدارة المنتجات — هاتلي"
        description="لوحة داخلية لإدارة منتجات موقع هاتلي."
        path="/operator/products"
      />
      <OperatorGate title="إدارة المنتجات" lead="أدخل كود التشغيل لإدارة المنتجات.">
        {(sessionSecret) => <OperatorProductsPanel sessionSecret={sessionSecret} />}
      </OperatorGate>
    </>
  );
}

function OperatorProductsPanel({ sessionSecret }: { sessionSecret: string }) {
  const [products, setProducts] = useState<DbLandingProduct[]>([]);
  const [form, setForm] = useState<ProductFormInput>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    const result = await fetchOperatorProducts(sessionSecret);
    setLoading(false);

    if (!result.ok) {
      setProducts([]);
      setMessage(result.message);
      return;
    }

    setProducts(result.products);
  }, [sessionSecret]);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    const result = editingId
      ? await updateOperatorProduct(sessionSecret, editingId, form)
      : await createOperatorProduct(sessionSecret, form);

    setSaving(false);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    setForm(EMPTY_FORM);
    setEditingId(null);
    await loadProducts();
  };

  const handleEdit = (product: DbLandingProduct) => {
    setEditingId(product.id);
    setForm(productToForm(product));
    setMessage(null);
  };

  const handleArchive = async (id: string) => {
    setMessage(null);
    const result = await archiveOperatorProduct(sessionSecret, id);
    if (!result.ok) {
      setMessage(result.message ?? 'تعذر إخفاء المنتج.');
      return;
    }
    if (editingId === id) {
      setEditingId(null);
      setForm(EMPTY_FORM);
    }
    await loadProducts();
  };

  return (
    <InnerPageShell
      badge="داخلي"
      title="إدارة المنتجات"
      lead="أضف أو عدّل منتجات الموقع. الإخفاء لا يحذف المنتج من قاعدة البيانات."
      className="ip-page--operator"
    >
      <div className="operator-toolbar">
        <NavLink to="/operator" className="operator-toolbar__btn">
          لوحة التشغيل
        </NavLink>
        <button type="button" className="operator-toolbar__btn" onClick={() => void loadProducts()}>
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
        <h2 className="operator-product-form__title">
          {editingId ? 'تعديل منتج' : 'إضافة منتج'}
        </h2>
        <div className="operator-product-form__grid">
          <label className="product-order-flow__field">
            <span>اسم المنتج</span>
            <input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              required
            />
          </label>
          <label className="product-order-flow__field">
            <span>كود المنتج</span>
            <input
              dir="ltr"
              value={form.productCode}
              onChange={(event) => setForm({ ...form, productCode: event.target.value })}
              required
            />
          </label>
          <label className="product-order-flow__field">
            <span>القسم</span>
            <select
              value={form.categoryId}
              onChange={(event) => setForm({ ...form, categoryId: event.target.value })}
            >
              {productCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
          <label className="product-order-flow__field">
            <span>السعر (نص)</span>
            <input
              value={form.priceLabel}
              onChange={(event) => setForm({ ...form, priceLabel: event.target.value })}
              required
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
          <label className="product-order-flow__field operator-product-form__field--wide">
            <span>رابط الصورة</span>
            <input
              dir="ltr"
              value={form.imageUrl}
              onChange={(event) => setForm({ ...form, imageUrl: event.target.value })}
              placeholder="https://..."
            />
          </label>
          <label className="product-order-flow__field">
            <span>التوصيل</span>
            <input
              value={form.deliveryLabel}
              onChange={(event) => setForm({ ...form, deliveryLabel: event.target.value })}
            />
          </label>
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
            {saving ? 'جاري الحفظ…' : editingId ? 'حفظ التعديل' : 'إضافة المنتج'}
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

      {!loading && products.length === 0 && !message?.includes('غير مفعّلة') ? (
        <p className="operator-message">لا توجد منتجات في قاعدة البيانات.</p>
      ) : null}

      <div className="operator-table-wrap">
        <table className="operator-table">
          <thead>
            <tr>
              <th>الكود</th>
              <th>الاسم</th>
              <th>القسم</th>
              <th>السعر</th>
              <th>الحالة</th>
              <th>ترتيب</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td dir="ltr">{product.product_code}</td>
                <td>{product.title}</td>
                <td>{product.category_id}</td>
                <td>{product.price_label}</td>
                <td>{product.is_available ? 'متاح' : 'مخفي'}</td>
                <td>{product.sort_order}</td>
                <td className="operator-actions">
                  <button type="button" onClick={() => handleEdit(product)}>
                    تعديل
                  </button>
                  {product.is_available ? (
                    <button type="button" onClick={() => void handleArchive(product.id)}>
                      إخفاء
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        void updateOperatorProduct(sessionSecret, product.id, {
                          ...productToForm(product),
                          isAvailable: true,
                        }).then((result) => {
                          if (!result.ok) {
                            setMessage(result.message);
                            return;
                          }
                          void loadProducts();
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
