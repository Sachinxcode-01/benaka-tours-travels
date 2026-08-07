import React from "react";
import type { Vehicle } from "@entities/vehicle";
import { BookingWizardModal } from "@features/booking/BookingWizardModal";

interface VehicleBookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle;
}

export const VehicleBookingFormModal: React.FC<
  VehicleBookingFormModalProps
> = ({ isOpen, onClose, vehicle }) => {
  return (
    <BookingWizardModal
      isOpen={isOpen}
      onClose={onClose}
      initialVehicle={vehicle as any}
    />
  );
};
