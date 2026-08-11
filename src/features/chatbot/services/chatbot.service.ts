import type { ChatMessage, ConversationContext } from "../model/chatbot.types";
import { IntentService } from "./intent.service";
import { ResponseBuilder } from "../knowledge/response.builder";
import { KnowledgeService } from "../knowledge/knowledge.service";
import { updateContextWithEntities } from "../model/conversation-context";
import {
  PAYLOAD_VIEW_FLEET,
  PAYLOAD_CHECK_AVAILABILITY,
  PAYLOAD_PLAN_TRIP,
  PAYLOAD_CHAUFFEUR_INFO,
  PAYLOAD_LOCATION_INFO,
  PAYLOAD_WHATSAPP_CONTACT,
  PAYLOAD_CALL_NOW,
  PAYLOAD_REQUEST_QUOTE,
  PAYLOAD_TRIP_PLANNER,
  PAYLOAD_COMPARE_VEHICLES,
  PAYLOAD_MY_TRIPS,
} from "../model/intents";

export class ChatbotService {
  public static processUserMessage(
    userText: string,
    currentContext: ConversationContext,
  ): { botResponse: ChatMessage; newContext: ConversationContext } {
    // 1. Parse Intent & Entities
    const parsed = IntentService.parse(userText);
    const newContext = updateContextWithEntities(
      currentContext,
      parsed.entities,
    );

    let botResponse: ChatMessage;

    // 2. Route by Intent
    switch (parsed.intent) {
      case "greeting":
        botResponse = ResponseBuilder.buildGreetingResponse();
        break;

      case "chauffeur":
        botResponse = ResponseBuilder.buildChauffeurResponse();
        break;

      case "pricing": {
        const vehicle = parsed.entities.vehicleId
          ? KnowledgeService.findVehicleByName(parsed.entities.vehicleId)
          : undefined;
        botResponse = ResponseBuilder.buildPricingResponse(vehicle);
        break;
      }

      case "fleet_list":
        botResponse = ResponseBuilder.buildFleetListResponse();
        break;

      case "vehicle_details": {
        const vehicle = parsed.entities.vehicleId
          ? KnowledgeService.findVehicleByName(parsed.entities.vehicleId)
          : undefined;
        if (vehicle) {
          newContext.selectedVehicleId = vehicle.id;
          newContext.selectedVehicleName = vehicle.name;
          botResponse = ResponseBuilder.buildVehicleDetailsResponse(vehicle);
        } else {
          botResponse = ResponseBuilder.buildFleetListResponse();
        }
        break;
      }

      case "vehicle_capacity":
      case "vehicle_recommendation": {
        const pax = newContext.passengers || parsed.entities.passengers || 4;
        newContext.passengers = pax;
        botResponse = ResponseBuilder.buildVehicleRecommendationResponse(
          pax,
          newContext,
        );
        break;
      }

      case "vehicle_comparison": {
        const v1 = parsed.entities.vehicleId || "innova";
        const v2 = parsed.entities.compareVehicleId || "ertiga";
        botResponse = ResponseBuilder.buildVehicleComparisonResponse(v1, v2);
        break;
      }

      case "vehicle_availability": {
        const vehicle = parsed.entities.vehicleId
          ? KnowledgeService.findVehicleByName(parsed.entities.vehicleId)
          : undefined;
        botResponse = ResponseBuilder.buildVehicleAvailabilityResponse(vehicle);
        break;
      }

      case "location":
        botResponse = ResponseBuilder.buildBusinessInfoResponse("location");
        break;

      case "operating_hours":
        botResponse = ResponseBuilder.buildBusinessInfoResponse("hours");
        break;

      case "phone":
        botResponse = ResponseBuilder.buildBusinessInfoResponse("phone");
        break;

      case "whatsapp":
        botResponse = ResponseBuilder.buildBusinessInfoResponse("whatsapp");
        break;

      case "email":
        botResponse = ResponseBuilder.buildBusinessInfoResponse("email");
        break;

      case "services":
        botResponse = ResponseBuilder.buildServicesResponse();
        break;

      case "trip_planning":
      case "booking":
        botResponse = ResponseBuilder.buildTripPlanningResponse(newContext);
        break;

      case "faq": {
        const faqs = KnowledgeService.searchFAQs(userText);
        if (faqs.length > 0) {
          botResponse = {
            id: `msg-${Date.now()}`,
            sender: "bot",
            text: `❓ **${faqs[0].question}**\n\n${faqs[0].answer}`,
            timestamp: Date.now(),
            quickReplies: [
              {
                id: "qr-faq1",
                label: "💬 Inquire on WhatsApp",
                payload: PAYLOAD_WHATSAPP_CONTACT,
              },
              {
                id: "qr-faq2",
                label: "📞 Call Support",
                payload: PAYLOAD_CALL_NOW,
              },
            ],
          };
        } else {
          botResponse = ResponseBuilder.buildFallbackResponse();
        }
        break;
      }

      default:
        botResponse = ResponseBuilder.buildFallbackResponse();
        break;
    }

    return { botResponse, newContext };
  }

  public static processQuickReply(
    payload: string,
    currentContext: ConversationContext,
  ): { botResponse: ChatMessage; newContext: ConversationContext } {
    let botResponse: ChatMessage;
    const newContext = { ...currentContext };

    if (payload.startsWith("BOOK_")) {
      const slug = payload.replace("BOOK_", "");
      const vehicle = KnowledgeService.findVehicleByName(slug);
      if (vehicle) {
        newContext.selectedVehicleId = vehicle.id;
        newContext.selectedVehicleName = vehicle.name;
      }
      botResponse = ResponseBuilder.buildTripPlanningResponse(newContext);
      return { botResponse, newContext };
    }

    switch (payload) {
      case PAYLOAD_VIEW_FLEET:
        botResponse = ResponseBuilder.buildFleetListResponse();
        break;

      case PAYLOAD_CHECK_AVAILABILITY:
        botResponse = ResponseBuilder.buildVehicleAvailabilityResponse();
        break;

      case PAYLOAD_CHAUFFEUR_INFO:
        botResponse = ResponseBuilder.buildChauffeurResponse();
        break;

      case PAYLOAD_LOCATION_INFO:
        botResponse = ResponseBuilder.buildBusinessInfoResponse("location");
        break;

      case PAYLOAD_WHATSAPP_CONTACT:
        botResponse = ResponseBuilder.buildBusinessInfoResponse("whatsapp");
        break;

      case PAYLOAD_CALL_NOW:
        botResponse = ResponseBuilder.buildBusinessInfoResponse("phone");
        break;

      case PAYLOAD_REQUEST_QUOTE:
      case PAYLOAD_PLAN_TRIP:
      case PAYLOAD_TRIP_PLANNER:
        botResponse = ResponseBuilder.buildTripPlannerNavigationResponse();
        break;

      case PAYLOAD_COMPARE_VEHICLES:
        botResponse = ResponseBuilder.buildVehicleComparisonNavResponse();
        break;

      case PAYLOAD_MY_TRIPS:
        botResponse = ResponseBuilder.buildMyTripsNavResponse();
        break;

      default:
        botResponse = ResponseBuilder.buildFallbackResponse();
        break;
    }

    return { botResponse, newContext };
  }
}
