import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "@shared/ui/container";
import { SectionHeading } from "@shared/ui/section-heading";
import { BookingWizardModal } from "@features/booking/BookingWizardModal";
import { INITIAL_FLEET } from "../../data/fleet";
import { ShieldCheck, MessageCircle, Star } from "lucide-react";
import type { Vehicle } from "../../types/fleet";

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const vehicleIdParam = searchParams.get("vehicle");

  const preselectedVehicle = useMemo(() => {
    if (!vehicleIdParam) return null;
    return (
      INITIAL_FLEET.find((v: Vehicle) => v.id === vehicleIdParam) ||
      INITIAL_FLEET.find(
        (v: Vehicle) => v.id.toLowerCase() === vehicleIdParam.toLowerCase(),
      ) ||
      null
    );
  }, [vehicleIdParam]);

  return (
    <div className="w-full py-12 bg-[#07080B] min-h-screen text-white">
      <Container size="xl" className="space-y-8">
        <SectionHeading
          badgeText="100% Chauffeur Rentals"
          title="Request a Chauffeur Vehicle Quotation"
          subtitle="Select your route, dates, and preferred luxury vehicle. Get an instant quote summary sent directly to our team via WhatsApp."
          centered
        />

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-5 rounded-2xl bg-[#0B0D12] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                Professional Chauffeurs
              </h4>
              <p className="text-xs text-slate-400">
                Verified, experienced drivers included with every trip.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B0D12] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                Instant WhatsApp Quote
              </h4>
              <p className="text-xs text-slate-400">
                Direct instant response & custom fare confirmation.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B0D12] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Gadag's #1 Fleet</h4>
              <p className="text-xs text-slate-400">
                Over 500+ happy clients & 4.9★ rating.
              </p>
            </div>
          </div>
        </div>

        {/* Embedded Booking Modal Component */}
        <div className="pt-4">
          <BookingWizardModal
            isOpen={true}
            onClose={() => {}}
            initialVehicle={preselectedVehicle}
          />
        </div>
      </Container>
    </div>
  );
};

export default BookingPage;
