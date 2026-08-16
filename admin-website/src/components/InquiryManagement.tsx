import React, { useState, useMemo } from "react";
import {
  MessageCircle,
  Phone,
  Clock,
  User,
  MapPin,
  Calendar,
  Search,
  Filter,
  X,
  RefreshCw,
} from "lucide-react";
import type { InquiryRecord, InquiryStatus } from "../types";

interface InquiryManagementProps {
  inquiries: InquiryRecord[];
  onStatusChange: (id: string, status: InquiryStatus) => void;
}

export const InquiryManagement: React.FC<InquiryManagementProps> = ({
  inquiries,
  onStatusChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus =
        statusFilter === "All" || inq.status === statusFilter;
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !searchLower ||
        inq.customerName.toLowerCase().includes(searchLower) ||
        inq.customerPhone.includes(searchLower) ||
        inq.pickupLocation.toLowerCase().includes(searchLower) ||
        inq.destination.toLowerCase().includes(searchLower) ||
        inq.vehicleName.toLowerCase().includes(searchLower) ||
        inq.id.toLowerCase().includes(searchLower);

      return matchesStatus && matchesSearch;
    });
  }, [inquiries, statusFilter, searchTerm]);

  const getStatusBadge = (status: InquiryStatus) => {
    const styles: Record<InquiryStatus, string> = {
      New: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      Contacted: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      "Quote Sent": "bg-amber-500/10 text-amber-400 border-amber-500/30",
      Confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      Completed: "bg-slate-500/10 text-slate-400 border-slate-500/30",
      Cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    };

    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-[#121620] p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#D4AF37]" />
            Customer Booking Inquiries ({inquiries.length})
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time quote requests submitted by customers through the public web portal.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Field */}
          <div className="relative min-w-[240px] flex-1 sm:flex-none">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, phone, route..."
              className="w-full pl-9 pr-8 py-2 bg-[#0B0D12] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-[#0B0D12] px-3 py-1.5 rounded-xl border border-white/10">
            <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer font-semibold"
            >
              <option value="All" className="bg-[#121620]">All Statuses</option>
              <option value="New" className="bg-[#121620]">New</option>
              <option value="Contacted" className="bg-[#121620]">Contacted</option>
              <option value="Quote Sent" className="bg-[#121620]">Quote Sent</option>
              <option value="Confirmed" className="bg-[#121620]">Confirmed</option>
              <option value="Completed" className="bg-[#121620]">Completed</option>
              <option value="Cancelled" className="bg-[#121620]">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Summary Indicator */}
      {(searchTerm || statusFilter !== "All") && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#121620]/60 rounded-xl border border-white/5 text-xs text-slate-300">
          <span>
            Showing <strong className="text-white">{filteredInquiries.length}</strong> of{" "}
            <strong className="text-white">{inquiries.length}</strong> inquiries
          </span>
          <button
            onClick={handleResetFilters}
            className="text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}

      {/* Inquiries Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-[#121620] rounded-2xl border border-white/10 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">No inquiries found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No customer inquiries match your active search terms or status filter.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-[#D4AF37] text-black font-bold text-xs inline-flex items-center gap-1.5 shadow-md hover:brightness-110 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear Search Filters</span>
            </button>
          </div>
        ) : (
          filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-[#121620] rounded-2xl border border-white/10 p-5 space-y-4 hover:border-[#D4AF37]/30 transition-all shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center font-bold text-sm border border-[#D4AF37]/20">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{inq.customerName}</h3>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      Submitted: {inq.createdAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(inq.status)}
                  <select
                    value={inq.status}
                    onChange={(e) => onStatusChange(inq.id, e.target.value as InquiryStatus)}
                    className="admin-field rounded-lg px-2.5 py-1 text-xs"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Quote Sent">Quote Sent</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold block uppercase text-[10px] tracking-wider">
                    Travel Route
                  </span>
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {inq.pickupLocation} ➔ {inq.destination}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold block uppercase text-[10px] tracking-wider">
                    Requested Vehicle & Date
                  </span>
                  <p className="font-medium text-slate-200 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {inq.vehicleName} ({inq.passengers} Passengers) on {inq.pickupDate}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold block uppercase text-[10px] tracking-wider">
                    Notes / Special Requirements
                  </span>
                  <p className="text-slate-300 italic">{inq.notes || "None specified."}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-3">
                <a
                  href={`https://wa.me/91${inq.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Namaste ${inq.customerName}, greeting from Benaka Tours & Travels regarding your inquiry for ${inq.vehicleName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Quote</span>
                </a>

                <a
                  href={`tel:${inq.customerPhone}`}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Call Customer</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
