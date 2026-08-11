import React from "react";
import { motion } from "motion/react";
import { MapPin, Calendar, Clock, Users, Briefcase, Target, ArrowRight } from "lucide-react";
import type { TripFormData } from "../../model/trip-planner.types";
import { VoiceButton } from "@features/voice";
import type { VoiceEntities } from "@features/voice";

interface Step1TripDetailsProps {
  formData: TripFormData;
  onUpdate: (updates: Partial<TripFormData>) => void;
  onNext: () => void;
}

const TRIP_TYPES = [
  { value: "outstation", label: "Outstation" },
  { value: "local", label: "Local" },
  { value: "airport", label: "Airport Transfer" },
] as const;

const JOURNEY_TYPES = [
  { value: "one-way", label: "One-Way" },
  { value: "round-trip", label: "Round Trip" },
] as const;

const PURPOSES = [
  "Personal", "Corporate", "Family", "Wedding", "Group Tour", "Other",
] as const;

const CATEGORIES = [
  { value: "any", label: "Any" },
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "muv", label: "MUV" },
  { value: "minibus", label: "Minibus" },
  { value: "bus", label: "Bus" },
] as const;

export const Step1TripDetails: React.FC<Step1TripDetailsProps> = ({
  formData,
  onUpdate,
  onNext,
}) => {
  const [errors, setErrors] = React.useState<Partial<Record<keyof TripFormData, string>>>({});

  const validate = () => {
    const e: Partial<Record<keyof TripFormData, string>> = {};
    if (!formData.pickup.trim()) e.pickup = "Pickup location is required";
    if (!formData.destination.trim()) e.destination = "Destination is required";
    if (!formData.pickupDate) e.pickupDate = "Travel date is required";
    if (!formData.pickupTime) e.pickupTime = "Pickup time is required";
    if (formData.passengers < 1) e.passengers = "At least 1 passenger required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const handleVoiceEntities = (entities: VoiceEntities) => {
    const updates: Partial<TripFormData> = {};
    if (entities.pickup) updates.pickup = entities.pickup;
    if (entities.destination) updates.destination = entities.destination;
    if (entities.passengers) updates.passengers = entities.passengers;
    if (entities.tripType === "one-way" || entities.tripType === "round-trip") {
      updates.journeyType = entities.tripType;
    }
    if (Object.keys(updates).length > 0) onUpdate(updates);
  };

  const inputCls = (field: keyof TripFormData) =>
    `w-full bg-[#0F1219] border ${
      errors[field] ? "border-red-500/60" : "border-white/10"
    } rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors`;

  const labelCls = "block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Voice Input Banner */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F1219] border border-white/10">
        <VoiceButton onEntities={handleVoiceEntities} size="sm" />
        <div>
          <p className="text-xs font-semibold text-slate-300">Voice Input</p>
          <p className="text-[10px] text-slate-500">
            Say: "Gadag to Goa for 8 people tomorrow"
          </p>
        </div>
      </div>

      {/* Route */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="tp-pickup">
            <MapPin className="inline w-3 h-3 mr-1" />
            Pickup Location
          </label>
          <input
            id="tp-pickup"
            type="text"
            value={formData.pickup}
            onChange={(e) => onUpdate({ pickup: e.target.value })}
            placeholder="e.g. Gadag"
            className={inputCls("pickup")}
          />
          {errors.pickup && (
            <p className="text-red-400 text-[10px] mt-1">{errors.pickup}</p>
          )}
        </div>
        <div>
          <label className={labelCls} htmlFor="tp-destination">
            <MapPin className="inline w-3 h-3 mr-1" />
            Destination
          </label>
          <input
            id="tp-destination"
            type="text"
            value={formData.destination}
            onChange={(e) => onUpdate({ destination: e.target.value })}
            placeholder="e.g. Goa"
            className={inputCls("destination")}
          />
          {errors.destination && (
            <p className="text-red-400 text-[10px] mt-1">{errors.destination}</p>
          )}
        </div>
      </div>

      {/* Trip type + Journey type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Trip Type</label>
          <div className="flex gap-2">
            {TRIP_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => onUpdate({ tripType: t.value })}
                className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                  formData.tripType === t.value
                    ? "bg-amber-500/15 border-[#D4AF37] text-[#D4AF37]"
                    : "bg-[#0F1219] border-white/10 text-slate-400 hover:border-white/30"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelCls}>Journey Type</label>
          <div className="flex gap-2">
            {JOURNEY_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => onUpdate({ journeyType: t.value })}
                className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                  formData.journeyType === t.value
                    ? "bg-amber-500/15 border-[#D4AF37] text-[#D4AF37]"
                    : "bg-[#0F1219] border-white/10 text-slate-400 hover:border-white/30"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dates + Times */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="col-span-1">
          <label className={labelCls} htmlFor="tp-date">
            <Calendar className="inline w-3 h-3 mr-1" />
            Date
          </label>
          <input
            id="tp-date"
            type="date"
            value={formData.pickupDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => onUpdate({ pickupDate: e.target.value })}
            className={inputCls("pickupDate")}
          />
          {errors.pickupDate && (
            <p className="text-red-400 text-[10px] mt-1">{errors.pickupDate}</p>
          )}
        </div>
        <div className="col-span-1">
          <label className={labelCls} htmlFor="tp-time">
            <Clock className="inline w-3 h-3 mr-1" />
            Time
          </label>
          <input
            id="tp-time"
            type="time"
            value={formData.pickupTime}
            onChange={(e) => onUpdate({ pickupTime: e.target.value })}
            className={inputCls("pickupTime")}
          />
          {errors.pickupTime && (
            <p className="text-red-400 text-[10px] mt-1">{errors.pickupTime}</p>
          )}
        </div>
        {formData.journeyType === "round-trip" && (
          <>
            <div className="col-span-1">
              <label className={labelCls} htmlFor="tp-return-date">
                Return Date
              </label>
              <input
                id="tp-return-date"
                type="date"
                value={formData.returnDate}
                min={formData.pickupDate || new Date().toISOString().split("T")[0]}
                onChange={(e) => onUpdate({ returnDate: e.target.value })}
                className={inputCls("returnDate")}
              />
            </div>
            <div className="col-span-1">
              <label className={labelCls} htmlFor="tp-return-time">
                Return Time
              </label>
              <input
                id="tp-return-time"
                type="time"
                value={formData.returnTime}
                onChange={(e) => onUpdate({ returnTime: e.target.value })}
                className={inputCls("returnTime")}
              />
            </div>
          </>
        )}
      </div>

      {/* Passengers + Luggage */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="tp-passengers">
            <Users className="inline w-3 h-3 mr-1" />
            Passengers
          </label>
          <input
            id="tp-passengers"
            type="number"
            min={1}
            max={25}
            value={formData.passengers}
            onChange={(e) =>
              onUpdate({ passengers: Math.max(1, parseInt(e.target.value) || 1) })
            }
            className={inputCls("passengers")}
          />
          {errors.passengers && (
            <p className="text-red-400 text-[10px] mt-1">{errors.passengers}</p>
          )}
        </div>
        <div>
          <label className={labelCls} htmlFor="tp-luggage">
            <Briefcase className="inline w-3 h-3 mr-1" />
            Luggage Bags
          </label>
          <input
            id="tp-luggage"
            type="number"
            min={0}
            max={20}
            value={formData.luggage}
            onChange={(e) =>
              onUpdate({ luggage: Math.max(0, parseInt(e.target.value) || 0) })
            }
            className={inputCls("luggage")}
          />
        </div>
      </div>

      {/* Purpose + Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="tp-purpose">
            <Target className="inline w-3 h-3 mr-1" />
            Trip Purpose
          </label>
          <select
            id="tp-purpose"
            value={formData.tripPurpose}
            onChange={(e) =>
              onUpdate({ tripPurpose: e.target.value as TripFormData["tripPurpose"] })
            }
            className={inputCls("tripPurpose")}
          >
            {PURPOSES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="tp-category">
            Preferred Vehicle Category
          </label>
          <select
            id="tp-category"
            value={formData.preferredCategory}
            onChange={(e) => onUpdate({ preferredCategory: e.target.value })}
            className={inputCls("preferredCategory")}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleNext}
          className="w-full sm:w-auto sm:min-w-[180px] py-3 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg"
        >
          Find Vehicles
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
