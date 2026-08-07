import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HomePage from "@pages/home/HomePage";
import AdminPlaceholderPage from "@pages/admin/AdminPlaceholderPage";
import NotFoundPage from "@pages/not-found/NotFoundPage";

describe("AppRouter Routing Foundation", () => {
  it("renders HomePage on root path '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage />
      </MemoryRouter>,
    );

    const elements = screen.getAllByText("BENAKA TOURS AND TRAVELS");
    expect(elements.length).toBeGreaterThan(0);
    expect(elements[0]).toBeInTheDocument();
  });

  it("renders AdminPlaceholderPage on '/admin' with security notice", () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <AdminPlaceholderPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/BENAKA ADMIN ACCESS/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Architectural Security Notice/i),
    ).toBeInTheDocument();
  });

  it("renders NotFoundPage on non-existent route '/invalid-route'", () => {
    render(
      <MemoryRouter initialEntries={["/invalid-route"]}>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
