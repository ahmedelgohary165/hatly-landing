import { useEffect, useState } from 'react';

import {
  getProductByCode,
  getProductsByCategory,
  productsCatalog,
  type ProductItem,
} from '@/config/products';
import {
  fetchPublicProducts,
  getProductByCodeFromList,
  getProductsByCategoryFromList,
} from '@/utils/productsApi';

export function usePublicProducts() {
  const [products, setProducts] = useState<ProductItem[]>(
    productsCatalog.filter((product) => product.isAvailable),
  );
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'static' | 'database'>('static');

  useEffect(() => {
    let cancelled = false;

    void fetchPublicProducts().then((result) => {
      if (cancelled) return;
      if (result.ok && result.products.length > 0) {
        setProducts(result.products);
        setSource('database');
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, source };
}

export function useProductByCode(productCode: string) {
  const { products, loading, source } = usePublicProducts();
  const dbProduct = getProductByCodeFromList(products, productCode);
  const product = dbProduct ?? getProductByCode(productCode);

  return { product, loading, source };
}

export function useProductsByCategory(categoryId: string) {
  const { products, loading, source } = usePublicProducts();

  const categoryProducts =
    source === 'database'
      ? getProductsByCategoryFromList(products, categoryId)
      : getProductsByCategory(categoryId);

  return { products: categoryProducts, loading, source };
}
