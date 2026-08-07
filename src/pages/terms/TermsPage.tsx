import React from "react";
import { Container } from "@shared/ui/container";
import { BUSINESS_INFO } from "@entities/business";

export const TermsPage: React.FC = () => {
  return (
    <div className="py-12">
      <Container size="md" className="space-y-6 text-neutral-300">
        <h1 className="text-3xl font-extrabold text-white">
          Terms and Conditions
        </h1>
        <p className="text-sm">
          Service agreement terms for renting vehicles with {BUSINESS_INFO.name}
          .
        </p>
        <div className="space-y-4 text-xs leading-relaxed">
          <p>
            1. 100% Chauffeur-Driven: All rentals are exclusively operated by
            certified professional drivers. Self-drive option is strictly
            unavailable.
          </p>
          <p>
            2. Fare Confirmation: Public static rates are not fixed on the
            website. Final fares are confirmed per inquiry based on distance,
            duration, fuel, and tolls.
          </p>
          <p>
            3. Operational Liability: Professional drivers hold operational
            responsibility during travel.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default TermsPage;
