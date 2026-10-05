import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className = '',
  light = false
}) {
  return (
    <div className={`mb-12 ${centered ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC]/70 border border-[#E5D7BE]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9E7A38]"></span>
          <span>{badge}</span>
        </div>
      )}
      
      {title && (
        <h2 className={`font-serif text-3xl sm:text-4xl lg:text-4.5xl leading-tight font-normal ${light ? 'text-white' : 'text-espresso'}`}>
          {title}
        </h2>
      )}

      {subtitle && (
        <p className={`mt-3.5 text-base sm:text-lg leading-relaxed font-light ${light ? 'text-white/80' : 'text-warmBrown-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
