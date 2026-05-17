import { InfoCard, InnerPageShell } from '@/components/InnerPageShell';
import { PageMeta } from '@/components/PageMeta';
import { privacyDataTypes } from '@/config/inner-pages';
import { NavLink } from 'react-router-dom';

export function Privacy() {
  return (
    <>
      <PageMeta
        title="سياسة الخصوصية — هاتلي"
        description="في هاتلي خصوصيتك مهمة. بنجمع فقط ما يلزم لتشغيل الطلب والتوصيل والدعم بشكل آمن وواضح."
        path="/privacy"
      />

      <InnerPageShell
        badge="الخصوصية والأمان"
        title="سياسة الخصوصية"
        lead={
          <>
            في هاتلي، خصوصيتك أولوية.
            <br />
            بنجمع فقط البيانات اللازمة لتشغيل الخدمة — من الطلب لحد التوصيل والدعم — بشكل واضح وآمن.
          </>
        }
      >
        <p className="ip-section-label">البيانات اللي قد نستخدمها</p>
        <div className="ip-chips" role="list">
          {privacyDataTypes.map((item) => (
            <span key={item} className="ip-chip" role="listitem">
              <span className="ip-chip__dot" aria-hidden />
              {item}
            </span>
          ))}
        </div>

        <div className="ip-stack">
          <InfoCard icon="🎯" title="ليه بنستخدم بياناتك؟">
            <p>
              عشان نقدر ننفّذ طلباتك بدقة: نأكد الطلب، نوصّل لحد بابك، نتواصل معاك لو في
              استفسار، ونساعدك في الدعم. البيانات بتخلي التجربة أسرع وأوضح — من غير جمع زيادة
              عن اللازم.
            </p>
          </InfoCard>

          <InfoCard icon="📍" title="منين بناخد البيانات؟">
            <p>
              غالبًا منك مباشرة لما بتسجّل أو تطلب: الاسم، رقم الهاتف، عنوان التوصيل، وتفاصيل
              الطلب. ممكن ترفع إثبات دفع يدويًا لو احتجنا تأكيد عملية. سجل الطلبات والتواصل مع
              الدعم بيتسجّل عشان نخدمك ونحل أي مشكلة.
            </p>
          </InfoCard>

          <InfoCard icon="🔒" title="إزاي بنحمي بياناتك؟" variant="trust">
            <p>
              بنستخدم بياناتك لتشغيل الخدمة فقط — مش للتسويق العشوائي. بنقلل الوصول للبيانات
              للحاجة الفعلية، ونراجع الطلبات والدعم باحترام خصوصيتك.
            </p>
          </InfoCard>

          <InfoCard icon="🛡️" title="البيانات والجهات الخارجية" variant="accent">
            <p>
              <strong>ما بنبيعش بياناتك الشخصية.</strong> المشاركة تكون فقط حيث يلزم لتشغيل
              الخدمة — مثل التوصيل أو الدفع — أو حيث يفرض القانون ذلك.
            </p>
          </InfoCard>

          <InfoCard icon="🗑️" title="حقك في حذف الحساب" variant="warn">
            <p>
              تقدر تطلب <strong>حذف حسابك وبياناتك</strong> من{' '}
              <NavLink to="/account-deletion">صفحة حذف الحساب</NavLink> أو عبر واتساب.
              قد نحتفظ بجزء من سجل الطلبات لفترة محدودة لأسباب قانونية أو مالية أو لمكافحة
              إساءة الاستخدام.
            </p>
          </InfoCard>

          <InfoCard icon="🔄" title="تحديث السياسة">
            <p>
              قد نحدّث هذه السياسة مع تطور التطبيق. راجع النسخة المعتمدة عند كل تحديث رئيسي.
            </p>
          </InfoCard>
        </div>

        <p className="ip-note">آخر مراجعة: مايو ٢٠٢٦ — هاتلي</p>
      </InnerPageShell>
    </>
  );
}
