import React from "react";
import { motion } from "motion/react";
import { Users, Zap, Star, Scale, ArrowRight } from "lucide-react";
import type { VehicleRecommendation } from "../../model/trip-planner.types";

interface VehicleRecommendCardProps {
  recommendation: VehicleRecommendation;
  onSelect: () => void;
  onCompare: () => void;
  isInComparison: boolean;
  canAddToComparison: boolean;
}

const rankColors = {
  exact: "border-emerald-500/40 bg-emerald-500/5",
  comfortable: "border-[#D4AF37]/40 bg-amber-500/5",
  premium: "border-purple-500/40 bg-purple-500/5",
};

const rankBadge = {
  exact: { label: "Best Fit", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  comfortable: { label: "Comfortable", color: "bg-amber-500/15 text-[#D4AF37] border-amber-500/30" },
  premium: { label: "Spacious", color: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
};

export const VehicleRecommendCard: React.FC<VehicleRecommendCardProps> = ({
  recommendation,
  onSelect,
  onCompare,
  isInComparison,
  canAddToComparison,
}) => {
  const { vehicle, reason, rank } = recommendation;
  const badge = rankBadge[rank];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`relative rounded-2xl border p-4 sm:p-5 flex flex-col gap-3 transition-all duration-200 ${rankColors[rank]}`}
    >
      {/* Rank badge */}
      <div className="absolute top-3 right-3">
        <span
          className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${badge.color}`}
        >
          {badge.label}
        </span>
      </div>

      {/* Vehicle image + info */}
      <div className="flex gap-3 items-start">
        <div className="w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden bg-[#0F1219] shrink-0 border border-white/10">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-sm sm:text-base leading-tight truncate">
            {vehicle.name}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
            <span className="flex items-center gap-1 text-slate-400 text-xs">
              <Users className="w-3 h-3" />
              {vehicle.seats} Seats
            </span>
            <span className="text-xs text-slate-500 uppercase tracking-wider">
              {vehicle.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <Zap className="w-3 h-3" />
              {vehicle.fuelTypes.join("/")}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <Star className="w-3 h-3 text-[#D4AF37] fill-current" />
            <span className="text-[10px] text-slate-400">
              Chauffeur Included
            </span>
          </div>
        </div>
      </div>

      {/* Recommendation reason */}
      <p className="text-xs text-slate-400 leading-relaxed bg-[#0F1219]/60 rounded-lg px-3 py-2 border border-white/5">
        💡 {reason}
      </p>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onSelect}
          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all"
        >
          <span>Select Vehicle</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onCompare}
          disabled={!isInComparison && !canAddToComparison}
          title={
            !canAddToComparison && !isInComparison
              ? "Max 3 vehicles in comparison"
              : isInComparison
                ? "Remove from comparison"
                : "Add to comparison"
          }
          className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
            isInComparison
              ? "bg-purple-500/20 text-purple-400 border-purple-500/40"
              : "bg-[#1A1F2C] text-slate-400 border-white/15 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          {isInComparison ? "Remove" : "Compare"}
        </button>
      </div>
    </motion.div>
  );
};
