import React from "react";

export type MapStyleKey = "default" | "openstreetmap" | "openstreetmap3d";

interface MapStyleSelectorProps {
  value: MapStyleKey;
  onChange: (style: MapStyleKey) => void;
  className?: string;
}

export const MapStyleSelector: React.FC<MapStyleSelectorProps> = ({
  value,
  onChange,
  className = "",
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as MapStyleKey)}
      className={`rounded-xl border border-amber-400/30 bg-black/80 px-3.5 py-2 text-xs sm:text-sm text-white font-semibold backdrop-blur-md cursor-pointer hover:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${className}`}
      aria-label="Select Map Style"
    >
      <option value="default">Default Map</option>
      <option value="openstreetmap">Street Map</option>
      <option value="openstreetmap3d">3D Map View</option>
    </select>
  );
};
