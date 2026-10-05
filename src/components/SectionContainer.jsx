import React from 'react';

/**
 * Standardized Section Container for Divine Aura
 * Enforces unified max-width and responsive horizontal padding across sections,
 * matching the master layout defined by HeroSection.
 */
export default function SectionContainer({ children, className = '' }) {
  return (
    <div className={`w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
