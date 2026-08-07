import React from "react";
import { Users, Fuel, ShieldCheck, Check } from "lucide-react";
import type { Vehicle } from "../../../types/fleet";

interface VehiclePreviewCardProps {
  vehicle: Vehicle;
  acPreference?: boolean;
}

export const VehiclePreviewCard: React.FC<VehiclePreviewCardProps> = ({
  vehicle,
  acPreference = true,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-[#0B0D12]/90 border border-white/10 flex flex-col sm:flex-row items-center gap-4 shadow-xl">
      {/* Vehicle Image */}
      <div className="w-full sm:w-36 h-24 rounded-xl bg-black border border-white/10 overflow-hidden relative shrink-0">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
        <div className="absolute top-1 right-1 bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
          Chauffeur Included
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="flex-1 space-y-1.5 text-left w-full">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white tracking-wide">
            {vehicle.name}
          </h4>
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            {vehicle.category}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            {vehicle.seats} Seats Capacity
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5 text-[#D4AF37]" />
            {vehicle.fuel || "Diesel/Petrol"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3 h-3" />
            Verified Fleet Driver
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1 font-semibold">
            <Check className="w-3 h-3 text-[#D4AF37]" />
            {acPreference ? "Air Conditioned (AC)" : "Non-AC / Standard"}
          </span>
        </div>
      </div>
    </div>
  );
};
