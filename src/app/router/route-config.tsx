import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import { PageShell } from "@widgets/page-shell";

const HomePage = lazy(() => import("@pages/home/HomePage"));
const FleetPage = lazy(() => import("@pages/fleet/FleetPage"));
const VehicleDetailsPage = lazy(
  () => import("@pages/vehicle-details/VehicleDetailsPage"),
);
const BookingPage = lazy(() => import("@pages/booking/BookingPage"));
const ContactPage = lazy(() => import("@pages/contact/ContactPage"));
const PrivacyPage = lazy(() => import("@pages/privacy/PrivacyPage"));
const TermsPage = lazy(() => import("@pages/terms/TermsPage"));
const AdminPlaceholderPage = lazy(
  () => import("@pages/admin/AdminPlaceholderPage"),
);
const NotFoundPage = lazy(() => import("@pages/not-found/NotFoundPage"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <PageShell>
        <HomePage />
      </PageShell>
    ),
  },
  {
    path: "/fleet",
    element: (
      <PageShell>
        <FleetPage />
      </PageShell>
    ),
  },
  {
    path: "/fleet/:vehicleSlug",
    element: (
      <PageShell>
        <VehicleDetailsPage />
      </PageShell>
    ),
  },
  {
    path: "/booking",
    element: (
      <PageShell>
        <BookingPage />
      </PageShell>
    ),
  },
  {
    path: "/contact",
    element: (
      <PageShell>
        <ContactPage />
      </PageShell>
    ),
  },
  {
    path: "/privacy",
    element: (
      <PageShell>
        <PrivacyPage />
      </PageShell>
    ),
  },
  {
    path: "/terms",
    element: (
      <PageShell>
        <TermsPage />
      </PageShell>
    ),
  },
  {
    path: "/admin",
    element: (
      <PageShell>
        <AdminPlaceholderPage />
      </PageShell>
    ),
  },
  {
    path: "*",
    element: (
      <PageShell>
        <NotFoundPage />
      </PageShell>
    ),
  },
];
