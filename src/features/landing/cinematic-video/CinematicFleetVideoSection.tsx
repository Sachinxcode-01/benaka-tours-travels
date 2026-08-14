import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Car,
} from "lucide-react";
import { gsap, useGSAP } from "@shared/lib/gsap";
import { Container } from "@shared/ui/container";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { BookingWizardModal } from "@features/booking/BookingWizardModal";

interface FleetVideoItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
}

const FLEET_VIDEOS: FleetVideoItem[] = [
  {
    id: "drone-cinematic",
    src: "/assets/vehicles/placeholders/Drone_filming_vehicle_fleet_comm…_202608140857.mp4",
    title: "BENAKA FROM ABOVE",
    subtitle: "Experience our fleet from a cinematic perspective.",
  },
  {
    id: "drone-aerial",
    src: "/assets/vehicles/placeholders/Drone_flying_over_vehicle_fleet_202608140858.mp4",
    title: "A JOURNEY FROM ABOVE",
    subtitle: "Premium mobility, captured from the sky.",
  },
  {
    id: "fleet-showcase",
    src: "/assets/vehicles/placeholders/Fleet_vehicles_parking_on_lawn_202608140843.mp4",
    title: "THE BENAKA FLEET",
    subtitle: "Driven by trust. Defined by comfort.",
  },
];

export const CinematicFleetVideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Section reveal refs for GSAP
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Carousel & Video States
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1 = forward, -1 = backward
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  const activeVideo = FLEET_VIDEOS[activeIndex];

  // Safely play current active video
  const playCurrentVideo = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [isMuted]);

  // Safely pause current active video
  const pauseCurrentVideo = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  }, []);

  // Slide navigation handlers
  const goToNextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % FLEET_VIDEOS.length);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + FLEET_VIDEOS.length) % FLEET_VIDEOS.length,
    );
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex],
  );

  // Toggle Video Play / Pause manually
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      playCurrentVideo();
    } else {
      pauseCurrentVideo();
    }
  }, [playCurrentVideo, pauseCurrentVideo]);

  // Toggle Mute / Sound (preserves preference across slides)
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const nextMutedState = !videoRef.current.muted;
    videoRef.current.muted = nextMutedState;
    setIsMuted(nextMutedState);
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

  // 1. IntersectionObserver (threshold 0.5): Auto-play on scroll in, pause on scroll out
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
          } else {
            setIsIntersecting(false);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 2. Play/Pause based on activeIndex & isIntersecting
  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;
    if (isIntersecting) {
      playCurrentVideo();
    } else {
      pauseCurrentVideo();
    }
  }, [activeIndex, isIntersecting, playCurrentVideo, pauseCurrentVideo]);

  // 3. Keyboard navigation listener (Left / Right arrow keys when section is in view)
  useEffect(() => {
    if (!isIntersecting) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevSlide();
      } else if (e.key === "ArrowRight") {
        goToNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isIntersecting, goToPrevSlide, goToNextSlide]);

  // GSAP ScrollTrigger Sequence for overall section reveal only
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
            carouselContainerRef.current,
            ctaRef.current,
          ],
          { opacity: 1, y: 0 },
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
          carouselContainerRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        );

      // Desktop restrained parallax on video container
      if (window.innerWidth >= 1024) {
        gsap.to(videoContainerRef.current, {
          y: -15,
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

  // Motion variants for slide transition
  const slideVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.96,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.3,
        ease: [0.7, 0, 0.84, 0] as const,
      },
    }),
  };

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

      <Container size="xl" className="relative z-10 space-y-10 text-center">
        {/* Header Section Content */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-[#D4AF37] border border-amber-500/30 text-xs font-extrabold uppercase tracking-widest shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE BENAKA FLEET</span>
            </div>
          </div>

          {/* Main Title */}
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white"
          >
            Three Perspectives. <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-[#D4AF37] via-amber-300 to-[#F59E0B] bg-clip-text text-transparent">
              One Premium Journey.
            </span>
          </h2>

          {/* Supporting Paragraph */}
          <p
            ref={textRef}
            className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the Benaka fleet through cinematic ground and aerial
            views — professional vehicles, trusted chauffeurs, and journeys
            crafted for comfort.
          </p>
        </div>

        {/* Cinematic Auto-Play Video Carousel Container */}
        <div
          ref={carouselContainerRef}
          className="mx-auto max-w-362.5 relative px-2 sm:px-4 space-y-6"
        >
          {/* Carousel Layout (Desktop Side Nav + Active Video Box) */}
          <div className="relative flex items-center justify-center gap-4">
            {/* Desktop Previous Button */}
            <button
              type="button"
              onClick={goToPrevSlide}
              aria-label={`Previous video: ${
                FLEET_VIDEOS[
                  (activeIndex - 1 + FLEET_VIDEOS.length) % FLEET_VIDEOS.length
                ].title
              }`}
              className="hidden lg:flex w-12 h-12 rounded-full bg-[#0B0D12]/80 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/60 text-white hover:text-[#D4AF37] items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95 shrink-0 z-30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Active Video Main Visual Card */}
            <div
              ref={videoContainerRef}
              className="w-full relative rounded-2xl sm:rounded-3xl md:rounded-4xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.12)] bg-[#07090D] group transition-all duration-500"
            >
              {/* Aspect Ratio Container */}
              <div className="relative aspect-video w-full max-h-195 overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={activeVideo.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -50) {
                        goToNextSlide();
                      } else if (info.offset.x > 50) {
                        goToPrevSlide();
                      }
                    }}
                    className="absolute inset-0 w-full h-full touch-pan-y"
                  >
                    <video
                      ref={videoRef}
                      muted={isMuted}
                      playsInline
                      preload="metadata"
                      poster="/assets/vehicles/placeholders/benekavehicles.png"
                      onEnded={goToNextSlide}
                      className="h-full w-full object-cover object-center"
                    >
                      <source src={activeVideo.src} type="video/mp4" />
                      Your browser does not support HTML5 video playback.
                    </video>

                    {/* Gradient Overlay Vignette */}
                    <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-[#040507] via-transparent to-black/30" />
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />

                    {/* Bottom-Left Slide Counter & Dynamic Title Overlay */}
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 text-left pointer-events-none space-y-1">
                      <div className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
                        0{activeIndex + 1} / 0{FLEET_VIDEOS.length}
                      </div>
                      <div className="flex items-center gap-1.5 text-white font-extrabold text-sm sm:text-lg md:text-xl tracking-wide">
                        <Car className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{activeVideo.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 font-medium">
                        {activeVideo.subtitle}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom-Right Custom Floating Glass Video Controls */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2">
                  {/* Play / Pause Toggle Button */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={
                      isPlaying
                        ? `Pause video ${activeIndex + 1}: ${activeVideo.title}`
                        : `Play video ${activeIndex + 1}: ${activeVideo.title}`
                    }
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
                    aria-label={
                      isMuted
                        ? `Unmute video sound for ${activeVideo.title}`
                        : `Mute video sound for ${activeVideo.title}`
                    }
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

            {/* Desktop Next Button */}
            <button
              type="button"
              onClick={goToNextSlide}
              aria-label={`Next video: ${
                FLEET_VIDEOS[(activeIndex + 1) % FLEET_VIDEOS.length].title
              }`}
              className="hidden lg:flex w-12 h-12 rounded-full bg-[#0B0D12]/80 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/60 text-white hover:text-[#D4AF37] items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95 shrink-0 z-30"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel Pagination Controls & Swipe Indicator */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 px-2">
            {/* Mobile / Tablet Prev & Next Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={goToPrevSlide}
                aria-label="Previous slide"
                className="w-10 h-10 rounded-xl bg-[#121620] border border-white/10 text-white flex items-center justify-center active:scale-95 transition-all min-h-10 min-w-10 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={goToNextSlide}
                aria-label="Next slide"
                className="w-10 h-10 rounded-xl bg-[#121620] border border-white/10 text-white flex items-center justify-center active:scale-95 transition-all min-h-10 min-w-10 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2.5 mx-auto lg:mx-0">
              {FLEET_VIDEOS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${item.title}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? "w-8 bg-linear-to-r from-[#D4AF37] to-[#F59E0B]"
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Subtle Swipe Indicator for touch screens */}
            <div className="text-[11px] font-medium text-slate-400 tracking-wider uppercase sm:block">
              Swipe → or use arrow keys
            </div>
          </div>
        </div>

        {/* Final CTA Tagline */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-amber-400 pt-4">
          See The Fleet. Plan The Journey. Experience Benaka.
        </p>

        {/* Action Buttons Row */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto"
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

      {/* Multi-Step Booking Wizard Modal */}
      <BookingWizardModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};
