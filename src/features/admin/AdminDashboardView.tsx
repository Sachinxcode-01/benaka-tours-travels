import React, { useState } from "react";
import {
  LogOut,
  Car,
  Users,
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Phone,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { INITIAL_FLEET } from "../../data/fleet";
import type { Vehicle, VehicleStatus } from "../../types/fleet";
import type { InquiryRecord, InquiryStatus } from "../../types/admin";
import { Modal } from "../../components/common/Modal";
import { FormField } from "../../components/forms/FormField";
import { PrimaryButton } from "../../components/ui/PrimaryButton";

interface AdminDashboardViewProps {
  onLogout: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  onLogout,
}) => {
  const [fleetList, setFleetList] = useState<Vehicle[]>(INITIAL_FLEET);
  const [activeTab, setActiveTab] = useState<"fleet" | "inquiries">("fleet");

  const [inquiries, setInquiries] = useState<InquiryRecord[]>([
    {
      id: "inq-101",
      createdAt: "2026-08-06 10:15",
      customerName: "Suresh Kulkarni",
      customerPhone: "9876543210",
      pickupLocation: "Gadag",
      destination: "Hubballi",
      pickupDate: "2026-08-10",
      vehicleName: "Toyota Innova Crysta",
      passengers: 6,
      status: "New",
    },
    {
      id: "inq-102",
      createdAt: "2026-08-05 16:30",
      customerName: "Deepa G.",
      customerPhone: "9812345678",
      pickupLocation: "Gadag",
      destination: "Belagavi",
      pickupDate: "2026-08-12",
      vehicleName: "Maruti Ertiga",
      passengers: 5,
      status: "Quote Sent",
    },
    {
      id: "inq-103",
      createdAt: "2026-08-04 14:00",
      customerName: "Vijay Hiremath",
      customerPhone: "9900112233",
      pickupLocation: "Gadag",
      destination: "Goa",
      pickupDate: "2026-08-15",
      vehicleName: "Tempo Traveller",
      passengers: 12,
      status: "Confirmed",
    },
  ]);

  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleVehicleStatus = (id: string, newStatus: VehicleStatus) => {
    setFleetList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v)),
    );
  };

  const updateInquiryStatus = (id: string, newStatus: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq)),
    );
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;

    setFleetList((prev) => {
      const exists = prev.some((v) => v.id === editingVehicle.id);
      if (exists) {
        return prev.map((v) =>
          v.id === editingVehicle.id ? editingVehicle : v,
        );
      }
      return [...prev, editingVehicle];
    });

    setIsEditModalOpen(false);
    setEditingVehicle(null);
  };

  const handleDeleteVehicle = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this vehicle from the live fleet?",
      )
    ) {
      setFleetList((prev) => prev.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] text-slate-200">
      {/* Header Bar */}
      <header className="bg-[#121620] border-b border-[#D4AF37]/20 py-4 px-6 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-xl bg-[#0B0D12] border border-[#D4AF37]/30 flex items-center justify-center shadow-md shadow-[#D4AF37]/10">
            <img
              src="/assets/brand/benaka_emblem_gold_transparent.png"
              alt="Benaka Fleet Admin Logo"
              className="h-9 w-auto object-contain shrink-0 drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-accent text-2xl text-[#D4AF37] leading-none tracking-tight">
              Benaka
            </span>
            <span className="text-[10px] tracking-[0.2em] font-extrabold uppercase text-white mt-0.5">
              Fleet Admin Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-xs font-bold text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-xl hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#121620] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 block">
                Total Vehicles
              </span>
              <strong className="text-2xl font-extrabold text-white">
                {fleetList.length}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <Car className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#121620] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 block">
                Available Now
              </span>
              <strong className="text-2xl font-extrabold text-emerald-400">
                {fleetList.filter((v) => v.status === "Available").length}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#121620] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 block">
                Currently Booked
              </span>
              <strong className="text-2xl font-extrabold text-amber-400">
                {fleetList.filter((v) => v.status === "Booked").length}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#121620] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 block">
                Active Inquiries
              </span>
              <strong className="text-2xl font-extrabold text-blue-400">
                {inquiries.length}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("fleet")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "fleet"
                ? "bg-[#D4AF37] text-black shadow-md"
                : "bg-[#121620] text-slate-300 border border-white/10"
            }`}
          >
            Fleet Inventory Management ({fleetList.length})
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "inquiries"
                ? "bg-[#D4AF37] text-black shadow-md"
                : "bg-[#121620] text-slate-300 border border-white/10"
            }`}
          >
            Customer Inquiries ({inquiries.length})
          </button>
        </div>

        {/* Fleet Tab Content */}
        {activeTab === "fleet" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                Live Vehicle Inventory
              </h2>
              <button
                onClick={() => {
                  setEditingVehicle({
                    id: `v-${Date.now()}`,
                    name: "",
                    category: "Sedan",
                    seats: 5,
                    fuel: "Petrol / CNG / Diesel",
                    status: "Available",
                    notes: "",
                    image: "/assets/vehicles/placeholders/swift dszire.jpg",
                    features: ["AC", "Music System"],
                    recommendedFor: ["Local", "Outstation"],
                    chauffeurIncluded: true,
                    acAvailable: true,
                    luggageCapacity: "2 Bags",
                  });
                  setIsEditModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Vehicle</span>
              </button>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden border border-white/10 bg-[#121620]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0B0D12] text-slate-400 uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-4">Vehicle</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Seats</th>
                      <th className="p-4">Fuel</th>
                      <th className="p-4">Live Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {fleetList.map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-white/5">
                        <td className="p-4 font-bold text-white flex items-center gap-3">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span>{vehicle.name}</span>
                        </td>
                        <td className="p-4">{vehicle.category}</td>
                        <td className="p-4">{vehicle.seats} Seats</td>
                        <td className="p-4">{vehicle.fuel}</td>
                        <td className="p-4">
                          <select
                            value={vehicle.status}
                            onChange={(e) =>
                              toggleVehicleStatus(
                                vehicle.id,
                                e.target.value as VehicleStatus,
                              )
                            }
                            className="admin-field rounded-lg px-2 py-1 text-xs"
                          >
                            <option value="Available">Available</option>
                            <option value="Booked">Booked</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </td>
                        <td className="p-4 flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingVehicle(vehicle);
                              setIsEditModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/10 hover:text-[#D4AF37]"
                            title="Edit Vehicle"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                            title="Delete Vehicle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Inquiries Tab Content */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">
              Quotation & Booking Inquiries
            </h2>

            <div className="glass-card rounded-2xl overflow-hidden border border-white/10 bg-[#121620]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0B0D12] text-slate-400 uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Route</th>
                      <th className="p-4">Vehicle</th>
                      <th className="p-4">Travel Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Contact Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-white/5">
                        <td className="p-4 font-bold text-white">
                          {inq.customerName}
                        </td>
                        <td className="p-4">{inq.customerPhone}</td>
                        <td className="p-4">
                          {inq.pickupLocation} ➔ {inq.destination}
                        </td>
                        <td className="p-4">{inq.vehicleName}</td>
                        <td className="p-4">{inq.pickupDate}</td>
                        <td className="p-4">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              updateInquiryStatus(
                                inq.id,
                                e.target.value as InquiryStatus,
                              )
                            }
                            className="admin-field rounded-lg px-2 py-1 text-xs"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Quote Sent">Quote Sent</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 flex items-center gap-2">
                          <a
                            href={`https://wa.me/91${inq.customerPhone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-600/90 text-white font-bold text-xs flex items-center gap-1"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`tel:${inq.customerPhone}`}
                            className="p-2 rounded-lg bg-white/10 text-white font-bold text-xs flex items-center gap-1"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Call</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Vehicle Modal */}
      {editingVehicle && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Manage Vehicle Specifications"
          maxWidth="lg"
        >
          <form onSubmit={handleSaveVehicle} className="space-y-4">
            <FormField label="Vehicle Name" required>
              <input
                type="text"
                required
                value={editingVehicle.name}
                onChange={(e) =>
                  setEditingVehicle({ ...editingVehicle, name: e.target.value })
                }
                className="w-full px-3 py-2 admin-field rounded-xl text-sm"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Category">
                <select
                  value={editingVehicle.category}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      category: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 admin-field rounded-xl text-sm"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="MUV">MUV</option>
                  <option value="Minibus">Minibus</option>
                  <option value="Bus">Bus</option>
                </select>
              </FormField>

              <FormField label="Seating Capacity">
                <input
                  type="number"
                  value={editingVehicle.seats}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      seats: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-3 py-2 admin-field rounded-xl text-sm"
                />
              </FormField>
            </div>

            <FormField label="Image URL">
              <input
                type="text"
                value={editingVehicle.image}
                onChange={(e) =>
                  setEditingVehicle({
                    ...editingVehicle,
                    image: e.target.value,
                  })
                }
                className="w-full px-3 py-2 admin-field rounded-xl text-sm"
              />
            </FormField>

            <FormField label="Notes & Description">
              <textarea
                rows={3}
                value={editingVehicle.notes}
                onChange={(e) =>
                  setEditingVehicle({
                    ...editingVehicle,
                    notes: e.target.value,
                  })
                }
                className="w-full px-3 py-2 admin-field rounded-xl text-sm"
              />
            </FormField>

            <PrimaryButton type="submit" fullWidth>
              Save Vehicle to Live Inventory
            </PrimaryButton>
          </form>
        </Modal>
      )}
    </div>
  );
};
