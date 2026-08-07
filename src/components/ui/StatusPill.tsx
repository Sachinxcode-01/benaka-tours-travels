import React from "react";
import type { VehicleStatus } from "../../types/fleet";

interface StatusPillProps {
  status: VehicleStatus;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const isAvailable = status === "Available";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
        isAvailable
          ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
          : "bg-amber-500/10 border border-amber-500/30 text-amber-400"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isAvailable ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
        }`}
      />
      <span>{status}</span>
    </span>
  );
};
