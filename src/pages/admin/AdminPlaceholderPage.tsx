import React from "react";
import { Container } from "@shared/ui/container";
import { Card } from "@shared/ui/card";
import { Badge } from "@shared/ui/badge";
import { Lock } from "lucide-react";

export const AdminPlaceholderPage: React.FC = () => {
  return (
    <div className="py-20">
      <Container size="md">
        <Card className="text-center p-8 space-y-6">
          <div className="mx-auto p-3 rounded-2xl bg-neutral-950 border border-[#D4AF37]/40 inline-block shadow-xl shadow-[#D4AF37]/10">
            <img
              src="/assets/brand/benaka_emblem_gold_transparent.png"
              alt="Benaka Logo Emblem"
              className="h-12 w-auto object-contain mx-auto drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
            />
          </div>

          <div className="space-y-2">
            <Badge variant="gold">ADMINISTRATIVE PORTAL FOUNDATION</Badge>
            <h1 className="text-2xl font-bold text-white">
              BENAKA ADMIN ACCESS
            </h1>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              Secure fleet management and business administration features will
              be connected to secure backend authentication in a subsequent
              phase.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 space-y-2 max-w-md mx-auto text-left">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <Lock className="h-4 w-4" />
              <span>Architectural Security Notice</span>
            </div>
            <p>
              In accordance with security standards, public Phase 1 does not use
              fake client-side authentication or mock logins. Secure
              Supabase/OAuth authentication will be connected in later phases.
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default AdminPlaceholderPage;
