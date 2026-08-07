export interface PopularRoute {
  id: string;
  destination: string;
  distanceKm: number;
  estimatedHours: string;
  popularVehicles: string[];
  description: string;
}

export const POPULAR_ROUTES: PopularRoute[] = [
  {
    id: "gadag-hubballi",
    destination: "Hubballi",
    distanceKm: 58,
    estimatedHours: "1.2 hrs",
    popularVehicles: ["Swift Dzire", "Hyundai Aura", "Brezza"],
    description:
      "Frequent executive commute, airport transfer & shopping trips.",
  },
  {
    id: "gadag-dharwad",
    destination: "Dharwad",
    distanceKm: 75,
    estimatedHours: "1.5 hrs",
    popularVehicles: ["Maruti Ertiga", "Grand Vitara", "Dzire"],
    description: "Educational university tours, court visits & family travel.",
  },
  {
    id: "gadag-belagavi",
    destination: "Belagavi",
    distanceKm: 155,
    estimatedHours: "3.2 hrs",
    popularVehicles: ["Innova Crysta", "Scorpio", "Ertiga"],
    description: "Business trips, textile market visits & outstation transit.",
  },
  {
    id: "gadag-bengaluru",
    destination: "Bengaluru",
    distanceKm: 410,
    estimatedHours: "7.5 hrs",
    popularVehicles: ["Innova Crysta", "Tempo Traveller", "Scorpio"],
    description:
      "Capital city connectivity, IT transfers & family relocations.",
  },
  {
    id: "gadag-goa",
    destination: "Goa",
    distanceKm: 220,
    estimatedHours: "5.0 hrs",
    popularVehicles: ["Innova Crysta", "Mahindra Thar", "Tempo Traveller"],
    description: "Holiday getaways, beach vacations & group leisure tours.",
  },
];
