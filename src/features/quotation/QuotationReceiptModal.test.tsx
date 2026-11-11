import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QuotationReceiptModal } from "./ui/QuotationReceiptModal";
import type { QuotationDetails } from "./types/quotation";

const mockQuotation: QuotationDetails = {
  quoteId: "KTT-QUOTE-2026-9999",
  generatedAt: "2026-08-18",
  customerName: "Ramesh Kumar",
  customerPhone: "9876543210",
  customerEmail: "ramesh@example.com",
  pickupLocation: "Gadag",
  destination: "Hampi UNESCO Heritage",
  pickupDate: "2026-08-20",
  pickupTime: "08:00 AM",
  tripType: "OUTSTATION",
  journeyType: "Round Trip",
  passengers: 5,
  luggage: 3,
  acPreference: true,
  vehicle: {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    category: "MUV",
    seats: 7,
    fuel: "Diesel",
  },
  fareBreakdown: {
    estimatedKm: 220,
    ratePerKm: 21,
    driverAllowance: 500,
    estimatedTolls: 350,
    totalEstimatedAmount: 5470,
  },
};

describe("QuotationReceiptModal", () => {
  it("does not render when isOpen is false", () => {
    render(
      <QuotationReceiptModal
        isOpen={false}
        onClose={vi.fn()}
        quotation={mockQuotation}
      />
    );
    expect(screen.queryByText(/Official Fare Quotation Receipt/i)).toBeNull();
  });

  it("renders quotation details, customer info, vehicle, and total fare when open", () => {
    render(
      <QuotationReceiptModal
        isOpen={true}
        onClose={vi.fn()}
        quotation={mockQuotation}
      />
    );

    expect(screen.getByText("KTT-QUOTE-2026-9999")).toBeInTheDocument();
    expect(screen.getByText("Ramesh Kumar")).toBeInTheDocument();
    expect(screen.getByText("Toyota Innova Crysta")).toBeInTheDocument();
    expect(screen.getByText("₹5,470")).toBeInTheDocument();
    expect(screen.getByText(/Print \/ Save PDF/i)).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn();
    render(
      <QuotationReceiptModal
        isOpen={true}
        onClose={handleClose}
        quotation={mockQuotation}
      />
    );

    const closeBtn = screen.getByRole("button", { name: /close quote modal/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
