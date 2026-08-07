import { describe, it, expect } from "vitest";
import { createSlug } from "./createSlug";

describe("createSlug utility", () => {
  it("should convert vehicle names to clean url slugs", () => {
    expect(createSlug("Maruti Swift Dzire")).toBe("maruti-swift-dzire");
    expect(createSlug("Toyota Innova Crysta")).toBe("toyota-innova-crysta");
    expect(createSlug("25-Seater Bus")).toBe("25-seater-bus");
  });
});
