import { BUSINESS_INFO } from "@entities/business";

export interface MailtoOptions {
  subject?: string;
  body?: string;
}

export function createMailtoUrl(options: MailtoOptions = {}): string {
  const email = BUSINESS_INFO.contact.email;
  const params: string[] = [];

  if (options.subject) {
    params.push(`subject=${encodeURIComponent(options.subject)}`);
  }
  if (options.body) {
    params.push(`body=${encodeURIComponent(options.body)}`);
  }

  const queryString = params.length > 0 ? `?${params.join("&")}` : "";
  return `mailto:${email}${queryString}`;
}
