import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Compass,
  Briefcase,
  Heart,
  Users,
  Plane,
  Home,
  Calendar,
  Map,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { SERVICES_DATA, type ServiceItem } from "../../../data/services";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { BookingWizardModal } from "@features/booking/BookingWizardModal";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  MapPin,
  Compass,
  Briefcase,
  Heart,
  Users,
  Plane,
  Home,
  Calendar,
  Map,
};

interface ServiceCardProps {
  service: ServiceItem;
  onOpenBooking: (service: ServiceItem) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onOpenBooking }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = ICON_MAP[service.iconName] || Compass;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl bg-[#0B0D12]/90 border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-amber-500/10"
    >
      {/* Soft Radial Spotlight Background */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,175,55,0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Top Header */}
      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform duration-300 shadow-md">
            <IconComponent className="w-6 h-6" />
          </div>
          {service.badge && (
            <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-[#D4AF37] border border-amber-500/30">
              {service.badge}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
            {service.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            {service.shortDescription}
          </p>
        </div>

        {/* Recommended Vehicle Badge */}
        <div className="p-2.5 rounded-xl bg-[#121620] border border-white/10 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">
              Recommended Fleet:
            </span>
            <span className="text-xs font-bold text-white">
              {service.recommendedVehicle}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-6 mt-4 border-t border-white/10 grid grid-cols-2 gap-2 relative z-10">
        <button
          onClick={() => onOpenBooking(service)}
          className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 active:scale-95 transition-all"
        >
          <span>Request Quote</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={createWhatsAppInquiryUrl({
            additionalNotes: `Inquiry for ${service.title} service from Gadag.`,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-600/30 active:scale-95 transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export const ServicesPreviewSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".service-card-item");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      },
    );
  }, []);

  const handleOpenBooking = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <section ref={containerRef} className="py-20 bg-[#07080B] text-white relative">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-[#D4AF37] border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <span>Tailored Rental Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            100% Chauffeur-Driven Travel Services
          </h2>
          <p className="text-sm text-slate-300">
            From local doorstep pick-ups in Gadag to multi-day inter-state tours across Karnataka, Goa & Maharashtra.
          </p>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <div key={service.id} className="service-card-item">
              <ServiceCard
                service={service}
                onOpenBooking={handleOpenBooking}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Booking Wizard Modal */}
      <BookingWizardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={
          selectedService
            ? {
                tripType:
                  selectedService.id === "local-pickup-drop"
                    ? "local"
                    : selectedService.id === "airport-transfers"
                      ? "airport"
                      : "outstation",
                additionalNotes: `Service requested: ${selectedService.title}`,
              }
            : null
        }
      />
    </section>
  );
};
