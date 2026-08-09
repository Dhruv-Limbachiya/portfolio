"use client";

import { motion } from "motion/react";
import { DUR, EASE, inView } from "@/lib/motion";
import MaskText from "./MaskText";

type Props = {
  id: string;
  index: string;
  label: string;
  /** Authored line breaks — see MaskText. */
  titleLines: readonly string[];
  lede?: string;
  /** Right-hand technical readout in the section header. */
  meta?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Every section carries the same header structure: a drawn hairline, an
 * indexed mono label, a masked display title and an optional lede.
 * Consistency here is what lets the rest of the page be experimental.
 */
export default function Section({
  id,
  index,
  label,
  titleLines,
  lede,
  meta,
  children,
  className,
}: Props) {
  return (
    <section id={id} className={`scroll-mt-24 py-24 md:py-36 ${className ?? ""}`}>
      <div className="shell">
        <motion.div
          className="h-px origin-left bg-line"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          transition={{ duration: DUR.cinematic, ease: EASE.drift }}
        />

        <div className="mt-5 flex items-baseline justify-between gap-6">
          <div className="t-label flex items-center gap-3 text-text-3">
            <span className="text-signal tnum">{index}</span>
            <span>{label}</span>
          </div>
          {meta ? (
            <span className="t-label hidden text-text-3 sm:block" aria-hidden>
              {meta}
            </span>
          ) : null}
        </div>

        <div className="mt-10 grid gap-x-16 gap-y-6 md:mt-14 lg:grid-cols-12">
          <MaskText
            as="h2"
            lines={titleLines}
            className="t-h2 lg:col-span-7"
            lineClassName="text-text"
          />
          {lede ? (
            <motion.p
              className="t-lead max-w-prose text-text-2 lg:col-span-5 lg:pt-2"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: DUR.enter, ease: EASE.soft, delay: 0.12 }}
            >
              {lede}
            </motion.p>
          ) : null}
        </div>

        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  );
}
