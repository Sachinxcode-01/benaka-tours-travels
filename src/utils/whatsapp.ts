import type { BookingRequest } from "../types/booking";
import { BUSINESS_INFO } from "../entities/business";
import {
  createWhatsAppInquiryUrl,
  generateBookingWhatsAppMessage,
} from "../shared/services/whatsapp.service";

export const WHATSAPP_PHONE_NUMBER = BUSINESS_INFO.contact.whatsappNumber;
export const DISPLAY_PHONE_NUMBER = BUSINESS_INFO.contact.phoneDisplay;
export const BUSINESS_EMAIL = BUSINESS_INFO.contact.email;
export const MAPS_URL = BUSINESS_INFO.contact.mapsUrl;

export function generateWhatsAppInquiryUrl(
  booking: Partial<BookingRequest>,
): string {
  return createWhatsAppInquiryUrl(booking);
}

export function generateQuickVehicleWhatsAppUrl(vehicleName: string): string {
  const text = `Hello Benaka Tours & Travels,\n\nI am interested in renting the *${vehicleName}* for a chauffeur-driven trip from Gadag.\n\nPlease let me know current availability and estimated quote.`;
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}

export { generateBookingWhatsAppMessage };
