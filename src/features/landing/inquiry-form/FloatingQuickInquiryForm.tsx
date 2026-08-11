import React, { useState } from "react";
import { Send, Calendar, MapPin, Users, User } from "lucide-react";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { FLEET_VEHICLES } from "@entities/vehicle";
import { GlassCard } from "@shared/ui/glass-card";
import { Input } from "@shared/ui/input";
import { Select } from "@shared/ui/select";
import { Button } from "@shared/ui/button";

export const FloatingQuickInquiryForm: React.FC = () => {
  const [customerName, setCustomerName] = useState("");
  const [pickupLocation, setPickupLocation] = useState("Gadag");
  const [destination, setDestination] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [passengers, setPassengers] = useState(4);
  const [category, setCategory] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedVehicle = FLEET_VEHICLES.find(
      (v) => category !== "all" && v.category === category,
    );

    const whatsappUrl = createWhatsAppInquiryUrl({
      customerName: customerName || undefined,
      pickupLocation,
      destination: destination || "Outstation / Local Journey",
      pickupDate,
      passengers,
      vehicleName: selectedVehicle ? selectedVehicle.name : undefined,
    });

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const categoryOptions = [
    { value: "all", label: "Any Vehicle Category" },
    { value: "sedan", label: "Sedan (Dzire, Aura - 5 Seats)" },
    { value: "muv", label: "MUV (Ertiga, Innova, Toofan - 7 to 11 Seats)" },
    {
      value: "suv",
      label: "SUV (Scorpio, Bolero, Thar, Brezza - 5 to 7 Seats)",
    },
    { value: "minibus", label: "Minibus (Tempo Traveller - 13 Seats)" },
    { value: "bus", label: "Bus (25-Seater Coach)" },
  ];

  return (
    <section
      id="quick-inquiry"
      className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-10 mb-16"
    >
      <GlassCard className="p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-neutral-950/90 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-amber-500/15 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>⚡ Quick Rental Quote & Inquiry</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select your trip details to instantly generate a professional
              WhatsApp booking quote. 100% Chauffeur-Driven.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            No Upfront Payment Required
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <Input
            label="Customer / Client Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="e.g. Sachin Kumar"
            leftIcon={<User className="h-4 w-4 text-amber-400" />}
          />

          <Input
            label="Pickup Location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="e.g. Panchaxari Nagar, Gadag"
            leftIcon={<MapPin className="h-4 w-4 text-amber-400" />}
            required
          />

          <Input
            label="Destination / Scope"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Hubballi, Goa, Bengaluru"
            leftIcon={<MapPin className="h-4 w-4 text-amber-400" />}
            required
          />

          <Input
            label="Pickup Date"
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            leftIcon={<Calendar className="h-4 w-4 text-amber-400" />}
          />

          <Input
            label="Passengers Count"
            type="number"
            min={1}
            max={50}
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            leftIcon={<Users className="h-4 w-4 text-amber-400" />}
          />

          <Select
            label="Preferred Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categoryOptions}
          />

          <div className="col-span-1 sm:col-span-2 lg:col-span-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              leftIcon={<Send className="h-4 w-4" />}
            >
              Get Instant WhatsApp Quote
            </Button>
          </div>
        </form>
      </GlassCard>
    </section>
  );
};
