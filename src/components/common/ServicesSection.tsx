import React from "react";
import { ServicesPreviewSection } from "@features/landing/services/ServicesPreviewSection";

interface ServicesSectionProps {
  onOpenBooking?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = () => {
  return <ServicesPreviewSection />;
};
