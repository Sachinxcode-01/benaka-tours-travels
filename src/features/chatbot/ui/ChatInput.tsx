import React, { useState } from "react";
import { Send } from "lucide-react";
import { VoiceButton } from "@features/voice";

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

  const handleVoiceTranscript = (transcript: string) => {
    if (transcript.trim() && !disabled) {
      onSend(transcript);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 md:p-3 bg-[#0B0D12] border-t border-white/10 flex items-center gap-1.5 md:gap-2 shrink-0 rounded-b-2xl"
    >
      <VoiceButton onTranscript={handleVoiceTranscript} size="sm" />

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about vehicles, seats, chauffeur..."
        disabled={disabled}
        className="flex-1 bg-[#121620] border border-white/10 rounded-xl px-3 py-2 md:px-3.5 md:py-2.5 text-xs md:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] disabled:opacity-50 min-w-0"
      />

      <button
        type="submit"
        disabled={!input.trim() || disabled}
        aria-label="Send Message"
        className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold flex items-center justify-center shrink-0 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <Send className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
      </button>
    </form>
  );
};
