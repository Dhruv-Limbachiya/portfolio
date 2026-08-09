"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** How far the element is allowed to travel, in px. */
  strength?: number;
};

/**
 * Magnetic hover. Fine pointers only, and skipped under reduced motion —
 * it is an affordance, never a requirement.
 */
export default function Magnetic({ children, className, strength = 14 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });

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
    const el = ref.current;
    if (!el || !enabled) return;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      x.set((dx / (rect.width / 2)) * strength);
      y.set((dy / (rect.height / 2)) * strength);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, strength, x, y]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={enabled ? { x: sx, y: sy } : undefined}
    >
      {children}
    </motion.span>
  );
}
