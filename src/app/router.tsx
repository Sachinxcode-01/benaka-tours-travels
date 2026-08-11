import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HomePage } from "../pages/HomePage";
import { AdminPage } from "../pages/AdminPage";
import { NotFoundPage } from "../pages/NotFoundPage";

const TripPlannerPage = lazy(() =>
  import("@features/trip-planner/ui/TripPlannerPage").then((m) => ({
    default: m.TripPlannerPage,
  })),
);
const ComparisonPage = lazy(() =>
  import("@features/vehicle-comparison/ui/ComparisonPage").then((m) => ({
    default: m.ComparisonPage,
  })),
);
const SavedTripsPage = lazy(() =>
  import("@features/saved-trips/ui/SavedTripsPage").then((m) => ({
    default: m.SavedTripsPage,
  })),
);

const PageLoader = () => (
  <div className="min-h-screen bg-[#07080B] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
  </div>
);

import { motion, PAGE_TRANSITION } from "@shared/lib/motion";

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={PAGE_TRANSITION}
  >
    {children}
  </motion.div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageWrapper>
        <HomePage />
      </PageWrapper>
    ),
  },
  {
    path: "/trip-planner",
    element: (
      <PageWrapper>
        <Suspense fallback={<PageLoader />}>
          <TripPlannerPage />
        </Suspense>
      </PageWrapper>
    ),
  },
  {
    path: "/compare",
    element: (
      <PageWrapper>
        <Suspense fallback={<PageLoader />}>
          <ComparisonPage />
        </Suspense>
      </PageWrapper>
    ),
  },
  {
    path: "/saved-trips",
    element: (
      <PageWrapper>
        <Suspense fallback={<PageLoader />}>
          <SavedTripsPage />
        </Suspense>
      </PageWrapper>
    ),
  },
  {
    path: "/admin",
    element: (
      <PageWrapper>
        <AdminPage />
      </PageWrapper>
    ),
  },
  {
    path: "*",
    element: (
      <PageWrapper>
        <NotFoundPage />
      </PageWrapper>
    ),
  },
]);
