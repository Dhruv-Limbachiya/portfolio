"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import MaskText from "@/components/primitives/MaskText";
import Magnetic from "@/components/primitives/Magnetic";
import { useApp } from "@/components/providers/AppState";
import { VARIANTS } from "@/lib/variants";
import { EASE } from "@/lib/motion";
import { person, availability, personal } from "@/lib/content";

/* Dhruv's own sentence. The second line carries the turn and the gradient.
   Never permitted to rewrap — the break is the composition. */
const THESIS_LINES = ["I build impact,", "not just apps."];

export default function Hero() {
  const { variant } = useApp();
  const def = VARIANTS[variant];
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  /* Scroll choreography: the stage recedes — scales back, softens and lifts —
     while the light behind it swells. The next section arrives over the top. */
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const stageBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
  const auraScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-14 pt-32 md:pb-16"
      aria-label="Introduction"
    >
      {/* Light behind the content */}
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ scale: auraScale }}>
        <div className="aura aura-drift left-[-10%] top-[-15%] h-[42rem] w-[42rem]" />
        <div
          className="aura aura-drift right-[-14%] top-[10%] h-[34rem] w-[34rem] opacity-40"
          style={{ background: "radial-gradient(60% 60% at 50% 50%, var(--signal-2), transparent 70%)", animationDelay: "-7s" }}
        />
      </motion.div>

      <motion.div
        data-scroll-stage
        className="shell"
        style={{
          scale: stageScale,
          y: stageY,
          opacity: stageOpacity,
          filter: stageBlur,
        }}
      >
        <div>
          <div>
            <motion.div
              className="flex flex-wrap items-center gap-x-3 gap-y-3"
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: EASE.soft, delay: 0.1 }}
            >
              <span className="t-label inline-flex items-center gap-2 rounded-full border border-signal-line bg-signal-soft px-3.5 py-2 text-signal">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                </span>
                {availability.status === "open" ? "Open to work" : "Not available"}
              </span>
              <span className="t-label rounded-full border border-line px-3.5 py-2 text-text-3">
                {person.role}
              </span>
              <span className="t-label rounded-full border border-line px-3.5 py-2 text-text-3">
                {personal.home.label}
              </span>
            </motion.div>

            <h1 className="t-hero mt-9 text-text md:mt-11">
              <span className="sr-only">
                {person.name}, {person.role} at {person.company}.{" "}
              </span>
              <MaskText
                as="span"
                immediate
                delay={0.28}
                lines={THESIS_LINES}
                /* Only the payload line takes the gradient — used once on the
                   page so it still means something. */
                lineClassName={(i, total) => (i === total - 1 ? "t-gradient pb-[0.08em]" : "")}
              />
            </h1>

            <motion.p
              key={variant}
              className="t-lead mt-8 max-w-[50ch]"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: EASE.soft, delay: 0.25 }}
            >
              {def.lede}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE.soft, delay: 0.9 }}
            >
              <Magnetic strength={12}>
                <Link
                  href="/work/pay-plus"
                  data-cursor="open"
                  data-cursor-label="Open"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-signal px-6 py-4 text-[15px] font-medium text-signal-ink"
                >
                  <span className="relative z-10">Read the flagship case study</span>
                  <span className="relative z-10 transition-transform duration-500 ease-out group-hover:translate-x-1">
                    →
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-signal-2 transition-transform duration-600 ease-out group-hover:translate-x-0" />
                </Link>
              </Magnetic>
              <Magnetic strength={12}>
                <a
                  href="#contact"
                  data-cursor="link"
                  className="inline-flex items-center gap-2.5 rounded-full border border-line-strong px-6 py-4 text-[15px] text-text transition-colors duration-500 hover:bg-surface"
                >
                  Get in touch
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>

      </motion.div>

      {/* Scroll cue — the hero is deliberately sparse, so the invitation to
          keep going has to be explicit rather than implied. */}
      <motion.a
        href="#story"
        data-cursor="link"
        className="group absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-3 md:bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE.soft, delay: 1.4 }}
        style={{ opacity: stageOpacity }}
      >
        <span className="t-label text-text-3 transition-colors duration-500 group-hover:text-text">
          Start here
        </span>
        <span aria-hidden className="relative block h-10 w-px bg-line">
          <span className="scroll-hint absolute inset-0 block bg-signal" />
        </span>
      </motion.a>
    </section>
  );
}
