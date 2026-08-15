import React from "react";
import { Download, Shield, Database, FileSpreadsheet, Lock, Activity } from "lucide-react";
import type { AuditLog, Vehicle, InquiryRecord } from "../types";

interface SettingsAuditProps {
  logs: AuditLog[];
  fleet: Vehicle[];
  inquiries: InquiryRecord[];
}

export const SettingsAudit: React.FC<SettingsAuditProps> = ({
  logs,
  fleet,
  inquiries,
}) => {
  const exportFleetCSV = () => {
    const headers = "ID,Name,Category,Seats,Fuel,Status,RatePerKm,DriverAllowanceDay\n";
    const rows = fleet
      .map(
        (v) =>
          `"${v.id}","${v.name}","${v.category}",${v.seats},"${v.fuel}","${v.status}",${v.ratePerKm},${v.driverAllowanceDay}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `benaka_fleet_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const exportInquiriesCSV = () => {
    const headers = "ID,CreatedAt,CustomerName,CustomerPhone,Pickup,Destination,PickupDate,Vehicle,Passengers,Status\n";
    const rows = inquiries
      .map(
        (inq) =>
          `"${inq.id}","${inq.createdAt}","${inq.customerName}","${inq.customerPhone}","${inq.pickupLocation}","${inq.destination}","${inq.pickupDate}","${inq.vehicleName}",${inq.passengers},"${inq.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `benaka_inquiries_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-[#121620] p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#D4AF37]" />
            Data Export & Security Controls
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Export operational records to CSV and review system access audit trails.
          </p>
        </div>
      </div>

      {/* Export Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#121620] p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Export Fleet Inventory</h3>
              <p className="text-xs text-slate-400">Download active vehicle inventory list as CSV.</p>
            </div>
          </div>
          <button
            onClick={exportFleetCSV}
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-black font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Fleet Inventory CSV</span>
          </button>
        </div>

        <div className="bg-[#121620] p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Export Booking Inquiries</h3>
              <p className="text-xs text-slate-400">Download all customer trip quotes & inquiries as CSV.</p>
            </div>
          </div>
          <button
            onClick={exportInquiriesCSV}
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Inquiries CSV</span>
          </button>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-[#121620] rounded-2xl border border-white/10 p-5 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#D4AF37]" />
          System Security Audit Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0B0D12] text-slate-400 font-semibold uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Operator</th>
                <th className="p-3">Action</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5">
                  <td className="p-3 font-mono text-[11px] text-slate-400">{log.timestamp}</td>
                  <td className="p-3 font-bold text-white">{log.user}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-white/5 font-mono text-[11px] text-[#D4AF37] border border-white/10">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
