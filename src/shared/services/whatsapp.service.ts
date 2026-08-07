import { BUSINESS_INFO } from "@entities/business";
import { generateWhatsAppUrl } from "../utils/generateWhatsAppUrl";
import type { BookingRequest } from "../../types/booking";

export interface WhatsAppInquiryOptions {
  customerName?: string;
  customerPhone?: string;
  pickupLocation?: string;
  destination?: string;
  tripType?: string;
  journeyType?: string;
  pickupDate?: string;
  pickupTime?: string;
  returnDate?: string;
  passengers?: number;
  luggage?: number;
  vehicleName?: string;
  tripPurpose?: string;
  additionalNotes?: string;
  customMessage?: string;
}

export function generateBookingWhatsAppMessage(
  booking: Partial<BookingRequest>,
): string {
  const tripTypeStr = booking.tripType
    ? `${booking.tripType}${booking.journeyType ? ` (${booking.journeyType})` : ""}`
    : "Chauffeur Rental";

  const pickupDateTime =
    booking.pickupDate && booking.pickupTime
      ? `${booking.pickupDate} at ${booking.pickupTime}`
      : booking.pickupDate || "Not specified";

  const returnDateTime = booking.returnDate
    ? booking.returnDate
    : booking.journeyType === "round-trip"
      ? "Not specified"
      : "N/A (One-way)";

  return `Hello Benaka Tours & Travels,

I would like to request a chauffeur-driven vehicle quotation.

Name: ${booking.customerName || "N/A"}
Mobile: ${booking.customerPhone || "N/A"}
Pickup: ${booking.pickupLocation || "N/A"}
Destination: ${booking.destination || "N/A"}
Trip type: ${tripTypeStr}
Pickup date and time: ${pickupDateTime}
Return date and time: ${returnDateTime}
Passengers: ${booking.passengers ?? 1}
Luggage: ${booking.luggage ?? 0}
Selected vehicle: ${booking.vehicleName || "Chauffeur Rental Vehicle"}
Trip purpose: ${booking.tripPurpose || "Personal"}
Additional requirements: ${booking.additionalNotes || "None"}

Please confirm availability and estimated fare.`;
}

export function createWhatsAppInquiryUrl(
  options: Partial<BookingRequest> & { customMessage?: string } = {},
): string {
  const number = BUSINESS_INFO.contact.whatsappNumber;

  if (options.customMessage) {
    return generateWhatsAppUrl(number, options.customMessage);
  }

  const message = generateBookingWhatsAppMessage(options);
  return generateWhatsAppUrl(number, message);
}
