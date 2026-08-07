import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "@shared/lib/motion";
import { FLEET_VEHICLES, VehicleCard } from "@entities/vehicle";
import {
  FleetFilterBar,
  type FleetFilterOption,
} from "@features/fleet-filtering";
import { Container } from "@shared/ui/container";
import { SectionHeading } from "@shared/ui/section-heading";
import { EmptyState } from "@shared/ui/empty-state";
import { FloatingQuickInquiryForm } from "@features/landing/inquiry-form/FloatingQuickInquiryForm";

export const FleetPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FleetFilterOption>("all");

  const counts = useMemo(() => {
    return {
      all: FLEET_VEHICLES.length,
      sedan: FLEET_VEHICLES.filter((v) => v.category === "sedan").length,
      muv: FLEET_VEHICLES.filter((v) => v.category === "muv").length,
      suv: FLEET_VEHICLES.filter((v) => v.category === "suv").length,
      minibus: FLEET_VEHICLES.filter((v) => v.category === "minibus").length,
      bus: FLEET_VEHICLES.filter((v) => v.category === "bus").length,
      available: FLEET_VEHICLES.filter((v) => v.availability === "available")
        .length,
      booked: FLEET_VEHICLES.filter((v) => v.availability === "booked").length,
    };
  }, []);

  const filteredVehicles = useMemo(() => {
    return FLEET_VEHICLES.filter((v) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "available" || activeFilter === "booked") {
        return v.availability === activeFilter;
      }
      return v.category === activeFilter;
    });
  }, [activeFilter]);

  return (
    <div className="w-full py-12 bg-[#07080B] min-h-screen space-y-12">
      <Container size="xl" className="space-y-10">
        {/* Page Header */}
        <SectionHeading
          badgeText="Our 12 Fleet Vehicles"
          title="Gadag's Premier Rental Fleet Showcase"
          subtitle="Explore our complete inventory of 100% chauffeur-driven sedans, MUVs, SUVs, minibuses, and luxury coaches."
          centered
        />

        {/* Filter Bar */}
        <div className="flex justify-center">
          <FleetFilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
          />
        </div>

        {/* Vehicle Grid with AnimatePresence */}
        {filteredVehicles.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredVehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <VehicleCard vehicle={vehicle} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState
            title="No Vehicles Found"
            description="No vehicles match the selected filter option. Please select another category."
            actionLabel="View All Vehicles"
            onAction={() => setActiveFilter("all")}
          />
        )}
      </Container>

      {/* Floating Quick Inquiry */}
      <div className="pt-8">
        <FloatingQuickInquiryForm />
      </div>
    </div>
  );
};

export default FleetPage;
