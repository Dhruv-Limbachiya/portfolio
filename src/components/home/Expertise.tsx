"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Section from "@/components/primitives/Section";
import { expertise } from "@/lib/content";
import { EASE, inView } from "@/lib/motion";

/**
 * No logo wall. Every capability is stated as a claim, backed by a link to
 * the work on this site that evidences it, and only then broken down into
 * technologies.
 */
export default function Expertise({ index }: { index: string }) {
  return (
    <Section
      id="expertise"
      index={index}
      label="Expertise"
      meta={`module: expertise · ${expertise.length} groups`}
      titleLines={["Capability, and the", "work that proves it."]}
      lede="Each group links to the case study that demonstrates it. Nothing is listed here that isn't evidenced somewhere on this site."
    >
      <div className="grid gap-px border border-line bg-line md:grid-cols-2">
        {expertise.map((group, i) => {
          const evidenceHref =
            "slug" in group.evidence ? `/work/${group.evidence.slug}` : group.evidence.external;
          const isInternal = "slug" in group.evidence;

          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.65, ease: EASE.soft, delay: (i % 2) * 0.08 }}
              className="group relative flex flex-col bg-bg-elev p-6 transition-colors duration-500 hover:bg-surface md:p-8"
            >
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-600 group-hover:scale-x-100" />

              <div className="t-label text-text-3">
                <span className="mr-3 text-signal tnum">0{i + 1}</span>
                {group.title}
              </div>

              <p className="t-h3 mt-4 max-w-[32ch] font-normal text-text">{group.claim}</p>

              <ul className="mt-7 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="t-label rounded-sm border border-line px-2 py-1 text-text-2 transition-colors duration-300 group-hover:border-line-strong"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                {isInternal ? (
                  <Link
                    href={evidenceHref}
                    data-cursor="link"
                    className="inline-flex items-center gap-2 border-t border-line pt-5 text-[13.5px] tracking-tight text-text-2 transition-colors hover:text-signal"
                  >
                    <span className="text-signal">↳</span>
                    {group.evidence.label}
                  </Link>
                ) : (
                  <a
                    href={evidenceHref}
                    data-cursor="link"
                    className="inline-flex items-center gap-2 border-t border-line pt-5 text-[13.5px] tracking-tight text-text-2 transition-colors hover:text-signal"
                  >
                    <span className="text-signal">↳</span>
                    {group.evidence.label}
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
