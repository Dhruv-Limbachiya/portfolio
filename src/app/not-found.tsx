import Link from "next/link";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center">
      <div className="shell">
        <p className="t-label text-signal">404 — no such build target</p>
        <h1 className="t-h1 mt-6 max-w-[16ch] text-text">
          That module didn&apos;t resolve.
        </h1>
        <p className="t-lead mt-6 max-w-[46ch] text-text-2">
          The page you asked for isn&apos;t part of this build. Everything else is one
          link away.
        </p>
        <Link
          href="/"
          data-cursor="link"
          className="mt-10 inline-flex items-center gap-2.5 rounded-sm bg-signal px-5 py-3.5 text-[14px] font-medium tracking-tight text-signal-ink"
        >
          Back to the start <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
