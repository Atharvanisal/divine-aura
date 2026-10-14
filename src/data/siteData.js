/**
 * WhatsApp Configuration (Temporary Testing)
 * Test WhatsApp Number: +91 8975860753
 * To switch to the owner's final WhatsApp number, simply update this configuration object.
 */
export const WHATSAPP_CONFIG = {
  number: "918975860753",
  formatted: "+91 8975860753",
  baseUrl: "https://wa.me/918975860753"
};

/**
 * Builds an encoded WhatsApp URL with prefilled appointment enquiry details.
 * Encodes all parameters using encodeURIComponent().
 */
export function createWhatsAppEnquiryUrl({ fullName = '', phone = '', email = '', service = '', date = '', time = '', message = '' }) {
  const lines = [
    `*New Appointment Enquiry — Divine Aura*`,
    ``,
    `*Name:* ${fullName.trim()}`,
    `*Phone:* ${phone.trim()}`,
  ];

  if (email && email.trim()) {
    lines.push(`*Email:* ${email.trim()}`);
  }

  lines.push(
    `*Service / Course:* ${service.trim()}`,
    `*Preferred Date:* ${date.trim()}`,
    `*Preferred Time:* ${time.trim()}`
  );

  if (message && message.trim()) {
    lines.push(`*Message:* ${message.trim()}`);
  }

  const messageText = lines.join('\n');
  return `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(messageText)}`;
}

export const BRAND = {
  name: "Divine Aura",
  tagline: "Where Beauty Meets Confidence",
  phone: "+91 7391035567",
  phoneRaw: "7391035567",
  whatsappNumber: WHATSAPP_CONFIG.number,
  whatsappFormatted: WHATSAPP_CONFIG.formatted,
  whatsappUrl: WHATSAPP_CONFIG.baseUrl,
  email: "nirmalasartistry@gmail.com",
  address: "Nikhil Bunglow, Lane No. 2, Shivshambhonagar, Katraj-Kondhwa Road",
  city: "Pune, Maharashtra",
  timings: "Monday – Sunday | 10:00 AM – 08:00 PM",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  logo: "/assets/divine_aura_logo.jpg",
  logoEmbossed: "/assets/divine_aura_logo.jpg"
};


export const HIGHLIGHTS = [
  {
    id: 1,
    title: "Beauty Services",
    description: "Tailored treatments for your personal care and wellness."
  },
  {
    id: 2,
    title: "Expert Trainers",
    description: "Dedicated learning from seasoned beauty professionals."
  },
  {
    id: 3,
    title: "Relaxing Ambience",
    description: "A serene, comfortable space to unwind and renew."
  }
];

export const PHILOSOPHY = [
  {
    id: 1,
    title: "Beauty with Care",
    description: "Every treatment is delivered with mindfulness, hygiene, and attentive personal care."
  },
  {
    id: 2,
    title: "Professional Excellence",
    description: "High standards of technique, client comfort, and consistent dedication."
  },
  {
    id: 3,
    title: "Personal Growth",
    description: "Empowering individuals with confidence, skills, and self-care routines."
  },
  {
    id: 4,
    title: "A Brighter Future",
    description: "Guiding learners with practical craft to thrive in their careers."
  }
];

export const WHY_CHOOSE_US = [
  "Experienced & certified professionals",
  "Premium products & advanced techniques",
  "Hygienic and comfortable environment",
  "Personalized care for every client",
  "Expert training & hands-on learning"
];

export const SERVICES_DATA = [
  {
    id: "hair-cut-hairstyling",
    title: "Hair Cut & Hairstyling",
    tagline: "20+ Full Styling",
    supportingText: "20+ Full Styling",
    description: "Personalized haircuts, blow-drys, and creative styling tailored to your look.",
    image: "/assets/service_hair_editorial.jpg",
    highlights: [
      "Everyday Styling",
      "Fresh Haircuts",
      "Hair Makeovers",
      "Special Occasions"
    ]
  },
  {
    id: "bridal-makeup",
    title: "Bridal Makeup",
    tagline: "For Your Special Day",
    supportingText: "For Your Special Day",
    description: "Signature bridal makeup artistry and exquisite styling for your special celebration.",
    image: "/assets/service_bridal_editorial.jpg",
    highlights: [
      "Pre-Wedding Events",
      "Traditional Events",
      "Special Celebrations",
      "Engagement Ceremonies"
    ]
  },
  {
    id: "body-waxing",
    title: "Body Waxing",
    tagline: "Smooth Skin • Unforgettable",
    supportingText: "Smooth Skin • Unforgettable",
    description: "Hygienic and gentle waxing care delivered in a private, comfortable setting.",
    image: "/assets/service_waxing_editorial.jpg",
    highlights: [
      "Full Body Grooming",
      "Smooth Skin Care",
      "Regular Grooming",
      "Special Occasions"
    ]
  },
  {
    id: "facial-skin-care",
    title: "Facial & Skin Care",
    tagline: "Healthy Skin • Natural Glow",
    supportingText: "Healthy Skin • Natural Glow",
    description: "Rejuvenating facials and nourishing treatments to refresh and revitalize your skin.",
    image: "/assets/service_skin_editorial.jpg",
    highlights: [
      "Skin Refreshment",
      "Deep Cleansing",
      "Glow & Hydration",
      "Regular Skin Care"
    ]
  },
  {
    id: "de-tan-clean-up",
    title: "De-Tan & Clean-Up",
    tagline: "Fresh • Clear • Radiant",
    supportingText: "Fresh • Clear • Radiant",
    description: "Gentle exfoliation and clarifying therapies designed for a clean, radiant complexion.",
    image: "/assets/service_detan_editorial.jpg",
    highlights: [
      "Tan Removal",
      "Dull Skin Care",
      "Quick Skin Refresh",
      "Pre-Event Grooming"
    ]
  }
];

export const ACADEMY_COURSE = {
  title: "Basic Beauty Parlour Course",
  tagline: "Comprehensive Professional Training",
  description: "Comprehensive foundational beauty training designed to teach essential salon techniques, hygiene protocols, and practical client styling under dedicated mentorship.",
  syllabus: [
    "Threading & Eyebrow Shaping",
    "Waxing",
    "Manicure & Pedicure",
    "Basic Hair Cut",
    "Hair Dye & Colouring",
    "Bleach",
    "Facial & Clean-up",
    "Skin Care",
    "Home Care & Grooming",
    "Salon Hygiene & Safety",
    "Client Handling & Personality"
  ]
};

export const ACADEMY_BENEFITS = [
  "Certified & experienced trainers",
  "Hands-on practical training",
  "Modern infrastructure & tools",
  "Flexible batch timings"
];

// Actual Academy certification moments
export const ACADEMY_CERTIFICATIONS = [
  {
    id: 1,
    src: "/assets/academy_certification_1.jpg",
    alt: "Nirmala's Artistry & Divine Aura Academy Certificate of Completion Presentation",
    title: "Certificate of Completion",
    subtitle: "Basic, Advance & Make-up Course"
  },
  {
    id: 2,
    src: "/assets/academy_certification_2.jpg",
    alt: "Student Certification Presentation at Divine Aura Academy",
    title: "Certificate of Completion",
    subtitle: "Basic, Advance & Make-up Course"
  },
  {
    id: 3,
    src: "/assets/academy_group_photo.png",
    alt: "Divine Aura Academy Graduate Batch with Owner and Course Certificates",
    title: "Academy Graduate Batch",
    subtitle: "Owner & Students Certification"
  }
];

export const ACADEMY_MOMENTS = ACADEMY_CERTIFICATIONS;

export const SPACE_PHOTOS = [
  {
    id: 1,
    src: "/assets/salon_interior_1.png",
    title: "Main Styling & Salon Area",
    description: "Thoughtfully arranged modern stations with warm ambient illumination"
  },
  {
    id: 2,
    src: "/assets/space_1.png",
    title: "Consultation & Reception",
    description: "Welcoming reception and personalized consultation zone"
  },
  {
    id: 3,
    src: "/assets/space_2.png",
    title: "Academy Training Studio",
    description: "Equipped studio designed for interactive learning and hands-on practice"
  },
  {
    id: 4,
    src: "/assets/space_3.png",
    title: "Private Care Suite",
    description: "Quiet, hygienic suite for relaxation and facial treatments"
  },
  {
    id: 5,
    src: "/assets/space_4.png",
    title: "Care & Equipment Space",
    description: "Clean sanitization protocols and professional beauty equipment"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "I had a wonderful experience at the parlour. The staff was professional, friendly, and made me feel comfortable throughout the service. I got a layer haircut, and I absolutely loved the result. The stylist understood exactly what I wanted and gave my hair a fresh, stylish, and perfectly shaped look. The service was neat and satisfying. Highly recommended for anyone looking for a great haircut and excellent service.",
    author: "Vaishnavi More",
    source: "Google Review"
  },
  {
    id: 2,
    quote: "Amazing experience! staff is very friendly. My skin feels so fresh and glowing after the facial. Highly recommended! Best solon I've visited. Clean, hygienic and gave perfect result.",
    author: "Sarika Khodave",
    source: "Google Review"
  },
  {
    id: 3,
    quote: "I absolutely loved the hair color service! The color turned out really beautiful and suits me perfectly. The beautician did an amazing job and was very professional throughout. Khup chan service milali and the final result was exactly what I wanted. Highly recommend! ✨",
    author: "Shruti Ghotane",
    source: "Google Review"
  },
  {
    id: 4,
    quote: "Very good experience at Nirmals Beauty Parlour. I got a step haircut and I am very satisfied with the result. The staff is polite and skilled, and the parlour is well maintained. I recommend everyone to visit at least once. Thank u so much Nirmala Artistry Beauty Salon😍🥰",
    author: "Rabbana Siddiki",
    source: "Google Review"
  },
  {
    id: 5,
    quote: "I recently got my highlights done at this Salone...and I'm absolutely thrilled with the results...The color is exactly what I envisioned. The stylist, she was so professional, patient, and skillful. My hair looks so smooth and shiny now... Highly recommend for anyone looking for a fantastic highlighting experience.✨❤️",
    author: "Pooja Shilevant",
    source: "Google Review"
  }
];
