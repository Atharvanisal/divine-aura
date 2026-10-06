import React, { useState, useEffect } from 'react';
import { GraduationCap, CheckCircle2, ArrowRight, Award, ZoomIn, X } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import HeroSection from '../components/HeroSection';
import SectionContainer from '../components/SectionContainer';
import Button from '../components/Button';
import { BRAND, ACADEMY_COURSE, ACADEMY_BENEFITS, ACADEMY_CERTIFICATIONS } from '../data/siteData';

export default function Academy() {
  const [activeCert, setActiveCert] = useState(null);

  useEffect(() => {
    if (activeCert) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setActiveCert(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeCert]);

  return (
    <div className="animate-fadeIn">

      {/* 1. HERO SECTION */}
      <HeroSection
        visual={
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[#F3ECE1] aspect-[4/3] w-full">
              <img
                src="/assets/academy_hero_editorial.jpg"
                alt={`${BRAND.name} Academy training studio and learning stations`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-xs sm:text-sm font-medium">
                  Modern training studio & learning stations at Divine Aura Academy
                </p>
              </div>
            </div>
          </div>
        }
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE]">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Learn • Practice • Build Your Future</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-5.5xl text-espresso font-normal leading-[1.15]">
          {BRAND.name} Academy
        </h1>

        <p className="text-base sm:text-lg text-warmBrown-600 font-light leading-relaxed max-w-xl">
          Join our professional beauty academy and gain hands-on training from experienced practitioners. We offer dedicated learning programs to help you develop authentic craft in the beauty and wellness industry.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 w-full sm:w-auto">
          <Button
            to={`/contact?service=Academy%3A+${encodeURIComponent(ACADEMY_COURSE.title)}`}
            size="lg"
            className="w-full sm:w-auto"
          >
            <span>Enquire About Course</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <a
            href="#course-section"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9E7A38] hover:text-[#856529] px-4 py-2 transition-colors"
          >
            <span>View Syllabus</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Learning Highlights */}
        <div className="pt-6 border-t border-[#EAE0D5] grid grid-cols-3 gap-4 text-center lg:text-left w-full">
          <div>
            <p className="font-serif text-xl sm:text-2xl text-espresso font-normal">Hands-On</p>
            <p className="text-xs text-warmBrown-500 font-light mt-0.5">Live practical work</p>
          </div>
          <div>
            <p className="font-serif text-xl sm:text-2xl text-espresso font-normal">Mentorship</p>
            <p className="text-xs text-warmBrown-500 font-light mt-0.5">Direct guidance</p>
          </div>
          <div>
            <p className="font-serif text-xl sm:text-2xl text-espresso font-normal">Modern</p>
            <p className="text-xs text-warmBrown-500 font-light mt-0.5">Equipped studio</p>
          </div>
        </div>
      </HeroSection>

      {/* 2. CONFIRMED ACADEMY COURSE & 12-POINT SYLLABUS */}
      <section id="course-section" className="py-12 sm:py-16 lg:py-20 bg-white">
        <SectionContainer>
          <SectionHeading
            badge="Official Program"
            title={ACADEMY_COURSE.title}
            subtitle={ACADEMY_COURSE.description}
          />

          {/* Dedicated Course Card & 12-Point Numbered Syllabus */}
          <div className="max-w-5xl mx-auto bg-[#FAF6F0] rounded-3xl p-6 sm:p-10 border border-[#EAE0D5] shadow-luxury">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EAE0D5] gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#9E7A38]">
                  Curriculum & Training Modules
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-espresso mt-1">
                  12-Point Course Syllabus
                </h3>
              </div>
              <Button
                to={`/contact?service=Academy%3A+${encodeURIComponent(ACADEMY_COURSE.title)}`}
                size="md"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* 12-Point Syllabus Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
              {ACADEMY_COURSE.syllabus.map((point, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#EAE0D5]/80 hover:border-[#9E7A38]/40 hover:shadow-sm transition-all group"
                >
                  <span className="w-8 h-8 rounded-full bg-[#FAF3E8] border border-[#E5D7BE] text-[#9E7A38] text-xs font-semibold flex items-center justify-center shrink-0 group-hover:bg-[#9E7A38] group-hover:text-white transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[15px] font-medium text-espresso leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* 3. WHY CHOOSE OUR ACADEMY & ACADEMY MOMENTS GRID */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF6F0] border-t border-[#EAE0D5]/70">
        <SectionContainer>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Why Choose Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE]">
                <Award className="w-3.5 h-3.5" />
                <span>Training Standards</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
                Why Choose Our Academy?
              </h2>

              <p className="text-sm sm:text-base text-warmBrown-600 font-light leading-relaxed">
                We believe in learning through doing. Our academy provides an encouraging and professional atmosphere where you practice under individual mentor attention.
              </p>

              <div className="space-y-3.5 pt-2">
                {ACADEMY_BENEFITS.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#EAE0D5]">
                    <div className="w-6 h-6 rounded-full bg-[#FAF3E8] border border-[#E5D7BE] flex items-center justify-center shrink-0 text-[#9E7A38]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-[15px] sm:text-base text-espresso font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button to="/contact?service=Academy%3A+General+Course+Enquiry" size="md">
                  <span>Inquire for Upcoming Batches</span>
                </Button>
              </div>
            </div>

            {/* Academy Moments Certification Gallery */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#EAE0D5] shadow-card space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-[#F2EAE0]">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-normal">
                    Academy Moments
                  </h3>
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#9E7A38] mt-1">
                    Learning today, leading tomorrow.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#9E7A38] shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>

              {/* Responsive Gallery Grid of Actual Uploaded Certification & Group Images */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-4.5">
                {ACADEMY_CERTIFICATIONS.map((item, index) => (
                  <div
                    key={item.id || index}
                    onClick={() => setActiveCert(item)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#FAF6F0] border border-[#EAE0D5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#F3ECE1]">
                      <img
                        src={item.src}
                        alt={item.alt || `Divine Aura Academy Moment ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        loading="lazy"
                      />
                      {/* Subtle hover overlay with view badge */}
                      <div className="absolute inset-0 bg-espresso/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-espresso text-xs font-semibold shadow-lg backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <ZoomIn className="w-3.5 h-3.5 text-[#9E7A38]" />
                          <span>View Photo</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </SectionContainer>
      </section>

      {/* 4. READY TO START YOUR JOURNEY BANNER */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF6F0] relative overflow-hidden">
        <SectionContainer>
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#EAE0D5] text-center p-8 sm:p-14 lg:p-20 bg-[#1E1712]">
            {/* Full-Cover Editorial Academy Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out hover:scale-105"
              style={{ backgroundImage: "url('/assets/cta_academy_bg.jpg')" }}
              role="img"
              aria-label="Divine Aura beauty academy training studio"
            />

            {/* Elegant Educational Luxury Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1E1712]/55 via-[#1E1712]/45 to-[#1E1712]/65 pointer-events-none" />
            <div className="absolute inset-0 bg-[#241B14]/25 backdrop-blur-[1.5px] pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(30, 23, 18, 0.45) 0%, rgba(30, 23, 18, 0.25) 55%, rgba(30, 23, 18, 0.65) 100%)'
              }}
            />

            {/* Subtle Ambient Golden Glow Accents */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#E5C787]/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-[#9E7A38]/20 blur-3xl pointer-events-none" />

            {/* Foreground CTA Content */}
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#F8E7C8] bg-black/35 backdrop-blur-md border border-white/20 mb-6 shadow-sm">
                <GraduationCap className="w-3.5 h-3.5 text-[#E6C687]" />
                <span>Divine Aura Academy</span>
              </div>

              {/* Main Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.2] text-white tracking-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                Ready to Start Your Journey?
              </h2>

              {/* Description Subtitle */}
              <p className="text-white/95 text-[15px] sm:text-base lg:text-lg leading-relaxed font-light mb-8 sm:mb-10 max-w-xl mx-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
                Enquire now and take the first step towards building hands-on skill and confidence in beauty and wellness.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Button
                  to={`/contact?service=Academy%3A+${encodeURIComponent(ACADEMY_COURSE.title)}`}
                  variant="light"
                  size="lg"
                  className="w-full sm:w-auto font-semibold !text-[#75561E] hover:!bg-[#FAF6F0] shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-[#9E7A38]" />
                </Button>
                <Button
                  to="/contact"
                  variant="outlineWhite"
                  size="lg"
                  className="w-full sm:w-auto font-medium border-white/60 text-white hover:bg-white/15 backdrop-blur-sm shadow-md"
                >
                  <span>Visit Campus & Studio</span>
                </Button>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Certification Image Lightbox Modal */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setActiveCert(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveCert(null)}
            className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Full-view image container */}
          <div
            className="max-w-2xl max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeCert.src}
              alt={activeCert.alt}
              className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl"
            />
            {activeCert.title && (
              <div className="mt-3 text-center">
                <p className="text-white text-sm sm:text-base font-medium">
                  {activeCert.title}
                </p>
                {activeCert.subtitle && (
                  <p className="text-[#E5D7BE] text-xs uppercase tracking-widest mt-0.5">
                    {activeCert.subtitle}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

