"use client";

import { motion, type Variants } from "motion/react";
import { DUR, EASE, inView, STAGGER } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger index within a group. */
  delay?: number;
  /** Distance travelled. Keep small — this is settling, not sliding. */
  y?: number;
  as?: "div" | "li" | "section" | "article" | "span";
};

/** The default entrance. Everything that appears on scroll uses this. */
export default function Reveal({ children, className, delay = 0, y = 18, as = "div" }: Props) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: DUR.enter, ease: EASE.soft, delay: delay * STAGGER },
    },
  };

  const Comp = motion[as];

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      {children}
    </Comp>
  );
}
