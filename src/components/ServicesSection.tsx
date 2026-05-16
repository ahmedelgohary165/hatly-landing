import { branding } from '@/assets/branding';
import { landingCopy, servicesContent } from '@/config/site';

export function ServicesSection() {
  return (
    <section className="lp-sec lp-sec--services" aria-labelledby="lp-srv-head">
      <div className="lp-sec-head lp-sec-head--tight">
        <span className="lp-sec-badge">{landingCopy.servicesBadge}</span>
        <h2 id="lp-srv-head" className="lp-sec-title">
          {landingCopy.servicesTitle}
        </h2>
      </div>
      <div className="lp-srv-grid lp-srv-grid--visual" role="list">
        {servicesContent.map(({ title, desc, imageKey }) => (
          <article key={title} className="lp-srv-card-v2" role="listitem">
            <div className="lp-srv-card-v2__thumb">
              <img
                src={branding.services[imageKey]}
                alt=""
                className="lp-srv-card-v2__img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="lp-srv-card-v2__text">
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
