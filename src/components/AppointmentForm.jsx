import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { BRAND } from '../data/siteData';

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
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [formError, setFormError] = useState('');
  const [serverError, setServerError] = useState('');
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
    if (serverError) {
      setServerError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return; // Prevent duplicate submissions

    setServerError('');
    setFormError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError('Please fill in all required fields.');
      return; // DO NOT send API request
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          service: formData.service,
          date: formData.date,
          time: formData.time,
          message: formData.message.trim() || 'Appointment / enquiry request submitted through Divine Aura website.',
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStatus('success');
        setSuccessDetails({ ...formData });
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
        setServerError('');
      } else {
        setStatus('error');
        // Display actual backend error message if available
        const errorMsg = data?.message || (response.statusText ? `Request failed (${response.status}): ${response.statusText}` : 'We could not submit your enquiry right now. Please try again.');
        setServerError(errorMsg);
      }
    } catch {
      setStatus('error');
      setServerError('We could not submit your enquiry right now. Please try again.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrors({});
    setFormError('');
    setServerError('');
    setSuccessDetails(null);
  };

  if (status === 'success' && successDetails) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE0D5] shadow-lg text-center animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-[#FAF3E8] border border-[#E5D7BE] flex items-center justify-center mx-auto text-[#9E7A38] mb-6">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-espresso mb-2">
          Request Received With Care
        </h3>
        <p className="text-sm text-warmBrown-600 max-w-md mx-auto mb-6">
          Thank you, <span className="font-semibold text-espresso">{successDetails.fullName}</span>. Your enquiry for <span className="font-semibold text-espresso">{successDetails.service}</span> has been noted. Our team will contact you shortly on {successDetails.phone}.
        </p>

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

      {/* Top-Level Frontend Validation Error Banner */}
      {formError && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span className="font-medium">{formError}</span>
        </div>
      )}

      {/* Top-Level Server Error Banner */}
      {serverError && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{serverError}</span>
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
            disabled={status === 'loading'}
            className="w-full py-3.5 px-6 rounded-full font-medium text-sm text-white bg-[#9E7A38] hover:bg-[#856529] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Request...</span>
              </>
            ) : (
              <span>Submit Appointment Request</span>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-warmBrown-500 pt-1">
          By submitting, you agree to be contacted by Divine Aura regarding your appointment or enquiry.
        </p>
      </div>
    </form>
  );
}
