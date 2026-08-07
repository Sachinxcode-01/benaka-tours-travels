export type TripType = "one-way" | "round-trip";
export type TravelScope = "local" | "outstation";

export interface BookingInquiry {
  customerName: string;
  phone: string;
  email?: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  tripType: TripType;
  travelScope: TravelScope;
  passengers: number;
  luggageCount?: number;
  preferredVehicleId?: string;
  tripPurpose?: string;
  additionalNotes?: string;
}
