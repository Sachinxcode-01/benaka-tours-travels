import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import {
  DISPLAY_PHONE_NUMBER,
  BUSINESS_EMAIL,
  MAPS_URL,
} from "../../utils/whatsapp";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#07090D] text-slate-400 pt-16 pb-32 sm:pb-24 md:pb-12 border-t border-[#D4AF37]/20 overflow-hidden">
      {/* Decorative Gold Glow & Road Line Graphics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
      <div className="absolute inset-0 bg-glass-radial pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/brand/benaka_emblem_gold_transparent.png"
                alt="Benaka Emblem"
                className="h-12 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-accent text-3xl text-[#D4AF37] leading-none">
                  Benaka
                </span>
                <span className="text-xs tracking-[0.2em] font-extrabold uppercase text-white mt-0.5">
                  Tours & Travels
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Panchaxari Nagar, Gadag&apos;s premier chauffeur-driven rental
              service since 2019. Providing meticulously maintained Sedans,
              SUVs, MUVs & Coaches for safe outstation, wedding & corporate
              travel.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Chauffeur-Driven • No Self-Drive</span>
            </div>
          </div>

          {/* Column 2: Quick Links & Fleet */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider">
              Our Fleet & Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#fleet"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Maruti Swift Dzire
                </a>
              </li>
              <li>
                <a
                  href="#fleet"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Toyota Innova Crysta
                </a>
              </li>
              <li>
                <a
                  href="#fleet"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Maruti Ertiga
                </a>
              </li>
              <li>
                <a
                  href="#fleet"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Mahindra Scorpio & Thar
                </a>
              </li>
              <li>
                <a
                  href="#fleet"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  13-Seater Tempo Traveller
                </a>
              </li>
              <li>
                <a
                  href="#fleet"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  25-Seater Coach Bus
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Operational Services */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#services"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Outstation Journeys
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Local Doorstep Pick & Drop
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Wedding & Party Fleets
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Corporate Delegation Rentals
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Airport & Railway Transfers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider">
              Get in Touch
            </h4>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Panchaxari Nagar 5th Cross, Gadag, Karnataka, India</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <a
                href="tel:+916362416120"
                className="hover:text-white transition-colors"
              >
                {DISPLAY_PHONE_NUMBER}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="hover:text-white transition-colors"
              >
                {BUSINESS_EMAIL}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-emerald-400 font-semibold">
              <Clock className="w-4 h-4 shrink-0" />
              <span>Open 24 Hours / 7 Days a Week</span>
            </div>
            <div className="pt-2">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] px-3 py-1.5 rounded-lg transition-all"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1 text-center md:text-left">
            <p>
              © {new Date().getFullYear()} BENAKA TOURS AND TRAVELS. All rights
              reserved.
            </p>
            <p className="text-[11px] text-slate-500">
              Designed &amp; Developed by{" "}
              <span className="text-[#D4AF37] font-semibold hover:underline cursor-pointer">
                Sachin Developer
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms &amp; Conditions
            </span>
            <span className="hover:text-white cursor-pointer">
              Cancellation Policy
            </span>
            <Link to="/admin" className="text-[#D4AF37] hover:underline">
              Admin Login
            </Link>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#121620] border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
