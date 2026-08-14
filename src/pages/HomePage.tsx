import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { TopBar } from "../components/layout/TopBar";
import { HeroSection } from "../components/layout/HeroSection";
import { VehicleGrid } from "../components/fleet/VehicleGrid";
import { VehicleDetailModal } from "../components/fleet/VehicleDetailModal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ServicesSection } from "../components/common/ServicesSection";
import { WhyBenakaSection } from "../components/common/WhyBenakaSection";
import { TestimonialsSection } from "../components/common/TestimonialsSection";
import { FAQSection } from "../components/common/FAQSection";
import { ContactSection } from "../components/common/ContactSection";
import { InteractiveMapSection } from "../components/map/InteractiveMapSection";
import { Footer } from "../components/layout/Footer";
import { StickyMobileBar } from "../components/layout/StickyMobileBar";
import { BookingWizardModal } from "../features/booking/BookingWizardModal";
import { FareEstimatorWidget } from "../features/fare-calculator/ui/FareEstimatorWidget";
import { CinematicFleetVideoSection } from "../features/landing/cinematic-video/CinematicFleetVideoSection";
import { INITIAL_FLEET } from "../data/fleet";
import type { Vehicle } from "../types/fleet";
import type { BookingRequest } from "../types/booking";

export const HomePage: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null);
  const [inquiryData, setInquiryData] =
    useState<Partial<BookingRequest> | null>(null);

  const handleOpenDetail = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDetailModalOpen(true);
  };

  const handleOpenBooking = (vehicle?: Vehicle | null) => {
    setBookingVehicle(vehicle || null);
    setIsBookingModalOpen(true);
  };

  const handleQuickSearch = (data: Partial<BookingRequest>) => {
    setInquiryData(data);
    setIsBookingModalOpen(true);
  };

  const scrollToFleet = () => {
    const el = document.getElementById("fleet");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] text-slate-100 flex flex-col justify-between selection:bg-[#D4AF37] selection:text-black">
      {/* Top Notification Bar */}
      <TopBar />

      {/* Main Glass Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        onExploreFleet={scrollToFleet}
        onQuickSearch={handleQuickSearch}
      />

      {/* Fleet Showcase Section */}
      <section
        id="fleet"
        className="py-24 bg-[#07090D] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeading
            badge="EXOTIC FLEET INVENTORY"
            title="Curated Premium Chauffeur Fleet"
            subtitle="Explore our 12 meticulously maintained vehicles — Sedans, MUVs, SUVs, Minibuses & 25-Seater Coaches updated live."
          />

          <VehicleGrid
            vehicles={INITIAL_FLEET}
            onSelectVehicle={handleOpenDetail}
            onBookVehicle={handleOpenBooking}
          />
        </div>
      </section>

      {/* Tailored Services Section */}
      <ServicesSection onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Fare & Route Estimator Widget */}
      <FareEstimatorWidget />

      {/* Why BENAKA Section */}
      <WhyBenakaSection />

      {/* Cinematic Benaka Fleet Film Showcase */}
      <CinematicFleetVideoSection />

      {/* Testimonials Carousel Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Interactive Map & Routes Section */}
      <InteractiveMapSection />

      {/* Contact & Support Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Action Bar */}
      <StickyMobileBar onOpenBooking={() => handleOpenBooking()} />

      {/* Vehicle Detail View Modal */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onBook={(v) => {
          setIsDetailModalOpen(false);
          handleOpenBooking(v);
        }}
      />

      {/* Multi-Step Booking Wizard Modal */}
      <BookingWizardModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialVehicle={bookingVehicle}
        initialData={inquiryData}
      />
    </div>
  );
};
