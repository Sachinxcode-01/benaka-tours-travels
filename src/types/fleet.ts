export type VehicleCategory = "Sedan" | "SUV" | "MUV" | "Minibus" | "Bus";
export type VehicleStatus = "Available" | "Booked" | "Maintenance" | "Inactive";
export type FuelType =
  "Petrol / CNG / Diesel" | "CNG" | "Petrol / CNG" | "Diesel";

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  seats: number;
  fuel: FuelType;
  status: VehicleStatus;
  notes: string;
  image: string;
  features: string[];
  recommendedFor: string[];
  chauffeurIncluded: boolean;
  acAvailable: boolean;
  luggageCapacity: string;
  isPopular?: boolean;
}

export type FilterCategory = "All" | VehicleCategory | "Available" | "Booked";
