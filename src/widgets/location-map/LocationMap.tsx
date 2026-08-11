import React, { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  type MapRef,
} from "../../components/ui/map";
import { MapStyleSelector, type MapStyleKey } from "./MapStyleSelector";
import { BUSINESS_INFO } from "@entities/business";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { getGoogleMapsUrl } from "@shared/services/maps.service";

export const BENAKA_LOCATION = {
  longitude: 75.643468,
  latitude: 15.427667,
};

const mapStyles: Record<MapStyleKey, string | undefined> = {
  default: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  openstreetmap: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  openstreetmap3d:
    "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
};

export const LocationMap: React.FC = () => {
  const mapRef = useRef<MapRef>(null);
  const [style, setStyle] = useState<MapStyleKey>("default");
  const [activeTab, setActiveTab] = useState<"interactive" | "google">(
    "google",
  );

  const selectedStyle = mapStyles[style];
  const is3D = style === "openstreetmap3d";

  useEffect(() => {
    mapRef.current?.easeTo({
      pitch: is3D ? 60 : 0,
      duration: 500,
    });
  }, [is3D]);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-amber-400/20 bg-neutral-950 shadow-2xl space-y-0">
      {/* Top Bar Controls & Mode Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#121620] border-b border-white/10 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white leading-tight">
              Headquarters Location Map
            </h4>
            <span className="text-[11px] text-slate-400 block">
              Panchaxari Nagar 5th Cross, Gadag
            </span>
          </div>
        </div>

        {/* View Mode & Style Controls */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab("interactive")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === "interactive"
                  ? "bg-[#D4AF37] text-black font-bold shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Live Map
            </button>
            <button
              onClick={() => setActiveTab("google")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === "google"
                  ? "bg-[#D4AF37] text-black font-bold shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Google Maps
            </button>
          </div>

          {activeTab === "interactive" && (
            <MapStyleSelector value={style} onChange={setStyle} />
          )}
        </div>
      </div>

      {/* Map Container View */}
      <div className="relative h-[340px] sm:h-[420px] md:h-[480px] lg:h-[540px] w-full overflow-hidden">
        {activeTab === "interactive" ? (
          <Map
            ref={mapRef}
            center={[BENAKA_LOCATION.longitude, BENAKA_LOCATION.latitude]}
            zoom={15}
            pitch={is3D ? 60 : 0}
            styles={
              selectedStyle
                ? {
                    light: selectedStyle,
                    dark: selectedStyle,
                  }
                : undefined
            }
          >
            <MapMarker
              longitude={BENAKA_LOCATION.longitude}
              latitude={BENAKA_LOCATION.latitude}
            >
              <MarkerContent>
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] border-2 border-[#0B0D12] flex items-center justify-center shadow-lg shadow-amber-500/50 hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-[#0B0D12] fill-[#0B0D12]" />
                </div>
              </MarkerContent>
              <MarkerPopup>
                <div className="p-1 text-center space-y-1 min-w-[160px]">
                  <strong className="text-xs font-bold text-neutral-900 block">
                    BENAKA TOURS & TRAVELS
                  </strong>
                  <p className="text-[11px] text-neutral-600">
                    Panchaxari Nagar 5th Cross, Gadag
                  </p>
                </div>
              </MarkerPopup>
            </MapMarker>
          </Map>
        ) : (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3846.0534363372826!2d75.643468!3d15.427667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTXCsDI1JzM5LjYiTiA3NcKwMzgnMzYuNSJF!5e0!3m2!1sen!2sin!4v1786437313749!5m2!1sen!2sin"
            title="Benaka Tours & Travels Gadag Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full"
          />
        )}

        {/* Floating Desktop Translucent Overlay Card */}
        <div className="hidden md:block absolute left-4 bottom-4 z-20 max-w-sm rounded-2xl bg-[#0B0D12]/85 p-4 border border-[#D4AF37]/30 shadow-2xl backdrop-blur-md space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-bold text-white block">
                BENAKA TOURS & TRAVELS
              </strong>
              <span className="text-xs text-amber-300 font-semibold">
                Panchaxari Nagar, Gadag
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {BUSINESS_INFO.contact.address}
          </p>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1 border-t border-white/10">
            <Clock className="w-3.5 h-3.5" />
            <span>Open 24 Hours / 7 Days</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="p-4 bg-[#121620] border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 z-20">
        <a
          href={getGoogleMapsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 active:scale-95 transition-all min-h-[44px]"
        >
          <Navigation className="w-4 h-4" />
          <span>Get Directions</span>
        </a>

        <a
          href={getGoogleMapsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-3 rounded-xl bg-[#1A1F2C] text-slate-200 border border-white/10 font-bold text-xs flex items-center justify-center gap-1.5 hover:border-[#D4AF37] hover:text-[#D4AF37] active:scale-95 transition-all min-h-[44px]"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Open Google Maps</span>
        </a>

        <a
          href={createTelUrl()}
          className="py-3 px-3 rounded-xl bg-[#1A1F2C] text-slate-200 border border-white/10 font-bold text-xs flex items-center justify-center gap-1.5 hover:border-amber-400 hover:text-amber-300 active:scale-95 transition-all min-h-[44px]"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call Now</span>
        </a>

        <a
          href={createWhatsAppInquiryUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-3 rounded-xl bg-emerald-600/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-600 active:scale-95 transition-all min-h-[44px]"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
