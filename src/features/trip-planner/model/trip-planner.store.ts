import { useState, useCallback } from "react";
import {
  type TripFormData,
  type TripStep,
  type VehicleRecommendation,
  DEFAULT_TRIP_FORM,
} from "./trip-planner.types";
import type { Vehicle } from "@entities/vehicle";
import { recommendVehicles } from "../services/vehicle-recommender";

export function useTripPlannerStore() {
  const [step, setStep] = useState<TripStep>(1);
  const [formData, setFormData] = useState<TripFormData>(DEFAULT_TRIP_FORM);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [recommendations, setRecommendations] = useState<
    VehicleRecommendation[]
  >([]);

  const updateForm = useCallback((updates: Partial<TripFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const goToStep = useCallback((s: TripStep) => {
    setStep(s);
  }, []);

  const nextStep = useCallback(() => {
    setStep((prev) => {
      if (prev < 4) return (prev + 1) as TripStep;
      return prev;
    });
  }, []);

  const prevStep = useCallback(() => {
    setStep((prev) => {
      if (prev > 1) return (prev - 1) as TripStep;
      return prev;
    });
  }, []);

  const computeRecommendations = useCallback(() => {
    const recs = recommendVehicles(
      formData.passengers,
      formData.preferredCategory,
    );
    setRecommendations(recs);
    return recs;
  }, [formData.passengers, formData.preferredCategory]);

  const selectVehicle = useCallback(
    (vehicle: Vehicle) => {
      setSelectedVehicle(vehicle);
      nextStep();
    },
    [nextStep],
  );

  const reset = useCallback(() => {
    setStep(1);
    setFormData(DEFAULT_TRIP_FORM);
    setSelectedVehicle(null);
    setRecommendations([]);
  }, []);

  return {
    step,
    formData,
    selectedVehicle,
    recommendations,
    updateForm,
    goToStep,
    nextStep,
    prevStep,
    computeRecommendations,
    selectVehicle,
    reset,
  };
}
