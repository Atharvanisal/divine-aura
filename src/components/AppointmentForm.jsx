import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import Reveal from './Reveal';
import { BRAND, WHATSAPP_CONFIG, createWhatsAppEnquiryUrl } from '../data/siteData';

// Backend-supported Divine Aura services
const ALLOWED_SERVICES = [
  'Hair Cut & Hairstyling',
  'Bridal Makeup',
  'Body Waxing',
  'Facial & Skin Care',
  'De-Tan & Clean-Up',
  'Basic Beauty Parlour Course',
  'Academy: Basic Beauty Parlour Course'
];

// Backend-supported Divine Aura appointment time slots
const ALLOWED_TIME_SLOTS = [
  'Morning (10:00 AM - 12:00 PM)',
  'Afternoon (12:00 PM - 03:00 PM)',
  'Evening (03:00 PM - 06:00 PM)',
  'Late Evening (06:00 PM - 08:00 PM)'
];

function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isValidIndianPhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  // 10 digits starting with 6-9, with optional +91, 91, or 0 prefix
  return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(cleaned);
}

function isValidEmail(email) {
  if (!email || email.length < 5 || email.length > 254) return false;
  // RFC 5322 compliant regex supporting apostrophes in local part
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email);
}

export default function AppointmentForm({ initialService = '' }) {
  // Normalize initial service if passed without prefix
  const initialValue = initialService === 'Basic Beauty Parlour Course'
    ? 'Academy: Basic Beauty Parlour Course'
    : initialService;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: initialValue || '',
    date: '',
    time: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'success'
  const [formError, setFormError] = useState('');
  const [successDetails, setSuccessDetails] = useState(null);

  const validate = () => {
    const errs = {};
    const trimmedName = formData.fullName.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();
    const selectedService = formData.service;
    const selectedDate = formData.date;
    const selectedTime = formData.time;

    // 1. Full Name
    if (!trimmedName) {
      errs.fullName = 'Please enter your full name.';
    } else if (trimmedName.length < 2) {
      errs.fullName = 'Full name must be at least 2 characters.';
    } else if (!/^[\p{L}\s.'\-]+$/u.test(trimmedName)) {
      errs.fullName = 'Please enter a valid full name.';
    }

    // 2. Phone Number (Indian mobile format)
    if (!trimmedPhone) {
      errs.phone = 'Phone number is required.';
    } else if (!isValidIndianPhone(trimmedPhone)) {
      errs.phone = 'Please enter a valid 10-digit Indian phone number.';
    }

    // 3. Email Address
    if (!trimmedEmail) {
      errs.email = 'Email address is required.';
    } else if (!isValidEmail(trimmedEmail)) {
      errs.email = 'Please enter a valid email address.';
    }

    // 4. Service
    if (!selectedService) {
      errs.service = 'Please select a service or course.';
    } else if (!ALLOWED_SERVICES.includes(selectedService)) {
      errs.service = 'Please select a valid Divine Aura service or course.';
    }

    // 5. Preferred Date (cannot be in the past)
    if (!selectedDate) {
      errs.date = 'Please select a preferred date.';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
      errs.date = 'Please enter a valid date in YYYY-MM-DD format.';
    } else {
      const todayStr = getTodayDateString();
      if (selectedDate < todayStr) {
        errs.date = 'Preferred date cannot be in the past.';
      }
    }

    // 6. Preferred Time (allowed time slots)
    if (!selectedTime) {
      errs.time = 'Please select a preferred time slot.';
    } else if (!ALLOWED_TIME_SLOTS.includes(selectedTime)) {
      errs.time = 'Please select a valid time slot during salon hours (10:00 AM - 08:00 PM).';
    }

    // Optional message length check
    if (formData.message && formData.message.length > 2000) {
      errs.message = 'Message must be under 2000 characters.';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (formError) {
      setFormError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError('Please fill in all required fields.');
      return;
    }

    // Build the WhatsApp enquiry URL with prefilled and encoded details
    const waUrl = createWhatsAppEnquiryUrl({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      date: formData.date,
      time: formData.time,
      message: formData.message,
    });

    setStatus('success');
    setSuccessDetails({ ...formData, whatsappUrl: waUrl });
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      time: '',
      message: '',
    });
    setErrors({});
    setFormError('');

    // Open WhatsApp chat directly in a new tab synchronously on click
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Handled gracefully in UI with explicit button
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrors({});
    setFormError('');
    setSuccessDetails(null);
  };

  if (status === 'success' && successDetails) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE0D5] shadow-lg text-center animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-[#FAF3E8] border border-[#E5D7BE] flex items-center justify-center mx-auto text-[#9E7A38] mb-5">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-espresso mb-2">
          Appointment Enquiry Prepared
        </h3>
        <p className="text-sm text-warmBrown-600 max-w-md mx-auto mb-6">
          Thank you, <span className="font-semibold text-espresso">{successDetails.fullName}</span>. Your enquiry details for <span className="font-semibold text-espresso">{successDetails.service}</span> are ready to be sent on WhatsApp.
        </p>

        {/* WhatsApp Action & Graceful Fallback Card */}
        <div className="bg-[#FAF3E8]/80 border border-[#E5D7BE] rounded-2xl p-5 sm:p-6 max-w-md mx-auto text-left mb-6 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-espresso">
                WhatsApp Chat Ready
              </h4>
              <p className="text-xs text-warmBrown-700 mt-1 leading-relaxed">
                Your appointment details have been prepared. <strong className="text-espresso font-semibold">Please press the "Send" button in WhatsApp</strong> to send your booking request directly to our team at <span className="font-medium text-espresso">{WHATSAPP_CONFIG.formatted}</span>.
              </p>
              <div className="mt-3.5">
                <a
                  href={successDetails.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all shadow hover:shadow-md active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Open WhatsApp Chat</span>
                </a>
              </div>
              <p className="text-[11px] text-warmBrown-500 mt-2">
                If WhatsApp did not open automatically, please click the button above. (Please remember to press <strong>Send</strong> in WhatsApp to deliver your message).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#FAF6F0] rounded-2xl p-4 max-w-md mx-auto text-left text-xs sm:text-sm text-warmBrown-700 space-y-1.5 border border-[#EAE0D5]/70 mb-8">
          <p><span className="font-medium text-espresso">Service / Enquiry:</span> {successDetails.service}</p>
          {successDetails.date && <p><span className="font-medium text-espresso">Preferred Date:</span> {successDetails.date}</p>}
          {successDetails.time && <p><span className="font-medium text-espresso">Preferred Time:</span> {successDetails.time}</p>}
          <p><span className="font-medium text-espresso">Salon Hours:</span> {BRAND.timings}</p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-[#9E7A38] hover:bg-[#856529] text-white transition-all shadow active:scale-95"
        >
          <span>Book Another Appointment</span>
        </button>
      </div>
    );
  }


  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE0D5] shadow-luxury"
    >
      <Reveal variant="fade-up" duration={950} delay={100}>
        <div className="mb-6 pb-4 border-b border-[#F2EAE0]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E7A38]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Appointment & Enquiry</span>
          </div>
          <h3 className="font-serif text-2xl text-espresso mt-1">
            Reserve Your Experience
          </h3>
          <p className="text-xs sm:text-sm text-warmBrown-600 mt-1">
            Fill out the details below to schedule your visit or enquire about academy courses.
          </p>
        </div>
      </Reveal>

      {/* Top-Level Frontend Validation Error Banner */}
      {formError && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span className="font-medium">{formError}</span>
        </div>
      )}


      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-warmBrown-800 mb-1.5">
            Full Name <span className="text-[#9E7A38]">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Priya Sharma"
            className={`w-full px-4 py-3 rounded-xl bg-[#FAF6F0]/60 border text-sm text-espresso placeholder-warmBrown-400 focus:outline-none focus:ring-2 focus:ring-[#9E7A38]/30 transition-all ${
              errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-[#EAE0D5] focus:border-[#9E7A38]'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Phone & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-warmBrown-800 mb-1.5">
              Phone Number <span className="text-[#9E7A38]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 7391035567"
              className={`w-full px-4 py-3 rounded-xl bg-[#FAF6F0]/60 border text-sm text-espresso placeholder-warmBrown-400 focus:outline-none focus:ring-2 focus:ring-[#9E7A38]/30 transition-all ${
                errors.phone ? 'border-red-400 bg-red-50/30' : 'border-[#EAE0D5] focus:border-[#9E7A38]'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-warmBrown-800 mb-1.5">
              Email Address <span className="text-[#9E7A38]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. priya@example.com"
              className={`w-full px-4 py-3 rounded-xl bg-[#FAF6F0]/60 border text-sm text-espresso placeholder-warmBrown-400 focus:outline-none focus:ring-2 focus:ring-[#9E7A38]/30 transition-all ${
                errors.email ? 'border-red-400 bg-red-50/30' : 'border-[#EAE0D5] focus:border-[#9E7A38]'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>
        </div>

        {/* Service / Enquiry Type */}
        <div>
          <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-warmBrown-800 mb-1.5">
            Service / Enquiry Type <span className="text-[#9E7A38]">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-[#FAF6F0]/60 border text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-[#9E7A38]/30 transition-all ${
              errors.service ? 'border-red-400 bg-red-50/30' : 'border-[#EAE0D5] focus:border-[#9E7A38]'
            }`}
          >
            <option value="">Select Service / Enquiry Category</option>
            <optgroup label="Beauty & Salon Services">
              <option value="Hair Cut & Hairstyling">Hair Cut & Hairstyling</option>
              <option value="Bridal Makeup">Bridal Makeup</option>
              <option value="Body Waxing">Body Waxing</option>
              <option value="Facial & Skin Care">Facial & Skin Care</option>
              <option value="De-Tan & Clean-Up">De-Tan & Clean-Up</option>
            </optgroup>
            <optgroup label="Divine Aura Academy">
              <option value="Academy: Basic Beauty Parlour Course">Academy: Basic Beauty Parlour Course</option>
            </optgroup>
          </select>
          {errors.service && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.service}</span>
            </p>
          )}
        </div>

        {/* Preferred Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-xs font-semibold uppercase tracking-wider text-warmBrown-800 mb-1.5">
              Preferred Date <span className="text-[#9E7A38]">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                name="date"
                min={getTodayDateString()}
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-[#FAF6F0]/60 border text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-[#9E7A38]/30 transition-all ${
                  errors.date ? 'border-red-400 bg-red-50/30' : 'border-[#EAE0D5] focus:border-[#9E7A38]'
                }`}
              />
            </div>
            {errors.date && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.date}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="time" className="block text-xs font-semibold uppercase tracking-wider text-warmBrown-800 mb-1.5">
              Preferred Time <span className="text-[#9E7A38]">*</span>
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-[#FAF6F0]/60 border text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-[#9E7A38]/30 transition-all ${
                errors.time ? 'border-red-400 bg-red-50/30' : 'border-[#EAE0D5] focus:border-[#9E7A38]'
              }`}
            >
              <option value="">Select Time Slot (10 AM - 8 PM)</option>
              <option value="Morning (10:00 AM - 12:00 PM)">Morning (10:00 AM - 12:00 PM)</option>
              <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 PM - 03:00 PM)</option>
              <option value="Evening (03:00 PM - 06:00 PM)">Evening (03:00 PM - 06:00 PM)</option>
              <option value="Late Evening (06:00 PM - 08:00 PM)">Late Evening (06:00 PM - 08:00 PM)</option>
            </select>
            {errors.time && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.time}</span>
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-warmBrown-800 mb-1.5">
            Message / Specific Needs <span className="text-xs font-normal text-warmBrown-500 lowercase">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your requirements or any questions you may have..."
            className={`w-full px-4 py-3 rounded-xl bg-[#FAF6F0]/60 border text-sm text-espresso placeholder-warmBrown-400 focus:outline-none focus:ring-2 focus:ring-[#9E7A38]/30 transition-all ${
              errors.message ? 'border-red-400 bg-red-50/30' : 'border-[#EAE0D5] focus:border-[#9E7A38]'
            }`}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-full font-medium text-sm text-white bg-[#9E7A38] hover:bg-[#856529] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>Submit Appointment Request</span>
          </button>
        </div>

        <p className="text-center text-xs text-warmBrown-500 pt-1">
          By submitting, you agree to be contacted by Divine Aura regarding your appointment or enquiry.
        </p>
      </div>
    </form>
  );
}
