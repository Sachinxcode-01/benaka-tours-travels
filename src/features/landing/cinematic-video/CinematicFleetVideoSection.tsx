import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Car,
} from "lucide-react";
import { gsap, useGSAP } from "@shared/lib/gsap";
import { Container } from "@shared/ui/container";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { BookingWizardModal } from "@features/booking/BookingWizardModal";

export const CinematicFleetVideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  // Toggle Video Play / Pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Toggle Mute / Sound
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const nextMute = !videoRef.current.muted;
    videoRef.current.muted = nextMute;
    setIsMuted(nextMute);
  }, []);

  // Toggle Fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Viewport IntersectionObserver to Pause / Play Video efficiently
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // GSAP ScrollTrigger Sequence
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            eyebrowRef.current,
            titleRef.current,
            textRef.current,
            videoContainerRef.current,
            taglineRef.current,
            ctaRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 },
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          videoContainerRef.current,
          { opacity: 0, scale: 0.96, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        );

      // Parallax effect on video container (desktop only)
      if (window.innerWidth >= 1024) {
        gsap.to(videoContainerRef.current, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="cinematic-fleet"
      className="py-24 bg-[#040507] text-white relative overflow-hidden border-t border-amber-500/10"
    >
      {/* Background Ambient Radial Gold Glow & Topographic Grid SVG */}
      <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 bg-amber-500/5 rounded-full blur-3xl" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03] stroke-amber-400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="cinematic-route-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 60 0 L 0 0 0 60" fill="none" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cinematic-route-grid)" />
        </svg>
      </div>

      <Container size="xl" className="relative z-10 space-y-12 text-center">
        {/* Header Section Content */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-[#D4AF37] border border-amber-500/30 text-xs font-extrabold uppercase tracking-widest shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE BENAKA FLEET</span>
            </div>
          </div>

          {/* Main Cinematic Quote */}
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white"
          >
            “Every Journey Begins With Trust. <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-[#D4AF37] via-amber-300 to-[#F59E0B] bg-clip-text text-transparent">
              Every Destination Deserves Benaka.”
            </span>
          </h2>

          {/* Supporting Text */}
          <p
            ref={textRef}
            className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            A carefully maintained fleet, professional chauffeurs, and
            dependable travel experiences — ready for every journey from Gadag
            and beyond.
          </p>
        </div>

        {/* Video Visual Centerpiece Container */}
        <div
          ref={videoContainerRef}
          className="mx-auto max-w-362.5 relative rounded-2xl sm:rounded-3xl md:rounded-4xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.12)] bg-[#07090D] group transition-all duration-500"
        >
          {/* Aspect Ratio Wrapper */}
          <div className="relative aspect-video w-full max-h-195 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              poster="/assets/vehicles/placeholders/benekavehicles.png"
              className="h-full w-full object-cover object-center"
            >
              <source
                src="/assets/vehicles/placeholders/Fleet_vehicles_parking_on_lawn_202608140843.mp4"
                type="video/mp4"
              />
              Your browser does not support HTML5 video playback.
            </video>

            {/* Gradient Overlay Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-[#040507] via-transparent to-black/30" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />

            {/* Bottom-Left Minimal Overlay Brand Label */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 text-left pointer-events-none space-y-0.5">
              <div className="flex items-center gap-1.5 text-[#D4AF37] font-extrabold text-xs sm:text-sm tracking-widest uppercase">
                <Car className="w-4 h-4 text-amber-400" />
                <span>BENAKA TOURS & TRAVELS</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
                Gadag&apos;s Premier Chauffeur Rental Fleet
              </p>
            </div>

            {/* Bottom-Right Custom Floating Glass Video Controls */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2">
              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="w-11 h-11 rounded-xl bg-[#0B0D12]/80 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/50 text-white hover:text-[#D4AF37] flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 min-h-11 min-w-11"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 fill-current" />
                )}
              </button>

              {/* Mute / Unmute Toggle Button */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
                className="w-11 h-11 rounded-xl bg-[#0B0D12]/80 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/50 text-white hover:text-[#D4AF37] flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 min-h-11 min-w-11"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="View video in full screen"
                className="hidden sm:flex w-11 h-11 rounded-xl bg-[#0B0D12]/80 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/50 text-white hover:text-[#D4AF37] items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 min-h-11 min-w-11"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Small Tagline */}
        <p
          ref={taglineRef}
          className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-amber-400"
        >
          Driven by Trust. Defined by Comfort.
        </p>

        {/* Action Buttons Row */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 max-w-xl mx-auto"
        >
          <Link
            to="/fleet"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-linear-to-r from-[#D4AF37] to-[#F59E0B] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer min-h-11"
          >
            <Car className="w-4 h-4" />
            <span>Explore Our Fleet</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsBookingModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1A1F2C] border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#232A3B] active:scale-95 transition-all cursor-pointer min-h-11"
          >
            <span>Plan Your Trip</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={createWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer min-h-11"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </Container>

      {/* Booking Wizard Modal */}
      <BookingWizardModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};
