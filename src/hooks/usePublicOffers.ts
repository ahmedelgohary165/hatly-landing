import { useEffect, useMemo, useState } from 'react';

import { featuredOffers, offersCatalog, getOfferByCode, type OfferItem } from '@/config/offers';
import { fetchPublicOffers, getOfferByCodeFromList } from '@/utils/offersApi';

type OffersSource = 'static' | 'database';

function logOffersSource(source: OffersSource) {
  if (source === 'database') {
    console.info('[hatly-landing] Using database offers');
    return;
  }
  console.info('[hatly-landing] Using static fallback offers');
}

export function usePublicOffers() {
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<OffersSource | null>(null);

  useEffect(() => {
    let cancelled = false;

    void fetchPublicOffers().then((result) => {
      if (cancelled) return;

      if (result.ok && result.offers.length > 0) {
        setOffers(result.offers);
        setSource('database');
        logOffersSource('database');
      } else {
        setOffers(offersCatalog);
        setSource('static');
        logOffersSource('static');
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
    if (source === 'static') {
      return featuredOffers;
    }
    return [];
  }, [offers, source]);

  return {
    offers,
    featuredOffers: featured,
    loading,
    source,
  };
}

export function useOfferByCode(offerCode: string) {
  const { offers, loading, source } = usePublicOffers();

  const offer = useMemo(() => {
    if (loading || !source) return undefined;

    if (source === 'database') {
      return getOfferByCodeFromList(offers, offerCode);
    }

    return getOfferByCode(offerCode);
  }, [loading, offerCode, offers, source]);

  return { offer, loading, source };
}
