import React from "react";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { WHATSAPP_PHONE_NUMBER } from "../../utils/whatsapp";

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  onOpenBooking,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0B0D12]/95 backdrop-blur-xl border-t border-[#D4AF37]/30 p-2.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        {/* Call CTA */}
        <a
          href="tel:+916362416120"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#121620] border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs hover:bg-[#1A1F2C]"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span>Call</span>
        </a>

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/30"
        >
          <MessageCircle className="w-4 h-4 mb-0.5 fill-current" />
          <span>WhatsApp</span>
        </a>

        {/* Request Quote Modal Trigger */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0B0D12] font-bold text-xs shadow-md"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Quote</span>
        </button>
      </div>
    </div>
  );
};
