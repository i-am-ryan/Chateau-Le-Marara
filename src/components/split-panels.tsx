import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/components/lang-context";

const PANELS = [
  {
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85",
    title: { en: "Dining",    fr: "Gastronomie" },
    body: {
      en: "The chef strives to delight with delicious dishes highlighting local Rwandan produce, accompanied by fine French wines.",
      fr: "Le chef s'attache à ravir les papilles avec des plats délicieux mettant en valeur les produits locaux rwandais.",
    },
    href: "/contact" as const,
  },
  {
    img: "/hf_20260626_092719_8ba5b57f-580e-4fe3-b5fa-1c6b5218677f.png",
    title: { en: "Lake Kivu", fr: "Lac Kivu" },
    body: {
      en: "A natural jewel nestled among the green hills of Rwanda, seducing with sparkling waters and a peaceful atmosphere.",
      fr: "Un joyau naturel niché dans les collines verdoyantes du Rwanda, séduisant par ses eaux scintillantes.",
    },
    href: "/lake-kivu" as const,
  },
  {
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&q=85",
    title: { en: "Events",    fr: "Événements" },
    body: {
      en: "Host unforgettable celebrations for up to 60 guests in our exquisite venues with breathtaking views over Lake Kivu.",
      fr: "Organisez des célébrations inoubliables pour jusqu'à 60 personnes avec une vue imprenable sur le lac Kivu.",
    },
    href: "/contact" as const,
  },
  {
    img: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1400&q=85",
    title: { en: "Our Story", fr: "Notre Histoire" },
    body: {
      en: "A masterpiece of architecture inspired by French classicism, perched on the hills above Lake Kivu where Africa meets elegance.",
      fr: "Un chef-d'œuvre architectural inspiré du classicisme français, perché sur les collines au-dessus du lac Kivu.",
    },
    href: "/" as const,
  },
];

// Mobile: 2×2 grid of tall cards. Desktop: 2 side-by-side rows.
const SPLIT_CSS = `
  /* ── Mobile: 2×2 grid ── */
  @media (max-width: 768px) {
    [data-split-grid] {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      grid-template-rows: auto auto !important;
    }
    [data-split-row] {
      display: contents !important; /* children flow into the grid */
    }
    [data-split-panel] {
      width: 100% !important;
      height: clamp(200px, 52vw, 300px) !important;
    }
  }
  @media (max-width: 400px) {
    [data-split-panel] {
      height: 56vw !important;
    }
  }
`;

function Panel({ img, title, body, href }: {
  img: string; title: string; body: string; href: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={href as any}
      data-split-panel
      style={{
        position: "relative",
        width: "50%",
        height: "100%",
        display: "block",
        flexShrink: 0,
        overflow: "hidden",
        textDecoration: "none",
        backgroundColor: "#000",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", inset: 0 }}
      >
        <img
          src={img} alt={title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
      </motion.div>

      <motion.div
        animate={{ opacity: hovered ? 0.62 : 0.45 }}
        transition={{ duration: 0.6 }}
        style={{ position: "absolute", inset: 0, background: "black", zIndex: 1 }}
      />

      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.1)", zIndex: 3 }} />

      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "clamp(14px, 3.5vw, 52px)",
      }}>
        <motion.div
          animate={{ width: hovered ? "40px" : "0px", opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "1px", background: "var(--gold)", marginBottom: "10px" }}
        />
        <motion.h2
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-script)", fontWeight: 400,
            fontSize: "clamp(22px, 5vw, 80px)",
            lineHeight: 1.0, color: "white", margin: 0,
            letterSpacing: "0.01em",
            textShadow: "0 2px 40px rgba(0,0,0,0.3)",
          }}
        >
          {title}
        </motion.h2>
        <motion.p
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-sans)", fontSize: "clamp(11px, 1vw, 15px)",
            lineHeight: 1.75, color: "rgba(255,255,255,0.78)",
            fontWeight: 300, maxWidth: "400px", margin: "10px 0 0 0",
          }}
        >
          {body}
        </motion.p>
      </div>
    </Link>
  );
}

export function SplitPanels() {
  const { lang } = useLang();
  const rowH = "clamp(200px, 38vw, 520px)";

  return (
    <section
      data-split-grid
      style={{ width: "100%", position: "relative", zIndex: 3, backgroundColor: "#000" }}
    >
      <style>{SPLIT_CSS}</style>

      {/* Row 1 */}
      <div data-split-row style={{ width: "100%", height: rowH, display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Panel img={PANELS[0].img} title={PANELS[0].title[lang]} body={PANELS[0].body[lang]} href={PANELS[0].href} />
        <Panel img={PANELS[1].img} title={PANELS[1].title[lang]} body={PANELS[1].body[lang]} href={PANELS[1].href} />
      </div>

      {/* Row 2 */}
      <div data-split-row style={{ width: "100%", height: rowH, display: "flex" }}>
        <Panel img={PANELS[2].img} title={PANELS[2].title[lang]} body={PANELS[2].body[lang]} href={PANELS[2].href} />
        <Panel img={PANELS[3].img} title={PANELS[3].title[lang]} body={PANELS[3].body[lang]} href={PANELS[3].href} />
      </div>
    </section>
  );
}