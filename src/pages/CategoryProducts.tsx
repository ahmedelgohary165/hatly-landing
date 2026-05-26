import { NavLink, useParams } from 'react-router-dom';

import { PaymentInstructionCard } from '@/components/PaymentInstructionCard';
import { ProductCard } from '@/components/ProductCard';
import { InnerPageShell } from '@/components/InnerPageShell';
import { PageMeta } from '@/components/PageMeta';
import { branding } from '@/assets/branding';
import { getCategoryById } from '@/config/products';
import { useProductsByCategory } from '@/hooks/usePublicProducts';

export function CategoryProducts() {
  const { categoryId = '' } = useParams<{ categoryId: string }>();
  const category = getCategoryById(categoryId);
  const { products, loading } = useProductsByCategory(categoryId);

  if (!category) {
    return (
      <>
        <PageMeta
          title="القسم غير موجود — هاتلي"
          description="القسم المطلوب غير متاح حاليًا."
          path={`/categories/${categoryId}`}
        />
        <InnerPageShell
          badge="منتجات هاتلي"
          title="القسم غير موجود"
          lead="القسم اللي بتدور عليه مش متاح حاليًا. ارجع للصفحة الرئيسية واختار قسم تاني."
        >
          <NavLink to="/" className="ip-cta ip-cta--secondary">
            <span className="ip-cta__text">
              <strong>العودة للرئيسية</strong>
            </span>
          </NavLink>
        </InnerPageShell>
      </>
    );
  }

  const categoryImage = branding.services[category.imageKey];

  return (
    <>
      <PageMeta
        title={`${category.title} — منتجات هاتلي`}
        description={category.description}
        path={`/categories/${category.id}`}
      />

      <InnerPageShell
        badge="منتجات هاتلي"
        title={category.title}
        lead={category.description}
        className="ip-page--products"
      >
        <div className="category-hero">
          <img
            src={categoryImage}
            alt=""
            className="category-hero__img"
            loading="lazy"
            decoding="async"
          />
        </div>

        <PaymentInstructionCard />

        {loading ? <p className="operator-message">جاري تحميل المنتجات…</p> : null}

        {!loading && products.length > 0 ? (
          <div className="products-page-grid" role="list">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}

        {!loading && products.length === 0 ? (
          <div className="products-empty" role="status">
            <p className="products-empty__title">مفيش منتجات متاحة حاليًا</p>
            <p className="products-empty__text">
              بنحدّث المنتجات باستمرار — تواصل معانا على واتساب لو محتاج حاجة معينة.
            </p>
          </div>
        ) : null}
      </InnerPageShell>
    </>
  );
}
