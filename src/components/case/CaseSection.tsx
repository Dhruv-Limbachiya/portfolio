"use client";

import { motion } from "motion/react";
import MaskText from "@/components/primitives/MaskText";
import { DUR, EASE, inView } from "@/lib/motion";

/** Section shell for case studies — same rhythm as the home page sections,
 *  narrower header so long-form reading takes priority. */
export default function CaseSection({
  index,
  label,
  title,
  lede,
  children,
}: {
  index: string;
  label: string;
  title: readonly string[];
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <motion.div
          className="h-px origin-left bg-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={inView}
          transition={{ duration: DUR.cinematic, ease: EASE.drift }}
        />

        <div className="mt-5 t-label flex items-center gap-3 text-text-3">
          <span className="text-signal tnum">{index}</span>
          <span>{label}</span>
        </div>

        <div className="mt-9 grid gap-x-16 gap-y-5 md:mt-12 lg:grid-cols-12">
          <MaskText as="h2" lines={title} className="t-h2 text-text lg:col-span-6" />
          {lede ? (
            <motion.p
              className="t-lead max-w-prose text-text-2 lg:col-span-5 lg:col-start-8 lg:pt-1"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: DUR.enter, ease: EASE.soft, delay: 0.12 }}
            >
              {lede}
            </motion.p>
          ) : null}
        </div>

        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
