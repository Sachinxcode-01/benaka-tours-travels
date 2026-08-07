import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MapPin, Navigation, Calendar, Clock } from "lucide-react";

interface RouteTimelineProps {
  pickupLocation: string;
  destination: string;
  tripType: string;
  journeyType: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
}

export const RouteTimeline: React.FC<RouteTimelineProps> = ({
  pickupLocation,
  destination,
  tripType,
  journeyType,
  pickupDate,
  pickupTime,
  returnDate,
}) => {
  const routeLineRef = useRef<SVGLineElement | null>(null);

  useEffect(() => {
    if (routeLineRef.current) {
      gsap.fromTo(
        routeLineRef.current,
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" },
      );
    }
  }, [pickupLocation, destination]);

  return (
    <div className="p-4 rounded-2xl bg-[#0B0D12]/80 border border-[#D4AF37]/20 shadow-xl relative overflow-hidden space-y-4">
      {/* Header Tag */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-semibold tracking-wide uppercase">
          <Navigation className="w-4 h-4 text-emerald-400" />
          <span>Trip Itinerary Route</span>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
          {tripType.toUpperCase()} • {journeyType.toUpperCase()}
        </span>
      </div>

      {/* Visual Timeline Row */}
      <div className="relative flex items-center justify-between pt-2 pb-2">
        {/* Pickup Pin */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-full bg-[#121620] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-lg">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Pickup Point
            </div>
            <div className="text-sm font-bold text-white">
              {pickupLocation || "Gadag"}
            </div>
          </div>
        </div>

        {/* Animated Connecting SVG Line */}
        <div className="flex-1 px-4 relative flex items-center justify-center">
          <svg
            className="w-full h-4 overflow-visible"
            preserveAspectRatio="none"
          >
            <line
              ref={routeLineRef}
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              className="drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
            />
          </svg>
          <div className="absolute px-2 py-0.5 bg-[#121620] border border-[#D4AF37]/30 rounded-full text-[10px] text-[#D4AF37] font-bold shadow-md">
            Chauffeur Trip
          </div>
        </div>

        {/* Destination Pin */}
        <div className="flex items-center gap-3 z-10">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Destination
            </div>
            <div className="text-sm font-bold text-emerald-400">
              {destination || "Destination"}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#121620] border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-lg">
            <Navigation className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Date & Time Footer Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-white/10 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <div>
            <span className="text-slate-400 block text-[10px]">
              Pickup Date
            </span>
            <span className="font-semibold text-white">{pickupDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <Clock className="w-4 h-4 text-[#D4AF37]" />
          <div>
            <span className="text-slate-400 block text-[10px]">
              Pickup Time
            </span>
            <span className="font-semibold text-white">{pickupTime}</span>
          </div>
        </div>

        {returnDate && (
          <div className="flex items-center gap-2 text-slate-300 col-span-2 sm:col-span-1">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">
                Return Date
              </span>
              <span className="font-semibold text-emerald-400">
                {returnDate}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
