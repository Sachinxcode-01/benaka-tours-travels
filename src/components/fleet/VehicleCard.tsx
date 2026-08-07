import React from "react";
import { motion } from "motion/react";
import { Users, Fuel, ShieldCheck, Info, MessageCircle } from "lucide-react";
import type { Vehicle } from "../../types/fleet";
import { StatusPill } from "../ui/StatusPill";
import { generateQuickVehicleWhatsAppUrl } from "../../utils/whatsapp";

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  onBook: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onSelect,
  onBook,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="glass-card rounded-2xl overflow-hidden border border-[#D4AF37]/20 bg-[#121620]/90 flex flex-col justify-between group"
    >
      {/* Image Container with Zoom effect */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-[#0B0D12]">
        <img
          src={vehicle.image}
          alt={`Benaka Tours & Travels - ${vehicle.name}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <StatusPill status={vehicle.status} />
          {vehicle.isPopular && (
            <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#0B0D12] text-xs font-extrabold uppercase tracking-wide">
              Popular
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-semibold">
            {vehicle.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
              {vehicle.name}
            </h3>
          </div>
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
            {vehicle.notes}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 py-2 border-y border-white/10">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#D4AF37]" />
              <span>{vehicle.seats} Seats Capacity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-4 h-4 text-amber-400" />
              <span className="truncate">{vehicle.fuel}</span>
            </div>
          </div>
        </div>

        {/* Chauffeur Included Trust Badge */}
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>100% Chauffeur-Driven • Driver Included</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <button
            onClick={() => onSelect(vehicle)}
            className="py-2.5 px-2 rounded-xl bg-[#1A1F2C] border border-white/10 text-slate-200 text-xs font-bold flex items-center justify-center gap-1 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          <a
            href={generateQuickVehicleWhatsAppUrl(vehicle.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Chat</span>
          </a>

          <button
            onClick={() => onBook(vehicle)}
            className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0B0D12] text-xs font-bold flex items-center justify-center gap-1 shadow-md hover:brightness-110 transition-all"
          >
            <span>Book</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
