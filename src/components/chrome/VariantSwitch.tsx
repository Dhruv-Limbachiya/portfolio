"use client";

import { motion } from "motion/react";
import { useApp } from "@/components/providers/AppState";
import { VARIANT_IDS, VARIANTS } from "@/lib/variants";
import { springSnappy } from "@/lib/motion";

/**
 * The build-target switch. This is the concept's control surface: it
 * re-resolves the page for a specific reader the way a Gradle target
 * resolves a build for a specific vendor.
 *
 * Implemented as a real radiogroup so it is keyboard- and
 * screen-reader-operable, not just clickable.
 */
export default function VariantSwitch({ className }: { className?: string }) {
  const { variant, setVariant } = useApp();

  return (
    <div
      role="radiogroup"
      aria-label="Reading path — re-orders this page for a specific reader"
      className={`relative flex items-center gap-0.5 rounded-full border border-line bg-bg-elev/80 p-1 backdrop-blur-md ${className ?? ""}`}
    >
      {VARIANT_IDS.map((id) => {
        const active = id === variant;
        return (
          <button
            key={id}
            role="radio"
            aria-checked={active}
            onClick={() => setVariant(id)}
            data-cursor="link"
            title={`${VARIANTS[id].label} — ${VARIANTS[id].audience}`}
            className="relative rounded-full px-3 py-2 outline-offset-2 transition-colors sm:px-3.5"
          >
            {active ? (
              <motion.span
                layoutId="variant-pill"
                transition={springSnappy}
                className="absolute inset-0 rounded-full bg-signal"
              />
            ) : null}
            <span
              className={`t-label relative z-10 transition-colors ${
                active ? "text-signal-ink" : "text-text-3 hover:text-text"
              }`}
            >
              {VARIANTS[id].label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
