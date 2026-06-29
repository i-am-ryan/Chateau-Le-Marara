import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "@/components/lang-context";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Château le Marara" },
      { name: "description", content: "Explore Château le Marara through our gallery of exterior, interior, rooms, dining and events." },
    ],
  }),
  component: Gallery,
});

const CATEGORIES = [
  {
    key: "exterior",
    en: "Exterior", fr: "Extérieur",
    tagEn: "The Château", tagFr: "Le Château",
    hero: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=2000&q=90",
    images: [
      { src: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1200&q=90", span: "2x2" },
      { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=90",  span: "1x1" },
      { src: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=90",  span: "1x2" },
      { src: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=800&q=90",     span: "1x1" },
      { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=90", span: "2x1" },
      { src: "https://images.unsplash.com/photo-1562618817-253a2b6ab6c4?w=800&q=90",     span: "1x1" },
      { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=90",  span: "1x1" },
    ],
  },
  {
    key: "interior",
    en: "Interior", fr: "Intérieur",
    tagEn: "Inside the Walls", tagFr: "Dans les Murs",
    hero: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=2000&q=90",
    images: [
      { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=90", span: "2x2" },
      { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=90",  span: "1x2" },
      { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=90",  span: "1x1" },
      { src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=90",  span: "1x1" },
      { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=90", span: "2x1" },
      { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=90",  span: "1x1" },
      { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=90",  span: "1x1" },
    ],
  },
  {
    key: "rooms",
    en: "Rooms", fr: "Chambres",
    tagEn: "Sanctuaries of Rest", tagFr: "Sanctuaires de Repos",
    hero: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=2000&q=90",
    images: [
      { src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=90", span: "1x2" },
      { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=90",  span: "1x1" },
      { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=90",  span: "1x1" },
      { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=90", span: "2x1" },
      { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=90",  span: "1x1" },
      { src: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=800&q=90",     span: "2x1" },
    ],
  },
  {
    key: "dining",
    en: "Dining", fr: "Gastronomie",
    tagEn: "The Royal Table", tagFr: "La Table Royale",
    hero: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2000&q=90",
    images: [
      { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90", span: "2x2" },
      { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=90",  span: "1x1" },
      { src: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=90",  span: "1x2" },
      { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=90",     span: "1x1" },
      { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90", span: "2x1" },
      { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=90",  span: "1x1" },
    ],
  },
  {
    key: "events",
    en: "Events", fr: "Événements",
    tagEn: "Celebrations", tagFr: "Célébrations",
    hero: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=2000&q=90",
    images: [
      { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=90", span: "2x2" },
      { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=90",  span: "1x2" },
      { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=90",  span: "1x1" },
      { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=90",  span: "1x1" },
      { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=90", span: "2x1" },
      { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=90",  span: "1x1" },
    ],
  },
];

const SPAN_MAP: Record<string, { colSpan: number; rowSpan: number }> = {
  "2x2": { colSpan: 2, rowSpan: 2 },
  "2x1": { colSpan: 2, rowSpan: 1 },
  "1x2": { colSpan: 1, rowSpan: 2 },
  "1x1": { colSpan: 1, rowSpan: 1 },
};

const GALLERY_CSS = `
  @media (max-width: 768px) {
    [data-mosaic] {
      grid-template-columns: repeat(2, 1fr) !important;
      grid-auto-rows: 44vw !important;
    }
    [data-mosaic] > * {
      grid-column: span 1 !important;
      grid-row: span 1 !important;
    }
  }
  @media (max-width: 480px) {
    [data-mosaic] {
      grid-template-columns: 1fr !important;
      grid-auto-rows: 60vw !important;
    }
  }
  @media (max-width: 640px) {
    [data-gallery-tabs] {
      flex-wrap: wrap !important;
      justify-content: center !important;
    }
  }
`;

function Gallery() {
  const { lang } = useLang();
  const [activeCat, setActiveCat] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const cat = CATEGORIES[activeCat];
  const allImgs = cat.images.map(i => i.src);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const lbPrev = () => setLightbox(i => i === null ? null : (i - 1 + allImgs.length) % allImgs.length);
  const lbNext = () => setLightbox(i => i === null ? null : (i + 1) % allImgs.length);

  return (
    <main style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <style>{GALLERY_CSS}</style>

      {/* Hero */}
      <div style={{ position: "relative", height: "100dvh", overflow: "hidden" }}>
        {CATEGORIES.map((c, i) => (
          <motion.div
            key={c.key}
            animate={{ opacity: i === activeCat ? 1 : 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <img src={c.hero} alt={c.en} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)" }} />
          </motion.div>
        ))}

        {/* Category name */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: "center", padding: "0 20px" }}
            >
              <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 14px 0" }}>
                {lang === "en" ? cat.tagEn : cat.tagFr}
              </p>
              <h1 style={{
                fontFamily: "var(--font-display)", fontWeight: 200,
                fontSize: "clamp(52px, 12vw, 160px)",
                color: "white", lineHeight: 0.9, margin: 0,
                letterSpacing: "-0.02em",
              }}>
                {lang === "en" ? cat.en : cat.fr}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tabs */}
        <div
          data-gallery-tabs
          style={{
            position: "absolute", bottom: "clamp(16px,4vw,40px)",
            left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: "2px", zIndex: 3,
            background: "rgba(237,236,234,0.92)", backdropFilter: "blur(12px)",
            padding: "4px",
            maxWidth: "calc(100vw - 32px)",
          }}
        >
          {CATEGORIES.map((c, i) => (
            <button
              key={c.key}
              onClick={() => setActiveCat(i)}
              style={{
                fontFamily: "var(--font-label)", fontSize: "9px",
                letterSpacing: "0.22em", textTransform: "uppercase",
                padding: "9px clamp(8px,2.5vw,20px)",
                whiteSpace: "nowrap",
                background: i === activeCat ? "var(--gold)" : "transparent",
                color: i === activeCat ? "white" : "rgba(44,44,44,0.55)",
                border: "none", cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {lang === "en" ? c.en : c.fr}
            </button>
          ))}
        </div>
      </div>

      {/* Mosaic */}
      <div style={{ background: "var(--cream)", padding: "clamp(12px,1.5vw,24px)" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat}
            data-mosaic
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridAutoRows: "clamp(140px, 18vw, 280px)",
              gap: "clamp(3px,0.4vw,7px)",
            }}
          >
            {cat.images.map((img, i) => {
              const { colSpan, rowSpan } = SPAN_MAP[img.span] ?? { colSpan: 1, rowSpan: 1 };
              return (
                <MosaicCell
                  key={`${activeCat}-${i}`}
                  src={img.src}
                  colSpan={colSpan}
                  rowSpan={rowSpan}
                  index={i}
                  onClick={() => setLightbox(i)}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", inset: 0, zIndex: 500,
              background: "rgba(0,0,0,0.96)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} style={{
              position: "absolute", top: "20px", right: "20px",
              background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer",
              width: "44px", height: "44px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", zIndex: 2,
            }}>
              <X size={18} strokeWidth={1.5} />
            </button>

            <p style={{
              position: "absolute", top: "28px", left: "50%", transform: "translateX(-50%)",
              fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.35em",
              color: "rgba(255,255,255,0.4)", margin: 0, zIndex: 2,
            }}>
              {String(lightbox + 1).padStart(2, "0")} / {String(allImgs.length).padStart(2, "0")}
            </p>

            <AnimatePresence mode="wait">
              <motion.img
                key={lightbox}
                src={allImgs[lightbox]}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={e => e.stopPropagation()}
                style={{ maxHeight: "82vh", maxWidth: "88vw", objectFit: "contain", display: "block", zIndex: 1 }}
              />
            </AnimatePresence>

            <button onClick={e => { e.stopPropagation(); lbPrev(); }} style={{
              position: "absolute", left: "clamp(8px,3vw,40px)", top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer",
              width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", backdropFilter: "blur(8px)", zIndex: 2,
            }}>
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>
            <button onClick={e => { e.stopPropagation(); lbNext(); }} style={{
              position: "absolute", right: "clamp(8px,3vw,40px)", top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer",
              width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", backdropFilter: "blur(8px)", zIndex: 2,
            }}>
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>

            {/* Thumbnail strip — scroll on mobile */}
            <div style={{
              position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)",
              display: "flex", gap: "5px", zIndex: 2,
              maxWidth: "calc(100vw - 40px)", overflowX: "auto",
              WebkitOverflowScrolling: "touch" as const,
              padding: "4px 0",
            }}>
              {allImgs.map((src, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setLightbox(i); }} style={{
                  width: "48px", height: "34px", overflow: "hidden", padding: 0, flexShrink: 0,
                  border: i === lightbox ? "2px solid var(--gold)" : "2px solid transparent",
                  cursor: "pointer", opacity: i === lightbox ? 1 : 0.45,
                  transition: "all 0.25s ease",
                }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function MosaicCell({ src, colSpan, rowSpan, index, onClick }: {
  src: string; colSpan: number; rowSpan: number; index: number; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        position: "relative", overflow: "hidden", cursor: "zoom-in",
      }}
    >
      <motion.img
        src={src} alt=""
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <motion.div
        animate={{ opacity: hovered ? 0.4 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ position: "absolute", inset: 0, background: "black", pointerEvents: "none" }}
      />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 0 2px var(--gold)", pointerEvents: "none" }}
      />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: "40px", height: "40px", borderRadius: "50%",
          background: "rgba(201,169,97,0.85)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      </motion.div>
    </motion.div>
  );
}