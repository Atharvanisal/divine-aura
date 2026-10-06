import React from 'react';
import { Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  const { quote, author, source, role } = testimonial;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-[#EAE0D5] shadow-card hover:shadow-luxury transition-all duration-300 relative flex flex-col justify-between">
      <div className="text-[#9E7A38]/30 mb-4">
        <Quote className="w-8 h-8 sm:w-9 sm:h-9 rotate-180" />
      </div>

      <p className="font-serif text-[15px] sm:text-base lg:text-[17px] text-espresso/90 leading-relaxed italic">
        "{quote}"
      </p>

      <div className="mt-8 pt-5 border-t border-[#F2EAE0] flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-espresso text-sm sm:text-base">
            {author}
          </h4>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E7A38]"></span>
            <p className="text-xs text-[#9E7A38] font-medium tracking-wide">
              {source || role || 'Google Review'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
