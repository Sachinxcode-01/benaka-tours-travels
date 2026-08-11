import React, { useCallback, useState } from "react";
import { motion } from "motion/react";
import {
  MessageSquare,
  Phone,
  Copy,
  Check,
  ArrowLeft,
  Bookmark,
} from "lucide-react";
import type { TripFormData } from "../../model/trip-planner.types";
import type { Vehicle } from "@entities/vehicle";
import type { SavedTrip } from "@features/saved-trips/model/saved-trips.types";
import {
  createWhatsAppInquiryUrl,
  generateBookingWhatsAppMessage,
} from "@shared/services/whatsapp.service";
import { createTelUrl } from "@shared/services/phone.service";
import type { BookingRequest } from "@shared/../types/booking";

interface Step4WhatsAppProps {
  formData: TripFormData;
  selectedVehicle: Vehicle | null;
  onBack: () => void;
  onSaveTrip: (trip: Omit<SavedTrip, "id" | "savedAt">) => void;
  onReset: () => void;
}

export const Step4WhatsApp: React.FC<Step4WhatsAppProps> = ({
  formData,
  selectedVehicle,
  onBack,
  onSaveTrip,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Build the WhatsApp message via the shared service
  const bookingRequest: Partial<BookingRequest> = {
    pickupLocation: formData.pickup,
    destination: formData.destination,
    tripType: formData.tripType,
    journeyType: formData.journeyType,
    pickupDate: formData.pickupDate,
    pickupTime: formData.pickupTime,
    returnDate: formData.returnDate || undefined,
    passengers: formData.passengers,
    luggage: formData.luggage,
    acPreference: true,
    tripPurpose: formData.tripPurpose,
    vehicleId: selectedVehicle?.id,
    vehicleName: selectedVehicle?.name,
    vehicleCategory: formData.preferredCategory !== "any" ? formData.preferredCategory : undefined,
    customerName: "Guest",
    customerPhone: "Provided on chat",
    pickupAddress: formData.pickup,
    privacyConsent: true,
  };

  const waMessage = generateBookingWhatsAppMessage(bookingRequest as BookingRequest);
  const waUrl = createWhatsAppInquiryUrl(waMessage);

  const displayMessage = waMessage.replace(/^Hello Benaka Tours & Travels 👋\n\n/, "");

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(waMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [waMessage]);

  const handleSave = useCallback(() => {
    onSaveTrip({
      pickup: formData.pickup,
      destination: formData.destination,
      vehicleId: selectedVehicle?.id,
      vehicleName: selectedVehicle?.name,
      date: formData.pickupDate,
      returnDate: formData.returnDate || undefined,
      passengers: formData.passengers,
      luggage: formData.luggage,
      tripType: formData.tripType,
      journeyType: formData.journeyType,
      tripPurpose: formData.tripPurpose,
    });
    setSaved(true);
  }, [formData, selectedVehicle, onSaveTrip]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Success header */}
      <div className="text-center py-4">
        <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
          <MessageSquare className="w-7 h-7 text-emerald-400" />
        </div>
        <h3 className="font-bold text-white text-base">Ready to Send</h3>
        <p className="text-slate-400 text-xs mt-1">
          Your trip enquiry has been formatted. Send it to Benaka via WhatsApp
          or call us directly.
        </p>
      </div>

      {/* Message Preview */}
      <div className="rounded-2xl bg-[#0F1219] border border-white/10 overflow-hidden">
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Your Enquiry Message
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#D4AF37] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="p-4 max-h-52 overflow-y-auto custom-scrollbar">
          <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
            {displayMessage}
          </pre>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-black font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg"
        >
          <MessageSquare className="w-4 h-4" />
          Send via WhatsApp
        </a>
        <a
          href={createTelUrl()}
          className="w-full py-3 px-4 rounded-xl bg-[#1A1F2C] border border-white/15 text-white font-bold text-sm flex items-center justify-center gap-2 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4" />
          Call Benaka Now
        </a>
      </div>

      {/* Secondary Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleSave}
          disabled={saved}
          className={`flex items-center gap-2 py-2 px-4 rounded-xl border text-xs font-semibold transition-all active:scale-95 ${
            saved
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
              : "bg-[#1A1F2C] border-white/15 text-slate-400 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
          }`}
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          {saved ? "Trip Saved!" : "Save Trip"}
        </button>

        <button
          onClick={onBack}
          className="flex items-center gap-2 py-2 px-4 rounded-xl bg-[#1A1F2C] border border-white/15 text-slate-400 text-xs font-semibold hover:border-white/30 transition-all active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 py-2 px-4 rounded-xl bg-[#1A1F2C] border border-white/15 text-slate-400 text-xs font-semibold hover:border-white/30 transition-all active:scale-95"
        >
          Plan Another Trip
        </button>
      </div>
    </motion.div>
  );
};
