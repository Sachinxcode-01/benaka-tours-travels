import React from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type MotionProps,
  type Variants,
} from "motion/react";
import {
  FADE_UP,
  FADE_LEFT,
  FADE_RIGHT,
  SCALE_IN,
  STAGGER_CONTAINER,
  STAGGER_CHILD,
  PAGE_TRANSITION,
} from "../constants/animation";

export {
  motion,
  AnimatePresence,
  useReducedMotion,
  FADE_UP,
  FADE_LEFT,
  FADE_RIGHT,
  SCALE_IN,
  STAGGER_CONTAINER,
  STAGGER_CHILD,
  PAGE_TRANSITION,
};

export type { MotionProps, Variants };

export interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "stagger";
  delay?: number;
  className?: string;
  amount?: number;
  once?: boolean;
}

const variantMap: Record<string, Variants> = {
  fadeUp: FADE_UP,
  fadeLeft: FADE_LEFT,
  fadeRight: FADE_RIGHT,
  scaleIn: SCALE_IN,
  stagger: STAGGER_CONTAINER,
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = "fadeUp",
  delay = 0,
  className = "",
  amount = 0.2,
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const selectedVariant = variantMap[variant] ?? FADE_UP;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={selectedVariant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
