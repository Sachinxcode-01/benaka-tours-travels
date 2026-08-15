import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  CheckCircle2,
  MapPin,
  User,
  Phone,
  Mail,
  Copy,
  RefreshCw,
  MessageCircle,
  PhoneCall,
  Sparkles,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
} from "lucide-react";
import { Modal } from "../../components/common/Modal";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { SecondaryButton } from "../../components/ui/SecondaryButton";
import { FormField } from "../../components/forms/FormField";
import type {
  BookingRequest,
  TripPurpose,
  TripType,
  JourneyType,
} from "../../types/booking";
import type { Vehicle } from "../../types/fleet";
import { INITIAL_FLEET } from "../../data/fleet";
import {
  step1Schema,
  step2Schema,
  step3Schema,
} from "../booking-inquiry/model/booking.schema";
import {
  generateWhatsAppInquiryUrl,
  DISPLAY_PHONE_NUMBER,
  WHATSAPP_PHONE_NUMBER,
} from "../../utils/whatsapp";
import { useBookingDraft } from "../booking-inquiry/lib/useBookingDraft";
import { RouteTimeline } from "../booking-inquiry/ui/RouteTimeline";
import { VehiclePreviewCard } from "../booking-inquiry/ui/VehiclePreviewCard";

interface BookingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVehicle?: Vehicle | null;
  initialData?: Partial<BookingRequest> | null;
}

const getTodayString = () => new Date().toISOString().split("T")[0];

const DEFAULT_FORM_STATE: BookingRequest = {
  pickupLocation: "Gadag",
  destination: "",
  tripType: "outstation",
  journeyType: "one-way",
  pickupDate: getTodayString(),
  pickupTime: "08:00",
  returnDate: "",
  vehicleCategory: "all",
  vehicleId: "innova-crysta",
  vehicleName: "Toyota Innova Crysta",
  passengers: 4,
  luggage: 2,
  acPreference: true,
  tripPurpose: "Personal",
  additionalNotes: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  pickupAddress: "Panchaxari Nagar, Gadag",
  privacyConsent: true,
  honeypot: "",
};

export const BookingWizardModal: React.FC<BookingWizardModalProps> = ({
  isOpen,
  onClose,
  initialVehicle,
  initialData,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const { draft, hasUnsavedDraft, saveDraft, clearDraft } = useBookingDraft();
  const [showDraftBanner, setShowDraftBanner] = useState<boolean>(false);

  const firstInputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(
    null,
  );

  const [formData, setFormData] = useState<BookingRequest>(() => {
    return {
      ...DEFAULT_FORM_STATE,
      ...initialData,
      vehicleId:
        initialVehicle?.id ||
        initialData?.vehicleId ||
        DEFAULT_FORM_STATE.vehicleId,
      vehicleName:
        initialVehicle?.name ||
        initialData?.vehicleName ||
        DEFAULT_FORM_STATE.vehicleName,
    };
  });

  // Handle vehicle preselection from prop
  useEffect(() => {
    if (initialVehicle) {
      setFormData((prev) => ({
        ...prev,
        vehicleId: initialVehicle.id,
        vehicleName: initialVehicle.name,
      }));
    }
  }, [initialVehicle]);

  // Check for unsaved draft on open
  useEffect(() => {
    if (isOpen && hasUnsavedDraft && draft) {
      setShowDraftBanner(true);
    }
  }, [isOpen, hasUnsavedDraft, draft]);

  // Autosave draft on form changes
  useEffect(() => {
    if (
      isOpen &&
      (formData.destination || formData.customerName || formData.pickupLocation)
    ) {
      saveDraft(formData);
    }
  }, [formData, isOpen, saveDraft]);

  // Focus first element on step change
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [step, isOpen]);

  const selectedVehicle =
    INITIAL_FLEET.find((v) => v.id === formData.vehicleId) ||
    INITIAL_FLEET.find(
      (v) =>
        v.name.toLowerCase() === (formData.vehicleName || "").toLowerCase(),
    ) ||
    INITIAL_FLEET[0];

  const filteredFleet =
    !formData.vehicleCategory || formData.vehicleCategory === "all"
      ? INITIAL_FLEET
      : INITIAL_FLEET.filter((v) => v.category === formData.vehicleCategory);

  const updateField = <K extends keyof BookingRequest>(
    field: K,
    value: BookingRequest[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleRestoreDraft = () => {
    if (draft) {
      setFormData((prev) => ({ ...prev, ...draft }));
      setShowDraftBanner(false);
    }
  };

  const handleDiscardDraft = () => {
    clearDraft();
    setShowDraftBanner(false);
  };

  const handleNextStep = () => {
    setErrors({});
    if (step === 1) {
      const result = step1Schema.safeParse({
        pickupLocation: formData.pickupLocation,
        destination: formData.destination,
        tripType: formData.tripType,
        journeyType: formData.journeyType,
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
        returnDate: formData.returnDate,
      });

      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const path = issue.path[0] as string;
          if (path && !fieldErrors[path]) {
            fieldErrors[path] = issue.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const result = step2Schema.safeParse({
        vehicleCategory: formData.vehicleCategory,
        vehicleId: formData.vehicleId,
        vehicleName: formData.vehicleName,
        passengers: formData.passengers,
        luggage: formData.luggage,
        acPreference: formData.acPreference,
        tripPurpose: formData.tripPurpose,
        additionalNotes: formData.additionalNotes,
      });

      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const path = issue.path[0] as string;
          if (path && !fieldErrors[path]) {
            fieldErrors[path] = issue.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
      setStep(3);
    } else if (step === 3) {
      const result = step3Schema.safeParse({
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        pickupAddress: formData.pickupAddress,
        privacyConsent: formData.privacyConsent,
        honeypot: formData.honeypot,
      });

      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const path = issue.path[0] as string;
          if (path && !fieldErrors[path]) {
            fieldErrors[path] = issue.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        try {
          const rawInq = localStorage.getItem("benaka_customer_inquiries");
          const existingInquiries = rawInq ? JSON.parse(rawInq) : [];
          const newInquiry = {
            id: `inq-${Date.now()}`,
            createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
            customerName: formData.customerName,
            customerPhone: formData.customerPhone,
            pickupLocation: formData.pickupLocation,
            destination: formData.destination,
            pickupDate: formData.pickupDate,
            vehicleName: formData.vehicleName || "Vehicle Inquiry",
            passengers: formData.passengers || 1,
            status: "New",
            notes: formData.additionalNotes || "",
          };
          const updated = [newInquiry, ...existingInquiries];
          localStorage.setItem("benaka_customer_inquiries", JSON.stringify(updated));
          window.dispatchEvent(new Event("storage"));
          window.dispatchEvent(new CustomEvent("benaka_inquiries_updated"));
        } catch (e) {
          console.error("Failed to sync new inquiry to Admin storage", e);
        }

        setIsSubmitting(false);
        setStep(4);
      }, 300);
    }
  };

  const handleCopyInquiry = () => {
    const textOnly = `BENAKA TOURS & TRAVELS INQUIRY\nName: ${formData.customerName}\nPhone: ${formData.customerPhone}\nPickup: ${formData.pickupLocation}\nDestination: ${formData.destination}\nVehicle: ${formData.vehicleName}\nDate: ${formData.pickupDate} at ${formData.pickupTime}\nPassengers: ${formData.passengers}`;
    navigator.clipboard.writeText(textOnly);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleResetRequest = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    clearDraft();
    setFormData(DEFAULT_FORM_STATE);
    setStep(1);
    setErrors({});
    setShowResetConfirm(false);
  };

  const stepVariants = {
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 },
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chauffeur Vehicle Inquiry & Quote"
      maxWidth="xl"
    >
      {/* Draft Restoration Banner */}
      <AnimatePresence>
        {showDraftBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between gap-2 overflow-hidden shadow-md"
          >
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>
                You have an unfinished booking draft saved. Restore draft?
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleRestoreDraft}
                className="px-2.5 py-1 rounded-lg bg-[#D4AF37] text-black font-bold hover:brightness-110 transition-all text-[11px]"
              >
                Restore Draft
              </button>
              <button
                onClick={handleDiscardDraft}
                className="px-2 py-1 rounded-lg bg-black/40 text-slate-300 hover:text-white transition-all text-[11px]"
              >
                Discard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessible WAI-ARIA Progress Step Bar */}
      <div
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={4}
        aria-label={`Booking Step ${step} of 4`}
        className="mb-6 pb-4 border-b border-white/10"
      >
        <div className="flex items-center justify-between text-xs font-semibold">
          {[
            { number: 1, label: "Trip Details" },
            { number: 2, label: "Vehicle Req." },
            { number: 3, label: "Customer" },
            { number: 4, label: "Review & Quote" },
          ].map((s) => (
            <div
              key={s.number}
              aria-current={step === s.number ? "step" : undefined}
              className="flex items-center gap-1.5 sm:gap-2"
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  step === s.number
                    ? "bg-linear-to-r from-[#D4AF37] to-[#F59E0B] text-black shadow-lg shadow-amber-500/20 scale-105"
                    : step > s.number
                      ? "bg-emerald-500 text-white"
                      : "bg-[#121620] text-slate-400 border border-white/10"
                }`}
              >
                {step > s.number ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  s.number
                )}
              </span>
              <span
                className={`hidden sm:inline ${
                  step === s.number
                    ? "text-[#D4AF37] font-bold"
                    : step > s.number
                      ? "text-emerald-400"
                      : "text-slate-400"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Confirmation Overlay Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121620] border border-white/10 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">
                Reset Inquiry Form?
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This will clear all entered trip details, selected vehicle, and
              customer information. Are you sure you want to start fresh?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <SecondaryButton onClick={() => setShowResetConfirm(false)}>
                Cancel
              </SecondaryButton>
              <button
                onClick={confirmReset}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all"
              >
                Yes, Reset Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step Contents */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>
                100% Chauffeur-Driven Vehicles • Professional drivers included
                with all rentals
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Pickup City / Location"
                required
                error={errors.pickupLocation}
              >
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-[#D4AF37]" />
                  <input
                    ref={firstInputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    value={formData.pickupLocation}
                    onChange={(e) =>
                      updateField("pickupLocation", e.target.value)
                    }
                    placeholder="e.g. Gadag"
                    className={`w-full pl-9 pr-3 py-2.5 bg-[#0B0D12] border ${
                      errors.pickupLocation
                        ? "border-red-500"
                        : "border-white/10"
                    } rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all`}
                  />
                </div>
              </FormField>

              <FormField
                label="Destination"
                required
                error={errors.destination}
              >
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-emerald-400" />
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => updateField("destination", e.target.value)}
                    placeholder="e.g. Hubballi, Goa, Bengaluru"
                    className={`w-full pl-9 pr-3 py-2.5 bg-[#0B0D12] border ${
                      errors.destination ? "border-red-500" : "border-white/10"
                    } rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all`}
                  />
                </div>
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Trip Category">
                <select
                  value={formData.tripType}
                  onChange={(e) =>
                    updateField("tripType", e.target.value as TripType)
                  }
                  className="w-full px-3 py-2.5 booking-field rounded-xl text-sm"
                >
                  <option value="outstation">Outstation Journey</option>
                  <option value="local">Local City Trip</option>
                  <option value="airport">Airport / Railway Transfer</option>
                </select>
              </FormField>

              <FormField label="Journey Type">
                <select
                  value={formData.journeyType}
                  onChange={(e) =>
                    updateField("journeyType", e.target.value as JourneyType)
                  }
                  className="w-full px-3 py-2.5 booking-field rounded-xl text-sm"
                >
                  <option value="one-way">One-Way Drop</option>
                  <option value="round-trip">Round Trip</option>
                </select>
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Pickup Date" required error={errors.pickupDate}>
                <div className="relative">
                  <input
                    type="date"
                    min={getTodayString()}
                    value={formData.pickupDate}
                    onChange={(e) => updateField("pickupDate", e.target.value)}
                    className={`w-full px-3 py-2.5 bg-[#0B0D12] border ${
                      errors.pickupDate ? "border-red-500" : "border-white/10"
                    } rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]`}
                  />
                </div>
              </FormField>

              <FormField label="Pickup Time" required error={errors.pickupTime}>
                <input
                  type="time"
                  value={formData.pickupTime}
                  onChange={(e) => updateField("pickupTime", e.target.value)}
                  className="w-full px-3 py-2.5 booking-field rounded-xl text-sm"
                />
              </FormField>

              {formData.journeyType === "round-trip" && (
                <FormField
                  label="Return Date"
                  required
                  error={errors.returnDate}
                >
                  <input
                    type="date"
                    min={formData.pickupDate || getTodayString()}
                    value={formData.returnDate || ""}
                    onChange={(e) => updateField("returnDate", e.target.value)}
                    className={`w-full px-3 py-2.5 bg-[#0B0D12] border ${
                      errors.returnDate ? "border-red-500" : "border-white/10"
                    } rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]`}
                  />
                </FormField>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleResetRequest}
                className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Form</span>
              </button>

              <PrimaryButton onClick={handleNextStep}>
                <span>Continue to Vehicle Requirements</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </PrimaryButton>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Filter Vehicle Category">
                <select
                  value={formData.vehicleCategory || "all"}
                  onChange={(e) =>
                    updateField("vehicleCategory", e.target.value)
                  }
                  className="w-full px-3 py-2.5 booking-field rounded-xl text-sm"
                >
                  <option value="all">All Vehicles (Show All)</option>
                  <option value="sedan">Sedan (4 Seater)</option>
                  <option value="muv">MUV / MPV (6-7 Seater)</option>
                  <option value="suv">SUV (6-7 Seater)</option>
                  <option value="minibus">
                    Minibus / Tempo Traveller (12-17 Seater)
                  </option>
                  <option value="bus">Luxury Bus / Coach (25+ Seater)</option>
                </select>
              </FormField>

              <FormField
                label="Preferred Chauffeur Vehicle"
                required
                error={errors.vehicleId}
              >
                <select
                  ref={firstInputRef as React.RefObject<HTMLSelectElement>}
                  value={formData.vehicleId}
                  onChange={(e) => {
                    const v = INITIAL_FLEET.find(
                      (item) => item.id === e.target.value,
                    );
                    updateField("vehicleId", e.target.value);
                    if (v) {
                      updateField("vehicleName", v.name);
                    }
                  }}
                  className="w-full px-3 py-2.5 booking-field rounded-xl text-sm"
                >
                  {filteredFleet.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.category.toUpperCase()} • {v.seats} Seats)
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            {/* Selected Vehicle Preview Banner */}
            {selectedVehicle && (
              <VehiclePreviewCard
                vehicle={selectedVehicle}
                acPreference={formData.acPreference}
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                label="Passenger Count"
                required
                error={errors.passengers}
              >
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={formData.passengers}
                  onChange={(e) =>
                    updateField("passengers", parseInt(e.target.value) || 1)
                  }
                  className={`w-full px-3 py-2.5 bg-[#0B0D12] border ${
                    errors.passengers ? "border-red-500" : "border-white/10"
                  } rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]`}
                />
              </FormField>

              <FormField label="Luggage Count (Bags)">
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={formData.luggage}
                  onChange={(e) =>
                    updateField("luggage", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2.5 booking-field rounded-xl text-sm"
                />
              </FormField>

              <FormField label="Trip Purpose">
                <select
                  value={formData.tripPurpose}
                  onChange={(e) =>
                    updateField("tripPurpose", e.target.value as TripPurpose)
                  }
                  className="w-full px-3 py-2.5 booking-field rounded-xl text-sm"
                >
                  <option value="Personal">Personal / Family</option>
                  <option value="Corporate">Corporate / Business</option>
                  <option value="Wedding">Wedding / Special Event</option>
                  <option value="Group Tour">Group Pilgrimage / Tour</option>
                  <option value="Other">Other Requirement</option>
                </select>
              </FormField>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0D12] border border-white/10">
              <span className="text-xs text-white font-semibold">
                AC / Air Conditioning Preference:
              </span>
              <button
                type="button"
                onClick={() =>
                  updateField("acPreference", !formData.acPreference)
                }
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  formData.acPreference
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}
              >
                {formData.acPreference ? "✓ AC Required" : "Standard / Non-AC"}
              </button>
            </div>

            <FormField label="Additional Requests / Special Instructions">
              <textarea
                rows={2}
                value={formData.additionalNotes}
                onChange={(e) => updateField("additionalNotes", e.target.value)}
                placeholder="Special pickup timing, carrier requirements, temple stopovers..."
                className="w-full px-3 py-2.5 booking-field rounded-xl text-sm"
              />
            </FormField>

            <div className="pt-4 flex items-center justify-between">
              <SecondaryButton onClick={() => setStep(1)}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span>Back</span>
              </SecondaryButton>
              <PrimaryButton onClick={handleNextStep}>
                <span>Enter Customer Details</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </PrimaryButton>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            {/* Honeypot Spam Protection Field (Invisible to real users) */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="honeypot"
                tabIndex={-1}
                value={formData.honeypot || ""}
                onChange={(e) => updateField("honeypot", e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Full Name" required error={errors.customerName}>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3.5 text-[#D4AF37]" />
                  <input
                    ref={firstInputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    value={formData.customerName}
                    onChange={(e) =>
                      updateField("customerName", e.target.value)
                    }
                    placeholder="e.g. Suresh Kulkarni"
                    className={`w-full pl-9 pr-3 py-2.5 bg-[#0B0D12] border ${
                      errors.customerName ? "border-red-500" : "border-white/10"
                    } rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]`}
                  />
                </div>
              </FormField>

              <FormField
                label="Mobile Number (WhatsApp Enabled)"
                required
                error={errors.customerPhone}
              >
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3.5 text-[#D4AF37]" />
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) =>
                      updateField("customerPhone", e.target.value)
                    }
                    placeholder="9876543210"
                    className={`w-full pl-9 pr-3 py-2.5 bg-[#0B0D12] border ${
                      errors.customerPhone
                        ? "border-red-500"
                        : "border-white/10"
                    } rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]`}
                  />
                </div>
              </FormField>
            </div>

            <FormField
              label="Email Address (Optional)"
              error={errors.customerEmail}
            >
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="email"
                  value={formData.customerEmail || ""}
                  onChange={(e) => updateField("customerEmail", e.target.value)}
                  placeholder="suresh@example.com"
                  className="w-full pl-9 pr-3 py-2.5 booking-field rounded-xl text-sm"
                />
              </div>
            </FormField>

            <FormField
              label="Doorstep Pickup Address in Gadag / City"
              required
              error={errors.pickupAddress}
            >
              <input
                type="text"
                value={formData.pickupAddress}
                onChange={(e) => updateField("pickupAddress", e.target.value)}
                placeholder="Panchaxari Nagar 5th Cross, Gadag"
                className={`w-full px-3 py-2.5 bg-[#0B0D12] border ${
                  errors.pickupAddress ? "border-red-500" : "border-white/10"
                } rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]`}
              />
            </FormField>

            {/* Privacy Consent Checkbox */}
            <div className="p-3 rounded-xl bg-[#0B0D12] border border-white/10 space-y-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacyConsent}
                  onChange={(e) =>
                    updateField("privacyConsent", e.target.checked)
                  }
                  className="mt-0.5 w-4 h-4 rounded text-[#D4AF37] accent-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span className="text-xs text-slate-300 leading-normal">
                  I agree to share these trip details with Benaka Tours &
                  Travels for generating a chauffeur quote. No payment or
                  registration required.
                </span>
              </label>
              {errors.privacyConsent && (
                <p className="text-[11px] text-red-400 pl-6">
                  {errors.privacyConsent}
                </p>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <SecondaryButton onClick={() => setStep(2)}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span>Back</span>
              </SecondaryButton>
              <PrimaryButton onClick={handleNextStep} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span>Generating Review...</span>
                ) : (
                  <>
                    <span>Review & Confirm</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </PrimaryButton>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-5"
          >
            {/* Route Timeline Component */}
            <RouteTimeline
              pickupLocation={formData.pickupLocation}
              destination={formData.destination}
              tripType={formData.tripType}
              journeyType={formData.journeyType}
              pickupDate={formData.pickupDate}
              pickupTime={formData.pickupTime}
              returnDate={formData.returnDate}
            />

            {/* Selected Vehicle Preview Card */}
            {selectedVehicle && (
              <VehiclePreviewCard
                vehicle={selectedVehicle}
                acPreference={formData.acPreference}
              />
            )}

            {/* Estimated Quote Card */}
            <div className="p-4 rounded-2xl bg-linear-to-r from-amber-500/10 via-[#121620] to-emerald-500/10 border border-[#D4AF37]/30 text-center space-y-1.5 shadow-lg">
              <div className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider">
                Estimated Quote
              </div>
              <p className="text-sm font-semibold text-white">
                Final pricing will be confirmed by Benaka Tours & Travels.
              </p>
              <div className="text-[11px] text-slate-400">
                100% Chauffeur-Driven • Tolls & Driver Allowances confirmed
                directly
              </div>
            </div>

            {/* Booking Summary Specification Table */}
            <div className="p-4 rounded-xl bg-[#0B0D12] border border-white/10 space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-bold text-white text-sm">
                  Customer & Inquiry Summary
                </span>
                <button
                  onClick={() => setStep(3)}
                  className="text-[11px] text-[#D4AF37] hover:underline font-semibold"
                >
                  Edit Details
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <div>
                  <strong className="text-white">Customer:</strong>{" "}
                  {formData.customerName}
                </div>
                <div>
                  <strong className="text-white">Mobile:</strong>{" "}
                  {formData.customerPhone}
                </div>
                <div>
                  <strong className="text-white">Passengers:</strong>{" "}
                  {formData.passengers} Persons
                </div>
                <div>
                  <strong className="text-white">Luggage:</strong>{" "}
                  {formData.luggage} Bags
                </div>
                <div>
                  <strong className="text-white">Purpose:</strong>{" "}
                  {formData.tripPurpose}
                </div>
                <div>
                  <strong className="text-white">Pickup Address:</strong>{" "}
                  {formData.pickupAddress}
                </div>
                {formData.additionalNotes && (
                  <div className="col-span-1 sm:col-span-2">
                    <strong className="text-white">Notes:</strong>{" "}
                    {formData.additionalNotes}
                  </div>
                )}
              </div>
            </div>

            {/* Contact & Dispatch Actions */}
            <div className="space-y-3 pt-2">
              <a
                href={generateWhatsAppInquiryUrl(formData)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 hover:brightness-110 active:scale-[0.99] transition-all min-h-12"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Send Quotation Request on WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${WHATSAPP_PHONE_NUMBER}`}
                  className="py-3 px-4 rounded-xl border border-[#D4AF37]/40 bg-[#121620] text-[#D4AF37] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#1A1F2C] transition-all min-h-11"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {DISPLAY_PHONE_NUMBER}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyInquiry}
                  className="py-3 px-4 rounded-xl border border-white/10 bg-[#121620] text-slate-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#1A1F2C] transition-all min-h-11"
                >
                  <Copy className="w-4 h-4 text-[#D4AF37]" />
                  <span>{copied ? "Copied Inquiry!" : "Copy Inquiry"}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs border-t border-white/10">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-400 hover:text-white flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Edit Trip Details</span>
              </button>

              <button
                type="button"
                onClick={handleResetRequest}
                className="text-slate-400 hover:text-[#D4AF37] flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Start Again</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};
