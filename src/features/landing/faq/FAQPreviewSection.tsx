import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  HelpCircle,
  Plus,
  Minus,
  ShieldCheck,
  Phone,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { FAQ_DATA, type FAQItem } from "../../../data/faq";
import { BUSINESS_INFO } from "@entities/business";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";

type CategoryFilter =
  "all" | "booking" | "vehicles" | "drivers" | "pricing" | "travel";

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All Questions" },
  { id: "booking", label: "Booking" },
  { id: "vehicles", label: "Vehicles" },
  { id: "drivers", label: "Drivers & Safety" },
  { id: "pricing", label: "Pricing & Fares" },
  { id: "travel", label: "Travel & Routes" },
];

function mapFaqCategory(cat: FAQItem["category"]): CategoryFilter {
  switch (cat) {
    case "rental":
      return "vehicles";
    case "driver":
      return "drivers";
    case "payment":
      return "pricing";
    case "location":
      return "travel";
    default:
      return "booking";
  }
}

export const FAQPreviewSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [openId, setOpenId] = useState<string | null>("faq-2"); // Default open to 100% Chauffeur policy
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (activeCategory === "all") return true;
    const mapped = mapFaqCategory(item.category);
    if (activeCategory === "booking") {
      return item.id === "faq-8" || item.id === "faq-1";
    }
    return mapped === activeCategory;
  });

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const transitionConfig = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 bg-[#07080B] text-white relative overflow-hidden"
    >
      {/* Background Ambient Radial Gold Glow & Faint Route Grid */}
      <div className="pointer-events-none user-select-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-175 h-125 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-20 w-100 h-100 bg-amber-500/5 rounded-full blur-2xl" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03] stroke-amber-400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="faq-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faq-grid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-[#D4AF37] border border-amber-500/30 text-xs font-bold uppercase tracking-wider shadow-sm">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Questions Before Your Journey? <br className="hidden sm:block" />
            <span className="text-gradient-gold">
              We&apos;ve Got You Covered.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about booking, vehicles, chauffeurs and
            travel with Benaka Tours & Travels.
          </p>
        </div>

        {/* 100% Chauffeur-Driven Policy Highlight Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-linear-to-r from-amber-500/15 via-[#121620] to-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3.5 text-amber-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <div className="font-bold text-white text-base flex items-center gap-2">
                <span>100% Chauffeur-Driven Policy</span>
                <span className="text-[10px] uppercase font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Self-drive car rentals are strictly NOT provided. Every rental
                includes a certified, experienced driver.
              </p>
            </div>
          </div>
          <a
            href={createWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold shrink-0 transition-all shadow-md flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

        {/* Compact Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap pb-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isActive
                    ? "text-[#0B0D12] font-bold shadow-lg"
                    : "text-slate-300 hover:text-white bg-[#0B0D12]/80 border border-white/10 hover:border-amber-500/30"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFaqCategory"
                    className="absolute inset-0 bg-linear-to-r from-[#D4AF37] to-[#F59E0B] rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((item: FAQItem) => {
            const isOpen = openId === item.id;
            const buttonId = `faq-btn-${item.id}`;
            const contentId = `faq-content-${item.id}`;

            return (
              <motion.div
                key={item.id}
                layout={!prefersReducedMotion}
                className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#121620] border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.12)]"
                    : "bg-[#0B0D12]/90 border-white/10 hover:border-amber-500/30"
                }`}
              >
                {/* Left Active Accent Bar */}
                {isOpen && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-[#D4AF37] to-amber-500"
                  />
                )}

                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer min-h-11"
                >
                  <span
                    className={`font-bold text-base sm:text-lg transition-colors ${
                      isOpen
                        ? "text-[#D4AF37]"
                        : "text-slate-100 group-hover:text-amber-300"
                    }`}
                  >
                    {item.question}
                  </span>

                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-[#D4AF37] text-black border-[#D4AF37] rotate-180"
                        : "bg-[#161B26] border-white/10 text-amber-400 group-hover:border-amber-500/40"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={transitionConfig}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 pt-2 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/10 mt-1">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Final 24/7 Support Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-linear-to-b from-[#121620] to-[#0B0D12] border border-[#D4AF37]/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20">
            <Sparkles className="w-20 h-20 text-[#D4AF37]" />
          </div>

          <div className="space-y-2 max-w-md mx-auto relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Still Have Questions?
            </h3>
            <p className="text-sm text-slate-300">
              Talk directly with Benaka Tours & Travels. We&apos;re available
              24/7 for custom trip queries and instant quotes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
            <a
              href={createWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp Us Now</span>
            </a>

            <a
              href={createTelUrl()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-amber-400" />
              <span>Call Now ({BUSINESS_INFO.contact.phoneDisplay})</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
