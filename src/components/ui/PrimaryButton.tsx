import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { Loader2 } from "lucide-react";

interface PrimaryButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "children"
> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon,
  isLoading = false,
  size = "md",
  fullWidth = false,
  disabled,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm font-semibold min-h-[44px]",
    md: "px-6 py-3 text-base font-semibold min-h-[48px]",
    lg: "px-8 py-4 text-lg font-bold min-h-[56px]",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0B0D12] font-semibold shadow-lg shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0D12] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  );
};
