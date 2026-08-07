import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import { FAQ_DATA, type FAQItem } from "../../../data/faq";
import {
  DISPLAY_PHONE_NUMBER,
  WHATSAPP_PHONE_NUMBER,
} from "../../../utils/whatsapp";

export const FAQPreviewSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-2"); // Default open to driver policy FAQ

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-24 bg-[#07080B] text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-[#D4AF37] border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Clear Answers for Your Trip Planning
          </h2>
          <p className="text-sm text-slate-300">
            Everything you need to know about our chauffeur fleet, driver policies, rates, and booking process.
          </p>
        </div>

        {/* Prominent 100% Chauffeur-Driven Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3 text-amber-300">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37] shrink-0" />
            <div>
              <div className="font-bold text-white text-sm sm:text-base">
                100% Chauffeur-Driven Policy
              </div>
              <div className="text-xs text-amber-200/90 mt-0.5">
                Self-drive car rentals are strictly NOT provided. Certified drivers included with all rentals.
              </div>
            </div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#D4AF37] text-black text-xs font-bold shrink-0 hover:brightness-110 transition-all flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item: FAQItem) => {
            const isOpen = openId === item.id;
            const buttonId = `faq-btn-${item.id}`;
            const contentId = `faq-content-${item.id}`;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#121620] border-[#D4AF37]/50 shadow-xl"
                    : "bg-[#0B0D12] border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-[#0B0D12] border border-white/10 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-amber-500/10 border-amber-500/30" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
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
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 mt-1">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Contact Support Footer */}
        <div className="p-6 rounded-2xl bg-[#0B0D12] border border-white/10 text-center space-y-3">
          <p className="text-xs text-slate-400">
            Have a specific route query or special luggage requirement?
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold">
            <a
              href={`tel:${WHATSAPP_PHONE_NUMBER}`}
              className="text-[#D4AF37] hover:underline flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Driver Support ({DISPLAY_PHONE_NUMBER})</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
