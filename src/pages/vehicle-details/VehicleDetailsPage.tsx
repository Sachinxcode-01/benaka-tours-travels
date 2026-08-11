import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Users,
  Fuel,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowLeft,
  Calendar,
  Award,
} from "lucide-react";
import { FLEET_VEHICLES, VehicleCard } from "@entities/vehicle";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { Container } from "@shared/ui/container";
import { GlassCard } from "@shared/ui/glass-card";
import { Badge } from "@shared/ui/badge";
import { StatusBadge } from "@shared/ui/status-badge";
import { Button } from "@shared/ui/button";
import { VehicleBookingFormModal } from "@features/booking-inquiry";
import NotFoundPage from "@pages/not-found/NotFoundPage";

export const VehicleDetailsPage: React.FC = () => {
  const { vehicleSlug } = useParams<{ vehicleSlug: string }>();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const vehicle = FLEET_VEHICLES.find((v) => v.slug === vehicleSlug);

  if (!vehicle) {
    return <NotFoundPage />;
  }

  const fallbackSvg = "/assets/vehicles/placeholders/benekavehicles.png";

  const similarVehicles = FLEET_VEHICLES.filter(
    (v) =>
      v.id !== vehicle.id &&
      (v.category === vehicle.category || v.seats === vehicle.seats),
  ).slice(0, 3);

  return (
    <div className="w-full py-10 bg-[#07080B] min-h-screen space-y-12">
      <Container size="xl" className="space-y-10">
        {/* Back Link Breadcrumb */}
        <div>
          <Link
            to="/fleet"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Fleet Vehicles</span>
          </Link>
        </div>

        {/* Hero Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vehicle Image Gallery Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <GlassCard className="p-2 rounded-3xl border border-amber-500/25 bg-neutral-950 overflow-hidden relative group">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-neutral-900">
                <img
                  src={vehicle.image}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackSvg;
                  }}
                  alt={`${vehicle.name} Chauffeur Rental`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="gold" className="uppercase text-xs px-3 py-1">
                    {vehicle.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <StatusBadge status={vehicle.availability} />
                </div>
              </div>
            </GlassCard>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-3 gap-3">
              <GlassCard className="p-4 rounded-xl text-center space-y-1">
                <Users className="h-5 w-5 text-amber-400 mx-auto" />
                <p className="text-sm font-bold text-white">
                  {vehicle.seats} Seats
                </p>
                <p className="text-[10px] text-slate-400">Capacity</p>
              </GlassCard>

              <GlassCard className="p-4 rounded-xl text-center space-y-1">
                <Fuel className="h-5 w-5 text-amber-400 mx-auto" />
                <p className="text-sm font-bold text-white">
                  {vehicle.fuelTypes.join(" / ")}
                </p>
                <p className="text-[10px] text-slate-400">Fuel Type</p>
              </GlassCard>

              <GlassCard className="p-4 rounded-xl text-center space-y-1">
                <ShieldCheck className="h-5 w-5 text-amber-400 mx-auto" />
                <p className="text-sm font-bold text-white">100% Chauffeur</p>
                <p className="text-[10px] text-slate-400">Included</p>
              </GlassCard>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                {vehicle.name}
              </h1>
              <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Gadag Chauffeur Rental Fleet • Benaka Tours & Travels
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Experience maximum comfort, safety, and punctuality. Driven by
                certified professional chauffeurs for outstation trips, local
                commutes, weddings, and business events across Karnataka.
              </p>
            </div>

            {/* Chauffeur Guarantee Banner */}
            <div className="bg-amber-500/10 border border-amber-500/25 p-4 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                <Award className="h-4 w-4 text-amber-400" />
                <span>100% Chauffeur-Driven Commitment</span>
              </div>
              <p className="text-xs text-slate-300">
                No self-drive hassles. Full operational responsibility, highway
                expertise, and zero customer vehicle damage liability.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Vehicle Features
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {vehicle.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended For */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Best Recommended For
              </h3>
              <div className="flex flex-wrap gap-2">
                {vehicle.recommendedFor.map((rec) => (
                  <span
                    key={rec}
                    className="text-xs bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg text-slate-200 font-medium"
                  >
                    ★ {rec}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-amber-500/15">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setIsBookingModalOpen(true)}
                leftIcon={<Calendar className="h-4 w-4" />}
              >
                Inquire Fare & Reserve Vehicle
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={createWhatsAppInquiryUrl({ vehicleName: vehicle.name })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    leftIcon={
                      <MessageCircle className="h-4 w-4 text-emerald-400" />
                    }
                  >
                    WhatsApp Quote
                  </Button>
                </a>

                <a href={createTelUrl()}>
                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    leftIcon={<Phone className="h-4 w-4" />}
                  >
                    Call Support
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Vehicles Section */}
        {similarVehicles.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-amber-500/15">
            <h2 className="text-2xl font-bold text-white">
              Similar Fleet Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarVehicles.map((simVeh) => (
                <VehicleCard key={simVeh.id} vehicle={simVeh} />
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* Booking Form Modal */}
      <VehicleBookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        vehicle={vehicle}
      />
    </div>
  );
};

export default VehicleDetailsPage;
