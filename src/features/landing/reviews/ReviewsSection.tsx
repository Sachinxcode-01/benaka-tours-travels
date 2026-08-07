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
} from "lucide-react";
import { TESTIMONIALS_DATA, type Testimonial } from "../../../data/testimonials";

export const ReviewsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -50 },
  };

  return (
    <section
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="py-24 bg-[#0B0D12] text-white relative overflow-hidden focus:outline-none"
      aria-label="Customer Reviews Carousel"
    >
      <div className="max-w-5xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-[#D4AF37] border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Customer Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#D4AF37] tracking-tight">
            What Patrons Say About BENAKA
          </h2>
          <p className="text-sm text-slate-300">
            Real experiences from families, newlyweds, and corporate clients in Gadag & Hubballi.
          </p>
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
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="p-8 sm:p-10 rounded-3xl bg-[#121620]/90 border border-[#D4AF37]/30 shadow-2xl space-y-6 relative overflow-hidden"
            >
              {/* Background Quote Watermark */}
              <Quote className="w-24 h-24 absolute -bottom-4 -right-4 text-[#D4AF37]/5 pointer-events-none" />

              {/* Star Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Verified Review
                </span>
              </div>

              {/* Review Content */}
              <blockquote className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed italic">
                "{current.comment}"
              </blockquote>

              {/* Customer & Vehicle Info */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-bold text-white text-sm">
                    {current.name}
                  </div>
                  <div className="text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{current.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-[#0B0D12] text-amber-300 border border-amber-500/20 font-semibold flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {current.vehicleRented}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#0B0D12] text-slate-300 border border-white/10 font-medium">
                    {current.tripType}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between pt-8">
            {/* Play/Pause Indicator */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Play autoplay" : "Pause autoplay"}
              className="p-2 rounded-xl bg-[#121620] border border-white/10 text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1.5"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4 text-emerald-400" />
                  <span>Autoplay Paused</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4 text-[#D4AF37]" />
                  <span>Playing</span>
                </>
              )}
            </button>

            {/* Slide Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_: Testimonial, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-[#D4AF37]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Previous & Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                aria-label="Previous review"
                className="w-10 h-10 rounded-xl bg-[#121620] border border-white/10 text-slate-200 hover:text-white hover:border-[#D4AF37] flex items-center justify-center transition-all shadow-md active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next review"
                className="w-10 h-10 rounded-xl bg-[#121620] border border-white/10 text-slate-200 hover:text-white hover:border-[#D4AF37] flex items-center justify-center transition-all shadow-md active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
