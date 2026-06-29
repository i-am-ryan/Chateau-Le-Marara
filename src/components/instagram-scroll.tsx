import { useLang } from "@/components/lang-context";
import { Instagram } from "lucide-react";

// Two rows of images — duplicated for seamless looping
const ROW1 = [
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85", alt: "Chateau aerial" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=85", alt: "Fine dining" },
  { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=700&q=85", alt: "Lake Kivu" },
  { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=85", alt: "Deluxe room" },
  { src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=700&q=85", alt: "Terrace" },
  { src: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=700&q=85", alt: "Garden" },
];

const ROW2 = [
  { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=700&q=85", alt: "Junior suite" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=85", alt: "Hotel exterior" },
  { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=85", alt: "Superior room" },
  { src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=700&q=85", alt: "Suite interior" },
  { src: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=700&q=85", alt: "Pool" },
  { src: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=700&q=85", alt: "Lake view" },
];

const T = {
  scriptLabel: { en: "A story written in luxury", fr: "Une histoire écrite dans le luxe" },
  quote: { en: "WHERE AFRICA MEETS\nFRENCH ELEGANCE", fr: "LÀ OÙ L'AFRIQUE RENCONTRE\nL'ÉLÉGANCE FRANÇAISE" },
  sub:   { en: "A stay you will carry with you, long after you leave.", fr: "Un séjour que vous porterez en vous, longtemps après votre départ." },
  cta:   { en: "Follow us on Instagram", fr: "Suivez-nous sur Instagram" },
};

// CSS-driven infinite marquee — no JS animation, no scroll dependency
const MARQUEE_CSS = `
  @keyframes marquee-left {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes marquee-right {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }
  [data-marquee-left] {
    display: flex;
    gap: 10px;
    width: max-content;
    animation: marquee-left 38s linear infinite;
    will-change: transform;
  }
  [data-marquee-right] {
    display: flex;
    gap: 10px;
    width: max-content;
    animation: marquee-right 44s linear infinite;
    will-change: transform;
  }
  [data-marquee-left]:hover,
  [data-marquee-right]:hover {
    animation-play-state: paused;
  }
`;

export function InstagramScroll() {
  const { lang } = useLang();

  // Duplicate images for seamless loop
  const row1 = [...ROW1, ...ROW1];
  const row2 = [...ROW2, ...ROW2];

  return (
    <section style={{
      background: "var(--cream)",
      overflow: "hidden",
      paddingTop: "clamp(64px,8vw,100px)",
      paddingBottom: "clamp(64px,8vw,110px)",
      position: "relative",
      zIndex: 3,
    }}>
      <style>{MARQUEE_CSS}</style>

      {/* Header */}
      <div style={{ maxWidth: "1340px", margin: "0 auto", padding: "0 clamp(20px,4vw,52px) clamp(40px,5vw,64px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "28px" }}>
          <p style={{
            fontFamily: "var(--font-script)", fontSize: "clamp(20px, 2vw, 30px)",
            fontWeight: 400, color: "var(--ocean)",
            margin: 0, whiteSpace: "nowrap", letterSpacing: "0.01em", lineHeight: 1,
          }}>
            {T.scriptLabel[lang]}
          </p>
          <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.12)" }} />
          <Instagram size={18} color="var(--gold)" style={{ opacity: 0.75, flexShrink: 0 }} />
        </div>

        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "clamp(24px, 3.6vw, 50px)", letterSpacing: "0.04em",
          lineHeight: 1.18, color: "var(--navy)", textTransform: "uppercase",
          maxWidth: "90%", margin: "0 0 20px 0", whiteSpace: "pre-line",
        }}>
          {T.quote[lang]}
        </h2>

        <p style={{
          fontFamily: "var(--font-sans)", fontSize: "clamp(13px, 1.15vw, 18px)",
          fontWeight: 300, lineHeight: 1.8, color: "var(--ocean)",
          margin: "0 0 24px 0", maxWidth: "480px",
        }}>
          {T.sub[lang]}
        </p>

        <a
          href="https://www.instagram.com/chateaumarara"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontFamily: "var(--font-label)", fontSize: "10px",
            letterSpacing: "0.35em", textTransform: "uppercase" as const,
            color: "var(--gold)", textDecoration: "none",
            borderBottom: "1px solid var(--gold)", paddingBottom: "3px",
          }}
        >
          <Instagram size={11} />
          {T.cta[lang]} @chateaumarara
        </a>
      </div>

      {/* Row 1 — scrolls left */}
      <div style={{ overflow: "hidden", marginBottom: "10px" }}>
        <div data-marquee-left>
          {row1.map((img, i) => (
            <div key={i} style={{
              width: "clamp(180px, 22vw, 360px)",
              height: "clamp(130px, 16vw, 250px)",
              flexShrink: 0, overflow: "hidden",
            }}>
              <img src={img.src} alt={img.alt} loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div style={{ overflow: "hidden" }}>
        <div data-marquee-right>
          {row2.map((img, i) => (
            <div key={i} style={{
              width: "clamp(180px, 22vw, 360px)",
              height: "clamp(130px, 16vw, 250px)",
              flexShrink: 0, overflow: "hidden",
            }}>
              <img src={img.src} alt={img.alt} loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}