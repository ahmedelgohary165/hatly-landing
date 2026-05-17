import { OffersSection } from '@/components/OffersSection';
import { ServiceAreasSection } from '@/components/ServiceAreasSection';
import { PageMeta } from '@/components/PageMeta';
import { PhoneMockup } from '@/components/PhoneMockup';
import { ServicesSection } from '@/components/ServicesSection';
import { SocialLinksRow } from '@/components/SocialLinksRow';
import { getAppDownloadUrl } from '@/config/download';
import { howItWorksSteps, landingCopy, site, whyHatlyCards } from '@/config/site';

export function Home() {
  const downloadHref = getAppDownloadUrl();

  return (
    <>
      <PageMeta
        title="هاتلي — كل اللي نفسك فيه لحد بابك"
        description="طلباتك اليومية، الهدايا، الصيدلية، المناسبات، والمزيد — حمّل تطبيق هاتلي وخلّي كل اللي محتاجه أسهل."
        path="/"
      />

      <div className="lp-page lp-page--polish lp-page--premium">
        <section
          className="lp-hero-block lp-hero-block--premium"
          aria-labelledby="lp-main-title"
        >
          <div className="lp-hero-atmos" aria-hidden>
            <div className="lp-hero-blob lp-hero-blob--mint" />
            <div className="lp-hero-blob lp-hero-blob--teal" />
            <div className="lp-hero-blob lp-hero-blob--warm" />
            <div className="lp-hero-shimmer" aria-hidden />
          </div>

          <div className="lp-hero-stage">
            <div className="lp-hero-device">
              <PhoneMockup />
            </div>

            <div className="lp-hero-copy">
              <span className="lp-badge">{landingCopy.heroBadge}</span>

              <h1 id="lp-main-title" className="lp-h1">
                <span className="lp-h1-line lp-h1-line--brand">{landingCopy.heroHeadlineLine1}</span>
                <span className="lp-h1-line lp-h1-line--hot">{landingCopy.heroHeadlineLine2}</span>
                <span className="lp-h1-line">{landingCopy.heroHeadlineLine3}</span>
              </h1>

              <p className="lp-sub">{landingCopy.heroSub}</p>
              <p className="lp-micro">{landingCopy.heroMicro}</p>

              <div className="lp-cta-row lp-cta-row--premium">
                <a
                  className="lp-btn-main lp-btn-main--premium"
                  href={downloadHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {landingCopy.primaryCta}
                </a>
                <a
                  className="lp-btn-second lp-btn-second--premium"
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {landingCopy.secondaryCta}
                </a>
              </div>

              <p className="lp-hero-note">{site.serviceAvailabilityNote}</p>
            </div>
          </div>
        </section>

        <div className="lp-flow-divider lp-flow-divider--glow" aria-hidden />

        <SocialLinksRow variant="hero" />

        <div className="lp-sec-band lp-sec-band--mint">
          <ServicesSection />
          <div className="lp-flow-divider" aria-hidden />
          <OffersSection />
        </div>

        <div className="lp-flow-divider lp-flow-divider--glow" aria-hidden />

        <section className="lp-sec lp-sec-band lp-sec-band--warm" aria-labelledby="lp-why-head">
          <div className="lp-sec-head lp-sec-head--tight">
            <span className="lp-sec-badge">{landingCopy.whyBadge}</span>
            <h2 id="lp-why-head" className="lp-sec-title">
              {landingCopy.whyTitle}
            </h2>
          </div>
          <div className="lp-why-grid">
            {whyHatlyCards.map(({ title: t, desc: d }) => (
              <article key={t} className="lp-why-card">
                <div className="lp-why-ico-bar" aria-hidden />
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lp-sec" aria-labelledby="lp-how-head">
          <div className="lp-sec-head lp-sec-head--tight">
            <h2 id="lp-how-head" className="lp-sec-title">
              {landingCopy.howTitle}
            </h2>
          </div>
          <div className="lp-how-grid">
            {howItWorksSteps.map(({ title: st, desc: sd }, i) => (
              <article key={st} className="lp-how-card">
                <span className="lp-how-num" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <h3>{st}</h3>
                  <p>{sd}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ServiceAreasSection />

        <section className="lp-fin lp-fin--premium" aria-labelledby="lp-fin-head">
          <span className="lp-fin-pattern" aria-hidden />
          <span className="lp-fin-glow" aria-hidden />
          <div className="lp-fin-inner lp-reveal">
            <span className="lp-fin-badge">{landingCopy.finalBadge}</span>
            <h2 id="lp-fin-head" className="lp-fin-title">
              {landingCopy.finalTitle}
            </h2>
            <p className="lp-fin-sub">{landingCopy.finalSub}</p>
            <ul className="lp-fin-trust">
              {landingCopy.finalTrustLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="lp-fin-actions">
              <a
                className="lp-btn-fin-play"
                href={downloadHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {landingCopy.finalCtaPrimary}
              </a>
              <a
                className="lp-btn-fin-outline"
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {landingCopy.finalCtaSecondary}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
