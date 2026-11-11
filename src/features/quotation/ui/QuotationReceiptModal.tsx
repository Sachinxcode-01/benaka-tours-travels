import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Printer,
  FileText,
  MessageCircle,
  Copy,
  CheckCircle2,
  X,
  ShieldCheck,
  Calendar,
  MapPin,
  Car,
  User,
  Phone,
} from "lucide-react";
import type { QuotationDetails } from "../types/quotation";
import { printQuotation } from "../lib/generateQuotePdf";

interface QuotationReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotation: QuotationDetails | null;
}

export const QuotationReceiptModal: React.FC<QuotationReceiptModalProps> = ({
  isOpen,
  onClose,
  quotation,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !quotation) return null;

  const handlePrint = () => {
    printQuotation(quotation);
  };

  const handleCopyText = () => {
    const text = `
*KEDAR TOURS & TRAVELS - OFFICIAL QUOTATION*
Quote Ref: ${quotation.quoteId}
Customer: ${quotation.customerName} (${quotation.customerPhone})
Route: ${quotation.pickupLocation} ➔ ${quotation.destination || "Local"}
Date: ${quotation.pickupDate} at ${quotation.pickupTime}
Vehicle: ${quotation.vehicle.name} (${quotation.vehicle.category})
Passengers: ${quotation.passengers} | AC: ${quotation.acPreference ? "Yes" : "No"}
Estimated Total: ₹${quotation.fareBreakdown.totalEstimatedAmount.toLocaleString("en-IN")}
Chauffeur: 100% Chauffeur Driven (Zero Self-Drive)
Contact: +91 98807 62623 | kedartravels.in
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Convert QuotationDetails into dummy request object for WhatsApp helper if needed
  const whatsappUrl = `https://wa.me/919880762623?text=${encodeURIComponent(
    `Hello Kedar Tours & Travels, I would like to confirm my quotation (${quotation.quoteId}).\n\n` +
    `*Customer:* ${quotation.customerName}\n` +
    `*Route:* ${quotation.pickupLocation} to ${quotation.destination}\n` +
    `*Date:* ${quotation.pickupDate} (${quotation.pickupTime})\n` +
    `*Vehicle:* ${quotation.vehicle.name}\n` +
    `*Estimated Total:* ₹${quotation.fareBreakdown.totalEstimatedAmount.toLocaleString("en-IN")}\n\n` +
    `Please confirm driver dispatch and availability.`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#0B0D12] border border-[#D4AF37]/30 rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Top Bar / Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121620]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Official Fare Quotation Receipt
                </h3>
                <p className="text-xs text-[#D4AF37] font-mono font-semibold">
                  {quotation.quoteId}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close quote modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {/* Business & Customer Header Summary */}
            <div className="p-4 rounded-xl bg-linear-to-br from-[#121620] to-[#1A1F2C] border border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider">
                    Kedar Tours & Travels
                  </span>
                  <div className="text-xs text-slate-300">
                    Panchaxari Nagar 5th Cross, Gadag, Karnataka 582101
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>100% Chauffeur Guarantee</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    <strong className="text-white">Customer:</strong>{" "}
                    {quotation.customerName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    <strong className="text-white">Mobile:</strong>{" "}
                    {quotation.customerPhone}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    <strong className="text-white">Route:</strong>{" "}
                    {quotation.pickupLocation} ➔ {quotation.destination}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    <strong className="text-white">Schedule:</strong>{" "}
                    {quotation.pickupDate} ({quotation.pickupTime})
                  </span>
                </div>
              </div>
            </div>

            {/* Vehicle & Specs */}
            <div className="p-4 rounded-xl bg-[#121620] border border-white/10 space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#D4AF37]">
                  <Car className="w-4 h-4" />
                  Vehicle Assigned
                </span>
                <span className="text-white">{quotation.vehicle.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-400 pt-1">
                <div>
                  Category: <strong className="text-white">{quotation.vehicle.category}</strong>
                </div>
                <div>
                  Capacity: <strong className="text-white">{quotation.vehicle.seats} Seats</strong>
                </div>
                <div>
                  Fuel: <strong className="text-white">{quotation.vehicle.fuel}</strong>
                </div>
                <div>
                  Comfort: <strong className="text-white">{quotation.acPreference ? "AC" : "Non-AC"}</strong>
                </div>
              </div>
            </div>

            {/* Fare Breakdown Table */}
            <div className="p-4 rounded-xl bg-[#121620] border border-[#D4AF37]/20 space-y-3">
              <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                Fare Estimation Breakdown
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                {quotation.fareBreakdown.estimatedKm && (
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Estimated Distance</span>
                    <span className="text-white font-medium">~{quotation.fareBreakdown.estimatedKm} KM</span>
                  </div>
                )}
                {quotation.fareBreakdown.ratePerKm && (
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Base Tariff Rate</span>
                    <span className="text-white font-medium">₹{quotation.fareBreakdown.ratePerKm} / KM</span>
                  </div>
                )}
                {quotation.fareBreakdown.driverAllowance && (
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Driver Allowance (Bhatta)</span>
                    <span className="text-white font-medium">₹{quotation.fareBreakdown.driverAllowance.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {quotation.fareBreakdown.estimatedTolls && (
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Tolls & Permit Estimate</span>
                    <span className="text-white font-medium">₹{quotation.fareBreakdown.estimatedTolls.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 text-sm font-bold text-[#D4AF37]">
                  <span>ESTIMATED TOTAL FARE</span>
                  <span className="text-base font-mono text-emerald-400">
                    ₹{quotation.fareBreakdown.totalEstimatedAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="p-4 sm:p-6 bg-[#121620] border-t border-white/10 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={handlePrint}
                className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-[#D4AF37] to-amber-500 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-emerald-500 active:scale-[0.98] transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Share WhatsApp</span>
              </a>

              <button
                onClick={handleCopyText}
                className="w-full py-3 px-4 rounded-xl bg-[#1A1F2C] border border-white/10 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#D4AF37]" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
