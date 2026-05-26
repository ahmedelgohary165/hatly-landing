import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteLayout } from '@/components/SiteLayout';
import { AccountDeletion } from '@/pages/AccountDeletion';
import { CategoryProducts } from '@/pages/CategoryProducts';
import { Home } from '@/pages/Home';
import { OfferDetail } from '@/pages/OfferDetail';
import { Offers } from '@/pages/Offers';
import { OperatorHub } from '@/pages/OperatorHub';
import { OperatorOrders } from '@/pages/OperatorOrders';
import { OperatorOffers } from '@/pages/OperatorOffers';
import { OperatorProducts } from '@/pages/OperatorProducts';
import { ProductDetail } from '@/pages/ProductDetail';
import { Links } from '@/pages/Links';
import { Privacy } from '@/pages/Privacy';
import { Support } from '@/pages/Support';
import { Terms } from '@/pages/Terms';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="offers" element={<Offers />} />
          <Route path="offers/:offerCode" element={<OfferDetail />} />
          <Route path="categories/:categoryId" element={<CategoryProducts />} />
          <Route path="products/:productCode" element={<ProductDetail />} />
          <Route path="operator" element={<OperatorHub />} />
          <Route path="operator/orders" element={<OperatorOrders />} />
          <Route path="operator/products" element={<OperatorProducts />} />
          <Route path="operator/offers" element={<OperatorOffers />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="account-deletion" element={<AccountDeletion />} />
          <Route path="support" element={<Support />} />
          <Route path="links" element={<Links />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
