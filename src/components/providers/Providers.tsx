"use client";

import { MotionConfig } from "motion/react";
import { AppStateProvider } from "./AppState";
import SmoothScroll from "@/components/chrome/SmoothScroll";
import Cursor from "@/components/chrome/Cursor";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppStateProvider>
      {/* reducedMotion="user" makes every motion component honour the OS
          setting automatically — transforms are dropped, content still lands
          in its final state. */}
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        <Cursor />
        {children}
      </MotionConfig>
    </AppStateProvider>
  );
}
