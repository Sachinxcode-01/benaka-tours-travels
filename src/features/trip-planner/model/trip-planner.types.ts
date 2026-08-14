// Trip Planner types
import type { Vehicle } from "@entities/vehicle";

export type TripStep = 1 | 2 | 3 | 4;

export type TripPlannerTripType = "outstation" | "local" | "airport";
export type TripPlannerJourneyType = "one-way" | "round-trip";
export type TripPlannerPurpose =
  "Personal" | "Corporate" | "Family" | "Wedding" | "Group Tour" | "Other";

export interface TripFormData {
  pickup: string;
  destination: string;
  tripType: TripPlannerTripType;
  journeyType: TripPlannerJourneyType;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  passengers: number;
  luggage: number;
  tripPurpose: TripPlannerPurpose;
  preferredCategory: string;
}

export const DEFAULT_TRIP_FORM: TripFormData = {
  pickup: "",
  destination: "",
  tripType: "outstation",
  journeyType: "one-way",
  pickupDate: "",
  pickupTime: "",
  returnDate: "",
  returnTime: "",
  passengers: 1,
  luggage: 0,
  tripPurpose: "Personal",
  preferredCategory: "any",
};

export interface VehicleRecommendation {
  vehicle: Vehicle;
  reason: string;
  rank: "exact" | "comfortable" | "premium";
}
