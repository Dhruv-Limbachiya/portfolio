"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { photos, person } from "@/lib/content";
import { EASE, inView } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "4 / 5". */
  ratio?: string;
  className?: string;
  /** Drift distance in px for the parallax. 0 disables it. */
  parallax?: number;
  /** Shown on the fallback panel while no photograph exists. */
  caption?: string;
  priority?: boolean;
};

/**
 * A photograph that uncovers rather than fades in — a curtain lifting off a
 * print, with the image easing out of a slight over-scale behind it. Reads
 * as physical, which is the whole point of the paper surfaces.
 *
 * Until real files exist, this renders a designed typographic panel instead
 * of a broken image, so the page is never in a half-finished state.
 */
export default function Photo({
  src,
  alt,
  ratio = "4 / 5",
  className,
  parallax = 40,
  caption,
  priority = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <motion.figure
      ref={ref}
      data-uncover
      className={`relative overflow-hidden rounded-md bg-surface ${className ?? ""}`}
      style={{ aspectRatio: ratio }}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={inView}
      transition={{ duration: 1.5, ease: EASE.drift }}
    >
      {photos.ready ? (
        <motion.img
          /* A plain <img> does not get the basePath that next/image applies
             automatically, and this deploys to a project repo path when
             NEXT_PUBLIC_BASE_PATH is set. */
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full scale-[1.12] object-cover"
          style={parallax ? { y } : undefined}
        />
      ) : (
        <div className="daylight absolute inset-0 flex flex-col justify-between p-6 md:p-8">
          <span className="t-label text-text-3">{caption ?? "Photograph"}</span>

          <span
            aria-hidden
            className="t-voice select-none text-[clamp(4rem,14vw,9rem)] leading-none text-signal opacity-25"
          >
            {person.shortName[0]}
            {person.name.split(" ")[1][0]}
          </span>

          <span className="t-label text-text-3">
            {photos.ready ? "" : "Photograph to follow"}
          </span>
        </div>
      )}

      {/* A print has an edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-line-strong/40"
      />
    </motion.figure>
  );
}
