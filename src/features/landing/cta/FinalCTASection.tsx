import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  MessageCircle,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import {
  DISPLAY_PHONE_NUMBER,
  WHATSAPP_PHONE_NUMBER,
} from "../../../utils/whatsapp";
import { BookingWizardModal } from "@features/booking/BookingWizardModal";

export const FinalCTASection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const roadLineRef = useRef<SVGLineElement>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    if (roadLineRef.current) {
      gsap.to(roadLineRef.current, {
        strokeDashoffset: -100,
        duration: 3,
        repeat: -1,
        ease: "none",
      });
    }

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".cta-animate"),
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        },
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-[#07080B] text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Moving-Road Subtle Animated Background SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <line
            ref={roadLineRef}
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeDasharray="12 12"
          />
        </svg>
      </div>

      {/* Gold Light Sweep Spotlight Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-500/10 via-[#D4AF37]/15 to-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
        {/* Badge */}
        <div className="cta-animate inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 text-[#D4AF37] border border-amber-500/30 text-xs font-bold uppercase tracking-wider shadow-lg">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Gadag's #1 Chauffeur Rental Service</span>
        </div>

        {/* Cinematic Headline */}
        <div className="cta-animate space-y-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Travel With Confidence.
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center justify-center gap-1.5 font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Professional Chauffeurs</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Well-Maintained Fleet</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>24/7 Driver Support</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>One Trusted Partner</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="cta-animate flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all min-h-[52px]"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-emerald-600 text-white font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 hover:brightness-110 active:scale-95 transition-all min-h-[52px]"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>WhatsApp Now</span>
          </a>

          <a
            href={`tel:${WHATSAPP_PHONE_NUMBER}`}
            className="w-full sm:w-auto py-3.5 px-6 rounded-2xl border border-[#D4AF37]/40 bg-[#121620] text-[#D4AF37] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#1A1F2C] transition-all min-h-[52px]"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {DISPLAY_PHONE_NUMBER}</span>
          </a>

          <Link
            to="/fleet"
            className="w-full sm:w-auto py-3.5 px-6 rounded-2xl border border-white/10 bg-[#121620] text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#1A1F2C] transition-all min-h-[52px]"
          >
            <span>Explore Fleet</span>
          </Link>
        </div>
      </div>

      {/* Booking Wizard Modal */}
      <BookingWizardModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};
