import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { BRAND } from '../data/siteData';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle sticky header background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Academy', path: '/academy' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF6F0]/95 backdrop-blur-md shadow-sm border-b border-[#EAE0D5]/70 py-2 sm:py-2.5'
          : 'bg-[#FAF6F0] py-2.5 sm:py-3 border-b border-[#EAE0D5]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <img
              src={BRAND.logo}
              alt={BRAND.name}
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-full text-[15px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[#9E7A38] bg-[#F4ECDC] font-semibold'
                      : 'text-warmBrown-700 hover:text-[#9E7A38] hover:bg-[#F7F1E6]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-[#9E7A38] hover:bg-[#856529] text-white shadow-sm hover:shadow transition-all duration-300 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-warmBrown-800 hover:bg-[#F2EAE0] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-[#EAE0D5] bg-[#FAF6F0] shadow-xl animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F2EAE0] text-[#9E7A38] font-semibold'
                      : 'text-warmBrown-800 hover:bg-[#F7F1E6]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-3 border-t border-[#EAE0D5] mt-2">
              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[#9E7A38] text-white shadow active:scale-95 transition-all text-center"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>

              <div className="mt-4 pt-3 border-t border-[#EAE0D5]/60 flex items-center justify-center gap-2 text-xs text-warmBrown-600">
                <Phone className="w-3.5 h-3.5 text-[#9E7A38]" />
                <a href={`tel:${BRAND.phoneRaw}`} className="hover:text-[#9E7A38]">
                  {BRAND.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
