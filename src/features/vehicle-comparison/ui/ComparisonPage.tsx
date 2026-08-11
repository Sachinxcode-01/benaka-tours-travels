import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Scale, PlusCircle, ArrowLeft } from "lucide-react";
import { Navbar } from "@components/layout/Navbar";
import { Footer } from "@components/layout/Footer";
import { ComparisonTable } from "./ComparisonTable";
import { useComparisonStore } from "../model/comparison.store";
import { FLEET_VEHICLES } from "@entities/vehicle";
import { MAX_COMPARISON_VEHICLES } from "../model/comparison.types";
import type { Vehicle } from "@entities/vehicle";

export const ComparisonPage: React.FC = () => {
  const { comparedVehicles, removeFromComparison, clearComparison, count, toggleComparison, canAdd } =
    useComparisonStore();

  const availableToAdd = FLEET_VEHICLES.filter(
    (v) => !comparedVehicles.some((cv) => cv.id === v.id),
  );

  const handleSelectVehicle = (_vehicle: Vehicle) => {
    // This navigates to trip planner — the click will navigate via the Link
    // We could pre-fill the trip planner store here, but that would require
    // cross-feature coupling. The user simply navigates to trip planner.
  };

  return (
    <div className="min-h-screen bg-[#07080B] flex flex-col">
      <Navbar />

      {/* Page header */}
      <section className="relative py-12 sm:py-16 px-4 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/3 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-3">
                <Scale className="w-3.5 h-3.5" />
                Vehicle Comparison
              </div>
              <h1 className="font-accent text-3xl sm:text-4xl text-white mb-2">
                Compare Vehicles
              </h1>
              <p className="text-slate-400 text-sm max-w-lg">
                Compare up to {MAX_COMPARISON_VEHICLES} vehicles side by side to find the
                perfect match for your journey.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/fleet"
                className="flex items-center gap-2 py-2 px-4 rounded-xl bg-[#1A1F2C] border border-white/15 text-slate-300 text-xs font-semibold hover:border-white/30 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Browse Fleet
              </Link>
              {count > 0 && (
                <button
                  onClick={clearComparison}
                  className="py-2 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all"
                >
                  Clear All
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="flex-1 py-8 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {comparedVehicles.length === 0 ? (
            /* Empty state */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Scale className="w-14 h-14 text-slate-700 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-300 mb-2">
                No vehicles selected
              </h2>
              <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">
                Browse the fleet and click "Compare" on any vehicle to start
                comparing. You can select up to {MAX_COMPARISON_VEHICLES} vehicles.
              </p>
              <Link
                to="/fleet"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-sm hover:brightness-110 transition-all"
              >
                Browse Fleet →
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Comparison Table */}
              <ComparisonTable
                vehicles={comparedVehicles}
                onRemove={removeFromComparison}
                onSelectVehicle={handleSelectVehicle}
              />

              {/* Add more vehicles */}
              {canAdd && availableToAdd.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wide">
                    Add Another Vehicle ({count}/{MAX_COMPARISON_VEHICLES})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {availableToAdd.slice(0, 8).map((v) => (
                      <button
                        key={v.id}
                        onClick={() => toggleComparison(v.id)}
                        className="p-3 rounded-xl bg-[#0F1219] border border-white/10 hover:border-purple-500/40 text-left transition-all active:scale-95 group"
                      >
                        <div className="flex items-center gap-2">
                          <PlusCircle className="w-3.5 h-3.5 text-purple-400 shrink-0 group-hover:scale-110 transition-transform" />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-white truncate">
                              {v.name}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {v.seats} seats
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
