import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, MicOff, Square } from "lucide-react";
import { useVoiceInput, type UseVoiceInputOptions } from "../hooks/useVoiceInput";
import type { VoiceEntities } from "../model/voice.types";

interface VoiceButtonProps extends UseVoiceInputOptions {
  onEntities?: (entities: VoiceEntities, transcript: string) => void;
  onTranscript?: (transcript: string) => void;
  size?: "sm" | "md";
  className?: string;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  onEntities,
  onTranscript,
  size = "md",
  className = "",
}) => {
  const { state, isListening, startListening, stopListening } = useVoiceInput({
    onEntities,
    onTranscript,
  });

  if (state === "unsupported") return null;

  const isSmall = size === "sm";
  const btnSize = isSmall
    ? "w-9 h-9"
    : "w-11 h-11";

  const label =
    state === "listening"
      ? "Listening…"
      : state === "processing"
        ? "Processing…"
        : state === "success"
          ? "Got it!"
          : state === "denied"
            ? "Mic access denied"
            : "Tap to Speak";

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        disabled={state === "denied"}
        aria-label={label}
        aria-live="polite"
        className={`relative ${btnSize} rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed ${
          isListening
            ? "bg-red-500/20 border-2 border-red-400 text-red-400"
            : state === "success"
              ? "bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400"
              : "bg-[#1A1F2C] border border-white/20 text-slate-400 hover:border-[#D4AF37] hover:text-[#D4AF37]"
        }`}
      >
        {/* Pulse ring while listening */}
        <AnimatePresence>
          {isListening && (
            <motion.span
              className="absolute inset-0 rounded-full bg-red-400/25"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="stop"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Square className="w-4 h-4 fill-current" />
            </motion.div>
          ) : state === "denied" ? (
            <motion.div key="denied" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <MicOff className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="mic"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Mic className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {!isSmall && (
        <span
          aria-live="polite"
          className={`text-[10px] font-medium transition-colors text-center leading-tight max-w-17.5 ${
            isListening
              ? "text-red-400"
              : state === "success"
                ? "text-emerald-400"
                : "text-slate-500"
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
};
