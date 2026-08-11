import { FLEET_VEHICLES } from "@entities/vehicle";
import type { VehicleRecommendation } from "../model/trip-planner.types";

/**
 * Recommends vehicles based on passengers and optional category preference.
 *
 * Rules:
 * - NEVER recommend vehicles with fewer seats than passengers
 * - Prefer exact-fit, then comfortable upgrade, then premium/larger
 * - Respect vehicle availability (only available vehicles)
 * - Return 2-4 best matches with human-readable reason
 */
export function recommendVehicles(
  passengers: number,
  preferredCategory = "any",
): VehicleRecommendation[] {
  const available = FLEET_VEHICLES.filter(
    (v) => v.availability === "available" && v.seats >= passengers,
  );

  if (available.length === 0) return [];

  // Apply category filter if not "any"
  let filtered =
    preferredCategory !== "any"
      ? available.filter((v) => v.category === preferredCategory)
      : available;

  // Fallback to all available if category filter yields nothing
  if (filtered.length === 0) {
    filtered = available;
  }

  // Sort: exact-fit first (seats === passengers or within +2), then by seats ascending
  const sorted = [...filtered].sort((a, b) => {
    const extraA = a.seats - passengers;
    const extraB = b.seats - passengers;
    // Prefer tightest fit (lowest extra), but never below 0
    return extraA - extraB;
  });

  const results: VehicleRecommendation[] = [];

  for (const vehicle of sorted) {
    if (results.length >= 4) break;

    const extra = vehicle.seats - passengers;
    let rank: VehicleRecommendation["rank"];
    let reason: string;

    if (extra === 0) {
      rank = "exact";
      reason = `Perfect fit — exactly ${passengers} passenger${passengers > 1 ? "s" : ""} for a ${vehicle.seats}-seat vehicle.`;
    } else if (extra <= 2) {
      rank = "comfortable";
      reason = `Comfortable choice with ${extra} extra seat${extra > 1 ? "s" : ""} for luggage and personal space.`;
    } else {
      rank = "premium";
      reason = `Spacious option — ${vehicle.seats} seats for ${passengers} passenger${passengers > 1 ? "s" : ""}, ideal for extra luggage or comfort.`;
    }

    results.push({ vehicle, reason, rank });
  }

  return results;
}
