import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useComparisonStore } from "./comparison.store";
import { COMPARISON_STORAGE_KEY } from "./comparison.types";

describe("useComparisonStore", () => {
  beforeEach(() => {
    localStorage.removeItem(COMPARISON_STORAGE_KEY);
  });

  it("should initialize empty", () => {
    const { result } = renderHook(() => useComparisonStore());
    expect(result.current.count).toBe(0);
    expect(result.current.comparedVehicles).toEqual([]);
  });

  it("should add up to 3 vehicles", () => {
    const { result } = renderHook(() => useComparisonStore());

    act(() => {
      result.current.addToComparison("maruti-swift-dzire");
      result.current.addToComparison("toyota-innova-crysta");
      result.current.addToComparison("tempo-traveller");
    });

    expect(result.current.count).toBe(3);
    expect(result.current.canAdd).toBe(false);

    // 4th vehicle should be blocked
    act(() => {
      result.current.addToComparison("25-seater-bus");
    });

    expect(result.current.count).toBe(3);
  });

  it("should toggle vehicle in and out of comparison", () => {
    const { result } = renderHook(() => useComparisonStore());

    act(() => {
      result.current.toggleComparison("maruti-swift-dzire");
    });
    expect(result.current.isInComparison("maruti-swift-dzire")).toBe(true);

    act(() => {
      result.current.toggleComparison("maruti-swift-dzire");
    });
    expect(result.current.isInComparison("maruti-swift-dzire")).toBe(false);
  });

  it("should clear comparison", () => {
    const { result } = renderHook(() => useComparisonStore());

    act(() => {
      result.current.addToComparison("maruti-swift-dzire");
      result.current.clearComparison();
    });

    expect(result.current.count).toBe(0);
  });
});
