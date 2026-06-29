import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { useLang } from "@/components/lang-context";
import { ArrowRight } from "lucide-react";

const LAKE_CSS = `
  @media (max-width: 768px) {
    [data-lake-intro] { grid-template-columns: 1fr !important; gap: 16px !important; }
    [data-lake-intro] > :first-child { display: none !important; }
  }
`;

export const Route = createFileRoute("/lake-kivu")({
  head: () => ({
    meta: [
      { title: "Lake Kivu — Château le Marara" },
      { name: "description", content: "Boat trips, the Congo Nile Trail, kayaking and more on Rwanda's most beautiful lake." },
    ],
  }),
  component: LakeKivu,
});

const PANELS = [
  {
    img: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=2000&q=90",
    titleEn: "DISCOVER KIBUYE", titleFr: "DÉCOUVRIR KIBUYE",
    bodyEn: "An idyllic destination on the shores of Lake Kivu, ideal for a relaxing nature getaway. Enjoy spectacular scenery, explore the surrounding islands, visit St. Peter's Cathedral and admire unforgettable sunsets.",
    bodyFr: "Une destination idyllique sur les rives du lac Kivu, idéale pour une escapade nature reposante. Profitez de paysages spectaculaires, explorez les îles environnantes et admirez des couchers de soleil inoubliables.",
  },
  {
    img: "/alina-kacharho-86wR5GZJZdQ-unsplash.jpg",
    titleEn: "BOAT TRIPS", titleFr: "EXCURSIONS EN BATEAU",
    bodyEn: "Explore magnificent Lake Kivu by boat and visit Île Napoléon, home to a colony of fruit bats, or Île Amahoro, renowned for its peaceful beaches.",
    bodyFr: "Explorez le magnifique lac Kivu en bateau et visitez l'Île Napoléon, ou l'Île Amahoro, réputée pour ses plages paisibles.",
  },
  {
    img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=2000&q=90",
    titleEn: "THE PRIVATE BEACH", titleFr: "LA PLAGE PRIVÉE",
    bodyEn: "Enjoy the serene atmosphere of the shores of Lake Kivu, where you can swim, sunbathe or simply admire the spectacular views from the château's exclusive lakeshore.",
    bodyFr: "Profitez de l'atmosphère sereine des rives du lac Kivu, où vous pouvez nager, vous prélasser au soleil ou simplement admirer les vues spectaculaires.",
  },
  {
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=90",
    titleEn: "CONGO NILE TRAIL", titleFr: "SENTIER CONGO-NIL",
    bodyEn: "Hike or cycle along the famous Congo Nile Trail, which offers breathtaking views of rolling hills, coffee plantations and the shores of Lake Kivu.",
    bodyFr: "Randonnée ou vélo sur le célèbre sentier Congo-Nil, qui offre des vues à couper le souffle sur les collines ondulantes et les rives du lac Kivu.",
  },
  {
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=2000&q=90",
    titleEn: "KAYAK & PADDLE", titleFr: "KAYAK & PADDLE",
    bodyEn: "Adventure-seekers will enjoy kayaking or paddling on Lake Kivu. Its calm waters make it an ideal place to explore at your own pace.",
    bodyFr: "Les amateurs d'aventure apprécieront le kayak ou le paddle sur le lac Kivu. Ses eaux calmes en font un endroit idéal à explorer à votre rythme.",
  },
];

function PanelSection({ panel, index, lang }: { panel: typeof PANELS[0]; index: number; lang: "en" | "fr" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      position: "sticky",
      top: 0,
      zIndex: index + 1,
      height: "clamp(360px, 55vw, 700px)",
      overflow: "hidden",
    }}>
      <div
        style={{ position: "relative", width: "100%", height: "100%", cursor: "pointer" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.img
          src={panel.img}
          alt={lang === "en" ? panel.titleEn : panel.titleFr}
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }} />

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(20px, 4vw, 52px)" }}>
          <motion.div animate={{ y: hovered ? -6 : 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "clamp(20px, 3.5vw, 52px)",
              letterSpacing: "0.04em", textTransform: "uppercase",
              color: "white", margin: "0 0 10px 0", lineHeight: 1,
              maxWidth: "calc(100% - 160px)",
            }}>
              {lang === "en" ? panel.titleEn : panel.titleFr}
            </h2>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "clamp(12px, 1.1vw, 16px)",
              fontWeight: 300, lineHeight: 1.75,
              color: "rgba(255,255,255,0.72)",
              maxWidth: "480px", margin: 0,
            }}>
              {lang === "en" ? panel.bodyEn : panel.bodyFr}
            </p>
          </motion.div>
        </div>

        {/* Discover CTA — repositioned for mobile */}
        <div style={{ position: "absolute", bottom: "clamp(20px,4vw,52px)", right: "clamp(16px,4vw,52px)" }}>
          <Link to="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.25)",
            padding: "9px 18px",
            fontFamily: "var(--font-label)", fontSize: "10px",
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "white", textDecoration: "none",
            transition: "background 0.3s ease",
            whiteSpace: "nowrap",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(201,169,97,0.5)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"}
          >
            {lang === "en" ? "Discover" : "Découvrir"} →
          </Link>
        </div>
      </div>
    </div>
  );
}

function LakeKivu() {
  const { lang } = useLang();

  return (
    <main style={{ background: "var(--cream)" }}>
      <style>{LAKE_CSS}</style>

      {/* Hero */}
      <section style={{ position: "relative", height: "100dvh", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <img
          src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=2400&q=90"
          alt="Lake Kivu"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />

        <div style={{ position: "absolute", bottom: 0, right: 0, background: "var(--navy)", padding: "18px clamp(16px,3vw,32px)", zIndex: 2 }}>
          <Link to="/contact" style={{
            fontFamily: "var(--font-label)", fontSize: "11px",
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: "white", textDecoration: "none",
            display: "flex", alignItems: "center", gap: "10px",
          }}>
            {lang === "en" ? "Complete your booking" : "Finaliser votre réservation"} <ArrowRight size={12} />
          </Link>
        </div>

        <div style={{ position: "relative", zIndex: 1, padding: "clamp(36px, 6vw, 80px) clamp(20px, 5vw, 80px)", width: "100%" }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 14px 0" }}>
            {lang === "en" ? "Karongi · Rwanda" : "Karongi · Rwanda"}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.4 }}
            style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "clamp(44px, 9vw, 130px)",
              color: "white", lineHeight: 0.95, margin: "0 0 18px 0",
            }}>
            {lang === "en" ? "Lake Kivu" : "Lac Kivu"}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.6 }}
            style={{
              fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: "clamp(14px, 1.8vw, 24px)", fontWeight: 300,
              color: "rgba(255,255,255,0.65)", maxWidth: "500px", margin: 0,
            }}>
            {lang === "en" ? "Africa's most beautiful lake, just beyond the château's gardens." : "Le plus beau lac d'Afrique, juste au-delà des jardins du château."}
          </motion.p>
        </div>
      </section>

      <div style={{ position: "relative", zIndex: 2, background: "var(--cream)" }}>
        {/* Intro */}
        <section style={{ maxWidth: "1340px", margin: "0 auto", padding: "clamp(52px,8vw,80px) clamp(20px,5vw,80px) clamp(40px,5vw,60px)" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "28px" }}>
              <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(20px, 2vw, 30px)", fontWeight: 400, color: "var(--ocean)", margin: 0, whiteSpace: "nowrap" }}>
                {lang === "en" ? "Discover Kibuye" : "Découvrir Kibuye"}
              </p>
              <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.12)" }} />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "clamp(22px, 3.4vw, 48px)", letterSpacing: "0.04em", textTransform: "uppercase",
              color: "var(--navy)", maxWidth: "90%", margin: "0 0 clamp(24px,4vw,40px) 0", lineHeight: 1.18, whiteSpace: "pre-line",
            }}>
              {lang === "en" ? "AFRICA'S MOST\nBEAUTIFUL LAKE" : "LE PLUS BEAU LAC\nD'AFRIQUE"}
            </h2>
          </Reveal>
          <div data-lake-intro style={{ display: "grid", gridTemplateColumns: "clamp(140px, 20%, 260px) 1fr", gap: "clamp(24px,4vw,60px)", alignItems: "start" }}>
            <Reveal>
              <p style={{ fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(44,44,44,0.45)", lineHeight: 1.75, margin: 0, whiteSpace: "pre-line" }}>
                {lang === "en" ? "Karongi\nWestern Province\nRwanda" : "Karongi\nProvince de l'Ouest\nRwanda"}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.15vw, 18px)", fontWeight: 300, lineHeight: 1.85, color: "var(--ocean)", margin: 0 }}>
                <span style={{ float: "left", fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(44px, 5.5vw, 72px)", lineHeight: 0.78, marginRight: "8px", marginTop: "8px", color: "var(--gold)" }}>K</span>
                {lang === "en"
                  ? "ibuye is an idyllic destination on the shores of Lake Kivu, ideal for a relaxing nature getaway. Enjoy spectacular scenery, explore the surrounding islands, visit St. Peter's Cathedral and admire unforgettable sunsets. Stay at Château le Marara for a unique experience combining comfort and serenity."
                  : "ibuye est une destination idyllique sur les rives du lac Kivu, idéale pour une escapade nature reposante. Profitez de paysages spectaculaires, explorez les îles environnantes, visitez la cathédrale Saint-Pierre et admirez des couchers de soleil inoubliables."}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Stacked panels */}
        <section style={{ position: "relative" }}>
          {PANELS.map((panel, i) => (
            <PanelSection key={i} panel={panel} index={i} lang={lang} />
          ))}
        </section>

        {/* CTA section */}
        <section style={{ background: "var(--cream)", padding: "clamp(48px,8vw,120px) clamp(20px,5vw,80px)", textAlign: "center" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(18px, 2vw, 26px)", color: "var(--gold)", margin: "0 0 18px 0" }}>
              {lang === "en" ? "Plan your escape" : "Planifiez votre évasion"}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "clamp(24px, 4vw, 58px)", letterSpacing: "0.04em", textTransform: "uppercase",
              color: "var(--navy)", margin: "0 0 18px 0", lineHeight: 1.1, whiteSpace: "pre-line",
            }}>
              {lang === "en" ? "EVERY JOURNEY BEGINS\nAT THE WATER'S EDGE" : "CHAQUE VOYAGE COMMENCE\nAU BORD DE L'EAU"}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.1vw, 17px)", fontWeight: 300, lineHeight: 1.85, color: "var(--ocean)", maxWidth: "560px", margin: "0 auto 36px" }}>
              {lang === "en"
                ? "Let our concierge curate your days on Lake Kivu — from private boat excursions to guided trail hikes and serene morning paddles."
                : "Laissez notre concierge organiser vos journées sur le lac Kivu — des excursions en bateau privé aux randonnées guidées et aux promenades matinales."}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "36px" }}>
              <div style={{ width: "48px", height: "1px", background: "var(--gold)", opacity: 0.5 }} />
              <div style={{ width: "5px", height: "5px", background: "var(--gold)", borderRadius: "50%", opacity: 0.7 }} />
              <div style={{ width: "48px", height: "1px", background: "var(--gold)", opacity: 0.5 }} />
            </div>
            <Link to="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              padding: "14px clamp(28px,4vw,56px)",
              background: "var(--navy)", color: "white",
              fontFamily: "var(--font-label)", fontSize: "10px",
              letterSpacing: "0.35em", textTransform: "uppercase",
              textDecoration: "none", transition: "background 0.4s ease",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--gold)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--navy)"}
            >
              {lang === "en" ? "Speak with our Concierge" : "Parler à notre Concierge"} <ArrowRight size={13} />
            </Link>
          </Reveal>
        </section>
      </div>
    </main>
  );
}