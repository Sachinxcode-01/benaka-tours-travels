import { useState, useCallback } from "react";
import type { ChatMessage, ConversationContext } from "./chatbot.types";
import { ChatbotService } from "../services/chatbot.service";
import { ResponseBuilder } from "../knowledge/response.builder";
import { INITIAL_CONVERSATION_CONTEXT } from "./conversation-context";

export function useChatbotStore() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ConversationContext>(
    INITIAL_CONVERSATION_CONTEXT,
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    ResponseBuilder.buildGreetingResponse(),
  ]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMinimize = useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);

  const resetConversation = useCallback(() => {
    setMessages([ResponseBuilder.buildGreetingResponse()]);
    setContext(INITIAL_CONVERSATION_CONTEXT);
    setIsTyping(false);
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const cleanText = text.trim();
      if (!cleanText) return;

      const userMsg: ChatMessage = {
        id: `msg-user-${Date.now()}`,
        sender: "user",
        text: cleanText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      setTimeout(() => {
        const { botResponse, newContext } = ChatbotService.processUserMessage(
          cleanText,
          context,
        );
        setContext(newContext);
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 400);
    },
    [context],
  );

  const sendQuickReply = useCallback(
    (payload: string, label: string) => {
      const userMsg: ChatMessage = {
        id: `msg-user-qr-${Date.now()}`,
        sender: "user",
        text: label,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      setTimeout(() => {
        const { botResponse, newContext } = ChatbotService.processQuickReply(
          payload,
          context,
        );
        setContext(newContext);
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 350);
    },
    [context],
  );

  return {
    isOpen,
    isMinimized,
    isTyping,
    messages,
    context,
    openChat,
    closeChat,
    toggleMinimize,
    resetConversation,
    sendMessage,
    sendQuickReply,
  };
}
