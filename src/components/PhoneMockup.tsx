import { branding } from '@/assets/branding';
import {
  phoneAppCategories,
  phoneDeliveryChips,
  phoneFloatChips,
  phoneMiniOffers,
  phoneQuickPicks,
} from '@/config/site';

export function PhoneMockup() {
  return (
    <div className="app-phone-wrap" aria-hidden>
      <div className="app-phone-glow" />

      {phoneMiniOffers.map((offer, i) => (
        <span
          key={offer.sub}
          className={`app-phone-mini-offer app-phone-mini-offer--${i + 1}`}
        >
          <strong>{offer.label}</strong>
          <span>{offer.sub}</span>
        </span>
      ))}

      {phoneFloatChips.map((chip, i) => (
        <span
          key={chip.label}
          className={`app-phone-float app-phone-float--${i + 1} app-phone-float--${chip.tone}`}
        >
          {chip.label}
        </span>
      ))}

      <div className="app-phone-body">
        <div className="app-phone-screen">
          <div className="app-phone-status">
            <span className="app-phone-time" dir="ltr">
              9:41
            </span>
            <span className="app-phone-notch" />
            <span className="app-phone-signal" aria-hidden />
          </div>

          <header className="app-phone-top">
            <img
              src={branding.logoMark}
              alt=""
              className="app-phone-logo"
              width={28}
              height={28}
              decoding="async"
            />
            <div className="app-phone-greet">
              <span className="app-phone-greet-hi">أهلًا بيك 👋</span>
              <span className="app-phone-greet-sub">إيه اللي نفسك فيه النهارده؟</span>
            </div>
            <span className="app-phone-loc" aria-hidden>
              📍
            </span>
          </header>

          <div className="app-phone-search">
            <span className="app-phone-search-ico" aria-hidden>
              ⌕
            </span>
            <span>دور على منتج، متجر، أو طلب…</span>
          </div>

          <div className="app-phone-delivery-chips">
            {phoneDeliveryChips.map((chip) => (
              <span key={chip} className="app-phone-delivery-chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="app-phone-promo app-phone-promo--pulse">
            <div className="app-phone-promo-text">
              <strong>عرض الأسبوع</strong>
              <span>خصم على طلبات مختارة — لفترة محدودة</span>
            </div>
            <span className="app-phone-promo-tag app-phone-promo-tag--pulse">جديد</span>
          </div>

          <p className="app-phone-label">الأقسام</p>
          <div className="app-phone-cats app-phone-cats--balanced">
            {phoneAppCategories.map(({ label, imageKey }) => (
              <div key={label} className="app-phone-cat">
                <span className="app-phone-cat-img-wrap">
                  <img
                    src={branding.services[imageKey]}
                    alt=""
                    className="app-phone-cat-img"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="app-phone-cat-label">{label}</span>
              </div>
            ))}
          </div>

          <p className="app-phone-label">طلبات سريعة</p>
          <div className="app-phone-quick">
            {phoneQuickPicks.map(({ label, imageKey, meta }) => (
              <div key={label} className="app-phone-quick-card">
                <img
                  src={branding.services[imageKey]}
                  alt=""
                  className="app-phone-quick-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="app-phone-quick-meta">
                  <span className="app-phone-quick-title">{label}</span>
                  <span className="app-phone-quick-time">{meta}</span>
                </div>
              </div>
            ))}
          </div>

          <nav className="app-phone-tabbar" aria-hidden>
            <span className="app-phone-tab app-phone-tab--on" />
            <span className="app-phone-tab" />
            <span className="app-phone-tab app-phone-tab--fab" />
            <span className="app-phone-tab" />
            <span className="app-phone-tab" />
          </nav>
        </div>
      </div>
    </div>
  );
}
