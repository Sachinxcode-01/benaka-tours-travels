export type VehicleCategory = "sedan" | "muv" | "suv" | "minibus" | "bus";

export type VehicleAvailability =
  "available" | "booked" | "maintenance" | "inactive";

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  category: VehicleCategory;
  seats: number;
  fuelTypes: string[];
  features: string[];
  recommendedFor: string[];
  availability: VehicleAvailability;
  chauffeurIncluded: true;
  image: string;
  gallery: string[];
  sortOrder: number;
}
