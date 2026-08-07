import { BUSINESS_INFO } from "@entities/business";
import { normalizePhoneE164 } from "../utils/normalizePhone";

export function createTelUrl(phoneNumber?: string): string {
  const targetPhone = phoneNumber || BUSINESS_INFO.contact.phoneE164;
  const normalized = normalizePhoneE164(targetPhone);
  return `tel:${normalized}`;
}
