import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLang } from "@/components/lang-context";

const NAV_ITEMS = [
  {
    to: "/our-story" as const,
    en: "Our Story",
    fr: "Notre Histoire",
    img: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1200&q=80",
  },
  {
    to: "/rooms" as const,
    en: "Rooms & Suites",
    fr: "Chambres & Suites",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
  },
  {
    to: "/lake-kivu" as const,
    en: "Lake Kivu",
    fr: "Lac Kivu",
    img: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=1200&q=80",
  },
  {
    to: "/experience" as const,
    en: "Experience",
    fr: "Expérience",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
  },
  {
    to: "/gallery" as const,
    en: "Gallery",
    fr: "Galerie",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  },
];

// All pages that have a full-bleed hero image — nav stays transparent on these
const HERO_PAGES = ["/", "/our-story", "/rooms", "/lake-kivu", "/experience", "/gallery", "/contact"];

const DEFAULT_IMG = "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1200&q=80";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { lang, setLang } = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Transparent on any hero page, until scrolled past 80px
  const onHero = HERO_PAGES.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const dark = onHero && !scrolled && !menuOpen;

  return (
    <>
      {/* ── Slim top bar ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "68px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 52px)",
        background: menuOpen
          ? "transparent"
          : dark
            ? "transparent"
            : "rgba(237,236,234,0.97)",
        backdropFilter: (!dark && !menuOpen) ? "blur(14px)" : "none",
        borderBottom: (!dark && !menuOpen) ? "1px solid rgba(0,0,0,0.07)" : "none",
        transition: "background 0.5s ease, border 0.5s ease",
      }}>

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          style={{
            display: "flex", alignItems: "center",
            textDecoration: "none", flexShrink: 0,
            opacity: menuOpen ? 0 : 1,
            pointerEvents: menuOpen ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
        >
          <img
            src="/img/logo.png"
            alt="Château le Marara"
            style={{
              height: "clamp(36px, 5vw, 56px)",
              width: "auto",
              filter: dark ? "brightness(0) invert(1)" : "none",
              transition: "filter 0.5s ease",
            }}
          />
        </Link>

        {/* Right side — lang + BOOK + hamburger */}
        <div style={{ display: "flex", alignItems: "center" }}>

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: dark ? "rgba(255,255,255,0.7)" : "var(--ocean)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0 clamp(10px, 2vw, 20px)",
              transition: "color 0.4s ease",
            }}
          >
            {lang === "en" ? "FR" : "EN"}
          </button>

          {/* BOOK — hidden when menu open */}
          {!menuOpen && (
            <Link
              to="/contact"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                height: "68px",
                padding: "0 clamp(14px, 2.5vw, 32px)",
                fontFamily: "var(--font-label)",
                fontSize: "11px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                background: dark ? "rgba(255,255,255,0.12)" : "var(--ink)",
                color: "white",
                border: dark ? "1px solid rgba(255,255,255,0.25)" : "none",
                backdropFilter: dark ? "blur(12px)" : "none",
                textDecoration: "none",
                transition: "all 0.5s ease",
                whiteSpace: "nowrap",
              }}
            >
              {lang === "en" ? "Book" : "Réserver"}
            </Link>
          )}

          {/* Hamburger / Close */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              display: "flex", flexDirection: "column", justifyContent: "center",
              alignItems: "center", gap: "5px",
              width: "44px", height: "68px",
              marginLeft: "clamp(6px, 1.5vw, 20px)",
              background: "transparent", border: "none", cursor: "pointer",
              flexShrink: 0, padding: 0,
            }}
          >
            {menuOpen ? (
              <X size={20} color="var(--ink)" strokeWidth={1.5} />
            ) : (
              <>
                <span style={{
                  display: "block", width: "22px", height: "1px",
                  background: dark ? "rgba(255,255,255,0.85)" : "var(--ink)",
                  transition: "background 0.4s ease",
                }} />
                <span style={{
                  display: "block", width: "14px", height: "1px",
                  background: dark ? "rgba(255,255,255,0.85)" : "var(--ink)",
                  alignSelf: "flex-end",
                  transition: "background 0.4s ease",
                }} />
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── Full-screen overlay menu ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 99,
        display: "flex",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}>

        {/* LEFT — crossfading image panel (desktop only) */}
        <div
          className="hidden md:block"
          style={{ flex: "1 1 55%", position: "relative", overflow: "hidden" }}
        >
          <img
            src={DEFAULT_IMG}
            alt="Château le Marara"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover",
              opacity: hoveredIdx === null ? 1 : 0,
              transition: "opacity 0.55s ease",
            }}
          />
          {NAV_ITEMS.map((item, i) => (
            <img
              key={i}
              src={item.img}
              alt={item.en}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover",
                opacity: hoveredIdx === i ? 1 : 0,
                transition: "opacity 0.55s ease",
              }}
            />
          ))}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />
        </div>

        {/* RIGHT — cream panel */}
        <div style={{
          flex: "0 0 auto",
          width: "min(100vw, 480px)",
          background: "var(--cream)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}>

          {/* Panel top bar — aligns with header height */}
          <div style={{
            height: "68px",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            flexShrink: 0,
          }} />

          {/* Logo — large, centred */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            padding: "clamp(28px, 4vw, 48px) 0 clamp(16px, 2.5vw, 28px)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            flexShrink: 0,
          }}>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}
            >
              <img
                src="/img/logo.png"
                alt="Château le Marara"
                style={{
                  height: "clamp(90px, 13vw, 160px)",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Link>
            <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="9" height="9" viewBox="0 0 8 8">
                  <polygon points="4,0 5,3 8,3 5.5,5 6.5,8 4,6 1.5,8 2.5,5 0,3 3,3" fill="var(--gold)" />
                </svg>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <nav style={{
            flex: 1,
            display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center",
            padding: "clamp(12px, 2vw, 24px) clamp(24px, 5vw, 56px)",
          }}>
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={i}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(16px, 2.4vw, 30px)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: hoveredIdx === i ? "var(--gold)" : "var(--ink)",
                  padding: "clamp(9px, 1.3vw, 14px) 0",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  transition: "color 0.25s ease",
                  lineHeight: 1,
                }}
              >
                {lang === "en" ? item.en : item.fr}
              </Link>
            ))}
          </nav>

          {/* Reserve CTA */}
          <div style={{
            padding: "clamp(16px, 2.5vw, 28px) clamp(24px, 5vw, 56px)",
            flexShrink: 0,
          }}>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "100%", padding: "15px 32px",
                background: "var(--ink)", color: "white",
                fontFamily: "var(--font-label)", fontSize: "11px",
                letterSpacing: "0.32em", textTransform: "uppercase",
                textDecoration: "none", transition: "opacity 0.3s ease",
              }}
            >
              {lang === "en" ? "Reserve Your Stay" : "Réservez Votre Séjour"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}