import { describe, it, expect } from "vitest";
import { createWhatsAppInquiryUrl } from "./whatsapp.service";

describe("whatsapp.service", () => {
  it("should generate a valid wa.me URL targeting +91 63624 16120", () => {
    const url = createWhatsAppInquiryUrl({
      vehicleName: "Toyota Innova Crysta",
    });
    expect(url).toContain("https://wa.me/916362416120?text=");
    expect(url).toContain(encodeURIComponent("Toyota Innova Crysta"));
  });
});
