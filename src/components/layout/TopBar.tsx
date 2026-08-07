import React from "react";
import { Phone, MapPin, Clock, Star, MessageCircle } from "lucide-react";
import {
  DISPLAY_PHONE_NUMBER,
  WHATSAPP_PHONE_NUMBER,
} from "../../utils/whatsapp";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#0B0D12]/90 border-b border-white/10 text-xs py-2 px-4 text-slate-300 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Open 24/7</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Panchaxari Nagar 5th Cross, Gadag, KA</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>4.9 ★ (21+ Google Reviews)</span>
          </div>
        </div>

        {/* Right Side Direct CTAs */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+916362416120"
            className="flex items-center gap-1.5 text-white font-medium hover:text-[#D4AF37] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{DISPLAY_PHONE_NUMBER}</span>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xs:flex items-center gap-1 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
