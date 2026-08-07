import React from "react";
import { BUSINESS_INFO } from "@entities/business";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { getGoogleMapsUrl } from "@shared/services/maps.service";
import { Container } from "@shared/ui/container";
import { Card } from "@shared/ui/card";
import { Button } from "@shared/ui/button";

export const ContactPage: React.FC = () => {
  return (
    <div className="py-12 space-y-8">
      <Container size="lg" className="space-y-4">
        <h1 className="text-3xl font-extrabold text-white">
          Contact & Location
        </h1>
        <p className="text-neutral-400 text-sm">
          Get in touch with Benaka Tours & Travels for instant vehicle
          inquiries, outstation quotes, and booking confirmation.
        </p>
      </Container>

      <Container size="lg" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="space-y-6">
          <h2 className="text-xl font-bold text-white">Contact Details</h2>
          <div className="space-y-4 text-sm text-neutral-300">
            <div>
              <p className="text-xs text-neutral-500 uppercase font-semibold">
                Primary Phone Line
              </p>
              <a
                href={createTelUrl()}
                className="text-amber-400 font-medium hover:underline"
              >
                {BUSINESS_INFO.contact.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase font-semibold">
                WhatsApp Booking
              </p>
              <a
                href={createWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 font-medium hover:underline"
              >
                +91 {BUSINESS_INFO.contact.whatsappNumber}
              </a>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase font-semibold">
                Email Address
              </p>
              <a
                href={`mailto:${BUSINESS_INFO.contact.email}`}
                className="text-amber-400 font-medium hover:underline"
              >
                {BUSINESS_INFO.contact.email}
              </a>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase font-semibold">
                Physical Address
              </p>
              <p>{BUSINESS_INFO.contact.address}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase font-semibold">
                Operating Hours
              </p>
              <p>{BUSINESS_INFO.operatingHours}</p>
            </div>
          </div>
        </Card>

        <Card className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Location Map</h2>
            <p className="text-sm text-neutral-300">
              Our headquarters are conveniently located at Panchaxari Nagar 5th
              Cross, Gadag, Karnataka.
            </p>
          </div>
          <div className="pt-4">
            <a
              href={getGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="md" fullWidth>
                Open Google Maps Location
              </Button>
            </a>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default ContactPage;
