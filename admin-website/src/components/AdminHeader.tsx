import React from "react";
import { LogOut, ShieldCheck, RefreshCw } from "lucide-react";

interface AdminHeaderProps {
  onLogout: () => void;
  lastSyncTime: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onLogout,
  lastSyncTime,
}) => {
  return (
    <header className="bg-[#121620] border-b border-[#D4AF37]/25 px-6 py-4 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#D4AF37]/20 to-amber-500/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-[#D4AF37] tracking-tight">
                BENAKA
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 uppercase">
                Admin Website
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Fleet Management & Operations Portal
            </p>
          </div>
        </div>

        {/* Sync Status & Sign Out */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-[#0B0D12] px-3 py-1.5 rounded-lg border border-white/10">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Sync: <strong className="text-slate-200">{lastSyncTime}</strong></span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-3.5 py-1.5 rounded-xl hover:bg-rose-500/20 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
