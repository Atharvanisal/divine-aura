import React, { useState } from 'react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import HeroSection from '../components/HeroSection';
import SectionContainer from '../components/SectionContainer';
import Button from '../components/Button';
import { BRAND, SERVICES_DATA } from '../data/siteData';

export default function Services() {
  const [activeCardId, setActiveCardId] = useState(null);

  const handleCardToggle = (id) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };
  return (
    <div className="animate-fadeIn">

      {/* 1. HERO SECTION */}
      <HeroSection
        visual={
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
            {/* Subtle soft warm background glow */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#E8DCcb]/40 to-[#F4ECDC]/40 rounded-3xl -z-10 blur-sm" />

            {/* Main Hero Card */}
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[#F3ECE1] aspect-[4/3] w-full flex items-center justify-center">
              <img
                src="/assets/owner_services_hero.jpg"
                alt={`Founder and Stylist performing services at ${BRAND.name}`}
                className="h-full w-auto max-h-full object-contain drop-shadow-md select-none"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-3 -left-3 sm:bottom-4 sm:-left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-[#EAE0D5] shadow-lg flex items-center gap-2.5 sm:gap-3 z-10">
              <div className="w-8 h-8 rounded-full bg-[#F4ECDC] flex items-center justify-center text-[#9E7A38] shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-espresso">Personal Care</p>
                <p className="text-[11px] text-warmBrown-500">Personalized consultation before every therapy</p>
              </div>
            </div>
          </div>
        }
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personal Care. Professional Touch.</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-5.5xl text-espresso font-normal leading-[1.15]">
          Our Services
        </h1>

        <p className="text-base sm:text-lg text-warmBrown-600 font-light leading-relaxed max-w-xl">
          We offer a wide range of beauty and wellness services using premium products and advanced techniques to help you look and feel your best.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 w-full sm:w-auto">
          <Button to="/contact" size="lg" className="w-full sm:w-auto">
            <Calendar className="w-4 h-4" />
            <span>Book an Appointment</span>
          </Button>
          <a
            href="#services-menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E7A38] hover:text-[#856529] px-4 py-2 transition-colors"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </HeroSection>

      {/* 2. CONFIRMED SERVICES MENU */}
      <section id="services-menu" className="py-12 sm:py-16 lg:py-20 bg-white">
        <SectionContainer>
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Salon Services</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
              Services Menu
            </h2>
            <p className="mt-3 text-sm sm:text-base text-warmBrown-600 font-light">
              Explore our confirmed beauty treatments, designed with personal care and hygienic perfection.
            </p>
          </div>

          {/* Service Cards Modular Grid - 5 Confirmed Services */}
          <div className="flex flex-wrap justify-center gap-8 items-start">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] max-w-md lg:max-w-none flex flex-col"
              >
                <ServiceCard
                  service={service}
                  isActive={activeCardId === service.id}
                  onToggle={() => handleCardToggle(service.id)}
                />
              </div>
            ))}
          </div>

          {/* Note on customization */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#FAF6F0] border border-[#EAE0D5] text-center max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm text-warmBrown-600 leading-relaxed font-light">
              Looking for a custom beauty package or specific hair/skin concern? Our certified experts provide individual consultations to recommend the most suitable care.
            </p>
            <div className="mt-4">
              <Button to="/contact" variant="secondary" size="sm">
                <span>Inquire With Our Specialists</span>
              </Button>
            </div>
          </div>

        </SectionContainer>
      </section>

      {/* 3. BOOK APPOINTMENT BANNER */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-[#EAE0D5]">
        <SectionContainer>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
              Book Your Appointment
            </h2>
            <p className="mt-3 text-base text-warmBrown-600 font-light">
              Let's create your perfect look. Reserve your personal care session today.
            </p>
            <div className="mt-8 flex justify-center">
              <Button to="/contact" size="lg">
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </Button>
            </div>
          </div>
        </SectionContainer>
      </section>

    </div>
  );
}
