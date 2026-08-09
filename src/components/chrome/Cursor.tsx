"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Mode = "default" | "link" | "open" | "drag" | "node" | "hidden";

const MODE_SIZE: Record<Mode, number> = {
  default: 8,
  link: 44,
  open: 76,
  drag: 64,
  node: 56,
  hidden: 0,
};

/**
 * Desktop-only cursor. Never mounts on coarse pointers or under
 * reduced-motion, and never carries information that is not also
 * available without it.
 *
 * Targets opt in with data-cursor="link | open | drag | node"
 * and optionally data-cursor-label="…".
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 52, mass: 0.42 });
  const sy = useSpring(y, { stiffness: 900, damping: 52, mass: 0.42 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      delete document.documentElement.dataset.cursorOn;
      return;
    }
    document.documentElement.dataset.cursorOn = "true";

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const el = (event.target as HTMLElement | null)?.closest?.<HTMLElement>(
        "[data-cursor], a, button",
      );
      if (!el) {
        setMode("default");
        setLabel("");
        return;
      }
      const declared = el.dataset.cursor as Mode | undefined;
      setMode(declared ?? "link");
      setLabel(el.dataset.cursorLabel ?? "");
    };

    const onLeave = () => setMode("hidden");
    const onEnter = () => setMode("default");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      delete document.documentElement.dataset.cursorOn;
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = MODE_SIZE[mode];
  const isRing = mode !== "default" && mode !== "hidden";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        animate={{
          width: size,
          height: size,
          backgroundColor: isRing ? "transparent" : "var(--signal)",
          borderWidth: isRing ? 1 : 0,
          opacity: mode === "hidden" ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.6 }}
        style={{
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--signal)",
          borderStyle: "solid",
        }}
      >
        {label ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="t-label whitespace-nowrap text-signal"
          >
            {label}
          </motion.span>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
