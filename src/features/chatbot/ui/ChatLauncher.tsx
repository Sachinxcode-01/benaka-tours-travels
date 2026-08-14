import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X } from "lucide-react";
import { useChatbotStore } from "../model/chatbot.store";
import { ChatWindow } from "./ChatWindow";

const STORAGE_KEY = "benaka_chatbot_launcher_position_v2";
const MARGIN = 16;
const BUTTON_SIZE = 60;

interface Position {
  x: number;
  y: number;
}

export const ChatLauncher: React.FC = () => {
  const {
    isOpen,
    isMinimized,
    isTyping,
    messages,
    openChat,
    closeChat,
    toggleMinimize,
    resetConversation,
    sendMessage,
    sendQuickReply,
  } = useChatbotStore();

  const [position, setPosition] = useState<Position>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore fallback
    }
    return { x: 0, y: 0 };
  });

  const isDraggingRef = useRef(false);
  const dragStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Clamp position to visible screen boundaries
  const clampPosition = useCallback((pos: Position): Position => {
    if (typeof window === "undefined") return pos;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Convert relative offset (x, y) relative to bottom-right initial anchor
    // Initial position is bottom: MARGIN (16px), right: MARGIN (16px)
    const maxX = MARGIN;
    const minX = -(screenWidth - BUTTON_SIZE - MARGIN * 2);

    const maxY = MARGIN;
    const minY = -(screenHeight - BUTTON_SIZE - MARGIN * 2);

    return {
      x: Math.max(minX, Math.min(maxX, pos.x)),
      y: Math.max(minY, Math.min(maxY, pos.y)),
    };
  }, []);

  // Handle window resize or orientation change
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        const clamped = clampPosition(prev);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(clamped));
        } catch {
          // Ignore storage errors
        }
        return clamped;
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [clampPosition]);

  const handleDragStart = (
    _: unknown,
    info: { point: { x: number; y: number } },
  ) => {
    isDraggingRef.current = false;
    dragStartPosRef.current = { x: info.point.x, y: info.point.y };
  };

  const handleDrag = (
    _: unknown,
    info: { point: { x: number; y: number } },
  ) => {
    const dx = Math.abs(info.point.x - dragStartPosRef.current.x);
    const dy = Math.abs(info.point.y - dragStartPosRef.current.y);
    if (dx > 5 || dy > 5) {
      isDraggingRef.current = true;
    }
  };

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number; y: number } },
  ) => {
    const rawNewX = position.x + info.offset.x;
    const rawNewY = position.y + info.offset.y;

    const screenWidth = window.innerWidth;

    // Edge Snapping (snap to left or right screen margin)
    // Absolute X from left = screenWidth - BUTTON_SIZE - MARGIN + rawNewX
    const absoluteX = screenWidth - BUTTON_SIZE - MARGIN + rawNewX;
    const snapToLeft = absoluteX < screenWidth / 2;

    const snappedX = snapToLeft ? -(screenWidth - BUTTON_SIZE - MARGIN * 2) : 0;

    const finalPos = clampPosition({ x: snappedX, y: rawNewY });

    setPosition(finalPos);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPos));
    } catch {
      // Ignore storage errors
    }

    // Delay resetting drag flag to prevent drag release triggering click
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);
  };

  const handleLauncherClick = () => {
    if (isDraggingRef.current) return;
    if (isOpen && !isMinimized) {
      closeChat();
    } else {
      openChat();
    }
  };

  return (
    <>
      {/* Draggable Floating Chatbot Launcher Button */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.08}
        animate={{ x: position.x, y: position.y }}
        whileDrag={{ scale: 1.08 }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className="fixed bottom-4 right-4 z-40 touch-none select-none"
        style={{ touchAction: "none", cursor: "grab" }}
      >
        <button
          onClick={handleLauncherClick}
          aria-label="Open Benaka AI Travel Assistant"
          className="relative group p-3.5 sm:p-4 rounded-full bg-linear-to-br from-[#D4AF37] via-amber-500 to-amber-600 text-black shadow-[0_0_25px_rgba(212,175,55,0.4)] border-2 border-amber-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-amber-400/50"
        >
          {/* Glowing Ring Animation */}
          <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />

          <AnimatePresence mode="wait">
            {isOpen && !isMinimized ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </motion.div>
            ) : (
              <motion.div
                key="chat-icon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-6 h-6 fill-current" />
                <span className="hidden md:inline font-extrabold text-xs uppercase tracking-wider pr-1">
                  Ask Benaka
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread / Active Badge */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[10px] font-bold text-black items-center justify-center">
                1
              </span>
            </span>
          )}
        </button>
      </motion.div>

      {/* Floating Chat Window Modal/Sheet */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            isOpen={isOpen}
            isMinimized={isMinimized}
            isTyping={isTyping}
            messages={messages}
            onClose={closeChat}
            onMinimize={toggleMinimize}
            onReset={resetConversation}
            onSendMessage={sendMessage}
            onQuickReplySelect={sendQuickReply}
          />
        )}
      </AnimatePresence>
    </>
  );
};
