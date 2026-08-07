export type TripType = "outstation" | "local" | "airport";
export type JourneyType = "one-way" | "round-trip";
export type TripPurpose =
  "Corporate" | "Family" | "Wedding" | "Group Tour" | "Personal" | "Other";

export interface BookingRequest {
  pickupLocation: string;
  destination: string;
  tripType: TripType;
  journeyType: JourneyType;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  vehicleCategory?: string;
  vehicleId?: string;
  vehicleName?: string;
  passengers: number;
  luggage: number;
  acPreference: boolean;
  tripPurpose: TripPurpose;
  additionalNotes?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupAddress: string;
  privacyConsent: boolean;
  honeypot?: string;
}

export interface FareEstimate {
  distanceKm?: number;
  estimatedHours?: number;
  baseFareEstimate?: string;
  note: string;
}
