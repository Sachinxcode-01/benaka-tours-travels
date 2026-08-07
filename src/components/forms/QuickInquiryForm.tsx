import React, { useState } from "react";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import type { BookingRequest } from "../../types/booking";
import type { VehicleCategory } from "../../types/fleet";

interface QuickInquiryFormProps {
  onSearch: (data: Partial<BookingRequest>) => void;
}

export const QuickInquiryForm: React.FC<QuickInquiryFormProps> = ({
  onSearch,
}) => {
  const [pickup, setPickup] = useState("Gadag");
  const [destination, setDestination] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [passengers] = useState(4);
  const [category, setCategory] = useState<VehicleCategory | "All">("All");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      pickupLocation: pickup,
      destination: destination || "Hubballi",
      pickupDate: pickupDate || new Date().toISOString().split("T")[0],
      passengers,
      additionalNotes:
        category !== "All" ? `Preferred Category: ${category}` : undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl p-4 md:p-6 border border-[#D4AF37]/30 bg-[#121620]/95 shadow-2xl backdrop-blur-xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Pickup Location */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Pickup City</span>
          </label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="e.g. Gadag"
            className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Destination */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Destination</span>
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Hubballi / Goa"
            className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Pickup Date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Travel Date</span>
          </label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Passengers & Category */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Passengers & Type</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">All Categories</option>
            <option value="Sedan">Sedan (5 Seats)</option>
            <option value="SUV">SUV (5-7 Seats)</option>
            <option value="MUV">MUV (7-11 Seats)</option>
            <option value="Minibus">Minibus (13 Seats)</option>
            <option value="Bus">Bus (25 Seats)</option>
          </select>
        </div>

        {/* Submit CTA Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full h-[44px] flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0B0D12] font-bold text-sm shadow-lg shadow-[#D4AF37]/25 hover:brightness-110 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Request Quote</span>
          </button>
        </div>
      </div>
    </form>
  );
};
