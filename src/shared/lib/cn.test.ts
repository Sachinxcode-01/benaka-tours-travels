import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn utility", () => {
  it("should merge class names correctly", () => {
    expect(cn("px-2", "py-2")).toBe("px-2 py-2");
  });

  it("should resolve Tailwind conflicts appropriately", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("should handle conditional class names", () => {
    expect(cn("base-class", false && "hidden", true && "active")).toBe(
      "base-class active",
    );
  });
});
