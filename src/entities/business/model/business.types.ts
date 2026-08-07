export interface BusinessContact {
  phoneDisplay: string;
  phoneE164: string;
  whatsappNumber: string;
  email: string;
  address: string;
  mapsUrl: string;
}

export interface BusinessMetrics {
  fleetSizeDisplay: string;
  happyClientsDisplay: string;
  totalReviewsDisplay: string;
  averageRatingDisplay: string;
}

export interface BusinessInformation {
  name: string;
  tagline: string;
  establishedYear: number;
  primaryLocation: string;
  serviceAreas: string[];
  operatingHours: string;
  chauffeurOnly: true;
  contact: BusinessContact;
  metrics: BusinessMetrics;
}
