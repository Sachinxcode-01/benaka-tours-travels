import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Edit2, Info } from "lucide-react";
import type { TripFormData } from "../../model/trip-planner.types";
import type { Vehicle } from "@entities/vehicle";

interface Step3ReviewTripProps {
  formData: TripFormData;
  selectedVehicle: Vehicle | null;
  onNext: () => void;
  onBack: () => void;
  onEditStep: (step: 1 | 2) => void;
}

interface ReviewRowProps {
  label: string;
  value: string;
}

const ReviewRow: React.FC<ReviewRowProps> = ({ label, value }) => (
  <div className="flex items-start justify-between gap-3 py-2.5 border-b border-white/5 last:border-0">
    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide shrink-0 w-28">
      {label}
    </span>
    <span className="text-sm text-white text-right">{value}</span>
  </div>
);

export const Step3ReviewTrip: React.FC<Step3ReviewTripProps> = ({
  formData,
  selectedVehicle,
  onNext,
  onBack,
  onEditStep,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Trip Summary Card */}
      <div className="rounded-2xl bg-[#0F1219] border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Trip Summary</h3>
          <button
            onClick={() => onEditStep(1)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#D4AF37] transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            Edit Details
          </button>
        </div>
        <div className="p-4 space-y-0.5">
          <ReviewRow label="Pickup" value={formData.pickup} />
          <ReviewRow label="Destination" value={formData.destination} />
          <ReviewRow label="Date" value={formData.pickupDate} />
          <ReviewRow
            label="Time"
            value={formData.pickupTime}
          />
          <ReviewRow
            label="Journey"
            value={
              formData.journeyType === "round-trip"
                ? `Round Trip${formData.returnDate ? ` (Return: ${formData.returnDate})` : ""}`
                : "One-Way"
            }
          />
          <ReviewRow label="Trip Type" value={formData.tripType.charAt(0).toUpperCase() + formData.tripType.slice(1)} />
          <ReviewRow
            label="Passengers"
            value={`${formData.passengers} passenger${formData.passengers > 1 ? "s" : ""}`}
          />
          <ReviewRow
            label="Luggage"
            value={`${formData.luggage} bag${formData.luggage !== 1 ? "s" : ""}`}
          />
          <ReviewRow label="Purpose" value={formData.tripPurpose} />
        </div>
      </div>

      {/* Selected Vehicle */}
      {selectedVehicle && (
        <div className="rounded-2xl bg-[#0F1219] border border-[#D4AF37]/20 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Selected Vehicle</h3>
            <button
              onClick={() => onEditStep(2)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#D4AF37] transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              Change
            </button>
          </div>
          <div className="p-4 flex gap-4 items-center">
            <div className="w-20 h-14 rounded-xl overflow-hidden bg-[#07080B] shrink-0 border border-white/10">
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-white text-sm">{selectedVehicle.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedVehicle.seats} Seats • {selectedVehicle.category.toUpperCase()} •{" "}
                {selectedVehicle.fuelTypes.join("/")}
              </p>
              <p className="text-xs text-emerald-400 mt-1 font-medium">
                ✓ 100% Chauffeur-Driven
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Fare Disclaimer */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-300/80 leading-relaxed">
          <strong className="text-amber-300">Fare Note:</strong> The fare will
          be calculated by Benaka Tours & Travels based on your route, distance,
          duration, vehicle and travel requirements. No fare is confirmed at this
          stage.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[#1A1F2C] border border-white/10 text-slate-300 font-semibold text-sm hover:border-white/30 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 sm:flex-none sm:min-w-[200px] py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg"
        >
          Request Final Quote
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
