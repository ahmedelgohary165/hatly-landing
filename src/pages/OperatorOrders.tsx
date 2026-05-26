import { useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { OperatorGate } from '@/components/OperatorGate';
import { InnerPageShell } from '@/components/InnerPageShell';
import { PageMeta } from '@/components/PageMeta';
import {
  buildCustomerWhatsAppUrl,
  listLandingOrders,
  updateLandingOrderStatus,
  type LandingOrder,
} from '@/utils/ordersApi';
import { clearOperatorSession } from '@/utils/operatorAuth';

const STATUS_LABELS: Record<LandingOrder['status'], string> = {
  new: 'جديد',
  contacted: 'تم التواصل',
  confirmed: 'مؤكد',
  cancelled: 'ملغي',
};

function formatDate(value: string): string {
  try {
    return new Intl.DateTimeFormat('ar-EG', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function OperatorOrders() {
  return (
    <>
      <PageMeta
        title="لوحة الطلبات — هاتلي"
        description="لوحة داخلية لطلبات موقع هاتلي."
        path="/operator/orders"
      />
      <OperatorGate title="لوحة الطلبات" lead="أدخل كود التشغيل للوصول إلى الطلبات.">
        {(sessionSecret) => <OperatorOrdersPanel sessionSecret={sessionSecret} />}
      </OperatorGate>
    </>
  );
}

function OperatorOrdersPanel({ sessionSecret }: { sessionSecret: string }) {
  const [orders, setOrders] = useState<LandingOrder[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    const result = await listLandingOrders(sessionSecret);
    setLoading(false);

    if (!result.ok) {
      setMessage(result.message);
      setOrders([]);
      if (result.message.includes('كود')) {
        clearOperatorSession();
        window.location.href = '/operator';
      }
      return;
    }

    setOrders(result.orders);
  }, [sessionSecret]);

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  const handleStatusUpdate = async (id: string, status: LandingOrder['status']) => {
    setUpdatingId(id);
    const ok = await updateLandingOrderStatus(sessionSecret, id, status);
    setUpdatingId(null);
    if (ok) {
      setOrders((current) =>
        current.map((order) => (order.id === id ? { ...order, status } : order)),
      );
    } else {
      setMessage('تعذر تحديث حالة الطلب.');
    }
  };

  const sortedOrders = useMemo(() => orders, [orders]);

  return (
    <InnerPageShell
      badge="داخلي"
      title="طلبات الموقع"
      lead="قائمة طلبات المنتجات من موقع هاتلي — للمراجعة اليدوية فقط."
      className="ip-page--operator"
    >
      <div className="operator-toolbar">
        <NavLink to="/operator" className="operator-toolbar__btn">
          لوحة التشغيل
        </NavLink>
        <button type="button" className="operator-toolbar__btn" onClick={() => void loadOrders()}>
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

      {!loading && sortedOrders.length === 0 ? (
        <p className="operator-message">لا توجد طلبات حتى الآن.</p>
      ) : null}

      <div className="operator-table-wrap">
        <table className="operator-table">
          <thead>
            <tr>
              <th>الوقت</th>
              <th>الحالة</th>
              <th>واتساب</th>
              <th>المنتج</th>
              <th>الكود</th>
              <th>القسم</th>
              <th>السعر</th>
              <th>العربون</th>
              <th>المحوّل</th>
              <th>الدفع</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.id}>
                <td>{formatDate(order.created_at)}</td>
                <td>
                  <span className={`operator-status operator-status--${order.status}`}>
                    {STATUS_LABELS[order.status]}
                  </span>
                  <span className="operator-id" dir="ltr">
                    {order.id.slice(0, 8)}
                  </span>
                </td>
                <td>
                  <a
                    href={buildCustomerWhatsAppUrl(order.customer_whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                  >
                    {order.customer_whatsapp}
                  </a>
                </td>
                <td>{order.product_title}</td>
                <td dir="ltr">{order.product_code}</td>
                <td>{order.category_name}</td>
                <td>{order.price_label}</td>
                <td>{order.required_deposit_label}</td>
                <td>{order.transferred_amount}</td>
                <td>
                  {order.payment_method}
                  <br />
                  <span dir="ltr">{order.payment_number}</span>
                </td>
                <td className="operator-actions">
                  <button
                    type="button"
                    disabled={updatingId === order.id || order.status === 'contacted'}
                    onClick={() => void handleStatusUpdate(order.id, 'contacted')}
                  >
                    تواصل
                  </button>
                  <button
                    type="button"
                    disabled={updatingId === order.id || order.status === 'confirmed'}
                    onClick={() => void handleStatusUpdate(order.id, 'confirmed')}
                  >
                    تأكيد
                  </button>
                  <button
                    type="button"
                    disabled={updatingId === order.id || order.status === 'cancelled'}
                    onClick={() => void handleStatusUpdate(order.id, 'cancelled')}
                  >
                    إلغاء
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InnerPageShell>
  );
}
