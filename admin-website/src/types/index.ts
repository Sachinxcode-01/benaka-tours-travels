export type VehicleStatus = "Available" | "Booked" | "Maintenance" | "Inactive";
export type VehicleCategory = "Sedan" | "SUV" | "MUV" | "Minibus" | "Bus";

export interface Vehicle {
  id: string;
  name: string;
  registrationNo: string;
  category: VehicleCategory;
  seats: number;
  fuel: string;
  status: VehicleStatus;
  ratePerKm: number;
  driverAllowanceDay: number;
  image: string;
  features: string[];
  recommendedFor: string[];
  luggageCapacity: string;
  acAvailable: boolean;
  chauffeurIncluded: boolean;
  chauffeurName?: string;
  chauffeurPhone?: string;
  odometerKm: number;
  lastServiceDate: string;
  notes: string;
  isPopular?: boolean;
}

export type InquiryStatus =
  | "New"
  | "Contacted"
  | "Quote Sent"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export interface InquiryRecord {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  vehicleName: string;
  passengers: number;
  status: InquiryStatus;
  estimatedFare?: number;
  notes?: string;
}

export interface TariffRate {
  id: string;
  category: VehicleCategory;
  baseRate80Km: number;
  extraPerKm: number;
  driverAllowancePerDay: number;
  nightHaltCharge: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

export interface AnalyticsMetric {
  totalRevenue: number;
  totalTripsCompleted: number;
  averageTripDistanceKm: number;
  fleetUtilizationRate: number;
  revenueByMonth: { month: string; revenue: number; bookings: number }[];
  categoryShare: { category: VehicleCategory; percentage: number; count: number }[];
  popularDestinations: { name: string; count: number; revenue: number }[];
}
