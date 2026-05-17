import { serviceAreasContent } from '@/config/site';

export function ServiceAreasSection() {
  return (
    <section className="lp-sec lp-areas" aria-labelledby="lp-areas-head">
      <div className="lp-sec-head lp-sec-head--tight">
        <h2 id="lp-areas-head" className="lp-sec-title">
          {serviceAreasContent.title}
        </h2>
        <p className="lp-sec-sub">{serviceAreasContent.subtitle}</p>
      </div>
      <div className="lp-areas-chips" role="list">
        {serviceAreasContent.areas.map((area) => (
          <span key={area} className="lp-area-chip" role="listitem">
            <span className="lp-area-chip__pin" aria-hidden>
              📍
            </span>
            {area}
          </span>
        ))}
      </div>
      <p className="lp-areas-note">{serviceAreasContent.footnote}</p>
    </section>
  );
}
