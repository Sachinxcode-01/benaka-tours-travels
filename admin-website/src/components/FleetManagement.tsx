import React, { useState } from "react";
import { Plus, Edit2, Trash2, Car, CheckCircle, Wrench, Ban, Search, Eye, Filter, Gauge, Award, Fuel } from "lucide-react";
import type { Vehicle, VehicleCategory, VehicleStatus } from "../types";

interface FleetManagementProps {
  fleet: Vehicle[];
  onAddVehicle: () => void;
  onEditVehicle: (v: Vehicle) => void;
  onDeleteVehicle: (id: string) => void;
  onStatusChange: (id: string, status: VehicleStatus) => void;
  onViewDetails: (v: Vehicle) => void;
}

export const FleetManagement: React.FC<FleetManagementProps> = ({
  fleet,
  onAddVehicle,
  onEditVehicle,
  onDeleteVehicle,
  onStatusChange,
  onViewDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const filteredFleet = fleet.filter((vehicle) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vehicle.registrationNo && vehicle.registrationNo.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || vehicle.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || vehicle.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: VehicleStatus) => {
    switch (status) {
      case "Available":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <CheckCircle className="w-3 h-3" />
            Available
          </span>
        );
      case "Booked":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <Car className="w-3 h-3" />
            Booked
          </span>
        );
      case "Maintenance":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
            <Wrench className="w-3 h-3" />
            Maintenance
          </span>
        );
      case "Inactive":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-500/10 px-2.5 py-1 rounded-full border border-slate-500/20">
            <Ban className="w-3 h-3" />
            Inactive
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Controls Header */}
      <div className="bg-[#121620] p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Car className="w-5 h-5 text-[#D4AF37]" />
            Fleet Inventory Control ({fleet.length} Total Vehicles)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your active luxury sedans, MUVs, SUVs, and tour buses.
          </p>
        </div>

        <button
          onClick={onAddVehicle}
          className="px-5 py-3 rounded-2xl bg-linear-to-r from-[#D4AF37] to-amber-500 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Fleet Vehicle</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#121620] p-4 rounded-2xl border border-white/10">
        <div className="relative sm:col-span-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or reg no (e.g. Innova / KA-26)..."
            className="w-full admin-field rounded-xl pl-9 pr-3 py-2 text-xs"
          />
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full admin-field rounded-xl px-3 py-2 text-xs"
          >
            <option value="All">All Categories (Sedan, SUV, MUV, Bus)</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="MUV">MUV</option>
            <option value="Minibus">Minibus</option>
            <option value="Bus">Bus</option>
          </select>
        </div>

        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full admin-field rounded-xl px-3 py-2 text-xs"
          >
            <option value="All">All Live Statuses</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Fleet Table */}
      <div className="bg-[#121620] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0B0D12] text-slate-400 font-bold uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Vehicle Specs & Name</th>
                <th className="p-4">Category & Seats</th>
                <th className="p-4">Rate Card</th>
                <th className="p-4">Chauffeur & Odometer</th>
                <th className="p-4">Live Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredFleet.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-white/10 shrink-0 shadow-md group-hover:border-[#D4AF37]/50 transition-all"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-sm font-extrabold text-white">
                            {vehicle.name}
                          </strong>
                          {vehicle.isPopular && (
                            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-bold uppercase">
                              Popular
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#D4AF37] font-mono block mt-0.5">
                          Reg: {vehicle.registrationNo}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {vehicle.fuel} • {vehicle.luggageCapacity}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-bold text-white block w-max">
                      {vehicle.category}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {vehicle.seats} Passenger Capacity
                    </span>
                  </td>

                  <td className="p-4">
                    <strong className="text-sm font-extrabold text-[#D4AF37] block">
                      ₹{vehicle.ratePerKm} / KM
                    </strong>
                    <span className="text-[11px] text-slate-400">
                      Beta: ₹{vehicle.driverAllowanceDay} / day
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-slate-200 block">
                      {vehicle.chauffeurName || "Chauffeur Assigned"}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Gauge className="w-3 h-3 text-[#D4AF37]" />
                      {vehicle.odometerKm.toLocaleString()} KM
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="space-y-1.5">
                      {getStatusBadge(vehicle.status)}
                      <select
                        value={vehicle.status}
                        onChange={(e) => onStatusChange(vehicle.id, e.target.value as VehicleStatus)}
                        className="block w-full mt-1 admin-field rounded-lg px-2 py-1 text-[11px]"
                      >
                        <option value="Available">Available</option>
                        <option value="Booked">Booked</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onViewDetails(vehicle)}
                        className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                        title="View Full Vehicle Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onEditVehicle(vehicle)}
                        className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer"
                        title="Edit Vehicle Specifications"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteVehicle(vehicle.id)}
                        className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                        title="Delete Vehicle"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
