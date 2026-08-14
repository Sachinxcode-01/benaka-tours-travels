import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Car,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import { WHATSAPP_PHONE_NUMBER } from "../../../utils/whatsapp";
import { BookingWizardModal } from "../../booking/BookingWizardModal";

interface VehicleRate {
  id: string;
  name: string;
  category: string;
  seats: number;
  perKm: number;
  driverAllowance: number;
  local8hr80km: number;
  local12hr120km: number;
  image: string;
}

const VEHICLE_RATES: VehicleRate[] = [
  {
    id: "dzire",
    name: "Maruti Dzire / Aura",
    category: "Sedan",
    seats: 5,
    perKm: 13,
    driverAllowance: 400,
    local8hr80km: 2400,
    local12hr120km: 3200,
    image: "/assets/vehicles/placeholders/swift dszire.jpg",
  },
  {
    id: "ertiga",
    name: "Maruti Ertiga / XL6",
    category: "MUV",
    seats: 7,
    perKm: 16,
    driverAllowance: 500,
    local8hr80km: 3200,
    local12hr120km: 4200,
    image: "/assets/vehicles/placeholders/ertiga.jpg",
  },
  {
    id: "innova",
    name: "Toyota Innova Crysta",
    category: "Premium MUV",
    seats: 7,
    perKm: 21,
    driverAllowance: 500,
    local8hr80km: 4500,
    local12hr120km: 5800,
    image: "/assets/vehicles/placeholders/innova.jpg",
  },
  {
    id: "tempo",
    name: "Force Tempo Traveller",
    category: "Executive Van",
    seats: 13,
    perKm: 26,
    driverAllowance: 600,
    local8hr80km: 5500,
    local12hr120km: 7200,
    image: "/assets/vehicles/placeholders/tempo traveler.jpg",
  },
];

const TEMPLE_TOURS = [
  {
    name: "Gadag → Lakkundi & Dambal Temple Circuit",
    dist: 80,
    days: 1,
    desc: "12th Century Chalukya architecture circuit",
  },
  {
    name: "Gadag → Hampi UNESCO Heritage Tour",
    dist: 220,
    days: 1,
    desc: "Full day private driver trip to Hampi monuments",
  },
  {
    name: "Gadag → Badami, Pattadakal & Aihole Caves",
    dist: 280,
    days: 1,
    desc: "Ancient cave temples & Chalukyan shrines",
  },
  {
    name: "Gadag → Mantralayam Pilgrimage",
    dist: 360,
    days: 2,
    desc: "Overnight holy shrine tour with dedicated driver",
  },
];

const AIRPORT_ROUTES = [
  { name: "Gadag ↔ Hubballi Airport (HBX)", fareDzire: 1800, fareErtiga: 2400 },
  { name: "Gadag ↔ Belagavi Airport (IXG)", fareDzire: 3800, fareErtiga: 4800 },
  {
    name: "Gadag ↔ Goa Dabolim / Mopa (GOI/GOX)",
    fareDzire: 6500,
    fareErtiga: 8500,
  },
];

export const FareEstimatorWidget: React.FC = () => {
  const [tripType, setTripType] = useState<
    "outstation" | "local" | "temple" | "airport"
  >("outstation");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("dzire");
  const [distanceKm, setDistanceKm] = useState<number>(300);
  const [daysCount, setDaysCount] = useState<number>(1);
  const [localPkg, setLocalPkg] = useState<"8h" | "12h">("8h");
  const [selectedTempleIndex, setSelectedTempleIndex] = useState<number>(0);
  const [selectedAirportIndex, setSelectedAirportIndex] = useState<number>(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  const selectedVehicle = useMemo(
    () =>
      VEHICLE_RATES.find((v) => v.id === selectedVehicleId) || VEHICLE_RATES[0],
    [selectedVehicleId],
  );

  // Calculation logic
  const fareBreakdown = useMemo(() => {
    let baseFare = 0;
    let driverCost = 0;

    if (tripType === "outstation") {
      const minKm = Math.max(distanceKm, daysCount * 250);
      baseFare = minKm * selectedVehicle.perKm;
      driverCost = daysCount * selectedVehicle.driverAllowance;
    } else if (tripType === "local") {
      baseFare =
        localPkg === "8h"
          ? selectedVehicle.local8hr80km
          : selectedVehicle.local12hr120km;
      driverCost = 0; // Included in local pkg
    } else if (tripType === "temple") {
      const tour = TEMPLE_TOURS[selectedTempleIndex];
      const minKm = Math.max(tour.dist, tour.days * 250);
      baseFare = minKm * selectedVehicle.perKm;
      driverCost = tour.days * selectedVehicle.driverAllowance;
    } else if (tripType === "airport") {
      const route = AIRPORT_ROUTES[selectedAirportIndex];
      baseFare =
        selectedVehicleId === "dzire" ? route.fareDzire : route.fareErtiga;
      driverCost = 0;
    }

    const estimatedTotal = Math.round(baseFare + driverCost);
    return {
      baseFare,
      driverCost,
      estimatedTotal,
    };
  }, [
    tripType,
    distanceKm,
    daysCount,
    localPkg,
    selectedVehicle,
    selectedVehicleId,
    selectedTempleIndex,
    selectedAirportIndex,
  ]);

  const handleWhatsAppBooking = () => {
    const text =
      `Hello Benaka Tours & Travels,\n\n` +
      `I would like to inquiry for estimated fare:\n` +
      `Trip Type: ${tripType.toUpperCase()}\n` +
      `Vehicle: ${selectedVehicle.name}\n` +
      `Estimated Total: ₹${fareBreakdown.estimatedTotal.toLocaleString("en-IN")}\n\n` +
      `Please confirm driver availability & exact quotation.`;
    window.open(
      `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <section className="py-20 bg-[#07080B] text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-[#D4AF37] border border-amber-500/30 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Instant Trip Fare Estimator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Transparent Chauffeur Pricing. <br className="hidden sm:block" />
            <span className="text-gradient-gold">Zero Hidden Surprises.</span>
          </h2>
          <p className="text-sm text-slate-300">
            Calculate instant estimates for outstation, local, temple tours, and
            airport drops with verified local drivers.
          </p>
        </div>

        {/* Main Glass Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#0B0D12]/95 border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Left Column: Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trip Type Selector Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                1. Select Service Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#121620] p-1.5 rounded-2xl border border-white/10">
                {[
                  { key: "outstation", label: "Outstation", icon: Navigation },
                  { key: "local", label: "Local Hourly", icon: Car },
                  { key: "temple", label: "Temple Tour", icon: MapPin },
                  { key: "airport", label: "Airport Drop", icon: Sparkles },
                ].map((t) => {
                  const Icon = t.icon;
                  const isActive = tripType === t.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTripType(t.key as any)}
                      className={`relative py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-11 ${
                        isActive
                          ? "text-black bg-linear-to-r from-[#D4AF37] to-[#F59E0B] shadow-md"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vehicle Selector Pills */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                2. Select Preferred Vehicle
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {VEHICLE_RATES.map((v) => {
                  const isSelected = selectedVehicleId === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? "bg-[#161C28] border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-lg shadow-amber-500/10"
                          : "bg-[#121620] border-white/10 hover:border-amber-500/30"
                      }`}
                    >
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/10"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-white truncate">
                          {v.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2">
                          <span>{v.category}</span>
                          <span className="w-1 h-1 rounded-full bg-amber-400" />
                          <span>{v.seats} Seats</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Controls based on Trip Type */}
            <AnimatePresence mode="wait">
              {tripType === "outstation" && (
                <motion.div
                  key="outstation-controls"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 bg-[#121620] p-4 rounded-2xl border border-white/10"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-amber-400" />{" "}
                        Estimated Distance (Km)
                      </span>
                      <span className="font-bold text-[#D4AF37] text-sm">
                        {distanceKm} Km
                      </span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={1000}
                      step={20}
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>100 Km</span>
                      <span>500 Km</span>
                      <span>1000 Km</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" /> Trip
                        Duration (Days)
                      </span>
                      <span className="font-bold text-[#D4AF37] text-sm">
                        {daysCount} Day(s)
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 7].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDaysCount(d)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            daysCount === d
                              ? "bg-amber-400 text-black font-extrabold"
                              : "bg-[#1A1F2C] text-slate-300 hover:text-white border border-white/10"
                          }`}
                        >
                          {d}d
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {tripType === "local" && (
                <motion.div
                  key="local-controls"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3 bg-[#121620] p-4 rounded-2xl border border-white/10"
                >
                  <label className="text-xs font-bold text-slate-300">
                    Choose Package Duration
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setLocalPkg("8h")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        localPkg === "8h"
                          ? "bg-[#161C28] border-[#D4AF37] ring-1 ring-[#D4AF37]"
                          : "bg-[#1A1F2C] border-white/10"
                      }`}
                    >
                      <div className="font-bold text-xs text-white">
                        8 Hours / 80 Km
                      </div>
                      <div className="text-[11px] text-amber-300 mt-1">
                        Standard Full-Day City Package
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocalPkg("12h")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        localPkg === "12h"
                          ? "bg-[#161C28] border-[#D4AF37] ring-1 ring-[#D4AF37]"
                          : "bg-[#1A1F2C] border-white/10"
                      }`}
                    >
                      <div className="font-bold text-xs text-white">
                        12 Hours / 120 Km
                      </div>
                      <div className="text-[11px] text-amber-300 mt-1">
                        Extended Outskirt City Package
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {tripType === "temple" && (
                <motion.div
                  key="temple-controls"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3 bg-[#121620] p-4 rounded-2xl border border-white/10"
                >
                  <label className="text-xs font-bold text-slate-300">
                    Select Heritage Shrine Route
                  </label>
                  <div className="space-y-2">
                    {TEMPLE_TOURS.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTempleIndex(idx)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          selectedTempleIndex === idx
                            ? "bg-[#161C28] border-[#D4AF37] text-white"
                            : "bg-[#1A1F2C] border-white/10 text-slate-300"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs">{t.name}</div>
                          <div className="text-[11px] text-slate-400">
                            {t.desc}
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-amber-400 shrink-0">
                          ~{t.dist} Km
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {tripType === "airport" && (
                <motion.div
                  key="airport-controls"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3 bg-[#121620] p-4 rounded-2xl border border-white/10"
                >
                  <label className="text-xs font-bold text-slate-300">
                    Select Airport Route
                  </label>
                  <div className="space-y-2">
                    {AIRPORT_ROUTES.map((r, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedAirportIndex(idx)}
                        className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          selectedAirportIndex === idx
                            ? "bg-[#161C28] border-[#D4AF37] text-white"
                            : "bg-[#1A1F2C] border-white/10 text-slate-300"
                        }`}
                      >
                        <span className="font-bold text-xs">{r.name}</span>
                        <span className="text-xs font-bold text-amber-300">
                          Fixed Fare Route
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Fare Card Summary & CTAs (5 cols) */}
          <div className="lg:col-span-5 space-y-5 bg-[#121620] p-6 rounded-2xl border border-[#D4AF37]/40 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Estimate Summary
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px]">
                100% Chauffeur Included
              </span>
            </div>

            {/* Price Box */}
            <div className="text-center py-4 bg-[#0B0D12] rounded-xl border border-white/10 space-y-1">
              <span className="text-xs text-slate-400 uppercase font-semibold">
                Estimated Total Fare
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37]">
                ₹{fareBreakdown.estimatedTotal.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-slate-400 ml-1.5">
                  *approx
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Vehicle:{" "}
                <span className="text-slate-200 font-bold">
                  {selectedVehicle.name}
                </span>{" "}
                ({selectedVehicle.seats} Seats)
              </p>
            </div>

            {/* Inclusions / Policy List */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Professional Verified Local Driver</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Fuel Charges & AC Included</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  Excludes Tolls, Parking & Interstate Permits (Paid directly)
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-[#D4AF37] to-[#F59E0B] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer min-h-11"
              >
                <span>Book This Vehicle Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer min-h-11"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Driver Quotation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingWizardModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};
