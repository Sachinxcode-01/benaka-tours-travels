import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Users,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Car,
  Award,
} from "lucide-react";
import type { Vehicle } from "@entities/vehicle/model/vehicle.types";
import { WHATSAPP_PHONE_NUMBER } from "../../../utils/whatsapp";

interface VehicleDetailDrawerProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onBook: (vehicleName: string) => void;
}

export const VehicleDetailDrawer: React.FC<VehicleDetailDrawerProps> = ({
  vehicle,
  onClose,
  onBook,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!vehicle) return null;

  const galleryImages =
    vehicle.gallery && vehicle.gallery.length > 0
      ? vehicle.gallery
      : [vehicle.image];

  const currentImage = galleryImages[activeImageIndex] || vehicle.image;

  const handleWhatsAppBooking = () => {
    const text =
      `Hello Benaka Tours & Travels,\n\n` +
      `I am interested in renting the ${vehicle.name} (${vehicle.seats} seats) with a chauffeur.\n\n` +
      `Please provide exact fare quotation and availability.`;
    window.open(
      `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl bg-[#0B0D12] border border-[#D4AF37]/40 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col text-white"
        >
          {/* Top Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#121620] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37]">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {vehicle.name}
                </h3>
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  {vehicle.category} Tier Fleet
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close vehicle specifications"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1">
            {/* Image Preview & Gallery Switcher */}
            <div className="space-y-3">
              <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 group">
                <img
                  src={currentImage}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600/90 text-white font-extrabold text-xs shadow-lg flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Chauffeur Included
                </span>
              </div>

              {galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx
                          ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/50 opacity-100"
                          : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Metrics Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-[#121620] border border-white/10 space-y-1">
                <Users className="w-4 h-4 text-amber-400 mx-auto" />
                <div className="text-xs font-bold text-white">{vehicle.seats} Seater</div>
                <div className="text-[10px] text-slate-400">Passenger Capacity</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#121620] border border-white/10 space-y-1">
                <Briefcase className="w-4 h-4 text-amber-400 mx-auto" />
                <div className="text-xs font-bold text-white">Large Boot</div>
                <div className="text-[10px] text-slate-400">Luggage Space</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#121620] border border-white/10 space-y-1">
                <Sparkles className="w-4 h-4 text-amber-400 mx-auto" />
                <div className="text-xs font-bold text-white">Dual AC Vents</div>
                <div className="text-[10px] text-slate-400">Climate Control</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#121620] border border-white/10 space-y-1">
                <Award className="w-4 h-4 text-amber-400 mx-auto" />
                <div className="text-xs font-bold text-white">Pro Driver</div>
                <div className="text-[10px] text-slate-400">Local Verified</div>
              </div>
            </div>

            {/* Included Features Grid */}
            <div className="space-y-3 bg-[#121620] p-4 sm:p-5 rounded-2xl border border-white/10">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Comfort & In-Cab Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                {vehicle.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Trips */}
            <div className="space-y-3 bg-[#121620] p-4 sm:p-5 rounded-2xl border border-white/10">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Car className="w-4 h-4" /> Ideal For
              </h4>
              <div className="flex flex-wrap gap-2">
                {vehicle.recommendedFor.map((rec, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold"
                  >
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Sticky Action Footer */}
          <div className="p-4 sm:p-5 bg-[#121620] border-t border-white/10 flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onClose();
                onBook(vehicle.name);
              }}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-linear-to-r from-[#D4AF37] to-[#F59E0B] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer min-h-11"
            >
              <span>Request Quote for {vehicle.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleWhatsAppBooking}
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer min-h-11"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
