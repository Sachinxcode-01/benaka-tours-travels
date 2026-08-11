import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { TripStep } from "../../model/trip-planner.types";

interface TripStepperProps {
  currentStep: TripStep;
}

const STEPS: { step: TripStep; label: string; shortLabel: string }[] = [
  { step: 1, label: "Trip Details", shortLabel: "Details" },
  { step: 2, label: "Choose Vehicle", shortLabel: "Vehicle" },
  { step: 3, label: "Review Trip", shortLabel: "Review" },
  { step: 4, label: "Send Enquiry", shortLabel: "Enquiry" },
];

export const TripStepper: React.FC<TripStepperProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-0 sm:gap-1 w-full">
      {STEPS.map((s, idx) => {
        const isComplete = currentStep > s.step;
        const isActive = currentStep === s.step;

        return (
          <React.Fragment key={s.step}>
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1.5 min-w-0">
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isComplete
                    ? "#10b981"
                    : isActive
                      ? "#D4AF37"
                      : "#1e2433",
                }}
                transition={{ duration: 0.25 }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold shrink-0"
                style={{
                  borderColor: isComplete
                    ? "#10b981"
                    : isActive
                      ? "#D4AF37"
                      : "#374151",
                  color: isComplete || isActive ? "#000" : "#6b7280",
                }}
              >
                {isComplete ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{s.step}</span>
                )}
              </motion.div>
              <span
                className={`text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide text-center leading-tight ${
                  isActive
                    ? "text-[#D4AF37]"
                    : isComplete
                      ? "text-emerald-400"
                      : "text-slate-500"
                }`}
              >
                {/* Short label on mobile */}
                <span className="sm:hidden">{s.shortLabel}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </span>
            </div>

            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-1 sm:mx-2 rounded-full overflow-hidden bg-[#1e2433] mt-[-12px] sm:mt-[-14px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{
                    width: currentStep > s.step ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
