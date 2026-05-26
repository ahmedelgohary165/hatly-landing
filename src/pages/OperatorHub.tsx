import { NavLink } from 'react-router-dom';

import { OperatorGate } from '@/components/OperatorGate';
import { InnerPageShell } from '@/components/InnerPageShell';
import { PageMeta } from '@/components/PageMeta';
import { clearOperatorSession } from '@/utils/operatorAuth';

export function OperatorHub() {
  return (
    <>
      <PageMeta
        title="لوحة التشغيل — هاتلي"
        description="لوحة داخلية لتشغيل موقع هاتلي."
        path="/operator"
      />
      <OperatorGate
        title="لوحة التشغيل"
        lead="اختار القسم اللي عايز تديره."
      >
        {() => (
          <InnerPageShell
            badge="داخلي"
            title="لوحة التشغيل"
            lead="إدارة الطلبات والمنتجات والعروض — للفريق الداخلي فقط."
            className="ip-page--operator"
          >
            <div className="operator-hub-grid">
              <NavLink to="/operator/orders" className="operator-hub-card">
                <span className="operator-hub-card__icon" aria-hidden>
                  📦
                </span>
                <strong>الطلبات</strong>
                <span>متابعة طلبات العملاء والحالات</span>
              </NavLink>
              <NavLink to="/operator/products" className="operator-hub-card">
                <span className="operator-hub-card__icon" aria-hidden>
                  🛍️
                </span>
                <strong>المنتجات</strong>
                <span>إضافة وتعديل منتجات الموقع</span>
              </NavLink>
              <NavLink to="/operator/offers" className="operator-hub-card">
                <span className="operator-hub-card__icon" aria-hidden>
                  🏷️
                </span>
                <strong>العروض</strong>
                <span>إضافة وتعديل عروض الموقع</span>
              </NavLink>
            </div>
            <div className="operator-toolbar">
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
          </InnerPageShell>
        )}
      </OperatorGate>
    </>
  );
}
