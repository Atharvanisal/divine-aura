import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { BRAND } from '../data/siteData';

export default function Footer() {

  return (
    <footer className="bg-[#FAF6F0] border-t border-[#EAE0D5] text-warmBrown-800 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#EAE0D5]/70">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block group focus:outline-none">
              <img
                src={BRAND.logo}
                alt={BRAND.name}
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm leading-relaxed text-warmBrown-600 font-light pr-4">
              We offer cosmetic and personal care treatments to help clients improve their appearance and relax.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/divine_aura_makeup_?stkn=dDh1aHVtNTBiMHVq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Divine Aura Instagram Profile"
                className="w-9 h-9 rounded-full bg-white border border-[#EAE0D5] flex items-center justify-center text-warmBrown-700 hover:text-[#9E7A38] hover:border-[#9E7A38] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white border border-[#EAE0D5] flex items-center justify-center text-warmBrown-400 cursor-default"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-warmBrown-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm leading-relaxed text-warmBrown-600">
              <li>
                <Link to="/" className="hover:text-[#9E7A38] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#9E7A38] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#9E7A38] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/academy" className="hover:text-[#9E7A38] transition-colors">
                  Academy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#9E7A38] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Academy Overview */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-warmBrown-900 mb-4">
              Services & Academy
            </h3>
            <div className="space-y-4">
              <div>
                <Link
                  to="/services"
                  className="inline-block text-xs font-semibold uppercase tracking-wider text-[#9E7A38] hover:text-[#856529] transition-colors mb-2 cursor-pointer"
                >
                  Salon Services
                </Link>
                <ul className="space-y-2 text-sm leading-relaxed text-warmBrown-600">
                  <li>
                    <Link
                      to="/services"
                      className="block hover:text-[#9E7A38] transition-colors cursor-pointer"
                    >
                      Hair Cut & Hairstyling
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="block hover:text-[#9E7A38] transition-colors cursor-pointer"
                    >
                      Bridal Makeup
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="block hover:text-[#9E7A38] transition-colors cursor-pointer"
                    >
                      Body Waxing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="block hover:text-[#9E7A38] transition-colors cursor-pointer"
                    >
                      Facial & Skin Care
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="block hover:text-[#9E7A38] transition-colors cursor-pointer"
                    >
                      De-Tan & Clean-Up
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  to="/academy"
                  className="inline-block text-xs font-semibold uppercase tracking-wider text-[#9E7A38] hover:text-[#856529] transition-colors mb-2 cursor-pointer"
                >
                  Academy
                </Link>
                <ul className="space-y-2 text-sm leading-relaxed text-warmBrown-600">
                  <li>
                    <Link
                      to="/academy"
                      className="block hover:text-[#9E7A38] transition-colors cursor-pointer"
                    >
                      Basic Beauty Parlour Course
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-warmBrown-900 mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed text-warmBrown-600">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#9E7A38] mt-0.5 shrink-0" />
                <a
                  href="tel:+917391035567"
                  className="hover:text-[#9E7A38] transition-colors font-medium"
                >
                  +91 7391035567
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#9E7A38] mt-0.5 shrink-0" />
                <span className="break-all font-medium">
                  nirmalasartistry@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9E7A38] mt-0.5 shrink-0" />
                <a
                  href="https://maps.app.goo.gl/7Ds4EFtieMifzTnv6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#9E7A38] transition-colors cursor-pointer"
                  title="Open Divine Aura location on Google Maps"
                >
                  {BRAND.address},<br />
                  {BRAND.city}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#9E7A38] mt-0.5 shrink-0" />
                <span>{BRAND.timings}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-warmBrown-500 gap-4">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="flex items-center gap-1 text-warmBrown-400">
            <span>Crafted for elegance & relaxation</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
