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
    ? `${booking.tripType.charAt(0).toUpperCase()}${booking.tripType.slice(1)}`
    : "Chauffeur Rental";

  const journeyTypeStr =
    booking.journeyType === "round-trip" ? "Round Trip" : "One-Way";

  const pickupDateTime =
    booking.pickupDate && booking.pickupTime
      ? `${booking.pickupDate} at ${booking.pickupTime}`
      : booking.pickupDate || "Not specified";

  const returnInfo =
    booking.journeyType === "round-trip"
      ? booking.returnDate || "Not specified"
      : "N/A (One-Way)";

  const lines: string[] = [
    "Hello Benaka Tours & Travels 👋",
    "",
    "I would like to request a chauffeur-driven vehicle quotation.",
    "",
    `👤 Name: ${booking.customerName || "Guest"}`,
    `📞 Mobile: ${booking.customerPhone || "To be provided"}`,
    "",
    `📍 Pickup: ${booking.pickupLocation || "N/A"}`,
    `🏁 Destination: ${booking.destination || "N/A"}`,
    `🔁 Trip Type: ${tripTypeStr} (${journeyTypeStr})`,
    `📅 Travel Date & Time: ${pickupDateTime}`,
  ];

  if (booking.journeyType === "round-trip") {
    lines.push(`📅 Return Date: ${returnInfo}`);
  }

  lines.push(
    `👥 Passengers: ${booking.passengers ?? 1}`,
    `🧳 Luggage Bags: ${booking.luggage ?? 0}`,
    `🚘 Preferred Vehicle: ${booking.vehicleName || "Open to suggestion"}`,
    `🎯 Trip Purpose: ${booking.tripPurpose || "Personal"}`,
  );

  if (booking.additionalNotes) {
    lines.push(`📝 Additional Requirements: ${booking.additionalNotes}`);
  }

  lines.push(
    "",
    "Please confirm vehicle availability and provide an estimated fare for the above trip.",
    "",
    "Thank you 🙏",
  );

  return lines.join("\n");
}

export function createWhatsAppInquiryUrl(
  options: (Partial<BookingRequest> & { customMessage?: string }) | string = {},
): string {
  const number = BUSINESS_INFO.contact.whatsappNumber;

  if (typeof options === "string") {
    return generateWhatsAppUrl(number, options);
  }

  if (options.customMessage) {
    return generateWhatsAppUrl(number, options.customMessage);
  }

  const message = generateBookingWhatsAppMessage(options);
  return generateWhatsAppUrl(number, message);
}
