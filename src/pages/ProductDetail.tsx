import { NavLink, useParams } from 'react-router-dom';

import { ProductOrderFlow, type ProductOrderFormData } from '@/components/ProductOrderFlow';
import { InnerPageShell } from '@/components/InnerPageShell';
import { PageMeta } from '@/components/PageMeta';
import { useProductByCode } from '@/hooks/usePublicProducts';
import {
  DEFAULT_DELIVERY_LABEL,
  getCategoryById,
  resolveDeliveryLabel,
} from '@/config/products';
import { getRequiredDepositLabel } from '@/utils/deposit';
import { createLandingOrder } from '@/utils/ordersApi';
import { getProductOrderWhatsAppUrl, openWhatsAppUrl } from '@/utils/whatsapp';

export function ProductDetail() {
  const { productCode = '' } = useParams<{ productCode: string }>();
  const { product, loading } = useProductByCode(productCode);
  const category = product ? getCategoryById(product.categoryId) : undefined;
  const deliveryLabel = product ? resolveDeliveryLabel(product) : DEFAULT_DELIVERY_LABEL;
  const requiredDepositLabel = product ? getRequiredDepositLabel(product.priceLabel) : '';

  if (loading) {
    return (
      <>
        <PageMeta
          title="تفاصيل المنتج — هاتلي"
          description="جاري تحميل تفاصيل المنتج."
          path={`/products/${productCode}`}
        />
        <InnerPageShell badge="منتجات هاتلي" title="تفاصيل المنتج" lead="جاري التحميل…">
          <p className="operator-message">جاري تحميل المنتج…</p>
        </InnerPageShell>
      </>
    );
  }

  if (!product || !category) {
    return (
      <>
        <PageMeta
          title="المنتج غير موجود — هاتلي"
          description="المنتج المطلوب غير متاح حاليًا."
          path={`/products/${productCode}`}
        />
        <InnerPageShell
          badge="منتجات هاتلي"
          title="المنتج غير موجود"
          lead="المنتج اللي بتدور عليه مش متاح حاليًا."
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

  const handleSubmit = async (formData: ProductOrderFormData) => {
    const orderResult = await createLandingOrder({
      customerWhatsapp: formData.customerWhatsapp,
      productCode: product.productCode,
      productTitle: product.title,
      categoryId: product.categoryId,
      categoryName: category.title,
      priceLabel: product.priceLabel,
      requiredDepositLabel,
      transferredAmount: formData.transferredAmount,
      paymentMethod: formData.selectedPaymentMethod,
      paymentNumber: formData.selectedPaymentNumber,
    });

    const whatsappUrl = getProductOrderWhatsAppUrl({
      orderId: orderResult.ok ? orderResult.orderId : undefined,
      apiFailed: !orderResult.ok,
      customerWhatsapp: formData.customerWhatsapp,
      title: product.title,
      productCode: product.productCode,
      categoryName: category.title,
      priceLabel: product.priceLabel,
      requiredDepositLabel,
      transferredAmount: formData.transferredAmount,
      selectedPaymentMethod: formData.selectedPaymentMethod,
      selectedPaymentNumber: formData.selectedPaymentNumber,
    });

    openWhatsAppUrl(whatsappUrl);
  };

  return (
    <>
      <PageMeta
        title={`${product.title} — تفاصيل المنتج`}
        description={product.description}
        path={`/products/${product.productCode}`}
      />

      <InnerPageShell
        badge="منتجات هاتلي"
        title="تفاصيل المنتج"
        lead="اختار طريقة الدفع، حوّل العربون، ثم أكّد الطلب على واتساب."
        className="ip-page--products ip-page--detail"
      >
        <article className="product-detail">
          <div className="product-detail__media">
            {product.badge ? (
              <span className="product-detail__badge">{product.badge}</span>
            ) : null}
            <img
              src={product.image}
              alt=""
              className="product-detail__img"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="product-detail__info">
            <p className="product-detail__code" dir="ltr">
              {product.productCode}
            </p>
            <h2 className="product-detail__name">{product.title}</h2>
            <p className="product-detail__category">{category.title}</p>
            <p className="product-detail__desc">{product.description}</p>
            <div className="product-detail__meta">
              <span className="product-detail__price">{product.priceLabel}</span>
              <span className="product-detail__delivery">{deliveryLabel}</span>
            </div>
          </div>
        </article>

        <ProductOrderFlow
          requiredDepositLabel={requiredDepositLabel}
          onSubmit={handleSubmit}
        />

        <NavLink
          to={`/categories/${product.categoryId}`}
          className="product-detail__back ip-cta ip-cta--secondary"
        >
          <span className="ip-cta__text">
            <strong>العودة للقسم</strong>
          </span>
        </NavLink>
      </InnerPageShell>
    </>
  );
}
