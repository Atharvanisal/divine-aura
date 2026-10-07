import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, Clock, Instagram, Heart } from 'lucide-react';
import AppointmentForm from '../components/AppointmentForm';
import HeroSection from '../components/HeroSection';
import SectionContainer from '../components/SectionContainer';
import { BRAND } from '../data/siteData';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  return (
    <div className="animate-fadeIn">

      {/* 1. HERO SECTION */}
      <HeroSection
        visual={
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[#F3ECE1] aspect-[4/3] w-full">
              <img
                src="/assets/contact_hero_editorial.jpg"
                alt="Spa and beauty wellness sanctuary ambience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        }
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#9E7A38] bg-[#F4ECDC] border border-[#E5D7BE]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>We're Here For You</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-5.5xl text-espresso font-normal leading-[1.15]">
          Get in Touch
        </h1>

        <p className="text-base sm:text-lg text-warmBrown-600 font-light leading-relaxed max-w-xl">
          Have a question, want to book an appointment or inquire about our academy? Fill out the form below and our team will get back to you soon.
        </p>
      </HeroSection>

      {/* 2. FORM & CONTACT DETAILS */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Appointment & Enquiry Form */}
            <div className="lg:col-span-7">
              <AppointmentForm initialService={initialService} />
            </div>

            {/* Right Column: Contact Details, Map & Timings */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Contact Card */}
              <div className="bg-[#FAF6F0] rounded-3xl p-7 sm:p-8 border border-[#EAE0D5] shadow-sm space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-espresso">
                    Our Contact Details
                  </h2>
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#9E7A38] mt-1">
                    Direct Assistance
                  </p>
                </div>

                <ul className="space-y-4 text-sm text-warmBrown-700">
                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white border border-[#E5D7BE] flex items-center justify-center shrink-0 text-[#9E7A38]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-warmBrown-500 uppercase tracking-wider">
                        Phone Number
                      </span>
                      <a
                        href={`tel:${BRAND.phoneRaw}`}
                        className="text-base font-medium text-espresso hover:text-[#9E7A38] transition-colors"
                      >
                        {BRAND.phone}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white border border-[#E5D7BE] flex items-center justify-center shrink-0 text-[#9E7A38]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-warmBrown-500 uppercase tracking-wider">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${BRAND.email}`}
                        className="text-base font-medium text-espresso hover:text-[#9E7A38] transition-colors break-all"
                      >
                        {BRAND.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-white border border-[#E5D7BE] flex items-center justify-center shrink-0 text-[#9E7A38]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-warmBrown-500 uppercase tracking-wider">
                        Studio & Salon Location
                      </span>
                      <a
                        href="https://maps.app.goo.gl/7Ds4EFtieMifzTnv6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-espresso hover:text-[#9E7A38] transition-colors leading-snug block"
                        title="Open Divine Aura location on Google Maps"
                      >
                        {BRAND.address},<br />
                        {BRAND.city}
                      </a>
                    </div>
                  </li>
                </ul>

                {/* Social Channels */}
                <div className="pt-4 border-t border-[#EAE0D5] flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-warmBrown-600">
                    Follow Us
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={BRAND.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white border border-[#EAE0D5] flex items-center justify-center text-warmBrown-700 hover:text-[#9E7A38] transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Map Card */}
              <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-7 border border-[#EAE0D5] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg text-espresso">
                    Our Location
                  </h3>
                  <span className="text-xs text-[#9E7A38] font-medium">Katraj-Kondhwa Road</span>
                </div>

                <a
                  href="https://maps.app.goo.gl/7Ds4EFtieMifzTnv6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl overflow-hidden border border-[#EAE0D5] bg-[#EAE0D5] aspect-[16/9] relative group cursor-pointer"
                  title="Open Divine Aura location on Google Maps"
                >
                  <iframe
                    title="Divine Aura Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.444747761895!2d73.86850837582572!3d18.447635182633036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb8b26af5b69%3A0xe0cfbd252e934dd4!2sDivine%20Aura%20beauty%20salon%20and%20makeup%20academy%20%7C%20Katraj!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full pointer-events-none"
                  ></iframe>
                </a>
              </div>

              {/* Our Timings Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#EAE0D5] flex items-center justify-between shadow-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAF3E8] border border-[#E5D7BE] flex items-center justify-center text-[#9E7A38]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-warmBrown-500">
                      Our Timings
                    </h4>
                    <p className="text-sm font-medium text-espresso mt-0.5">
                      {BRAND.timings}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-serif italic text-base text-[#9E7A38] flex items-center gap-1">
                    <span>See You Soon</span>
                    <Heart className="w-3.5 h-3.5 fill-[#9E7A38] text-[#9E7A38]" />
                  </span>
                </div>
              </div>

            </div>

          </div>
        </SectionContainer>
      </section>

    </div>
  );
}
