import { describe, it, expect } from "vitest";
import { step1Schema, step2Schema, step3Schema } from "./booking.schema";

describe("booking.schema Zod Validation", () => {
  const getToday = () => new Date().toISOString().split("T")[0];
  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };
  const getYesterday = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  };

  describe("Step 1 Schema: Trip Details", () => {
    it("validates valid step 1 data", () => {
      const validData = {
        pickupLocation: "Gadag",
        destination: "Hubballi",
        tripType: "outstation" as const,
        journeyType: "one-way" as const,
        pickupDate: getTomorrow(),
        pickupTime: "09:00",
      };
      const result = step1Schema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("rejects past pickup dates", () => {
      const invalidData = {
        pickupLocation: "Gadag",
        destination: "Hubballi",
        tripType: "outstation" as const,
        journeyType: "one-way" as const,
        pickupDate: getYesterday(),
        pickupTime: "09:00",
      };
      const result = step1Schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain(
          "Pickup date cannot be in the past",
        );
      }
    });

    it("validates return date for round trips", () => {
      const roundTripInvalid = {
        pickupLocation: "Gadag",
        destination: "Goa",
        tripType: "outstation" as const,
        journeyType: "round-trip" as const,
        pickupDate: getTomorrow(),
        pickupTime: "09:00",
        returnDate: getYesterday(),
      };
      const result = step1Schema.safeParse(roundTripInvalid);
      expect(result.success).toBe(false);

      const roundTripValid = {
        pickupLocation: "Gadag",
        destination: "Goa",
        tripType: "outstation" as const,
        journeyType: "round-trip" as const,
        pickupDate: getToday(),
        pickupTime: "09:00",
        returnDate: getTomorrow(),
      };
      const validResult = step1Schema.safeParse(roundTripValid);
      expect(validResult.success).toBe(true);
    });
  });

  describe("Step 2 Schema: Vehicle Requirements & Passenger Capacity", () => {
    it("accepts valid passenger count within vehicle seat capacity", () => {
      const data = {
        vehicleId: "innova-crysta",
        vehicleName: "Toyota Innova Crysta",
        passengers: 6,
        luggage: 3,
        acPreference: true,
        tripPurpose: "Family" as const,
      };
      const result = step2Schema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("rejects passenger count exceeding vehicle seating capacity", () => {
      const data = {
        vehicleId: "swift-dzire", // Swift Dzire has 4 seats
        vehicleName: "Maruti Suzuki Swift Dzire",
        passengers: 6, // Exceeds 4 seats
        luggage: 2,
        acPreference: true,
        tripPurpose: "Personal" as const,
      };
      const result = step2Schema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain(
          "Passenger count exceeds maximum seating capacity",
        );
      }
    });
  });

  describe("Step 3 Schema: Customer Details & Spam Protection", () => {
    it("validates valid customer details and Indian phone numbers", () => {
      const data = {
        customerName: "Ramesh Patil",
        customerPhone: "9876543210",
        customerEmail: "ramesh@example.com",
        pickupAddress: "Panchaxari Nagar, Gadag",
        privacyConsent: true,
      };
      const result = step3Schema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("rejects invalid Indian mobile numbers", () => {
      const data = {
        customerName: "Ramesh Patil",
        customerPhone: "1234567890", // Doesn't start with 6-9
        pickupAddress: "Gadag",
        privacyConsent: true,
      };
      const result = step3Schema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("rejects unchecked privacy consent", () => {
      const data = {
        customerName: "Ramesh Patil",
        customerPhone: "9876543210",
        pickupAddress: "Gadag",
        privacyConsent: false,
      };
      const result = step3Schema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("rejects honeypot bot submissions", () => {
      const data = {
        customerName: "Ramesh Patil",
        customerPhone: "9876543210",
        pickupAddress: "Gadag",
        privacyConsent: true,
        honeypot: "spam_bot_input",
      };
      const result = step3Schema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
