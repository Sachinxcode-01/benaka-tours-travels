import React from "react";
import { motion } from "motion/react";
import { ExternalLink, MessageCircle, Phone, MapPin } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "../model/chatbot.types";
import { BookingSummary } from "./BookingSummary";
import { QuickReplies } from "./QuickReplies";

interface ChatMessageProps {
  message: ChatMessageType;
  onQuickReplySelect: (payload: string, label: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onQuickReplySelect,
}) => {
  const isUser = message.sender === "user";
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex flex-col ${isUser ? "items-end" : "items-start"} my-1.5 space-y-1`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-lg relative ${
          isUser
            ? "bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-semibold rounded-br-xs"
            : "bg-[#121620]/95 border border-white/10 text-slate-100 rounded-bl-xs backdrop-blur-md"
        }`}
      >
        {!isUser && (
          <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span>BENAKA TRAVEL ASSISTANT</span>
          </div>
        )}

        <div className="whitespace-pre-wrap font-sans leading-relaxed">
          {message.text}
        </div>

        {/* Optional Booking Summary Card */}
        {message.bookingSummary && (
          <BookingSummary summary={message.bookingSummary} />
        )}

        {/* Action CTA Buttons */}
        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-2.5 mt-2 border-t border-white/10">
            {message.actions.map((act) => (
              <a
                key={act.id}
                href={act.url}
                target={act.type === "call" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                  act.type === "whatsapp"
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                    : act.type === "call"
                      ? "bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30"
                      : "bg-[#161B26] border border-white/10 text-white hover:border-[#D4AF37]"
                }`}
              >
                {act.type === "whatsapp" && (
                  <MessageCircle className="w-4 h-4 fill-current" />
                )}
                {act.type === "call" && (
                  <Phone className="w-4 h-4 text-amber-400" />
                )}
                {act.type === "map" && (
                  <MapPin className="w-4 h-4 text-amber-400" />
                )}
                <span>{act.label}</span>
                {act.type === "map" && (
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                )}
              </a>
            ))}
          </div>
        )}

        <div
          className={`text-[10px] text-right mt-1.5 ${
            isUser ? "text-black/70 font-medium" : "text-slate-400"
          }`}
        >
          {formattedTime}
        </div>
      </div>

      {/* Quick Replies below bot message */}
      {!isUser && message.quickReplies && (
        <QuickReplies
          quickReplies={message.quickReplies}
          onSelect={onQuickReplySelect}
        />
      )}
    </motion.div>
  );
};
