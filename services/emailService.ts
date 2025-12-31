
import emailjs from '@emailjs/browser';
import { BookingDetails } from '../types';

export const sendBookingNotification = async (booking: BookingDetails) => {
  const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
  const autoReplyTemplateId = process.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
  const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;

  // Debug log for production troubleshooting
  console.log("EmailJS Config Check:", { 
    hasServiceId: !!serviceId, 
    hasTemplateId: !!templateId, 
    hasAutoReplyId: !!autoReplyTemplateId, 
    hasPublicKey: !!publicKey 
  });

  if (!serviceId || !templateId || !publicKey) {
    console.error("EmailJS configuration is missing. Please check your .env file or Cloudflare environment variables.");
    return false; 
  }

  // Construct a detailed text message for the admin notification
  const detailedMessage = `
New Booking Request
-------------------
Service Type: ${booking.serviceType}
Date: ${booking.date}
Time: ${booking.time}
Address: ${booking.address}
Size: ${booking.bedrooms} Bedroom(s), ${booking.bathrooms} Bathroom(s)

Client Details
--------------
Name: ${booking.contactName}
Email: ${booking.contactEmail}
Phone: ${booking.contactPhone}

Special Instructions:
${booking.instructions || "None provided"}
  `.trim();

  // Params for the Admin/Business email
  const templateParams = {
    to_email: "busycleaning93@gmail.com",
    to_name: "Queen B's Management",
    
    from_name: booking.contactName,
    contact_name: booking.contactName,
    contact_email: booking.contactEmail,
    reply_to: booking.contactEmail,
    contact_phone: booking.contactPhone,
    
    service_type: booking.serviceType,
    bedrooms: booking.bedrooms,
    bathrooms: booking.bathrooms,
    date: booking.date,
    time: booking.time,
    address: booking.address,
    instructions: booking.instructions,
    
    message: detailedMessage
  };

  try {
    // 1. Send Admin Notification
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log("Admin notification sent successfully.");

    // 2. Send Customer Auto-Reply (if configured)
    // We wrap this in a separate try/catch so failure here doesn't block the booking success state
    if (autoReplyTemplateId && booking.contactEmail) {
        try {
            const customerConfirmationMessage = `
Dear ${booking.contactName},

Thank you for choosing Queen B's Cleaning! We have received your booking request and are currently reviewing our schedule.

Your Request Details:
---------------------
Service: ${booking.serviceType}
Date: ${booking.date}
Time: ${booking.time}
Address: ${booking.address}

We will contact you shortly at ${booking.contactPhone} or via email to confirm your appointment and provide a final price estimate.

Warm regards,
The Queen B's Team
            `.trim();

            const autoReplyParams = {
                to_email: booking.contactEmail,
                to_name: booking.contactName,
                from_name: "Queen B's Cleaning",
                contact_name: "Queen B's Cleaning",
                reply_to: "busycleaning93@gmail.com",
                
                service_type: booking.serviceType,
                date: booking.date,
                time: booking.time,
                address: booking.address,
                
                message: customerConfirmationMessage
            };

            await emailjs.send(serviceId, autoReplyTemplateId, autoReplyParams, publicKey);
            console.log("Auto-reply sent successfully.");
        } catch (autoReplyError) {
            console.warn("Failed to send auto-reply, but admin notification was sent.", autoReplyError);
        }
    }

    return true;
  } catch (error) {
    console.error("Failed to send email notification (Admin):", error);
    return false;
  }
};
