export function generateWhatsAppUrl(
  whatsappNumber: string,
  message: string,
): string {
  const cleanNumber = whatsappNumber.replace(/\D/g, "");
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
}
