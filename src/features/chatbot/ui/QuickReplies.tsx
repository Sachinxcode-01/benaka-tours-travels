import React from "react";
import type { QuickReply } from "../model/chatbot.types";

interface QuickRepliesProps {
  quickReplies: QuickReply[];
  onSelect: (payload: string, label: string) => void;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({
  quickReplies,
  onSelect,
}) => {
  if (!quickReplies || quickReplies.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-0.5 custom-scrollbar scrollbar-none">
      {quickReplies.map((qr) => (
        <button
          key={qr.id}
          onClick={() => onSelect(qr.payload, qr.label)}
          className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-[#161B26] hover:bg-[#D4AF37] text-amber-300 hover:text-black border border-amber-500/30 text-[11px] md:text-xs font-semibold md:font-bold whitespace-nowrap transition-all shadow-sm shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          {qr.label}
        </button>
      ))}
    </div>
  );
};
