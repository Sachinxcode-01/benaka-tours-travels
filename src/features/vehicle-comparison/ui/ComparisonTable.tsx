import React from "react";
import { Link } from "react-router-dom";
import { Check, X, Users, Zap, MapPin, ArrowRight } from "lucide-react";
import type { Vehicle } from "@entities/vehicle";

interface ComparisonTableProps {
  vehicles: Vehicle[];
  onRemove: (id: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

interface CellProps {
  value: React.ReactNode;
  highlight?: boolean;
}

const Cell: React.FC<CellProps> = ({ value, highlight }) => (
  <td
    className={`px-3 py-3 text-xs text-center align-middle border-b border-white/5 ${
      highlight ? "text-[#D4AF37] font-semibold" : "text-slate-300"
    }`}
  >
    {value}
  </td>
);

// Derive a simple badge label from vehicle recommendedFor
function getBadge(vehicle: Vehicle): string | null {
  const tags = vehicle.recommendedFor.map((r) => r.toLowerCase());
  if (
    tags.some(
      (t) =>
        t.includes("wedding") ||
        t.includes("premium") ||
        t.includes("executive"),
    )
  )
    return "Premium Comfort";
  if (
    tags.some(
      (t) => t.includes("group") || t.includes("large") || t.includes("tour"),
    )
  )
    return "Large Group";
  if (tags.some((t) => t.includes("family"))) return "Family";
  return null;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  vehicles,
  onRemove,
  onSelectVehicle,
}) => {
  const maxSeats = Math.max(...vehicles.map((v) => v.seats));

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[400px] border-collapse">
        <thead>
          <tr className="bg-[#0F1219]">
            {/* Label column */}
            <th className="px-3 py-4 text-left w-28 shrink-0">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Feature
              </span>
            </th>

            {/* Vehicle columns */}
            {vehicles.map((v) => {
              const badge = getBadge(v);
              return (
                <th key={v.id} className="px-3 py-4 text-center min-w-[150px]">
                  <div className="flex flex-col items-center gap-2">
                    {/* Remove button */}
                    <div className="flex items-center justify-end w-full">
                      <button
                        onClick={() => onRemove(v.id)}
                        className="w-5 h-5 rounded-full bg-red-500/15 text-red-400 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                        aria-label={`Remove ${v.name} from comparison`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Vehicle image */}
                    <div className="w-20 h-14 rounded-xl overflow-hidden bg-[#07080B] border border-white/10">
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Vehicle name */}
                    <p className="text-xs font-bold text-white text-center leading-tight">
                      {v.name}
                    </p>

                    {/* Badge */}
                    {badge && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 font-semibold">
                        {badge}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="bg-[#0B0D12]">
          {/* Category */}
          <tr>
            <td className="px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-white/5">
              Category
            </td>
            {vehicles.map((v) => (
              <Cell
                key={v.id}
                value={
                  <span className="inline-block px-2 py-0.5 rounded bg-[#1A1F2C] text-xs font-bold tracking-wider">
                    {v.category.toUpperCase()}
                  </span>
                }
              />
            ))}
          </tr>

          {/* Seats */}
          <tr>
            <td className="px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-white/5">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                Seats
              </div>
            </td>
            {vehicles.map((v) => (
              <Cell
                key={v.id}
                value={`${v.seats} seats`}
                highlight={v.seats === maxSeats}
              />
            ))}
          </tr>

          {/* Fuel */}
          <tr>
            <td className="px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-white/5">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Fuel
              </div>
            </td>
            {vehicles.map((v) => (
              <Cell key={v.id} value={v.fuelTypes.join(" / ")} />
            ))}
          </tr>

          {/* Features */}
          <tr>
            <td className="px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-white/5">
              Features
            </td>
            {vehicles.map((v) => (
              <td
                key={v.id}
                className="px-3 py-3 border-b border-white/5 align-top"
              >
                <ul className="space-y-0.5">
                  {v.features.slice(0, 4).map((f) => (
                    <li
                      key={f}
                      className="text-[10px] text-slate-400 flex items-start gap-1"
                    >
                      <span className="text-emerald-400 mt-0.5">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* Availability */}
          <tr>
            <td className="px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-white/5">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Status
              </div>
            </td>
            {vehicles.map((v) => (
              <Cell
                key={v.id}
                value={
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      v.availability === "available"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {v.availability.toUpperCase()}
                  </span>
                }
              />
            ))}
          </tr>

          {/* Chauffeur */}
          <tr>
            <td className="px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-white/5">
              Chauffeur
            </td>
            {vehicles.map((v) => (
              <Cell
                key={v.id}
                value={<Check className="w-4 h-4 text-emerald-400 mx-auto" />}
              />
            ))}
          </tr>

          {/* Recommended For */}
          <tr>
            <td className="px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Best For
            </td>
            {vehicles.map((v) => (
              <td key={v.id} className="px-3 py-3 align-top">
                <div className="flex flex-wrap gap-1 justify-center">
                  {v.recommendedFor.slice(0, 3).map((r) => (
                    <span
                      key={r}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-[#1A1F2C] text-slate-400 border border-white/10"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </td>
            ))}
          </tr>
        </tbody>

        {/* Select Action Row */}
        <tfoot>
          <tr className="bg-[#0F1219]">
            <td className="px-3 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Action
            </td>
            {vehicles.map((v) => (
              <td key={v.id} className="px-3 py-4 text-center">
                <Link
                  to={`/trip-planner`}
                  onClick={() => onSelectVehicle(v)}
                  className="inline-flex items-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-xs hover:brightness-110 transition-all active:scale-95"
                >
                  Select <ArrowRight className="w-3 h-3" />
                </Link>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
