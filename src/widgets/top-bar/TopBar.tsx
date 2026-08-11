import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Phone, MapPin, Clock, Star, MessageCircle } from "lucide-react";
import { BUSINESS_INFO } from "@entities/business";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { getGoogleMapsUrl } from "@shared/services/maps.service";

export const TopBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleReviewsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const el = document.getElementById("reviews");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#reviews");
      setTimeout(() => {
        const el = document.getElementById("reviews");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <div className="w-full border-b border-amber-500/10 bg-[#07080B] text-slate-300 text-xs py-2 px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left Side: Location & Hours */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-amber-400/90 font-medium">
            <Clock className="h-3.5 w-3.5" />
            <span>Open 24 Hours / 7 Days</span>
          </div>
          <a
            href={getGoogleMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            title="Open Verified Google Maps Location"
          >
            <MapPin className="h-3.5 w-3.5 text-amber-500/80" />
            <span>Panchaxari Nagar, Gadag</span>
          </a>
        </div>

        {/* Right Side: Rating & Quick Actions */}
        <div className="flex items-center gap-4">
          <a
            href="#reviews"
            onClick={handleReviewsClick}
            className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full text-amber-300 font-semibold hover:bg-amber-500/20 transition-all cursor-pointer"
            title="View 21+ Customer Reviews"
          >
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>
              {BUSINESS_INFO.metrics.averageRatingDisplay} (
              {BUSINESS_INFO.metrics.totalReviewsDisplay})
            </span>
          </a>

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
