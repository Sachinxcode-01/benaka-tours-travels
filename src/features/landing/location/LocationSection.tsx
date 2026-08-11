import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  ShieldCheck,
  Navigation,
} from "lucide-react";
import { BUSINESS_INFO } from "@entities/business";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { getGoogleMapsUrl } from "@shared/services/maps.service";
import { Container } from "@shared/ui/container";
import { SectionHeading } from "@shared/ui/section-heading";
import { GlassCard } from "@shared/ui/glass-card";
import { Button } from "@shared/ui/button";
import { LocationMap } from "@widgets/location-map";

export const LocationSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-[#07080B] relative border-t border-amber-500/10"
    >
      <Container size="xl" className="space-y-12">
        <SectionHeading
          badgeText="Find Us in Gadag"
          title="Start Your Journey From Benaka"
          subtitle="Located at Panchaxari Nagar 5th Cross, Gadag. Open 24/7 for doorstep pickups, outstation dispatch, and instant bookings."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Live Map Widget (7 cols on lg) */}
          <div className="lg:col-span-7">
            <LocationMap />
          </div>

          {/* Right Column: Office Info & Direct Action Cards (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="p-7 space-y-6 flex flex-col justify-between border border-amber-500/20 bg-neutral-950/90 shadow-2xl">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-amber-400 shrink-0" />
                    <span>BENAKA TOURS & TRAVELS</span>
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold">
                        Office & Dispatch Hub
                      </strong>
                      <p className="text-slate-300 leading-relaxed">
                        {BUSINESS_INFO.contact.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold">
                        Operating Hours
                      </strong>
                      <p className="text-emerald-400 font-bold">
                        {BUSINESS_INFO.operatingHours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold">Phone Support</strong>
                      <a
                        href={createTelUrl()}
                        className="text-amber-400 font-bold hover:underline"
                      >
                        {BUSINESS_INFO.contact.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold">Official Email</strong>
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

              {/* Action Buttons */}
              <div className="pt-6 border-t border-amber-500/15 grid grid-cols-2 gap-3">
                <a href={createTelUrl()}>
                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    leftIcon={<Phone className="h-4 w-4" />}
                  >
                    Call Now
                  </Button>
                </a>
                <a
                  href={createWhatsAppInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
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

              <div className="pt-2">
                <a
                  href={getGoogleMapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="md"
                    fullWidth
                    leftIcon={<Navigation className="h-4 w-4 text-amber-400" />}
                  >
                    Get Directions in Google Maps
                  </Button>
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </Container>
    </section>
  );
};
