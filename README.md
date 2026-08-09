# Dhruv Limbachiya — portfolio

Personal portfolio site. Next.js static export, deployed to GitHub Pages.

**Design direction:** "Aperture" — deep near-black canvas, one electric
blue-violet accent, generous radii, large tight typography. Geist carries both
display and reading; Geist Mono is held back for evidence (metrics, labels,
commands). Dark is the primary identity; light is a genuine second design.

Motion is scroll-choreographed: the hero stage recedes — scaling back, softening
and lifting — while the light behind it swells; metrics count up on entry;
content resolves out of blur rather than sliding. Four durations, three curves,
one stagger, all defined in `src/lib/motion.ts`.

---

## Running it

```bash
npm install
npm run dev
```

```bash
npm run build
```

`npm run build` produces a fully static site in `out/`.

---

## Before it goes live

Three things need your input. Everything else is done.

### 1. Photographs

Drop your files into `public/photos/`:

| File | Used for | Suggested crop |
| --- | --- | --- |
| `portrait.jpg` | "How this started" chapter | 4:5 portrait |
| `candid-1.jpg` | "Away from the screen" chapter | 1:1 square |
| `candid-2.jpg` | Spare slot | any |

Then open `src/lib/content.ts` and set:

```ts
export const photos = {
  ready: true,   // <- flip this
  ...
```

Until `ready` is `true`, every photo slot renders a designed typographic panel
instead of a broken image, so the site is never in a half-finished state.

Export at roughly 1600px on the long edge and compress — there is no image
optimizer on GitHub Pages.

### 2. Contact form key

The site is static, so the form posts to [Web3Forms](https://web3forms.com)
(free). Create a key with your email address, then:

- **Local:** copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WEB3FORMS_KEY`
- **Deployed:** add it as a repository *secret* named `WEB3FORMS_KEY`

Without a key the form degrades to a direct mail link — functional, just less
convenient.

### 3. Repository name

- **User site** — name the repo `Dhruv-Limbachiya.github.io`. Nothing else to do;
  the site serves from the domain root.
- **Project repo** — any other name means the site serves from `/repo-name`, so add
  a repository *variable* `NEXT_PUBLIC_BASE_PATH` set to `/repo-name`.

Then in **Settings → Pages**, set **Source** to **GitHub Actions**. Pushing to
`main` deploys via `.github/workflows/deploy.yml`.

---

## Editing content

Everything factual lives in **`src/lib/content.ts`** — there is no copy hard-coded
in components. That file is the single source of truth for:

- `person`, `personal`, `photos` — who Dhruv is
- `caseStudies` — six case studies, including the Pay+ flagship with its
  transaction spine and interactive architecture diagram
- `tooling` — the four internal systems
- `journey`, `expertise`, `headlineMetrics`

### Rules encoded in that file

- **No EDC partner is ever named.** Vendors are referred to generically. This was
  a deliberate confidentiality decision — keep it.
- **No invented facts.** Every claim traces to the CV or to Dhruv's own answers.
- **Metrics always travel with the engineering that produced them.** A bare number
  reads as inflated.

---

## Structure

```
src/
  app/                    routes, metadata, sitemap, robots, OG image
    work/[slug]/          case studies (generateStaticParams)
  components/
    chrome/               nav, footer, cursor, theme toggle, reading-path switch
    primitives/           Reveal, MaskText, Photo, Magnetic, Section
    home/                 the chapters
    case/                 TransactionSpine, Schematic, CaseSection
  lib/
    content.ts            all facts
    variants.ts           reading paths and chapter ordering
    motion.ts             the motion language — four durations, three curves
```

### Reading paths

The page re-orders itself for three readers (Hiring / Engineering / Consulting)
via the control in the header. A path **never hides content** — every chapter
renders in every path, only the order changes, and chapter numbers follow the
resolved order. The site is complete without ever touching it.

State lives in `localStorage` and the `?v=` query parameter, so a link can be
shared pointing at a specific path.

---

## Accessibility and motion

- All colour tokens clear WCAG AA at their smallest used size, in both themes.
- `prefers-reduced-motion` is honoured throughout. Motion is stripped; content
  still lands in its final state. The horizontal career track falls back to a
  vertical timeline, because without the scroll-linked transform half of it
  would be unreachable.
- The custom cursor and magnetic hovers only mount on fine pointers.
- The architecture diagram's nodes are real focusable buttons on wide screens,
  and a linear list on narrow ones — never both, so keyboard focus never lands
  on something invisible.
