import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, GraduationCap, Heart } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import SectionContainer from '../components/SectionContainer';
import VideoShowcase from '../components/sections/VideoShowcase';
import Testimonials from '../components/sections/Testimonials';
import ProductsShowcase from '../components/sections/ProductsShowcase';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import { BRAND, HIGHLIGHTS } from '../data/siteData';

const SIGNATURE_SERVICES = [
  {
    id: 'hair',
    title: 'Hair & Styling',
    description: 'Precision cuts, bespoke coloring, and restorative hair rituals.',
    image: '/assets/service_hair_editorial.jpg',
    alt: 'Hair and styling at Divine Aura'
  },
  {
    id: 'makeup',
    title: 'Makeup & Beauty',
    description: 'Bridal, occasion, and bespoke beauty to enhance your natural glow.',
    image: '/assets/service_makeup_editorial.jpg',
    alt: 'Makeup and beauty at Divine Aura'
  },
  {
    id: 'skin',
    title: 'Skin & Care',
    description: 'Nourishing facials, gentle clean-up, and attentive skin therapies.',
    image: '/assets/service_skin_editorial.jpg',
    alt: 'Skin and personal care at Divine Aura'
  },
  {
    id: 'waxing',
    title: 'Body Waxing',
    description: 'Hygienic and gentle waxing care delivered in a private, comfortable setting.',
    image: '/assets/service_waxing_editorial.jpg',
    alt: 'Body waxing at Divine Aura'
  },
  {
    id: 'detan',
    title: 'De-Tan & Clean-Up',
    description: 'Gentle exfoliation and clarifying therapies designed for a clean, radiant complexion.',
    image: '/assets/service_detan_editorial.jpg',
    alt: 'De-Tan and clean-up at Divine Aura'
  }
];

export default function Home() {
  // Highlights icons mapping
  const highlightIcons = [
    <Sparkles key="1" className="w-6 h-6 text-[#9E7A38]" />,
    <GraduationCap key="2" className="w-6 h-6 text-[#9E7A38]" />,
    <Heart key="3" className="w-6 h-6 text-[#9E7A38]" />
  ];

  return (
    <div className="animate-fadeIn">
      
      {/* 1. HERO SECTION */}
      <HeroSection
        borderBottom={false}
        visual={
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
            {/* Decorative background glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#E8DCcb] via-[#F4ECDC] to-[#DACAB2] rounded-3xl transform rotate-2 blur-sm opacity-70" />
            
            {/* Hero Image Container */}
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[#F3ECE1] aspect-[4/3] w-full">
              <img
                src="/assets/owner_home_hero.jpg"
                alt={`Founder & Master Stylist of ${BRAND.name}`}
                className="w-full h-full object-cover object-[52%_44%]"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-3 -left-3 sm:bottom-4 sm:-left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-[#EAE0D5] shadow-lg flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F4ECDC] flex items-center justify-center text-[#9E7A38]">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-espresso">Personal Care</p>
                <p className="text-xs text-warmBrown-500">Tailored to your glow</p>
              </div>
            </div>
          </div>
        }
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{BRAND.tagline}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-5.5xl text-espresso font-normal leading-[1.12]">
          Enhance Your <br />
          <span className="italic font-normal text-[#9E7A38]">Natural Beauty</span>
        </h1>

        <p className="text-base sm:text-lg text-warmBrown-600 leading-relaxed font-light max-w-xl">
          A refined beauty experience designed around you. From expert styling to thoughtful skin and beauty care, Divine Aura blends modern techniques with a calm, elegant touch to help you look and feel your best.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 w-full sm:w-auto">
          <Button to="/contact" size="lg" className="w-full sm:w-auto shadow-md">
            <span>Book an Appointment</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button to="/services" variant="secondary" size="lg" className="w-full sm:w-auto">
            <span>Explore Services</span>
          </Button>
        </div>

        {/* Quick trust metrics */}
        <div className="pt-6 border-t border-[#EAE0D5] flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-warmBrown-600 w-full">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9E7A38]"></span>
            <span>Certified Care</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9E7A38]"></span>
            <span>Hygienic Space</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9E7A38]"></span>
            <span>Hands-on Academy</span>
          </div>
        </div>
      </HeroSection>

      {/* 2. BRAND / FEATURE HIGHLIGHTS */}
      <section className="py-10 sm:py-12 lg:py-14 bg-white border-y border-[#EAE0D5]/70">
        <SectionContainer>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {HIGHLIGHTS.map((item, idx) => (
              <div
                key={item.id}
                className="text-center p-4 sm:p-5 rounded-2xl hover:bg-[#FAF6F0] transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAF6F0] group-hover:bg-[#F4ECDC] flex items-center justify-center mx-auto mb-3.5 transition-colors border border-[#EAE0D5]/60">
                  {highlightIcons[idx]}
                </div>
                <h3 className="font-serif text-base sm:text-lg text-espresso font-medium">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm sm:text-[15px] text-warmBrown-500 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* 3. SIGNATURE SERVICES PREVIEW */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF6F0]">
        <SectionContainer>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Care</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
              Our Signature Services
            </h2>
            <p className="mt-3 text-[15px] sm:text-base lg:text-lg text-warmBrown-600 font-light leading-relaxed">
              Thoughtfully designed beauty services, tailored to your personal style and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 sm:gap-8 lg:gap-8 items-stretch">
            {SIGNATURE_SERVICES.map((service, index) => (
              <div
                key={service.id}
                className={`bg-white rounded-3xl p-4 sm:p-5 border border-[#EAE0D5] shadow-card flex flex-col justify-between col-span-1 md:col-span-2 ${
                  index === 3 ? 'md:col-start-2' : ''
                }`}
              >
                <div>
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#F3ECE1] mb-5">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-espresso font-normal">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-[15px] text-warmBrown-600 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[#EAE0D5]/60">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#9E7A38] hover:text-[#856529] transition-colors group/link"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* 4. VIDEO SHOWCASE */}
      <VideoShowcase />

      {/* 5. ACADEMY PREVIEW */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-y border-[#EAE0D5]/70">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Academy Content */}
            <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 lg:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE]">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Divine Aura Academy</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl text-espresso font-normal leading-tight">
                Learn. Create. Transform.
              </h2>

              <p className="text-base sm:text-lg text-warmBrown-600 font-light leading-relaxed max-w-xl">
                Build your beauty skills with hands-on learning and professional guidance at Divine Aura Academy.
              </p>

              <div className="pt-2 flex justify-center lg:justify-start">
                <Link
                  to="/academy"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium bg-[#9E7A38] hover:bg-[#856529] text-white shadow-sm hover:shadow transition-all duration-300 active:scale-95 group/btn"
                >
                  <span>Explore Academy</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: Academy Editorial Visual */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#E8DCcb]/40 to-[#F4ECDC]/40 rounded-3xl -z-10 blur-sm" />
                <div className="relative rounded-3xl overflow-hidden border border-[#EAE0D5] shadow-md bg-[#F3ECE1] aspect-[4/3]">
                  <img
                    src="/assets/academy_hero_editorial.jpg"
                    alt={`${BRAND.name} Academy studio learning environment`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

          </div>
        </SectionContainer>
      </section>

      {/* 6. TESTIMONIALS */}
      <Testimonials />

      {/* 7. CURATED BEAUTY PRODUCTS SHOWCASE */}
      <ProductsShowcase />

      {/* 8. FINAL CTA */}
      <CTASection
        title="Your Beauty Journey Starts Here"
        subtitle="Book your appointment today and let our certified team provide you with gentle care and relaxation."
        buttonText="Book an Appointment"
        buttonLink="/contact"
      />

    </div>
  );
}
