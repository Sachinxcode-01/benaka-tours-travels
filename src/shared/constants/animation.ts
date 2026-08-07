export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.35,
  SLOW: 0.6,
  MODAL: 0.25,
} as const;

export const ANIMATION_EASE = {
  EASE_OUT_QUAD: [0.25, 0.46, 0.45, 0.94],
  SPRING_SMOOTH: { type: "spring", stiffness: 300, damping: 30 },
  BOUNCE_SUBTLE: { type: "spring", stiffness: 400, damping: 20 },
} as const;

export const STAGGER_INTERVAL = {
  CARDS: 0.08,
  LIST_ITEMS: 0.05,
} as const;

export const MOTION_PRESETS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: ANIMATION_DURATION.NORMAL },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: ANIMATION_DURATION.NORMAL, ease: "easeOut" },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: ANIMATION_DURATION.FAST },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: STAGGER_INTERVAL.CARDS,
      },
    },
  },
} as const;
