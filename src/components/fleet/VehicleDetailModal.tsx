import React from "react";
import {
  Users,
  Fuel,
  Briefcase,
  ShieldCheck,
  Check,
  MessageCircle,
  PhoneCall,
  Calendar,
} from "lucide-react";
import { Modal } from "../common/Modal";
import type { Vehicle } from "../../types/fleet";
import { StatusPill } from "../ui/StatusPill";
import {
  generateQuickVehicleWhatsAppUrl,
  DISPLAY_PHONE_NUMBER,
} from "../../utils/whatsapp";

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (vehicle: Vehicle) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  onBook,
}) => {
  if (!vehicle) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={vehicle.name}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Vehicle Image */}
        <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden bg-[#0B0D12]">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <StatusPill status={vehicle.status} />
            <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/30">
              {vehicle.category}
            </span>
          </div>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-[#0B0D12] border border-white/10 text-center">
            <Users className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
            <span className="text-xs text-slate-400 block">
              Seating Capacity
            </span>
            <span className="text-sm font-bold text-white">
              {vehicle.seats} Passengers
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#0B0D12] border border-white/10 text-center">
            <Fuel className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <span className="text-xs text-slate-400 block">Fuel Options</span>
            <span className="text-sm font-bold text-white truncate">
              {vehicle.fuel}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#0B0D12] border border-white/10 text-center">
            <Briefcase className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <span className="text-xs text-slate-400 block">Luggage Space</span>
            <span className="text-sm font-bold text-white">
              {vehicle.luggageCapacity}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#0B0D12] border border-white/10 text-center">
            <ShieldCheck className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <span className="text-xs text-slate-400 block">Chauffeur</span>
            <span className="text-sm font-bold text-emerald-400">
              100% Included
            </span>
          </div>
        </div>

        {/* Overview & Best Use Recommendations */}
        <div className="space-y-3">
          <h4 className="text-base font-bold text-white">
            Vehicle Specification Overview
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {vehicle.notes}
          </p>
        </div>

        {/* Features Tag List */}
        <div>
          <h4 className="text-base font-bold text-white mb-2">
            Key Amenities & Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {vehicle.features.map((feat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-slate-200"
              >
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Trips */}
        <div>
          <h4 className="text-base font-bold text-white mb-2">
            Best Suited For
          </h4>
          <div className="flex flex-wrap gap-2">
            {vehicle.recommendedFor.map((rec, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-[#1A1F2C] border border-white/10 text-slate-300 text-xs font-medium"
              >
                {rec}
              </span>
            ))}
          </div>
        </div>

        {/* Direct Action CTAs */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => {
              onClose();
              onBook(vehicle);
            }}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0B0D12] font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>Book This Vehicle</span>
          </button>

          <a
            href={generateQuickVehicleWhatsAppUrl(vehicle.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-emerald-500"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Inquiry</span>
          </a>

          <a
            href="tel:+916362416120"
            className="py-3 px-4 rounded-xl border border-[#D4AF37]/40 bg-[#121620] text-[#D4AF37] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#1A1F2C]"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {DISPLAY_PHONE_NUMBER}</span>
          </a>
        </div>
      </div>
    </Modal>
  );
};
