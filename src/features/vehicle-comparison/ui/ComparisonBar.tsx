import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Scale, X, ArrowRight } from "lucide-react";
import { useComparisonStore } from "../model/comparison.store";
import { MAX_COMPARISON_VEHICLES } from "../model/comparison.types";

export const ComparisonBar: React.FC = () => {
  const { count, clearComparison } = useComparisonStore();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          <div className="bg-[#0B0D12]/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl">
            <div className="flex items-center gap-2 text-purple-400">
              <Scale className="w-4 h-4 shrink-0" />
              <span className="text-sm font-semibold">
                Comparing <span className="text-white font-bold">{count}</span>
                {" / "}
                <span className="text-slate-400">
                  {MAX_COMPARISON_VEHICLES}
                </span>{" "}
                vehicles
              </span>
            </div>

            <div className="flex-1" />

            <Link
              to="/compare"
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold hover:bg-purple-500/30 transition-colors"
            >
              View <ArrowRight className="w-3 h-3" />
            </Link>

            <button
              onClick={clearComparison}
              aria-label="Clear comparison"
              className="w-7 h-7 rounded-lg bg-[#1A1F2C] text-slate-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
