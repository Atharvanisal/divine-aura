import React, { useRef, useEffect, useState } from 'react';
import { Quote, Sparkles } from 'lucide-react';
import SectionContainer from '../SectionContainer';
import { TESTIMONIALS } from '../../data/siteData';

/**
 * Premium Horizontally Scrolling Testimonial Carousel
 * Features continuous auto-scrolling with infinite loop appearance,
 * pause on hover, and native touch/swipe support on mobile.
 */
export default function Testimonials({
  reviews = TESTIMONIALS,
  eyebrow = "Client Voices",
  title = "What Our Clients Say",
  subtitle = "Genuine experiences and feedback from clients who trust us with their beauty and learning.",
  className = ""
}) {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const touchTimeoutRef = useRef(null);

  // Duplicate reviews to create a seamless infinite loop track
  const duplicatedReviews = [...reviews, ...reviews];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId;
    const speed = 0.55; // Silky smooth, slow editorial drift

    const step = () => {
      if (!isHovered && !isTouching && container) {
        container.scrollLeft += speed;

        // When scrolled past half the track (first full set), reset to beginning seamlessly
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

  const handleTouchStart = () => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    setIsTouching(true);
  };

  const handleTouchEnd = () => {
    // Resume auto-scroll 2.5 seconds after user stops swiping on mobile
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(() => {
      setIsTouching(false);
    }, 2500);
  };

  return (
    <section className={`py-12 sm:py-16 lg:py-20 bg-[#FAF6F0] relative overflow-hidden ${className}`}>
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
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl text-espresso font-normal leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3.5 text-base sm:text-lg text-warmBrown-600 font-light leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </SectionContainer>

      {/* Infinite Carousel Track Container */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Soft Left & Right Fade Masks for editorial elegance */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-r from-[#FAF6F0] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-l from-[#FAF6F0] to-transparent z-10" />

        {/* Scrolling Flex Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-4 px-6 sm:px-10 lg:px-16 cursor-grab active:cursor-grabbing"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {duplicatedReviews.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              data-card="testimonial"
              className="w-[84vw] max-w-[340px] sm:w-[380px] lg:w-[420px] shrink-0 bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-[#EAE0D5] shadow-card hover:shadow-luxury transition-all duration-300 flex flex-col justify-between select-none"
            >
              <div>
                {/* Decorative Quotation Icon */}
                <div className="text-[#9E7A38]/30 mb-4">
                  <Quote className="w-8 h-8 sm:w-9 sm:h-9 rotate-180" />
                </div>

                {/* Review Text */}
                <p className="font-serif text-sm sm:text-base lg:text-[16.5px] text-espresso/90 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="mt-8 pt-5 border-t border-[#F2EAE0] flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-espresso text-sm sm:text-base">
                    {testimonial.author}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9E7A38]"></span>
                    <span className="text-xs text-[#9E7A38] font-medium tracking-wide">
                      {testimonial.source || "Google Review"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
