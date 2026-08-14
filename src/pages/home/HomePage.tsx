import React from "react";
import { HeroSection } from "@features/landing/hero/HeroSection";
import { FloatingQuickInquiryForm } from "@features/landing/inquiry-form/FloatingQuickInquiryForm";
import { TrustMetricsSection } from "@features/landing/metrics/TrustMetricsSection";
import { ServicesPreviewSection } from "@features/landing/services/ServicesPreviewSection";
import { FeaturedFleetSection } from "@features/landing/fleet/FeaturedFleetSection";
import { WhyUsSection } from "@features/landing/why-us/WhyUsSection";
import { DestinationsSection } from "@features/landing/destinations/DestinationsSection";
import { CinematicFleetVideoSection } from "@features/landing/cinematic-video/CinematicFleetVideoSection";
import { ReviewsSection } from "@features/landing/reviews/ReviewsSection";
import { FAQPreviewSection } from "@features/landing/faq/FAQPreviewSection";
import { LocationSection } from "@features/landing/location/LocationSection";
import { FinalCTASection } from "@features/landing/cta/FinalCTASection";

export const HomePage: React.FC = () => {
  return (
    <div className="w-full space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Floating Quick Inquiry Form */}
      <FloatingQuickInquiryForm />

      {/* 3. Trust Metrics */}
      <TrustMetricsSection />

      {/* 4. Services Preview */}
      <ServicesPreviewSection />

      {/* 5. Featured Fleet */}
      <FeaturedFleetSection />

      {/* 6. Why Choose Benaka */}
      <WhyUsSection />

      {/* 7. Popular Destinations */}
      <DestinationsSection />

      {/* 8. Cinematic Benaka Fleet Film Showcase */}
      <CinematicFleetVideoSection />

      {/* 9. Customer Reviews */}
      <ReviewsSection />

      {/* 10. FAQ Preview */}
      <FAQPreviewSection />

      {/* 10. Location & Map */}
      <LocationSection />

      {/* 11. Final CTA Banner */}
      <FinalCTASection />
    </div>
  );
};

export default HomePage;
