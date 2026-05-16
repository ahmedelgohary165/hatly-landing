import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteLayout } from '@/components/SiteLayout';
import { AccountDeletion } from '@/pages/AccountDeletion';
import { Home } from '@/pages/Home';
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
