# Animation Strategy & Infrastructure

The application uses a hybrid dual-library animation architecture:

## 1. Motion for React (`motion/react`)

Used for React component state animations and UI transitions:

- Page enter/exit transitions
- Modals, drawers, and accordions
- Button hover/active micro-interactions
- Card hover states & filter list animations

Imports MUST be from `motion/react`:

```ts
import { motion, AnimatePresence } from "motion/react";
```

## 2. GSAP + ScrollTrigger (`gsap`, `@gsap/react`)

Used for advanced timeline animations and scroll-driven storytelling:

- Hero section entrance timelines
- ScrollTrigger pinned sections
- Text reveal effects & parallax backgrounds

Registration is centralized in `@shared/lib/gsap`:

```ts
import { gsap, ScrollTrigger, useGSAP } from "@shared/lib/gsap";
```

## Accessibility & Reduced Motion

All animation providers wrap components with reduced motion detection via `useReducedMotion()`. Motion and GSAP instances respect system preferences and disable non-essential animations when requested.
