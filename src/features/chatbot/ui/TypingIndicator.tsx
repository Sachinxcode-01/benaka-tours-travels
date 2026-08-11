import React from "react";
import { motion } from "motion/react";

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-[#121620] border border-white/10 text-slate-400 w-max shadow-sm my-1">
      <span className="text-xs text-amber-400 font-semibold mr-1">
        Benaka Assistant
      </span>
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-amber-400"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
      />
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-amber-400"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
      />
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-amber-400"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
      />
    </div>
  );
};
