import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import Splash from './components/Splash';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './sections/Footer';
import Home from './pages/Home';

export default function App() {
  useLenis();
  const [ready, setReady] = useState(false);

  const handleSplashDone = useCallback(() => setReady(true), []);

  useEffect(() => {
    document.title = '3two1 drinks — The Taste of Passion';
  }, []);

  return (
    <BrowserRouter>
      <Splash onDone={handleSplashDone} />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home ready={ready} />} />
          <Route path="*" element={<Home ready={ready} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
