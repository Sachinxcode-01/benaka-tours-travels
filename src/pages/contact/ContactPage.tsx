import React from "react";
import { BUSINESS_INFO } from "@entities/business";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { Container } from "@shared/ui/container";
import { Card } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { LocationMap } from "@widgets/location-map";

export const ContactPage: React.FC = () => {
  return (
    <div className="py-12 space-y-8">
      <Container size="xl" className="space-y-4">
        <h1 className="text-3xl font-extrabold text-white">
          Contact & Location
        </h1>
        <p className="text-neutral-400 text-sm">
          Get in touch with Benaka Tours & Travels for instant vehicle
          inquiries, outstation quotes, and 24/7 doorstep rental dispatch.
        </p>
      </Container>

      <Container size="xl" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5">
          <Card className="space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
              Contact Details
            </h2>
            <div className="space-y-4 text-sm text-neutral-300">
              <div>
                <p className="text-xs text-neutral-500 uppercase font-semibold">
                  Primary Phone Line
                </p>
                <a
                  href={createTelUrl()}
                  className="text-amber-400 font-bold hover:underline"
                >
                  {BUSINESS_INFO.contact.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-xs text-neutral-500 uppercase font-semibold">
                  WhatsApp Booking & Inquiry
                </p>
                <a
                  href={createWhatsAppInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 font-bold hover:underline"
                >
                  +91 {BUSINESS_INFO.contact.whatsappNumber}
                </a>
              </div>
              <div>
                <p className="text-xs text-neutral-500 uppercase font-semibold">
                  Official Email
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
                  Physical Office Address
                </p>
                <p className="text-slate-200">{BUSINESS_INFO.contact.address}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 uppercase font-semibold">
                  Operating Hours
                </p>
                <p className="text-emerald-400 font-bold">{BUSINESS_INFO.operatingHours}</p>
              </div>
            </div>
            <div className="pt-4 flex gap-3">
              <a href={createTelUrl()} className="flex-1">
                <Button variant="outline" size="md" fullWidth>
                  Call Support
                </Button>
              </a>
              <a
                href={createWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="primary" size="md" fullWidth>
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <LocationMap />
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
