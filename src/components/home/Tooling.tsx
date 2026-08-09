"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Section from "@/components/primitives/Section";
import { tooling } from "@/lib/content";
import { EASE, inView, springSnappy } from "@/lib/motion";

/**
 * Systems & Tooling — the strongest staff-level evidence, and the part that
 * appears nowhere on the CV.
 *
 * Implemented as a real WAI-ARIA tablist with roving focus, so the
 * progressive disclosure is fully keyboard-operable.
 */
export default function Tooling({ index }: { index: string }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tool = tooling[active];

  const onKeyDown = (event: React.KeyboardEvent) => {
    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const back = event.key === "ArrowUp" || event.key === "ArrowLeft";
    if (!forward && !back) return;
    event.preventDefault();
    const next = (active + (forward ? 1 : -1) + tooling.length) % tooling.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section
      id="tooling"
      index={index}
      label="Systems &amp; tooling"
      meta={`module: tooling · ${tooling.length} systems`}
      titleLines={["The work other", "engineers build on."]}
      lede="Four internal systems built alongside the products — each one removing a category of manual work rather than a single task."
    >
      <div className="grid gap-px border border-line bg-line lg:grid-cols-12">
        {/* Index */}
        <div
          role="tablist"
          aria-label="Internal systems and tooling"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="flex gap-px overflow-x-auto bg-line lg:col-span-5 lg:flex-col lg:overflow-visible"
        >
          {tooling.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tool-tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`tool-panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                data-cursor="link"
                className={`relative min-w-[76vw] flex-1 bg-bg-elev px-5 py-6 text-left outline-offset-[-2px] transition-colors duration-400 sm:min-w-[52vw] lg:min-w-0 lg:px-7 lg:py-7 ${
                  selected ? "bg-surface" : "hover:bg-surface/60"
                }`}
              >
                {selected ? (
                  <motion.span
                    layoutId="tool-marker"
                    transition={springSnappy}
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-signal lg:bottom-auto lg:top-0 lg:h-full lg:w-0.5"
                  />
                ) : null}

                <div className="flex items-baseline justify-between gap-4">
                  <span className="t-label text-text-3">
                    <span className="mr-3 text-signal tnum">0{i + 1}</span>
                    {item.kind}
                  </span>
                </div>

                <h3
                  className={`t-h3 mt-3 transition-colors duration-300 ${
                    selected ? "text-text" : "text-text-2"
                  }`}
                >
                  {item.name}
                </h3>

                {item.command ? (
                  <code className="t-mono mt-2 inline-block rounded-sm border border-signal-line bg-signal-soft px-2 py-0.5 text-signal">
                    {item.command}
                  </code>
                ) : null}

                <p className="mt-3 max-w-[46ch] text-[14.5px] leading-relaxed tracking-tight text-text-2">
                  {item.claim}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="bg-bg-elev p-6 md:p-9 lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={tool.id}
              role="tabpanel"
              id={`tool-panel-${tool.id}`}
              aria-labelledby={`tool-tab-${tool.id}`}
              tabIndex={0}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE.soft }}
              className="flex h-full flex-col outline-offset-4"
            >
              <div className="t-label flex items-center gap-2 text-text-3">
                <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                In production at Petpooja
              </div>

              <p className="t-lead mt-6 max-w-[54ch] text-text">{tool.body}</p>

              <div className="mt-auto pt-10">
                <div className="border-t border-line pt-6">
                  <p className="t-label text-text-3">Why it matters</p>
                  <p className="mt-2.5 max-w-[48ch] text-[15px] tracking-tight text-signal">
                    {tool.impact}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {tool.tech.map((tech) => (
                    <span
                      key={tech}
                      className="t-label rounded-sm border border-line px-2 py-1 text-text-3"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.p
        className="t-mono mt-5 max-w-[70ch] text-text-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Described at capability level. Implementation details, internal endpoints and
        partner specifics are deliberately omitted.
      </motion.p>
    </Section>
  );
}
