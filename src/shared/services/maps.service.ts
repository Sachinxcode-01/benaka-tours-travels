import { BUSINESS_INFO } from "@entities/business";

export function getGoogleMapsUrl(): string {
  return BUSINESS_INFO.contact.mapsUrl;
}
