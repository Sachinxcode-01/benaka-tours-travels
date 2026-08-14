import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Trash2,
  MessageSquare,
  MapPin,
  Calendar,
  Users,
  Car,
} from "lucide-react";
import type { SavedTrip } from "../model/saved-trips.types";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";

interface SavedTripCardProps {
  trip: SavedTrip;
  onDelete: (id: string) => void;
  onBookAgain: (trip: SavedTrip) => void;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatSavedAt(ts: number): string {
  try {
    return new Date(ts).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export const SavedTripCard: React.FC<SavedTripCardProps> = ({
  trip,
  onDelete,
  onBookAgain,
}) => {
  const waMsg =
    `Hello Benaka Tours & Travels 👋\n\n` +
    `I would like to re-book a previous trip.\n\n` +
    `📍 Pickup: ${trip.pickup}\n` +
    `🏁 Destination: ${trip.destination}\n` +
    `📅 Date: ${trip.date || "To be confirmed"}\n` +
    `👥 Passengers: ${trip.passengers}\n` +
    `🚘 Vehicle: ${trip.vehicleName || "Open to suggestion"}\n\n` +
    `Please confirm availability and provide an estimated fare.\n\nThank you 🙏`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className="rounded-2xl bg-[#0B0D12] border border-white/8 p-4 sm:p-5 flex flex-col gap-3"
    >
      {/* Route header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span className="text-sm font-bold text-white truncate">
            {trip.pickup}
          </span>
          <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
          <span className="text-sm font-bold text-white truncate">
            {trip.destination}
          </span>
        </div>
        <button
          onClick={() => onDelete(trip.id)}
          aria-label="Delete trip"
          className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-colors shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {trip.date && (
          <div className="flex items-start gap-1.5">
            <Calendar className="w-3 h-3 text-slate-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-500">Date</p>
              <p className="text-xs text-slate-300 font-medium">
                {formatDate(trip.date)}
              </p>
            </div>
          </div>
        )}
        <div className="flex items-start gap-1.5">
          <Users className="w-3 h-3 text-slate-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-500">Passengers</p>
            <p className="text-xs text-slate-300 font-medium">
              {trip.passengers}
            </p>
          </div>
        </div>
        {trip.vehicleName && (
          <div className="flex items-start gap-1.5">
            <Car className="w-3 h-3 text-slate-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-500">Vehicle</p>
              <p className="text-xs text-slate-300 font-medium truncate">
                {trip.vehicleName}
              </p>
            </div>
          </div>
        )}
        <div className="flex items-start gap-1.5">
          <span className="text-[10px] text-slate-500 mt-0.5">🔁</span>
          <div>
            <p className="text-[10px] text-slate-500">Type</p>
            <p className="text-xs text-slate-300 font-medium capitalize">
              {trip.journeyType}
            </p>
          </div>
        </div>
      </div>

      {/* Saved time */}
      <p className="text-[10px] text-slate-600">
        Saved on {formatSavedAt(trip.savedAt)}
      </p>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onBookAgain(trip)}
          className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-xs flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all justify-center"
        >
          Book Again
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <a
          href={createWhatsAppInquiryUrl(waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-4 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-semibold text-xs flex items-center gap-1.5 hover:bg-[#25D366]/25 active:scale-95 transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
};
