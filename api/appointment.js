/**
 * POST /api/appointment
 * Secure Vercel Serverless Function for Divine Aura Appointment / Enquiry Form
 * Integrated with Resend for transactional email delivery to nirmalasartistry@gmail.com
 */

import { Resend } from 'resend';

const ALLOWED_SERVICES = [
  'Hair Cut & Hairstyling',
  'Bridal Makeup',
  'Body Waxing',
  'Facial & Skin Care',
  'De-Tan & Clean-Up',
  'Basic Beauty Parlour Course'
];

const ALLOWED_TIME_SLOTS = [
  'Morning (10:00 AM - 12:00 PM)',
  'Afternoon (12:00 PM - 03:00 PM)',
  'Evening (03:00 PM - 06:00 PM)',
  'Late Evening (06:00 PM - 08:00 PM)'
];

// Target recipient address
const DEFAULT_RECIPIENT_EMAIL = "nirmalasartistry@gmail.com";

function sanitize(val) {
  if (typeof val !== 'string') return '';
  return val.replace(/<[^>]*>?/gm, '').trim();
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidName(name) {
  if (!name || name.length < 2 || name.length > 100) return false;
  return /^[\p{L}\s.'\-]+$/u.test(name);
}

function isValidIndianPhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  // Matches 10 digits starting with 6-9, with optional +91, 91, or 0 prefix
  return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(cleaned);
}

function isValidEmail(email) {
  if (!email || email.length < 5 || email.length > 254) return false;
  // RFC 5322 compliant regex supporting apostrophes in local part
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

function isValidDate(dateStr) {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (year < 2024 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) {
    return false;
  }

  // Reject dates older than 2 days ago (allowing for timezone variations)
  const now = new Date();
  const pastCutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
  if (d < pastCutoff) {
    return false;
  }

  return true;
}

function isValidTime(timeStr) {
  if (!timeStr || timeStr.length < 2 || timeStr.length > 80) return false;
  if (ALLOWED_TIME_SLOTS.includes(timeStr)) return true;
  const timeRegex = /^(?:1[0-2]|0?[1-9]):[0-5][0-9]\s*(?:AM|PM|am|pm)?$/i;
  const militaryRegex = /^(?:[01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeStr) || militaryRegex.test(timeStr);
}

function isValidMessage(message) {
  if (!message) return false;
  return message.length >= 2 && message.length <= 2000;
}

function generateHtmlEmail({ fullName, phone, email, service, date, time, message }) {
  const safeName = escapeHtml(fullName);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safeService = escapeHtml(service);
  const safeDate = escapeHtml(date);
  const safeTime = escapeHtml(time);
  const safeMessage = escapeHtml(message);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Appointment Enquiry — Divine Aura</title>
</head>
<body style="margin:0;padding:24px;background-color:#FAF6F0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#231C18;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:16px;border:1px solid #EAE0D5;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
    <!-- Header -->
    <tr>
      <td style="padding:28px 32px;background:linear-gradient(135deg,#8E6C2D 0%,#A8833C 50%,#8E6C2D 100%);text-align:center;">
        <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:normal;letter-spacing:1.5px;">DIVINE AURA</h1>
        <p style="margin:6px 0 0 0;color:#F8E7C8;font-size:12px;text-transform:uppercase;letter-spacing:2px;">New Appointment / Enquiry Received</p>
      </td>
    </tr>
    <!-- Body Content -->
    <tr>
      <td style="padding:32px;">
        <!-- Customer Details -->
        <h2 style="margin:0 0 16px 0;color:#9E7A38;font-size:14px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #FAF3E8;padding-bottom:8px;">Customer Details</h2>
        <table width="100%" cellpadding="6" cellspacing="0" style="margin-bottom:24px;font-size:14px;">
          <tr>
            <td width="140" style="color:#6B594B;font-weight:600;vertical-align:top;">Full Name:</td>
            <td style="color:#231C18;font-weight:500;">${safeName}</td>
          </tr>
          <tr>
            <td style="color:#6B594B;font-weight:600;vertical-align:top;">Phone Number:</td>
            <td style="color:#231C18;"><a href="tel:${safePhone}" style="color:#9E7A38;text-decoration:none;font-weight:500;">${safePhone}</a></td>
          </tr>
          <tr>
            <td style="color:#6B594B;font-weight:600;vertical-align:top;">Email:</td>
            <td style="color:#231C18;"><a href="mailto:${safeEmail}" style="color:#9E7A38;text-decoration:none;font-weight:500;">${safeEmail}</a></td>
          </tr>
        </table>

        <!-- Appointment Details -->
        <h2 style="margin:0 0 16px 0;color:#9E7A38;font-size:14px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #FAF3E8;padding-bottom:8px;">Appointment Details</h2>
        <table width="100%" cellpadding="6" cellspacing="0" style="margin-bottom:24px;font-size:14px;">
          <tr>
            <td width="140" style="color:#6B594B;font-weight:600;vertical-align:top;">Service:</td>
            <td style="color:#9E7A38;font-weight:600;">${safeService}</td>
          </tr>
          <tr>
            <td style="color:#6B594B;font-weight:600;vertical-align:top;">Preferred Date:</td>
            <td style="color:#231C18;">${safeDate}</td>
          </tr>
          <tr>
            <td style="color:#6B594B;font-weight:600;vertical-align:top;">Preferred Time:</td>
            <td style="color:#231C18;">${safeTime}</td>
          </tr>
        </table>

        <!-- Message -->
        <h2 style="margin:0 0 12px 0;color:#9E7A38;font-size:14px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #FAF3E8;padding-bottom:8px;">Message</h2>
        <div style="background-color:#FAF6F0;border:1px solid #EAE0D5;border-radius:10px;padding:16px;margin-bottom:24px;font-size:14px;line-height:1.6;color:#231C18;white-space:pre-wrap;">${safeMessage}</div>

        <!-- Footer -->
        <div style="text-align:center;border-top:1px solid #EAE0D5;padding-top:20px;font-size:12px;color:#867262;">
          <p style="margin:0 0 4px 0;">Website: <strong style="color:#231C18;">Divine Aura</strong></p>
          <p style="margin:0;">Reply directly to this email to communicate with ${safeName}.</p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function generatePlainTextEmail({ fullName, phone, email, service, date, time, message }) {
  return `New Appointment / Enquiry Received

Customer Details

Full Name:
${fullName}

Phone Number:
${phone}

Email:
${email}

Appointment Details

Service:
${service}

Preferred Date:
${date}

Preferred Time:
${time}

Message

${message}

Website:
Divine Aura
`;
}

export default async function handler(req, res) {
  // Ensure response helper functions exist across runtimes
  if (!res.status) {
    res.status = function (code) {
      res.statusCode = code;
      return res;
    };
  }
  if (!res.json) {
    res.json = function (data) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
      return res;
    };
  }

  console.log('[API DIAGNOSTIC] API request received:', {
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString()
  });

  // Reject non-POST methods
  if (req.method !== 'POST') {
    console.warn('[API DIAGNOSTIC] Rejected non-POST request:', req.method);
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed'
    });
  }

  try {
    console.log('[API DIAGNOSTIC] Operation: Checking payload size and parsing body...');

    // Payload size protection (max 10KB)
    const contentLength = req.headers['content-length'];
    if (contentLength && parseInt(contentLength, 10) > 10240) {
      console.warn('[API DIAGNOSTIC] Payload size exceeded limit:', contentLength);
      return res.status(400).json({
        success: false,
        message: 'Please check the form details and try again.'
      });
    }

    // Parse body if not already parsed
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (parseErr) {
        console.warn('[API DIAGNOSTIC] JSON parse error on string body:', parseErr.message);
        return res.status(400).json({
          success: false,
          message: 'Please check the form details and try again.'
        });
      }
    } else if (!body && req.on) {
      body = await new Promise((resolve) => {
        let raw = '';
        req.on('data', (chunk) => {
          raw += chunk;
          if (raw.length > 10240) resolve(null);
        });
        req.on('end', () => {
          try {
            resolve(JSON.parse(raw));
          } catch {
            resolve(null);
          }
        });
        req.on('error', (err) => {
          console.error('[API DIAGNOSTIC] Stream read error:', err.message);
          resolve(null);
        });
      });
    }

    if (!body || typeof body !== 'object') {
      console.warn('[API DIAGNOSTIC] Request body is missing or not an object.');
      return res.status(400).json({
        success: false,
        message: 'Please check the form details and try again.'
      });
    }

    console.log('[API DIAGNOSTIC] Operation: Sanitizing inputs and validating fields...');

    // Extract & sanitize user inputs
    const fullName = sanitize(body.fullName || body.name);
    const phone = sanitize(body.phone || body.phoneNumber);
    const email = sanitize(body.email);
    let service = sanitize(body.service || body.selectService);
    const date = sanitize(body.date || body.preferredDate);
    const time = sanitize(body.time || body.preferredTime);
    const message = sanitize(body.message);

    // Normalize academy service option if sent with Academy prefix
    if (service === 'Academy: Basic Beauty Parlour Course') {
      service = 'Basic Beauty Parlour Course';
    }

    // Strict validation of all required fields
    if (!isValidName(fullName)) {
      console.warn('[API DIAGNOSTIC] Validation failed: invalid fullName');
      return res.status(400).json({
        success: false,
        message: 'Please check the form details and try again.'
      });
    }

    if (!isValidIndianPhone(phone)) {
      console.warn('[API DIAGNOSTIC] Validation failed: invalid phone format');
      return res.status(400).json({
        success: false,
        message: 'Please check the form details and try again.'
      });
    }

    if (!isValidEmail(email)) {
      console.warn('[API DIAGNOSTIC] Validation failed: invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Please check the form details and try again.'
      });
    }

    // Validate that service is one of the 6 allowed Divine Aura services
    if (!ALLOWED_SERVICES.includes(service)) {
      console.warn('[API DIAGNOSTIC] Validation failed: unsupported service selection');
      return res.status(400).json({
        success: false,
        message: 'Please check the form details and try again.'
      });
    }

    if (!isValidDate(date)) {
      console.warn('[API DIAGNOSTIC] Validation failed: invalid date');
      return res.status(400).json({
        success: false,
        message: 'Please check the form details and try again.'
      });
    }

    if (!isValidTime(time)) {
      console.warn('[API DIAGNOSTIC] Validation failed: invalid time slot');
      return res.status(400).json({
        success: false,
        message: 'Please check the form details and try again.'
      });
    }

    if (!isValidMessage(message)) {
      console.warn('[API DIAGNOSTIC] Validation failed: invalid message length');
      return res.status(400).json({
        success: false,
        message: 'Please check the form details and try again.'
      });
    }

    console.log('[API DIAGNOSTIC] Request validation passed successfully.');
    console.log('[API DIAGNOSTIC] Operation: Verifying server-side email credentials...');

    // Server-side Resend Environment Configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.DIVINE_AURA_FROM_EMAIL;
    const toEmail = process.env.DIVINE_AURA_TO_EMAIL || DEFAULT_RECIPIENT_EMAIL;

    console.log('[API DIAGNOSTIC] Configuration checks:', {
      RESEND_API_KEY_configured: Boolean(resendApiKey),
      DIVINE_AURA_FROM_EMAIL_configured: Boolean(fromEmail),
      DIVINE_AURA_TO_EMAIL_configured: Boolean(toEmail)
    });

    if (!resendApiKey) {
      console.error('[API DIAGNOSTIC] Error: Missing RESEND_API_KEY environment variable. Halting with 500.');
      return res.status(500).json({
        success: false,
        message: 'We could not submit your enquiry right now. Please try again.'
      });
    }

    if (!fromEmail) {
      console.error('[API DIAGNOSTIC] Error: Missing DIVINE_AURA_FROM_EMAIL environment variable. Halting with 500.');
      return res.status(500).json({
        success: false,
        message: 'We could not submit your enquiry right now. Please try again.'
      });
    }

    console.log('[API DIAGNOSTIC] Operation: Initializing Resend client and dispatching email...');

    const resend = new Resend(resendApiKey);

    const emailPayload = {
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      reply_to: email,
      subject: 'New Appointment Enquiry — Divine Aura',
      html: generateHtmlEmail({ fullName, phone, email, service, date, time, message }),
      text: generatePlainTextEmail({ fullName, phone, email, service, date, time, message })
    };

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error('[API DIAGNOSTIC] Resend API Error Name:', error.name || 'ResendDeliveryError');
      console.error('[API DIAGNOSTIC] Resend API Error Message:', error.message);
      console.error('[API DIAGNOSTIC] Resend API Error Code/Status:', error.statusCode || error.status);
      return res.status(500).json({
        success: false,
        message: 'We could not submit your enquiry right now. Please try again.'
      });
    }

    if (!data || !data.id) {
      console.error('[API DIAGNOSTIC] Resend returned no transaction ID.');
      return res.status(500).json({
        success: false,
        message: 'We could not submit your enquiry right now. Please try again.'
      });
    }

    console.log('[API DIAGNOSTIC] Email dispatched successfully. Resend confirmation ID:', data.id);

    // Only return success after Resend confirms successful submission
    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been submitted successfully.'
    });
  } catch (err) {
    console.error('[API DIAGNOSTIC] Unexpected Exception Name:', err.name || 'Error');
    console.error('[API DIAGNOSTIC] Unexpected Exception Message:', err.message);
    console.error('[API DIAGNOSTIC] Server-side Stack Trace:\n', err.stack);
    // Never expose stack trace or internal error details to client
    return res.status(500).json({
      success: false,
      message: 'We could not submit your enquiry right now. Please try again.'
    });
  }
}
