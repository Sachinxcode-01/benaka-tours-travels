import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import type { ChatMessage as ChatMessageType } from "../model/chatbot.types";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";

interface ChatWindowProps {
  isOpen: boolean;
  isMinimized: boolean;
  isTyping: boolean;
  messages: ChatMessageType[];
  onClose: () => void;
  onMinimize: () => void;
  onReset: () => void;
  onSendMessage: (text: string) => void;
  onQuickReplySelect: (payload: string, label: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  isMinimized,
  isTyping,
  messages,
  onClose,
  onMinimize,
  onReset,
  onSendMessage,
  onQuickReplySelect,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={
        isMinimized
          ? { opacity: 0, y: 50, scale: 0.8, pointerEvents: "none" }
          : { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" }
      }
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[400px] h-[100svh] sm:h-[620px] max-h-[100svh] sm:max-h-[85vh] z-50 flex flex-col bg-[#07080B]/98 border-0 sm:border sm:border-[#D4AF37]/30 rounded-none sm:rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
    >
      {/* Header */}
      <ChatHeader onMinimize={onMinimize} onReset={onReset} onClose={onClose} />

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onQuickReplySelect={onQuickReplySelect}
          />
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Footer */}
      <ChatInput onSend={onSendMessage} disabled={isTyping} />
    </motion.div>
  );
};
