import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Reusable Reveal Animation Component for Divine Aura
 * 
 * Provides clearly noticeable, smooth, luxurious entrance animations:
 * - fade-up: vertical reveal (approx 48px desktop, 28px mobile)
 * - fade-up-subtle: soft upward reveal (approx 20px desktop, 14px mobile - great for badges)
 * - fade-down: downward reveal (approx 48px desktop, 28px mobile)
 * - fade-left: horizontal slide from right (approx 54px desktop, 28px mobile)
 * - fade-right: horizontal slide from left (approx 54px desktop, 28px mobile)
 * - fade-in: soft opacity fade-in
 * - withScale: smoothly scales from 0.96 to 1.0
 */
export default function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 1050,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  withScale = false,
  className = '',
  style = {},
  as: Component = 'div',
  ...props
}) {
  const [ref, isVisible] = useScrollReveal({ threshold, rootMargin });

  const getVariantClasses = () => {
    switch (variant) {
      case 'fade-up':
        return isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-7 sm:translate-y-[48px]';
      case 'fade-up-subtle':
        return isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-3 sm:translate-y-[20px]';
      case 'fade-down':
        return isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-7 sm:-translate-y-[48px]';
      case 'fade-left':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-7 sm:translate-x-[54px]';
      case 'fade-right':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-7 sm:-translate-x-[54px]';
      case 'fade-in':
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  const scaleClasses = withScale
    ? (isVisible ? ' scale-100' : ' scale-[0.96]')
    : '';

  const combinedStyle = {
    ...style,
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <Component
      ref={ref}
      style={combinedStyle}
      className={`reveal-base ${getVariantClasses()}${scaleClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
