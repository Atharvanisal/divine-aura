import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Academy from './pages/Academy';
import Contact from './pages/Contact';

// Scroll to top and update document title on every navigation
function NavigationHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const titles = {
      '/': 'Divine Aura | Beauty & Academy',
      '/about': 'About Divine Aura',
      '/services': 'Divine Aura | Beauty Services',
      '/academy': 'Divine Aura Academy',
      '/contact': 'Contact Divine Aura',
    };

    document.title = titles[pathname] || 'Divine Aura | Beauty & Academy';
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-espresso font-sans">
      <NavigationHandler />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
