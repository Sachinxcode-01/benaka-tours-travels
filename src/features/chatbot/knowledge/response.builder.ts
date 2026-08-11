import type { ChatMessage, ConversationContext } from "../model/chatbot.types";
import { KnowledgeService } from "./knowledge.service";
import {
  PAYLOAD_VIEW_FLEET,
  PAYLOAD_CHECK_AVAILABILITY,
  PAYLOAD_PLAN_TRIP,
  PAYLOAD_WHATSAPP_CONTACT,
  PAYLOAD_CALL_NOW,
  PAYLOAD_REQUEST_QUOTE,
  WELCOME_QUICK_REPLIES,
} from "../model/intents";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import type { Vehicle } from "@entities/vehicle";

export class ResponseBuilder {
  public static buildGreetingResponse(): ChatMessage {
    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text: "Hi 👋 Welcome to Benaka Tours & Travels.\n\nI can help you with vehicles, seating capacity, availability, chauffeur service, trip planning, bookings, location and contact information.\n\nHow can I help with your journey?",
      timestamp: Date.now(),
      quickReplies: WELCOME_QUICK_REPLIES,
    };
  }

  public static buildChauffeurResponse(): ChatMessage {
    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text: "All Benaka Tours & Travels rentals are 100% chauffeur-driven by our certified, uniformed professional drivers.\n\nSelf-drive vehicles are strictly NOT provided under any circumstances to ensure customer safety, vehicle maintenance standards, and zero customer damage liability.",
      timestamp: Date.now(),
      quickReplies: [
        { id: "qr-c1", label: "🚗 View Fleet", payload: PAYLOAD_VIEW_FLEET },
        {
          id: "qr-c2",
          label: "💬 WhatsApp Us",
          payload: PAYLOAD_WHATSAPP_CONTACT,
        },
      ],
      actions: [
        {
          id: "act-c1",
          label: "Book Chauffeur Trip on WhatsApp",
          type: "whatsapp",
          url: createWhatsAppInquiryUrl(
            "Hello Benaka, I would like to inquire about a chauffeur-driven rental.",
          ),
        },
      ],
    };
  }

  public static buildPricingResponse(vehicle?: Vehicle): ChatMessage {
    const vehText = vehicle ? ` for ${vehicle.name}` : "";
    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text: `Benaka Tours & Travels provides trip-specific quotations${vehText} based on destination, distance, duration, vehicle type and travel requirements.\n\nWe do not publish fixed static rates because every journey is customized. Share your trip details and I can prepare a WhatsApp quote request for our team.`,
      timestamp: Date.now(),
      quickReplies: [
        {
          id: "qr-p1",
          label: "📝 Request Quote",
          payload: PAYLOAD_REQUEST_QUOTE,
        },
        {
          id: "qr-p2",
          label: "💬 WhatsApp Quote",
          payload: PAYLOAD_WHATSAPP_CONTACT,
        },
        { id: "qr-p3", label: "📞 Call Now", payload: PAYLOAD_CALL_NOW },
      ],
      actions: [
        {
          id: "act-p1",
          label: "Request Fare Quote on WhatsApp",
          type: "whatsapp",
          url: createWhatsAppInquiryUrl(
            "Hello Benaka, I would like to request a fare quotation for my trip.",
          ),
        },
        {
          id: "act-p2",
          label: "Call Support Directly",
          type: "call",
          url: createTelUrl(),
        },
      ],
    };
  }

  public static buildFleetListResponse(): ChatMessage {
    const vehicles = KnowledgeService.getAllVehicles();
    const listStr = vehicles
      .map(
        (v) =>
          `• ${v.name} (${v.seats} Seats, ${v.category.toUpperCase()}, ${v.fuelTypes.join("/")})`,
      )
      .join("\n");

    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text: `Here is our complete 12-vehicle fleet list:\n\n${listStr}\n\nAll rentals are 100% chauffeur-driven. Which vehicle would you like to know more about?`,
      timestamp: Date.now(),
      quickReplies: [
        {
          id: "qr-f1",
          label: "Toyota Innova Crysta",
          payload: "INNOVA_DETAILS",
        },
        { id: "qr-f2", label: "Maruti Ertiga", payload: "ERTIGA_DETAILS" },
        {
          id: "qr-f3",
          label: "Tempo Traveller (13)",
          payload: "TEMPO_DETAILS",
        },
        { id: "qr-f4", label: "25-Seater Bus", payload: "BUS_DETAILS" },
      ],
    };
  }

  public static buildVehicleDetailsResponse(vehicle: Vehicle): ChatMessage {
    const fuel = vehicle.fuelTypes.join(", ");
    const features = vehicle.features.join(", ");
    const usage = vehicle.recommendedFor.join(", ");
    const avail = vehicle.availability.toUpperCase();

    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text:
        `🚗 **${vehicle.name}**\n\n` +
        `• Category: ${vehicle.category.toUpperCase()}\n` +
        `• Seating Capacity: ${vehicle.seats} Passengers\n` +
        `• Fuel Type: ${fuel}\n` +
        `• Key Features: ${features}\n` +
        `• Recommended For: ${usage}\n` +
        `• Status: ${avail}\n` +
        `• Chauffeur Included: 100% Yes`,
      timestamp: Date.now(),
      quickReplies: [
        {
          id: "qr-vd1",
          label: `Book ${vehicle.name}`,
          payload: `BOOK_${vehicle.slug}`,
        },
        {
          id: "qr-vd2",
          label: "Check Availability",
          payload: PAYLOAD_CHECK_AVAILABILITY,
        },
        {
          id: "qr-vd3",
          label: "💬 Inquire on WhatsApp",
          payload: PAYLOAD_WHATSAPP_CONTACT,
        },
      ],
      actions: [
        {
          id: "act-vd1",
          label: `Inquire ${vehicle.name} on WhatsApp`,
          type: "whatsapp",
          url: createWhatsAppInquiryUrl(
            `Hello Benaka, I would like to book ${vehicle.name} (${vehicle.seats} Seats).`,
          ),
        },
      ],
    };
  }

  public static buildVehicleRecommendationResponse(
    passengers: number,
    _context: ConversationContext,
  ): ChatMessage {
    const { suitable, upgrade, overCapacity } =
      KnowledgeService.recommendVehiclesForPassengers(passengers);

    if (overCapacity) {
      return {
        id: `msg-${Date.now()}`,
        sender: "bot",
        text:
          `For ${passengers} passengers, a single vehicle exceeds our maximum 25-seater bus capacity.\n\n` +
          `We can arrange multiple vehicles (e.g. 2 Tempo Travellers or multiple SUVs/sedans) for your travel. Please contact our team on WhatsApp or Call for a custom multi-vehicle package.`,
        timestamp: Date.now(),
        quickReplies: [
          {
            id: "qr-rec-over1",
            label: "💬 WhatsApp Us",
            payload: PAYLOAD_WHATSAPP_CONTACT,
          },
          {
            id: "qr-rec-over2",
            label: "📞 Call Now",
            payload: PAYLOAD_CALL_NOW,
          },
        ],
      };
    }

    const suitableNames = suitable
      .map((v) => `${v.name} (${v.seats} Seats)`)
      .join(", ");
    let text = `For ${passengers} passengers, suitable options in our fleet include: ${suitableNames}.`;

    if (upgrade) {
      text += `\n\nIf you want enhanced executive comfort and extra luggage space, Toyota Innova Crysta is a highly recommended option.`;
    }

    const firstVehicle = suitable[0];

    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text,
      timestamp: Date.now(),
      isVehicleRecommendation: true,
      quickReplies: [
        {
          id: "qr-rec1",
          label: `Book ${firstVehicle.name}`,
          payload: `BOOK_${firstVehicle.slug}`,
        },
        { id: "qr-rec2", label: "🛣️ Plan Trip", payload: PAYLOAD_PLAN_TRIP },
        {
          id: "qr-rec3",
          label: "💬 WhatsApp Quote",
          payload: PAYLOAD_WHATSAPP_CONTACT,
        },
      ],
      actions: [
        {
          id: "act-rec1",
          label: "Request WhatsApp Quotation",
          type: "whatsapp",
          url: createWhatsAppInquiryUrl(
            `Hello Benaka, we are ${passengers} passengers and would like to request a quotation.`,
          ),
        },
      ],
    };
  }

  public static buildVehicleComparisonResponse(
    v1Name: string,
    v2Name: string,
  ): ChatMessage {
    const { vehicle1, vehicle2 } = KnowledgeService.compareVehicles(
      v1Name,
      v2Name,
    );

    if (!vehicle1 || !vehicle2) {
      return this.buildFleetListResponse();
    }

    const text =
      `🔍 **Vehicle Comparison: ${vehicle1.name} vs ${vehicle2.name}**\n\n` +
      `**${vehicle1.name}**:\n` +
      `• Seats: ${vehicle1.seats}\n` +
      `• Category: ${vehicle1.category.toUpperCase()}\n` +
      `• Fuel: ${vehicle1.fuelTypes.join("/")}\n` +
      `• Status: ${vehicle1.availability.toUpperCase()}\n\n` +
      `**${vehicle2.name}**:\n` +
      `• Seats: ${vehicle2.seats}\n` +
      `• Category: ${vehicle2.category.toUpperCase()}\n` +
      `• Fuel: ${vehicle2.fuelTypes.join("/")}\n` +
      `• Status: ${vehicle2.availability.toUpperCase()}\n\n` +
      `💡 **Recommendation**: For smaller groups looking for economy, ${vehicle1.seats <= vehicle2.seats ? vehicle1.name : vehicle2.name} is ideal. For larger space or premium comfort, choose ${vehicle1.seats >= vehicle2.seats ? vehicle1.name : vehicle2.name}.`;

    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text,
      timestamp: Date.now(),
      quickReplies: [
        {
          id: "qr-comp1",
          label: `Book ${vehicle1.name}`,
          payload: `BOOK_${vehicle1.slug}`,
        },
        {
          id: "qr-comp2",
          label: `Book ${vehicle2.name}`,
          payload: `BOOK_${vehicle2.slug}`,
        },
      ],
    };
  }

  public static buildVehicleAvailabilityResponse(
    vehicle?: Vehicle,
  ): ChatMessage {
    if (!vehicle) {
      const all = KnowledgeService.getAllVehicles();
      const avail = all
        .filter((v) => v.availability === "available")
        .map((v) => v.name)
        .join(", ");
      return {
        id: `msg-${Date.now()}`,
        sender: "bot",
        text: `Currently available vehicles: ${avail}.\n\nPlease share your travel dates to confirm final availability.`,
        timestamp: Date.now(),
        quickReplies: [
          { id: "qr-av1", label: "🛣️ Plan a Trip", payload: PAYLOAD_PLAN_TRIP },
          {
            id: "qr-av2",
            label: "💬 Inquire on WhatsApp",
            payload: PAYLOAD_WHATSAPP_CONTACT,
          },
        ],
      };
    }

    let statusText = "";
    if (vehicle.availability === "available") {
      statusText = `${vehicle.name} is currently marked available. Final availability should be confirmed for your travel date.`;
    } else if (vehicle.availability === "booked") {
      statusText = `${vehicle.name} is currently marked booked. I can help you find a suitable alternative in our fleet.`;
    } else {
      statusText = `${vehicle.name} is currently unavailable due to maintenance. I can suggest another vehicle for your trip.`;
    }

    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text: statusText,
      timestamp: Date.now(),
      quickReplies: [
        {
          id: "qr-av3",
          label: "🚗 View All Vehicles",
          payload: PAYLOAD_VIEW_FLEET,
        },
        {
          id: "qr-av4",
          label: "💬 Inquire on WhatsApp",
          payload: PAYLOAD_WHATSAPP_CONTACT,
        },
      ],
    };
  }

  public static buildBusinessInfoResponse(
    topic: "location" | "hours" | "phone" | "whatsapp" | "email",
  ): ChatMessage {
    const info = KnowledgeService.getBusinessInfo();

    switch (topic) {
      case "location":
        return {
          id: `msg-${Date.now()}`,
          sender: "bot",
          text: `📍 **BENAKA TOURS AND TRAVELS Location**:\n\nOur main hub is located at ${info.contact.address}.\n\nDoorstep pickup and drop service is available anywhere in Gadag, Hubballi, Dharwad, and nearby regions.`,
          timestamp: Date.now(),
          actions: [
            {
              id: "act-[#1]",
              label: "Open Google Maps Location",
              type: "map",
              url: info.contact.mapsUrl,
            },
          ],
        };

      case "hours":
        return {
          id: `msg-${Date.now()}`,
          sender: "bot",
          text: `⏰ **Operating Hours**:\n\nWe operate 24 hours a day, 7 days a week (24/7). You can contact us for urgent trip requests, flight pickups, or emergency travel at any hour.`,
          timestamp: Date.now(),
        };

      case "phone":
        return {
          id: `msg-${Date.now()}`,
          sender: "bot",
          text: `📞 **Contact Phone Number**:\n\nYou can call Benaka Tours & Travels directly at ${info.contact.phoneDisplay}. Available 24/7 for instant trip booking and assistance.`,
          timestamp: Date.now(),
          actions: [
            {
              id: "act-ph1",
              label: `Call ${info.contact.phoneDisplay}`,
              type: "call",
              url: createTelUrl(),
            },
          ],
        };

      case "whatsapp":
        return {
          id: `msg-${Date.now()}`,
          sender: "bot",
          text: `💬 **WhatsApp Assistance**:\n\nChat with us directly on WhatsApp for instant custom quotations, vehicle photos, and booking confirmations.`,
          timestamp: Date.now(),
          actions: [
            {
              id: "act-wa1",
              label: "Open Direct WhatsApp Chat",
              type: "whatsapp",
              url: createWhatsAppInquiryUrl(
                "Hello Benaka Tours & Travels, I need assistance with a vehicle rental.",
              ),
            },
          ],
        };

      case "email":
        return {
          id: `msg-${Date.now()}`,
          sender: "bot",
          text: `✉️ **Email Support**:\n\nYou can email us at ${info.contact.email} for corporate tie-ups, marriage fleet inquiries, or long-term rentals.`,
          timestamp: Date.now(),
        };
    }
  }

  public static buildServicesResponse(): ChatMessage {
    const services = KnowledgeService.getAllServices();
    const listStr = services
      .map((s) => `• **${s.title}**: ${s.description}`)
      .join("\n\n");

    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text: `🛠️ **Our Chauffeur Travel Services**:\n\n${listStr}\n\nAll services include certified drivers and doorstep pickup.`,
      timestamp: Date.now(),
      quickReplies: [
        {
          id: "qr-s1",
          label: "🛣️ Outstation Trips",
          payload: "SRV_OUTSTATION",
        },
        { id: "qr-s2", label: "💒 Wedding Fleet", payload: "SRV_WEDDING" },
        {
          id: "qr-s3",
          label: "💬 Inquire on WhatsApp",
          payload: PAYLOAD_WHATSAPP_CONTACT,
        },
      ],
    };
  }

  public static buildTripPlanningResponse(
    context: ConversationContext,
  ): ChatMessage {
    const pickup = context.pickup || "Gadag";
    const dest = context.destination || "your destination";
    const pax = context.passengers || 4;
    const vehName = context.selectedVehicleName || "Chauffeur Vehicle";

    const summaryText =
      `Ready to request your quotation:\n\n` +
      `• Pickup: ${pickup}\n` +
      `• Destination: ${dest}\n` +
      `• Travel Date: ${context.travelDate || "To be confirmed"}\n` +
      `• Passengers: ${pax}\n` +
      `• Vehicle Preference: ${vehName}\n` +
      `• Driver Policy: 100% Chauffeur-Driven Included`;

    const waMsg =
      `Hello Benaka Tours & Travels,\n\n` +
      `I would like to request a chauffeur-driven vehicle quotation.\n\n` +
      `Name: ${context.customerName || "Customer"}\n` +
      `Phone: ${context.customerPhone || "Provided on chat"}\n` +
      `Pickup: ${pickup}\n` +
      `Destination: ${dest}\n` +
      `Travel date: ${context.travelDate || "As discussed"}\n` +
      `Passengers: ${pax}\n` +
      `Preferred vehicle: ${vehName}\n\n` +
      `Please confirm availability and estimated fare.`;

    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text: summaryText,
      timestamp: Date.now(),
      bookingSummary: {
        customerName: context.customerName,
        customerPhone: context.customerPhone,
        pickup,
        destination: dest,
        travelDate: context.travelDate,
        passengers: pax,
        vehicleName: vehName,
        tripType: context.tripType || "Outstation Trip",
      },
      actions: [
        {
          id: "act-tp1",
          label: "Send to WhatsApp for Quotation",
          type: "whatsapp",
          url: createWhatsAppInquiryUrl(waMsg),
        },
        {
          id: "act-tp2",
          label: "Call Driver Support",
          type: "call",
          url: createTelUrl(),
        },
      ],
    };
  }

  public static buildTripPlannerNavigationResponse(): ChatMessage {
    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text: "🗺️ **Smart Trip Planner**\n\nUse our interactive Trip Planner to enter your route, passenger count, travel dates, and luggage requirements. Our recommendation engine will suggest the best chauffeur-driven vehicles for your trip.",
      timestamp: Date.now(),
      quickReplies: [
        { id: "qr-tp-nav", label: "🚗 View Vehicles", payload: PAYLOAD_VIEW_FLEET },
        { id: "qr-tp-wa", label: "💬 WhatsApp Quote", payload: PAYLOAD_WHATSAPP_CONTACT },
      ],
      actions: [
        {
          id: "act-tp-launch",
          label: "Open Smart Trip Planner",
          type: "whatsapp",
          url: "/trip-planner",
        },
      ],
    };
  }

  public static buildVehicleComparisonNavResponse(): ChatMessage {
    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text: "⚖️ **Vehicle Comparison Tool**\n\nCompare up to 3 vehicles side by side on seating capacity, category, fuel type, features, and best-use recommendations.",
      timestamp: Date.now(),
      quickReplies: [
        { id: "qr-vc-fl", label: "🚗 View Fleet", payload: PAYLOAD_VIEW_FLEET },
        { id: "qr-vc-tp", label: "🗺️ Trip Planner", payload: PAYLOAD_PLAN_TRIP },
      ],
      actions: [
        {
          id: "act-vc-launch",
          label: "Open Vehicle Comparison",
          type: "whatsapp",
          url: "/compare",
        },
      ],
    };
  }

  public static buildMyTripsNavResponse(): ChatMessage {
    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text: "📋 **My Saved Trips**\n\nView your recent and saved trip requests, re-book previously planned routes, or generate new WhatsApp quotes.",
      timestamp: Date.now(),
      quickReplies: [
        { id: "qr-mt-tp", label: "🗺️ Plan New Trip", payload: PAYLOAD_PLAN_TRIP },
        { id: "qr-mt-fl", label: "🚗 View Fleet", payload: PAYLOAD_VIEW_FLEET },
      ],
      actions: [
        {
          id: "act-mt-launch",
          label: "Open My Saved Trips",
          type: "whatsapp",
          url: "/saved-trips",
        },
      ],
    };
  }

  public static buildFallbackResponse(): ChatMessage {
    return {
      id: `msg-${Date.now()}`,
      sender: "bot",
      text: "I don't have verified information about that specific query yet, but Benaka Tours & Travels can help you directly.\n\nPlease contact our 24/7 team via WhatsApp or phone call for immediate assistance.",
      timestamp: Date.now(),
      quickReplies: [
        {
          id: "qr-fb1",
          label: "💬 WhatsApp Support",
          payload: PAYLOAD_WHATSAPP_CONTACT,
        },
        { id: "qr-fb2", label: "📞 Call Now", payload: PAYLOAD_CALL_NOW },
        {
          id: "qr-fb3",
          label: "🚗 View Vehicles",
          payload: PAYLOAD_VIEW_FLEET,
        },
      ],
      actions: [
        {
          id: "act-fb1",
          label: "Chat with Support on WhatsApp",
          type: "whatsapp",
          url: createWhatsAppInquiryUrl(
            "Hello Benaka, I have a question regarding travel rentals.",
          ),
        },
      ],
    };
  }
}

