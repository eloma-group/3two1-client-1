import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import Splash from './components/Splash';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './sections/Footer';
import Home from './pages/Home';
import ContactPage from './pages/ContactPage';
import Investors from './pages/Investors';
import ScrollToTop from './components/ScrollToTop';

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
          <Route path="/investors" element={<Investors />} />
          <Route path="*" element={<Home ready={ready} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
