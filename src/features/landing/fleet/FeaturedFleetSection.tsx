import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FLEET_VEHICLES,
  type Vehicle,
  type VehicleCategory,
} from "@entities/vehicle";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { Container } from "@shared/ui/container";
import { SectionHeading } from "@shared/ui/section-heading";
import { GlassCard } from "@shared/ui/glass-card";
import { StatusBadge } from "@shared/ui/status-badge";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { VehicleDetailDrawer } from "../../fleet-filtering/ui/VehicleDetailDrawer";
import { BookingWizardModal } from "../../booking/BookingWizardModal";

export const FeaturedFleetSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeVehicleDrawer, setActiveVehicleDrawer] =
    useState<Vehicle | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  const categories = [
    { key: "all", label: "All Vehicles (12)" },
    { key: "sedan", label: "Sedans (2)" },
    { key: "muv", label: "MUVs (3)" },
    { key: "suv", label: "SUVs (5)" },
    { key: "minibus", label: "Minibus (1)" },
    { key: "bus", label: "Heavy Coach (1)" },
  ];

  const filteredVehicles = FLEET_VEHICLES.filter((v) => {
    if (selectedCategory === "all") return true;
    return v.category === (selectedCategory as VehicleCategory);
  });

  return (
    <section
      id="fleet"
      className="py-20 bg-[#0B0D12] relative border-t border-amber-500/10"
    >
      <Container size="xl" className="space-y-10">
        <SectionHeading
          badgeText="Our Fleet Inventory"
          title="Meticulously Maintained Chauffeur Fleet"
          subtitle="Choose from 12 exotic sedans, MUVs, SUVs, minibuses, and luxury coaches."
          centered
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer min-h-11 ${
                selectedCategory === cat.key
                  ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-bold"
                  : "bg-neutral-900/80 text-slate-300 hover:bg-neutral-800 border border-neutral-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard
                  hoverable
                  className="flex flex-col justify-between p-6 space-y-4 group h-full cursor-pointer"
                  onClick={() => setActiveVehicleDrawer(vehicle)}
                >
                  <div className="space-y-4">
                    {/* Header Pills */}
                    <div className="flex items-center justify-between">
                      <Badge variant="gold" className="uppercase text-[10px]">
                        {vehicle.category}
                      </Badge>
                      <StatusBadge status={vehicle.availability} />
                    </div>

                    {/* Real Vehicle Image Container */}
                    <div className="h-44 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center relative overflow-hidden">
                      <img
                        src={vehicle.image}
                        alt={`${vehicle.name} Chauffeur Rental`}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/vehicles/placeholders/benekavehicles.png";
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 left-2 bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded font-semibold backdrop-blur-sm border border-amber-500/30">
                        100% Chauffeur Included
                      </div>
                    </div>

                    {/* Specs */}
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                        {vehicle.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        💺 {vehicle.seats} Seats | ⛽{" "}
                        {vehicle.fuelTypes.join(", ")}
                      </p>
                    </div>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {vehicle.features.slice(0, 3).map((feat) => (
                        <span
                          key={feat}
                          className="text-[10px] bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-slate-300"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className="pt-4 border-t border-amber-500/10 grid grid-cols-2 gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => setActiveVehicleDrawer(vehicle)}
                    >
                      Quick Specs
                    </Button>

                    <a
                      href={createWhatsAppInquiryUrl({
                        vehicleName: vehicle.name,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary" size="sm" fullWidth>
                        Inquire
                      </Button>
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Vehicle Specification Drawer Modal */}
        <VehicleDetailDrawer
          vehicle={activeVehicleDrawer}
          onClose={() => setActiveVehicleDrawer(null)}
          onBook={() => setIsBookingModalOpen(true)}
        />

        {/* Multi-Step Booking Wizard Modal */}
        <BookingWizardModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      </Container>
    </section>
  );
};
