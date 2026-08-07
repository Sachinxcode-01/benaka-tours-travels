import React from "react";
import { Phone, MapPin, Clock, Star, MessageCircle } from "lucide-react";
import { BUSINESS_INFO } from "@entities/business";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";

export const TopBar: React.FC = () => {
  return (
    <div className="w-full border-b border-amber-500/10 bg-[#07080B] text-slate-300 text-xs py-2 px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left Side: Location & Hours */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-amber-400/90 font-medium">
            <Clock className="h-3.5 w-3.5" />
            <span>
              {BUSINESS_INFO.operatingHours.split(" ")[0]} 24/7 Service
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <MapPin className="h-3.5 w-3.5 text-amber-500/80" />
            <span>Panchaxari Nagar, Gadag</span>
          </div>
        </div>

        {/* Right Side: Rating & Quick Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full text-amber-300 font-semibold">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>
              {BUSINESS_INFO.metrics.averageRatingDisplay} (
              {BUSINESS_INFO.metrics.totalReviewsDisplay})
            </span>
          </div>

          <a
            href={createTelUrl()}
            className="hidden md:flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors font-medium"
          >
            <Phone className="h-3.5 w-3.5 text-amber-400" />
            <span>{BUSINESS_INFO.contact.phoneDisplay}</span>
          </a>

          <a
            href={createWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
          >
            <MessageCircle className="h-3.5 w-3.5 fill-emerald-400/20" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
