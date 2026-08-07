import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  glow?: boolean;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  glow = false,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${glow ? "gold-glow border-[#D4AF37]/40" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
