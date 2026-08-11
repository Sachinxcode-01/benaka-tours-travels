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
    <div className="flex items-center justify-between p-3.5 sm:p-4 bg-gradient-to-r from-[#0B0D12] via-[#121620] to-[#0B0D12] border-b border-[#D4AF37]/30 text-white rounded-t-3xl sm:rounded-t-2xl shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src="/assets/brand/benaka_emblem_gold_transparent.png"
            alt="Benaka Assistant"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-md"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0B0D12]" />
        </div>

        <div>
          <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base text-white leading-tight">
            <span>Benaka Travel Assistant</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-amber-300/90 font-medium">
            <span className="text-emerald-400 font-bold">● Available 24/7</span>
            <span>• Chauffeur Rentals</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onReset}
          title="Restart Conversation"
          aria-label="Restart Conversation"
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onMinimize}
          title="Minimize Chat"
          aria-label="Minimize Chat"
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400"
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          onClick={onClose}
          title="Close Chat"
          aria-label="Close Chat Window"
          className="p-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
