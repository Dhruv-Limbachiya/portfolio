"use client";

import { AnimatePresence, motion } from "motion/react";
import { useApp } from "@/components/providers/AppState";
import { VARIANTS } from "@/lib/variants";
import { EASE } from "@/lib/motion";

/**
 * The reading-path transition.
 *
 * A warm dissolve rather than a hard cut: the page settles behind a sheet of
 * paper, re-orders, and comes back. Its only job is to stop the re-order
 * from reading as a jump — so it says what changed, then gets out of the way.
 */
export default function Recompile() {
  const { recompiling, pending, variant } = useApp();
  const target = VARIANTS[pending ?? variant];

  return (
    <AnimatePresence>
      {recompiling ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.34, ease: EASE.soft }}
          aria-hidden
        >
          <div className="daylight absolute inset-0 bg-bg" />

          <motion.div
            className="relative px-6 text-center"
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: EASE.soft, delay: 0.08 }}
          >
            <p className="t-label text-text-3">Re-ordering for</p>
            <p className="t-h2 mt-4 text-text">{target.label}</p>
            <p className="t-body mx-auto mt-4 max-w-[34ch] text-text-2">{target.resolution}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** The visual dissolve is decorative, so the change is announced separately. */
export function RecompileAnnouncer() {
  const { variant } = useApp();
  const def = VARIANTS[variant];
  return (
    <p role="status" aria-live="polite" className="sr-only">
      Reading path: {def.label}. {def.resolution} Chapter order: {def.order.join(", ")}.
    </p>
  );
}
