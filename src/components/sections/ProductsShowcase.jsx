import React, { useRef, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import SectionContainer from '../SectionContainer';
import Reveal from '../Reveal';

/**
 * Premium Brands Showcase
 * Features continuous automatic infinite horizontal scrolling (right to left),
 * pause on hover, native touch/swipe support on mobile, and zero manual buttons.
 * Displays only authentic product branding visuals for globally recognized care brands.
 */
export const BRANDS_DATA = [
  {
    id: 'lotus-professional',
    name: 'Lotus Professional',
    image: '/assets/brands/lotus_professional.jpg',
    alt: 'Lotus Professional'
  },
  {
    id: 'rica-made-in-italy',
    name: 'RICA Made in Italy',
    image: '/assets/brands/rica_made_in_italy.png',
    alt: 'RICA Made in Italy'
  },
  {
    id: 'loreal-professionnel-paris',
    name: "L'Oréal Professionnel Paris",
    image: '/assets/brands/loreal_professionnel.png',
    alt: "L'Oréal Professionnel Paris"
  },
  {
    id: 'kryolan',
    name: 'Kryolan',
    image: '/assets/brands/kryolan.jpg',
    alt: 'Kryolan'
  },
  {
    id: 'huda-beauty',
    name: 'Huda Beauty',
    image: '/assets/brands/huda_beauty.webp',
    alt: 'Huda Beauty'
  },
  {
    id: 'nars',
    name: 'NARS',
    image: '/assets/brands/nars.jpg',
    alt: 'NARS'
  },
  {
    id: 'la-girl',
    name: 'L.A. Girl',
    image: '/assets/brands/la_girl.jpg',
    alt: 'L.A. Girl'
  },
  {
    id: 'elf-cosmetics',
    name: 'e.l.f. Cosmetics',
    image: '/assets/brands/elf_cosmetics.png',
    alt: 'e.l.f. Cosmetics'
  },
  {
    id: 'mac-cosmetics',
    name: 'M·A·C Cosmetics',
    image: '/assets/brands/mac_cosmetics.png',
    alt: 'M·A·C Cosmetics'
  },
  {
    id: 'forever52',
    name: 'Forever52',
    image: '/assets/brands/forever52.png',
    alt: 'Forever52'
  }
];

// Retain alias for backwards compatibility
export const PRODUCTS_DATA = BRANDS_DATA;

export default function ProductsShowcase({
  brands = BRANDS_DATA,
  eyebrow = "Premium Brands",
  title = "Premium Brands for Premium Care",
  description = "We use globally recognized brands to ensure the best results for your skin and hair.",
  className = ""
}) {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const touchTimeoutRef = useRef(null);

  // Duplicate brand items to create a seamless infinite loop track
  const duplicatedBrands = [...brands, ...brands];

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
            <Reveal variant="fade-up" duration={1050} delay={0}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{eyebrow}</span>
              </div>
            </Reveal>
          )}
          {title && (
            <Reveal variant="fade-up" duration={1100} delay={160}>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
                {title}
              </h2>
            </Reveal>
          )}
          {description && (
            <Reveal variant="fade-up" duration={1100} delay={320}>
              <p className="mt-3 text-[15px] sm:text-base lg:text-lg text-warmBrown-600 font-light leading-relaxed">
                {description}
              </p>
            </Reveal>
          )}
        </div>

        {/* Infinite Carousel Track Container */}
        <Reveal variant="fade-up" duration={1050} delay={180}>
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
              {duplicatedBrands.map((brand, idx) => (
                <div
                  key={`${brand.id}-${idx}`}
                  data-card="brand"
                  className="w-[72vw] max-w-[280px] sm:w-[300px] lg:w-[320px] shrink-0 bg-[#FAF6F0] rounded-3xl p-5 sm:p-6 border border-[#EAE0D5] shadow-card hover:shadow-luxury transition-all duration-300 flex flex-col items-center select-none group"
                >
                  {/* 1. Original Branded Product Image */}
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#EAE0D5]/70 flex items-center justify-center p-3 sm:p-4 relative shadow-2xs">
                    <img
                      src={brand.image}
                      alt={brand.alt || brand.name}
                      className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] select-none"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>

                  {/* 2. Brand Name */}
                  <h3 className="mt-4 sm:mt-5 font-serif text-base sm:text-lg font-medium text-espresso text-center tracking-wide leading-snug">
                    {brand.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}
