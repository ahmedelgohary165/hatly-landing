import type { OfferItem } from '@/config/offers';

export type DbLandingOffer = {
  id: string;
  created_at: string;
  updated_at: string;
  offer_code: string;
  title: string;
  description: string | null;
  price_label: string;
  old_price_label: string | null;
  image_url: string | null;
  badge: string | null;
  is_available: boolean;
  sort_order: number;
};

export type OfferFormInput = {
  offerCode: string;
  title: string;
  description: string;
  priceLabel: string;
  oldPriceLabel: string;
  imageUrl: string;
  badge: string;
  isAvailable: boolean;
  sortOrder: number;
};

export function mapDbOfferToItem(row: DbLandingOffer): OfferItem {
  return {
    id: row.id,
    offerCode: row.offer_code,
    title: row.title,
    description: row.description ?? '',
    priceLabel: row.price_label,
    oldPriceLabel: row.old_price_label ?? undefined,
    image: row.image_url ?? '',
    badge: row.badge ?? undefined,
  };
}

export async function fetchPublicOffers(): Promise<
  | { ok: true; offers: OfferItem[] }
  | { ok: false; code: 'DB_NOT_CONFIGURED' | 'DATABASE_ERROR' | 'NETWORK' | 'EMPTY' }
> {
  try {
    const response = await fetch('/api/offers/list');
    if (response.status === 503) {
      return { ok: false, code: 'DB_NOT_CONFIGURED' };
    }

    const data = (await response.json()) as {
      ok?: boolean;
      offers?: DbLandingOffer[];
      error?: string;
    };

    if (response.status === 500 && data.error === 'DATABASE_ERROR') {
      return { ok: false, code: 'DATABASE_ERROR' };
    }

    if (!response.ok || !data.ok || !Array.isArray(data.offers)) {
      return { ok: false, code: 'NETWORK' };
    }

    const offers = data.offers
      .filter((row) => row.is_available)
      .map(mapDbOfferToItem);

    if (offers.length === 0) {
      return { ok: false, code: 'EMPTY' };
    }

    return {
      ok: true,
      offers,
    };
  } catch {
    return { ok: false, code: 'NETWORK' };
  }
}

export async function fetchOperatorOffers(
  operatorSecret: string,
): Promise<{ ok: true; offers: DbLandingOffer[] } | { ok: false; message: string }> {
  try {
    const response = await fetch('/api/offers/list', {
      headers: { 'X-Operator-Secret': operatorSecret },
    });
    const data = (await response.json()) as {
      offers?: DbLandingOffer[];
      error?: string;
      code?: string;
    };

    if (response.status === 503 && data.code === 'DB_NOT_CONFIGURED') {
      return { ok: false, message: 'قاعدة بيانات العروض غير مفعّلة بعد.' };
    }
    if (response.status === 500 && data.error === 'DATABASE_ERROR') {
      return { ok: false, message: 'تعذر الاتصال بقاعدة البيانات.' };
    }
    if (response.status === 503 && data.code === 'OPERATOR_NOT_CONFIGURED') {
      return { ok: false, message: 'لوحة التشغيل غير مفعّلة بعد.' };
    }
    if (response.status === 401) {
      return { ok: false, message: 'كود غير صحيح.' };
    }
    if (!response.ok || !data.offers) {
      return { ok: false, message: data.error ?? 'تعذر تحميل العروض.' };
    }

    return { ok: true, offers: data.offers };
  } catch {
    return { ok: false, message: 'تعذر الاتصال بالخادم.' };
  }
}

export async function createOperatorOffer(
  operatorSecret: string,
  input: OfferFormInput,
): Promise<{ ok: true; offer: DbLandingOffer } | { ok: false; message: string }> {
  return mutateOffer('/api/offers/create', operatorSecret, input);
}

export async function updateOperatorOffer(
  operatorSecret: string,
  id: string,
  input: OfferFormInput,
): Promise<{ ok: true; offer: DbLandingOffer } | { ok: false; message: string }> {
  return mutateOffer('/api/offers/update', operatorSecret, input, id);
}

export async function archiveOperatorOffer(
  operatorSecret: string,
  id: string,
): Promise<{ ok: boolean; message?: string }> {
  try {
    const response = await fetch('/api/offers/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Secret': operatorSecret,
      },
      body: JSON.stringify({ id }),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      return { ok: false, message: data.error ?? 'تعذر إخفاء العرض.' };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: 'تعذر الاتصال بالخادم.' };
  }
}

async function mutateOffer(
  url: string,
  operatorSecret: string,
  input: OfferFormInput,
  id?: string,
): Promise<{ ok: true; offer: DbLandingOffer } | { ok: false; message: string }> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Secret': operatorSecret,
      },
      body: JSON.stringify({
        id,
        offerCode: input.offerCode,
        title: input.title,
        description: input.description,
        priceLabel: input.priceLabel,
        oldPriceLabel: input.oldPriceLabel,
        imageUrl: input.imageUrl,
        badge: input.badge,
        isAvailable: input.isAvailable,
        sortOrder: input.sortOrder,
      }),
    });
    const data = (await response.json()) as { offer?: DbLandingOffer; error?: string };
    if (!response.ok || !data.offer) {
      return { ok: false, message: data.error ?? 'تعذر حفظ العرض.' };
    }
    return { ok: true, offer: data.offer };
  } catch {
    return { ok: false, message: 'تعذر الاتصال بالخادم.' };
  }
}

export function getOfferByCodeFromList(
  offers: OfferItem[],
  offerCode: string,
): OfferItem | undefined {
  return offers.find((offer) => offer.offerCode === offerCode);
}
