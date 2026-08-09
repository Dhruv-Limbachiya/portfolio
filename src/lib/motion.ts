import type { Transition, Variants } from "motion/react";

/**
 * The motion language — "Aperture".
 *
 * Long expo-out entrances for anything arriving, symmetric in-out for
 * anything driven by scroll position. Elements resolve out of blur and
 * scale rather than sliding, which is what makes a reveal read as a
 * camera focusing instead of a UI updating.
 *
 * Four durations, three curves, one stagger. If an animation doesn't fit
 * here, it probably shouldn't exist.
 */

export const EASE = {
  /** Entrances. Fast departure, long settle. */
  soft: [0.16, 1, 0.3, 1],
  /** Scroll-linked and state changes — symmetric, mechanical. */
  drift: [0.65, 0, 0.35, 1],
  /** Firm settle for anything that must feel locked in. */
  settle: [0.22, 1, 0.36, 1],
} as const;

export const DUR = {
  micro: 0.22,
  base: 0.5,
  enter: 0.95,
  cinematic: 1.5,
} as const;

export const STAGGER = 0.06;

export const springSoft: Transition = { type: "spring", stiffness: 160, damping: 26, mass: 0.8 };
export const springSnappy: Transition = { type: "spring", stiffness: 380, damping: 32, mass: 0.6 };

/** Fires before centre so content has settled by the time it's read. */
export const inView = { once: true, margin: "-8% 0px -12% 0px" } as const;

/** The default entrance: rise out of blur, settle. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DUR.enter, ease: EASE.soft, delay: i * STAGGER },
  }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: DUR.enter, ease: EASE.soft, delay: i * STAGGER },
  }),
};

/** Line-level mask reveal for display typography. */
export const maskLine: Variants = {
  hidden: { y: "110%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: { duration: 1.05, ease: EASE.soft, delay: i * 0.08 },
  }),
};

/** Media uncovers from the bottom edge while easing out of an over-scale. */
export const uncover: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", scale: 1.1 },
  show: (i: number = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    transition: { duration: 1.4, ease: EASE.soft, delay: i * 0.1 },
  }),
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
};

export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DUR.cinematic, ease: EASE.drift } },
};
