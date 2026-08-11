import { describe, it, expect } from "vitest";
import { recommendVehicles } from "./vehicle-recommender";

describe("recommendVehicles", () => {
  it("should return empty array if passengers exceeds all vehicle capacities", () => {
    const recs = recommendVehicles(50);
    expect(recs).toEqual([]);
  });

  it("should never recommend vehicles with fewer seats than passengers", () => {
    const passengers = 7;
    const recs = recommendVehicles(passengers);
    expect(recs.length).toBeGreaterThan(0);
    for (const rec of recs) {
      expect(rec.vehicle.seats).toBeGreaterThanOrEqual(passengers);
    }
  });

  it("should rank exact fit vehicles first", () => {
    const recs = recommendVehicles(4);
    expect(recs.length).toBeGreaterThan(0);
    expect(recs[0].vehicle.seats).toBeGreaterThanOrEqual(4);
    expect(recs[0].reason).toBeDefined();
  });

  it("should respect category filter if available", () => {
    const recs = recommendVehicles(4, "sedan");
    expect(recs.length).toBeGreaterThan(0);
    expect(recs[0].vehicle.category).toBe("sedan");
  });

  it("should fallback to all categories if requested category has no available seats", () => {
    const recs = recommendVehicles(10, "sedan");
    // sedan has 4-5 seats max, so for 10 pax it should fallback to Tempo Traveller (13 seats)
    expect(recs.length).toBeGreaterThan(0);
    expect(recs[0].vehicle.seats).toBeGreaterThanOrEqual(10);
  });
});
