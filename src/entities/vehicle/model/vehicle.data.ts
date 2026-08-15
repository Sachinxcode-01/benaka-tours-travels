import type { Vehicle } from "./vehicle.types";
import { FLEET_STORAGE_KEY, formatVehicleImageUrl } from "@shared/services/fleetSyncService";

export const DEFAULT_FLEET_VEHICLES: Vehicle[] = [
  {
    id: "veh-01",
    slug: "maruti-swift-dzire",
    name: "Maruti Swift Dzire",
    category: "sedan",
    seats: 5,
    fuelTypes: ["Petrol", "CNG", "Diesel"],
    features: [
      "Air Conditioning",
      "Compact Sedan",
      "Budget Friendly",
      "Music System",
      "Ample Boot Space",
    ],
    recommendedFor: [
      "Small Family Trips",
      "Local Pick-up & Drop",
      "City Commute",
    ],
    availability: "available",
    chauffeurIncluded: true,
    image: formatVehicleImageUrl("/assets/vehicles/placeholders/swift dszire.jpg"),
    gallery: [
      formatVehicleImageUrl("/assets/vehicles/placeholders/swift dszire.jpg"),
      "/assets/vehicles/placeholders/benekavehicles.png",
    ],
    sortOrder: 1,
  },
  {
    id: "veh-02",
    slug: "hyundai-aura",
    name: "Hyundai Aura",
    category: "sedan",
    seats: 5,
    fuelTypes: ["CNG"],
    features: [
      "Air Conditioning",
      "High Fuel Efficiency",
      "Comfort Sedan",
      "Modern Ergonomics",
    ],
    recommendedFor: ["Outstation Trips", "Daily Rentals", "Executive Pick-up"],
    availability: "available",
    chauffeurIncluded: true,
    image: formatVehicleImageUrl("/assets/vehicles/placeholders/Hyundai Aura.jpg"),
    gallery: [
      formatVehicleImageUrl("/assets/vehicles/placeholders/Hyundai Aura.jpg"),
      "/assets/vehicles/placeholders/benekavehicles.png",
    ],
    sortOrder: 2,
  },
  {
    id: "veh-03",
    slug: "maruti-ertiga",
    name: "Maruti Ertiga",
    category: "muv",
    seats: 7,
    fuelTypes: ["Petrol", "CNG"],
    features: [
      "Air Conditioning",
      "Flexible Seating",
      "Spacious Cabin",
      "Family MUV",
    ],
    recommendedFor: [
      "Family Outstation Travel",
      "Weekend Getaways",
      "Group Outings",
    ],
    availability: "available",
    chauffeurIncluded: true,
    image: formatVehicleImageUrl("/assets/vehicles/placeholders/eritiga.jpg"),
    gallery: [
      formatVehicleImageUrl("/assets/vehicles/placeholders/eritiga.jpg"),
      "/assets/vehicles/placeholders/benekavehicles.png",
    ],
    sortOrder: 3,
  },
  {
    id: "veh-04",
    slug: "toyota-innova-crysta",
    name: "Toyota Innova Crysta",
    category: "muv",
    seats: 8,
    fuelTypes: ["Diesel"],
    features: [
      "Dual-Zone AC",
      "Premium Leather Seats",
      "Executive Comfort",
      "Long Distance Suspension",
    ],
    recommendedFor: [
      "Long Distance Outstation",
      "Executive Corporate Travel",
      "VIP Guests",
    ],
    availability: "available",
    chauffeurIncluded: true,
    image: formatVehicleImageUrl("/assets/vehicles/placeholders/Toyota-Innova-Crysta.jpg"),
    gallery: [
      formatVehicleImageUrl("/assets/vehicles/placeholders/Toyota-Innova-Crysta.jpg"),
      "/assets/vehicles/placeholders/benekavehicles.png",
    ],
    sortOrder: 4,
  },
  {
    id: "veh-05",
    slug: "force-toofan-cruiser",
    name: "Force Toofan Cruiser",
    category: "muv",
    seats: 11,
    fuelTypes: ["Diesel"],
    features: [
      "High Seating Capacity",
      "Multi-Utility Vehicle",
      "Heavy Duty Engine",
      "Group Seating",
    ],
    recommendedFor: [
      "Large Family Tours",
      "Pilgrimage Journeys",
      "Rural & Highway Travel",
    ],
    availability: "available",
    chauffeurIncluded: true,
    image: formatVehicleImageUrl("/assets/vehicles/placeholders/Toofan cruser.jpg"),
    gallery: [
      formatVehicleImageUrl("/assets/vehicles/placeholders/Toofan cruser.jpg"),
      "/assets/vehicles/placeholders/benekavehicles.png",
    ],
    sortOrder: 5,
  },
  {
    id: "veh-06",
    slug: "mahindra-scorpio",
    name: "Mahindra Scorpio",
    category: "suv",
    seats: 7,
    fuelTypes: ["Diesel"],
    features: [
      "High Ground Clearance",
      "Tough SUV Body",
      "Powerful Diesel Engine",
      "All-Terrain Capability",
    ],
    recommendedFor: [
      "Outstation Adventures",
      "Rough Terrain Travel",
      "Family Tours",
    ],
    availability: "available",
    chauffeurIncluded: true,
    image: formatVehicleImageUrl("/assets/vehicles/placeholders/scropio.jpg"),
    gallery: [
      formatVehicleImageUrl("/assets/vehicles/placeholders/scropio.jpg"),
      "/assets/vehicles/placeholders/benekavehicles.png",
    ],
    sortOrder: 6,
  },
  {
    id: "veh-07",
    slug: "mahindra-bolero",
    name: "Mahindra Bolero",
    category: "suv",
    seats: 7,
    fuelTypes: ["Diesel"],
    features: [
      "Heavy-Duty Construction",
      "Rugged SUV Design",
      "High Reliability",
      "Rural Terrain Expert",
    ],
    recommendedFor: [
      "Rural & Outstation Journeys",
      "Event Support",
      "Heavy Luggage Trips",
    ],
    availability: "available",
    chauffeurIncluded: true,
    image: formatVehicleImageUrl("/assets/vehicles/placeholders/bolero.jpg"),
    gallery: [
      formatVehicleImageUrl("/assets/vehicles/placeholders/bolero.jpg"),
      "/assets/vehicles/placeholders/benekavehicles.png",
    ],
    sortOrder: 7,
  },
  {
    id: "veh-08",
    slug: "maruti-brezza",
    name: "Maruti Brezza",
    category: "suv",
    seats: 5,
    fuelTypes: ["Petrol", "CNG"],
    features: [
      "Compact SUV",
      "Air Conditioning",
      "Urban Navigation",
      "Comfort Ride",
    ],
    recommendedFor: [
      "City Navigation",
      "Short Outstation Trips",
      "Corporate Commute",
    ],
    availability: "available",
    chauffeurIncluded: true,
    image: formatVehicleImageUrl("/assets/vehicles/placeholders/brezza.jpg"),
    gallery: [
      formatVehicleImageUrl("/assets/vehicles/placeholders/brezza.jpg"),
      "/assets/vehicles/placeholders/benekavehicles.png",
    ],
    sortOrder: 8,
  },
  {
    id: "veh-09",
    slug: "maruti-grand-vitara",
    name: "Maruti Grand Vitara",
    category: "suv",
    seats: 5,
    fuelTypes: ["Petrol", "CNG"],
    features: [
      "Mid-Size Luxury SUV",
      "Premium Interiors",
      "Smooth Ride Quality",
      "Advanced Ergonomics",
    ],
    recommendedFor: ["Business Trips", "Luxury Outstation", "VIP Commute"],
    availability: "available",
    chauffeurIncluded: true,
    image: formatVehicleImageUrl("/assets/vehicles/placeholders/Grand vitara.jpg"),
    gallery: [
      formatVehicleImageUrl("/assets/vehicles/placeholders/Grand vitara.jpg"),
      "/assets/vehicles/placeholders/benekavehicles.png",
    ],
    sortOrder: 9,
  },
  {
    id: "veh-10",
    slug: "mahindra-thar",
    name: "Mahindra Thar",
    category: "suv",
    seats: 5,
    fuelTypes: ["Diesel"],
    features: [
      "4x4 Off-Road SUV",
      "Iconic Rugged Styling",
      "Adventure Build",
      "High Stance",
    ],
    recommendedFor: [
      "Off-Road Adventures",
      "Style & Event Travel",
      "Special Occasions",
    ],
    availability: "available",
    chauffeurIncluded: true,
    image: formatVehicleImageUrl("/assets/vehicles/placeholders/Thar.jpg"),
    gallery: [
      formatVehicleImageUrl("/assets/vehicles/placeholders/Thar.jpg"),
      "/assets/vehicles/placeholders/benekavehicles.png",
    ],
    sortOrder: 10,
  },
  {
    id: "veh-11",
    slug: "tempo-traveller",
    name: "Tempo Traveller",
    category: "minibus",
    seats: 13,
    fuelTypes: ["Diesel"],
    features: [
      "Chauffeur-Driven Coach",
      "Pushback Seats",
      "Ample Luggage Space",
      "AC / Music System",
    ],
    recommendedFor: [
      "Group Tour Coach",
      "Corporate Outings",
      "Wedding Guest Transport",
    ],
    availability: "available",
    chauffeurIncluded: true,
    image: formatVehicleImageUrl("/assets/vehicles/placeholders/Tempo-Traveller.jpg"),
    gallery: [
      formatVehicleImageUrl("/assets/vehicles/placeholders/Tempo-Traveller.jpg"),
      "/assets/vehicles/placeholders/benekavehicles.png",
    ],
    sortOrder: 11,
  },
  {
    id: "veh-12",
    slug: "25-seater-bus",
    name: "25-Seater Bus",
    category: "bus",
    seats: 25,
    fuelTypes: ["Diesel"],
    features: [
      "Large Group Coach",
      "AC / Non-AC Options",
      "Reclining Seats",
      "Heavy Commercial Chassis",
    ],
    recommendedFor: [
      "Marriage Ceremonies",
      "Large Corporate Events",
      "Interstate Group Pilgrimages",
    ],
    availability: "booked",
    chauffeurIncluded: true,
    image: formatVehicleImageUrl("/assets/vehicles/placeholders/25 seater bus.jpg"),
    gallery: [
      formatVehicleImageUrl("/assets/vehicles/placeholders/25 seater bus.jpg"),
      "/assets/vehicles/placeholders/benekavehicles.png",
    ],
    sortOrder: 12,
  },
];

/**
 * Get live fleet vehicles synced from Admin Panel or default fallback
 */
export function getLiveFleetVehicles(): Vehicle[] {
  if (typeof window === "undefined") return DEFAULT_FLEET_VEHICLES;
  try {
    const raw = localStorage.getItem(FLEET_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item: any, idx: number) => {
          const cat = (item.category || "sedan").toLowerCase();
          const avail =
            item.status === "Available"
              ? "available"
              : item.status === "Booked"
              ? "booked"
              : "maintenance";

          const formattedImg = formatVehicleImageUrl(item.image || "/assets/vehicles/placeholders/swift dszire.jpg");

          return {
            id: item.id || `veh-${idx + 1}`,
            slug: (item.id || item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")).replace(/^veh-/, ""),
            name: item.name,
            category: cat as any,
            seats: item.seats || 5,
            fuelTypes: item.fuel ? [item.fuel] : ["Diesel"],
            features: item.features || ["Air Conditioning", "Chauffeur Driven"],
            recommendedFor: item.recommendedFor || ["Local & Outstation Trips"],
            availability: avail as any,
            chauffeurIncluded: true,
            image: formattedImg,
            gallery: [formattedImg, "/assets/vehicles/placeholders/benekavehicles.png"],
            sortOrder: idx + 1,
            ratePerKm: item.ratePerKm,
            driverAllowanceDay: item.driverAllowanceDay,
            registrationNo: item.registrationNo,
          };
        });
      }
    }
  } catch (err) {
    console.error("Error parsing live fleet storage", err);
  }
  return DEFAULT_FLEET_VEHICLES;
}

export const FLEET_VEHICLES = DEFAULT_FLEET_VEHICLES;
