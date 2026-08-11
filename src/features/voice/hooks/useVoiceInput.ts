import { useState, useCallback, useRef, useEffect } from "react";
import type { VoiceState, VoiceEntities } from "../model/voice.types";
import { IntentService } from "@features/chatbot/services/intent.service";

// Minimal Web Speech API interfaces (not in standard TS lib without 'webworker' or speech extras)
interface SpeechRecognitionEventInner extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEventInner extends Event {
  error: string;
}

interface ISpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventInner) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventInner) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

type ISpeechRecognitionCtor = new () => ISpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: ISpeechRecognitionCtor;
    webkitSpeechRecognition?: ISpeechRecognitionCtor;
  }
}

export interface UseVoiceInputOptions {
  onTranscript?: (transcript: string) => void;
  onEntities?: (entities: VoiceEntities, transcript: string) => void;
  lang?: string;
}

function isSpeechRecognitionSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
  );
}

export function useVoiceInput(options: UseVoiceInputOptions = {}) {
  const { onTranscript, onEntities, lang = "en-IN" } = options;
  const [state, setState] = useState<VoiceState>(() =>
    isSpeechRecognitionSupported() ? "idle" : "unsupported",
  );
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.abort();
      } catch {
        // ignore
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (state === "unsupported") return;
    if (state === "listening") return;

    const SpeechRecognitionCtor =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setState("unsupported");
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setState("listening");
      setTranscript("");
    };

    recognition.onresult = (event: SpeechRecognitionEventInner) => {
      const result = event.results[0]?.[0]?.transcript ?? "";
      setTranscript(result);
      setState("processing");

      // Extract entities via existing IntentService
      const parsed = IntentService.parse(result);
      const entities: VoiceEntities = {
        pickup: parsed.entities.pickup,
        destination: parsed.entities.destination,
        date: parsed.entities.date,
        passengers: parsed.entities.passengers,
        vehicle: parsed.entities.vehicleId,
        tripType: parsed.entities.tripType,
      };

      onTranscript?.(result);
      onEntities?.(entities, result);

      setTimeout(() => setState("success"), 300);
      setTimeout(() => setState("idle"), 2500);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEventInner) => {
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setState("denied");
      } else {
        setState("idle");
      }
    };

    recognition.onend = () => {
      setState((prev) => (prev === "listening" ? "idle" : prev));
    };

    recognition.start();
  }, [state, lang, onTranscript, onEntities]);

  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore
    }
    setState("idle");
  }, []);

  const reset = useCallback(() => {
    setState(isSpeechRecognitionSupported() ? "idle" : "unsupported");
    setTranscript("");
  }, []);

  return {
    state,
    transcript,
    isListening: state === "listening",
    isSupported: state !== "unsupported",
    startListening,
    stopListening,
    reset,
  };
}
