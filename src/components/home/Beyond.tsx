"use client";

import { motion } from "motion/react";
import Section from "@/components/primitives/Section";
import { personal } from "@/lib/content";
import { EASE, inView } from "@/lib/motion";

/**
 * The closing chapter: life outside the work, what he's like to work with,
 * what he's chasing, and the one thing he'd argue about.
 *
 * Deliberately the last thing before contact — the visitor should leave with
 * the person, not with a metric.
 */
export default function Beyond({ index }: { index: string }) {
  return (
    <Section
      id="beyond"
      index={index}
      label={personal.outside.chapter}
      meta="the rest of it"
      titleLines={["There is a person", "behind the systems."]}
      lede="What I do when I'm not building, what I'm like to build alongside, and the one opinion I'll defend."
    >
      {/* ------------------------------------------------- outside the work -- */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <ul className="space-y-px lg:col-span-7">
          {personal.outside.items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={inView}
              transition={{ duration: 0.95, ease: EASE.soft, delay: i * 0.08 }}
              className="group relative rounded-lg border border-transparent bg-bg-elev p-6 transition-colors duration-700 hover:border-line md:p-8"
            >
              <span className="t-label text-signal">{item.tag}</span>
              <h3 className="t-h3 mt-3 text-text">{item.title}</h3>
              <p className="t-body mt-4 max-w-[54ch] text-text-2">{item.body}</p>
            </motion.li>
          ))}
        </ul>

        <div className="lg:col-span-5">
          <motion.div
            className="edge-light group relative overflow-hidden rounded-lg border border-signal-line bg-signal-soft p-6 md:p-8 lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={inView}
            transition={{ duration: 0.95, ease: EASE.soft, delay: 0.12 }}
          >
            <div
              aria-hidden
              className="aura absolute -top-28 right-[-20%] h-56 w-56 opacity-30"
            />
            <div className="relative">
              <div className="t-label flex items-center gap-2.5 text-signal">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                </span>
                {personal.curious.chapter}
              </div>
              <h3 className="t-h2 mt-5 text-text">{personal.curious.title}</h3>
              <p className="t-body mt-4 text-text-2">{personal.curious.body}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ------------------------------------------------------ to work with -- */}
      <div className="mt-24 border-t border-line pt-16 md:mt-32 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="t-label text-text-3">{personal.working.chapter}</p>
            <h3 className="t-h2 mt-6 max-w-[16ch] text-text">
              {personal.working.title.join(" ")}
            </h3>
          </div>

          <ul className="lg:col-span-8">
            {personal.working.traits.map((trait, i) => (
              <motion.li
                key={trait.claim}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.95, ease: EASE.soft, delay: i * 0.07 }}
                className="grid gap-3 border-b border-line py-7 last:border-b-0 md:grid-cols-12 md:gap-8 md:py-8"
              >
                <span className="t-label text-signal tnum md:col-span-1">0{i + 1}</span>
                <h4 className="t-h3 text-text md:col-span-5">{trait.claim}</h4>
                <p className="t-body max-w-[46ch] text-text-2 md:col-span-6">{trait.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* ----------------------------------------------------------- belief -- */}
      <motion.div
        className="relative mt-24 overflow-hidden rounded-xl border border-line bg-bg-elev p-8 md:mt-32 md:p-14"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 1.2, ease: EASE.soft }}
      >
        <div aria-hidden className="aura absolute -top-40 left-[10%] h-80 w-80 opacity-25" />
        <div className="relative">
          <p className="t-label text-text-3">{personal.belief.chapter}</p>
          <blockquote className="t-voice mt-8 max-w-[24ch] text-[clamp(1.8rem,4.4vw,3.4rem)] text-text">
            {personal.belief.statement}
          </blockquote>
          <p className="t-body mt-10 max-w-[62ch] text-text-2">{personal.belief.support}</p>
        </div>
      </motion.div>
    </Section>
  );
}
