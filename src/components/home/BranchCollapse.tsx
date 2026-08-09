"use client";

import { motion } from "motion/react";
import { EASE, inView } from "@/lib/motion";

const BRANCH_Y = [34, 78, 122, 166];
const MODULES = Array.from({ length: 13 }, (_, i) => i);

/**
 * The flagship story in one diagram: four divergent per-vendor branches
 * collapsing into a single architecture, from which thirteen vendor
 * modules resolve.
 *
 * SVG with pathLength animation — crisp at any size, cheap to run, and
 * it degrades to a fully legible static diagram under reduced motion.
 */
export default function BranchCollapse() {
  return (
    <figure className="flex h-full flex-col justify-center">
      <svg
        viewBox="0 0 420 210"
        className="h-auto w-full"
        role="img"
        aria-label="Diagram: four divergent per-vendor branches collapse into one architecture, which resolves into thirteen vendor modules."
      >
        {/* BEFORE — four branches drifting apart */}
        {BRANCH_Y.map((y, i) => (
          <motion.path
            key={`branch-${i}`}
            d={`M6 100 C 46 100, 56 ${y}, 104 ${y} L 150 ${y}`}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1.25"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={inView}
            transition={{ duration: 0.9, ease: EASE.soft, delay: i * 0.09 }}
          />
        ))}

        {BRANCH_Y.map((y, i) => (
          <motion.g
            key={`dot-${i}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={inView}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.09 }}
          >
            <rect x="147" y={y - 3} width="6" height="6" fill="var(--line-strong)" />
          </motion.g>
        ))}

        {/* COLLAPSE — the four converge into one */}
        {BRANCH_Y.map((y, i) => (
          <motion.path
            key={`collapse-${i}`}
            d={`M153 ${y} C 186 ${y}, 190 100, 214 100`}
            fill="none"
            stroke="var(--signal)"
            strokeWidth="1.25"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.75 }}
            viewport={inView}
            transition={{ duration: 0.75, ease: EASE.drift, delay: 0.95 + i * 0.06 }}
          />
        ))}

        {/* The single architecture */}
        <motion.rect
          x="214"
          y="88"
          width="24"
          height="24"
          fill="var(--signal)"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={inView}
          transition={{ type: "spring", stiffness: 360, damping: 22, delay: 1.5 }}
          style={{ transformOrigin: "226px 100px" }}
        />

        {/* AFTER — thirteen vendor modules resolving from it */}
        {MODULES.map((i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const x = 286 + col * 26;
          const y = 62 + row * 28;
          return (
            <motion.g key={`module-${i}`}>
              <motion.line
                x1="240"
                y1="100"
                x2={x}
                y2={y + 8}
                stroke="var(--line)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={inView}
                transition={{ duration: 0.5, ease: EASE.soft, delay: 1.7 + i * 0.035 }}
              />
              <motion.rect
                x={x}
                y={y}
                width="16"
                height="16"
                fill="var(--surface-2)"
                stroke="var(--line-strong)"
                strokeWidth="1"
                initial={{ opacity: 0, y: y + 6 }}
                whileInView={{ opacity: 1, y }}
                viewport={inView}
                transition={{ duration: 0.45, ease: EASE.soft, delay: 1.78 + i * 0.035 }}
              />
            </motion.g>
          );
        })}
      </svg>

      <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-line pt-4">
        <span className="t-label text-text-3">4 branches</span>
        <span className="t-label text-text-3">→</span>
        <span className="t-label text-signal">1 architecture</span>
        <span className="t-label text-text-3">→</span>
        <span className="t-label text-text-2">13 vendor modules</span>
      </figcaption>
    </figure>
  );
}
