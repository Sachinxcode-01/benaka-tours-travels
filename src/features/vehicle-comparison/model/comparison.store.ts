import { useState, useCallback, useEffect } from "react";
import { FLEET_VEHICLES } from "@entities/vehicle";
import type { Vehicle } from "@entities/vehicle";
import {
  MAX_COMPARISON_VEHICLES,
  COMPARISON_STORAGE_KEY,
} from "./comparison.types";

function loadFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(COMPARISON_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as string[];
  } catch {
    // ignore
  }
  return [];
}

function saveToStorage(ids: string[]) {
  try {
    localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function useComparisonStore() {
  const [vehicleIds, setVehicleIds] = useState<string[]>(loadFromStorage);

  useEffect(() => {
    saveToStorage(vehicleIds);
  }, [vehicleIds]);

  const addToComparison = useCallback((id: string) => {
    setVehicleIds((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= MAX_COMPARISON_VEHICLES) return prev; // silently block; UI should warn
      return [...prev, id];
    });
  }, []);

  const removeFromComparison = useCallback((id: string) => {
    setVehicleIds((prev) => prev.filter((v) => v !== id));
  }, []);

  const toggleComparison = useCallback((id: string) => {
    setVehicleIds((prev) => {
      if (prev.includes(id)) return prev.filter((v) => v !== id);
      if (prev.length >= MAX_COMPARISON_VEHICLES) return prev;
      return [...prev, id];
    });
  }, []);

  const clearComparison = useCallback(() => {
    setVehicleIds([]);
  }, []);

  const isInComparison = useCallback(
    (id: string) => vehicleIds.includes(id),
    [vehicleIds],
  );

  const canAdd = vehicleIds.length < MAX_COMPARISON_VEHICLES;

  const comparedVehicles: Vehicle[] = vehicleIds
    .map((id) => FLEET_VEHICLES.find((v) => v.id === id))
    .filter((v): v is Vehicle => v !== undefined);

  return {
    vehicleIds,
    comparedVehicles,
    canAdd,
    count: vehicleIds.length,
    addToComparison,
    removeFromComparison,
    toggleComparison,
    clearComparison,
    isInComparison,
  };
}
