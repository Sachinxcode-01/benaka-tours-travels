export const PAYLOAD_VIEW_FLEET = "PAYLOAD_VIEW_FLEET";
export const PAYLOAD_CHECK_AVAILABILITY = "PAYLOAD_CHECK_AVAILABILITY";
export const PAYLOAD_PLAN_TRIP = "PAYLOAD_PLAN_TRIP";
export const PAYLOAD_CHAUFFEUR_INFO = "PAYLOAD_CHAUFFEUR_INFO";
export const PAYLOAD_LOCATION_INFO = "PAYLOAD_LOCATION_INFO";
export const PAYLOAD_WHATSAPP_CONTACT = "PAYLOAD_WHATSAPP_CONTACT";
export const PAYLOAD_CALL_NOW = "PAYLOAD_CALL_NOW";
export const PAYLOAD_REQUEST_QUOTE = "PAYLOAD_REQUEST_QUOTE";
export const PAYLOAD_RESET_CHAT = "PAYLOAD_RESET_CHAT";

export const WELCOME_QUICK_REPLIES = [
  { id: "qr-1", label: "🚗 View Vehicles", payload: PAYLOAD_VIEW_FLEET },
  {
    id: "qr-2",
    label: "📅 Check Availability",
    payload: PAYLOAD_CHECK_AVAILABILITY,
  },
  { id: "qr-3", label: "🛣️ Plan a Trip", payload: PAYLOAD_PLAN_TRIP },
  {
    id: "qr-4",
    label: "👨‍✈️ Chauffeur Service",
    payload: PAYLOAD_CHAUFFEUR_INFO,
  },
  { id: "qr-5", label: "📍 Location", payload: PAYLOAD_LOCATION_INFO },
  { id: "qr-6", label: "💬 WhatsApp", payload: PAYLOAD_WHATSAPP_CONTACT },
  { id: "qr-7", label: "📞 Call Now", payload: PAYLOAD_CALL_NOW },
];
