import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Bookmark, Trash2, AlertTriangle } from "lucide-react";
import { Navbar } from "@components/layout/Navbar";
import { Footer } from "@components/layout/Footer";
import { SavedTripCard } from "./SavedTripCard";
import { useSavedTripsStore } from "../model/saved-trips.store";
import type { SavedTrip } from "../model/saved-trips.types";

export const SavedTripsPage: React.FC = () => {
  const navigate = useNavigate();
  const { trips, deleteTrip, clearAllTrips } = useSavedTripsStore();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleBookAgain = (trip: SavedTrip) => {
    // Navigate to trip planner — pass state as URL search params
    const params = new URLSearchParams({
      pickup: trip.pickup,
      destination: trip.destination,
      passengers: String(trip.passengers),
      tripType: trip.tripType,
      journeyType: trip.journeyType,
    });
    if (trip.vehicleName) params.set("vehicleName", trip.vehicleName);
    navigate(`/trip-planner?${params.toString()}`);
  };

  const handleClearAll = () => {
    clearAllTrips();
    setConfirmClear(false);
  };

  return (
    <div className="min-h-screen bg-[#07080B] flex flex-col">
      <Navbar />

      {/* Page header */}
      <section className="relative py-12 sm:py-16 px-4 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/3 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
                <Bookmark className="w-3.5 h-3.5" />
                My Trips
              </div>
              <h1 className="font-accent text-3xl sm:text-4xl text-white mb-2">
                Saved Trips
              </h1>
              <p className="text-slate-400 text-sm">
                {trips.length > 0
                  ? `${trips.length} saved trip${trips.length > 1 ? "s" : ""} — ready to book again`
                  : "Your saved trips will appear here"}
              </p>
            </div>

            {trips.length > 0 && (
              <button
                onClick={() => setConfirmClear(true)}
                className="flex items-center gap-2 py-2 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all self-start sm:self-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear History
              </button>
            )}
          </motion.div>
        </div>
      </section>

      <section className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {trips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Bookmark className="w-14 h-14 text-slate-700 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-300 mb-2">
                No saved trips yet
              </h2>
              <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
                Plan a trip using the Smart Trip Planner and save it for quick
                future bookings.
              </p>
              <Link
                to="/trip-planner"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-sm hover:brightness-110 transition-all"
              >
                Plan a Trip →
              </Link>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trips.map((trip) => (
                  <SavedTripCard
                    key={trip.id}
                    trip={trip}
                    onDelete={deleteTrip}
                    onBookAgain={handleBookAgain}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Confirm clear dialog */}
      <AnimatePresence>
        {confirmClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="bg-[#0F1219] rounded-2xl border border-red-500/20 p-6 w-full max-w-sm shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <h3 className="font-bold text-white">Clear All Trips?</h3>
              </div>
              <p className="text-slate-400 text-sm mb-6">
                This will permanently delete all {trips.length} saved trip
                {trips.length > 1 ? "s" : ""}. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmClear(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#1A1F2C] border border-white/10 text-slate-300 font-semibold text-sm hover:border-white/30 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-sm hover:bg-red-500/30 transition-all"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};
