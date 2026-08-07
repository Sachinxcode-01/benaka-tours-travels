import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { BUSINESS_INFO } from "@entities/business";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { getGoogleMapsUrl } from "@shared/services/maps.service";
import { Container } from "@shared/ui/container";
import { SectionHeading } from "@shared/ui/section-heading";
import { GlassCard } from "@shared/ui/glass-card";
import { Button } from "@shared/ui/button";

export const LocationSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-[#07080B] relative border-t border-amber-500/10"
    >
      <Container size="xl" className="space-y-12">
        <SectionHeading
          badgeText="Visit Our Office"
          title="Headquarters & Location"
          subtitle="Conveniently located in Panchaxari Nagar, Gadag. Open 24/7 for doorstep pickup and booking support."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Office Details Card */}
          <GlassCard className="p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="h-6 w-6 text-amber-400 shrink-0" />
                <span>Benaka Tours & Travels Office</span>
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">
                      Physical Address
                    </strong>
                    <p>{BUSINESS_INFO.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">
                      Operating Hours
                    </strong>
                    <p>{BUSINESS_INFO.operatingHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Phone Line</strong>
                    <a
                      href={createTelUrl()}
                      className="text-amber-400 hover:underline"
                    >
                      {BUSINESS_INFO.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Official Email</strong>
                    <a
                      href={`mailto:${BUSINESS_INFO.contact.email}`}
                      className="text-amber-400 hover:underline"
                    >
                      {BUSINESS_INFO.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-amber-500/15 flex flex-wrap gap-3">
              <a href={createTelUrl()} className="flex-1">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  leftIcon={<Phone className="h-4 w-4" />}
                >
                  Call Us
                </Button>
              </a>
              <a
                href={createWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  leftIcon={<MessageCircle className="h-4 w-4" />}
                >
                  WhatsApp
                </Button>
              </a>
            </div>
          </GlassCard>

          {/* Interactive Maps Preview Card */}
          <GlassCard className="p-8 space-y-6 flex flex-col justify-between relative overflow-hidden bg-neutral-950 border border-amber-500/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  📍 Verified Google Maps Location
                </span>
                <span className="text-xs text-slate-400">
                  Panchaxari Nagar 5th Cross
                </span>
              </div>

              <div className="h-56 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <MapPin className="h-10 w-10 text-amber-400 animate-pulse" />
                <h4 className="text-lg font-bold text-white">
                  BENAKA TOURS AND TRAVELS
                </h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  Panchaxari Nagar 5th Cross, Gadag, Karnataka, India
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={getGoogleMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={<ExternalLink className="h-4 w-4" />}
                >
                  Open in Google Maps / Get Directions
                </Button>
              </a>
            </div>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
};
