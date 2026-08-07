import type { BusinessService } from "./service.types";

export const BUSINESS_SERVICES: BusinessService[] = [
  {
    id: "srv-01",
    slug: "doorstep-pickup-drop",
    title: "Door-Step Pick-up & Drop",
    subtitle: "Punctual & Convenient",
    description:
      "Chauffeur-driven doorstep pick up & drop off across Gadag, Hubballi, Dharwad and surrounding North Karnataka regions.",
    iconName: "MapPin",
    highlights: [
      "100% Chauffeur-Driven",
      "Punctual Arrival",
      "Doorstep Convenience",
    ],
  },
  {
    id: "srv-02",
    slug: "outstation-travel",
    title: "Outstation Trips & Pilgrimages",
    subtitle: "Smooth Highway Travel",
    description:
      "Comfortable long-distance journeys to major cities and pilgrimage centers like Hubballi, Belagavi, Bengaluru, and Goa.",
    iconName: "Compass",
    highlights: [
      "Experienced Drivers",
      "Well-Maintained Fleet",
      "Flexible Routes",
    ],
  },
  {
    id: "srv-03",
    slug: "corporate-rentals",
    title: "Corporate & Executive Travel",
    subtitle: "Professional & Reliable",
    description:
      "Executive sedans, SUVs, and coaches for business conferences, client transfers, and corporate group outings.",
    iconName: "Briefcase",
    highlights: [
      "Clean Interiors",
      "Professional Etiquette",
      "24/7 Availability",
    ],
  },
  {
    id: "srv-04",
    slug: "wedding-group-travel",
    title: "Wedding & Event Group Coaches",
    subtitle: "Large Capacity Transport",
    description:
      "Dedicated 13-seater Tempo Travellers and 25-seater luxury coaches to comfortably transport wedding guests and large event groups.",
    iconName: "Users",
    highlights: [
      "13 to 25 Seater Options",
      "AC / Non-AC Coaches",
      "Luggage Support",
    ],
  },
];
