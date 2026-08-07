import { useState, useCallback } from "react";
import type { BookingRequest } from "../../../types/booking";

const DRAFT_KEY = "benaka_booking_inquiry_draft_v1";

export function useBookingDraft() {
  const [draft, setDraft] = useState<Partial<BookingRequest> | null>(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = window.localStorage.getItem(DRAFT_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      }
    } catch (e) {
      console.warn("Failed to read booking draft from localStorage", e);
    }
    return null;
  });

  const [hasUnsavedDraft, setHasUnsavedDraft] = useState<boolean>(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = window.localStorage.getItem(DRAFT_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return Boolean(
            parsed.pickupLocation || parsed.destination || parsed.customerName,
          );
        }
      }
    } catch {
      // ignore
    }
    return false;
  });

  const saveDraft = useCallback((data: Partial<BookingRequest>) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
        setDraft(data);
        setHasUnsavedDraft(true);
      }
    } catch (e) {
      console.warn("Failed to save booking draft to localStorage", e);
    }
  }, []);

  const clearDraft = useCallback(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(DRAFT_KEY);
        setDraft(null);
        setHasUnsavedDraft(false);
      }
    } catch (e) {
      console.warn("Failed to clear booking draft from localStorage", e);
    }
  }, []);

  return {
    draft,
    hasUnsavedDraft,
    saveDraft,
    clearDraft,
  };
}
