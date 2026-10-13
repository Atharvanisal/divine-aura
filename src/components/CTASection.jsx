import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import Button from './Button';
import SectionContainer from './SectionContainer';
import Reveal from './Reveal';
import useScrollReveal from '../hooks/useScrollReveal';

export default function CTASection({
  title = "Your Beauty Journey Starts Here",
  subtitle = "Book your appointment today and let our certified team provide you with gentle care and relaxation.",
  buttonText = "Book an Appointment",
  buttonLink = "/contact"
}) {
  const [cardRef, isCardVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF6F0] relative overflow-hidden">
      <SectionContainer>
        <div
          ref={cardRef}
          className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#EAE0D5] text-center p-8 sm:p-14 lg:p-20 bg-[#231A12] group"
        >
          {/* Full-Cover Editorial Salon Background Image with subtle entrance scale 0.98 -> 1 */}
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1200ms] ease-out ${
              isCardVisible ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-90'
            }`}
            style={{ backgroundImage: "url('/assets/cta_salon_bg.jpg')" }}
            role="img"
            aria-label="Divine Aura luxury beauty studio interior"
          />

          {/* Elegant Restrained Luxury Overlay (Warm, Non-Dark) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C140E]/50 via-[#1C140E]/40 to-[#1C140E]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[#251A12]/20 backdrop-blur-[1.5px] pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(28, 20, 14, 0.45) 0%, rgba(28, 20, 14, 0.25) 55%, rgba(28, 20, 14, 0.6) 100%)'
            }}
          />

          {/* Subtle Ambient Golden Glow Accents */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#E5C787]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-[#C49C48]/15 blur-3xl pointer-events-none" />

          {/* Foreground CTA Content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            {/* Eyebrow Badge */}
            <Reveal variant="fade-up" duration={1000} delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#F8E7C8] bg-black/30 backdrop-blur-md border border-white/20 mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
                <span>Divine Aura</span>
              </div>
            </Reveal>

            {/* Main Heading */}
            <Reveal variant="fade-up" duration={1100} delay={160}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.2] text-white tracking-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                {title}
              </h2>
            </Reveal>

            {/* Description Subtitle */}
            <Reveal variant="fade-up" duration={1150} delay={320}>
              <p className="text-white/95 text-sm sm:text-base lg:text-lg leading-relaxed font-light mb-8 sm:mb-10 max-w-xl mx-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
                {subtitle}
              </p>
            </Reveal>

            {/* CTA Button */}
            <Reveal variant="fade-up" duration={950} delay={480}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Button
                  to={buttonLink}
                  variant="light"
                  size="lg"
                  className="w-full sm:w-auto font-semibold !text-[#75561E] hover:!bg-[#FAF6F0] shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 text-[#9E7A38]" />
                  <span>{buttonText}</span>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
