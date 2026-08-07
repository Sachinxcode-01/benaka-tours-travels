export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  iconName: string;
  recommendedVehicle: string;
  badge?: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "local-pickup-drop",
    title: "Local Pick-up & Drop",
    shortDescription:
      "Prompt doorstep pickup and hassle-free transit across Gadag, Hubballi & Dharwad.",
    description:
      "Never worry about missing an appointment. Our chauffeurs arrive early at your doorstep in Panchaxari Nagar or any location in Gadag for quick, sanitized transportation.",
    iconName: "MapPin",
    recommendedVehicle: "Swift Dzire / Hyundai Aura",
    badge: "24/7 Available",
  },
  {
    id: "outstation",
    title: "Outstation Travel",
    shortDescription:
      "Comfortable inter-city & inter-state journeys across Karnataka, Goa & Maharashtra.",
    description:
      "Travel stress-free with our experienced drivers who know highway routes, toll passes, and scenic shortcuts inside out. Ideal for family vacations, temple tours, and business visits.",
    iconName: "Compass",
    recommendedVehicle: "Toyota Innova Crysta / Ertiga",
    badge: "Most Popular",
  },
  {
    id: "corporate-travel",
    title: "Corporate Travel",
    shortDescription:
      "Executive Sedans, SUVs & Tempo Travellers for corporate delegation & offsites.",
    description:
      "Punctual, professional chauffeurs in formal attire. We provide tax-compliant billing, long-term corporate contracts, and executive fleet booking for business events.",
    iconName: "Briefcase",
    recommendedVehicle: "Scorpio / Grand Vitara / Dzire",
    badge: "Executive Fleet",
  },
  {
    id: "wedding-transport",
    title: "Wedding Transportation",
    shortDescription:
      "Decorated luxury SUVs, Thar, Innova & Buses for grand celebratory processions.",
    description:
      "Make your wedding transportation seamless. From groomsmen arrivals in Thar/Grand Vitara to guest shuttles in 25-Seater Coach, we handle all wedding logistics.",
    iconName: "Heart",
    recommendedVehicle: "Mahindra Thar / Innova Crysta",
  },
  {
    id: "family-trips",
    title: "Family Trips",
    shortDescription:
      "Spacious MUVs & SUVs with ample luggage capacity for family get-togethers & temple visits.",
    description:
      "Travel comfortably together in 7-seater Ertiga, 8-seater Innova Crysta, or Scorpio with child safety and experienced drivers.",
    iconName: "Users",
    recommendedVehicle: "Toyota Innova Crysta / Ertiga",
  },
  {
    id: "group-tours",
    title: "Group Tours",
    shortDescription:
      "Spacious Minibuses & Heavy Coaches for pilgrimages, school trips & large tour groups.",
    description:
      "Travel together in 11-seater Toofan, 13-seater Tempo Traveller, or 25-seater luxury Coach without squeezing into multiple small cars.",
    iconName: "Users",
    recommendedVehicle: "13-Seater Tempo Traveller / 25-Seater Bus",
    badge: "Large Capacity",
  },
  {
    id: "airport-transfers",
    title: "Airport & Railway Transfers",
    shortDescription:
      "24/7 reliable pick-up and drop for Hubballi Airport & major railway stations.",
    description:
      "Catch early morning flights or late-night trains with zero anxiety. Flight tracking ensures your driver is waiting even if your flight is delayed.",
    iconName: "Plane",
    recommendedVehicle: "Swift Dzire / Hyundai Aura",
  },
  {
    id: "doorstep-pickup",
    title: "Doorstep Pickup",
    shortDescription:
      "Direct pickup from your house, office, or hotel anywhere in Gadag and surrounding areas.",
    description:
      "No need to travel to a taxi stand. Our chauffeur reaches your doorstep on time, helps with luggage, and ensures a seamless departure.",
    iconName: "Home",
    recommendedVehicle: "All Fleet Vehicles",
    badge: "Included",
  },
  {
    id: "daily-weekly-rentals",
    title: "Daily & Weekly Rentals",
    shortDescription:
      "Flexible multi-day chauffeur rental packages customized for extended family or business stays.",
    description:
      "Rent a car with a dedicated driver for multiple days with transparent pricing and flexible daily mileage packages.",
    iconName: "Calendar",
    recommendedVehicle: "Innova Crysta / Ertiga / Dzire",
  },
  {
    id: "custom-multi-day",
    title: "Custom Multi-Day Trips",
    shortDescription:
      "Customized outstation tour itineraries covering Goa beaches, Coorg hills, or North Karnataka heritage.",
    description:
      "Design your custom tour package with our local route experts. We manage driver night allowances, interstate permits, and route planning.",
    iconName: "Map",
    recommendedVehicle: "Tempo Traveller / Innova Crysta",
  },
];
