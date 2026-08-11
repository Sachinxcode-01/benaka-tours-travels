import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Pause,
  Play,
  Car,
  MapPin,
  Sparkles,
  Phone,
  MessageCircle,
  Award,
  Users,
  Clock,
} from "lucide-react";
import {
  TESTIMONIALS_DATA,
  type Testimonial,
} from "../../../data/testimonials";
import { BUSINESS_INFO } from "@entities/business";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { BookingWizardModal } from "@features/booking/BookingWizardModal";

const TRUST_METRICS = [
  {
    icon: Star,
    value: `${BUSINESS_INFO.metrics.averageRatingDisplay} ★`,
    label: "Average Rating",
  },
  {
    icon: ShieldCheck,
    value: BUSINESS_INFO.metrics.totalReviewsDisplay,
    label: "Verified Reviews",
  },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Clock, value: "24/7", label: "Doorstep Pickup" },
  {
    icon: Award,
    value: `Since ${BUSINESS_INFO.establishedYear}`,
    label: "Trusted Excellence",
  },
];

export const ReviewsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1,
    );
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Pause autoplay when browser tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsPaused(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Keyboard Navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const current: Testimonial = TESTIMONIALS_DATA[currentIndex];

  const slideVariants = {
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.95, x: 40 },
    animate: { opacity: 1, scale: 1, x: 0 },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.95, x: -40 },
  };

  return (
    <section
      id="reviews"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="py-24 bg-[#07080B] text-white relative overflow-hidden focus:outline-none"
      aria-label="Customer Reviews Carousel"
    >
      {/* Background Ambient Radial Gold Glow & Faint Grid */}
      <div className="pointer-events-none user-select-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-2xl" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03] stroke-amber-400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="reviews-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="24" cy="24" r="1" fill="#D4AF37" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#reviews-grid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-[#D4AF37] border border-amber-500/30 text-xs font-bold uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>What Patrons Say About BENAKA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Trusted Journeys. <br className="hidden sm:block" />
            <span className="text-gradient-gold">Happy Travellers.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Real experiences from families, newlyweds, and corporate clients who
            travelled with Benaka Tours & Travels.
          </p>
        </div>

        {/* Verified Trust Strip Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 p-4 sm:p-5 rounded-2xl bg-[#121620]/80 border border-amber-500/20 backdrop-blur-md shadow-xl">
          {TRUST_METRICS.map((metric, idx) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0B0D12]/80 border border-white/5 text-center space-y-1 hover:border-amber-500/30 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="text-base sm:text-lg font-bold text-white leading-none">
                  {metric.value}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Container */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative max-w-3xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#121620] to-[#0B0D12] border border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.15)] space-y-6 relative overflow-hidden backdrop-blur-xl"
            >
              {/* Background Watermark Quote */}
              <Quote className="w-28 h-28 absolute -bottom-4 -right-4 text-[#D4AF37]/10 pointer-events-none select-none" />

              {/* Header Rating & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                  <span className="text-xs font-bold text-amber-300 ml-1">
                    5.0 / 5.0 Rating
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    <Car className="w-3.5 h-3.5" />
                    <span>{current.vehicleRented}</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/10 text-xs font-medium">
                    {current.tripType}
                  </span>
                </div>
              </div>

              {/* Review Comment Text */}
              <blockquote className="text-base sm:text-lg md:text-xl text-slate-100 font-medium leading-relaxed italic relative z-10">
                &ldquo;{current.comment}&rdquo;
              </blockquote>

              {/* Customer Profile Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] to-amber-600 flex items-center justify-center font-bold text-black text-base shadow-md">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base leading-snug">
                      {current.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{current.location}</span>
                    </div>
                  </div>
                </div>

                {isPaused && (
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Autoplay Paused
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                aria-label="Previous review"
                className="w-10 h-10 rounded-xl bg-[#121620] border border-white/10 text-slate-300 hover:text-white hover:border-[#D4AF37] flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next review"
                className="w-10 h-10 rounded-xl bg-[#121620] border border-white/10 text-slate-300 hover:text-white hover:border-[#D4AF37] flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? "Play autoplay" : "Pause autoplay"}
                className="w-10 h-10 rounded-xl bg-[#121620] border border-white/10 text-amber-400 hover:border-[#D4AF37] flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                title={isPaused ? "Resume Autoplay" : "Pause Autoplay"}
              >
                {isPaused ? (
                  <Play className="w-4 h-4 fill-current" />
                ) : (
                  <Pause className="w-4 h-4 fill-current" />
                )}
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B]"
                      : "w-2.5 bg-slate-700 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA Support Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#121620] to-[#0B0D12] border border-[#D4AF37]/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20">
            <Sparkles className="w-20 h-20 text-[#D4AF37]" />
          </div>

          <div className="space-y-2 max-w-md mx-auto relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to Experience Benaka?
            </h3>
            <p className="text-sm text-slate-300">
              Comfortable vehicles. Professional chauffeurs. Reliable journeys.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:brightness-110 cursor-pointer"
            >
              Request Quote
            </button>

            <a
              href={createWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Now</span>
            </a>

            <a
              href={createTelUrl()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call Now ({BUSINESS_INFO.contact.phoneDisplay})</span>
            </a>
          </div>
        </div>
      </div>

      <BookingWizardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
