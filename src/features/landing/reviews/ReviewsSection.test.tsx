import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ReviewsSection } from "./ReviewsSection";
import { TESTIMONIALS_DATA } from "../../../data/testimonials";

describe("ReviewsSection Carousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders verified customer feedback title and first testimonial", () => {
    render(<ReviewsSection />);
    expect(
      screen.getByText(/What Patrons Say About BENAKA/i),
    ).toBeInTheDocument();
    expect(screen.getByText(TESTIMONIALS_DATA[0].name)).toBeInTheDocument();
  });

  it("navigates to next testimonial on clicking next button", async () => {
    render(<ReviewsSection />);
    const nextBtn = screen.getByRole("button", { name: /Next review/i });
    fireEvent.click(nextBtn);
    await waitFor(() => {
      expect(screen.getByText(TESTIMONIALS_DATA[1].name)).toBeInTheDocument();
    });
  });

  it("toggles autoplay pause state on button click", () => {
    render(<ReviewsSection />);
    const pauseBtn = screen.getByRole("button", { name: /Pause autoplay/i });
    fireEvent.click(pauseBtn);
    expect(screen.getByText(/Autoplay Paused/i)).toBeInTheDocument();
  });
});
