/**
 * Single source of truth for every factual claim on this site.
 *
 * Rules enforced here:
 *  - Nothing is invented. Everything traces to the CV or to Dhruv's own answers.
 *  - No EDC partner is ever named. Vendors are referred to generically or as
 *    neutral labels (Vendor A…M). Build commands use the same neutral labels.
 *  - Metrics always travel with the engineering that produced them.
 */

export const person = {
  name: "Dhruv Limbachiya",
  shortName: "Dhruv",
  role: "Senior Software Engineer — Mobile",
  company: "Petpooja",
  location: "Ahmedabad, India",
  email: "dhruv.mail4work@gmail.com",
  linkedin: "https://www.linkedin.com/in/dhruv-limbachiya/",
  github: "https://github.com/Dhruv-Limbachiya",
  yearsExperience: "6+",
  since: 2020,

  /** The claim the whole site argues for — and Dhruv's own sentence, not a
   *  slogan written for him. It leads the page because nothing written about
   *  someone lands as well as something they actually said. */
  thesis: "I build impact, not just apps.",

  /** Follows the thesis in the opening. The proof behind the claim. */
  voice: "Apps that go to work — the POS at the counter, the tablet a waiter carries, the screen the kitchen reads, the terminal a biller takes payment on.",

  summary:
    "Six years, 20+ mobile apps, two companies. At Silver Touch I built for state government — sports administration across 25+ districts, and the National War Memorial app. At Petpooja I own the app that takes the payment, whether that's a card, UPI or a QR code, plus the tablet waiters take orders on and the screen the kitchen reads.",
} as const;

/* -------------------------------------------------------------- personal -- */

/**
 * Photography.
 *
 * Until real files exist in /public/photos, every photo slot renders a
 * designed typographic panel instead of a broken image — the page is never
 * in a half-finished state. Flip `ready` to true once the files are in.
 */
/**
 * One photograph, used once. A single well-placed portrait carries more
 * than a gallery — and the chapter it sits in is about the person, not the
 * places.
 */
export const photos = {
  ready: true,
  portrait: {
    src: "/photos/portrait.jpg",
    alt: `${person.name} on a hilltop, mountains behind him`,
  },
} as const;

export const personal = {
  home: {
    label: "Ahmedabad, India",
    line: "Born here, raised here, still here.",
  },

  /** Motivation, not autobiography. Short, specific, scannable. */
  origin: {
    chapter: "How it started",
    title: ["Why I build."],
    points: [
      {
        lead: "Make something useful",
        body: "To me, or to anyone. That's been the whole driver since before I could write code.",
      },
      {
        lead: "Mobile, for reach",
        body: "A phone is the one screen almost everyone already has. Android first, then Flutter so the same codebase ships to iOS as well — build there and the thing actually gets used.",
      },
      {
        lead: "Learn by shipping",
        body: "Udacity for the basics. Everything since: build it, break it, fix it, ship it.",
      },
      {
        lead: "Automate the second time",
        body: "If I've done it by hand twice, I'd rather spend a week removing the work than a year repeating it.",
      },
    ],
    pull: "I picked mobile for one reason. Reach.",
  },

  /** Life outside the work. */
  outside: {
    chapter: "Away from the screen",
    title: ["The rest of it."],
    items: [
      {
        title: "Family",
        body: "Most of my time outside work goes to my family. It's also the thing I'm proudest of, and it has nothing to do with engineering — they are supportive and they are lovely.",
        tag: "Proudest of",
      },
      {
        title: "The history of India's legends",
        body: "The one thing I read that has nothing to do with software.",
        tag: "Reading",
      },
      {
        title: "New and trending tech",
        body: "I'd rather have used something than have an opinion about it. Right now that's agentic AI.",
        tag: "Learning",
      },
      {
        title: "How money grows",
        body: "Studied the same way I study anything else — from the fundamentals, until I understand the mechanism.",
        tag: "Studying",
      },
    ],
  },

  /** How he works, read off six years of evidence rather than adjectives. */
  working: {
    chapter: "To work with",
    title: ["How I actually work."],
    traits: [
      {
        claim: "I take the surface, not the ticket",
        body: "Pay+, the KDS rebuild, the Sports Authority app — each one owned end to end. Give me the whole problem and I'll come back with something that ships.",
      },
      {
        claim: "Second time by hand, I automate it",
        body: "Four branches became thirteen modules. Manual API updates became one command. Onboarding a new EDC went from days to hours.",
      },
      {
        claim: "I go quiet while I'm building",
        body: "Heads-down is the default. If I've stopped talking, the work is moving.",
      },
      {
        claim: "I'll disagree, then commit",
        body: "Quiet isn't the same as agreeable. If a decision is wrong for the product or for the people building it, I'll say so once, clearly — then get behind whatever we land on.",
      },
      {
        claim: "The team isn't a resource pool",
        body: "I treat the people I work with like family. If someone's stuck, that's my problem too.",
      },
      {
        claim: "I design the failure path first",
        body: "In payments the happy path is the easy half. The five-minute hold, the trace log, the manual invoice mapping — that's where the real work is.",
      },
    ],
  },

  /** What he's chasing right now. */
  curious: {
    chapter: "Right now",
    title: "Agentic AI",
    body: "I'm learning agentic AI — not as a trend to have an opinion about, but by building with it. The EDC integration skills and the /api-sync command on this site both came out of that: if a tool can remove work from a person, I'd rather find out first-hand.",
  },

  /** The belief he'd argue for. */
  belief: {
    chapter: "One thing I'd argue about",
    statement:
      "Engineering isn't easily replaceable by AI. I think AI makes engineering better — more robust, more scalable, closer to error-free, and more centred on the person actually using the thing.",
    support:
      "I say that as someone who uses it every day. The tools didn't replace the judgement calls on this site — the module boundaries, the transport choice, the five-minute reconciliation window. They removed the work around those calls so there was more room to make them well.",
  },
} as const;

/* ------------------------------------------------------------------ meta -- */

export const siteMeta = {
  title: `${person.name} — Mobile Platform Engineer`,
  tagline: "Payments, build systems and cross-platform architecture at scale.",
  description:
    "Dhruv Limbachiya is a mobile platform engineer specialising in payment systems, multi-module Android architecture and Flutter. Sole technical owner of a payment application processing ₹11+ Crore in 30 days across 13 EDC integrations.",
  url: "https://dhruv-limbachiya.github.io",
  ogImage: "/og.png",
} as const;

/* ------------------------------------------------------------- headline --- */

/**
 * Headline proof. Every number is animated up from zero on screen, so the
 * numeric part is stored separately from its decoration.
 */
export type Metric = {
  prefix?: string;
  to: number;
  decimals?: number;
  suffix?: string;
  label: string;
  detail: string;
};

export const headlineMetrics: Metric[] = [
  {
    to: 20,
    suffix: "+",
    label: "mobile apps shipped",
    detail:
      "Across e-governance, sport, media, restaurant POS and payments — native Android, Flutter and iOS.",
  },
  {
    prefix: "₹",
    to: 11,
    suffix: "+ Cr",
    label: "payment volume processed",
    detail:
      "Through Pay+ in a 30-day window, at a 95% success rate across 13 EDC integrations — card, UPI and QR.",
  },
  {
    to: 20,
    suffix: "K",
    label: "daily actives on Captain",
    detail:
      "After migrating it from native Android to Flutter and launching it on iOS from the same codebase.",
  },
  {
    to: 99.9,
    decimals: 1,
    suffix: "%",
    label: "crash-free sessions",
    detail:
      "Held across my apps by triaging Crashlytics continuously — inspect, fix, ship, verify.",
  },
];

/* ---------------------------------------------------------- case studies -- */

export type Transport = "mqtt" | "sdk" | "https" | "inproc";

export type SchematicNode = {
  id: string;
  label: string;
  kind: "client" | "app" | "module" | "service" | "hardware" | "external";
  /** Grid position, 0–100 in both axes. */
  x: number;
  y: number;
  responsibility: string;
  tech: string;
  /** What breaks here, and what Dhruv did about it. */
  failure?: string;
  built?: boolean;
};

export type SchematicEdge = {
  from: string;
  to: string;
  transport: Transport;
  note: string;
  bidirectional?: boolean;
};

export const transportMeta: Record<Transport, { label: string; note: string }> = {
  mqtt: { label: "MQTT", note: "Long-lived pub/sub link between devices on the floor." },
  sdk: { label: "Vendor SDK", note: "Third-party EDC SDK, resolved at build time." },
  https: { label: "HTTPS", note: "Internet-routed backend call over secured transport." },
  inproc: { label: "In-process", note: "Module-to-module call inside the app." },
};

export type SpineStage = {
  id: string;
  index: string;
  title: string;
  state: "pending" | "active" | "ok" | "warn" | "fail";
  headline: string;
  body: string;
  note?: string;
};

export type CaseStudy = {
  slug: string;
  flagship?: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
  years: string;
  org: string;
  role: string;
  /** 10-second version. */
  oneLine: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  problem: string;
  context: string;
  constraints: string[];
  approach: { title: string; body: string }[];
  challenges: { title: string; body: string }[];
  result: string[];
  decisions?: { decision: string; instead: string; because: string }[];
  schematic?: { nodes: SchematicNode[]; edges: SchematicEdge[] };
  spine?: SpineStage[];
  retrospective?: string;
};

export const caseStudies: CaseStudy[] = [
  /* ============================================================ FLAGSHIP == */
  {
    slug: "pay-plus",
    flagship: true,
    eyebrow: "Flagship — sole technical owner",
    title: "Pay+",
    subtitle: "Thirteen payment vendors. One build system.",
    years: "2023 — present",
    org: "Petpooja",
    role: "Sole technical owner",
    oneLine:
      "Rebuilt a payment application from four divergent per-vendor branches into a module-per-vendor architecture with custom Gradle build targets — scaling from 4 to 13 EDC integrations and processing ₹11+ Crore in 30 days at a 95% success rate.",
    stack: [
      "Kotlin",
      "Multi-module Gradle",
      "Custom Gradle tasks",
      "Build variants",
      "MQTT",
      "Hilt",
      "Coroutines",
      "EDC SDKs",
    ],
    metrics: [
      { value: "₹11+ Cr", label: "processed in 30 days" },
      { value: "95%", label: "transaction success rate" },
      { value: "4 → 13", label: "EDC integrations" },
      { value: "50%", label: "faster transactions" },
      { value: "25%", label: "more customers served" },
    ],
    problem:
      "The existing product supported four payment terminals — and maintained each one on its own git branch. Every shared bug had to be fixed four times. Every new screen had to be built four times. Every branch drifted a little further from the others. Adding a fifth vendor meant creating a fifth copy of the entire application, and the cost of each additional vendor was rising, not falling.",
    context:
      "Petpooja's payment surface runs across three products — POS, Invoice and Retail POS — inside live restaurants. The software sits between a member of staff, a payment terminal from any one of a dozen providers, and a customer waiting at the counter. There is no graceful degradation available: either the payment completes or someone is standing at the counter with their phone out, waiting.",
    constraints: [
      "Thirteen third-party EDC SDKs, each with its own lifecycle, callback shape and device-locked build requirements.",
      "One installable build per terminal — a device must ship with its vendor's SDK and nothing else.",
      "Restaurant floors: intermittent connectivity, shared hardware, staff who cannot debug anything.",
      "Money in flight. A dropped callback is not a UI bug, it is a disputed transaction.",
    ],
    approach: [
      {
        title: "Branch-per-vendor → module-per-vendor",
        body: "Collapsed four divergent branches into one repository with a multi-module architecture. Each EDC vendor became a self-contained module implementing a shared payment contract. The application screens — sale, refund, status, settlement — were written once, against that contract, and are common to every vendor.",
      },
      {
        title: "A build system, not a runtime abstraction",
        body: "Vendor selection happens at build time rather than runtime. Custom Gradle tasks generate a build per variant: invoking the target for a given vendor compiles exactly that vendor's module plus the shared application surface. Nothing else is linked in. Twelve competitors' SDKs never enter the artifact that ships to a device.",
      },
      {
        title: "Module taxonomy by reason to change",
        body: "Modules split three ways — one per vendor SDK, one per product feature, and shared modules for common use cases. The split was driven by variant resolution first, then build times, then scalability: the boundaries exist so that a new vendor touches exactly one new module and zero existing ones.",
      },
      {
        title: "Intranet → internet transport",
        body: "Moved the payment infrastructure off intranet-based communication and onto internet-based transport, eliminating a class of local-network errors that were failing transactions for reasons that had nothing to do with the payment itself.",
      },
      {
        title: "Hardened the device link",
        body: "The MQTT link between POS/KIOSK and the payment application existed but had no resilience: when the connection dropped, it stayed dropped. Added retry and fallback on connection loss, and reduced it to a single long-lived instance that holds the link in the background without accumulating memory. Extended support backwards across older Android versions where it had never worked, and forwards to satisfy newer Android background-execution rules.",
      },
    ],
    challenges: [
      {
        title: "The callback that never arrives",
        body: "The hardest failure in payments: the terminal approves, the money moves, and the application never hears back. The transaction is real but invisible to the system that has to close the bill.",
      },
      {
        title: "Thirteen SDKs, thirteen opinions",
        body: "Vendor SDKs disagree about everything — lifecycle, threading, callback shape, which build they will consent to run inside. Isolating each one in its own module means their disagreements never have to be reconciled, only contained.",
      },
      {
        title: "Debugging encrypted traffic",
        body: "Payment payloads are encrypted end to end, which makes the normal debugging loop unavailable. Built a dedicated tool to decrypt and inspect request and response payloads so failures could be read rather than guessed at.",
      },
    ],
    result: [
      "₹11+ Crore in payment volume processed within a 30-day window, at a 95% transaction success rate.",
      "EDC integrations scaled from 4 to 13 without a corresponding rise in maintenance cost — the thirteenth cost a fraction of what the fifth would have on the old model.",
      "Direct POS and KIOSK connection to the payment app cut transaction time by 50%, letting staff serve 25% more customers.",
      "The architecture was extracted into a shared payment library now used by other Petpooja Android and Flutter products.",
    ],
    decisions: [
      {
        decision: "Resolve the vendor at build time",
        instead: "A runtime registry selecting among all thirteen SDKs",
        because:
          "A device only ever talks to one terminal. Runtime selection would ship twelve unused vendor SDKs to every device, inflate the binary, multiply the dependency-conflict surface, and put competitors' code inside every artifact for no benefit.",
      },
      {
        decision: "One module per vendor",
        instead: "One shared adapter layer with per-vendor branching inside it",
        because:
          "Vendor SDKs conflict at the dependency level, not just the API level. Module boundaries are the only place those conflicts can be contained. It also makes adding vendor fourteen a purely additive change.",
      },
      {
        decision: "Custom Gradle tasks over manual variant config",
        instead: "Hand-managed product flavours",
        because:
          "Thirteen vendors across three products is a combinatorial surface no one should assemble by hand. Making the build a command turns an error-prone checklist into something reproducible.",
      },
      {
        decision: "Internet-based transport",
        instead: "Keeping intranet-based communication",
        because:
          "Local-network faults were failing transactions for reasons unrelated to payment. Removing the intranet dependency removed the whole error class.",
      },
    ],
    spine: [
      {
        id: "intent",
        index: "01",
        title: "Sale intent",
        state: "active",
        headline: "The bill is ready. The POS needs a payment.",
        body: "Staff close a bill on the POS, Retail POS or a self-service KIOSK. That device does not talk to the terminal — it talks to Pay+.",
        note: "Origin: POS · Retail POS · KIOSK",
      },
      {
        id: "transport",
        index: "02",
        title: "Across the floor",
        state: "active",
        headline: "The intent travels device-to-device over MQTT.",
        body: "A single long-lived MQTT connection carries the sale intent from the POS to the payment application. It retries and falls back when the link drops rather than failing silently, holds the connection in the background without growing its memory footprint, and works across both older Android versions and the background-execution limits of newer ones.",
        note: "Transport: MQTT · retry + fallback · single instance",
      },
      {
        id: "resolve",
        index: "03",
        title: "Vendor resolution",
        state: "active",
        headline: "There is no vendor to choose. It was chosen at build time.",
        body: "This build contains exactly one EDC module — compiled in by its Gradle build target alongside the shared application surface. The sale screen, refund flow and status handling are the same code on all thirteen builds. Only the module behind the contract differs.",
        note: "Resolution: compile-time · 1 of 13 modules linked",
      },
      {
        id: "authorize",
        index: "04",
        title: "Authorisation",
        state: "active",
        headline: "The vendor SDK drives the terminal. Card, UPI or QR is presented.",
        body: "Control passes through the shared payment contract into the vendor module, which drives its own SDK and hardware. Every step of the journey is written to a detailed trace log — because when this fails, the log is the only evidence that exists.",
        note: "Transport: vendor SDK · full journey tracing",
      },
      {
        id: "callback",
        index: "05",
        title: "The callback",
        state: "ok",
        headline: "Approved. The result returns and the bill closes.",
        body: "The terminal returns the outcome, the payment app publishes it back to the originating device, and the invoice is settled. Ninety-five times in a hundred, this is where the story ends.",
        note: "Success rate: 95%",
      },
      {
        id: "silence",
        index: "06",
        title: "…or it doesn't",
        state: "warn",
        headline: "The money moved. The callback never came.",
        body: "The customer has been charged and the system does not know. The transaction is held in an executing state for five minutes rather than being failed — failing it fast would be the wrong answer, because the money is real. If nothing arrives in that window, the transaction is reset instead of being left indefinitely ambiguous.",
        note: "Hold window: 5 minutes, then reset",
      },
      {
        id: "reconcile",
        index: "07",
        title: "Reconciliation",
        state: "fail",
        headline: "Design for the day the happy path doesn't happen.",
        body: "Three routes out, in order of cost. The trace log identifies exactly where the journey broke. Staff can manually map a completed payment to its invoice, so the restaurant is never blocked by a systems problem. And the sale request plus its non-response status can be escalated to the EDC partner for settlement against their own records.",
        note: "Trace → manual mapping → partner escalation",
      },
    ],
    schematic: {
      nodes: [
        {
          id: "pos",
          label: "POS",
          kind: "client",
          x: 8,
          y: 20,
          responsibility: "Closes the bill and raises a sale intent. Never speaks to payment hardware.",
          tech: "Android",
        },
        {
          id: "kiosk",
          label: "KIOSK",
          kind: "client",
          x: 8,
          y: 50,
          responsibility: "Self-service ordering. Raises the same sale intent as staff-operated devices.",
          tech: "Android",
        },
        {
          id: "retail",
          label: "Retail POS / Invoice",
          kind: "client",
          x: 8,
          y: 80,
          responsibility: "Retail and invoicing surfaces sharing the identical payment contract.",
          tech: "Android",
        },
        {
          id: "mqtt",
          label: "MQTT link",
          kind: "service",
          x: 31,
          y: 50,
          responsibility:
            "Long-lived pub/sub connection between floor devices and the payment application.",
          tech: "MQTT · single background instance",
          failure:
            "Connection loss previously had no recovery path. Now retries with fallback, and survives both legacy Android versions and modern background-execution limits.",
          built: true,
        },
        {
          id: "shell",
          label: "Pay+ app surface",
          kind: "app",
          x: 55,
          y: 22,
          responsibility:
            "Sale, refund, status and settlement screens. Written once, identical across all thirteen builds.",
          tech: "Kotlin · Jetpack Compose",
          built: true,
        },
        {
          id: "core",
          label: "Shared use cases",
          kind: "module",
          x: 55,
          y: 50,
          responsibility:
            "The payment contract every vendor module implements, plus common domain logic and journey tracing.",
          tech: "Kotlin · Hilt · Coroutines",
          failure:
            "Full journey tracing lives here — the evidence trail used to locate exactly where a failed transaction broke.",
          built: true,
        },
        {
          id: "vendor",
          label: "Vendor module (1 of 13)",
          kind: "module",
          x: 55,
          y: 79,
          responsibility:
            "One EDC vendor's SDK, isolated. Selected by Gradle at build time — the other twelve are not in this artifact.",
          tech: "Custom Gradle build target",
          failure:
            "Vendor SDKs conflict at the dependency level. Module isolation contains those conflicts instead of reconciling them.",
          built: true,
        },
        {
          id: "terminal",
          label: "EDC terminal",
          kind: "hardware",
          x: 80,
          y: 79,
          responsibility: "Physical payment terminal. Reads the card, UPI or QR and authorises with the provider.",
          tech: "Vendor hardware",
          failure:
            "Can approve a payment and never return a callback — the failure mode the whole reconciliation path exists for.",
        },
        {
          id: "backend",
          label: "Petpooja backend",
          kind: "external",
          x: 80,
          y: 30,
          responsibility: "Invoice state and settlement. Reached over internet-based transport.",
          tech: "HTTPS",
          failure:
            "Previously reached over intranet-based communication, which failed transactions for local-network reasons. Moving to internet transport removed the error class.",
        },
      ],
      edges: [
        { from: "pos", to: "mqtt", transport: "mqtt", note: "Sale intent", bidirectional: true },
        { from: "kiosk", to: "mqtt", transport: "mqtt", note: "Sale intent", bidirectional: true },
        { from: "retail", to: "mqtt", transport: "mqtt", note: "Sale intent", bidirectional: true },
        { from: "mqtt", to: "shell", transport: "inproc", note: "Dispatch", bidirectional: true },
        { from: "shell", to: "core", transport: "inproc", note: "Payment contract" },
        { from: "core", to: "vendor", transport: "inproc", note: "Contract implementation" },
        { from: "vendor", to: "terminal", transport: "sdk", note: "Drive terminal", bidirectional: true },
        { from: "core", to: "backend", transport: "https", note: "Settle invoice", bidirectional: true },
      ],
    },
    retrospective:
      "The reconciliation path was built after the failure appeared in production, not before it. Given the same brief again, the trace log and the manual invoice mapping would exist on day one — in a payment system the failure path is the product, and treating it as an edge case is what makes it expensive.",
  },

  /* =========================================================== migration == */
  {
    slug: "captain-flutter",
    eyebrow: "Migration",
    title: "Captain App",
    subtitle: "A rewrite that shipped, added a platform, and stayed stable.",
    years: "2023 — 2025",
    org: "Petpooja",
    role: "Architect and lead engineer",
    oneLine:
      "Migrated a legacy native Android ordering app to Flutter, taking daily actives to 20K, launching iOS at 2.5K DAU, and holding 99.9% crash-free sessions for two years.",
    stack: ["Flutter", "Dart", "Provider", "Firebase", "Crashlytics", "Firebase Remote Config"],
    metrics: [
      { value: "2×", label: "DAU → 20K" },
      { value: "2.5K", label: "iOS DAU at launch" },
      { value: "99.9%", label: "crash-free, 2 years" },
      { value: "+1", label: "platform" },
    ],
    problem:
      "Captain — the app waiting staff use to take orders at the table — was built in native Android and had accumulated legacy code that resisted change. It could not scale to the features being asked of it, and it could never run on iOS, which closed off an entire class of restaurant.",
    context:
      "Rewrites usually fail. The case for one here was not that the old code was ugly; it was that the two hardest requirements — sustainable feature velocity and a second platform — were both structurally unavailable without it.",
    constraints: [
      "The app is in active use during service. There is no maintenance window in a restaurant.",
      "Feature parity was the floor, not the goal — a rewrite that only matched the old app would not have justified itself.",
      "One codebase had to satisfy both platforms without a second team.",
    ],
    approach: [
      {
        title: "Flutter with Provider, on the Firebase suite",
        body: "Rebuilt on Flutter with Provider for state management and Firebase for backing services, giving one codebase that ships to both platforms and a state model the team could reason about.",
      },
      {
        title: "Rebuild the experience, not just the code",
        body: "The migration was used to overhaul the interface and the ordering flow rather than porting the old screens. The DAU doubling came from that — a faster, smoother app that staff preferred using — plus the iOS launch opening a platform that had never been served.",
      },
      {
        title: "Stability as an operating routine",
        body: "99.9% crash-free over two years was not a stabilisation project. It is a standing loop: Crashlytics reviewed on a regular cadence, the issue fixed, the fix shipped and verified in the field.",
      },
    ],
    challenges: [
      {
        title: "The night the updates didn't install",
        body: "The worst production night. Some users took the latest APK cleanly. Users on Android versions below 12 received the update and then could not install it — visibly offered an update they were unable to apply, with no route forward and no way for anyone to intervene remotely.",
      },
      {
        title: "No remote control over a broken client",
        body: "The deeper problem was not the installer. It was that a client stuck in a bad state had no channel through which it could be corrected — every fix required the user to succeed at the exact thing that was failing.",
      },
    ],
    result: [
      "Daily actives reached 20K.",
      "iOS launched from the same codebase, reaching 2.5K daily actives.",
      "99.9% crash-free sessions sustained over two years.",
      "The update mechanism was rebuilt to work across every supported Android version, with Firebase Remote Config as a remotely triggerable fallback — able to push an update to all users or to a targeted subset without shipping a release.",
    ],
    decisions: [
      {
        decision: "Rewrite in Flutter",
        instead: "Continue on native Android and write a separate iOS app",
        because:
          "The legacy codebase blocked feature velocity and a second native app would have doubled the ongoing cost of every future feature, with one team.",
      },
      {
        decision: "Redesign during the migration",
        instead: "Straight port to de-risk the rewrite",
        because:
          "A straight port carries all the risk of a rewrite and none of the upside. The interface and flow rebuild is what actually moved daily actives.",
      },
      {
        decision: "Remote Config as an update fallback",
        instead: "Relying on the store and in-app update APIs alone",
        because:
          "Any update path that depends on the client being healthy fails exactly when it is needed. A remotely triggerable channel means a broken population can be reached without a release.",
      },
    ],
    retrospective:
      "The update mechanism should have been treated as critical infrastructure from the start rather than as plumbing. Anything that is the only route to fixing a client deserves the same scrutiny as the payment path — it is the mechanism of last resort, and it is worthless if it only works when everything else already does.",
  },

  /* ======================================================= international == */
  {
    slug: "international-payments",
    eyebrow: "International",
    title: "Captain + Payment, 9 countries",
    subtitle: "One codebase, three operating modes, nine regulatory environments.",
    years: "2024 — present",
    org: "Petpooja",
    role: "Engineer and architect",
    oneLine:
      "Engineered an international build running as captain, payment or hybrid depending on configuration — live in 9 countries with 1,539+ active users, with localised payment SDKs, multi-currency transactions and region-specific compliance.",
    stack: ["Flutter", "Build variants", "Localised payment SDKs", "Multi-currency"],
    metrics: [
      { value: "9", label: "countries live" },
      { value: "1,539+", label: "active users" },
      { value: "3", label: "operating modes" },
    ],
    problem:
      "Nine markets, each with its own payment providers, currency, tipping conventions and compliance requirements — and restaurants that need different things from the same software. Some want an ordering device. Some want a payment device. Some want one device that is both.",
    context:
      "The naive answer is nine applications, or three. Both compound: every future feature would have to be written, tested and released N times.",
    constraints: [
      "Payment providers differ per region, so the vendor layer has to vary independently of the product.",
      "Multi-currency handling across nine markets.",
      "Region-specific compliance — including secure network communication requirements and market-specific tipping behaviour.",
    ],
    approach: [
      {
        title: "Modes as configuration, not as products",
        body: "Captain, payment and hybrid are configurations of one application rather than three applications. Build variants combined with branch-level separation resolve which mode and which regional payment integrations a given build carries.",
      },
      {
        title: "Compliance treated as a build input",
        body: "Regional requirements — secure network communication, tipping behaviour, currency handling — are resolved per market rather than branched through at runtime, so a market's rules cannot leak into another market's build.",
      },
    ],
    challenges: [
      {
        title: "Tipping is not a feature, it is a jurisdiction",
        body: "Behaviour that looks like a small UI concern in one market is a compliance requirement in another. The same is true of network security expectations, which vary by region rather than by customer.",
      },
    ],
    result: [
      "Live across 9 countries with 1,539+ active users.",
      "One codebase running as captain, payment or hybrid without forking the product.",
      "Localised payment SDKs, multi-currency transactions and region-specific compliance handled per build.",
    ],
  },

  /* ================================================================ KDS === */
  {
    slug: "kitchen-display-system",
    eyebrow: "Legacy rescue",
    title: "Kitchen Display System",
    subtitle: "The screen the kitchen actually looks at, brought back to modern Android.",
    years: "2023",
    org: "Petpooja",
    role: "Sole engineer",
    oneLine:
      "Single-handedly migrated the legacy KDS codebase to modern Android standards and overhauled the interface into a responsive surface kitchen staff can read at a glance, mid-service.",
    stack: ["Kotlin", "Android", "Legacy migration"],
    metrics: [
      { value: "1", label: "engineer" },
      { value: "100%", label: "of the codebase modernised" },
    ],
    problem:
      "The Kitchen Display System had fallen behind modern Android standards, and its interface was working against the people using it. A KDS is read at speed, from a distance, by someone holding a pan — legibility and responsiveness are not polish, they are the function.",
    context:
      "Legacy rescue work is rarely glamorous and almost always high-leverage: the KDS sits directly in the path of every order the restaurant produces.",
    constraints: [
      "An in-service system with no tolerance for regression.",
      "One engineer.",
      "The interface had to serve a user who is not looking at it for very long.",
    ],
    approach: [
      {
        title: "Migrate the foundation first",
        body: "Brought the legacy codebase up to modern Android standards before touching the surface, so that interface work landed on a base that could support it.",
      },
      {
        title: "Rebuild for glanceability",
        body: "Overhauled the interface for responsiveness and at-a-glance legibility under kitchen conditions rather than desk conditions.",
      },
    ],
    challenges: [
      {
        title: "Modernising without a pause",
        body: "The system is in continuous use during service. Migration had to be incremental enough that the kitchen never noticed it happening.",
      },
    ],
    result: [
      "Legacy codebase migrated to modern Android standards.",
      "Interface overhauled into a highly responsive display suited to restaurant staff mid-service.",
    ],
  },

  /* ====================================================== SILVER TOUCH === */
  {
    slug: "sports-authority-gujarat",
    eyebrow: "Public sector · Built from scratch",
    title: "Sports Authority of Gujarat",
    subtitle: "A state's sports administration, moved off paper.",
    years: "2020 — 2022",
    org: "Silver Touch Technologies Ltd",
    role: "Android Developer — built from scratch",
    oneLine:
      "Built the Sports Authority of Gujarat application from scratch in native Android, digitising sports activity management across 25+ districts, enabling 5,000+ athletes to register and track events online, and reducing manual paperwork by 80%.",
    stack: ["Kotlin", "Java", "Native Android", "REST APIs", "Material Design"],
    metrics: [
      { value: "25+", label: "districts covered" },
      { value: "5,000+", label: "athletes registered" },
      { value: "80%", label: "less manual paperwork" },
    ],
    problem:
      "Sports administration across Gujarat ran on paper. Athletes registered on forms, events were tracked in registers, and every district maintained its own version of the record. Consolidating any of it meant somebody physically collecting it.",
    context:
      "This was the first product I owned end to end, and it was public-sector software: the users were district administrators and athletes, not people who would tolerate a learning curve or forgive a broken screen.",
    constraints: [
      "25+ districts, each with their own existing paper process to replace.",
      "A public-sector device landscape — a wide spread of Android versions and low-end hardware.",
      "Users with no expectation of, or patience for, software. If it wasn't obvious, it wasn't usable.",
      "No existing digital system to model the domain on.",
    ],
    approach: [
      {
        title: "Built from scratch in native Android",
        body: "No existing codebase and no template — the domain model, the registration flow, the event tracking and the district-level administration were all designed and built from nothing.",
      },
      {
        title: "Designed for the least confident user",
        body: "The success condition was not feature coverage, it was that an athlete or a district officer could complete a task without being trained first. Every flow was built to be finishable on the first attempt.",
      },
    ],
    challenges: [
      {
        title: "Replacing a process, not an app",
        body: "There was no software to migrate from. The hard part was understanding a paper process well enough to encode it — and knowing which parts of it existed for good reasons and which existed only because paper made them necessary.",
      },
    ],
    result: [
      "Sports activity management digitised across 25+ districts.",
      "5,000+ athletes registering and tracking events online.",
      "Manual paperwork reduced by 80%.",
    ],
  },
  {
    slug: "national-war-memorial",
    eyebrow: "Public sector · Two-person team",
    title: "National War Memorial",
    subtitle: "A national tribute, in ten thousand pockets.",
    years: "2020 — 2022",
    org: "Silver Touch Technologies Ltd",
    role: "Co-developer, two-person team",
    oneLine:
      "Co-developed the National War Memorial application in a two-person team — an interactive tribute platform with monument navigation, a martyrs database and multimedia galleries, reaching 10,000+ Play Store downloads at a 4.5★ rating.",
    stack: ["Kotlin", "Java", "Native Android", "Maps & navigation", "Media playback"],
    metrics: [
      { value: "10,000+", label: "Play Store downloads" },
      { value: "4.5★", label: "store rating" },
      { value: "2", label: "engineers" },
    ],
    problem:
      "The National War Memorial is a physical place most people will never stand in. The brief was to make it reachable — navigable, searchable and worth spending time in — from a phone.",
    context:
      "A two-person team building a public-facing consumer application with a subject that deserved care. This is the only product in my career whose users came to it for meaning rather than for a task.",
    constraints: [
      "Two engineers, full scope: navigation, database, media, and the polish a national memorial warrants.",
      "A general public audience across the full range of Android devices.",
      "Content with weight — the interface could not be casual about what it was presenting.",
    ],
    approach: [
      {
        title: "Three products in one",
        body: "Monument navigation, a searchable martyrs database and multimedia galleries — three quite different interaction models that had to feel like one application rather than three tabs.",
      },
      {
        title: "Restraint as a design decision",
        body: "For a memorial, the correct interface is one that gets out of the way. The work was in what was left out.",
      },
    ],
    challenges: [
      {
        title: "Full scope, two people",
        body: "With a two-person team there is no specialisation to hide behind. Everything — navigation, data, media, store readiness — belonged to both of us.",
      },
    ],
    result: [
      "10,000+ Play Store downloads at a 4.5★ rating.",
      "Monument navigation, martyrs database and multimedia galleries delivered in a single application.",
      "Part of a body of 10+ native Android applications shipped across e-governance, sports and media.",
    ],
  },
];

export const flagship = caseStudies.find((c) => c.flagship)!;
export const supportingWork = caseStudies.filter((c) => !c.flagship);

/* ------------------------------------------------------ systems & tooling - */

export type Tool = {
  id: string;
  name: string;
  command?: string;
  kind: string;
  claim: string;
  body: string;
  impact: string;
  tech: string[];
};

/**
 * The strongest staff-level evidence, and it appears nowhere on the CV.
 * Described at capability level only — no proprietary implementation detail.
 */
export const tooling: Tool[] = [
  {
    id: "payment-library",
    name: "Shared payment library",
    kind: "Internal platform",
    claim: "Thirteen EDC integrations, available to any Petpooja product as a dependency.",
    body: "The Pay+ architecture, extracted into a library that other Petpooja Android and Flutter products consume directly. A product that needs to collect payments integrates the library instead of integrating a terminal vendor — the thirteen EDC integrations, and everything learned from them, come with it.",
    impact: "Other teams ship payment capability without touching an EDC SDK.",
    tech: ["Kotlin", "Flutter", "13 EDC integrations"],
  },
  {
    id: "api-sync",
    name: "API sync",
    command: "/api-sync",
    kind: "Codegen",
    claim: "Backend API changes reach the mobile client with no developer intervention.",
    body: "When the backend adds an endpoint, adds a parameter, removes a parameter, renames a parameter or renames an endpoint, the mobile side normally needs a developer to notice, interpret and hand-apply the change. This removes that loop: a single command reconciles the client against the backend automatically.",
    impact: "Deletes an entire category of manual, error-prone integration work.",
    tech: ["Codegen", "Single command"],
  },
  {
    id: "cipher",
    name: "Cipher",
    kind: "Debug tooling",
    claim: "Makes encrypted payment traffic readable when a transaction fails.",
    body: "Payment request and response payloads are encrypted end to end, which removes the normal debugging loop exactly where it is needed most. Cipher decrypts and inspects those payloads so a failed transaction can be read rather than guessed at.",
    impact: "Turned payment debugging from inference into observation.",
    tech: ["Node.js"],
  },
  {
    id: "edc-skills",
    name: "EDC integration skills",
    kind: "AI-assisted engineering",
    claim: "New EDC vendor integration in hours instead of days.",
    body: "Purpose-built Claude Skills that encode the shape of an EDC integration — the contract, the module layout, the build target — so onboarding a new payment vendor becomes a guided, repeatable procedure rather than an exploratory one.",
    impact: "Automated the specialist knowledge, rather than hoarding it.",
    tech: ["Claude Skills", "Claude Code"],
  },
];

/* ------------------------------------------------------------- experience - */

/**
 * Employment is presented on its own terms — two companies, two substantial
 * tenures. Education and awards are a separate, deliberately lighter display
 * further down, so a role never sits at the same visual weight as a
 * certificate.
 */
export type Role = {
  org: string;
  title: string;
  /** Internal promotion, shown as evidence rather than as a footnote. */
  promotion?: { from: string; year: string };
  period: string;
  span: string;
  location: string;
  current?: boolean;
  summary: string;
  /** What was actually built, linked to the case studies where they exist. */
  work: { title: string; detail: string; slug?: string }[];
  stack: string[];
};

export const experience: Role[] = [
  {
    org: "Petpooja",
    title: "Senior Software Engineer — Mobile",
    promotion: { from: "Software Engineer — Mobile", year: "2026" },
    period: "Dec 2022 — present",
    span: "3 yrs 8 mos",
    location: "Ahmedabad, India",
    current: true,
    summary:
      "Sole technical owner of the payment application. Rebuilt its architecture from four divergent per-vendor branches into thirteen vendor modules behind one build system, migrated the ordering app to Flutter, modernised the kitchen display, and engineered the nine-country international build.",
    work: [
      {
        title: "Pay+",
        detail: "Four branches to thirteen vendor modules, at a 95% success rate.",
        slug: "pay-plus",
      },
      {
        title: "Captain App",
        detail: "Native Android to Flutter. DAU doubled, iOS launched, 99.9% crash-free.",
        slug: "captain-flutter",
      },
      {
        title: "Captain + Payment",
        detail: "One codebase running as captain, payment or hybrid across 9 markets.",
        slug: "international-payments",
      },
      {
        title: "Kitchen Display System",
        detail: "Legacy codebase migrated to modern Android, interface rebuilt.",
        slug: "kitchen-display-system",
      },
      {
        title: "POS",
        detail: "The point-of-sale app restaurants run their counter on.",
      },
      {
        title: "Tvito",
        detail: "Restaurant marketing app — social graphics from templates, Android and iOS.",
      },
    ],
    /* Deliberately excludes what the Silver Touch entry already establishes
       (Kotlin, Java, Room, Retrofit) — this list shows what changed, not what
       carried over. */
    stack: [
      "Jetpack Compose",
      "Flutter",
      "Dart",
      "Provider",
      "Multi-module architecture",
      "Custom Gradle tasks",
      "Build variants",
      "MQTT",
      "EDC SDK integration",
      "UPI & QR payments",
      "Hilt",
      "Dagger",
      "Coroutines",
      "Dio",
      "WorkManager",
      "Firebase suite",
      "Crashlytics",
      "Remote Config",
      "Printer & Bluetooth SDKs",
      "Node.js",
      "CI/CD",
      "GitLab",
      "Claude Code & Skills",
    ],
  },
  {
    org: "Silver Touch Technologies Ltd",
    title: "Android Developer",
    period: "Jan 2020 — Dec 2022",
    span: "3 yrs",
    location: "Ahmedabad, India",
    summary:
      "Built public-sector and media Android applications at district and national scale — including one product owned from scratch and one delivered in a two-person team.",
    work: [
      {
        title: "Sports Authority of Gujarat",
        detail: "Built from scratch. 25+ districts, 5,000+ athletes, 80% less paperwork.",
        slug: "sports-authority-gujarat",
      },
      {
        title: "National War Memorial",
        detail: "Two-person team. 10,000+ downloads at 4.5★.",
        slug: "national-war-memorial",
      },
      {
        title: "BJP",
        detail: "Native Android app delivered for the political organisation.",
      },
      {
        title: "10+ native Android applications",
        detail: "Across e-governance, sports and media.",
      },
    ],
    stack: [
      "Kotlin",
      "Java",
      "Native Android",
      "XML layouts",
      "Material Design",
      "MVVM",
      "Retrofit",
      "Room",
      "REST APIs",
      "Maps & navigation",
      "Media playback",
      "Play Store releases",
    ],
  },
];

/* ------------------------------------------------------------- milestones - */

export type Milestone = {
  year: string;
  kind: "education" | "award";
  title: string;
  org: string;
  /** Flagged explicitly rather than quietly omitted. An unfinished
   *  qualification presented as finished is the kind of thing that ends an
   *  interview; stated plainly it costs nothing. */
  incomplete?: boolean;
};

export const milestones: Milestone[] = [
  {
    year: "2024",
    kind: "award",
    title: "Rising Star Award",
    org: "Petpooja",
  },
  {
    year: "2022 — 2023",
    kind: "education",
    title: "Executive Post Graduate Programme, Software Development",
    org: "IIIT Bangalore",
  },
  {
    year: "2023",
    kind: "education",
    title: "MSc Computer Science",
    org: "University of Liverpool, UK",
    incomplete: true,
  },
  {
    year: "2021",
    kind: "award",
    title: "Top Performer Award",
    org: "Silver Touch Technologies Ltd",
  },
  {
    year: "2017 — 2020",
    kind: "education",
    title: "B.E. Computer Engineering",
    org: "GTU, Ahmedabad",
  },
];

/* -------------------------------------------------------------- expertise - */

export type ExpertiseGroup = {
  id: string;
  title: string;
  claim: string;
  /** Skills are only listed where there is work on this site that evidences them. */
  evidence: { slug: string; label: string } | { external: string; label: string };
  items: string[];
};

export const expertise: ExpertiseGroup[] = [
  {
    id: "platform",
    title: "Mobile platform architecture",
    claim:
      "Module boundaries, build systems and variant resolution — the layer most mobile engineers never touch.",
    evidence: { slug: "pay-plus", label: "Proven in Pay+ — 4 branches to 13 vendor modules" },
    items: [
      "Multi-module architecture",
      "Custom Gradle tasks",
      "Build variant configuration",
      "Clean Architecture",
      "MVVM",
      "Hilt / Dagger",
      "CI/CD pipeline automation",
    ],
  },
  {
    id: "android",
    title: "Native Android",
    claim: "Six years of production Android, from legacy rescue to Compose.",
    evidence: { slug: "kitchen-display-system", label: "Proven in the KDS legacy migration" },
    items: [
      "Kotlin",
      "Java",
      "Jetpack Compose",
      "Jetpack components",
      "XML layouts",
      "Material Design",
      "Room",
      "Retrofit",
      "Coroutines",
      "WorkManager",
    ],
  },
  {
    id: "cross-platform",
    title: "Cross-platform",
    claim: "A full native-to-Flutter migration that shipped, added iOS, and stayed stable.",
    evidence: { slug: "captain-flutter", label: "Proven in the Captain migration" },
    items: [
      "Flutter",
      "Dart",
      "Provider",
      "Dio",
      "SQLite",
      "Platform channels",
      "State management",
      "Flutter packages",
    ],
  },
  {
    id: "payments",
    title: "Payments and devices",
    claim:
      "Where software meets hardware and money: payment terminals, printers, biometrics, device-to-device transport.",
    evidence: { slug: "pay-plus", label: "Proven in Pay+ — ₹11+ Crore in 30 days" },
    items: [
      "EDC SDK integration",
      "Payment gateway integration",
      "Digital wallet integration",
      "MQTT protocol",
      "Printer, Bluetooth and fingerprint SDKs",
      "Multi-currency transactions",
      "Secure storage",
    ],
  },
  {
    id: "reliability",
    title: "Reliability",
    claim: "Designing the failure path first — because in payments it is the product.",
    evidence: { slug: "pay-plus", label: "Proven in the Pay+ reconciliation path" },
    items: [
      "Fault tolerance",
      "Offline-first synchronisation",
      "Background processing",
      "Retry and fallback design",
      "Journey tracing and logging",
      "Crash triage at 99.9% crash-free",
    ],
  },
  {
    id: "tooling",
    title: "Backend and tooling",
    claim: "Building the tools the team was missing, including with AI in the loop.",
    evidence: { external: "#tooling", label: "Proven in Systems & Tooling" },
    items: [
      "CipherTool",
      "EDC Integration Skill",
      "payment-library",
      "Backend ↔ mobile API auto-sync",
      "Node.js",
      "Claude Code & Skills",
    ],
  },
];

/* ------------------------------------------------------------------ misc -- */

/**
 * Gmail compose link. Opens a pre-addressed draft rather than depending on
 * the visitor having a desktop mail client wired up to `mailto:`.
 */
export function gmailCompose(subject: string, body = "") {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: person.email,
    su: subject,
  });
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export const availability = {
  status: "open" as const,
  hiring: "Open to Senior and Staff mobile roles — on-site in Ahmedabad or remote.",
  consulting:
    "Available for consulting on payment integrations, mobile platform architecture and cross-platform migrations.",
};
