export type Sender = "user" | "bot";

export interface QuickReply {
  id: string;
  label: string;
  payload: string;
  icon?: string;
}

export interface ChatAction {
  id: string;
  label: string;
  type: "whatsapp" | "call" | "quote" | "map" | "custom";
  url?: string;
  actionId?: string;
}

export interface BookingSummaryData {
  customerName?: string;
  customerPhone?: string;
  pickup?: string;
  destination?: string;
  travelDate?: string;
  returnDate?: string;
  passengers?: number;
  vehicleName?: string;
  tripType?: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  timestamp: number;
  quickReplies?: QuickReply[];
  actions?: ChatAction[];
  bookingSummary?: BookingSummaryData;
  isVehicleRecommendation?: boolean;
}

export interface ConversationContext {
  passengers?: number;
  pickup?: string;
  destination?: string;
  travelDate?: string;
  returnDate?: string;
  selectedVehicleId?: string;
  selectedVehicleName?: string;
  tripType?: string;
  customerName?: string;
  customerPhone?: string;
  lastIntent?: string;
}

export type IntentType =
  | "greeting"
  | "fleet_list"
  | "vehicle_details"
  | "vehicle_capacity"
  | "vehicle_recommendation"
  | "vehicle_comparison"
  | "vehicle_availability"
  | "pricing"
  | "chauffeur"
  | "services"
  | "booking"
  | "trip_planning"
  | "location"
  | "operating_hours"
  | "phone"
  | "whatsapp"
  | "email"
  | "faq"
  | "reviews"
  | "unknown_question";

export interface ExtractedEntities {
  vehicleId?: string;
  compareVehicleId?: string;
  passengers?: number;
  location?: string;
  pickup?: string;
  destination?: string;
  date?: string;
  tripType?: string;
  name?: string;
  phone?: string;
  fuelType?: string;
  category?: string;
  faqKey?: string;
  serviceKey?: string;
}

export interface ParsedIntent {
  intent: IntentType;
  confidence: number;
  entities: ExtractedEntities;
  rawText: string;
}
