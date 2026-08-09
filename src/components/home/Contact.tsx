"use client";

import { useState } from "react";
import { motion } from "motion/react";
import MaskText from "@/components/primitives/MaskText";
import Magnetic from "@/components/primitives/Magnetic";
import { useApp } from "@/components/providers/AppState";
import { VARIANTS } from "@/lib/variants";
import { availability, gmailCompose, person } from "@/lib/content";
import { EASE, inView } from "@/lib/motion";

type Status = "idle" | "sending" | "sent" | "error";

/** Static hosting has no backend, so the form posts to Web3Forms. Without a
 *  key configured it degrades to a plain mail link rather than a dead form. */
const FORM_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export default function Contact({ index }: { index: string }) {
  const { variant } = useApp();
  const cta = VARIANTS[variant].cta;
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!FORM_KEY) return;

    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the mailto link is still right there */
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line py-24 md:py-36">
      <div className="shell">
        <div className="t-label flex items-center gap-3 text-text-3">
          <span className="text-signal tnum">{index}</span>
          <span>Contact</span>
        </div>

        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <MaskText
              as="h2"
              lines={["Tell me what", "you're building."]}
              className="t-h1 text-text"
            />

            <motion.p
              className="t-lead mt-8 max-w-[44ch] text-text-2"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.7, ease: EASE.soft, delay: 0.15 }}
            >
              {cta.sub}
            </motion.p>

            {/* Both doors, always visible — one is emphasised by the build target */}
            <motion.dl
              className="mt-12 space-y-px border border-line bg-line"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inView}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div
                className={`bg-bg-elev p-5 ${variant === "consulting" ? "" : "border-l-2 border-signal"}`}
              >
                <dt className="t-label text-text-3">Roles</dt>
                <dd className="mt-2 text-[15px] leading-relaxed tracking-tight text-text-2">
                  {availability.hiring}
                </dd>
              </div>
              <div
                className={`bg-bg-elev p-5 ${variant === "consulting" ? "border-l-2 border-signal" : ""}`}
              >
                <dt className="t-label text-text-3">Consulting</dt>
                <dd className="mt-2 text-[15px] leading-relaxed tracking-tight text-text-2">
                  {availability.consulting}
                </dd>
              </div>
            </motion.dl>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inView}
              transition={{ duration: 0.7, delay: 0.28 }}
            >
              <Magnetic strength={8}>
                <a
                  href={`mailto:${person.email}`}
                  data-cursor="link"
                  className="t-mono inline-flex items-center gap-2.5 rounded-sm border border-line px-4 py-3 text-text transition-colors hover:border-signal hover:text-signal"
                >
                  {person.email}
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={copyEmail}
                data-cursor="link"
                className="t-label inline-flex min-h-11 items-center rounded-sm border border-line px-3.5 text-text-3 transition-colors hover:border-line-strong hover:text-text"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="link"
                className="t-label inline-flex min-h-11 items-center rounded-sm border border-line px-3.5 text-text-3 transition-colors hover:border-line-strong hover:text-text"
              >
                LinkedIn ↗
              </a>
              <a
                href={person.github}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="link"
                className="t-label inline-flex min-h-11 items-center rounded-sm border border-line px-3.5 text-text-3 transition-colors hover:border-line-strong hover:text-text"
              >
                GitHub ↗
              </a>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.8, ease: EASE.soft, delay: 0.1 }}
          >
            <div className="rounded-sm border border-line bg-bg-elev p-6 md:p-8">
              {FORM_KEY ? (
                <form onSubmit={onSubmit} className="space-y-5">
                  <input type="hidden" name="access_key" value={FORM_KEY} />
                  <input
                    type="hidden"
                    name="subject"
                    value={`Portfolio enquiry — ${VARIANTS[variant].label}`}
                  />
                  {/* Honeypot */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <Field id="name" label="Name" name="name" autoComplete="name" />
                  <Field
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                  <Field id="message" label="What are you working on?" name="message" multiline />

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      data-cursor="link"
                      className="inline-flex items-center gap-2.5 rounded-sm bg-signal px-5 py-3.5 text-[14px] font-medium tracking-tight text-signal-ink transition-[filter,opacity] hover:brightness-110 disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending…" : cta.label}
                      <span aria-hidden>→</span>
                    </button>

                    <p aria-live="polite" className="t-label">
                      {status === "sent" ? (
                        <span className="text-ok">Sent — I&apos;ll reply shortly.</span>
                      ) : status === "error" ? (
                        <span className="text-fail">
                          Something failed. Email me directly instead.
                        </span>
                      ) : null}
                    </p>
                  </div>
                </form>
              ) : (
                <div>
                  <p className="t-label text-text-3">Direct</p>
                  <p className="t-lead mt-4 max-w-[38ch]">
                    Email is the fastest route. I read everything and reply to anything
                    concrete.
                  </p>
                  <Magnetic strength={12}>
                    <a
                      href={gmailCompose(
                        `Hello Dhruv — ${VARIANTS[variant].label}`,
                        `Hi Dhruv,\n\n`,
                      )}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="link"
                      className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full bg-signal px-6 py-4 text-[15px] font-medium text-signal-ink"
                    >
                      <span className="relative z-10">{cta.label}</span>
                      <span className="relative z-10 transition-transform duration-500 ease-out group-hover:translate-x-1">
                        →
                      </span>
                      <span className="absolute inset-0 -translate-x-full bg-signal-2 transition-transform duration-600 ease-out group-hover:translate-x-0" />
                    </a>
                  </Magnetic>
                  <p className="t-label mt-5 text-text-3">
                    Opens a Gmail draft addressed to {person.email}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  multiline = false,
  autoComplete,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
}) {
  const shared =
    "w-full rounded-sm border border-line bg-surface px-4 py-3 text-[15px] tracking-tight text-text placeholder:text-text-3 transition-colors focus:border-signal focus:outline-none";

  return (
    <div>
      <label htmlFor={id} className="t-label mb-2 block text-text-3">
        {label}
      </label>
      {multiline ? (
        <textarea id={id} name={name} rows={5} required className={`${shared} resize-none`} />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required
          autoComplete={autoComplete}
          className={shared}
        />
      )}
    </div>
  );
}
