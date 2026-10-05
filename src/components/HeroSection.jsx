import React from 'react';

/**
 * Standardized Hero Section Layout for Divine Aura
 * Enforces unified top/bottom spacing, container width, column grid, and responsive alignment across all pages.
 */
export default function HeroSection({
  children,
  visual,
  className = '',
  borderBottom = true,
}) {
  return (
    <section
      className={`relative overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 bg-[#FAF6F0] ${
        borderBottom ? 'border-b border-[#EAE0D5]/70' : ''
      } ${className}`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline & Information */}
          <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 lg:space-y-6">
            {children}
          </div>

          {/* Right Column: Visual Element */}
          <div className="w-full flex justify-center lg:justify-end">
            {visual}
          </div>
        </div>
      </div>
    </section>
  );
}
