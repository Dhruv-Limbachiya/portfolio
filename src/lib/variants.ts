/**
 * Reading paths.
 *
 * Three people arrive at this site wanting different things. Rather than
 * compromising on one order that half-serves all of them, the page re-orders
 * itself for whoever is reading.
 *
 * Hard rule: a path NEVER hides content. Every chapter exists in every path.
 * Only the order changes, and the site is complete without ever touching
 * the control.
 */

export const VARIANT_IDS = ["hiring", "engineering", "consulting"] as const;
export type VariantId = (typeof VARIANT_IDS)[number];

/** Chapters that participate in re-ordering. The opening, the claim and the
 *  contact close are fixed — they're the frame, not the contents. */
export const SECTION_IDS = [
  "story",
  "proof",
  "work",
  "tooling",
  "expertise",
  "journey",
  "beyond",
] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export type VariantDef = {
  id: VariantId;
  /** Shown in the control. */
  label: string;
  /** Who this path is for. */
  audience: string;
  /** What this ordering puts first. */
  resolution: string;
  /** Hero support line — emphasis changes, never the facts. */
  lede: string;
  order: readonly SectionId[];
  cta: { label: string; sub: string };
};

export const VARIANTS: Record<VariantId, VariantDef> = {
  hiring: {
    id: "hiring",
    label: "Hiring",
    audience: "Engineering managers, CTOs and technical recruiters",
    resolution: "Outcomes first, architecture underneath.",
    lede: "Six years. 20+ apps. Government apps to F&B.",
    order: ["story", "proof", "work", "journey", "tooling", "expertise", "beyond"],
    cta: {
      label: "Start a conversation",
      sub: "Open to Senior and Staff mobile roles — Ahmedabad or remote.",
    },
  },
  engineering: {
    id: "engineering",
    label: "Engineering",
    audience: "Engineers who want to read the architecture",
    resolution: "Architecture and internal tooling first, outcomes as evidence.",
    lede: "Six years. 20+ apps. Multi-module Gradle, MQTT, native-to-Flutter migrations.",
    order: ["story", "work", "tooling", "expertise", "proof", "journey", "beyond"],
    cta: {
      label: "Talk architecture",
      sub: "Happy to go deeper on any decision on this site.",
    },
  },
  consulting: {
    id: "consulting",
    label: "Consulting",
    audience: "Founders and teams with a specific problem",
    resolution: "Capability first, with the work that proves each one.",
    lede: "Six years. 20+ apps. Android, Flutter, and payment integrations that hold up.",
    order: ["story", "proof", "expertise", "tooling", "work", "journey", "beyond"],
    cta: {
      label: "Discuss a project",
      sub: "Available for payment integration, platform architecture and migration work.",
    },
  },
};

export const DEFAULT_VARIANT: VariantId = "hiring";

export function isVariantId(value: unknown): value is VariantId {
  return typeof value === "string" && (VARIANT_IDS as readonly string[]).includes(value);
}
