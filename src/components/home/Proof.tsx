"use client";

import { motion } from "motion/react";
import Section from "@/components/primitives/Section";
import Counter from "@/components/primitives/Counter";
import { headlineMetrics } from "@/lib/content";
import { EASE, inView } from "@/lib/motion";

/**
 * Headline proof.
 *
 * Every number counts up on screen and every number carries the engineering
 * that produced it — a bare metric reads as inflated, and the detail line is
 * what makes it credible.
 */
export default function Proof({ index }: { index: string }) {
  return (
    <Section
      id="proof"
      index={index}
      label="Proof"
      meta="the numbers"
      titleLines={["Numbers, with the", "engineering attached."]}
      lede="Four figures that matter, and the architectural decision underneath each one."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {headlineMetrics.map((metric, i) => (
          <motion.article
            key={metric.label}
            className="edge-light group relative flex flex-col justify-between gap-10 overflow-hidden rounded-lg border border-line bg-bg-elev p-6 transition-colors duration-700 hover:border-line-strong md:p-7"
            initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={inView}
            transition={{ duration: 0.95, ease: EASE.soft, delay: i * 0.09 }}
          >
            <div
              aria-hidden
              className="aura absolute -top-24 left-1/2 h-40 w-40 -translate-x-1/2 opacity-0 transition-opacity duration-700 group-hover:opacity-40"
            />

            <div className="relative">
              <Counter
                to={metric.to}
                decimals={metric.decimals}
                prefix={metric.prefix}
                suffix={metric.suffix}
                className="t-h1 block text-text"
              />
              <p className="mt-3 text-[14.5px] leading-snug text-text-2">{metric.label}</p>
            </div>

            <p className="relative border-t border-line pt-4 text-[13px] leading-relaxed text-text-3">
              {metric.detail}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
