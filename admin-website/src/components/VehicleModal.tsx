import React, { useState, useEffect } from "react";
import { X, Save, Car, Fuel, Users, Image as ImageIcon, Gauge, User, Calendar, Shield } from "lucide-react";
import type { Vehicle, VehicleCategory, VehicleStatus } from "../types";

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (v: Vehicle) => void;
  initialVehicle?: Vehicle | null;
}

export const VehicleModal: React.FC<VehicleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialVehicle,
}) => {
  const [vehicle, setVehicle] = useState<Vehicle>({
    id: `v-${Date.now()}`,
    name: "",
    registrationNo: "KA-26-M-0000",
    category: "Sedan",
    seats: 4,
    fuel: "Petrol / CNG / Diesel",
    status: "Available",
    ratePerKm: 14,
    driverAllowanceDay: 400,
    image: "/assets/vehicles/placeholders/swift dszire.jpg",
    features: ["Air Conditioning", "Music System", "Chauffeur Driven"],
    recommendedFor: ["Local Pick & Drop", "Outstation Trip"],
    luggageCapacity: "2 Medium Bags",
    acAvailable: true,
    chauffeurIncluded: true,
    chauffeurName: "Ramesh Pujar",
    chauffeurPhone: "+91 98440 12345",
    odometerKm: 35000,
    lastServiceDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  useEffect(() => {
    if (initialVehicle) {
      setVehicle({ ...initialVehicle });
    } else {
      setVehicle({
        id: `v-${Date.now()}`,
        name: "",
        registrationNo: "KA-26-M-0000",
        category: "Sedan",
        seats: 4,
        fuel: "Petrol / CNG / Diesel",
        status: "Available",
        ratePerKm: 14,
        driverAllowanceDay: 400,
        image: "/assets/vehicles/placeholders/swift dszire.jpg",
        features: ["Air Conditioning", "Music System", "Chauffeur Driven"],
        recommendedFor: ["Local Pick & Drop", "Outstation Trip"],
        luggageCapacity: "2 Medium Bags",
        acAvailable: true,
        chauffeurIncluded: true,
        chauffeurName: "Ramesh Pujar",
        chauffeurPhone: "+91 98440 12345",
        odometerKm: 35000,
        lastServiceDate: new Date().toISOString().split("T")[0],
        notes: "",
      });
    }
  }, [initialVehicle, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(vehicle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121620] border border-[#D4AF37]/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Car className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-lg font-extrabold text-white">
              {initialVehicle ? "Edit Vehicle Specifications" : "Add New Fleet Vehicle"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Vehicle Name & Model *</label>
              <input
                type="text"
                required
                value={vehicle.name}
                onChange={(e) => setVehicle({ ...vehicle, name: e.target.value })}
                placeholder="e.g. Toyota Innova Crysta ZX"
                className="w-full admin-field rounded-xl px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Registration Number *</label>
              <input
                type="text"
                required
                value={vehicle.registrationNo}
                onChange={(e) => setVehicle({ ...vehicle, registrationNo: e.target.value })}
                placeholder="e.g. KA-26-Z-9999"
                className="w-full admin-field rounded-xl px-3 py-2.5 text-sm font-mono text-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Category</label>
              <select
                value={vehicle.category}
                onChange={(e) => setVehicle({ ...vehicle, category: e.target.value as VehicleCategory })}
                className="w-full admin-field rounded-xl px-3 py-2.5 text-sm"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="MUV">MUV</option>
                <option value="Minibus">Minibus</option>
                <option value="Bus">Bus</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Seating Capacity</label>
              <input
                type="number"
                required
                min={1}
                value={vehicle.seats}
                onChange={(e) => setVehicle({ ...vehicle, seats: Number(e.target.value) })}
                className="w-full admin-field rounded-xl px-3 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Rate Per KM (₹)</label>
              <input
                type="number"
                required
                min={1}
                value={vehicle.ratePerKm}
                onChange={(e) => setVehicle({ ...vehicle, ratePerKm: Number(e.target.value) })}
                className="w-full admin-field rounded-xl px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Driver Beta / Day (₹)</label>
              <input
                type="number"
                required
                min={0}
                value={vehicle.driverAllowanceDay}
                onChange={(e) => setVehicle({ ...vehicle, driverAllowanceDay: Number(e.target.value) })}
                className="w-full admin-field rounded-xl px-3 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Assigned Chauffeur Name</label>
              <input
                type="text"
                value={vehicle.chauffeurName || ""}
                onChange={(e) => setVehicle({ ...vehicle, chauffeurName: e.target.value })}
                placeholder="e.g. Ramesh Pujar"
                className="w-full admin-field rounded-xl px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Chauffeur Contact Phone</label>
              <input
                type="text"
                value={vehicle.chauffeurPhone || ""}
                onChange={(e) => setVehicle({ ...vehicle, chauffeurPhone: e.target.value })}
                placeholder="+91 98440 12345"
                className="w-full admin-field rounded-xl px-3 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Odometer (Total KM)</label>
              <input
                type="number"
                value={vehicle.odometerKm}
                onChange={(e) => setVehicle({ ...vehicle, odometerKm: Number(e.target.value) })}
                className="w-full admin-field rounded-xl px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Last Service Date</label>
              <input
                type="date"
                value={vehicle.lastServiceDate}
                onChange={(e) => setVehicle({ ...vehicle, lastServiceDate: e.target.value })}
                className="w-full admin-field rounded-xl px-3 py-2.5 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Image Asset Path / URL</label>
            <input
              type="text"
              required
              value={vehicle.image}
              onChange={(e) => setVehicle({ ...vehicle, image: e.target.value })}
              placeholder="/assets/vehicles/placeholders/Toyota-Innova-Crysta.jpg"
              className="w-full admin-field rounded-xl px-3 py-2.5 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Fuel Type</label>
              <input
                type="text"
                value={vehicle.fuel}
                onChange={(e) => setVehicle({ ...vehicle, fuel: e.target.value })}
                placeholder="Diesel / Petrol / CNG"
                className="w-full admin-field rounded-xl px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Initial Status</label>
              <select
                value={vehicle.status}
                onChange={(e) => setVehicle({ ...vehicle, status: e.target.value as VehicleStatus })}
                className="w-full admin-field rounded-xl px-3 py-2.5 text-sm"
              >
                <option value="Available">Available for Booking</option>
                <option value="Booked">Booked (On Duty)</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Operational Notes & Description</label>
            <textarea
              rows={2}
              value={vehicle.notes}
              onChange={(e) => setVehicle({ ...vehicle, notes: e.target.value })}
              placeholder="Operational condition, special luggage notes, etc..."
              className="w-full admin-field rounded-xl px-3 py-2.5 text-sm"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 hover:bg-white/20 font-bold text-xs cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-linear-to-r from-[#D4AF37] to-amber-500 text-black font-bold text-xs flex items-center gap-1.5 hover:brightness-110 shadow-lg cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Vehicle to Inventory</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
