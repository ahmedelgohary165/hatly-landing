import { InfoCard, InnerPageShell, IpCta } from '@/components/InnerPageShell';
import { PageMeta } from '@/components/PageMeta';
import { SocialLinksRow } from '@/components/SocialLinksRow';
import { branding } from '@/assets/branding';
import { supportFaq } from '@/config/inner-pages';
import { site } from '@/config/site';

export function Support() {
  return (
    <>
      <PageMeta
        title="الدعم والمساعدة — هاتلي"
        description="محتاج مساعدة في طلب أو حساب؟ تواصل مع فريق هاتلي على واتساب أو تابعنا على السوشيال."
        path="/support"
      />

      <InnerPageShell
        badge="نحن هنا لمساعدتك"
        title="الدعم والمساعدة"
        lead="فريق هاتلي جاهز يساعدك في الطلبات، الدفع، الحساب، أو أي استفسار عن الخدمة."
      >
        <div className="ip-cta-wrap">
          <IpCta
            href={site.whatsappUrl}
            label="تواصل واتساب الآن"
            sublabel={`${site.phone} — أسرع قناة للدعم`}
            iconSrc={branding.icons.whatsapp}
          />
        </div>

        <InfoCard icon="💡" title="قبل ما تكتب" variant="accent">
          <ul>
            <li>اذكر رقم الطلب أو وصف المشكلة بوضوح.</li>
            <li>استخدم نفس رقم الهاتف المسجّل على الحساب.</li>
            <li>لو المشكلة في الدفع، جهّز إيصال أو رقم العملية إن وُجد.</li>
          </ul>
        </InfoCard>

        <p className="ip-section-label">تابع هاتلي</p>
        <div className="ip-social-block">
          <SocialLinksRow />
        </div>

        <p className="ip-section-label">أسئلة شائعة</p>
        <div className="ip-faq" role="list">
          {supportFaq.map(({ q, a }) => (
            <article key={q} className="ip-faq-item" role="listitem">
              <h3>{q}</h3>
              <p>{a}</p>
            </article>
          ))}
        </div>

        <p className="ip-note">{site.serviceAvailabilityNote}</p>
      </InnerPageShell>
    </>
  );
}
