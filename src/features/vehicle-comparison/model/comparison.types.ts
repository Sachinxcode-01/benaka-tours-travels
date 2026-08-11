// Types for the Vehicle Comparison feature
import type { Vehicle } from "@entities/vehicle";

export interface ComparisonState {
  vehicleIds: string[];
}

export interface ComparisonResult {
  vehicles: Vehicle[];
  bestForFamily?: string; // vehicle id
  bestForPremium?: string;
  bestForGroup?: string;
}

export const MAX_COMPARISON_VEHICLES = 3;
export const COMPARISON_STORAGE_KEY = "benaka_comparison_vehicles";
