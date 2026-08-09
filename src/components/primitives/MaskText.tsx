"use client";

import { motion } from "motion/react";
import { EASE, inView } from "@/lib/motion";

type Props = {
  /** Pre-split lines. Splitting is authored, not automatic, so the break
   *  points are deliberate and never land mid-phrase. */
  lines: readonly string[];
  className?: string;
  /** A string applies to every line; a function receives (index, total) so a
   *  single line can be treated differently — Tailwind variants can't reach
   *  inside here because each line is the only child of its own mask. */
  lineClassName?: string | ((index: number, total: number) => string);
  delay?: number;
  /** Play immediately instead of waiting for the viewport. */
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
};

/**
 * Line-level mask reveal — the primary entrance for headline typography.
 *
 * Line masking rather than per-character: characters animating individually
 * looks busy at display sizes and delays legibility, which is the opposite
 * of what a headline is for.
 */
export default function MaskText({
  lines,
  className,
  lineClassName,
  delay = 0,
  immediate = false,
  as: Tag = "div",
}: Props) {
  const animateProps = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: inView };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden py-[0.06em]">
          {/* data-mask-line is the reduced-motion escape hatch: a CSS rule
              forces transform:none, so a clipped headline can never survive
              regardless of what the animation library decides to do. */}
          <motion.span
            data-mask-line
            className={`block will-change-transform ${
              typeof lineClassName === "function"
                ? lineClassName(i, lines.length)
                : (lineClassName ?? "")
            }`}
            initial="hidden"
            {...animateProps}
            variants={{
              hidden: { y: "112%" },
              show: {
                y: "0%",
                transition: { duration: 0.95, ease: EASE.soft, delay: delay + i * 0.075 },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
