import { z } from "zod";
import { INITIAL_FLEET } from "../../../data/fleet";

const getTodayString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Step 1 Schema: Trip Details
export const step1Schema = z
  .object({
    pickupLocation: z
      .string()
      .trim()
      .min(2, "Pickup location is required (min 2 characters)"),
    destination: z
      .string()
      .trim()
      .min(2, "Destination is required (min 2 characters)"),
    tripType: z.enum(["outstation", "local", "airport"]),
    journeyType: z.enum(["one-way", "round-trip"]),
    pickupDate: z
      .string()
      .min(1, "Pickup date is required")
      .refine((val) => {
        if (!val) return false;
        return val >= getTodayString();
      }, "Pickup date cannot be in the past"),
    pickupTime: z.string().min(1, "Pickup time is required"),
    returnDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.journeyType === "round-trip") {
        if (!data.returnDate || data.returnDate.trim() === "") {
          return false;
        }
        return data.returnDate >= data.pickupDate;
      }
      return true;
    },
    {
      message:
        "Return date is required and must be on or after pickup date for round trips",
      path: ["returnDate"],
    },
  );

// Step 2 Schema: Vehicle Requirements
export const step2Schema = z
  .object({
    vehicleCategory: z.string().optional(),
    vehicleId: z.string().min(1, "Please select a vehicle"),
    vehicleName: z.string().min(1, "Vehicle name is required"),
    passengers: z
      .number()
      .int()
      .min(1, "At least 1 passenger is required")
      .max(30, "Maximum passenger capacity is 30"),
    luggage: z.number().int().min(0, "Luggage count cannot be negative"),
    acPreference: z.boolean(),
    tripPurpose: z.enum([
      "Corporate",
      "Family",
      "Wedding",
      "Group Tour",
      "Personal",
      "Other",
    ]),
    additionalNotes: z.string().optional(),
  })
  .refine(
    (data) => {
      const selectedVehicle = INITIAL_FLEET.find(
        (v: { id: string; seats: number }) => v.id === data.vehicleId,
      );
      if (selectedVehicle && data.passengers > selectedVehicle.seats) {
        return false;
      }
      return true;
    },
    {
      message:
        "Passenger count exceeds maximum seating capacity for selected vehicle",
      path: ["passengers"],
    },
  );

// Step 3 Schema: Customer Details
export const step3Schema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Full name is required (min 2 characters)"),
  customerPhone: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .transform((val) => val.replace(/\D/g, ""))
    .refine(
      (val) => /^[6-9]\d{9}$/.test(val),
      "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9",
    ),
  customerEmail: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please enter a valid email address",
    }),
  pickupAddress: z
    .string()
    .trim()
    .min(3, "Pickup address is required (min 3 characters)"),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy to proceed",
  }),
  honeypot: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 0, {
      message: "Bot submission detected",
    }),
});

// Full Booking Schema combining all steps
export const fullBookingSchema = z
  .object({
    pickupLocation: z
      .string()
      .trim()
      .min(2, "Pickup location is required (min 2 characters)"),
    destination: z
      .string()
      .trim()
      .min(2, "Destination is required (min 2 characters)"),
    tripType: z.enum(["outstation", "local", "airport"]),
    journeyType: z.enum(["one-way", "round-trip"]),
    pickupDate: z
      .string()
      .min(1, "Pickup date is required")
      .refine(
        (val) => !val || val >= getTodayString(),
        "Pickup date cannot be in the past",
      ),
    pickupTime: z.string().min(1, "Pickup time is required"),
    returnDate: z.string().optional(),
    vehicleCategory: z.string().optional(),
    vehicleId: z.string().min(1, "Please select a vehicle"),
    vehicleName: z.string().min(1, "Vehicle name is required"),
    passengers: z.number().int().min(1).max(30),
    luggage: z.number().int().min(0),
    acPreference: z.boolean(),
    tripPurpose: z.enum([
      "Corporate",
      "Family",
      "Wedding",
      "Group Tour",
      "Personal",
      "Other",
    ]),
    additionalNotes: z.string().optional(),
    customerName: z
      .string()
      .trim()
      .min(2, "Full name is required (min 2 characters)"),
    customerPhone: z
      .string()
      .trim()
      .min(1, "Mobile number is required")
      .transform((val) => val.replace(/\D/g, ""))
      .refine(
        (val) => /^[6-9]\d{9}$/.test(val),
        "Please enter a valid 10-digit Indian mobile number",
      ),
    customerEmail: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Please enter a valid email address",
      }),
    pickupAddress: z
      .string()
      .trim()
      .min(3, "Pickup address is required (min 3 characters)"),
    privacyConsent: z.boolean().refine((val) => val === true, {
      message: "You must agree to the privacy policy to proceed",
    }),
    honeypot: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.journeyType === "round-trip") {
        if (!data.returnDate || data.returnDate.trim() === "") {
          return false;
        }
        return data.returnDate >= data.pickupDate;
      }
      return true;
    },
    {
      message:
        "Return date is required and must be on or after pickup date for round trips",
      path: ["returnDate"],
    },
  )
  .refine(
    (data) => {
      const selectedVehicle = INITIAL_FLEET.find(
        (v: { id: string; seats: number }) => v.id === data.vehicleId,
      );
      if (selectedVehicle && data.passengers > selectedVehicle.seats) {
        return false;
      }
      return true;
    },
    {
      message:
        "Passenger count exceeds maximum seating capacity for selected vehicle",
      path: ["passengers"],
    },
  );

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type FullBookingFormData = z.infer<typeof fullBookingSchema>;
