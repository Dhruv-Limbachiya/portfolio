"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  transportMeta,
  type SchematicEdge,
  type SchematicNode,
  type Transport,
} from "@/lib/content";
import { EASE, inView } from "@/lib/motion";

type Props = {
  nodes: SchematicNode[];
  edges: SchematicEdge[];
  defaultNode?: string;
};

const TRANSPORT_COLOR: Record<Transport, string> = {
  mqtt: "var(--signal)",
  sdk: "var(--warn)",
  https: "var(--ok)",
  inproc: "var(--line-strong)",
};

/**
 * The interactive architecture diagram.
 *
 * Two genuinely different presentations rather than one shrunk layout:
 * a spatial diagram with routed orthogonal edges on wide screens, and a
 * linear, expandable component list on narrow ones. Both render the same
 * data, and both are fully keyboard-operable — the nodes are real buttons,
 * the SVG is decorative.
 */
export default function Schematic({ nodes, edges, defaultNode }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [spatial, setSpatial] = useState(false);
  const [selected, setSelected] = useState<string>(defaultNode ?? nodes[0].id);

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const active = byId.get(selected) ?? nodes[0];

  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px)");
    const sync = () => setSpatial(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el || !spatial) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox({ w: width, h: height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [spatial]);

  /** Node coordinates are authored 0–100, but a node is a label box with real
   *  width — mapping them straight onto the canvas pushes the outermost ones
   *  past the panel edge. Normalise the authored range into a safe inset so
   *  the diagram always fits, whatever the container size. */
  const bounds = useMemo(() => {
    const xs = nodes.map((n) => n.x);
    const ys = nodes.map((n) => n.y);
    return {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    };
  }, [nodes]);

  const INSET = 0.14;

  const pos = (node: SchematicNode) => {
    const spanX = bounds.maxX - bounds.minX || 1;
    const spanY = bounds.maxY - bounds.minY || 1;
    const nx = INSET + ((node.x - bounds.minX) / spanX) * (1 - INSET * 2);
    const ny = INSET + ((node.y - bounds.minY) / spanY) * (1 - INSET * 2);
    return { x: nx * box.w, y: ny * box.h };
  };

  /** Orthogonal routing — the schematic register, and it keeps edges
   *  readable where a straight line would cut through other nodes. */
  const routeFor = (edge: SchematicEdge) => {
    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (!from || !to) return "";
    const a = pos(from);
    const b = pos(to);
    if (Math.abs(a.y - b.y) < 2) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
    const mid = a.x + (b.x - a.x) / 2;
    return `M ${a.x} ${a.y} H ${mid} V ${b.y} H ${b.x}`;
  };

  const connections = edges.filter((e) => e.from === active.id || e.to === active.id);

  return (
    <div className="grid gap-px border border-line bg-line lg:grid-cols-12">
      {/* -------------------------------------------------------- diagram -- */}
      <div className="bg-bg-elev lg:col-span-8">
        {spatial ? (
          <div ref={wrap} className="grid-field relative h-[30rem] w-full xl:h-[34rem]">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              width={box.w}
              height={box.h}
              fill="none"
              aria-hidden
            >
              <defs>
                {edges.map((edge, i) => (
                  <path key={`def-${i}`} id={`edge-${i}`} d={routeFor(edge)} />
                ))}
              </defs>

              {edges.map((edge, i) => {
                const related = edge.from === active.id || edge.to === active.id;
                return (
                  <motion.path
                    key={`edge-${i}`}
                    d={routeFor(edge)}
                    stroke={related ? TRANSPORT_COLOR[edge.transport] : "var(--line-strong)"}
                    strokeWidth={related ? 1.5 : 1}
                    strokeOpacity={related ? 1 : 0.45}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={inView}
                    transition={{ duration: 1, ease: EASE.soft, delay: 0.15 + i * 0.06 }}
                  />
                );
              })}

              {/* Flowing data */}
              {edges.map((edge, i) => (
                <circle
                  key={`pulse-${i}`}
                  className="edge-pulse"
                  r={2.5}
                  fill={TRANSPORT_COLOR[edge.transport]}
                  style={{
                    offsetPath: `path("${routeFor(edge)}")`,
                    animationDelay: `${i * 0.42}s`,
                    opacity: edge.from === active.id || edge.to === active.id ? 1 : 0.35,
                  }}
                />
              ))}
            </svg>

            {/* Nodes are real buttons layered over the SVG */}
            {nodes.map((node) => {
              const p = pos(node);
              const isActive = node.id === selected;
              const isLinked = connections.some(
                (e) => e.from === node.id || e.to === node.id,
              );
              return (
                <button
                  key={node.id}
                  onClick={() => setSelected(node.id)}
                  onPointerEnter={() => setSelected(node.id)}
                  onFocus={() => setSelected(node.id)}
                  aria-pressed={isActive}
                  data-cursor="node"
                  style={{ left: p.x, top: p.y }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-sm border px-3 py-2 text-left backdrop-blur-sm transition-all duration-300 ${
                    isActive
                      ? "z-20 border-signal bg-surface shadow-[0_0_0_4px_var(--signal-soft)]"
                      : isLinked
                        ? "z-10 border-line-strong bg-surface-2"
                        : "border-line bg-bg-elev/90"
                  } ${node.kind === "hardware" ? "border-dashed" : ""}`}
                >
                  <span
                    className={`t-label block whitespace-nowrap ${
                      isActive ? "text-signal" : "text-text-2"
                    }`}
                  >
                    {node.label}
                  </span>
                  {node.built ? (
                    <span className="mt-1 block h-px w-full bg-signal opacity-70" />
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}

        {/* Linear presentation for narrow screens. On wide screens the
            diagram's own nodes are the real, focusable controls, so this is
            not rendered at all — an invisible duplicate would put keyboard
            focus somewhere the user cannot see. */}
        <ul className={spatial ? "hidden" : "divide-y divide-line"}>
          {nodes.map((node) => (
            <li key={node.id}>
              <button
                onClick={() => setSelected(node.id)}
                onFocus={() => setSelected(node.id)}
                aria-pressed={node.id === selected}
                data-cursor="link"
                className={`flex w-full items-start gap-4 px-5 py-4 text-left transition-colors ${
                  node.id === selected ? "bg-surface" : "hover:bg-surface/60"
                }`}
              >
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 ${
                    node.built ? "bg-signal" : "bg-line-strong"
                  }`}
                />
                <span>
                  <span className="block text-[15px] font-medium tracking-tight text-text">
                    {node.label}
                  </span>
                  <span className="t-label mt-1 block text-text-3">{node.tech}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* --------------------------------------------------------- detail -- */}
      <div className="bg-bg-elev p-6 md:p-8 lg:col-span-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: EASE.soft }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="t-label text-text-3">{kindLabel(active.kind)}</span>
              {active.built ? (
                <span className="t-label rounded-full border border-signal-line bg-signal-soft px-2 py-0.5 text-signal">
                  Built by Dhruv
                </span>
              ) : null}
            </div>

            <h4 className="t-h3 mt-4 text-text">{active.label}</h4>
            <p className="t-mono mt-2 text-signal">{active.tech}</p>

            <p className="t-body mt-6 text-text-2">{active.responsibility}</p>

            {active.failure ? (
              <div className="mt-6 border-l-2 border-warn pl-4">
                <p className="t-label text-warn">Failure mode</p>
                <p className="mt-2 text-[14px] leading-relaxed tracking-tight text-text-2">
                  {active.failure}
                </p>
              </div>
            ) : null}

            {connections.length ? (
              <div className="mt-8 border-t border-line pt-5">
                <p className="t-label text-text-3">Connections</p>
                <ul className="mt-3 space-y-2.5">
                  {connections.map((edge, i) => {
                    const otherId = edge.from === active.id ? edge.to : edge.from;
                    const other = byId.get(otherId);
                    return (
                      <li key={i} className="flex items-baseline gap-2.5">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0"
                          style={{ background: TRANSPORT_COLOR[edge.transport] }}
                        />
                        <span className="text-[13.5px] tracking-tight text-text-2">
                          {edge.from === active.id ? "→" : "←"} {other?.label}
                          <span className="t-label ml-2 text-text-3">
                            {transportMeta[edge.transport].label}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <p className="t-label mt-8 border-t border-line pt-5 text-text-3">
          {spatial ? "Hover or select any component" : "Select any component"}
        </p>
      </div>
    </div>
  );
}

function kindLabel(kind: SchematicNode["kind"]) {
  return {
    client: "Client device",
    app: "Application surface",
    module: "Module",
    service: "Service",
    hardware: "Hardware",
    external: "External system",
  }[kind];
}
