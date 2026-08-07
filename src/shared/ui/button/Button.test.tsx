import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button UI Component", () => {
  it("renders children content correctly", () => {
    render(<Button>Book Now</Button>);
    expect(
      screen.getByRole("button", { name: /book now/i }),
    ).toBeInTheDocument();
  });

  it("handles disabled state properly", () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders loading spinner when isLoading is true", () => {
    render(<Button isLoading>Submitting</Button>);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
