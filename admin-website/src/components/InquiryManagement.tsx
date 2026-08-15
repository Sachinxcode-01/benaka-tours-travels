import React from "react";
import { MessageCircle, Phone, Clock, User, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import type { InquiryRecord, InquiryStatus } from "../types";

interface InquiryManagementProps {
  inquiries: InquiryRecord[];
  onStatusChange: (id: string, status: InquiryStatus) => void;
}

export const InquiryManagement: React.FC<InquiryManagementProps> = ({
  inquiries,
  onStatusChange,
}) => {
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
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#121620] p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#D4AF37]" />
            Customer Booking Inquiries ({inquiries.length})
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time quote requests submitted by customers through the public web portal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {inquiries.map((inq) => (
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
        ))}
      </div>
    </div>
  );
};
