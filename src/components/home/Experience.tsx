"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Section from "@/components/primitives/Section";
import { experience, milestones, type Role } from "@/lib/content";
import { EASE, inView } from "@/lib/motion";

/**
 * Employment, education and awards, deliberately at three different weights.
 *
 * A role gets a full panel with its own numbers and the work it produced.
 * Education is a quiet two-line record. Awards are a single accent line each.
 * Nothing here lets a certificate sit at the same visual weight as three
 * years of ownership.
 */
export default function Experience({ index }: { index: string }) {
  const education = milestones.filter((m) => m.kind === "education");
  const awards = milestones.filter((m) => m.kind === "award");

  return (
    <Section
      id="journey"
      index={index}
      label="Experience"
      meta={`${experience.length} companies · 6+ years`}
      titleLines={["Two companies.", "One consistent instinct."]}
      lede="Find the work being repeated by hand, and replace it with a system."
    >
      {/* ------------------------------------------------------------ roles -- */}
      <ol className="space-y-5">
        {experience.map((role, i) => (
          <RolePanel key={role.org} role={role} order={i} />
        ))}
      </ol>

      {/* -------------------------------------------------------- education -- */}
      <div className="mt-20 grid gap-10 border-t border-line pt-14 md:mt-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-3">
          <p className="t-label text-text-3">Education</p>
        </div>
        <ul className="lg:col-span-9">
          {education.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.85, ease: EASE.soft, delay: i * 0.08 }}
              className="flex flex-col gap-1.5 border-b border-line py-5 last:border-b-0 md:flex-row md:items-baseline md:justify-between md:gap-8"
            >
              <span className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-2">
                <span className="text-[16px] font-medium tracking-tight text-text">
                  {item.title}
                </span>
                {item.incomplete ? (
                  <span className="t-label rounded-full border border-line px-2 py-1 text-text-3">
                    Dropout
                  </span>
                ) : null}
              </span>
              <span className="flex items-baseline gap-4 md:shrink-0">
                <span className="text-[14.5px] text-text-2">{item.org}</span>
                <span className="t-label tnum text-text-3">{item.year}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* ----------------------------------------------------------- awards -- */}
      <div className="mt-14 grid gap-10 border-t border-line pt-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-3">
          <p className="t-label text-text-3">Recognition</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-9">
          {awards.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={inView}
              transition={{ duration: 0.85, ease: EASE.soft, delay: i * 0.08 }}
              className="flex items-start gap-4 rounded-md border border-signal-line bg-signal-soft px-5 py-4"
            >
              <span aria-hidden className="mt-0.5 text-signal">
                ★
              </span>
              <span>
                <span className="block text-[15.5px] font-medium tracking-tight text-text">
                  {item.title}
                </span>
                <span className="t-label mt-1.5 block text-text-3">
                  {item.org} · {item.year}
                </span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function RolePanel({ role, order }: { role: Role; order: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={inView}
      transition={{ duration: 1.05, ease: EASE.soft, delay: order * 0.1 }}
      className="edge-light group relative overflow-hidden rounded-xl border border-line bg-bg-elev transition-colors duration-700 hover:border-line-strong"
    >
      {role.current ? (
        <div
          aria-hidden
          className="aura absolute -top-40 right-[-10%] h-72 w-72 opacity-25 transition-opacity duration-700 group-hover:opacity-45"
        />
      ) : null}

      <div className="relative grid gap-10 p-6 md:p-10 lg:grid-cols-12 lg:gap-14">
        {/* Identity */}
        <div className="lg:col-span-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="t-label tnum text-text-3">{role.period}</span>
            {role.current ? (
              <span className="t-label inline-flex items-center gap-2 rounded-full border border-signal-line bg-signal-soft px-2.5 py-1 text-signal">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                </span>
                Now
              </span>
            ) : null}
          </div>

          <h3 className="t-h2 mt-5 text-text">{role.org}</h3>
          <p className="mt-3 text-[16px] font-medium tracking-tight text-signal">{role.title}</p>

          {role.promotion ? (
            <p className="mt-3 flex flex-wrap items-baseline gap-x-2 text-[13.5px] text-text-3">
              <span className="text-text-2">Promoted {role.promotion.year}</span>
              <span aria-hidden>·</span>
              <span>from {role.promotion.from}</span>
            </p>
          ) : null}

          <p className="t-label mt-6 text-text-3">
            {role.span} · {role.location}
          </p>

          <p className="t-label mt-8 text-text-3">Worked with</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {role.stack.map((tech) => (
              <li
                key={tech}
                className="t-label rounded-full border border-line px-2.5 py-1.5 text-text-3 transition-colors duration-500 hover:border-signal-line hover:text-signal"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Substance */}
        <div className="lg:col-span-8">
          <p className="t-lead max-w-[62ch]">{role.summary}</p>

          <ul className="mt-9 space-y-px border-t border-line pt-6">
            {role.work.map((item) =>
              item.slug ? (
                <li key={item.title}>
                  <Link
                    href={`/work/${item.slug}`}
                    data-cursor="link"
                    className="group/row flex items-baseline gap-4 rounded-md px-3 py-3.5 transition-colors duration-500 hover:bg-surface md:gap-6"
                  >
                    <span className="w-1/3 shrink-0 text-[15px] font-medium tracking-tight text-text transition-transform duration-500 group-hover/row:translate-x-1">
                      {item.title}
                    </span>
                    <span className="flex-1 text-[14px] leading-snug text-text-2">
                      {item.detail}
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-text-3 transition-all duration-500 group-hover/row:translate-x-1 group-hover/row:text-signal"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ) : (
                <li
                  key={item.title}
                  className="flex items-baseline gap-4 px-3 py-3.5 md:gap-6"
                >
                  <span className="w-1/3 shrink-0 text-[15px] font-medium tracking-tight text-text">
                    {item.title}
                  </span>
                  <span className="flex-1 text-[14px] leading-snug text-text-2">
                    {item.detail}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </motion.li>
  );
}
