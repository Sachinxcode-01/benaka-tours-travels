import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSavedTripsStore } from "./saved-trips.store";
import { SAVED_TRIPS_STORAGE_KEY } from "./saved-trips.types";

describe("useSavedTripsStore", () => {
  beforeEach(() => {
    localStorage.removeItem(SAVED_TRIPS_STORAGE_KEY);
  });

  it("should save a trip and persist in localStorage", () => {
    const { result } = renderHook(() => useSavedTripsStore());

    act(() => {
      result.current.saveTrip({
        pickup: "Gadag",
        destination: "Goa",
        passengers: 4,
        luggage: 2,
        tripType: "outstation",
        journeyType: "round-trip",
      });
    });

    expect(result.current.trips.length).toBe(1);
    expect(result.current.trips[0].pickup).toBe("Gadag");
    expect(result.current.trips[0].destination).toBe("Goa");
  });

  it("should delete a trip by id", () => {
    const { result } = renderHook(() => useSavedTripsStore());

    let savedId = "";
    act(() => {
      const trip = result.current.saveTrip({
        pickup: "Hubballi",
        destination: "Bengaluru",
        passengers: 2,
        luggage: 1,
        tripType: "outstation",
        journeyType: "one-way",
      });
      savedId = trip.id;
    });

    expect(result.current.trips.length).toBe(1);

    act(() => {
      result.current.deleteTrip(savedId);
    });

    expect(result.current.trips.length).toBe(0);
  });

  it("should clear all trips", () => {
    const { result } = renderHook(() => useSavedTripsStore());

    act(() => {
      result.current.saveTrip({
        pickup: "Gadag",
        destination: "Belagavi",
        passengers: 6,
        luggage: 3,
        tripType: "outstation",
        journeyType: "round-trip",
      });
      result.current.clearAllTrips();
    });

    expect(result.current.trips.length).toBe(0);
  });
});
