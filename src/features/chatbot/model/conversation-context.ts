import type { ConversationContext, ExtractedEntities } from "./chatbot.types";

export const INITIAL_CONVERSATION_CONTEXT: ConversationContext = {};

export function updateContextWithEntities(
  prevContext: ConversationContext,
  entities: ExtractedEntities,
): ConversationContext {
  const updated: ConversationContext = { ...prevContext };

  if (entities.passengers !== undefined && entities.passengers > 0) {
    updated.passengers = entities.passengers;
  }
  if (entities.pickup) {
    updated.pickup = entities.pickup;
  }
  if (entities.destination) {
    updated.destination = entities.destination;
  }
  if (entities.date) {
    updated.travelDate = entities.date;
  }
  if (entities.vehicleId) {
    updated.selectedVehicleId = entities.vehicleId;
  }
  if (entities.tripType) {
    updated.tripType = entities.tripType;
  }
  if (entities.name) {
    updated.customerName = entities.name;
  }
  if (entities.phone) {
    updated.customerPhone = entities.phone;
  }

  return updated;
}
