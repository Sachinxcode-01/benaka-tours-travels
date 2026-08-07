import React from "react";
import { Container } from "@shared/ui/container";
import { BUSINESS_INFO } from "@entities/business";

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-12">
      <Container size="md" className="space-y-6 text-neutral-300">
        <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-sm">
          At {BUSINESS_INFO.name}, we value customer privacy and handle all trip
          inquiries securely.
        </p>
        <div className="space-y-4 text-xs leading-relaxed">
          <p>
            1. Information Collection: We collect contact details (name, phone
            number, pickup/drop addresses) strictly for processing
            chauffeur-driven vehicle rental inquiries via WhatsApp and direct
            call.
          </p>
          <p>
            2. Usage: Your details are used solely to calculate fare estimates
            and coordinate driver details.
          </p>
          <p>
            3. Contact: For privacy questions, email{" "}
            {BUSINESS_INFO.contact.email}.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPage;
