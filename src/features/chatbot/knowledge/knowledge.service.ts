import { FLEET_VEHICLES, type Vehicle } from "@entities/vehicle";
import { BUSINESS_INFO, type BusinessInformation } from "@entities/business";
import { BUSINESS_SERVICES, type BusinessService } from "@entities/service";
import { FAQ_DATA, type FAQItem } from "../../../data/faq";

export class KnowledgeService {
  public static getAllVehicles(): Vehicle[] {
    return FLEET_VEHICLES;
  }

  public static getVehicleById(id: string): Vehicle | undefined {
    return FLEET_VEHICLES.find(
      (v) =>
        v.id.toLowerCase() === id.toLowerCase() ||
        v.slug.toLowerCase() === id.toLowerCase(),
    );
  }

  public static findVehicleByName(query: string): Vehicle | undefined {
    const q = query.toLowerCase().trim();
    if (!q) return undefined;

    // Exact or partial name/slug match
    return FLEET_VEHICLES.find((v) => {
      const nameMatch = v.name.toLowerCase().includes(q);
      const slugMatch = v.slug.toLowerCase().includes(q);
      const idMatch = v.id.toLowerCase() === q;
      return nameMatch || slugMatch || idMatch;
    });
  }

  public static recommendVehiclesForPassengers(passengers: number): {
    suitable: Vehicle[];
    upgrade?: Vehicle;
    overCapacity: boolean;
  } {
    if (passengers > 25) {
      return {
        suitable: [],
        overCapacity: true,
      };
    }

    const suitable = FLEET_VEHICLES.filter((v) => v.seats >= passengers).sort(
      (a, b) => a.seats - b.seats,
    );

    // Innova Crysta executive upgrade suggestion for 6-8 passengers
    let upgrade: Vehicle | undefined;
    if (passengers >= 6 && passengers <= 8) {
      upgrade = FLEET_VEHICLES.find((v) => v.slug === "toyota-innova-crysta");
    }

    return {
      suitable,
      upgrade,
      overCapacity: false,
    };
  }

  public static compareVehicles(
    v1Name: string,
    v2Name: string,
  ): { vehicle1?: Vehicle; vehicle2?: Vehicle } {
    return {
      vehicle1: this.findVehicleByName(v1Name),
      vehicle2: this.findVehicleByName(v2Name),
    };
  }

  public static filterVehiclesByCategory(category: string): Vehicle[] {
    const cat = category.toLowerCase().trim();
    return FLEET_VEHICLES.filter((v) => v.category.toLowerCase() === cat);
  }

  public static filterVehiclesByFuel(fuel: string): Vehicle[] {
    const f = fuel.toLowerCase().trim();
    return FLEET_VEHICLES.filter((v) =>
      v.fuelTypes.some((ft) => ft.toLowerCase().includes(f)),
    );
  }

  public static getBusinessInfo(): BusinessInformation {
    return BUSINESS_INFO;
  }

  public static getAllServices(): BusinessService[] {
    return BUSINESS_SERVICES;
  }

  public static getAllFAQs(): FAQItem[] {
    return FAQ_DATA;
  }

  public static searchFAQs(query: string): FAQItem[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return FAQ_DATA.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q),
    );
  }
}
