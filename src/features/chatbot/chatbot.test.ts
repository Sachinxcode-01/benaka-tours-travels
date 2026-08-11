import { describe, it, expect } from "vitest";
import { KnowledgeService } from "./knowledge/knowledge.service";
import { IntentService } from "./services/intent.service";
import { ChatbotService } from "./services/chatbot.service";
import { INITIAL_CONVERSATION_CONTEXT } from "./model/conversation-context";

describe("Benaka Chatbot & Knowledge Engine", () => {
  it("should retrieve all 12 verified fleet vehicles without duplicating data", () => {
    const vehicles = KnowledgeService.getAllVehicles();
    expect(vehicles).toHaveLength(12);
    expect(vehicles[0].name).toBe("Maruti Swift Dzire");
    expect(vehicles[3].name).toBe("Toyota Innova Crysta");
    expect(vehicles[11].name).toBe("25-Seater Bus");
  });

  it("should enforce 100% chauffeur policy and refuse self-drive inquiries", () => {
    const parsed = IntentService.parse(
      "Can I drive the vehicle myself without driver?",
    );
    expect(parsed.intent).toBe("chauffeur");

    const { botResponse } = ChatbotService.processUserMessage(
      "Can I drive myself?",
      INITIAL_CONVERSATION_CONTEXT,
    );

    expect(botResponse.text).toContain("100% chauffeur-driven");
    expect(botResponse.text).toContain(
      "Self-drive vehicles are strictly NOT provided",
    );
  });

  it("should recommend vehicles based on passenger count without offering under-capacity vehicles", () => {
    const { suitable, overCapacity } =
      KnowledgeService.recommendVehiclesForPassengers(7);
    expect(overCapacity).toBe(false);
    expect(suitable.length).toBeGreaterThan(0);
    // Every recommended vehicle must have seats >= 7
    suitable.forEach((v) => {
      expect(v.seats).toBeGreaterThanOrEqual(7);
    });
  });

  it("should suggest contacting Benaka for groups exceeding 25 passengers", () => {
    const { overCapacity } =
      KnowledgeService.recommendVehiclesForPassengers(30);
    expect(overCapacity).toBe(true);

    const { botResponse } = ChatbotService.processUserMessage(
      "We are 30 people.",
      INITIAL_CONVERSATION_CONTEXT,
    );
    expect(botResponse.text).toContain(
      "exceeds our maximum 25-seater bus capacity",
    );
  });

  it("should handle vehicle comparison accurately using real entity data", () => {
    const parsed = IntentService.parse("Innova vs Ertiga");
    expect(parsed.intent).toBe("vehicle_comparison");

    const { botResponse } = ChatbotService.processUserMessage(
      "Innova vs Ertiga",
      INITIAL_CONVERSATION_CONTEXT,
    );

    expect(botResponse.text).toContain("Toyota Innova Crysta");
    expect(botResponse.text).toContain("Maruti Ertiga");
    expect(botResponse.text).toContain("Seats: 8");
    expect(botResponse.text).toContain("Seats: 7");
  });

  it("should report availability according to centralized backend status", () => {
    const bus = KnowledgeService.findVehicleByName("25-Seater Bus");
    expect(bus?.availability).toBe("booked");

    const { botResponse } = ChatbotService.processUserMessage(
      "Is the 25 seater available?",
      INITIAL_CONVERSATION_CONTEXT,
    );

    expect(botResponse.text).toContain("currently marked booked");
  });

  it("should refuse static pricing and offer a WhatsApp quotation handoff", () => {
    const parsed = IntentService.parse("How much does Innova cost per km?");
    expect(parsed.intent).toBe("pricing");

    const { botResponse } = ChatbotService.processUserMessage(
      "How much does Innova cost?",
      INITIAL_CONVERSATION_CONTEXT,
    );

    expect(botResponse.text).toContain("trip-specific quotations");
    expect(botResponse.actions).toBeDefined();
    expect(botResponse.actions?.[0].type).toBe("whatsapp");
  });

  it("should answer location, hours, and contact details accurately", () => {
    const locRes = ChatbotService.processUserMessage(
      "Where are you located?",
      INITIAL_CONVERSATION_CONTEXT,
    );
    expect(locRes.botResponse.text).toContain(
      "Panchaxari Nagar 5th Cross, Gadag",
    );

    const hoursRes = ChatbotService.processUserMessage(
      "What time are you open?",
      INITIAL_CONVERSATION_CONTEXT,
    );
    expect(hoursRes.botResponse.text).toContain(
      "24 hours a day, 7 days a week",
    );

    const phoneRes = ChatbotService.processUserMessage(
      "What is your phone number?",
      INITIAL_CONVERSATION_CONTEXT,
    );
    expect(phoneRes.botResponse.text).toContain("+91 63624 16120");
  });

  it("should retain context like passenger count across messages", () => {
    const step1 = ChatbotService.processUserMessage(
      "We are 8 people",
      INITIAL_CONVERSATION_CONTEXT,
    );
    expect(step1.newContext.passengers).toBe(8);

    const step2 = ChatbotService.processUserMessage(
      "What vehicle is best for us?",
      step1.newContext,
    );
    expect(step2.botResponse.text).toContain("For 8 passengers");
  });

  it("should fall back gracefully without hallucinating for unsupported queries", () => {
    const { botResponse } = ChatbotService.processUserMessage(
      "Do you fly helicopters?",
      INITIAL_CONVERSATION_CONTEXT,
    );

    expect(botResponse.text).toContain(
      "I don't have verified information about that specific query yet",
    );
    expect(botResponse.actions?.[0].type).toBe("whatsapp");
  });
});
