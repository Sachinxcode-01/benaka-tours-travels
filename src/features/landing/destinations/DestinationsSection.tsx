import React from "react";
import { Navigation, MapPin } from "lucide-react";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { Container } from "@shared/ui/container";
import { SectionHeading } from "@shared/ui/section-heading";
import { GlassCard } from "@shared/ui/glass-card";
import { Button } from "@shared/ui/button";

export const DestinationsSection: React.FC = () => {
  const destinations = [
    {
      name: "Gadag to Hubballi",
      distance: "~58 km (1 hr 15 mins)",
      recommended: "Swift Dzire, Ertiga, Innova",
      tag: "Frequent Outstation Route",
    },
    {
      name: "Gadag to Dharwad",
      distance: "~75 km (1 hr 30 mins)",
      recommended: "Hyundai Aura, Brezza, Vitara",
      tag: "Educational & Business Travel",
    },
    {
      name: "Gadag to Belagavi",
      distance: "~150 km (3 hrs)",
      recommended: "Innova Crysta, Scorpio, Thar",
      tag: "Executive & Family Trip",
    },
    {
      name: "Gadag to Bengaluru",
      distance: "~410 km (7 hrs)",
      recommended: "Innova Crysta, Tempo Traveller",
      tag: "Long Distance Highway Package",
    },
    {
      name: "Gadag to Goa",
      distance: "~230 km (5 hrs)",
      recommended: "Innova Crysta, Toofan Cruiser",
      tag: "Holiday & Vacation Package",
    },
    {
      name: "Custom Outstation Route",
      distance: "Flexible Distance",
      recommended: "Choose from 12 Vehicles",
      tag: "Tailored Interstate Journey",
    },
  ];

  return (
    <section
      id="destinations"
      className="py-20 bg-[#0B0D12] relative border-t border-amber-500/10"
    >
      <Container size="xl" className="space-y-12">
        <SectionHeading
          badgeText="Popular Routes & Outstation"
          title="Top Destinations Served From Gadag"
          subtitle="Prompt doorstep pick-up with highway-experienced drivers for outstation journeys across South India."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <GlassCard
              key={d.name}
              hoverable
              className="flex flex-col justify-between p-6 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    {d.tag}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                    <Navigation className="h-3.5 w-3.5 text-amber-400" />
                    <span>{d.distance}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-400 shrink-0" />
                  <span>{d.name}</span>
                </h3>

                <p className="text-xs text-slate-300">
                  <span className="text-slate-400">Recommended Fleet:</span>{" "}
                  <br />
                  <strong className="text-amber-300">{d.recommended}</strong>
                </p>
              </div>

              <div className="pt-4 border-t border-amber-500/10">
                <a
                  href={createWhatsAppInquiryUrl({
                    pickupLocation: "Gadag",
                    destination: d.name,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="primary" size="sm" fullWidth>
                    Request Route Quote
                  </Button>
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
};
