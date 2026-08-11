import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  UserCheck,
  Car,
  Home,
  Sparkles,
  MapPin,
  MessageCircle,
  Clock,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface WhyPillar {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  image: string;
  highlights: string[];
}

export const WHY_BENAKA_PILLARS: WhyPillar[] = [
  {
    id: "chauffeurs",
    step: 1,
    title: "100% Certified Professional Chauffeurs",
    subtitle: "Safety & Courtesy First",
    description:
      "Every BENAKA vehicle comes with an experienced driver in uniform. Certified for long-distance highway routes, temple tours, and city transit.",
    icon: UserCheck,
    image: "/assets/vehicles/placeholders/swift dszire.jpg",
    highlights: [
      "Highway Route Expertise",
      "Formal Attire & Courtesy",
      "100% Zero Self-Drive Hassle",
    ],
  },
  {
    id: "fleet",
    step: 2,
    title: "Diverse 12-Vehicle Rental Fleet",
    subtitle: "From Sedans to 25-Seater Coaches",
    description:
      "Choose from Dzire, Aura, Ertiga, Innova Crysta, Scorpio, Bolero, Brezza, Grand Vitara, Thar, Toofan, Tempo Traveller, and 25-Seater Bus.",
    icon: Car,
    image: "/assets/vehicles/placeholders/benekavehicles.png",
    highlights: [
      "Sedan, MUV, SUV & Minibus",
      "Live Availability Status",
      "Well-Maintained Inventory",
    ],
  },
  {
    id: "doorstep",
    step: 3,
    title: "Prompt Doorstep Pick-up & Drop",
    subtitle: "Direct From Your Residence in Gadag",
    description:
      "Our chauffeur arrives directly at your doorstep in Panchaxari Nagar, Gadag, or surrounding locations. No travelling to taxi stands required.",
    icon: Home,
    image: "/assets/vehicles/placeholders/Toyota-Innova-Crysta.jpg",
    highlights: [
      "Zero Taxi Stand Travel",
      "Luggage Assistance Included",
      "Gadag & Hubballi Coverage",
    ],
  },
  {
    id: "cleanliness",
    step: 4,
    title: "Sanitized & Pristine Interiors",
    subtitle: "Cleanliness Guaranteed",
    description:
      "Thoroughly cleaned, sanitized, and air-conditioned interiors before every single journey for maximum passenger comfort.",
    icon: Sparkles,
    image: "/assets/vehicles/placeholders/brezza.jpg",
    highlights: [
      "Deep Interior Sanitization",
      "Fresh AC Air Quality",
      "Odour-Free Cabins",
    ],
  },
  {
    id: "routes",
    step: 5,
    title: "Local & Highway Route Expertise",
    subtitle: "Inter-State & Temple Circuit Knowledge",
    description:
      "Our drivers know exact highway routes, toll shortcuts, and scenic rest stops across Karnataka, Goa, Maharashtra, and Tamil Nadu.",
    icon: MapPin,
    image: "/assets/vehicles/placeholders/scropio.jpg",
    highlights: [
      "Toll & Fastag Integration",
      "Scenic Temple Stopovers",
      "Inter-State Permit Ready",
    ],
  },
  {
    id: "whatsapp",
    step: 6,
    title: "Quick WhatsApp Inquiry & Dispatch",
    subtitle: "Instant Fare Quotation",
    description:
      "Request a chauffeur quotation on WhatsApp in 30 seconds. Get immediate availability confirmation and exact estimated fare quotes.",
    icon: MessageCircle,
    image: "/assets/vehicles/placeholders/Grand vitara.jpg",
    highlights: [
      "30-Second Inquiry Wizard",
      "Direct Manager Response",
      "No Hidden Charges",
    ],
  },
  {
    id: "availability",
    step: 7,
    title: "24 Hours / 7 Days Service",
    subtitle: "Round-The-Clock Reliability",
    description:
      "Available 24/7 for early morning flight transfers at Hubballi Airport, late-night train arrivals, or emergency outstation departures.",
    icon: Clock,
    image: "/assets/vehicles/placeholders/Tempo-Traveller.jpg",
    highlights: [
      "Flight Tracking Included",
      "Midnight Pickup Ready",
      "365 Days Operation",
    ],
  },
  {
    id: "family-corporate",
    step: 8,
    title: "Family & Corporate Luxury Focus",
    subtitle: "Tailored Executive Contracts",
    description:
      "Spacious MUVs for family pilgrimages and executive sedans for corporate delegates. GST compliant billing for corporate contracts.",
    icon: Briefcase,
    image: "/assets/vehicles/placeholders/25 seater bus.jpg",
    highlights: [
      "Family Pilgrimage Ready",
      "GST Tax Invoice Billing",
      "Corporate Account Setup",
    ],
  },
];

export const WhyUsSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    // Desktop ScrollTrigger pinning logic
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    if (!mediaQuery.matches) return;

    const sections = sectionRef.current.querySelectorAll(".story-step-item");
    sections.forEach((sec, idx) => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top 60%",
        end: "bottom 60%",
        onEnter: () => setActiveStep(idx),
        onEnterBack: () => setActiveStep(idx),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const activePillar = WHY_BENAKA_PILLARS[activeStep] || WHY_BENAKA_PILLARS[0];
  const IconComp = activePillar.icon;

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="py-24 bg-[#0B0D12] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-[#D4AF37] border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Why Choose BENAKA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Gadag's Most Trusted Chauffeur Rental Partner
          </h2>
          <p className="text-sm text-slate-300">
            Discover why hundreds of families, wedding planners, and corporate
            executives rely on BENAKA since 2019.
          </p>
        </div>

        {/* Desktop Layout: Pinned Sticky Visual + Story Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          {/* Left Column: Pinned Sticky Preview Panel (Desktop Only) */}
          <div
            className="hidden lg:block lg:col-span-5 sticky top-28 space-y-6"
            ref={pinRef}
          >
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#121620] border border-white/10 text-xs">
              <span className="text-[#D4AF37] font-bold">
                Pillar {activeStep + 1} of {WHY_BENAKA_PILLARS.length}
              </span>
              <div className="flex items-center gap-1">
                {WHY_BENAKA_PILLARS.map((p, idx) => (
                  <span
                    key={p.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeStep === idx
                        ? "w-6 bg-[#D4AF37]"
                        : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Dynamic Card Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl bg-[#121620]/90 border border-[#D4AF37]/30 shadow-2xl space-y-5"
              >
                <div className="relative h-56 rounded-xl overflow-hidden bg-black border border-white/10">
                  <img
                    src={activePillar.image}
                    alt={activePillar.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border border-amber-500/30 flex items-center gap-1.5">
                    <IconComp className="w-4 h-4 text-[#D4AF37]" />
                    <span>{activePillar.subtitle}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    {activePillar.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activePillar.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  {activePillar.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs text-emerald-400 font-semibold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Scroll Story Items (Desktop & Mobile) */}
          <div className="col-span-1 lg:col-span-7 space-y-8">
            {WHY_BENAKA_PILLARS.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={pillar.id}
                  className={`story-step-item p-6 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-[#121620] border-[#D4AF37]/50 shadow-xl shadow-amber-500/5"
                      : "bg-[#0B0D12]/80 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shrink-0 transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black shadow-lg shadow-amber-500/20"
                          : "bg-[#121620] text-slate-400 border border-white/10"
                      }`}
                    >
                      <PillarIcon className="w-6 h-6" />
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                          0{pillar.step} • {pillar.subtitle}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Mobile Image Display */}
                      <div className="block lg:hidden pt-3">
                        <div className="h-44 rounded-xl overflow-hidden bg-black border border-white/10 relative">
                          <img
                            src={pillar.image}
                            alt={pillar.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
