import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Fuel,
  ShieldCheck,
  MessageCircle,
  Phone,
  ArrowRight,
} from "lucide-react";
import type { Vehicle } from "../model/vehicle.types";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { GlassCard } from "@shared/ui/glass-card";
import { Badge } from "@shared/ui/badge";
import { StatusBadge } from "@shared/ui/status-badge";
import { Button } from "@shared/ui/button";
import { Skeleton } from "@shared/ui/skeleton";

interface VehicleCardProps {
  vehicle: Vehicle;
  onQuickBook?: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fallbackSvg = "/assets/vehicles/placeholders/benekavehicles.png";

  return (
    <GlassCard
      hoverable
      className="flex flex-col justify-between p-5 space-y-4 group"
    >
      <div className="space-y-4">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <Badge variant="gold" className="uppercase text-[10px]">
            {vehicle.category}
          </Badge>
          <StatusBadge status={vehicle.availability} />
        </div>

        {/* Vehicle Image Container */}
        <div className="relative h-48 rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden">
          {!imageLoaded && !imageError && (
            <Skeleton className="w-full h-full rounded-xl" />
          )}

          <img
            src={imageError ? fallbackSvg : vehicle.image}
            alt={`${vehicle.name} Chauffeur Rental Gadag`}
            loading="lazy"
            width={600}
            height={400}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-md border border-amber-500/30">
            <ShieldCheck className="h-3 w-3 text-amber-400" />
            <span>100% Chauffeur Included</span>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
            {vehicle.name}
          </h3>

          <div className="flex items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-medium">
              <Users className="h-4 w-4 text-amber-400" />
              <span>{vehicle.seats} Seats</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Fuel className="h-4 w-4 text-amber-400" />
              <span>{vehicle.fuelTypes.join(" / ")}</span>
            </div>
          </div>

          {/* Features Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {vehicle.features.slice(0, 3).map((feat) => (
              <span
                key={feat}
                className="text-[10px] bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-slate-300"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-amber-500/15 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Link to={`/fleet/${vehicle.slug}`}>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Details
            </Button>
          </Link>

          <a
            href={createWhatsAppInquiryUrl({ vehicleName: vehicle.name })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              size="sm"
              fullWidth
              leftIcon={<MessageCircle className="h-3.5 w-3.5" />}
            >
              WhatsApp
            </Button>
          </a>
        </div>

        <a href={createTelUrl()} className="block">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            leftIcon={<Phone className="h-3.5 w-3.5 text-amber-400" />}
          >
            Call Driver Support
          </Button>
        </a>
      </div>
    </GlassCard>
  );
};
