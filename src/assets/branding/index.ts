import iconFacebook from './icon-facebook.png';
import iconGmail from './icon-gmail.png';
import iconInstagram from './icon-instagram.png';
import iconTiktok from './icon-tiktok.png';
import iconWhatsapp from './icon-whatsapp.png';
import logoMain from './logo-main.png';
import logoMark from './logo-mark.png';
import offer1 from './offer-1.png';
import offer2 from './offer-2.png';
import offer3 from './offer-3.png';
import serviceCosmetics from './service-cosmetics.png';
import serviceDaily from './service-daily.png';
import serviceDigitalMarketing from './service-digital-marketing.png';
import serviceGifts from './service-gifts.png';
import serviceLibrary from './service-library.png';
import serviceMakeup from './service-makeup.png';
import serviceMobile from './service-mobile.png';
import serviceOccasions from './service-occasions.png';
import servicePharmacy from './service-pharmacy.png';
import serviceRoastery from './service-roastery.png';
import serviceSportswear from './service-sportswear.png';
import serviceToys from './toys-category.png';

export const branding = {
  logoMain,
  logoMark,
  icons: {
    whatsapp: iconWhatsapp,
    instagram: iconInstagram,
    facebook: iconFacebook,
    tiktok: iconTiktok,
    gmail: iconGmail,
  },
  services: {
    daily: serviceDaily,
    pharmacy: servicePharmacy,
    library: serviceLibrary,
    gifts: serviceGifts,
    occasions: serviceOccasions,
    makeup: serviceMakeup,
    mobile: serviceMobile,
    roastery: serviceRoastery,
    cosmetics: serviceCosmetics,
    toys: serviceToys,
    digitalMarketing: serviceDigitalMarketing,
    sportswear: serviceSportswear,
  },
  offers: {
    offer1,
    offer2,
    offer3,
  },
} as const;

export type ServiceImageKey = keyof typeof branding.services;
