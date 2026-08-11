import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { BUSINESS_INFO } from "@entities/business";
import { createTelUrl } from "@shared/services/phone.service";
import { getGoogleMapsUrl } from "@shared/services/maps.service";

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-amber-500/20 bg-[#050608] text-slate-400 text-sm relative">
      {/* Gold Road-Line Top Accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand & Story */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/brand/benaka_emblem_gold_transparent.png"
              alt="Benaka Emblem"
              className="h-12 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-brand-accent text-3xl font-bold text-amber-400 leading-none">
                Benaka
              </span>
              <span className="text-xs font-bold tracking-[0.2em] text-slate-100 uppercase mt-0.5">
                Tours & Travels
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
            {BUSINESS_INFO.tagline}. Operating 100% chauffeur-driven vehicle
            rentals across Gadag, Hubballi, Dharwad, Belagavi, Bengaluru, and
            Goa since {BUSINESS_INFO.establishedYear}.
          </p>

          <div className="inline-flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full font-medium">
            <ShieldCheck className="h-4 w-4 text-amber-400" />
            <span>100% Chauffeur-Driven • Zero Customer Liability</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider text-amber-400">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href="/" className="hover:text-amber-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="#fleet"
                className="hover:text-amber-400 transition-colors"
              >
                Our Fleet (12 Vehicles)
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="hover:text-amber-400 transition-colors"
              >
                Specialized Services
              </a>
            </li>
            <li>
              <a
                href="#why-us"
                className="hover:text-amber-400 transition-colors"
              >
                Why Choose Us
              </a>
            </li>
            <li>
              <a
                href="#destinations"
                className="hover:text-amber-400 transition-colors"
              >
                Popular Destinations
              </a>
            </li>
            <li>
              <a
                href="#reviews"
                className="hover:text-amber-400 transition-colors"
              >
                Verified Reviews
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-amber-400 transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Legal & Portals */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider text-amber-400">
            Legal & Admin
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link
                to="/privacy"
                className="hover:text-amber-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-amber-400 transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="hover:text-amber-400 transition-colors text-slate-300 font-semibold"
              >
                Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider text-amber-400">
            Contact & Office
          </h4>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{BUSINESS_INFO.contact.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-400 shrink-0" />
              <a
                href={createTelUrl()}
                className="text-amber-400 hover:underline"
              >
                {BUSINESS_INFO.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-amber-400 shrink-0" />
              <a
                href={`mailto:${BUSINESS_INFO.contact.email}`}
                className="text-amber-400 hover:underline"
              >
                {BUSINESS_INFO.contact.email}
              </a>
            </li>
            <li>
              <a
                href={getGoogleMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline pt-1"
              >
                <span>View Google Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar & Back to Top */}
      <div className="border-t border-neutral-900 py-6 px-4">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center text-sm text-white/60 sm:text-base">
            © {new Date().getFullYear()} Benaka Tours & Travels. All rights
            reserved.
            <span className="mx-2 hidden sm:inline">·</span>
            <span className="block sm:inline">
              Designed & Developed by{" "}
              <span className="font-semibold text-[#D4AF37] transition-colors duration-300 hover:text-[#F1D58A]">
                Sachin K [ Developer ]
              </span>
            </span>
          </p>
          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer shrink-0"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
