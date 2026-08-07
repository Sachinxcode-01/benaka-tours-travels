import React from "react";
import type { VehicleAvailability } from "@entities/vehicle";
import { Badge } from "../badge/Badge";

export interface StatusBadgeProps {
  status: VehicleAvailability;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
}) => {
  const config = {
    available: {
      label: "Available",
      variant: "available" as const,
      dotClass: "bg-emerald-400 animate-pulse",
    },
    booked: {
      label: "Booked",
      variant: "booked" as const,
      dotClass: "bg-rose-400",
    },
    maintenance: {
      label: "Maintenance",
      variant: "neutral" as const,
      dotClass: "bg-amber-400",
    },
    inactive: {
      label: "Inactive",
      variant: "neutral" as const,
      dotClass: "bg-neutral-500",
    },
  };

  const current = config[status] || config.available;

  return (
    <Badge variant={current.variant} className={className}>
      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${current.dotClass}`} />
      <span>{current.label}</span>
    </Badge>
  );
};
