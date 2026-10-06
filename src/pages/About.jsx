import React from 'react';
import { Sparkles, CheckCircle2, Heart, Award, TrendingUp, Sun, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import HeroSection from '../components/HeroSection';
import SectionContainer from '../components/SectionContainer';
import Button from '../components/Button';
import { BRAND, PHILOSOPHY, WHY_CHOOSE_US, SPACE_PHOTOS } from '../data/siteData';

export default function About() {
  const philosophyIcons = [
    <Heart key="1" className="w-6 h-6 text-[#9E7A38]" />,
    <Award key="2" className="w-6 h-6 text-[#9E7A38]" />,
    <TrendingUp key="3" className="w-6 h-6 text-[#9E7A38]" />,
    <Sun key="4" className="w-6 h-6 text-[#9E7A38]" />
  ];

  return (
    <div className="animate-fadeIn">

      {/* 1. HERO HEADER */}
      <HeroSection
        visual={
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
            {/* Subtle soft warm background detail */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#E8DCcb]/40 to-[#F4ECDC]/40 rounded-3xl -z-10 blur-sm" />

            {/* Editorial Image Container */}
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[#F3ECE1] aspect-[4/3] w-full">
              <img
                src="/assets/about_hero_editorial.jpg"
                alt={`Graceful beauty studio atmosphere at ${BRAND.name}`}
                className="w-full h-full object-cover object-[center_20%]"
                loading="eager"
              />
            </div>
          </div>
        }
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-5.5xl text-espresso font-normal leading-[1.15]">
          About <span className="italic font-normal text-[#9E7A38]">{BRAND.name}</span>
        </h1>

        <p className="text-base sm:text-lg text-[#9E7A38] font-medium tracking-wide">
          More Than Just a Beauty Destination
        </p>

        {/* Subtle gold accent divider */}
        <div className="w-16 h-0.5 bg-[#9E7A38]/40 rounded-full" />

        <p className="text-base sm:text-lg text-warmBrown-600 font-light leading-relaxed max-w-xl">
          We offer cosmetic and personal care treatments to help clients improve their appearance and relax, while empowering aspiring beauty professionals through hands-on education.
        </p>
      </HeroSection>

      {/* 2. OUR STORY */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left: Owner Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[#F3ECE1] aspect-[3/4]">
                <img
                  src="/assets/owner_portrait.jpg"
                  alt={`Founder & Master Stylist at ${BRAND.name}`}
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>

            {/* Right: Story Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Heritage</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal leading-snug">
                Our Story
              </h2>

              <div className="space-y-4 text-warmBrown-700 text-sm sm:text-base leading-relaxed font-light text-left">
                <p>
                  Born from a passion for beauty, wellness and education, {BRAND.name} started as a dream to create a space where people can learn, grow and feel beautiful — inside and out.
                </p>
                <p>
                  Today, we are proud to offer expert services and professional training through our academy, delivering attentive personal care, hygiene, and modern aesthetic techniques.
                </p>
                <p>
                  Every client visit and every student lesson at {BRAND.name} is shaped by the belief that genuine confidence begins with personalized attention and thoughtful guidance.
                </p>
              </div>

              <div className="pt-2 flex justify-center lg:justify-start">
                <Button to="/contact" variant="primary">
                  <span>Visit Our Space</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

          </div>
        </SectionContainer>
      </section>

      {/* 3. OUR PHILOSOPHY */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF6F0] border-y border-[#EAE0D5]/70">
        <SectionContainer>
          <SectionHeading
            badge="Our Core Values"
            title="Our Philosophy"
            subtitle="The foundational principles that guide every cosmetic care service and academy curriculum at Divine Aura."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHILOSOPHY.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-7 border border-[#EAE0D5] shadow-card hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#E5D7BE] flex items-center justify-center mb-5">
                  {philosophyIcons[idx]}
                </div>
                <h3 className="font-serif text-xl text-espresso mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-warmBrown-600 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* 4. WHY CHOOSE DIVINE AURA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Checklist Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Divine Aura Standard</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
                Why Choose {BRAND.name}?
              </h2>

              <p className="text-sm sm:text-base text-warmBrown-600 font-light leading-relaxed">
                Whether you visit us for restorative personal care or wish to train your hands in modern beauty artistry, we commit to verified standards of hygiene, care, and attention.
              </p>

              <div className="space-y-3.5 pt-2">
                {WHY_CHOOSE_US.map((point, index) => (
                  <div key={index} className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF6F0] border border-[#EAE0D5]/60">
                    <div className="w-6 h-6 rounded-full bg-[#FAF3E8] border border-[#E5D7BE] flex items-center justify-center shrink-0 text-[#9E7A38]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-[15px] sm:text-base text-espresso font-medium">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Relaxing Treatment Photograph */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-[#FAF6F0] bg-[#F3ECE1] aspect-[4/3]">
                <img
                  src="/assets/about_facial_editorial.jpg"
                  alt="Relaxing facial and beauty treatment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white text-sm font-medium tracking-wide">
                    Personalized aesthetic care and peaceful relaxation
                  </p>
                </div>
              </div>
            </div>

          </div>
        </SectionContainer>
      </section>

      {/* 5. OUR SPACE */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF6F0] border-t border-[#EAE0D5]/70">
        <SectionContainer>
          <SectionHeading
            badge="Environment & Infrastructure"
            title="Our Space"
            subtitle="A glimpse of our salon, academy studio, and peaceful work environment."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPACE_PHOTOS.map((space) => (
              <div
                key={space.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE0D5] shadow-card flex flex-col justify-between hover:shadow-luxury transition-all duration-300"
              >
                <div>
                  <h4 className="font-serif text-lg sm:text-xl text-espresso mb-2">
                    {space.title}
                  </h4>
                  <p className="text-sm sm:text-[15px] text-warmBrown-600 font-light leading-relaxed">
                    {space.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

    </div>
  );
}
