import { lazy, Suspense, useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import Splash from './components/Splash';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './sections/Footer';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';

// Every page but the home page loads on demand, so the first visit does not
// ship their code.
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Investors = lazy(() => import('./pages/Investors'));
const BrandRoute = lazy(() => import('./pages/brands/BrandRoute'));
const Cocktails = lazy(() => import('./pages/Cocktails'));
const Events = lazy(() => import('./pages/Events'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const InvestorsPage = lazy(() => import('./pages/InvestorsPage'));
const TradePage = lazy(() => import('./pages/TradePage'));
const CubaLibre = lazy(() => import('./pages/brands/CubaLibre'));
const ProductPage = lazy(() => import('./pages/brands/ProductPage'));
const GiffardRange = lazy(() => import('./pages/brands/GiffardRange'));
const blank = <div style={{ minHeight: '100svh' }} />;

export default function App() {
  useLenis();
  const [ready, setReady] = useState(false);

  const handleSplashDone = useCallback(() => setReady(true), []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Splash onDone={handleSplashDone} />
      <ScrollProgress />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home ready={ready} />} />
          <Route path="/contact" element={<Suspense fallback={blank}><ContactPage /></Suspense>} />
          <Route path="/our-story" element={<Suspense fallback={blank}><Investors ready={ready} /></Suspense>} />
          <Route path="/brands/black-tears/cuba-libre" element={<Suspense fallback={blank}><CubaLibre /></Suspense>} />
          <Route path="/brands/giffard/range/:shelf" element={<Suspense fallback={blank}><GiffardRange /></Suspense>} />
          <Route path="/brands/:house/:product" element={<Suspense fallback={blank}><ProductPage /></Suspense>} />
          <Route path="/brands/:slug" element={<Suspense fallback={blank}><BrandRoute /></Suspense>} />
          <Route path="/cocktails" element={<Suspense fallback={blank}><Cocktails /></Suspense>} />
          <Route path="/events" element={<Suspense fallback={blank}><Events /></Suspense>} />
          <Route path="/portfolio" element={<Suspense fallback={blank}><Portfolio /></Suspense>} />
          <Route path="/trade" element={<Navigate to="/trade/bars-venues" replace />} />
          <Route path="/trade/:segment" element={<Suspense fallback={blank}><TradePage /></Suspense>} />
          <Route path="/investors" element={<Suspense fallback={blank}><InvestorsPage ready={ready} /></Suspense>} />
          <Route path="*" element={<Home ready={ready} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
