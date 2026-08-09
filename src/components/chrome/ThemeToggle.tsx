"use client";

import { useApp } from "@/components/providers/AppState";

/** Theme toggle. The circular wipe originates from this button — see
 *  toggleTheme in AppState. */
export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useApp();

  return (
    <button
      type="button"
      data-cursor="link"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      /* 44px touch target on small screens, tighter once a mouse is likely */
      className={`grid h-11 w-11 place-items-center rounded-sm border border-line bg-surface/70 text-text-2 backdrop-blur-md transition-colors hover:border-line-strong hover:text-text md:h-9 md:w-9 ${className ?? ""}`}
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
        {theme === "dark" ? (
          <path
            d="M13 9.2A5.8 5.8 0 0 1 5.8 2 5.9 5.9 0 1 0 13 9.2Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        ) : (
          <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <circle cx="7.5" cy="7.5" r="3.1" />
            <path d="M7.5 1v1.6M7.5 12.4V14M14 7.5h-1.6M2.6 7.5H1M12.1 2.9l-1.1 1.1M4 11l-1.1 1.1M12.1 12.1 11 11M4 4 2.9 2.9" />
          </g>
        )}
      </svg>
    </button>
  );
}
