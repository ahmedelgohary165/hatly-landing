import { InfoCard, InnerPageShell, IpCta } from '@/components/InnerPageShell';
import { PageMeta } from '@/components/PageMeta';
import { branding } from '@/assets/branding';
import { site } from '@/config/site';

export function AccountDeletion() {
  return (
    <>
      <PageMeta
        title="حذف الحساب — هاتلي"
        description="اطلب حذف حساب هاتلي عبر واتساب برقم التسجيل. دليل واضح ومتوافق مع متطلبات Google Play."
        path="/account-deletion"
      />

      <InnerPageShell
        badge="Google Play — حذف الحساب"
        title="حذف الحساب وبياناتك"
        lead="لو حابب تحذف حسابك، تواصل معانا بواتساب من نفس رقم الهاتف المسجّل على الحساب."
      >
        <div className="ip-cta-wrap">
          <IpCta
            href={site.whatsappUrl}
            label="حذف الحساب عبر واتساب"
            sublabel={`راسلنا على ${site.phone}`}
            iconSrc={branding.icons.whatsapp}
          />
        </div>

        <p className="ip-section-label">خطوات بسيطة</p>
        <ol className="ip-steps" aria-label="خطوات حذف الحساب">
          <li className="ip-step">
            <span className="ip-step__num" aria-hidden>
              ١
            </span>
            <p className="ip-step__text">
              افتح واتساب من <strong>نفس رقم الهاتف المسجّل</strong> على حساب هاتلي.
            </p>
          </li>
          <li className="ip-step">
            <span className="ip-step__num" aria-hidden>
              ٢
            </span>
            <p className="ip-step__text">
              اكتب إنك عايز <strong>«حذف الحساب»</strong> أو <strong>«إزالة بياناتي»</strong>{' '}
              بوضوح.
            </p>
          </li>
          <li className="ip-step">
            <span className="ip-step__num" aria-hidden>
              ٣
            </span>
            <p className="ip-step__text">
              فريق الدعم هيراجع الطلب ويتواصل معاك لتأكيد الهوية قبل التنفيذ.
            </p>
          </li>
        </ol>

        <div className="ip-stack">
          <InfoCard icon="📋" title="بعد الطلب" variant="accent">
            <p>
              حيث يمكن تقنيًا، هنقفل حسابك أو نحذف بياناتك الشخصية قدر الإمكان حسب حالتك.
            </p>
          </InfoCard>

          <InfoCard icon="📁" title="سجلات قد تبقى لفترة" variant="warn">
            <p>
              بعض سجلات الطلبات أو بيانات الدفع <strong>قد تبقى لفترة محدودة</strong> لأسباب
              قانونية أو مالية أو لمكافحة إساءة الاستخدام — حتى بعد حذف الحساب.
            </p>
          </InfoCard>

          <InfoCard icon="✓" title="متوافق مع متاجر التطبيقات" variant="trust">
            <p>
              هذه الصفحة جزء من موقع هاتلي الرسمي لشرح آلية طلب حذف الحساب وفق متطلبات Google
              Play ومتاجر التطبيقات.
            </p>
          </InfoCard>
        </div>

        <p className="ip-note">
          للاستفسارات: واتساب{' '}
          <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">
            {site.phone}
          </a>
        </p>
      </InnerPageShell>
    </>
  );
}
