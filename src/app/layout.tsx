import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import { themeBootScript } from "@/components/providers/AppState";
import Nav from "@/components/chrome/Nav";
import Footer from "@/components/chrome/Footer";
import { person, siteMeta } from "@/lib/content";

/* One family, two cuts. A single tight grotesk carries display and reading —
   the personality comes from scale, spacing and motion rather than from the
   typeface — with mono held back for evidence: metrics, labels, commands. */
const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: siteMeta.title,
    template: `%s — ${person.name}`,
  },
  description: siteMeta.description,
  applicationName: `${person.name} — Portfolio`,
  authors: [{ name: person.name, url: siteMeta.url }],
  creator: person.name,
  keywords: [
    "Dhruv Limbachiya",
    "mobile platform engineer",
    "Android engineer",
    "Kotlin",
    "Jetpack Compose",
    "Flutter",
    "payment integration",
    "EDC SDK",
    "multi-module architecture",
    "Gradle build variants",
    "MQTT",
    "Ahmedabad",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: person.name,
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.url,
    locale: "en_IN",
    // og:image comes from app/opengraph-image.tsx, generated at build time.
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060608" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6f8" },
  ],
  colorScheme: "dark light",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  description: siteMeta.description,
  url: siteMeta.url,
  email: `mailto:${person.email}`,
  worksFor: { "@type": "Organization", name: person.company },
  address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressCountry: "IN" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "IIIT Bangalore" },
    { "@type": "CollegeOrUniversity", name: "Gujarat Technological University" },
  ],
  knowsAbout: [
    "Mobile platform architecture",
    "Payment systems",
    "EDC terminal integration",
    "Kotlin",
    "Jetpack Compose",
    "Flutter",
    "Multi-module Gradle architecture",
    "MQTT",
  ],
  sameAs: [person.linkedin, person.github],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-dvh bg-bg text-text">
        <a
          href="#main"
          className="t-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-sm focus:bg-signal focus:px-4 focus:py-3 focus:text-signal-ink"
        >
          Skip to content
        </a>
        <Providers>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
