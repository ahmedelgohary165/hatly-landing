import { useEffect, useMemo, useState } from 'react';

import type { OfferItem } from '@/config/offers';
import { fetchPublicOffers, getOfferByCodeFromList } from '@/utils/offersApi';

export function usePublicOffers() {
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    void fetchPublicOffers().then((result) => {
      if (cancelled) return;

      if (result.ok && result.offers.length > 0) {
        setOffers(result.offers);
        console.info('[hatly-landing] Using database offers');
      } else {
        setOffers([]);
        console.info('[hatly-landing] No database offers available');
      }

      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const featuredOffers = useMemo(() => offers.slice(0, 3), [offers]);

  return {
    offers,
    featuredOffers,
    loading,
    hasOffers: offers.length > 0,
  };
}

export function useOfferByCode(offerCode: string) {
  const { offers, loading } = usePublicOffers();

  const offer = useMemo(() => {
    if (loading) return undefined;
    return getOfferByCodeFromList(offers, offerCode);
  }, [loading, offerCode, offers]);

  return { offer, loading };
}
