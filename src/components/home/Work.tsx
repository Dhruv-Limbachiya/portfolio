"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Section from "@/components/primitives/Section";
import BranchCollapse from "./BranchCollapse";
import { flagship, supportingWork } from "@/lib/content";
import { EASE, inView } from "@/lib/motion";

export default function Work({ index }: { index: string }) {
  return (
    <Section
      id="work"
      index={index}
      label="Selected work"
      meta={`module: work · ${supportingWork.length + 1} targets`}
      titleLines={["Systems in production,", "with money and hardware", "on the line."]}
      lede="Four projects at Petpooja. One of them is the reason for the rest."
    >
      {/* ------------------------------------------------------- flagship -- */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 0.8, ease: EASE.soft }}
        className="group relative overflow-hidden rounded-sm border border-line bg-bg-elev"
      >
        <Link
          href={`/work/${flagship.slug}`}
          data-cursor="open"
          data-cursor-label="Case study"
          className="block outline-offset-4"
          aria-label={`Read the ${flagship.title} case study`}
        >
          <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-700 group-hover:scale-x-100" />

          <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-12 lg:gap-14 lg:p-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="t-label rounded-full border border-signal-line bg-signal-soft px-2.5 py-1 text-signal">
                  {flagship.eyebrow}
                </span>
                <span className="t-label text-text-3">{flagship.years}</span>
              </div>

              <h3 className="t-h1 mt-6 text-text">{flagship.title}</h3>
              <p className="t-h3 mt-3 max-w-[24ch] font-normal text-text-2">
                {flagship.subtitle}
              </p>

              <p className="t-body mt-7 max-w-[62ch] text-text-2">{flagship.oneLine}</p>

              <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-5 border-t border-line pt-7">
                {flagship.metrics.map((metric) => (
                  <li key={metric.label}>
                    <div className="t-h3 tnum text-signal">{metric.value}</div>
                    <div className="t-label mt-1.5 text-text-3">{metric.label}</div>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-2">
                {flagship.stack.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="t-label rounded-sm border border-line px-2 py-1 text-text-3"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <span className="mt-9 inline-flex items-center gap-2.5 text-[14px] font-medium tracking-tight text-text">
                Read the full case study
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full rounded-sm border border-line bg-surface/50 p-5 md:p-7">
                <BranchCollapse />
              </div>
            </div>
          </div>
        </Link>
      </motion.article>

      {/* ----------------------------------------------------- supporting -- */}
      <ul className="mt-6 border-t border-line">
        {supportingWork.map((project, i) => (
          <motion.li
            key={project.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.65, ease: EASE.soft, delay: i * 0.07 }}
            className="border-b border-line"
          >
            <Link
              href={`/work/${project.slug}`}
              data-cursor="open"
              data-cursor-label="Case study"
              className="group relative grid grid-cols-1 items-baseline gap-x-8 gap-y-3 py-7 outline-offset-4 md:grid-cols-12 md:py-9"
            >
              <span className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-signal transition-transform duration-600 ease-out group-hover:scale-x-100" />

              <div className="t-label flex items-center gap-3 text-text-3 md:col-span-2">
                <span className="text-signal tnum">0{i + 2}</span>
                <span>{project.eyebrow}</span>
              </div>

              <div className="md:col-span-5">
                <h3 className="t-h3 text-text transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-[15px] tracking-tight text-text-2">
                  {project.subtitle}
                </p>
              </div>

              <ul className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-4">
                {project.metrics.slice(0, 3).map((metric) => (
                  <li key={metric.label} className="min-w-0">
                    <span className="t-mono tnum text-signal">{metric.value}</span>
                    <span className="t-label ml-2 text-text-3">{metric.label}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between gap-4 md:col-span-1 md:justify-end">
                <span className="t-label text-text-3 md:hidden">{project.years}</span>
                <span
                  aria-hidden
                  className="text-text-3 transition-all duration-500 group-hover:translate-x-1 group-hover:text-signal"
                >
                  →
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
