"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { person } from "@/lib/content";
import { EASE, inView } from "@/lib/motion";

/**
 * The positioning statement, revealed word by word as it is read.
 *
 * The motion has a job: it paces reading and puts the emphasis on the
 * sentence's real payload. Opacity only — no layout cost.
 */
export default function Thesis() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = person.summary.split(" ");

  return (
    <section className="relative py-24 md:py-36" aria-label="Positioning">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <motion.div
              className="t-label sticky top-28 flex items-center gap-3 text-text-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inView}
              transition={{ duration: 0.6 }}
            >
              <span className="text-signal tnum">00</span>
              <span>The claim</span>
            </motion.div>
          </div>

          <div ref={ref} className="lg:col-span-9">
            <p className="t-h3 flex flex-wrap font-normal leading-[1.35] tracking-[-0.02em] md:text-[1.7rem] md:leading-[1.4]">
              {words.map((word, i) => (
                <Word
                  key={`${word}-${i}`}
                  progress={scrollYProgress}
                  range={[i / words.length, (i + 1.8) / words.length]}
                >
                  {word}
                </Word>
              ))}
            </p>

            {/* The proof behind the headline claim. Not quoted — the quotable
                line is the headline itself, and repeating it here would spend
                it twice. */}
            <motion.p
              className="t-voice mt-14 border-l-2 border-signal pl-6 text-[clamp(1.4rem,3vw,2.3rem)] text-text md:mt-20 md:pl-8"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ duration: 0.8, ease: EASE.soft }}
            >
              {person.voice}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="mr-[0.28em] inline-block">
      <motion.span data-scroll-fade style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
}
