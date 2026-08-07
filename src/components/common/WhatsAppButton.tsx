import React from "react";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import {
  generateQuickVehicleWhatsAppUrl,
  WHATSAPP_PHONE_NUMBER,
} from "../../utils/whatsapp";

interface WhatsAppButtonProps {
  vehicleName?: string;
  customUrl?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  label?: string;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  vehicleName,
  customUrl,
  size = "md",
  fullWidth = false,
  label = "Book on WhatsApp",
  className = "",
}) => {
  const targetUrl = customUrl
    ? customUrl
    : vehicleName
      ? generateQuickVehicleWhatsAppUrl(vehicleName)
      : `https://wa.me/${WHATSAPP_PHONE_NUMBER}`;

  const sizeClasses = {
    sm: "px-3.5 py-2 text-xs font-semibold min-h-[44px]",
    md: "px-5 py-2.5 text-sm font-semibold min-h-[48px]",
    lg: "px-7 py-3.5 text-base font-bold min-h-[56px]",
  };

  return (
    <motion.a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-600/30 hover:shadow-emerald-600/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-all duration-200 ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      <MessageCircle className="w-5 h-5 text-white fill-current shrink-0" />
      <span>{label}</span>
    </motion.a>
  );
};
