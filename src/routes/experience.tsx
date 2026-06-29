import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { useLang } from "@/components/lang-context";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Château le Marara" },
      { name: "description", content: "Gastronomy, celebrations and curated experiences at Château le Marara." },
    ],
  }),
  component: Experience,
});

const SPLIT_CSS = `
  @media (max-width: 768px) {
    [data-split-section] {
      grid-template-columns: 1fr !important;
      min-height: unset !important;
    }
    [data-split-section] > *:first-child {
      height: clamp(260px, 60vw, 420px);
    }
    [data-split-section][data-img-right] {
      direction: ltr !important;
    }
  }
  @media (max-width: 768px) {
    [data-exp-intro-grid] {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }
    [data-exp-intro-grid] > :first-child {
      display: none !important;
    }
  }
`;

function SplitSection({
  img, alt, imgLeft,
  label, title, body, bullets, ctaEn, ctaFr, lang, bg = "white",
}: {
  img: string; alt: string; imgLeft: boolean;
  label: string; title: string; body: string;
  bullets: string[]; ctaEn: string; ctaFr: string;
  lang: "en" | "fr"; bg?: string;
}) {
  const [imgHovered, setImgHovered] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  const imageEl = (
    <div
      style={{ overflow: "hidden", position: "relative", cursor: "pointer" }}
      onMouseEnter={() => setImgHovered(true)}
      onMouseLeave={() => setImgHovered(false)}
    >
      <motion.img
        src={img} alt={alt}
        animate={{ scale: imgHovered ? 1.04 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <motion.div
        animate={{ opacity: imgHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 0 3px var(--gold)", pointerEvents: "none" }}
      />
      <motion.div
        animate={{ opacity: imgHovered ? 0 : 0.08 }}
        style={{ position: "absolute", inset: 0, background: "black", pointerEvents: "none" }}
      />
    </div>
  );

  const textEl = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: bg, display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(36px,6vw,96px) clamp(24px,5vw,96px)" }}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "48px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ height: "1px", background: "var(--gold)", marginBottom: "22px" }}
      />
      <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.42em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 18px 0" }}>
        {label}
      </p>
      <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(24px, 3.2vw, 48px)", color: "var(--navy)", margin: "0 0 20px 0", lineHeight: 1.1 }}>
        {title}
      </h2>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(13px, 1.05vw, 16px)", fontWeight: 300, lineHeight: 1.85, color: "var(--ocean)", margin: "0 0 24px 0" }}>
        {body}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
        {bullets.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", fontFamily: "var(--font-sans)", fontSize: "clamp(12px, 0.95vw, 14px)", fontWeight: 300, color: "var(--ocean)" }}
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "20px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              style={{ height: "1px", background: "var(--gold)", flexShrink: 0, display: "inline-block" }}
            />
            {item}
          </motion.li>
        ))}
      </ul>
      <motion.div
        onHoverStart={() => setCtaHovered(true)}
        onHoverEnd={() => setCtaHovered(false)}
        style={{ alignSelf: "flex-start" }}
      >
        <Link to="/contact" style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase",
          color: "var(--ink)", textDecoration: "none", position: "relative", paddingBottom: "6px",
        }}>
          {lang === "en" ? ctaEn : ctaFr} <ArrowRight size={12} />
          <motion.div
            animate={{ width: ctaHovered ? "100%" : "60%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", bottom: 0, left: 0, height: "1px", background: "var(--gold)" }}
          />
        </Link>
      </motion.div>
    </motion.div>
  );

  return (
    <section
      data-split-section
      data-img-right={!imgLeft ? "" : undefined}
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "clamp(420px, 60vw, 760px)" }}
    >
      {imgLeft ? <>{imageEl}{textEl}</> : <>{textEl}{imageEl}</>}
    </section>
  );
}

function Experience() {
  const { lang } = useLang();

  return (
    <main style={{ background: "var(--cream)" }}>
      <style>{SPLIT_CSS}</style>

      {/* Hero */}
      <section style={{ position: "relative", height: "100dvh", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&q=90"
          alt="Dining at Château le Marara"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }} />

        <div style={{ position: "absolute", bottom: 0, right: 0, background: "var(--navy)", padding: "18px clamp(16px,3vw,32px)", zIndex: 2 }}>
          <Link to="/contact" style={{ fontFamily: "var(--font-label)", fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            {lang === "en" ? "Complete your booking" : "Finaliser votre réservation"} <ArrowRight size={12} />
          </Link>
        </div>

        <div style={{ position: "relative", zIndex: 1, padding: "clamp(36px, 6vw, 80px) clamp(20px, 5vw, 80px)", width: "100%" }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 14px 0" }}>
            {lang === "en" ? "Culinary Arts & Events" : "Arts Culinaires & Événements"}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.4 }}
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(40px, 7vw, 100px)", color: "white", lineHeight: 0.95, margin: "0 0 18px 0", whiteSpace: "pre-line" }}>
            {lang === "en" ? "Sensory\nExperiences" : "Expériences\nSensorielles"}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.6 }}
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(14px, 1.6vw, 22px)", fontWeight: 300, color: "rgba(255,255,255,0.65)", maxWidth: "480px", margin: 0 }}>
            {lang === "en" ? "Dedication to culinary arts & events — curated for you." : "Dédiés aux arts culinaires et aux événements — conçus pour vous."}
          </motion.p>
        </div>
      </section>

      <div style={{ position: "relative", zIndex: 2, background: "var(--cream)" }}>
        {/* Intro */}
        <section style={{ maxWidth: "1340px", margin: "0 auto", padding: "clamp(52px,8vw,80px) clamp(20px,5vw,80px) clamp(40px,5vw,72px)" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "28px" }}>
              <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(20px, 2vw, 30px)", color: "var(--ocean)", margin: 0, whiteSpace: "nowrap" }}>
                {lang === "en" ? "Curated For You" : "Créé Pour Vous"}
              </p>
              <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.12)" }} />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(22px, 3.4vw, 48px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--navy)", maxWidth: "90%", margin: "0 0 clamp(28px,4vw,40px) 0", lineHeight: 1.18 }}>
              {lang === "en" ? "ELEVATE YOUR SENSES" : "ÉLEVEZ VOS SENS"}
            </h2>
          </Reveal>
          <div data-exp-intro-grid style={{ display: "grid", gridTemplateColumns: "clamp(140px, 20%, 260px) 1fr", gap: "clamp(24px,4vw,60px)", alignItems: "start" }}>
            <Reveal>
              <p style={{ fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(44,44,44,0.45)", lineHeight: 1.75, margin: 0 }}>
                {lang === "en" ? "Royal Retreat · Karongi" : "Royal Retreat · Karongi"}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.15vw, 18px)", fontWeight: 300, lineHeight: 1.85, color: "var(--ocean)", margin: 0 }}>
                <span style={{ float: "left", fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(44px, 5.5vw, 72px)", lineHeight: 0.78, marginRight: "8px", marginTop: "6px", color: "var(--gold)" }}>F</span>
                {lang === "en"
                  ? "rom the aromatic spices of our kitchen to the meticulous planning of your grandest celebrations, every detail is designed to exceed expectations. We invite you to explore a world of refined flavors and flawless execution."
                  : "Des épices aromatiques de notre cuisine à la planification méticuleuse de vos plus grandes célébrations, chaque détail est conçu pour dépasser les attentes. Nous vous invitons à explorer un monde de saveurs raffinées et d'exécution irréprochable."}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Gastronomy */}
        <SplitSection
          img="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90"
          alt="The Royal Restaurant"
          imgLeft={true}
          label={lang === "en" ? "Gastronomy" : "Gastronomie"}
          title={lang === "en" ? "The Royal Restaurant" : "Le Restaurant Royal"}
          body={lang === "en"
            ? "Our flagship restaurant offers a culinary journey through Rwanda's finest produce, expertly blended with international techniques. Enjoy breakfast with the sunrise or a romantic dinner under the stars."
            : "Notre restaurant phare offre un voyage culinaire à travers les meilleurs produits du Rwanda, habilement mélangés aux techniques internationales. Savourez un petit-déjeuner au lever du soleil ou un dîner romantique sous les étoiles."}
          bullets={lang === "en"
            ? ["Farm-to-table philosophy", "Extensive international wine list", "Private dining options available"]
            : ["Philosophie de la ferme à la table", "Carte des vins internationale étendue", "Options de repas privés disponibles"]}
          ctaEn="Reserve a Table"
          ctaFr="Réserver une Table"
          lang={lang}
          bg="white"
        />

        {/* Celebrations */}
        <SplitSection
          img="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=90"
          alt="Celebrations"
          imgLeft={false}
          label={lang === "en" ? "Celebrations" : "Célébrations"}
          title={lang === "en" ? "Event Dedication" : "Dédication à l'Événement"}
          body={lang === "en"
            ? "Transform your special moments into unforgettable memories at Château le Marara. Whether it is an intimate wedding, a milestone celebration, or a sophisticated corporate gathering, our dedicated team ensures every detail is executed with precision and elegance."
            : "Transformez vos moments spéciaux en souvenirs inoubliables au Château le Marara. Notre équipe dévouée veille à chaque détail avec précision et élégance."}
          bullets={lang === "en"
            ? ["Tailored event planning and coordination", "Versatile indoor and outdoor venues", "Customizable culinary packages"]
            : ["Planification et coordination sur mesure", "Espaces intérieurs et extérieurs polyvalents", "Forfaits culinaires personnalisables"]}
          ctaEn="Plan Your Event"
          ctaFr="Planifier Votre Événement"
          lang={lang}
          bg="var(--cream)"
        />
      </div>
    </main>
  );
}