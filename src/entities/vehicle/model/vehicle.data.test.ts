import { describe, it, expect } from "vitest";
import { FLEET_VEHICLES } from "./vehicle.data";

describe("Vehicle Fleet Data Centralized Model", () => {
  it("should contain exactly 12 vehicles matching extracted source specs", () => {
    expect(FLEET_VEHICLES).toHaveLength(12);
  });

  it("should have unique vehicle IDs and slugs", () => {
    const ids = FLEET_VEHICLES.map((v) => v.id);
    const slugs = FLEET_VEHICLES.map((v) => v.slug);
    expect(new Set(ids).size).toBe(12);
    expect(new Set(slugs).size).toBe(12);
  });

  it("should have 25-Seater Bus availability set to 'booked' as required", () => {
    const bus = FLEET_VEHICLES.find((v) => v.slug === "25-seater-bus");
    expect(bus).toBeDefined();
    expect(bus?.availability).toBe("booked");
    expect(bus?.seats).toBe(25);
  });

  it("should ensure all vehicles are chauffeur-driven", () => {
    FLEET_VEHICLES.forEach((v) => {
      expect(v.chauffeurIncluded).toBe(true);
    });
  });
});
