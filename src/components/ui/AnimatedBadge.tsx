import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface AnimatedBadgeProps {
  text: string;
  icon?: React.ReactNode;
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({ text, icon }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold tracking-wide uppercase shadow-sm"
    >
      <span className="shrink-0">
        {icon || <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />}
      </span>
      <span>{text}</span>
    </motion.span>
  );
};
