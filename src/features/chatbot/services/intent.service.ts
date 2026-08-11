import type {
  ExtractedEntities,
  IntentType,
  ParsedIntent,
} from "../model/chatbot.types";
import { KnowledgeService } from "../knowledge/knowledge.service";

const VEHICLE_ALIASES: Record<string, string> = {
  swift: "maruti-swift-dzire",
  dzire: "maruti-swift-dzire",
  aura: "hyundai-aura",
  ertiga: "maruti-ertiga",
  innova: "toyota-innova-crysta",
  crysta: "toyota-innova-crysta",
  toofan: "force-toofan-cruiser",
  cruiser: "force-toofan-cruiser",
  scorpio: "mahindra-scorpio",
  bolero: "mahindra-bolero",
  brezza: "maruti-brezza",
  vitara: "maruti-grand-vitara",
  "grand vitara": "maruti-grand-vitara",
  thar: "mahindra-thar",
  tempo: "tempo-traveller",
  traveller: "tempo-traveller",
  "tempo traveller": "tempo-traveller",
  bus: "25-seater-bus",
  "25 seater": "25-seater-bus",
  "25-seater": "25-seater-bus",
};

export class IntentService {
  public static parse(input: string): ParsedIntent {
    const rawText = input.trim();
    const lower = rawText.toLowerCase();

    const entities: ExtractedEntities = {};

    // 1. Extract Passenger Count
    const passengerMatch =
      lower.match(
        /(\d+)\s*(people|persons|passengers|pax|seats|members|guys)?/,
      ) || lower.match(/for\s*(\d+)/);

    if (passengerMatch) {
      const count = parseInt(passengerMatch[1], 10);
      if (!isNaN(count) && count > 0 && count <= 100) {
        entities.passengers = count;
      }
    }

    // 2. Extract Vehicle Mentioned
    for (const [alias, slug] of Object.entries(VEHICLE_ALIASES)) {
      if (lower.includes(alias)) {
        if (!entities.vehicleId) {
          entities.vehicleId = slug;
        } else if (entities.vehicleId !== slug && !entities.compareVehicleId) {
          entities.compareVehicleId = slug;
        }
      }
    }

    // 3. Extract Locations (Pickup / Destination)
    if (lower.includes("goa")) entities.destination = "Goa";
    if (lower.includes("bengaluru") || lower.includes("bangalore"))
      entities.destination = "Bengaluru";
    if (lower.includes("hubballi") || lower.includes("hubli"))
      entities.destination = "Hubballi";
    if (lower.includes("belagavi") || lower.includes("belgaum"))
      entities.destination = "Belagavi";
    if (lower.includes("gadag")) entities.pickup = "Gadag";

    // 4. Extract Category & Fuel Type
    if (lower.includes("sedan")) entities.category = "sedan";
    if (lower.includes("suv")) entities.category = "suv";
    if (lower.includes("muv")) entities.category = "muv";
    if (lower.includes("cng")) entities.fuelType = "cng";
    if (lower.includes("diesel")) entities.fuelType = "diesel";
    if (lower.includes("petrol")) entities.fuelType = "petrol";

    // 5. Intent Classification Rules
    let intent: IntentType = "unknown_question";
    let confidence = 0.5;

    // Greeting
    if (/^(hi|hello|hey|greetings|good morning|good evening)/i.test(lower)) {
      intent = "greeting";
      confidence = 0.95;
    }
    // Chauffeur / Self-drive (Highest priority business rule)
    else if (
      lower.includes("self drive") ||
      lower.includes("without driver") ||
      lower.includes("drive myself") ||
      lower.includes("own driver") ||
      lower.includes("does it come with driver") ||
      lower.includes("provide driver") ||
      lower.includes("chauffeur")
    ) {
      intent = "chauffeur";
      confidence = 0.99;
    }
    // Pricing
    else if (
      lower.includes("how much") ||
      lower.includes("price") ||
      lower.includes("cost") ||
      lower.includes("rate") ||
      lower.includes("per km") ||
      lower.includes("fare") ||
      lower.includes("tariff") ||
      lower.includes("charge")
    ) {
      intent = "pricing";
      confidence = 0.95;
    }
    // Vehicle Comparison
    else if (
      (entities.vehicleId && entities.compareVehicleId) ||
      lower.includes(" vs ") ||
      (lower.includes(" or ") &&
        (entities.vehicleId || lower.includes("better")))
    ) {
      if (entities.vehicleId && entities.compareVehicleId) {
        intent = "vehicle_comparison";
        confidence = 0.95;
      }
    }
    // Vehicle Availability
    else if (
      lower.includes("available") ||
      lower.includes("bookable") ||
      lower.includes("is thar available") ||
      lower.includes("is 25 seater available")
    ) {
      intent = "vehicle_availability";
      confidence = 0.9;
    }
    // Vehicle Capacity / Passenger Recommendation
    else if (
      entities.passengers !== undefined ||
      lower.includes("how many people") ||
      lower.includes("seating capacity") ||
      lower.includes("which vehicle is good") ||
      lower.includes("which vehicle is best") ||
      lower.includes("what is best for us") ||
      lower.includes("best for us") ||
      lower.includes("best for me") ||
      lower.includes("suitable") ||
      lower.includes("recommend")
    ) {
      if (entities.vehicleId && lower.includes("how many people")) {
        intent = "vehicle_capacity";
      } else {
        intent = "vehicle_recommendation";
      }
      confidence = 0.9;
    }
    // Vehicle Details / Fleet List
    else if (
      lower.includes("which cars") ||
      lower.includes("show all vehicles") ||
      lower.includes("fleet") ||
      lower.includes("all cars") ||
      lower.includes("biggest vehicle") ||
      lower.includes("smallest car")
    ) {
      intent = "fleet_list";
      confidence = 0.9;
    } else if (entities.vehicleId && !lower.includes("book")) {
      intent = "vehicle_details";
      confidence = 0.85;
    }
    // Location / Address
    else if (
      lower.includes("where are you") ||
      lower.includes("located") ||
      lower.includes("address") ||
      lower.includes("location") ||
      lower.includes("office")
    ) {
      intent = "location";
      confidence = 0.95;
    }
    // Operating Hours
    else if (
      lower.includes("time") ||
      lower.includes("hours") ||
      lower.includes("open") ||
      lower.includes("sunday") ||
      lower.includes("operating")
    ) {
      intent = "operating_hours";
      confidence = 0.95;
    }
    // Contact Info (Phone / WhatsApp / Email)
    else if (
      lower.includes("phone") ||
      lower.includes("call") ||
      lower.includes("mobile")
    ) {
      intent = "phone";
      confidence = 0.95;
    } else if (lower.includes("whatsapp")) {
      intent = "whatsapp";
      confidence = 0.95;
    } else if (lower.includes("email") || lower.includes("mail")) {
      intent = "email";
      confidence = 0.95;
    }
    // Services
    else if (
      lower.includes("wedding") ||
      lower.includes("corporate") ||
      lower.includes("outstation") ||
      lower.includes("pickup") ||
      lower.includes("drop") ||
      lower.includes("doorstep")
    ) {
      intent = "services";
      confidence = 0.85;
    }
    // Trip Planning / Booking
    else if (
      lower.includes("book") ||
      lower.includes("reserve") ||
      lower.includes("plan a trip") ||
      lower.includes("need a car tomorrow") ||
      lower.includes("quote")
    ) {
      intent = "trip_planning";
      confidence = 0.9;
    }
    // FAQ
    else {
      const faqs = KnowledgeService.searchFAQs(lower);
      if (faqs.length > 0) {
        intent = "faq";
        confidence = 0.8;
      }
    }

    return {
      intent,
      confidence,
      entities,
      rawText,
    };
  }
}
