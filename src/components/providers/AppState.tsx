"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DEFAULT_VARIANT, isVariantId, type VariantId } from "@/lib/variants";

type Theme = "dark" | "light";

type AppState = {
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
  variant: VariantId;
  setVariant: (v: VariantId) => void;
  /** True while the page is "recompiling" after a variant change. */
  recompiling: boolean;
  /** The target being resolved, available before `variant` swaps over. */
  pending: VariantId | null;
  /** True once the entrance sequence has finished. */
  ready: boolean;
  setReady: (v: boolean) => void;
};

const Ctx = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside <AppStateProvider>");
  return ctx;
}

const THEME_KEY = "dl.theme";
const VARIANT_KEY = "dl.variant";

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  // The inline script in <head> has already set data-theme before paint.
  // Read from the DOM so the first client render matches it exactly.
  const [theme, setTheme] = useState<Theme>("dark");
  const [variant, setVariantState] = useState<VariantId>(DEFAULT_VARIANT);
  const [recompiling, setRecompiling] = useState(false);
  const [pending, setPending] = useState<VariantId | null>(null);
  const [ready, setReady] = useState(false);
  const recompileTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const domTheme = document.documentElement.dataset.theme;
    if (domTheme === "light" || domTheme === "dark") setTheme(domTheme);

    // URL wins over storage, so a shared link lands on the intended build.
    const fromUrl = new URLSearchParams(window.location.search).get("v");
    const stored = window.localStorage.getItem(VARIANT_KEY);
    const next = isVariantId(fromUrl) ? fromUrl : isVariantId(stored) ? stored : DEFAULT_VARIANT;
    setVariantState(next);
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* private mode — the theme simply will not persist */
    }
    setTheme(next);
  }, []);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Circular wipe from the toggle itself, where supported.
      if (!reduced && typeof document.startViewTransition === "function") {
        const x = origin?.x ?? window.innerWidth - 48;
        const y = origin?.y ?? 48;
        const radius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        );
        document.documentElement.style.setProperty("--vt-x", `${x}px`);
        document.documentElement.style.setProperty("--vt-y", `${y}px`);
        document.documentElement.style.setProperty("--vt-r", `${radius}px`);
        document.documentElement.dataset.vt = "theme";

        const transition = document.startViewTransition(() => applyTheme(next));
        void transition.finished.finally(() => {
          delete document.documentElement.dataset.vt;
        });
        return;
      }

      applyTheme(next);
    },
    [theme, applyTheme],
  );

  const setVariant = useCallback(
    (next: VariantId) => {
      if (next === variant) return;

      try {
        window.localStorage.setItem(VARIANT_KEY, next);
      } catch {
        /* ignore */
      }

      // Keep the URL shareable without adding history entries per toggle.
      const url = new URL(window.location.href);
      url.searchParams.set("v", next);
      window.history.replaceState({}, "", url);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setVariantState(next);
        return;
      }

      // Mask the re-order behind a short build trace, then swap.
      setPending(next);
      setRecompiling(true);
      if (recompileTimer.current) clearTimeout(recompileTimer.current);
      recompileTimer.current = setTimeout(() => {
        setVariantState(next);
        recompileTimer.current = setTimeout(() => {
          setRecompiling(false);
          setPending(null);
        }, 280);
      }, 400);
    },
    [variant],
  );

  useEffect(
    () => () => {
      if (recompileTimer.current) clearTimeout(recompileTimer.current);
    },
    [],
  );

  const value = useMemo<AppState>(
    () => ({ theme, toggleTheme, variant, setVariant, recompiling, pending, ready, setReady }),
    [theme, toggleTheme, variant, setVariant, recompiling, pending, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Runs before paint. Prevents a light flash for users who chose light. */
export const themeBootScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t="dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`;
