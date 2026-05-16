import { InfoCard, InnerPageShell } from '@/components/InnerPageShell';
import { PageMeta } from '@/components/PageMeta';
import { privacyDataTypes } from '@/config/inner-pages';
import { NavLink } from 'react-router-dom';

export function Privacy() {
  return (
    <>
      <PageMeta
        title="سياسة الخصوصية — هاتلي"
        description="في هاتلي خصوصيتك مهمة. بنستخدم بياناتك فقط لتقديم الخدمة وتحسين تجربة الطلب والتوصيل بشكل آمن."
        path="/privacy"
      />

      <InnerPageShell
        badge="الخصوصية والأمان"
        title="سياسة الخصوصية"
        lead={
          <>
            في هاتلي، خصوصيتك مهمة بالنسبة لنا.
            <br />
            بنستخدم بياناتك فقط لتقديم الخدمة وتحسين تجربة الطلب والتوصيل بشكل آمن.
          </>
        }
      >
        <p className="ip-section-label">أنواع البيانات التي قد نستخدمها</p>
        <div className="ip-chips" role="list">
          {privacyDataTypes.map((item) => (
            <span key={item} className="ip-chip" role="listitem">
              <span className="ip-chip__dot" aria-hidden />
              {item}
            </span>
          ))}
        </div>

        <div className="ip-stack">
          <InfoCard icon="🎯" title="ليه بنجمع البيانات؟">
            <p>
              عشان ننفّذ طلباتك، نوصّل لحد بابك، نراجع الدفع لما يلزم، ندعمك لما تحتاج مساعدة،
              ونحمي حسابك من إساءة الاستخدام — من غير جمع زيادة عن اللازم.
            </p>
          </InfoCard>

          <InfoCard icon="📱" title="الرسائل النصية SMS" variant="trust">
            <p>
              تطبيق هاتلي للعملاء <strong>ما بيقرأش الرسائل النصية SMS</strong> على جهازك.
              <strong> لا نستخدم صلاحيات READ_SMS أو RECEIVE_SMS</strong> في تطبيق العميل العام.
            </p>
          </InfoCard>

          <InfoCard icon="🛡️" title="البيانات والجهات الخارجية" variant="accent">
            <p>
              <strong>ما بنبيعش بياناتك الشخصية</strong> للتسويق أو لأطراف خارجية كسلعة.
              المشاركة تكون فقط حيث يلزم لتشغيل الخدمة (مثل التوصيل) أو حيث يفرض القانون ذلك.
            </p>
          </InfoCard>

          <InfoCard icon="🗑️" title="حقك في حذف الحساب" variant="warn">
            <p>
              تقدر تطلب <strong>حذف حسابك وبياناتك</strong> من{' '}
              <NavLink to="/account-deletion">صفحة حذف الحساب</NavLink> أو عبر واتساب.
              قد نحتفظ بجزء من سجل الطلبات أو بيانات الدفع لفترة محدودة لأسباب قانونية أو مالية
              أو لمكافحة إساءة الاستخدام.
            </p>
          </InfoCard>

          <InfoCard icon="🔄" title="تحديث السياسة">
            <p>
              قد نحدّث هذه السياسة مع تطور التطبيق ومتطلبات المتاجر. راجع النسخة المعتمدة عند
              كل تحديث رئيسي.
            </p>
          </InfoCard>
        </div>

        <p className="ip-note">آخر مراجعة: مايو ٢٠٢٦ — هاتلي</p>
      </InnerPageShell>
    </>
  );
}
