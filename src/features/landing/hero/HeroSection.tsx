import React, { useRef } from "react";
import {
  ShieldCheck,
  Clock,
  Users,
  Car,
  Star,
  Calendar,
  MessageCircle,
  Phone,
  ArrowDown,
} from "lucide-react";
import { BUSINESS_INFO } from "@entities/business";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { gsap, useGSAP } from "@shared/lib/gsap";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const brandTitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || typeof window === "undefined") return;
      try {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (badgeRef.current) {
          tl.fromTo(
            badgeRef.current,
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.4 },
          );
        }
        if (brandTitleRef.current) {
          tl.fromTo(
            brandTitleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4 },
            "-=0.2",
          );
        }
        if (titleRef.current) {
          tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.5 },
            "-=0.2",
          );
        }
        if (descRef.current) {
          tl.fromTo(
            descRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4 },
            "-=0.2",
          );
        }
        if (ctaRef.current?.children?.length) {
          tl.fromTo(
            Array.from(ctaRef.current.children),
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 },
            "-=0.2",
          );
        }
        if (trustRef.current?.children?.length) {
          tl.fromTo(
            Array.from(trustRef.current.children),
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, stagger: 0.05, duration: 0.3 },
            "-=0.2",
          );
        }
      } catch {
        // Fallback gracefully if GSAP is unavailable in test environment
      }
    },
    { scope: containerRef },
  );

  const handleScrollToFleet = () => {
    const el = document.getElementById("fleet");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToInquiry = () => {
    const el = document.getElementById("quick-inquiry");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-between pt-12 pb-16 overflow-hidden bg-[#07080B]"
    >
      {/* Background Graphic & Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-radial-gold opacity-50 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-radial-navy opacity-30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 my-auto">
        {/* Badge & Headlines */}
        <div className="space-y-4 max-w-3xl">
          <div ref={badgeRef}>
            <Badge
              variant="gold"
              className="text-xs uppercase tracking-widest px-3 py-1"
            >
              ✨ GADAG'S PREMIER RENTAL FLEET
            </Badge>
          </div>

          <h2
            ref={brandTitleRef}
            className="font-brand-accent text-3xl sm:text-4xl text-amber-400 font-bold"
          >
            {BUSINESS_INFO.name}
          </h2>

          <h1
            ref={titleRef}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
          >
            Premium Journeys. <br />
            <span className="text-gradient-gold">
              Professional Chauffeurs.
            </span>{" "}
            <br />
            Unforgettable Travel.
          </h1>

          <p
            ref={descRef}
            className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed"
          >
            Trusted chauffeur-driven vehicle rentals for local trips, outstation
            journeys, corporate travel, weddings and group tours across Gadag
            and surrounding regions since 2019.
          </p>
        </div>

        {/* Hero Action Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-2">
          <Button variant="primary" size="lg" onClick={handleScrollToFleet}>
            Explore Fleet ({BUSINESS_INFO.metrics.fleetSizeDisplay})
          </Button>

          <Button variant="outline" size="lg" onClick={handleScrollToInquiry}>
            Request a Quote
          </Button>

          <a
            href={createWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<MessageCircle className="h-4 w-4 text-emerald-400" />}
            >
              Book on WhatsApp
            </Button>
          </a>

          <a href={createTelUrl()}>
            <Button
              variant="ghost"
              size="lg"
              leftIcon={<Phone className="h-4 w-4 text-amber-400" />}
            >
              Call Now
            </Button>
          </a>
        </div>

        {/* Glass Trust Badges Grid */}
        <div
          ref={trustRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 border-t border-amber-500/15"
        >
          <div className="glass-card p-3 rounded-xl flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-white leading-none">
                100% Chauffeur
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Driven Included
              </p>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl flex items-center gap-2.5">
            <Clock className="h-5 w-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-white leading-none">
                Open 24/7
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Always Available
              </p>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl flex items-center gap-2.5">
            <Users className="h-5 w-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-white leading-none">
                {BUSINESS_INFO.metrics.happyClientsDisplay}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Happy Clients</p>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl flex items-center gap-2.5">
            <Car className="h-5 w-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-white leading-none">
                12 Vehicles
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Sedans to Buses
              </p>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl flex items-center gap-2.5">
            <Star className="h-5 w-5 text-amber-400 fill-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-white leading-none">
                {BUSINESS_INFO.metrics.averageRatingDisplay}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Google Rating</p>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl flex items-center gap-2.5">
            <Calendar className="h-5 w-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-white leading-none">
                Since 2019
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Trusted Experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="relative z-10 text-center pt-6">
        <button
          onClick={handleScrollToInquiry}
          aria-label="Scroll down to quick inquiry form"
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <span>Scroll to Request Quote</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-amber-400" />
        </button>
      </div>
    </section>
  );
};
