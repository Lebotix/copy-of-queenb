
import emailjs from '@emailjs/browser';
import { BookingDetails } from '../types';

export const sendBookingNotification = async (booking: BookingDetails) => {
  const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error("EmailJS configuration is missing. Please check your .env file.");
    // Return false to alert the user in the UI that configuration is incomplete
    return false; 
  }

  // Construct a detailed text message as a fallback or for simple templates
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

  const templateParams = {
    // Intended recipient - ensure your EmailJS template uses {{to_email}} or is configured to send to this address
    to_email: "busycleaning93@gmail.com",
    to_name: "Queen B's Management",
    
    // Sender info for Auto-Reply configuration (set 'Reply To' field in EmailJS to {{reply_to}})
    from_name: booking.contactName,
    contact_name: booking.contactName,
    contact_email: booking.contactEmail,
    reply_to: booking.contactEmail,
    contact_phone: booking.contactPhone,
    
    // structured data for template variables
    service_type: booking.serviceType,
    bedrooms: booking.bedrooms,
    bathrooms: booking.bathrooms,
    date: booking.date,
    time: booking.time,
    address: booking.address,
    instructions: booking.instructions,
    
    // Full formatted message body
    message: detailedMessage
  };

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return true;
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return false;
  }
};
