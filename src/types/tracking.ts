export interface VehicleLocation {
  vehicleId: string;
  latitude: number;
  longitude: number;
  lastUpdated: string;
  speedKmH?: number;
  status: "en-route" | "idle" | "stopped";
}

export interface RoutePreview {
  origin: string;
  destination: string;
  distanceKm: number;
  durationMinutes: number;
}
