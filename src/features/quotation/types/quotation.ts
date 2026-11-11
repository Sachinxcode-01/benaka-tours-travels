export interface FareBreakdown {
  estimatedKm?: number;
  ratePerKm?: number;
  baseFare?: number;
  driverAllowance?: number;
  estimatedTolls?: number;
  totalEstimatedAmount: number;
}

export interface QuotationDetails {
  quoteId: string;
  generatedAt: string; // ISO string or formatted date
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupLocation: string;
  destination: string;
  pickupAddress?: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  tripType: string;
  journeyType: string;
  passengers: number;
  luggage: number;
  acPreference: boolean;
  tripPurpose?: string;
  additionalNotes?: string;
  vehicle: {
    id: string;
    name: string;
    category: string;
    seats: number;
    fuel: string;
    tagline?: string;
  };
  fareBreakdown: FareBreakdown;
}

export interface QuotationPrintConfig {
  includeDriverPolicy?: boolean;
  notes?: string;
}
