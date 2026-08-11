export const PAYLOAD_VIEW_FLEET = "PAYLOAD_VIEW_FLEET";
export const PAYLOAD_CHECK_AVAILABILITY = "PAYLOAD_CHECK_AVAILABILITY";
export const PAYLOAD_PLAN_TRIP = "PAYLOAD_PLAN_TRIP";
export const PAYLOAD_CHAUFFEUR_INFO = "PAYLOAD_CHAUFFEUR_INFO";
export const PAYLOAD_LOCATION_INFO = "PAYLOAD_LOCATION_INFO";
export const PAYLOAD_WHATSAPP_CONTACT = "PAYLOAD_WHATSAPP_CONTACT";
export const PAYLOAD_CALL_NOW = "PAYLOAD_CALL_NOW";
export const PAYLOAD_REQUEST_QUOTE = "PAYLOAD_REQUEST_QUOTE";
export const PAYLOAD_RESET_CHAT = "PAYLOAD_RESET_CHAT";
// New payloads for Smart Travel Suite
export const PAYLOAD_TRIP_PLANNER = "PAYLOAD_TRIP_PLANNER";
export const PAYLOAD_COMPARE_VEHICLES = "PAYLOAD_COMPARE_VEHICLES";
export const PAYLOAD_MY_TRIPS = "PAYLOAD_MY_TRIPS";

export const WELCOME_QUICK_REPLIES = [
  { id: "qr-1", label: "🚗 View Vehicles", payload: PAYLOAD_VIEW_FLEET },
  {
    id: "qr-2",
    label: "🗺️ Plan a Trip",
    payload: PAYLOAD_TRIP_PLANNER,
  },
  { id: "qr-3", label: "⚖️ Compare Vehicles", payload: PAYLOAD_COMPARE_VEHICLES },
  {
    id: "qr-4",
    label: "📋 My Saved Trips",
    payload: PAYLOAD_MY_TRIPS,
  },
  {
    id: "qr-5",
    label: "👨‍✈️ Chauffeur Service",
    payload: PAYLOAD_CHAUFFEUR_INFO,
  },
  { id: "qr-6", label: "📍 Location", payload: PAYLOAD_LOCATION_INFO },
  { id: "qr-7", label: "💬 WhatsApp", payload: PAYLOAD_WHATSAPP_CONTACT },
  { id: "qr-8", label: "📞 Call Now", payload: PAYLOAD_CALL_NOW },
];
