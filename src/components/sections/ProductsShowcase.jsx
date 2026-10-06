import React, { useRef, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import SectionContainer from '../SectionContainer';

/**
 * Curated Beauty Products Showcase
 * Features continuous automatic infinite horizontal scrolling (right to left),
 * pause on hover, native touch/swipe support on mobile, and zero manual buttons.
 * Uses the proven infinite-loop architecture matching the Client Voices carousel.
 */
export const PRODUCTS_DATA = [
  {
    id: 'hair-care',
    category: 'Hair Care',
    name: 'Nourishing Hair Care',
    description: 'Gentle formulas designed to cleanse, condition, and restore silky softness.',
    image: '/assets/product_hair_care.jpg',
    alt: 'Luxury hair care editorial bottle'
  },
  {
    id: 'skin-care',
    category: 'Skin Care',
    name: 'Radiance Skin Therapy',
    description: 'Rejuvenating moisturizers and facial therapies crafted to nourish and refresh.',
    image: '/assets/product_skin_care.jpg',
    alt: 'Luxury skincare therapy jar and serum'
  },
  {
    id: 'face-beauty',
    category: 'Face & Beauty Care',
    name: 'Clarifying Face Care',
    description: 'Refreshing botanical mists and gentle balancing treatments for a clean glow.',
    image: '/assets/product_face_care.jpg',
    alt: 'Luxury clarifying facial mist bottle'
  },
  {
    id: 'body-care',
    category: 'Body Care',
    name: 'Gentle Body Care',
    description: 'Smoothing lotions and soothing balms designed for deep comfort and relaxation.',
    image: '/assets/product_body_care.jpg',
    alt: 'Luxury body lotion and balm containers'
  },
  {
    id: 'professional-essentials',
    category: 'Professional Essentials',
    name: 'Salon Care Elixirs',
    description: 'Concentrated care elixirs formulated to protect, enhance shine, and seal in beauty.',
    image: '/assets/product_pro_essentials.jpg',
    alt: 'Luxury professional salon elixir bottle'
  }
];

export default function ProductsShowcase({
  products = PRODUCTS_DATA,
  eyebrow = "Curated Essentials",
  title = "Beauty Products We Love",
  description = "Thoughtfully selected beauty essentials designed to complement your salon care and everyday beauty routine.",
  className = ""
}) {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const touchTimeoutRef = useRef(null);

  // Duplicate product items to create a seamless infinite loop track
  const duplicatedProducts = [...products, ...products];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Respect user accessibility preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    const speed = 0.55; // Silky smooth, gentle editorial drift

    const step = () => {
      if (!isHovered && !isTouching && container) {
        container.scrollLeft += speed;

        // When scrolled past half the track (first full set), reset seamlessly
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft -= container.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isTouching]);

  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    };
  }, []);

  const handleTouchStart = () => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    setIsTouching(true);
  };

  const handleTouchEnd = () => {
    // Resume auto-scroll 2.5 seconds after user finishes touch swipe on mobile
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(() => {
      setIsTouching(false);
    }, 2500);
  };

  return (
    <section className={`py-12 sm:py-16 lg:py-20 bg-white border-y border-[#EAE0D5]/70 relative overflow-hidden ${className}`}>
      <SectionContainer>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{eyebrow}</span>
            </div>
          )}
          {title && (
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-[15px] sm:text-base lg:text-lg text-warmBrown-600 font-light leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Infinite Carousel Track Container */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Soft Left & Right Fade Masks for editorial elegance */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 lg:w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 lg:w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Scrolling Flex Track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-4 cursor-grab active:cursor-grabbing"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {duplicatedProducts.map((product, idx) => (
              <div
                key={`${product.id}-${idx}`}
                data-card="product"
                className="w-[76vw] max-w-[280px] sm:w-[300px] lg:w-[320px] shrink-0 bg-[#FAF6F0] rounded-3xl p-5 sm:p-6 border border-[#EAE0D5] shadow-card hover:shadow-luxury transition-all duration-300 flex flex-col justify-between select-none group"
              >
                <div>
                  {/* 1. Product Image */}
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#F3ECE1] mb-5 relative">
                    <img
                      src={product.image}
                      alt={product.alt || product.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                      loading="lazy"
                    />
                  </div>

                  {/* 2. Product Category / Label */}
                  <div className="mb-2.5">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#856529] bg-white border border-[#EAE0D5] shadow-2xs">
                      {product.category}
                    </span>
                  </div>

                  {/* 3. Product Name */}
                  <h3 className="font-serif text-lg sm:text-xl text-espresso font-normal leading-snug mb-2">
                    {product.name}
                  </h3>

                  {/* 4. Short Description */}
                  <p className="text-sm sm:text-[15px] text-warmBrown-600 font-light leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-5 pt-4 border-t border-[#EAE0D5]/70 flex items-center justify-between text-xs text-warmBrown-500 font-light">
                  <span>Care Collection</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#9E7A38]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
