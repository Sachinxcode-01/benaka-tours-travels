import React from "react";
import { motion } from "motion/react";
import { PhoneCall } from "lucide-react";
import { DISPLAY_PHONE_NUMBER } from "../../utils/whatsapp";

interface CallButtonProps {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  label?: string;
  className?: string;
}

export const CallButton: React.FC<CallButtonProps> = ({
  size = "md",
  fullWidth = false,
  label = "Call Now",
  className = "",
}) => {
  const sizeClasses = {
    sm: "px-3.5 py-2 text-xs font-semibold min-h-[44px]",
    md: "px-5 py-2.5 text-sm font-semibold min-h-[48px]",
    lg: "px-7 py-3.5 text-base font-bold min-h-[56px]",
  };

  return (
    <motion.a
      href="tel:+916362416120"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`Call Benaka Tours & Travels at ${DISPLAY_PHONE_NUMBER}`}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/40 bg-[#121620]/90 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] transition-all duration-200 ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      <PhoneCall className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </motion.a>
  );
};
