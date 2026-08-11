import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-[#0B0D12] border-t border-white/10 flex items-center gap-2 shrink-0 rounded-b-3xl sm:rounded-b-2xl"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about vehicles, seats, chauffeur..."
        disabled={disabled}
        className="flex-1 bg-[#121620] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={!input.trim() || disabled}
        aria-label="Send Message"
        className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold flex items-center justify-center shrink-0 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <Send className="w-4 h-4 fill-current" />
      </button>
    </form>
  );
};
