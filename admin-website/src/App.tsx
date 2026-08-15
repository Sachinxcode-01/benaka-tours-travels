import React, { useState, useEffect } from "react";
import { AdminLogin } from "./components/AdminLogin";
import { AdminHeader } from "./components/AdminHeader";
import { FleetManagement } from "./components/FleetManagement";
import { InquiryManagement } from "./components/InquiryManagement";
import { TariffManagement } from "./components/TariffManagement";
import { SettingsAudit } from "./components/SettingsAudit";
import { VehicleModal } from "./components/VehicleModal";
import { VehicleDetailModal } from "./components/VehicleDetailModal";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import {
  INITIAL_FLEET,
  INITIAL_INQUIRIES,
  INITIAL_TARIFFS,
  INITIAL_AUDIT_LOGS,
  INITIAL_ANALYTICS,
} from "./data/initialData";
import type { Vehicle, InquiryRecord, TariffRate, AuditLog, VehicleStatus, InquiryStatus, AnalyticsMetric } from "./types";
import { Car, MessageCircle, DollarSign, Shield, TrendingUp } from "lucide-react";

const FLEET_STORAGE_KEY = "benaka_fleet_inventory";
const INQUIRIES_STORAGE_KEY = "benaka_customer_inquiries";

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("benaka_admin_authenticated") === "true";
  });

  const [activeTab, setActiveTab] = useState<"analytics" | "fleet" | "inquiries" | "tariffs" | "audit">("analytics");

  // Load live fleet from storage or initialize
  const [fleet, setFleet] = useState<Vehicle[]>(() => {
    try {
      const raw = localStorage.getItem(FLEET_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error initializing admin fleet state", e);
    }
    // Save initial fleet on first load
    localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(INITIAL_FLEET));
    return INITIAL_FLEET;
  });

  // Load live inquiries from storage or initialize
  const [inquiries, setInquiries] = useState<InquiryRecord[]>(() => {
    try {
      const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error initializing inquiries state", e);
    }
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(INITIAL_INQUIRIES));
    return INITIAL_INQUIRIES;
  });

  const [tariffs, setTariffs] = useState<TariffRate[]>(INITIAL_TARIFFS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [analytics, setAnalytics] = useState<AnalyticsMetric>(INITIAL_ANALYTICS);

  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [selectedVehicleForDetail, setSelectedVehicleForDetail] = useState<Vehicle | null>(null);

  // Sync state changes to localStorage & trigger public site updates
  const syncFleetState = (newFleet: Vehicle[]) => {
    setFleet(newFleet);
    try {
      localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(newFleet));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("benaka_fleet_updated"));
    } catch (e) {
      console.error("Failed to sync fleet state", e);
    }
  };

  const syncInquiriesState = (newInquiries: InquiryRecord[]) => {
    setInquiries(newInquiries);
    try {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(newInquiries));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("benaka_inquiries_updated"));
    } catch (e) {
      console.error("Failed to sync inquiries state", e);
    }
  };

  // Listen for storage changes from public website or cross-window triggers
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const rawInq = localStorage.getItem(INQUIRIES_STORAGE_KEY);
        if (rawInq) {
          const parsed = JSON.parse(rawInq);
          if (Array.isArray(parsed)) setInquiries(parsed);
        }
        const rawFleet = localStorage.getItem(FLEET_STORAGE_KEY);
        if (rawFleet) {
          const parsed = JSON.parse(rawFleet);
          if (Array.isArray(parsed)) setFleet(parsed);
        }
      } catch (e) {
        console.error("Failed to handle storage change", e);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("benaka_inquiries_updated", handleStorageChange);
    window.addEventListener("benaka_fleet_updated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("benaka_inquiries_updated", handleStorageChange);
      window.removeEventListener("benaka_fleet_updated", handleStorageChange);
    };
  }, []);

  const handleLogin = () => {
    localStorage.setItem("benaka_admin_authenticated", "true");
    setIsAuthenticated(true);
    addAuditLog("LOGIN", "Admin logged in successfully to operations portal.");
  };

  const handleLogout = () => {
    localStorage.removeItem("benaka_admin_authenticated");
    setIsAuthenticated(false);
  };

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      user: "Admin (Sachin K)",
      action,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Fleet handlers
  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setIsVehicleModalOpen(true);
  };

  const handleEditVehicle = (v: Vehicle) => {
    setEditingVehicle(v);
    setIsVehicleModalOpen(true);
  };

  const handleViewDetails = (v: Vehicle) => {
    setSelectedVehicleForDetail(v);
    setIsDetailModalOpen(true);
  };

  const handleSaveVehicle = (vehicle: Vehicle) => {
    const exists = fleet.some((item) => item.id === vehicle.id);
    let updated: Vehicle[];
    if (exists) {
      addAuditLog("UPDATE_VEHICLE", `Updated specifications for ${vehicle.name} (${vehicle.registrationNo}).`);
      updated = fleet.map((item) => (item.id === vehicle.id ? vehicle : item));
    } else {
      addAuditLog("ADD_VEHICLE", `Added new vehicle ${vehicle.name} (${vehicle.registrationNo}) to live fleet.`);
      updated = [...fleet, vehicle];
    }
    syncFleetState(updated);
  };

  const handleDeleteVehicle = (id: string) => {
    const target = fleet.find((v) => v.id === id);
    if (target && window.confirm(`Are you sure you want to remove '${target.name}' from live fleet inventory?`)) {
      const updated = fleet.filter((v) => v.id !== id);
      syncFleetState(updated);
      addAuditLog("DELETE_VEHICLE", `Removed vehicle ${target.name} (${id}) from live inventory.`);
    }
  };

  const handleFleetStatusChange = (id: string, status: VehicleStatus) => {
    const updated = fleet.map((v) => (v.id === id ? { ...v, status } : v));
    syncFleetState(updated);
    if (selectedVehicleForDetail && selectedVehicleForDetail.id === id) {
      setSelectedVehicleForDetail((prev) => (prev ? { ...prev, status } : null));
    }
    addAuditLog("STATUS_CHANGE", `Vehicle ${id} live status set to '${status}'.`);
  };

  // Inquiry handlers
  const handleInquiryStatusChange = (id: string, status: InquiryStatus) => {
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    syncInquiriesState(updated);
    addAuditLog("INQUIRY_STATUS", `Inquiry ${id} status updated to '${status}'.`);
  };

  // Tariff handler
  const handleSaveTariff = (updated: TariffRate) => {
    setTariffs((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    addAuditLog("TARIFF_UPDATE", `Updated rate card tariff for category ${updated.category}.`);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0D12] text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Header */}
      <AdminHeader
        onLogout={handleLogout}
        lastSyncTime={new Date().toLocaleTimeString()}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "analytics"
                ? "bg-linear-to-r from-[#D4AF37] to-amber-500 text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-[#121620] text-slate-300 border border-white/10 hover:border-white/20"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Modern Analytics Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("fleet")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "fleet"
                ? "bg-linear-to-r from-[#D4AF37] to-amber-500 text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-[#121620] text-slate-300 border border-white/10 hover:border-white/20"
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Fleet Inventory ({fleet.length} Cars)</span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "inquiries"
                ? "bg-linear-to-r from-[#D4AF37] to-amber-500 text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-[#121620] text-slate-300 border border-white/10 hover:border-white/20"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Customer Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("tariffs")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "tariffs"
                ? "bg-linear-to-r from-[#D4AF37] to-amber-500 text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-[#121620] text-slate-300 border border-white/10 hover:border-white/20"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Tariff Rate Cards</span>
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "audit"
                ? "bg-linear-to-r from-[#D4AF37] to-amber-500 text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-[#121620] text-slate-300 border border-white/10 hover:border-white/20"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Exports & Security Logs</span>
          </button>
        </div>

        {/* Tab Views */}
        {activeTab === "analytics" && (
          <AnalyticsDashboard
            analytics={analytics}
            fleet={fleet}
            inquiries={inquiries}
          />
        )}

        {activeTab === "fleet" && (
          <FleetManagement
            fleet={fleet}
            onAddVehicle={handleAddVehicle}
            onEditVehicle={handleEditVehicle}
            onDeleteVehicle={handleDeleteVehicle}
            onStatusChange={handleFleetStatusChange}
            onViewDetails={handleViewDetails}
          />
        )}

        {activeTab === "inquiries" && (
          <InquiryManagement
            inquiries={inquiries}
            onStatusChange={handleInquiryStatusChange}
          />
        )}

        {activeTab === "tariffs" && (
          <TariffManagement
            tariffs={tariffs}
            onSaveTariff={handleSaveTariff}
          />
        )}

        {activeTab === "audit" && (
          <SettingsAudit
            logs={auditLogs}
            fleet={fleet}
            inquiries={inquiries}
          />
        )}
      </main>

      {/* Add / Edit Vehicle Modal */}
      <VehicleModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
        onSave={handleSaveVehicle}
        initialVehicle={editingVehicle}
      />

      {/* Detail Inspection Modal */}
      <VehicleDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        vehicle={selectedVehicleForDetail}
        onEdit={handleEditVehicle}
        onStatusChange={handleFleetStatusChange}
      />
    </div>
  );
};
