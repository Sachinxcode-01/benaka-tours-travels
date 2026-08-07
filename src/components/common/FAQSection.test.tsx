import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FAQSection } from "./FAQSection";
import { FAQ_DATA } from "../../data/faq";

describe("FAQSection Accordion", () => {
  it("renders 100% Chauffeur-Driven policy banner", () => {
    render(<FAQSection />);
    expect(
      screen.getByText(/100% Chauffeur-Driven Policy/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Self-drive car rentals are strictly NOT provided/i),
    ).toBeInTheDocument();
  });

  it("renders all FAQ questions from faq dataset", () => {
    render(<FAQSection />);
    FAQ_DATA.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });
  });

  it("toggles FAQ accordion open/close state on click", () => {
    render(<FAQSection />);
    const questionButton = screen.getByText(FAQ_DATA[0].question);
    fireEvent.click(questionButton);
    expect(screen.getByText(FAQ_DATA[0].answer)).toBeInTheDocument();
  });
});
