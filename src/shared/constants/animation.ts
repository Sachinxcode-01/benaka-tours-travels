import type { Variants } from "motion/react";

// Centralized timing constants (in seconds)
export const TIMING = {
  MICRO: 0.18,
  FAST: 0.25,
  NORMAL: 0.35,
  SLOW: 0.5,
  SECTION: 0.7,
  HERO: 1.2,
} as const;

// Easing presets
export const EASINGS = {
  easeOutLuxury: [0.16, 1, 0.3, 1] as const, // Spring-like ease out
  easeInOutSoft: [0.4, 0, 0.2, 1] as const,
  bounceSoft: [0.34, 1.56, 0.64, 1] as const,
};

// Motion Spring transitions
export const SPRINGS = {
  soft: { type: "spring", stiffness: 200, damping: 25 },
  snappy: { type: "spring", stiffness: 350, damping: 30 },
  bouncy: { type: "spring", stiffness: 400, damping: 20 },
};

// Reusable Motion Variants
export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASINGS.easeOutLuxury },
  },
};

export const FADE_DOWN: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASINGS.easeOutLuxury },
  },
};

export const FADE_LEFT: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASINGS.easeOutLuxury },
  },
};

export const FADE_RIGHT: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASINGS.easeOutLuxury },
  },
};

export const SCALE_IN: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASINGS.easeOutLuxury },
  },
};

export const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const STAGGER_CHILD: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASINGS.easeOutLuxury },
  },
};

export const PAGE_TRANSITION: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASINGS.easeOutLuxury },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};
