import React from "react";
import { MotionConfig } from "motion/react";
import { useReducedMotion } from "@shared/hooks/useReducedMotion";

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "user"}>
      {children}
    </MotionConfig>
  );
};
