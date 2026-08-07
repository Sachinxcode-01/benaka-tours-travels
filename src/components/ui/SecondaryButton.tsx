import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

interface SecondaryButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "children"
> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon,
  size = "md",
  fullWidth = false,
  disabled,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm font-medium min-h-[44px]",
    md: "px-6 py-3 text-base font-medium min-h-[48px]",
    lg: "px-8 py-4 text-lg font-semibold min-h-[56px]",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#121620]/80 text-[#F8FAFC] hover:bg-[#1A1F2C] hover:border-[#D4AF37]/60 hover:text-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0 text-[#D4AF37]">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
