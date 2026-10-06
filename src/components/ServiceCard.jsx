import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ServiceCard({ service, isActive = false, onToggle }) {
  const { title, tagline, supportingText, description, image, highlights = [] } = service;
  const subtitle = supportingText || tagline;

  return (
    <div
      onClick={onToggle}
      className={`group bg-white rounded-3xl overflow-hidden border border-[#EAE0D5]/80 transition-all duration-400 ease-out flex flex-col w-full cursor-pointer select-none sm:select-auto ${
        isActive
          ? 'shadow-[0_16px_36px_-8px_rgba(158,122,56,0.14)] -translate-y-1'
          : 'shadow-[0_4px_20px_-4px_rgba(74,62,54,0.05)] hover:shadow-[0_16px_36px_-8px_rgba(158,122,56,0.14)] hover:-translate-y-1'
      }`}
    >
      {/* Image container with rounded crop */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F3ECE1]">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isActive ? 'scale-105' : 'group-hover:scale-105'
          }`}
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-300 ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className={`font-serif text-xl sm:text-2xl transition-colors duration-300 ${
              isActive ? 'text-[#9E7A38]' : 'text-espresso group-hover:text-[#9E7A38]'
            }`}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs uppercase tracking-wider font-semibold text-[#9E7A38] mt-1.5">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="mt-3 text-sm leading-relaxed text-warmBrown-600 font-light">
              {description}
            </p>
          )}

          {/* Smooth Reveal: 4 Additional Information Lines */}
          {highlights && highlights.length > 0 && (
            <div
              className={`grid transition-all duration-400 ease-out ${
                isActive
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100'
              }`}
            >
              <div
                className={`overflow-hidden transition-transform duration-400 ease-out ${
                  isActive
                    ? 'translate-y-0'
                    : 'translate-y-2 group-hover:translate-y-0'
                }`}
              >
                <div className="pt-3.5 mt-3 border-t border-[#F2EAE0]">
                  <ul className="space-y-2 pb-1">
                    {highlights.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[13.5px] sm:text-sm text-warmBrown-600 font-light leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9E7A38]/70 shrink-0 mt-1.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-[#F2EAE0] flex items-center justify-between">
          <Link
            to={`/contact?service=${encodeURIComponent(title)}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#9E7A38] hover:text-[#856529] group/link transition-colors"
          >
            <span>Book Service</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
          
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isActive
                ? 'bg-[#9E7A38] text-white'
                : 'bg-[#FAF6F0] text-[#9E7A38] group-hover:bg-[#9E7A38] group-hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
