import { describe, it, expect } from "vitest";
import { BUSINESS_INFO } from "./business.data";

describe("Business Data Centralized Model", () => {
  it("should contain 100% verified facts from source documents", () => {
    expect(BUSINESS_INFO.name).toBe("BENAKA TOURS AND TRAVELS");
    expect(BUSINESS_INFO.establishedYear).toBe(2019);
    expect(BUSINESS_INFO.contact.phoneDisplay).toBe("+91 63624 16120");
    expect(BUSINESS_INFO.contact.email).toBe("benakatravelsbusiness@gmail.com");
    expect(BUSINESS_INFO.contact.address).toContain(
      "Panchaxari Nagar 5th Cross, Gadag",
    );
    expect(BUSINESS_INFO.chauffeurOnly).toBe(true);
  });
});
