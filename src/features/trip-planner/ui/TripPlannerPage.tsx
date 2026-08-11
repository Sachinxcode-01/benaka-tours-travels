import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Map } from "lucide-react";
import { Navbar } from "@components/layout/Navbar";
import { Footer } from "@components/layout/Footer";
import { TripStepper } from "./components/TripStepper";
import { Step1TripDetails } from "./steps/Step1TripDetails";
import { Step2VehicleSelect } from "./steps/Step2VehicleSelect";
import { Step3ReviewTrip } from "./steps/Step3ReviewTrip";
import { Step4WhatsApp } from "./steps/Step4WhatsApp";
import { useTripPlannerStore } from "../model/trip-planner.store";
import { useSavedTripsStore } from "@features/saved-trips/model/saved-trips.store";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";

export const TripPlannerPage: React.FC = () => {
  const {
    step,
    formData,
    selectedVehicle,
    recommendations,
    updateForm,
    nextStep,
    prevStep,
    goToStep,
    computeRecommendations,
    selectVehicle,
    reset,
  } = useTripPlannerStore();

  const { saveTrip } = useSavedTripsStore();

  const handleContact = () => {
    window.open(
      createWhatsAppInquiryUrl(
        "Hello Benaka Tours & Travels, I need help planning a trip for a large group.",
      ),
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-[#07080B] flex flex-col">
      <Navbar />

      {/* Page Hero */}
      <section className="relative py-12 sm:py-16 px-4 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/3 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Map className="w-3.5 h-3.5" />
              Smart Trip Planner
            </div>
            <h1 className="font-accent text-3xl sm:text-4xl text-white mb-3">
              Plan Your Perfect Journey
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Tell us about your trip and we'll recommend the best chauffeur-driven
              vehicle for you — then send your enquiry instantly via WhatsApp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Planner Card */}
      <section className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Stepper */}
          <div className="mb-8">
            <TripStepper currentStep={step} />
          </div>

          {/* Step Panel */}
          <div className="bg-[#0B0D12] rounded-2xl border border-white/8 p-5 sm:p-8 shadow-2xl">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <Step1TripDetails
                  key="step1"
                  formData={formData}
                  onUpdate={updateForm}
                  onNext={() => {
                    computeRecommendations();
                    nextStep();
                  }}
                />
              )}

              {step === 2 && (
                <Step2VehicleSelect
                  key="step2"
                  formData={formData}
                  recommendations={recommendations}
                  onComputeRecommendations={computeRecommendations}
                  onSelectVehicle={selectVehicle}
                  onBack={prevStep}
                  onContact={handleContact}
                />
              )}

              {step === 3 && (
                <Step3ReviewTrip
                  key="step3"
                  formData={formData}
                  selectedVehicle={selectedVehicle}
                  onNext={nextStep}
                  onBack={prevStep}
                  onEditStep={goToStep}
                />
              )}

              {step === 4 && (
                <Step4WhatsApp
                  key="step4"
                  formData={formData}
                  selectedVehicle={selectedVehicle}
                  onBack={prevStep}
                  onSaveTrip={saveTrip}
                  onReset={reset}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
