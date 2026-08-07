import type { BookingRequest } from "../types/booking";

export interface ValidationError {
  field: string;
  message: string;
}

export function validateBookingForm(
  data: Partial<BookingRequest>,
  selectedVehicleSeats?: number,
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.pickupLocation?.trim()) {
    errors.push({
      field: "pickupLocation",
      message: "Pickup location is required",
    });
  }

  if (!data.destination?.trim()) {
    errors.push({ field: "destination", message: "Destination is required" });
  }

  if (!data.pickupDate) {
    errors.push({ field: "pickupDate", message: "Pickup date is required" });
  }

  if (!data.customerName?.trim()) {
    errors.push({ field: "customerName", message: "Full name is required" });
  }

  if (!data.customerPhone?.trim()) {
    errors.push({
      field: "customerPhone",
      message: "Mobile number is required",
    });
  } else if (!/^[6-9]\d{9}$/.test(data.customerPhone.replace(/\D/g, ""))) {
    errors.push({
      field: "customerPhone",
      message: "Please enter a valid 10-digit Indian phone number",
    });
  }

  if (
    selectedVehicleSeats &&
    data.passengers &&
    data.passengers > selectedVehicleSeats
  ) {
    errors.push({
      field: "passengers",
      message: `Selected vehicle seat capacity is ${selectedVehicleSeats}. Please select a larger vehicle or decrease passengers.`,
    });
  }

  return errors;
}
