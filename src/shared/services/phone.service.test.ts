import { describe, it, expect } from "vitest";
import { createTelUrl } from "./phone.service";

describe("phone.service", () => {
  it("should generate a valid tel: URL for Benaka primary phone line", () => {
    const url = createTelUrl();
    expect(url).toBe("tel:+916362416120");
  });
});
