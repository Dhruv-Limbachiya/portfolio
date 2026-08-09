"use client";

import { motion } from "motion/react";
import Section from "@/components/primitives/Section";
import Photo from "@/components/primitives/Photo";
import { personal, photos, person } from "@/lib/content";
import { EASE, inView } from "@/lib/motion";

/**
 * Motivation, not autobiography.
 *
 * Four points on why the work happens at all. The full career story is the
 * Experience chapter's job — this one only has to answer "what drives this
 * person", and it should be readable in about fifteen seconds.
 */
export default function Origin({ index }: { index: string }) {
  return (
    <Section
      id="story"
      index={index}
      label={personal.origin.chapter}
      meta={personal.home.label}
      titleLines={personal.origin.title}
      lede={personal.home.line}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Photo
              src={photos.portrait.src}
              alt={photos.portrait.alt}
              ratio="4 / 5"
              caption={personal.home.label}
              parallax={26}
            />
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <p className="t-label text-text-3">{person.name}</p>
              <p className="t-label text-text-3">{personal.home.label}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol className="space-y-px">
            {personal.origin.points.map((point, i) => (
              <motion.li
                key={point.lead}
                initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={inView}
                transition={{ duration: 0.95, ease: EASE.soft, delay: i * 0.09 }}
                className="group flex gap-5 rounded-lg border border-transparent px-5 py-6 transition-colors duration-700 hover:border-line hover:bg-bg-elev md:gap-7 md:px-7"
              >
                <span className="t-label tnum mt-1.5 shrink-0 text-signal">
                  0{i + 1}
                </span>
                <span>
                  <span className="t-h3 block text-text">{point.lead}</span>
                  <span className="t-body mt-2.5 block max-w-[52ch] text-text-2">
                    {point.body}
                  </span>
                </span>
              </motion.li>
            ))}
          </ol>

          <motion.figure
            className="mt-12 border-t border-line pt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 1.05, ease: EASE.soft }}
          >
            <blockquote className="t-voice text-[clamp(1.6rem,3.4vw,2.6rem)] text-text">
              “{personal.origin.pull}”
            </blockquote>
          </motion.figure>
        </div>
      </div>
    </Section>
  );
}
