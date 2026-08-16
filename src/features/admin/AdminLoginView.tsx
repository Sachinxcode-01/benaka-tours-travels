import React, { useState } from "react";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { FormField } from "../../components/forms/FormField";

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState("admin@benakatravels.in");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (password === "admin123" || password.length >= 6) {
        onLoginSuccess();
      } else {
        setError(
          "Invalid credentials. Password must be at least 6 characters.",
        );
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-[#D4AF37]/30 bg-[#121620] space-y-6">
        <div className="text-center space-y-3">
          <div className="mx-auto p-3 rounded-2xl bg-[#0B0D12] border border-[#D4AF37]/40 inline-block shadow-xl shadow-[#D4AF37]/15">
            <img
              src="/assets/brand/benaka_logo_primary_transparent.png"
              alt="Benaka Tours & Travels Logo"
              className="h-16 w-auto max-w-full object-contain mx-auto drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            BENAKA ADMIN PORTAL
          </h1>
          <p className="text-xs text-slate-400">
            Secure Fleet & Inquiry Management Access
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Administrator Email" required>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 admin-field rounded-xl text-sm"
              />
            </div>
          </FormField>

          <FormField label="Password" required>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 admin-field rounded-xl text-sm"
              />
            </div>
          </FormField>

          <PrimaryButton type="submit" fullWidth isLoading={loading}>
            Sign In to Dashboard
          </PrimaryButton>
        </form>

        <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-white/10">
          <p>Restricted area for BENAKA TOURS AND TRAVELS management only.</p>
        </div>
      </div>
    </div>
  );
};
