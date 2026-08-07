import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Vehicle, FilterCategory } from "../../types/fleet";
import { VehicleCard } from "./VehicleCard";

interface VehicleGridProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  onBookVehicle: (vehicle: Vehicle) => void;
}

export const VehicleGrid: React.FC<VehicleGridProps> = ({
  vehicles,
  onSelectVehicle,
  onBookVehicle,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filterTabs: FilterCategory[] = [
    "All",
    "Sedan",
    "SUV",
    "MUV",
    "Minibus",
    "Bus",
    "Available",
    "Booked",
  ];

  const filteredVehicles = vehicles.filter((v) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Available") return v.status === "Available";
    if (activeFilter === "Booked") return v.status === "Booked";
    return v.category === activeFilter;
  });

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 custom-scrollbar">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab;
          const count =
            tab === "All"
              ? vehicles.length
              : tab === "Available"
                ? vehicles.filter((v) => v.status === "Available").length
                : tab === "Booked"
                  ? vehicles.filter((v) => v.status === "Booked").length
                  : vehicles.filter((v) => v.category === tab).length;

          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`relative px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 focus:outline-none ${
                isActive
                  ? "text-[#0B0D12] font-extrabold"
                  : "text-slate-300 hover:text-white bg-[#121620]/80 border border-white/10"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] shadow-md z-0"
                />
              )}
              <span className="relative z-10">{tab}</span>
              <span
                className={`relative z-10 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isActive
                    ? "bg-black/20 text-black"
                    : "bg-white/10 text-slate-300"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid Display */}
      {filteredVehicles.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
          <p className="text-lg font-bold text-white">
            No vehicles found in &quot;{activeFilter}&quot;
          </p>
          <p className="text-sm text-slate-400">
            Try switching filter tabs or contact our 24/7 support desk to check
            custom vehicle arrangements.
          </p>
          <button
            onClick={() => setActiveFilter("All")}
            className="mt-2 text-xs text-[#D4AF37] font-bold underline hover:text-amber-400"
          >
            Show All 12 Vehicles
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={onSelectVehicle}
                onBook={onBookVehicle}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
