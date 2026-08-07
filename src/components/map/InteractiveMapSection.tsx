import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  ExternalLink,
  Phone,
  MessageCircle,
  Compass,
} from "lucide-react";
import { POPULAR_ROUTES } from "../../data/routes";
import type { PopularRoute } from "../../data/routes";
import { MAPS_URL, WHATSAPP_PHONE_NUMBER } from "../../utils/whatsapp";
import { SectionHeading } from "../ui/SectionHeading";

export const InteractiveMapSection: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<PopularRoute>(
    POPULAR_ROUTES[0],
  );

  return (
    <section
      id="location-map"
      className="py-20 bg-[#0B0D12] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          badge="EXPLORE ROUTES & LOCATION"
          title="Gadag Hub & Popular Destination Routes"
          subtitle="Located at Panchaxari Nagar 5th Cross, Gadag. Offering 24/7 doorstep pickup and highway travel across Karnataka & neighboring states."
        />

        {/* Destination Route Chips */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-6 custom-scrollbar mb-8">
          {POPULAR_ROUTES.map((route) => {
            const isSelected = selectedRoute.id === route.id;
            return (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/25"
                    : "bg-[#121620] border border-white/10 text-slate-300 hover:text-white"
                }`}
              >
                <Navigation
                  className={`w-3.5 h-3.5 ${isSelected ? "text-black" : "text-[#D4AF37]"}`}
                />
                <span>Gadag ➔ {route.destination}</span>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] ${isSelected ? "bg-black/20 text-black" : "bg-white/10 text-slate-400"}`}
                >
                  {route.distanceKm} km
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Map & Selected Route Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Selected Route Info Card */}
          <div className="glass-card rounded-2xl p-6 border border-[#D4AF37]/30 bg-[#121620] flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full mb-3">
                <Compass className="w-3.5 h-3.5" />
                <span>SELECTED ROUTE PREVIEW</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">
                Gadag to {selectedRoute.destination}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {selectedRoute.description}
              </p>

              <div className="space-y-3 border-y border-white/10 py-4 text-xs text-slate-300">
                <div className="flex justify-between items-center">
                  <span>Approximate Distance:</span>
                  <strong className="text-white font-bold">
                    {selectedRoute.distanceKm} km
                  </strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Estimated Drive Time:</span>
                  <strong className="text-white font-bold">
                    {selectedRoute.estimatedHours}
                  </strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Recommended Vehicles:</span>
                  <strong className="text-[#D4AF37] font-bold">
                    {selectedRoute.popularVehicles.join(", ")}
                  </strong>
                </div>
              </div>
            </div>

            {/* Live GPS Tracking Integration Layer Card */}
            <div className="p-3.5 rounded-xl bg-[#0B0D12] border border-blue-500/30 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                <span>Live Vehicle GPS Status</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Live vehicle tracking available after booking — contact support
                for real-time trip GPS links.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110"
              >
                <span>Get Directions in Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:+916362416120"
                  className="py-2.5 rounded-xl border border-white/10 bg-[#1A1F2C] text-slate-200 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Embed Frame */}
          <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden border border-white/10 h-[400px] lg:h-auto min-h-[380px] relative">
            <iframe
              title="Benaka Tours & Travels Gadag Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.9032641029016!2d75.6264883!3d15.4206583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8f9212ad1fa7d%3A0x1d668c2ee83c4801!2sPanchaxari%20Nagar%2C%20Gadag-Betageri%2C%20Karnataka%20582101!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter grayscale contrast-125 brightness-90 hover:filter-none transition-all duration-500"
            />
            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 z-10 glass-panel px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2 border border-[#D4AF37]/30">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>Operational Hub: Panchaxari Nagar 5th Cross, Gadag</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
