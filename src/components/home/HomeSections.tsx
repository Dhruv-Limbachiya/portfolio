"use client";

import { useApp } from "@/components/providers/AppState";
import { VARIANTS, type SectionId } from "@/lib/variants";
import Origin from "./Origin";
import Proof from "./Proof";
import Work from "./Work";
import Tooling from "./Tooling";
import Expertise from "./Expertise";
import Experience from "./Experience";
import Beyond from "./Beyond";
import Contact from "./Contact";
import Recompile, { RecompileAnnouncer } from "./Recompile";

const REGISTRY: Record<SectionId, React.ComponentType<{ index: string }>> = {
  story: Origin,
  proof: Proof,
  work: Work,
  tooling: Tooling,
  expertise: Expertise,
  journey: Experience,
  beyond: Beyond,
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Resolves the home page for the selected reading path.
 *
 * Every chapter renders in every path — only the order changes. Chapter
 * numbers follow the resolved order rather than being hard-coded, so the
 * numbering always matches what the reader is actually seeing.
 */
export default function HomeSections() {
  const { variant } = useApp();
  const order = VARIANTS[variant].order;

  return (
    <>
      <Recompile />
      <RecompileAnnouncer />
      {order.map((id, i) => {
        const Component = REGISTRY[id];
        return <Component key={id} index={pad(i + 1)} />;
      })}
      <Contact index={pad(order.length + 1)} />
    </>
  );
}
