// Saved/Recent trips types
export interface SavedTrip {
  id: string;
  savedAt: number; // Unix timestamp
  pickup: string;
  destination: string;
  vehicleId?: string;
  vehicleName?: string;
  date?: string;
  returnDate?: string;
  passengers: number;
  luggage: number;
  tripType: string;
  journeyType: string;
  tripPurpose?: string;
  additionalNotes?: string;
}

export const SAVED_TRIPS_STORAGE_KEY = "benaka_saved_trips";
export const MAX_SAVED_TRIPS = 20;
