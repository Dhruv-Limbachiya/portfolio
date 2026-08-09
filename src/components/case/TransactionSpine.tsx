"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { SpineStage } from "@/lib/content";
import { EASE, inView } from "@/lib/motion";

const STATE_STYLE: Record<SpineStage["state"], { color: string; label: string }> = {
  pending: { color: "var(--text-3)", label: "Pending" },
  active: { color: "var(--signal)", label: "In flight" },
  ok: { color: "var(--ok)", label: "Approved" },
  warn: { color: "var(--warn)", label: "Unresolved" },
  fail: { color: "var(--fail)", label: "Reconciling" },
};

/**
 * One transaction, end to end, as the spine of the case study.
 *
 * Scroll position is transaction state: the sticky readout on the left is a
 * live status panel that changes as the payment moves. It deliberately ends
 * on the failure path rather than on success — in a payment system that is
 * the part worth reading.
 */
export default function TransactionSpine({ stages }: { stages: SpineStage[] }) {
  const [active, setActive] = useState(0);
  const current = stages[active];
  const style = STATE_STYLE[current.state];

  return (
    <div className="shell">
      <div className="grid gap-x-16 lg:grid-cols-12">
        {/* ------------------------------------------------- status panel -- */}
        <div className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-28">
            <div className="rounded-sm border border-line bg-bg-elev p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="t-label text-text-3">Transaction state</span>
                <span
                  className="t-label inline-flex items-center gap-2"
                  style={{ color: style.color }}
                >
                  <motion.span
                    key={current.state}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: style.color }}
                    animate={{ opacity: [1, 0.35, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {style.label}
                </span>
              </div>

              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE.soft }}
                className="mt-7"
              >
                <span className="t-h1 tnum block leading-none" style={{ color: style.color }}>
                  {current.index}
                </span>
                <h3 className="t-h3 mt-4 text-text">{current.title}</h3>
                {current.note ? (
                  <p className="t-mono mt-4 text-text-3">{current.note}</p>
                ) : null}
              </motion.div>

              {/* Rail */}
              <ol className="mt-8 border-t border-line pt-6">
                {stages.map((stage, i) => {
                  const passed = i <= active;
                  return (
                    <li key={stage.id} className="flex items-center gap-3 py-1.5">
                      <span
                        className="h-1.5 w-1.5 shrink-0 transition-colors duration-500"
                        style={{
                          background: passed ? STATE_STYLE[stage.state].color : "var(--line)",
                        }}
                      />
                      <span
                        className={`t-label transition-colors duration-500 ${
                          i === active ? "text-text" : passed ? "text-text-2" : "text-text-3"
                        }`}
                      >
                        {stage.title}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------- the spine -- */}
        <ol className="lg:col-span-8">
          {stages.map((stage, i) => {
            const stageStyle = STATE_STYLE[stage.state];
            return (
              <motion.li
                key={stage.id}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-48% 0px -48% 0px", amount: 0 }}
                className="relative border-l border-line py-14 pl-8 first:pt-0 md:py-20 md:pl-12"
              >
                {/* Node on the spine */}
                <span
                  className="absolute -left-[4.5px] top-16 h-2 w-2 rounded-full md:top-[5.5rem]"
                  style={{ background: stageStyle.color }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.7, ease: EASE.soft }}
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="t-label tnum" style={{ color: stageStyle.color }}>
                      {stage.index}
                    </span>
                    <span className="t-label text-text-3">{stage.title}</span>
                    <span
                      className="t-label rounded-full border px-2 py-0.5 lg:hidden"
                      style={{ color: stageStyle.color, borderColor: stageStyle.color }}
                    >
                      {stageStyle.label}
                    </span>
                  </div>

                  <h3 className="t-h2 mt-5 max-w-[20ch] text-text">{stage.headline}</h3>
                  <p className="t-lead mt-6 max-w-[58ch] text-text-2">{stage.body}</p>

                  {stage.note ? (
                    <p className="t-mono mt-7 inline-block rounded-sm border border-line bg-surface px-3 py-2 text-text-3 lg:hidden">
                      {stage.note}
                    </p>
                  ) : null}
                </motion.div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
