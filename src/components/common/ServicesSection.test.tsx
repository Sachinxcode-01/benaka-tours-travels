import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesSection } from "./ServicesSection";
import { SERVICES_DATA } from "../../data/services";

describe("ServicesSection", () => {
  it("renders 100% Chauffeur-Driven travel services title", () => {
    render(<ServicesSection />);
    expect(
      screen.getByText(/100% Chauffeur-Driven Travel Services/i),
    ).toBeInTheDocument();
  });

  it("renders all 10 service items from services dataset", () => {
    render(<ServicesSection />);
    SERVICES_DATA.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    });
  });

  it("displays recommended vehicle badges for service items", () => {
    render(<ServicesSection />);
    const dzireMatches = screen.getAllByText(/Swift Dzire \/ Hyundai Aura/i);
    expect(dzireMatches.length).toBeGreaterThan(0);
    const innovaMatches = screen.getAllByText(
      /Toyota Innova Crysta \/ Ertiga/i,
    );
    expect(innovaMatches.length).toBeGreaterThan(0);
  });
});
