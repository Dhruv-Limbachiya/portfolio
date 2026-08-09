import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, person, siteMeta } from "@/lib/content";
import Reveal from "@/components/primitives/Reveal";
import MaskText from "@/components/primitives/MaskText";
import TransactionSpine from "@/components/case/TransactionSpine";
import Schematic from "@/components/case/Schematic";
import CaseSection from "@/components/case/CaseSection";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};

  const title = `${study.title} — ${study.subtitle}`;
  return {
    title: `${study.title} · ${study.subtitle}`,
    description: study.oneLine,
    alternates: { canonical: `/work/${study.slug}/` },
    openGraph: {
      type: "article",
      title,
      description: study.oneLine,
      url: `${siteMeta.url}/work/${study.slug}/`,
    },
    twitter: { card: "summary_large_image", title, description: study.oneLine },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  const others = caseStudies.filter((c) => c.slug !== study.slug);
  const next = others[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${study.title} — ${study.subtitle}`,
    description: study.oneLine,
    author: { "@type": "Person", name: person.name, url: siteMeta.url },
    about: study.stack.join(", "),
    isPartOf: { "@type": "WebSite", name: person.name, url: siteMeta.url },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ------------------------------------------------------------ hero */}
      <header className="border-b border-line pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="shell">
          <Reveal>
            <Link
              href="/#work"
              data-cursor="link"
              className="t-label inline-flex items-center gap-2 text-text-3 transition-colors hover:text-signal"
            >
              <span aria-hidden>←</span> All work
            </Link>
          </Reveal>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
            <Reveal delay={1}>
              <span className="t-label rounded-full border border-signal-line bg-signal-soft px-2.5 py-1 text-signal">
                {study.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={2}>
              <span className="t-label text-text-3">
                {study.org} · {study.years}
              </span>
            </Reveal>
          </div>

          <MaskText
            as="h1"
            immediate
            delay={0.15}
            lines={[study.title]}
            className="t-display mt-8 text-text"
          />

          <Reveal delay={3}>
            <p className="t-h2 mt-6 max-w-[22ch] font-normal text-text-2">{study.subtitle}</p>
          </Reveal>

          <Reveal delay={4}>
            <p className="t-lead mt-10 max-w-[66ch] text-text-2">{study.oneLine}</p>
          </Reveal>

          <Reveal delay={5}>
            <dl className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              <Meta label="Role" value={study.role} />
              <Meta label="Organisation" value={study.org} />
              <Meta label="Period" value={study.years} />
              <Meta label="Surface" value={study.stack.slice(0, 3).join(" · ")} />
            </dl>
          </Reveal>

          <Reveal delay={6}>
            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 rounded-sm border border-line bg-bg-elev p-6 md:p-8">
              {study.metrics.map((metric) => (
                <li key={metric.label}>
                  <div className="t-h2 tnum text-signal">{metric.value}</div>
                  <div className="t-label mt-2 text-text-3">{metric.label}</div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={7}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <li
                  key={tech}
                  className="t-label rounded-sm border border-line px-2.5 py-1.5 text-text-3"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </header>

      {/* --------------------------------------------------------- problem */}
      <CaseSection index="01" label="The problem" title={["What was broken."]}>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="t-h3 max-w-[34ch] font-normal leading-snug text-text">
                {study.problem}
              </p>
            </Reveal>
            <Reveal delay={1}>
              <p className="t-body mt-8 max-w-[62ch] text-text-2">{study.context}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={2}>
              <div className="rounded-sm border border-line bg-bg-elev p-6 md:p-7">
                <p className="t-label text-text-3">Constraints</p>
                <ul className="mt-5 space-y-4">
                  {study.constraints.map((constraint) => (
                    <li key={constraint} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-signal" />
                      <span className="text-[14.5px] leading-relaxed tracking-tight text-text-2">
                        {constraint}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </CaseSection>

      {/* ------------------------------------------------------------ spine */}
      {study.spine ? (
        <section className="border-y border-line bg-bg-elev/40 py-24 md:py-32">
          <div className="shell">
            <div className="t-label flex items-center gap-3 text-text-3">
              <span className="text-signal tnum">02</span>
              <span>One transaction, end to end</span>
            </div>
            <MaskText
              as="h2"
              lines={["Follow the money", "through the system."]}
              className="t-h2 mt-8 max-w-[18ch] text-text"
            />
            <Reveal delay={1}>
              <p className="t-lead mt-8 max-w-[56ch] text-text-2">
                Scroll position is transaction state. It ends where payment systems
                actually get hard — on the path where the money moved and the software
                never found out.
              </p>
            </Reveal>
          </div>

          <div className="mt-20">
            <TransactionSpine stages={study.spine} />
          </div>
        </section>
      ) : null}

      {/* ----------------------------------------------------- architecture */}
      {study.schematic ? (
        <CaseSection
          index={study.spine ? "03" : "02"}
          label="Architecture"
          title={["The system,", "component by component."]}
          lede="Select any component to see what it is responsible for, how it communicates, and how it fails."
        >
          <Schematic
            nodes={study.schematic.nodes}
            edges={study.schematic.edges}
            defaultNode="vendor"
          />
        </CaseSection>
      ) : null}

      {/* --------------------------------------------------------- approach */}
      <CaseSection
        index={study.spine ? "04" : study.schematic ? "03" : "02"}
        label="Approach"
        title={["What I built,", "and in what order."]}
      >
        <ol className="border-t border-line">
          {study.approach.map((step, i) => (
            <li key={step.title} className="border-b border-line">
              <Reveal delay={i}>
                <div className="grid gap-x-16 gap-y-4 py-10 md:py-12 lg:grid-cols-12">
                  <div className="t-label flex items-start gap-4 text-signal tnum lg:col-span-2">
                    0{i + 1}
                  </div>
                  <h3 className="t-h3 text-text lg:col-span-4">{step.title}</h3>
                  <p className="t-body max-w-[58ch] text-text-2 lg:col-span-6">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </CaseSection>

      {/* -------------------------------------------------------- decisions */}
      {study.decisions?.length ? (
        <CaseSection
          index="05"
          label="Decisions"
          title={["The trade-offs,", "stated plainly."]}
          lede="Every one of these had a cheaper alternative. Here is why it wasn't taken."
        >
          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            {study.decisions.map((item, i) => (
              <Reveal key={item.decision} delay={i % 2} className="bg-bg-elev p-6 md:p-8">
                <p className="t-label text-signal">Decision</p>
                <h3 className="t-h3 mt-3 max-w-[26ch] text-text">{item.decision}</h3>

                <p className="t-label mt-7 text-text-3">Instead of</p>
                <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed tracking-tight text-text-2 line-through decoration-line-strong">
                  {item.instead}
                </p>

                <p className="t-label mt-7 text-text-3">Because</p>
                <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed tracking-tight text-text-2">
                  {item.because}
                </p>
              </Reveal>
            ))}
          </div>
        </CaseSection>
      ) : null}

      {/* ------------------------------------------------------- challenges */}
      <CaseSection
        index={study.decisions?.length ? "06" : "05"}
        label="Challenges"
        title={["Where it got hard."]}
      >
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {study.challenges.map((challenge, i) => (
            <Reveal key={challenge.title} delay={i} className="bg-bg-elev p-6 md:p-8">
              <span className="t-label tnum text-text-3">0{i + 1}</span>
              <h3 className="t-h3 mt-4 max-w-[20ch] text-text">{challenge.title}</h3>
              <p className="t-body mt-5 text-text-2">{challenge.body}</p>
            </Reveal>
          ))}
        </div>
      </CaseSection>

      {/* ----------------------------------------------------------- result */}
      <CaseSection
        index={study.decisions?.length ? "07" : "06"}
        label="Result"
        title={["What it produced."]}
      >
        <ul className="border-t border-line">
          {study.result.map((item, i) => (
            <li key={item} className="border-b border-line">
              <Reveal delay={i}>
                <div className="flex items-baseline gap-6 py-7 md:gap-10 md:py-8">
                  <span className="t-label shrink-0 text-signal tnum">0{i + 1}</span>
                  <p className="t-lead max-w-[62ch] text-text">{item}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {study.retrospective ? (
          <Reveal delay={2}>
            <figure className="mt-16 border-l-2 border-signal pl-6 md:pl-8">
              <p className="t-label text-text-3">In retrospect</p>
              <blockquote className="t-voice mt-5 max-w-[40ch] text-[clamp(1.4rem,2.8vw,2.1rem)] leading-[1.28] text-text">
                {study.retrospective}
              </blockquote>
            </figure>
          </Reveal>
        ) : null}
      </CaseSection>

      {/* ------------------------------------------------------------- next */}
      <nav className="border-t border-line" aria-label="More work">
        <div className="shell py-16 md:py-20">
          <p className="t-label text-text-3">Next</p>
          <Link
            href={`/work/${next.slug}`}
            data-cursor="open"
            data-cursor-label="Open"
            className="group mt-6 flex flex-wrap items-end justify-between gap-6"
          >
            <div>
              <h2 className="t-h1 text-text transition-transform duration-500 group-hover:translate-x-2">
                {next.title}
              </h2>
              <p className="t-lead mt-3 max-w-[40ch] text-text-2">{next.subtitle}</p>
            </div>
            <span
              aria-hidden
              className="t-h2 text-text-3 transition-all duration-500 group-hover:translate-x-2 group-hover:text-signal"
            >
              →
            </span>
          </Link>

          <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8">
            {others.slice(1).map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/work/${other.slug}`}
                  data-cursor="link"
                  className="t-label text-text-3 transition-colors hover:text-signal"
                >
                  {other.title} ↗
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-elev p-5">
      <dt className="t-label text-text-3">{label}</dt>
      <dd className="mt-2 text-[15px] tracking-tight text-text">{value}</dd>
    </div>
  );
}
