import { useState, useCallback, useEffect } from "react";
import {
  type SavedTrip,
  SAVED_TRIPS_STORAGE_KEY,
  MAX_SAVED_TRIPS,
} from "./saved-trips.types";

function loadFromStorage(): SavedTrip[] {
  try {
    const raw = localStorage.getItem(SAVED_TRIPS_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as SavedTrip[];
  } catch {
    // ignore
  }
  return [];
}

function saveToStorage(trips: SavedTrip[]) {
  try {
    localStorage.setItem(SAVED_TRIPS_STORAGE_KEY, JSON.stringify(trips));
  } catch {
    // ignore
  }
}

export function useSavedTripsStore() {
  const [trips, setTrips] = useState<SavedTrip[]>(loadFromStorage);

  useEffect(() => {
    saveToStorage(trips);
  }, [trips]);

  const saveTrip = useCallback((trip: Omit<SavedTrip, "id" | "savedAt">) => {
    const newTrip: SavedTrip = {
      ...trip,
      id: `trip-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      savedAt: Date.now(),
    };

    setTrips((prev) => {
      // Add to front, cap at MAX
      const updated = [newTrip, ...prev];
      return updated.slice(0, MAX_SAVED_TRIPS);
    });

    return newTrip;
  }, []);

  const deleteTrip = useCallback((id: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAllTrips = useCallback(() => {
    setTrips([]);
  }, []);

  return {
    trips,
    recentTrips: trips.slice(0, 5),
    saveTrip,
    deleteTrip,
    clearAllTrips,
  };
}
