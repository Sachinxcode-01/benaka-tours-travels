import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./route-config";
import { ScrollToTop } from "./ScrollToTop";
import { Spinner } from "@shared/ui/spinner";
import { ErrorBoundary } from "@shared/ui/error-boundary";

export const AppRouter: React.FC = () => {
  const element = useRoutes(routes);

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-neutral-950">
            <Spinner size="lg" />
          </div>
        }
      >
        {element}
      </Suspense>
    </ErrorBoundary>
  );
};
