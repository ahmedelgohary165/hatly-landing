import { InfoCard, InnerPageShell } from '@/components/InnerPageShell';
import { PageMeta } from '@/components/PageMeta';
import { NavLink } from 'react-router-dom';

export function Terms() {
  return (
    <>
      <PageMeta
        title="الشروط والأحكام — هاتلي"
        description="شروط استخدام هاتلي بشكل واضح: التوفر حسب المنطقة، مراجعة الطلبات، الدفع، وحقوق الاستخدام."
        path="/terms"
      />

      <InnerPageShell
        badge="الشروط والأحكام"
        title="شروط استخدام هاتلي"
        lead="باستخدامك للتطبيق أو الموقع، فأنت موافق على الشروط دي. لو مش متفق، يُفضّل ما تستخدمش المنصّة."
      >
        <div className="ip-stack">
          <InfoCard icon="📍" title="الخدمة حسب المنطقة" variant="accent">
            <p>
              الخدمة <strong>بتبدأ تدريجيًا في مناطق محددة</strong>. توفر المتاجر وأنواع الطلبات
              يختلف حسب منطقتك — مش كل الفئات متاحة في كل مكان في نفس الوقت.
            </p>
          </InfoCard>

          <InfoCard icon="✅" title="الطلبات والمراجعة">
            <ul>
              <li>
                بعض الطلبات تحتاج <strong>مراجعة وتأكيد أو تسعير</strong> قبل التثبيت النهائي.
              </li>
              <li>
                الطلبات المكتوبة حرًّا ممكن نراجعها معاك ونعدّل السعر حسب المتاح من المتاجر.
              </li>
            </ul>
          </InfoCard>

          <InfoCard icon="💳" title="الدفع" variant="warn">
            <ul>
              <li>
                الدفع عند الاستلام متاح <strong>حسب الأهلية</strong> ومنطقتك ونوع الطلب — مش
                دايمًا متاح لكل الطلبات.
              </li>
              <li>
                ممكن نوفّر InstaPay أو محافظ إلكترونية حيث يتوفر حسب سياسة التشغيل وقتها.
              </li>
              <li>
                الإلغاء المتكرر أو رفض الاستلام بدون مبرر قد يقيّد بعض خيارات الدفع.
              </li>
            </ul>
          </InfoCard>

          <InfoCard icon="⚖️" title="إساءة الاستخدام" variant="trust">
            <p>
              <strong>قد يتم تقييد الحساب أو إيقافه</strong> عند إساءة الاستخدام، أو محاولات
              احتيال، أو مخالفة سياسات المنصّة — لحماية المتاجر والمناديب والمستخدمين.
            </p>
          </InfoCard>

          <InfoCard icon="💬" title="المساعدة والدعم">
            <p>
              لو عندك مشكلة في طلب أو دفع أو حساب، تواصل مع{' '}
              <NavLink to="/support">فريق الدعم</NavLink> من القنوات الرسمية.
            </p>
          </InfoCard>

          <InfoCard icon="🔄" title="تحديث الشروط">
            <p>
              قد نعدّل الشروط مع تطور الخدمة أو المتطلبات القانونية. استمرار الاستخدام بعد
              التحديث يعني موافقتك على النسخة المعتمدة.
            </p>
          </InfoCard>
        </div>

        <p className="ip-note">آخر مراجعة: مايو ٢٠٢٦ — هاتلي</p>
      </InnerPageShell>
    </>
  );
}
