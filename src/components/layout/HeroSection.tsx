import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Star,
  Users,
  Car,
  ChevronDown,
} from "lucide-react";
import { PrimaryButton } from "../ui/PrimaryButton";
import { WhatsAppButton } from "../common/WhatsAppButton";
import { CallButton } from "../common/CallButton";
import { QuickInquiryForm } from "../forms/QuickInquiryForm";
import type { BookingRequest } from "../../types/booking";

interface HeroSectionProps {
  onExploreFleet: () => void;
  onQuickSearch: (data: Partial<BookingRequest>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreFleet,
  onQuickSearch,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="hero relative min-h-[100svh] w-full flex flex-col justify-between pt-8 pb-16 overflow-hidden bg-[#040507]"
    >
      {/* Real Benaka Vehicle Fleet Background Layer */}
      <motion.div
        initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 1.03, opacity: 0.85 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
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
      <div className="hero-content max-w-7xl mx-auto px-4 relative z-10 my-auto text-center space-y-8">
        {/* Animated Gold Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs md:text-sm font-extrabold uppercase tracking-wider backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>✨ GADAG&apos;S PREMIER RENTAL FLEET SINCE 2019</span>
        </motion.div>

        {/* Large Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-3"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Benaka{" "}
            <span className="font-accent text-[#D4AF37] font-normal text-5xl sm:text-7xl lg:text-8xl">
              Tours & Travels
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
            Panchaxari Nagar, Gadag&apos;s most trusted chauffeur-driven car
            rental partner. Premier Sedans, MUVs, SUVs & Coaches for local,
            outstation, corporate & wedding travel.
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs sm:text-sm text-slate-200 font-semibold"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Chauffeur-Driven</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 backdrop-blur-md">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Open 24 Hours / 7 Days</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] backdrop-blur-md">
            <Star className="w-4 h-4 fill-current text-amber-400" />
            <span>4.9 ★ (21+ Verified Reviews)</span>
          </div>
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <PrimaryButton size="lg" onClick={onExploreFleet}>
            Explore 12 Fleet Vehicles
          </PrimaryButton>
          <WhatsAppButton size="lg" label="Book on WhatsApp" />
          <CallButton size="lg" />
        </motion.div>

        {/* Floating Quick Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6"
        >
          <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
            <div className="flex justify-center mb-1 text-[#D4AF37]">
              <Car className="w-5 h-5" />
            </div>
            <strong className="text-xl sm:text-2xl font-extrabold text-white block">
              11+ Active
            </strong>
            <span className="text-xs text-slate-400">Fleet Vehicles</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
            <div className="flex justify-center mb-1 text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
            <strong className="text-xl sm:text-2xl font-extrabold text-white block">
              500+ Happy
            </strong>
            <span className="text-xs text-slate-400">Clients Served</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
            <div className="flex justify-center mb-1 text-amber-400">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <strong className="text-xl sm:text-2xl font-extrabold text-white block">
              4.9 / 5.0 Rating
            </strong>
            <span className="text-xs text-slate-400">21+ Reviews</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 text-center">
            <div className="flex justify-center mb-1 text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
            <strong className="text-xl sm:text-2xl font-extrabold text-white block">
              Since 2019
            </strong>
            <span className="text-xs text-slate-400">Gadag Chauffeur Hub</span>
          </div>
        </motion.div>

        {/* Floating Quick Inquiry Panel Below Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="pt-6"
        >
          <QuickInquiryForm onSearch={onQuickSearch} />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="hero-content relative z-10 text-center pt-8">
        <a
          href="#fleet"
          className="inline-flex flex-col items-center text-xs text-slate-400 hover:text-[#D4AF37] transition-colors"
        >
          <span>Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
        </a>
      </div>
    </section>
  );
};
