import React, { useEffect } from "react";
import { motion } from "motion/react";
import { MessageSquare, ArrowRight, ArrowLeft, Scale } from "lucide-react";
import type { TripFormData, VehicleRecommendation } from "../../model/trip-planner.types";
import type { Vehicle } from "@entities/vehicle";
import { VehicleRecommendCard } from "../components/VehicleRecommendCard";
import { useComparisonStore } from "@features/vehicle-comparison/model/comparison.store";

interface Step2VehicleSelectProps {
  formData: TripFormData;
  recommendations: VehicleRecommendation[];
  onComputeRecommendations: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onBack: () => void;
  onContact: () => void;
}

export const Step2VehicleSelect: React.FC<Step2VehicleSelectProps> = ({
  formData,
  recommendations,
  onComputeRecommendations,
  onSelectVehicle,
  onBack,
  onContact,
}) => {
  const { toggleComparison, isInComparison, canAdd } = useComparisonStore();

  useEffect(() => {
    onComputeRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Header summary */}
      <div className="p-3 rounded-xl bg-[#0F1219] border border-white/10 flex flex-wrap gap-3 text-xs text-slate-400">
        <span>
          📍 <strong className="text-white">{formData.pickup}</strong> →{" "}
          <strong className="text-white">{formData.destination}</strong>
        </span>
        <span>
          👥 <strong className="text-white">{formData.passengers}</strong> passengers
        </span>
        <span>
          📅 <strong className="text-white">{formData.pickupDate}</strong>
        </span>
      </div>

      {recommendations.length === 0 ? (
        <div className="py-10 text-center space-y-4">
          <p className="text-slate-400 text-sm">
            No available vehicles found for {formData.passengers} passengers
            {formData.preferredCategory !== "any"
              ? ` in the ${formData.preferredCategory} category`
              : ""}
            .
          </p>
          <p className="text-slate-500 text-xs">
            For groups over 25 or special requirements, please contact our team directly.
          </p>
          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-sm hover:brightness-110 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            Contact Directly
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-300">
            {recommendations.length} vehicle{recommendations.length > 1 ? "s" : ""} recommended for your trip
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendations.map((rec) => (
              <VehicleRecommendCard
                key={rec.vehicle.id}
                recommendation={rec}
                onSelect={() => onSelectVehicle(rec.vehicle)}
                onCompare={() => toggleComparison(rec.vehicle.id)}
                isInComparison={isInComparison(rec.vehicle.id)}
                canAddToComparison={canAdd}
              />
            ))}
          </div>
        </div>
      )}

      {/* Compare link */}
      {recommendations.some((r) => isInComparison(r.vehicle.id)) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2 text-purple-400 text-xs">
            <Scale className="w-4 h-4 shrink-0" />
            <span>Vehicles added to comparison</span>
          </div>
          <a
            href="/compare"
            className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
          >
            View Compare <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[#1A1F2C] border border-white/10 text-slate-300 font-semibold text-sm hover:border-white/30 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </motion.div>
  );
};
