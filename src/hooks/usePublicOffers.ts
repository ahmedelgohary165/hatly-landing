import { useEffect, useMemo, useState } from 'react';

import { featuredOffers, offersCatalog, getOfferByCode, type OfferItem } from '@/config/offers';
import { fetchPublicOffers, getOfferByCodeFromList } from '@/utils/offersApi';

export function usePublicOffers() {
  const [offers, setOffers] = useState<OfferItem[]>(offersCatalog);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'static' | 'database'>('static');

  useEffect(() => {
    let cancelled = false;

    void fetchPublicOffers().then((result) => {
      if (cancelled) return;
      if (result.ok && result.offers.length > 0) {
        setOffers(result.offers);
        setSource('database');
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const featured = useMemo(() => {
    if (source === 'database') {
      return offers.slice(0, 3);
    }
    return featuredOffers;
  }, [offers, source]);

  return { offers, featuredOffers: featured, loading, source };
}

export function useOfferByCode(offerCode: string) {
  const { offers, loading, source } = usePublicOffers();
  const offer = getOfferByCodeFromList(offers, offerCode) ?? getOfferByCode(offerCode);

  return { offer, loading, source };
}
