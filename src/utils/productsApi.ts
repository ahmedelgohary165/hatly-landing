import type { ProductItem } from '@/config/products';
import { DEFAULT_DELIVERY_LABEL } from '@/config/products';

export type DbLandingProduct = {
  id: string;
  created_at: string;
  updated_at: string;
  product_code: string;
  category_id: string;
  title: string;
  description: string | null;
  price_label: string;
  image_url: string | null;
  delivery_label: string;
  is_available: boolean;
  badge: string | null;
  sort_order: number;
};

export type ProductFormInput = {
  productCode: string;
  categoryId: string;
  title: string;
  description: string;
  priceLabel: string;
  imageUrl: string;
  deliveryLabel: string;
  badge: string;
  isAvailable: boolean;
  sortOrder: number;
};

export function mapDbProductToItem(row: DbLandingProduct): ProductItem {
  return {
    id: row.id,
    productCode: row.product_code,
    categoryId: row.category_id,
    title: row.title,
    description: row.description ?? '',
    priceLabel: row.price_label,
    image: row.image_url ?? '',
    deliveryLabel: row.delivery_label || DEFAULT_DELIVERY_LABEL,
    badge: row.badge ?? undefined,
    isAvailable: row.is_available,
  };
}

export async function fetchPublicProducts(): Promise<
  { ok: true; products: ProductItem[] } | { ok: false; code: 'DB_NOT_CONFIGURED' | 'NETWORK' | 'EMPTY' }
> {
  try {
    const response = await fetch('/api/products/list');
    if (response.status === 503) {
      return { ok: false, code: 'DB_NOT_CONFIGURED' };
    }
    if (!response.ok) {
      return { ok: false, code: 'NETWORK' };
    }
    const data = (await response.json()) as { products?: DbLandingProduct[] };
    if (!data.products?.length) {
      return { ok: false, code: 'EMPTY' };
    }
    return {
      ok: true,
      products: data.products.map(mapDbProductToItem).filter((product) => product.isAvailable),
    };
  } catch {
    return { ok: false, code: 'NETWORK' };
  }
}

export async function fetchOperatorProducts(
  operatorSecret: string,
): Promise<{ ok: true; products: DbLandingProduct[] } | { ok: false; message: string }> {
  try {
    const response = await fetch('/api/products/list', {
      headers: { 'X-Operator-Secret': operatorSecret },
    });
    const data = (await response.json()) as {
      products?: DbLandingProduct[];
      error?: string;
      code?: string;
    };

    if (response.status === 503 && data.code === 'DB_NOT_CONFIGURED') {
      return { ok: false, message: 'قاعدة بيانات المنتجات غير مفعّلة بعد.' };
    }
    if (response.status === 503 && data.code === 'OPERATOR_NOT_CONFIGURED') {
      return { ok: false, message: 'لوحة التشغيل غير مفعّلة بعد.' };
    }
    if (response.status === 401) {
      return { ok: false, message: 'كود غير صحيح.' };
    }
    if (!response.ok || !data.products) {
      return { ok: false, message: data.error ?? 'تعذر تحميل المنتجات.' };
    }

    return { ok: true, products: data.products };
  } catch {
    return { ok: false, message: 'تعذر الاتصال بالخادم.' };
  }
}

export async function createOperatorProduct(
  operatorSecret: string,
  input: ProductFormInput,
): Promise<{ ok: true; product: DbLandingProduct } | { ok: false; message: string }> {
  return mutateProduct('/api/products/create', operatorSecret, input);
}

export async function updateOperatorProduct(
  operatorSecret: string,
  id: string,
  input: ProductFormInput,
): Promise<{ ok: true; product: DbLandingProduct } | { ok: false; message: string }> {
  return mutateProduct('/api/products/update', operatorSecret, input, id);
}

export async function archiveOperatorProduct(
  operatorSecret: string,
  id: string,
): Promise<{ ok: boolean; message?: string }> {
  try {
    const response = await fetch('/api/products/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Secret': operatorSecret,
      },
      body: JSON.stringify({ id }),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      return { ok: false, message: data.error ?? 'تعذر إخفاء المنتج.' };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: 'تعذر الاتصال بالخادم.' };
  }
}

async function mutateProduct(
  url: string,
  operatorSecret: string,
  input: ProductFormInput,
  id?: string,
): Promise<{ ok: true; product: DbLandingProduct } | { ok: false; message: string }> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Secret': operatorSecret,
      },
      body: JSON.stringify({
        id,
        productCode: input.productCode,
        categoryId: input.categoryId,
        title: input.title,
        description: input.description,
        priceLabel: input.priceLabel,
        imageUrl: input.imageUrl,
        deliveryLabel: input.deliveryLabel,
        badge: input.badge,
        isAvailable: input.isAvailable,
        sortOrder: input.sortOrder,
      }),
    });
    const data = (await response.json()) as { product?: DbLandingProduct; error?: string };
    if (!response.ok || !data.product) {
      return { ok: false, message: data.error ?? 'تعذر حفظ المنتج.' };
    }
    return { ok: true, product: data.product };
  } catch {
    return { ok: false, message: 'تعذر الاتصال بالخادم.' };
  }
}

export function getProductsByCategoryFromList(
  products: ProductItem[],
  categoryId: string,
): ProductItem[] {
  return products.filter(
    (product) => product.categoryId === categoryId && product.isAvailable,
  );
}

export function getProductByCodeFromList(
  products: ProductItem[],
  productCode: string,
): ProductItem | undefined {
  return products.find(
    (product) => product.productCode === productCode && product.isAvailable,
  );
}
