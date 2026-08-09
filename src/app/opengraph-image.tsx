import { ImageResponse } from "next/og";
import { person } from "@/lib/content";

// Static hosting: the image is rendered once at build time, not per request.
export const dynamic = "force-static";

export const alt = `${person.name} — ${person.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated at build time and reused for every route. Uses the site's own
 *  visual language: near-black field, hairline grid, one signal accent. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060608",
          backgroundImage:
            "radial-gradient(70% 90% at 8% -10%, rgba(110,138,255,0.30) 0%, rgba(6,6,8,0) 60%), radial-gradient(60% 80% at 100% 20%, rgba(176,107,255,0.20) 0%, rgba(6,6,8,0) 60%)",
          padding: "72px 80px",
          color: "#FBFBFD",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#6E8AFF",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#A0A0AE" }}>
            {person.role.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1, letterSpacing: -4, maxWidth: 940 }}>
            {person.thesis}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #22222C",
            paddingTop: 32,
          }}
        >
          <div style={{ fontSize: 34, letterSpacing: -1 }}>{person.name}</div>
          <div style={{ display: "flex", gap: 40, fontSize: 20, color: "#A0A0AE" }}>
            <div style={{ display: "flex" }}>13 EDC integrations</div>
            <div style={{ display: "flex", color: "#6E8AFF" }}>₹11+ Cr / 30 days</div>
            <div style={{ display: "flex" }}>99.9% crash-free</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
