import { lazy, Suspense, useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import Splash from './components/Splash';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './sections/Footer';
import Home from './pages/Home';
import ContactPage from './pages/ContactPage';
import Investors from './pages/Investors';
import BrandRoute from './pages/brands/BrandRoute';
import ScrollToTop from './components/ScrollToTop';

// The newer routed pages load on demand, so the home page does not ship them.
const Cocktails = lazy(() => import('./pages/Cocktails'));
const Events = lazy(() => import('./pages/Events'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const TradePage = lazy(() => import('./pages/TradePage'));
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/our-story" element={<Investors ready={ready} />} />
          <Route path="/brands/:slug" element={<BrandRoute />} />
          <Route path="/cocktails" element={<Suspense fallback={blank}><Cocktails /></Suspense>} />
          <Route path="/events" element={<Suspense fallback={blank}><Events /></Suspense>} />
          <Route path="/portfolio" element={<Suspense fallback={blank}><Portfolio /></Suspense>} />
          <Route path="/trade" element={<Navigate to="/trade/bars-venues" replace />} />
          <Route path="/trade/:segment" element={<Suspense fallback={blank}><TradePage /></Suspense>} />
          <Route path="/investors" element={<Navigate to="/our-story" replace />} />
          <Route path="*" element={<Home ready={ready} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
