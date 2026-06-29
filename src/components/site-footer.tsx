import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail } from "lucide-react";
import { useLang } from "@/components/lang-context";

const T = {
  tagline:  { en: "Where Africa meets elegance.", fr: "Là où l'Afrique rencontre l'élégance." },
  navigate: { en: "Navigate",    fr: "Navigation" },
  home:     { en: "Home",        fr: "Accueil" },
  rooms:    { en: "The Rooms",   fr: "Les Chambres" },
  lake:     { en: "Lake Kivu",   fr: "Lac Kivu" },
  contact:  { en: "Contact",     fr: "Contact" },
  findUs:   { en: "Find Us",     fr: "Nous Trouver" },
  address:  { en: "Kibuye, Western Province\nRwanda · Lake Kivu", fr: "Kibuye, Province de l'Ouest\nRwanda · Lac Kivu" },
  rights:   { en: "All rights reserved.", fr: "Tous droits réservés." },
  designed: { en: "Designed for direct bookings", fr: "Conçu pour les réservations directes" },
};

export function SiteFooter() {
  const { lang } = useLang();

  return (
    <footer style={{ background: "#202020", color: "rgba(255,255,255,0.8)" }}>
      <div style={{
        maxWidth: "1400px", margin: "0 auto",
        padding: "clamp(48px,8vw,80px) clamp(20px,4vw,40px)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "clamp(32px,4vw,48px)",
      }}>
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px,1.8vw,24px)", letterSpacing: "0.05em", color: "white", margin: "0 0 12px 0" }}>
            Château le Marara
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "rgba(255,255,255,0.6)", fontSize: "clamp(14px,1.2vw,18px)", margin: 0 }}>
            {T.tagline[lang]}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 8px 0" }}>
            {T.navigate[lang]}
          </p>
          {[
            { to: "/" as const,          label: T.home[lang] },
            { to: "/rooms" as const,     label: T.rooms[lang] },
            { to: "/lake-kivu" as const, label: T.lake[lang] },
            { to: "/contact" as const,   label: T.contact[lang] },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{
              fontFamily: "var(--font-sans)", fontSize: "clamp(12px,1vw,14px)", fontWeight: 300,
              color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.3s ease",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--gold)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"}
            >
              {label}
            </Link>
          ))}
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 12px 0" }}>
            {T.findUs[lang]}
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(12px,1vw,14px)", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: "0 0 20px 0", whiteSpace: "pre-line" }}>
            {T.address[lang]}
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            {[Instagram, Facebook, Mail].map((Icon, i) => (
              <a key={i} href="#" style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.3s ease" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--gold)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{
          maxWidth: "1400px", margin: "0 auto",
          padding: "clamp(16px,2vw,24px) clamp(20px,4vw,40px)",
          display: "flex", flexDirection: "row", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between", gap: "10px",
        }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            © {new Date().getFullYear()} Château le Marara. {T.rights[lang]}
          </p>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            {T.designed[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}