"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import VariantSwitch from "./VariantSwitch";
import ThemeToggle from "./ThemeToggle";
import { EASE } from "@/lib/motion";
import { person } from "@/lib/content";

const LINKS = [
  { id: "story", label: "Story" },
  { id: "work", label: "Work" },
  { id: "tooling", label: "Systems" },
  { id: "journey", label: "Journey" },
  { id: "beyond", label: "Beyond" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 34, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section indicator. Rebuilt on route change so it works on
  // case-study pages too (where these sections simply do not exist).
  useEffect(() => {
    const targets = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!targets.length) {
      setActive("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);

  // Lock the page while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[60] h-px w-full origin-left bg-signal"
        style={{ scaleX: progress }}
        aria-hidden
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-line bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between gap-4 md:h-[72px]">
          <Link
            href="/"
            data-cursor="link"
            className="group -mx-2 -my-2 flex items-center gap-2.5 px-2 py-2"
            aria-label={`${person.name} — home`}
          >
            <span className="relative grid h-6 w-6 place-items-center rounded-[3px] border border-line-strong">
              <span className="t-label text-[10px] leading-none text-text">DL</span>
              <span className="absolute -right-px -top-px h-1 w-1 rounded-full bg-signal" />
            </span>
            <span className="hidden text-[15px] font-medium tracking-tight sm:block">
              {person.name}
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={href(link.id)}
                data-cursor="link"
                className="relative px-3 py-2 text-[13px] tracking-tight text-text-2 transition-colors hover:text-text"
              >
                {active === link.id && onHome ? (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ duration: 0.35, ease: EASE.soft }}
                    className="absolute inset-x-2.5 bottom-0.5 h-px bg-signal"
                  />
                ) : null}
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <VariantSwitch className="hidden sm:flex" />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-cursor="link"
              className="grid h-11 w-11 place-items-center rounded-sm border border-line bg-surface/70 backdrop-blur-md md:h-9 md:w-9 lg:hidden"
            >
              <span className="relative block h-[9px] w-4">
                <motion.span
                  className="absolute left-0 top-0 block h-px w-full bg-text"
                  animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE.soft }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 block h-px w-full bg-text"
                  animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE.soft }}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE.soft }}
          >
            <div className="shell flex h-dvh flex-col justify-center pb-16 pt-20">
              <ul className="space-y-1">
                {LINKS.map((link, i) => (
                  <li key={link.id} className="overflow-hidden">
                    <motion.a
                      href={href(link.id)}
                      onClick={() => setMenuOpen(false)}
                      className="t-h2 block py-2 text-text"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-60%", opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE.soft, delay: 0.05 + i * 0.05 }}
                    >
                      <span className="t-label mr-4 align-middle text-signal tnum">
                        0{i + 1}
                      </span>
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                className="mt-12 border-t border-line pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.32 }}
              >
                <p className="t-label mb-3 text-text-3">Build target</p>
                <VariantSwitch />
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
