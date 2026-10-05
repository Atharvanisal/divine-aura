import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import Button from './Button';
import SectionContainer from './SectionContainer';

export default function CTASection({
  title = "Your Beauty Journey Starts Here",
  subtitle = "Book your appointment today and let us help you glow with confidence, relaxation, and tailored care.",
  buttonText = "Book an Appointment",
  buttonLink = "/contact"
}) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF6F0] relative overflow-hidden">
      <SectionContainer>
        <div className="relative rounded-3xl bg-gradient-to-r from-[#8E6C2D] via-[#A8833C] to-[#8E6C2D] text-white p-7 sm:p-12 lg:p-16 text-center shadow-2xl overflow-hidden">
          
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[#F8E7C8] bg-white/15 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Divine Aura</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white mb-4">
              {title}
            </h2>

            <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed font-light mb-8 max-w-xl mx-auto">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                to={buttonLink}
                variant="light"
                size="lg"
                className="w-full sm:w-auto font-semibold !text-[#75561E] hover:!bg-[#FAF6F0]"
              >
                <Calendar className="w-4 h-4" />
                <span>{buttonText}</span>
              </Button>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
