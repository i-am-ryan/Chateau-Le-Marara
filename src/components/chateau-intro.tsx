import { useState } from "react";
import { useLang } from "@/components/lang-context";
import { Reveal } from "@/components/reveal";

const T = {
  scriptLabel: { en: "Château le Marara", fr: "Château le Marara" },
  heading: {
    en: "REFINED LUXURY IN\nWESTERN PROVINCE",
    fr: "LUXE RAFFINÉ EN\nPROVINCE DE L'OUEST",
  },
  sublabel: {
    en: "A timeless retreat on\nthe shores of Lake Kivu",
    fr: "Un refuge intemporel sur\nles rives du Lac Kivu",
  },
  body1: {
    en: "Perched on the hills overlooking the pristine waters of Lake Kivu, Château Le Marara in Karongi, Rwanda, is more than just a hotel — it is a destination defined by elegance, tranquility, and a deep connection to the land.",
    fr: "Perché sur les collines dominant les eaux cristallines du Lac Kivu, le Château Le Marara à Karongi, Rwanda, est bien plus qu'un hôtel — c'est une destination définie par l'élégance, la tranquillité et un lien profond avec la nature.",
  },
  body2: {
    en: "As one of the finest hotels in Karongi, we invite you to immerse yourself in an atmosphere of refined comfort, where every detail is carefully curated to ensure an unforgettable stay on the shores of Lake Kivu.",
    fr: "En tant que l'un des plus beaux hôtels de Karongi, nous vous invitons à vous plonger dans une atmosphère de confort raffiné, où chaque détail est soigneusement pensé pour garantir un séjour inoubliable.",
  },
  readMore: { en: "Read more", fr: "Lire la suite" },
  readLess: { en: "Read less", fr: "Voir moins" },
};

const MOBILE_CSS = `
  @media (max-width: 768px) {
    [data-intro-grid] {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
    }
    [data-intro-sublabel] {
      display: none !important;
    }
  }
`;

export function ChateauIntro() {
  const { lang } = useLang();
  const [expanded, setExpanded] = useState(false);
  const [readHovered, setReadHovered] = useState(false);

  const body1 = T.body1[lang];
  const body2 = T.body2[lang];
  const lines = T.heading[lang].split("\n");

  return (
    <section style={{ background: "var(--cream)", overflow: "hidden" }}>
      <style>{MOBILE_CSS}</style>

      <div style={{ maxWidth: "1340px", margin: "0 auto", padding: "clamp(52px,8vw,80px) clamp(20px,4vw,52px)" }}>

        {/* Script label + rule */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
            <p style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(20px, 2vw, 30px)",
              fontWeight: 400,
              color: "var(--ocean)",
              margin: 0,
              whiteSpace: "nowrap",
              letterSpacing: "0.01em",
              lineHeight: 1,
            }}>
              {T.scriptLabel[lang]}
            </p>
            <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.12)" }} />
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.08}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(24px, 3.6vw, 50px)",
            letterSpacing: "0.04em",
            lineHeight: 1.18,
            color: "var(--navy)",
            textTransform: "uppercase",
            maxWidth: "90%",
            margin: "0 0 clamp(32px,5vw,56px) 0",
          }}>
            {lines.map((line, i) => (
              <span key={i} style={{ display: "block" }}>{line}</span>
            ))}
          </h2>
        </Reveal>

        {/* Two-column */}
        <div data-intro-grid style={{
          display: "grid",
          gridTemplateColumns: "clamp(140px, 20%, 260px) 1fr",
          gap: "clamp(24px,4vw,60px)",
          alignItems: "start",
        }}>

          {/* Left sublabel — hidden on mobile via CSS */}
          <Reveal>
            <p data-intro-sublabel style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(44,44,44,0.45)",
              lineHeight: 1.75,
              margin: 0,
              whiteSpace: "pre-line",
            }}>
              {T.sublabel[lang]}
            </p>
          </Reveal>

          {/* Right body + read more */}
          <Reveal delay={0.12}>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(14px, 1.15vw, 20px)",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "var(--ocean)",
              margin: "0 0 18px 0",
            }}>
              <span style={{
                float: "left",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(44px, 5.5vw, 76px)",
                lineHeight: 0.78,
                marginRight: "6px",
                marginTop: "8px",
                color: "var(--ocean)",
              }}>
                {body1[0]}
              </span>
              {body1.slice(1)}
            </p>

            <div style={{
              maxHeight: expanded ? "300px" : "0px",
              overflow: "hidden",
              transition: "max-height 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(14px, 1.15vw, 20px)",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "var(--ocean)",
                margin: "0 0 4px 0",
              }}>
                {body2}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              onMouseEnter={() => setReadHovered(true)}
              onMouseLeave={() => setReadHovered(false)}
              style={{
                display: "inline-block",
                marginTop: "14px",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(13px, 1vw, 16px)",
                fontWeight: 300,
                letterSpacing: "0.02em",
                color: readHovered ? "var(--gold)" : "var(--ocean)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                transition: "color 0.3s ease",
              }}
            >
              {expanded ? T.readLess[lang] : T.readMore[lang]}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}