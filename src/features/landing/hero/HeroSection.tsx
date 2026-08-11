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
  const bgRef = useRef<HTMLDivElement>(null);
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
        const mediaQuery = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );
        if (mediaQuery.matches) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (bgRef.current) {
          tl.fromTo(
            bgRef.current,
            { opacity: 0.85, scale: 1.03 },
            { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
            0,
          );
        }

        if (badgeRef.current) {
          tl.fromTo(
            badgeRef.current,
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.4 },
            "-=0.9",
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
      id="home"
      className="hero relative min-h-[100svh] w-full flex flex-col justify-between pt-12 pb-16 overflow-hidden bg-[#040507]"
    >
      {/* Real Benaka Vehicle Fleet Background Layer */}
      <div
        ref={bgRef}
        className="hero-background absolute inset-0 z-0 bg-no-repeat bg-cover bg-[position:center_right] max-[1024px]:bg-[position:62%_center] max-[768px]:bg-[position:68%_center] max-[430px]:bg-[position:72%_center] pointer-events-none select-none"
        style={{
          backgroundImage: `url("/assets/vehicles/placeholders/benekavehicles.png")`,
        }}
      />

      {/* Dual Cinematic Gradient Overlay for Maximum Text Contrast */}
      <div
        className="hero-overlay absolute inset-0 z-1 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(4, 5, 7, 0.94) 0%,
              rgba(4, 5, 7, 0.88) 28%,
              rgba(4, 5, 7, 0.60) 52%,
              rgba(4, 5, 7, 0.25) 75%,
              rgba(4, 5, 7, 0.05) 100%
            ),
            linear-gradient(
              180deg,
              rgba(4, 5, 7, 0.1) 0%,
              rgba(4, 5, 7, 0.1) 55%,
              rgba(4, 5, 7, 0.95) 100%
            )
          `,
        }}
      />

      {/* Gold Radial Spotlight Accent */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none z-2" />

      {/* Hero Content Layer */}
      <div className="hero-content relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 my-auto">
        {/* Badge & Headlines */}
        <div className="space-y-4 max-w-3xl">
          <div ref={badgeRef}>
            <Badge
              variant="gold"
              className="text-xs uppercase tracking-widest px-3.5 py-1.5 shadow-lg backdrop-blur-md"
            >
              ✨ GADAG&apos;S PREMIER RENTAL FLEET SINCE 2019
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
      <div className="hero-content relative z-10 text-center pt-6">
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
