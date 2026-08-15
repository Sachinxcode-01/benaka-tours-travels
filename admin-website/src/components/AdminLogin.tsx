import React, { useState } from "react";
import { ShieldCheck, Lock, ArrowRight, Sparkles } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      // Default admin PIN for demonstration: 1234 or admin
      if (pin === "1234" || pin.toLowerCase() === "admin" || pin === "benaka") {
        onLoginSuccess();
      } else {
        setError("Invalid Administrative Passcode. (Try '1234' or 'benaka')");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#121620]/90 backdrop-blur-xl border border-[#D4AF37]/30 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center space-y-3 mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-linear-to-br from-[#D4AF37]/20 to-amber-500/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-lg shadow-[#D4AF37]/5">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[11px] font-bold text-[#D4AF37] tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            <span>Standalone Admin Portal</span>
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Benaka Operations Console
          </h1>
          <p className="text-xs text-slate-400">
            Secure administrative interface for fleet management and bookings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Administrative Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full admin-field rounded-xl px-4 py-3 pl-10 text-sm"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Default demo code: <code className="text-[#D4AF37]">1234</code> or <code className="text-[#D4AF37]">benaka</code>
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-linear-to-r from-[#D4AF37] via-amber-400 to-[#B89228] text-black font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Access Operations Dashboard"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] text-slate-500">
            Benaka Tours & Travels • Standalone Admin Console v1.0
          </p>
        </div>
      </div>
    </div>
  );
};
