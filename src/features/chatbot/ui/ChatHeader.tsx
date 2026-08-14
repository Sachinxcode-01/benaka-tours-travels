import React from "react";
import { Minus, RotateCcw, X, Sparkles } from "lucide-react";

interface ChatHeaderProps {
  onMinimize: () => void;
  onReset: () => void;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onMinimize,
  onReset,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between p-2.5 md:p-4 bg-linear-to-r from-[#0B0D12] via-[#121620] to-[#0B0D12] border-b border-[#D4AF37]/30 text-white rounded-t-2xl shrink-0 select-none">
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        <div className="relative shrink-0">
          <img
            src="/assets/brand/benaka_emblem_gold_transparent.png"
            alt="Benaka Assistant"
            className="w-7 h-7 md:w-10 md:h-10 object-contain drop-shadow-md"
          />
          <span className="absolute bottom-0 right-0 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-500 border-2 border-[#0B0D12]" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1 font-bold text-xs md:text-base text-white leading-tight truncate">
            <span className="truncate">Benaka Assistant</span>
            <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-400 shrink-0" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-amber-300/90 font-medium truncate">
            <span className="text-emerald-400 font-bold shrink-0">● 24/7</span>
            <span className="truncate hidden sm:inline">
              • Chauffeur Rentals
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-0.5 md:gap-1 shrink-0">
        <button
          onClick={onReset}
          title="Restart Conversation"
          aria-label="Restart Conversation"
          className="p-1 md:p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400"
        >
          <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>

        <button
          onClick={onMinimize}
          title="Minimize Chat"
          aria-label="Minimize Chat"
          className="p-1 md:p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400"
        >
          <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>

        <button
          onClick={onClose}
          title="Close Chat"
          aria-label="Close Chat Window"
          className="p-1 md:p-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400"
        >
          <X className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
};
