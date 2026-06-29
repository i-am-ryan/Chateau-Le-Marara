import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { ChateauIntro } from "@/components/chateau-intro";
import { RoomsTeaser } from "@/components/rooms-teaser";
import { SplitPanels } from "@/components/split-panels";
import { InstagramScroll } from "@/components/instagram-scroll";

const VIDEO_DAY   = "/video/hf_20260625_192207_3a5ea46d-94d7-4dad-a378-abdb81af3190.mp4";
const VIDEO_NIGHT = "/video/hf_20260625_193212_56c4ab77-5caa-4e93-8d06-2b3093827e1e.mp4";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [mode, setMode] = useState<"day" | "night">("day");
  const dayRef   = useRef<HTMLVideoElement>(null);
  const nightRef = useRef<HTMLVideoElement>(null);

  // iOS Safari requires muted set directly on the DOM node
  useEffect(() => {
    const day   = dayRef.current;
    const night = nightRef.current;
    if (!day || !night) return;

    day.muted   = true;
    night.muted = true;
    day.playsInline   = true;
    night.playsInline = true;

    // Only autoplay the active video — iOS blocks simultaneous video playback
    day.play().catch(() => {});
    night.pause();
  }, []);

  // Switch which video plays when mode changes
  useEffect(() => {
    const day   = dayRef.current;
    const night = nightRef.current;
    if (!day || !night) return;

    if (mode === "day") {
      night.pause();
      day.play().catch(() => {});
    } else {
      day.pause();
      night.play().catch(() => {});
    }
  }, [mode]);

  return (
    <main>
      {/* Hero */}
      <div style={{ position: "sticky", top: 0, zIndex: 1, width: "100vw", height: "100dvh" }}>
        <video
          ref={dayRef}
          autoPlay muted loop playsInline preload="auto"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: mode === "day" ? 1 : 0, transition: "opacity 1.4s ease" }}
        >
          <source src={VIDEO_DAY} type="video/mp4" />
        </video>

        <video
          ref={nightRef}
          autoPlay muted loop playsInline preload="metadata"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: mode === "night" ? 1 : 0, transition: "opacity 1.4s ease" }}
        >
          <source src={VIDEO_NIGHT} type="video/mp4" />
        </video>

        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)" }} />

        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, pointerEvents: "none" }}>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 200,
            fontSize: "clamp(24px, 5.5vw, 82px)",
            letterSpacing: "0.08em",
            color: "white",
            textAlign: "center",
            lineHeight: 1,
            textShadow: mode === "day" ? "0 2px 40px rgba(0,0,0,0.5), 0 1px 8px rgba(0,0,0,0.4)" : "0 2px 20px rgba(0,0,0,0.3)",
            transition: "text-shadow 1.4s ease",
            padding: "0 16px",
          }}>
            CHÂTEAU LE MARARA
          </h1>
        </div>

        {/* Day / Night pill */}
        <div style={{
          position: "absolute", bottom: "clamp(20px, 4vw, 32px)", left: "clamp(16px, 4vw, 32px)", zIndex: 30,
          display: "flex", alignItems: "center", overflow: "hidden", borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(14px)", background: "rgba(0,0,0,0.28)",
        }}>
          {(["day", "night"] as const).map((m, i) => (
            <button key={m} onClick={() => setMode(m)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px clamp(12px, 2vw, 20px)",
                background: mode === m ? "rgba(255,255,255,0.15)" : "transparent",
                borderRight: i === 0 ? "1px solid rgba(255,255,255,0.15)" : "none",
                border: "none", cursor: "pointer", transition: "background 0.5s ease",
              }}>
              {m === "day" ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" style={{ opacity: mode === "day" ? 1 : 0.45 }}>
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" style={{ opacity: mode === "night" ? 1 : 0.45 }}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
              <span style={{ fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: mode === m ? "white" : "rgba(255,255,255,0.45)", transition: "color 0.4s ease" }}>
                {m === "day" ? "Day" : "Night"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <ChateauIntro />
      </div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <SplitPanels />
        <RoomsTeaser />
        <InstagramScroll />
      </div>
    </main>
  );
}