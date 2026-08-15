export const FLEET_STORAGE_KEY = "benaka_fleet_inventory";
export const INQUIRIES_STORAGE_KEY = "benaka_customer_inquiries";
export const FLEET_UPDATED_EVENT = "benaka_fleet_updated";
export const INQUIRIES_UPDATED_EVENT = "benaka_inquiries_updated";

/**
 * Format vehicle image URLs to ensure paths with spaces are properly URL-encoded
 */
export function formatVehicleImageUrl(imagePath: string): string {
  if (!imagePath) return "/assets/vehicles/placeholders/benekavehicles.png";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return encodeURI(imagePath);
}

/**
 * Notify all windows/components of a fleet dataset update
 */
export function notifyFleetUpdated(): void {
  try {
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent(FLEET_UPDATED_EVENT));
  } catch (e) {
    console.error("Failed to dispatch fleet update event", e);
  }
}

/**
 * Notify all windows/components of an inquiry update
 */
export function notifyInquiriesUpdated(): void {
  try {
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent(INQUIRIES_UPDATED_EVENT));
  } catch (e) {
    console.error("Failed to dispatch inquiries update event", e);
  }
}
