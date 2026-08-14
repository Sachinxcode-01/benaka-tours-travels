import React from "react";
import { motion } from "@shared/lib/motion";

export type FleetFilterOption =
  "all" | "sedan" | "muv" | "suv" | "minibus" | "bus" | "available" | "booked";

interface FleetFilterBarProps {
  activeFilter: FleetFilterOption;
  onFilterChange: (filter: FleetFilterOption) => void;
  counts: Record<FleetFilterOption, number>;
}

export const FleetFilterBar: React.FC<FleetFilterBarProps> = ({
  activeFilter,
  onFilterChange,
  counts,
}) => {
  const filterTabs: { key: FleetFilterOption; label: string }[] = [
    { key: "all", label: `All Vehicles (${counts.all || 0})` },
    { key: "sedan", label: `Sedans (${counts.sedan || 0})` },
    { key: "muv", label: `MUVs (${counts.muv || 0})` },
    { key: "suv", label: `SUVs (${counts.suv || 0})` },
    { key: "minibus", label: `Minibus (${counts.minibus || 0})` },
    { key: "bus", label: `Heavy Coach (${counts.bus || 0})` },
    { key: "available", label: `Available Now (${counts.available || 0})` },
    { key: "booked", label: `Currently Booked (${counts.booked || 0})` },
  ];

  return (
    <div className="w-full overflow-x-auto pb-3 scrollbar-none">
      <div className="flex items-center gap-2 min-w-max px-1">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onFilterChange(tab.key)}
              className={`relative text-xs font-semibold px-4 py-2.5 rounded-full transition-colors cursor-pointer min-h-11 flex items-center justify-center ${
                isActive
                  ? "text-neutral-950 font-bold"
                  : "text-slate-300 hover:text-white bg-neutral-900/80 border border-neutral-800"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="fleet-filter-active-pill"
                  className="absolute inset-0 bg-linear-to-r from-amber-400 via-amber-300 to-amber-500 rounded-full shadow-md shadow-amber-500/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
