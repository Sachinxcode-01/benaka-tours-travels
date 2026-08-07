import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MotionProvider } from "./MotionProvider";
import { ErrorBoundary } from "@shared/ui/error-boundary";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ErrorBoundary>
      <MotionProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </MotionProvider>
    </ErrorBoundary>
  );
};
