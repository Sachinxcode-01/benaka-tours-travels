import React, { useState } from "react";
import { TrendingUp, BarChart3, PieChart, MapPin, DollarSign, Car, Users, Calendar, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import type { AnalyticsMetric, Vehicle, InquiryRecord } from "../types";

interface AnalyticsDashboardProps {
  analytics: AnalyticsMetric;
  fleet: Vehicle[];
  inquiries: InquiryRecord[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  analytics,
  fleet,
  inquiries,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"6m" | "3m" | "1m">("6m");

  const availableCount = fleet.filter((v) => v.status === "Available").length;
  const bookedCount = fleet.filter((v) => v.status === "Booked").length;
  const maintenanceCount = fleet.filter((v) => v.status === "Maintenance").length;
  const totalFleet = fleet.length || 1;

  const availablePercent = Math.round((availableCount / totalFleet) * 100);
  const bookedPercent = Math.round((bookedCount / totalFleet) * 100);
  const maintenancePercent = Math.round((maintenanceCount / totalFleet) * 100);

  // SVG Chart Calculations
  const maxRevenue = Math.max(...analytics.revenueByMonth.map((d) => d.revenue));
  const points = analytics.revenueByMonth
    .map((d, index) => {
      const x = (index / (analytics.revenueByMonth.length - 1)) * 500;
      const y = 160 - (d.revenue / maxRevenue) * 120;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPath = `M 0,160 ${points} L 500,160 Z`;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-[#121620] p-6 rounded-3xl border border-[#D4AF37]/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#D4AF37]/10 blur-[80px] rounded-full pointer-events-none" />

        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
              Live Business Intelligence
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Realtime Active
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1 tracking-tight">
            Performance & Analytics Dashboard
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Fleet utilization, revenue metrics, monthly trip trends, and popular travel routes.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0B0D12] p-1.5 rounded-xl border border-white/10 shrink-0">
          <button
            onClick={() => setSelectedTimeframe("6m")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedTimeframe === "6m"
                ? "bg-[#D4AF37] text-black shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Last 6 Months
          </button>
          <button
            onClick={() => setSelectedTimeframe("3m")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedTimeframe === "3m"
                ? "bg-[#D4AF37] text-black shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Quarterly
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121620] p-5 rounded-2xl border border-white/10 space-y-3 relative overflow-hidden shadow-lg group hover:border-[#D4AF37]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total YTD Revenue</span>
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <strong className="text-2xl font-extrabold text-white">
              ₹{analytics.totalRevenue.toLocaleString("en-IN")}
            </strong>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +18.4% vs last period
            </span>
          </div>
        </div>

        <div className="bg-[#121620] p-5 rounded-2xl border border-white/10 space-y-3 relative overflow-hidden shadow-lg group hover:border-[#D4AF37]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Completed Tours</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <Car className="w-5 h-5" />
            </div>
          </div>
          <div>
            <strong className="text-2xl font-extrabold text-white">
              {analytics.totalTripsCompleted} Trips
            </strong>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +12 new bookings this month
            </span>
          </div>
        </div>

        <div className="bg-[#121620] p-5 rounded-2xl border border-white/10 space-y-3 relative overflow-hidden shadow-lg group hover:border-[#D4AF37]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Avg Outstation Distance</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div>
            <strong className="text-2xl font-extrabold text-white">
              {analytics.averageTripDistanceKm} KM
            </strong>
            <span className="text-[11px] font-medium text-slate-400 mt-1 block">
              Average per customer trip
            </span>
          </div>
        </div>

        <div className="bg-[#121620] p-5 rounded-2xl border border-white/10 space-y-3 relative overflow-hidden shadow-lg group hover:border-[#D4AF37]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Fleet Utilization Rate</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <strong className="text-2xl font-extrabold text-emerald-400">
              {analytics.fleetUtilizationRate}%
            </strong>
            <span className="text-[11px] font-medium text-slate-400 mt-1 block">
              High operational efficiency
            </span>
          </div>
        </div>
      </div>

      {/* Main Graph & Distribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG Revenue Trend Graph */}
        <div className="lg:col-span-2 bg-[#121620] p-6 rounded-3xl border border-white/10 space-y-5 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#D4AF37]" />
                Monthly Revenue & Booking Growth
              </h3>
              <p className="text-xs text-slate-400">
                Visualizing cumulative gross booking revenue (₹) across months
              </p>
            </div>
            <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
              Trend: +24% Peak Season
            </span>
          </div>

          {/* SVG Area Chart */}
          <div className="relative pt-4">
            <svg viewBox="0 0 500 180" className="w-full h-48 overflow-visible">
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="160" x2="500" y2="160" stroke="rgba(255,255,255,0.1)" />

              {/* Filled Gradient Area */}
              <path d={areaPath} fill="url(#goldGradient)" />

              {/* Trend Line */}
              <polyline
                fill="none"
                stroke="#D4AF37"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />

              {/* Data Points */}
              {analytics.revenueByMonth.map((d, idx) => {
                const x = (idx / (analytics.revenueByMonth.length - 1)) * 500;
                const y = 160 - (d.revenue / maxRevenue) * 120;
                return (
                  <g key={idx} className="group cursor-pointer">
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill="#0B0D12"
                      stroke="#D4AF37"
                      strokeWidth="3"
                      className="transition-transform group-hover:scale-150"
                    />
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="10"
                      fontWeight="bold"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ₹{(d.revenue / 1000).toFixed(0)}k
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* X-Axis Labels */}
            <div className="flex justify-between text-[11px] font-bold text-slate-400 pt-3 border-t border-white/5">
              {analytics.revenueByMonth.map((item, idx) => (
                <div key={idx} className="text-center">
                  <span className="block text-slate-200">{item.month}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{item.bookings} trips</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fleet Availability Gauge & Utilization */}
        <div className="bg-[#121620] p-6 rounded-3xl border border-white/10 space-y-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#D4AF37]" />
              Live Fleet Status Breakdown
            </h3>
            <p className="text-xs text-slate-400">
              Current state distribution across all {fleet.length} fleet vehicles.
            </p>
          </div>

          {/* Progress Bar Gauge */}
          <div className="space-y-4">
            <div className="h-4 w-full bg-[#0B0D12] rounded-full overflow-hidden flex p-0.5 border border-white/10">
              <div
                style={{ width: `${availablePercent}%` }}
                className="bg-emerald-400 h-full rounded-l-full transition-all duration-500"
                title={`Available: ${availablePercent}%`}
              />
              <div
                style={{ width: `${bookedPercent}%` }}
                className="bg-amber-400 h-full transition-all duration-500"
                title={`Booked: ${bookedPercent}%`}
              />
              <div
                style={{ width: `${maintenancePercent}%` }}
                className="bg-sky-400 h-full rounded-r-full transition-all duration-500"
                title={`Maintenance: ${maintenancePercent}%`}
              />
            </div>

            {/* Legend Cards */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0D12] border border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="font-bold text-white">Available for Booking</span>
                </div>
                <strong className="text-emerald-400 font-extrabold">{availableCount} ({availablePercent}%)</strong>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0D12] border border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="font-bold text-white">On Active Duty (Booked)</span>
                </div>
                <strong className="text-amber-400 font-extrabold">{bookedCount} ({bookedPercent}%)</strong>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0D12] border border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-sky-400" />
                  <span className="font-bold text-white">Scheduled Maintenance</span>
                </div>
                <strong className="text-sky-400 font-extrabold">{maintenanceCount} ({maintenancePercent}%)</strong>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 text-center">
            <span className="text-[11px] text-slate-400 font-medium">
              100% Chauffeur-Driven • Zero Liability Operation
            </span>
          </div>
        </div>
      </div>

      {/* Popular Destinations & Vehicle Category Share */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Destinations Bar Chart */}
        <div className="bg-[#121620] p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            Top Booked Destinations
          </h3>
          <div className="space-y-3">
            {analytics.popularDestinations.map((dest, idx) => {
              const maxCount = Math.max(...analytics.popularDestinations.map((d) => d.count));
              const widthPct = Math.round((dest.count / maxCount) * 100);

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-white">{dest.name}</span>
                    <span className="text-[#D4AF37]">₹{dest.revenue.toLocaleString("en-IN")} ({dest.count} trips)</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#0B0D12] rounded-full overflow-hidden border border-white/5">
                    <div
                      style={{ width: `${widthPct}%` }}
                      className="h-full bg-linear-to-r from-[#D4AF37] to-amber-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vehicle Category Breakdown */}
        <div className="bg-[#121620] p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Car className="w-4 h-4 text-[#D4AF37]" />
            Fleet Category Distribution
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {analytics.categoryShare.map((cat, idx) => (
              <div
                key={idx}
                className="bg-[#0B0D12] p-4 rounded-2xl border border-white/5 space-y-1 hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-xs text-slate-400 font-semibold block">{cat.category} Class</span>
                <strong className="text-xl font-extrabold text-white block">{cat.count} Vehicles</strong>
                <span className="text-[11px] font-bold text-[#D4AF37]">{cat.percentage}% of Fleet Share</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
