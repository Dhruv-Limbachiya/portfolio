"use client";

import Link from "next/link";
import { person } from "@/lib/content";

export default function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1.5">
          <Link
            href="/"
            data-cursor="link"
            className="-my-1.5 inline-flex w-fit py-1.5 text-[15px] font-medium tracking-tight"
          >
            {person.name}
          </Link>
          <p className="t-label text-text-3">
            {person.role} · {person.location}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={person.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="link"
            className="t-label -my-2 inline-flex min-h-11 items-center py-2 text-text-2 transition-colors hover:text-signal"
          >
            LinkedIn ↗
          </a>
          <a
            href={person.github}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="link"
            className="t-label -my-2 inline-flex min-h-11 items-center py-2 text-text-2 transition-colors hover:text-signal"
          >
            GitHub ↗
          </a>
          <a
            href={`mailto:${person.email}`}
            data-cursor="link"
            className="t-label -my-2 inline-flex min-h-11 items-center py-2 text-text-2 transition-colors hover:text-signal"
          >
            Email ↗
          </a>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-label text-text-3">© {year} {person.name}</p>
        <p className="t-label text-text-3">
          Built with Next.js · Type set in Inter Tight, JetBrains Mono &amp; Instrument Serif
        </p>
      </div>
    </footer>
  );
}
