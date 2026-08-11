import React from "react";
import {
  MessageCircle,
  Phone,
  Calendar,
  MapPin,
  Users,
  Car,
} from "lucide-react";
import type { BookingSummaryData } from "../model/chatbot.types";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";

interface BookingSummaryProps {
  summary: BookingSummaryData;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({ summary }) => {
  const waMsg =
    `Hello Benaka Tours & Travels,\n\n` +
    `I would like to request a chauffeur-driven vehicle quotation.\n\n` +
    `Name: ${summary.customerName || "Customer"}\n` +
    `Phone: ${summary.customerPhone || "Provided on chat"}\n` +
    `Pickup: ${summary.pickup || "Gadag"}\n` +
    `Destination: ${summary.destination || "Destination"}\n` +
    `Travel date: ${summary.travelDate || "As discussed"}\n` +
    `Passengers: ${summary.passengers || 4}\n` +
    `Preferred vehicle: ${summary.vehicleName || "Chauffeur Vehicle"}\n` +
    `Trip purpose: ${summary.tripType || "Outstation Trip"}\n\n` +
    `Please confirm availability and estimated fare.`;

  return (
    <div className="p-2.5 md:p-4 rounded-xl bg-gradient-to-b from-[#121620] to-[#0B0D12] border border-[#D4AF37]/40 text-[11px] md:text-xs text-slate-200 space-y-2 md:space-y-3 shadow-xl my-1.5">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
        <span className="font-bold text-[#D4AF37] uppercase tracking-wider text-[10px] md:text-xs">
          📋 Trip Summary
        </span>
        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-extrabold text-[10px]">
          100% Chauffeur Included
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            From: <strong>{summary.pickup || "Gadag"}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            To: <strong>{summary.destination || "Destination"}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            Date: <strong>{summary.travelDate || "Flexible"}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            Pax: <strong>{summary.passengers || 4} Passengers</strong>
          </span>
        </div>
        <div className="col-span-2 flex items-center gap-1.5 pt-1 border-t border-white/5">
          <Car className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span>
            Vehicle:{" "}
            <strong>{summary.vehicleName || "Chauffeur Vehicle"}</strong>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <a
          href={createWhatsAppInquiryUrl(waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[11px] flex items-center justify-center gap-1 shadow-md transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>Send to WhatsApp</span>
        </a>

        <a
          href={createTelUrl()}
          className="py-2 px-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 font-bold text-[11px] flex items-center justify-center gap-1 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Call</span>
        </a>
      </div>
    </div>
  );
};
