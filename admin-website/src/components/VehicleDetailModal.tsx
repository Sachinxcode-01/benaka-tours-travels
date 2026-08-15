import React from "react";
import { X, Car, Shield, Gauge, Calendar, User, Phone, CheckCircle, Wrench, Edit3, Award, Fuel } from "lucide-react";
import type { Vehicle, VehicleStatus } from "../types";

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (v: Vehicle) => void;
  onStatusChange: (id: string, status: VehicleStatus) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  onEdit,
  onStatusChange,
}) => {
  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121620] border border-[#D4AF37]/30 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center font-bold">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white">{vehicle.name}</h3>
                {vehicle.isPopular && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Popular Choice
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Reg No: <strong className="text-[#D4AF37]">{vehicle.registrationNo}</strong> • Category: {vehicle.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(vehicle);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs flex items-center gap-1.5 hover:brightness-110 cursor-pointer shadow-md"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Specs</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Image & Quick Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 h-56 bg-black">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-semibold border border-white/20">
                {vehicle.seats} Seater • {vehicle.fuel}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-black font-extrabold shadow-md">
                ₹{vehicle.ratePerKm} / KM
              </span>
            </div>
          </div>

          {/* Key Parameters */}
          <div className="space-y-3 text-xs">
            <div className="bg-[#0B0D12] p-3.5 rounded-xl border border-white/5 flex items-center justify-between">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-[#D4AF37]" />
                Odometer Reading
              </span>
              <strong className="text-white font-mono text-sm">{vehicle.odometerKm.toLocaleString()} KM</strong>
            </div>

            <div className="bg-[#0B0D12] p-3.5 rounded-xl border border-white/5 flex items-center justify-between">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Last Maintenance Service
              </span>
              <strong className="text-white font-mono">{vehicle.lastServiceDate}</strong>
            </div>

            <div className="bg-[#0B0D12] p-3.5 rounded-xl border border-white/5 flex items-center justify-between">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-400" />
                Assigned Chauffeur
              </span>
              <span className="text-slate-200 font-bold">
                {vehicle.chauffeurName || "Unassigned"} ({vehicle.chauffeurPhone || "N/A"})
              </span>
            </div>

            <div className="bg-[#0B0D12] p-3.5 rounded-xl border border-white/5 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Driver Beta / Day</span>
              <strong className="text-[#D4AF37] text-sm">₹{vehicle.driverAllowanceDay}</strong>
            </div>
          </div>
        </div>

        {/* Features & Recommended Uses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#0B0D12] p-4 rounded-2xl border border-white/5 space-y-2">
            <h4 className="font-bold text-[#D4AF37] uppercase tracking-wider text-[10px]">
              Equipped Features & Amenities
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {vehicle.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-200 border border-white/10 font-medium"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#0B0D12] p-4 rounded-2xl border border-white/5 space-y-2">
            <h4 className="font-bold text-[#D4AF37] uppercase tracking-wider text-[10px]">
              Recommended Travel Routes
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {vehicle.recommendedFor.map((rec, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 font-semibold"
                >
                  • {rec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Operational Status Control Footer */}
        <div className="bg-[#0B0D12] p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Change Live Status:</span>
            <select
              value={vehicle.status}
              onChange={(e) => onStatusChange(vehicle.id, e.target.value as VehicleStatus)}
              className="admin-field rounded-xl px-3 py-1.5 text-xs font-bold"
            >
              <option value="Available">Available for Booking</option>
              <option value="Booked">Booked (On Duty)</option>
              <option value="Maintenance">Under Service / Maintenance</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 hover:bg-white/20 font-bold text-xs cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
