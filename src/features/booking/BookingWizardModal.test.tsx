import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BookingWizardModal } from "./BookingWizardModal";
import { INITIAL_FLEET } from "../../data/fleet";

describe("BookingWizardModal Integration", () => {
  beforeEach(() => {
    if (
      typeof localStorage !== "undefined" &&
      typeof localStorage.clear === "function"
    ) {
      localStorage.clear();
    }
    vi.clearAllMocks();
  });

  it("renders modal when isOpen is true", () => {
    render(<BookingWizardModal isOpen={true} onClose={() => {}} />);
    expect(
      screen.getByText(/Chauffeur Vehicle Inquiry & Quote/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Trip Details/i)).toBeInTheDocument();
  });

  it("preselects initial vehicle when provided as prop", async () => {
    const targetVehicle = INITIAL_FLEET[1]; // hyundai-aura
    render(
      <BookingWizardModal
        isOpen={true}
        onClose={() => {}}
        initialVehicle={targetVehicle}
      />,
    );

    // Proceed to Step 2
    fireEvent.change(screen.getByPlaceholderText(/e.g. Hubballi/i), {
      target: { value: "Belagavi" },
    });

    const continueBtn = screen.getByRole("button", {
      name: /Continue to Vehicle Requirements/i,
    });
    fireEvent.click(continueBtn);

    // Wait specifically for Step 2 unique content
    await waitFor(() => {
      expect(
        screen.getByText(/Preferred Chauffeur Vehicle/i),
      ).toBeInTheDocument();
    });

    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    const vehicleSelect = selects.find((sel) =>
      Array.from(sel.options).some((opt) => opt.value === targetVehicle.id),
    );
    expect(vehicleSelect).toBeDefined();
    expect(vehicleSelect?.value).toBe(targetVehicle.id);
  });

  it("validates required fields in step 1 before proceeding", () => {
    render(<BookingWizardModal isOpen={true} onClose={() => {}} />);

    // Clear destination
    const destInput = screen.getByPlaceholderText(/e.g. Hubballi/i);
    fireEvent.change(destInput, { target: { value: "" } });

    const continueBtn = screen.getByRole("button", {
      name: /Continue to Vehicle Requirements/i,
    });
    fireEvent.click(continueBtn);

    // Should stay on step 1 and show error
    expect(screen.getByText(/Destination is required/i)).toBeInTheDocument();
  });

  it("completes full 4-step wizard and displays review summary with WhatsApp button", async () => {
    render(<BookingWizardModal isOpen={true} onClose={() => {}} />);

    // Step 1: Trip details
    const destInput = screen.getByPlaceholderText(/e.g. Hubballi/i);
    fireEvent.change(destInput, { target: { value: "Goa" } });

    const step1Btn = screen.getByRole("button", {
      name: /Continue to Vehicle Requirements/i,
    });
    fireEvent.click(step1Btn);

    // Step 2: Vehicle Requirements
    await waitFor(() => {
      expect(
        screen.getByText(/Preferred Chauffeur Vehicle/i),
      ).toBeInTheDocument();
    });

    const step2Btn = screen.getByRole("button", {
      name: /Enter Customer Details/i,
    });
    fireEvent.click(step2Btn);

    // Step 3: Customer Details
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(/e.g. Suresh Kulkarni/i),
      ).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText(/e.g. Suresh Kulkarni/i);
    fireEvent.change(nameInput, { target: { value: "Anand Joshi" } });

    const phoneInput = screen.getByPlaceholderText(/9876543210/i);
    fireEvent.change(phoneInput, { target: { value: "9876543210" } });

    const step3Btn = screen.getByRole("button", {
      name: /Review & Confirm/i,
    });
    fireEvent.click(step3Btn);

    // Step 4: Review and Confirm
    await waitFor(
      () => {
        expect(
          screen.getByText(/Send Quotation Request on WhatsApp/i),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    expect(screen.getByText(/Anand Joshi/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Final pricing will be confirmed by Benaka Tours & Travels/i,
      ),
    ).toBeInTheDocument();

    const whatsappLink = screen.getByRole("link", {
      name: /Send Quotation Request on WhatsApp/i,
    });
    expect(whatsappLink).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/916362416120"),
    );
  });
});
