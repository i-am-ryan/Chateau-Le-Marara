import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { useLang } from "@/components/lang-context";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — Château le Marara" },
      { name: "description", content: "A legacy of luxury and authentic Rwandan hospitality on the shores of Lake Kivu." },
    ],
  }),
  component: OurStory,
});

const T = {
  heroLabel:   { en: "Our Story",           fr: "Notre Histoire" },
  heroHeading: { en: "A LEGACY OF LUXURY\nAND RWANDAN HERITAGE", fr: "UN HÉRITAGE DE LUXE\nET DE CULTURE RWANDAISE" },
  heroSub:     { en: "Karongi · Rwanda · Lake Kivu", fr: "Karongi · Rwanda · Lac Kivu" },
  s1Script:    { en: "Welcome to Our World", fr: "Bienvenue dans Notre Monde" },
  s1Heading:   { en: "THE ESSENCE OF\nCHÂTEAU LE MARARA", fr: "L'ESSENCE DU\nCHÂTEAU LE MARARA" },
  s1Label:     { en: "Est. 1884 · Karongi, Rwanda", fr: "Fondé en 1884 · Karongi, Rwanda" },
  s1Body1:     {
    en: "Château Le Marara is more than just a destination; it's a profound experience born from a vision to blend the rich cultural tapestry of Rwanda with the pinnacle of luxury hospitality. Our story is woven into the stunning landscapes of Karongi, by the serene Lake Kivu, offering a sanctuary where every detail reflects our commitment to excellence, heritage, and tranquility.",
    fr: "Le Château Le Marara est bien plus qu'une destination ; c'est une expérience profonde née d'une vision qui allie la riche tapisserie culturelle du Rwanda au summum de l'hospitalité de luxe. Notre histoire est tissée dans les paysages époustouflants de Karongi, au bord du serein lac Kivu.",
  },
  s1Body2:     {
    en: "We believe in creating timeless memories, fostering a connection with the local environment, and providing a personalized service that anticipates every guest's desire. From the moment you arrive, you become part of our story.",
    fr: "Nous croyons en la création de souvenirs intemporels, en favorisant une connexion avec l'environnement local et en offrant un service personnalisé qui anticipe chaque désir de nos hôtes.",
  },
  bigQuote1:   { en: "Where Africa Meets\nFrench Elegance", fr: "Là où l'Afrique Rencontre\nl'Élégance Française" },
  s2Script:    { en: "A Vision of Elegance", fr: "Une Vision d'Élégance" },
  s2Heading:   { en: "OUR PHILOSOPHY", fr: "NOTRE PHILOSOPHIE" },
  s2Body:      {
    en: "Château Le Marara is purposefully positioned as a leading luxury destination, setting new standards for high-end hospitality in Rwanda. We seamlessly blend African heritage with global luxury trends, creating an experience that is both uniquely Rwandan and universally appealing.",
    fr: "Le Château Le Marara se positionne délibérément comme une destination de luxe de premier plan, établissant de nouvelles normes pour l'hospitalité haut de gamme au Rwanda. Nous fusionnons harmonieusement le patrimoine africain avec les tendances mondiales du luxe.",
  },
  bigQuote2:   { en: "Unmatched\nService", fr: "Un Service\nSans Égal" },
  s3Heading:   { en: "OUR CORE BELIEFS", fr: "NOS CONVICTIONS" },
  values: [
    { en: "Integrity",  fr: "Intégrité",  descEn: "Upholding honesty and ethical practices in every interaction with our guests and partners.", descFr: "Maintenir l'honnêteté et les pratiques éthiques dans chaque interaction avec nos hôtes et partenaires." },
    { en: "Excellence", fr: "Excellence", descEn: "Striving for the highest quality in service and experience, exceeding expectations at every turn.", descFr: "Viser la plus haute qualité de service et d'expérience, dépassant les attentes à chaque instant." },
    { en: "Harmony",    fr: "Harmonie",   descEn: "Connecting with nature, culture, and community for a balanced and meaningful experience.", descFr: "Connexion avec la nature, la culture et la communauté pour une expérience équilibrée et significative." },
  ],
  ctaLabel:    { en: "Reserve Your Stay", fr: "Réservez Votre Séjour" },
  ctaSub:      { en: "Every journey begins with a single step. Yours begins here.", fr: "Chaque voyage commence par un premier pas. Le vôtre commence ici." },
};



const OUR_STORY_CSS = `
  @media (max-width: 768px) {
    [data-os-two-col] { grid-template-columns: 1fr !important; gap: 20px !important; }
    [data-os-two-col] > :first-child { display: none !important; }
    [data-os-values] { grid-template-columns: 1fr !important; }
    [data-os-split] { grid-template-columns: 1fr !important; min-height: unset !important; }
    [data-os-split] > div:first-child { height: clamp(240px, 55vw, 400px) !important; }
  }
`;



function ValueCard({ title, desc, delay }: { title: string; desc: string; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={delay}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ y: hovered ? -8 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", padding: "28px 24px 32px", cursor: "default", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, height: "2px", width: hovered ? "100%" : "40px", background: "var(--gold)", transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)" }} />
        <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(26px, 3vw, 42px)", color: "var(--gold)", margin: "0 0 14px 0", lineHeight: 1 }}>
          {title}
        </p>
        <motion.p
          animate={{ opacity: hovered ? 1 : 0.55 }}
          transition={{ duration: 0.35 }}
          style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(13px, 1vw, 16px)", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.85)", margin: 0 }}
        >
          {desc}
        </motion.p>
      </motion.div>
    </Reveal>
  );
}

function OurStory() {
  const { lang } = useLang();

  return (
    <main style={{ background: "var(--cream)" }}>
      <style>{OUR_STORY_CSS}</style>

      {/* Hero */}
      <section style={{ position: "relative", height: "100dvh", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <img
          src="https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=2000&q=90"
          alt="Château le Marara"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.65) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "clamp(36px,6vw,80px) clamp(20px,5vw,80px)", width: "100%" }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.42em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "14px" }}>
            {T.heroSub[lang]}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.5 }}
            style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "clamp(32px, 5.5vw, 80px)",
              letterSpacing: "0.05em", textTransform: "uppercase",
              color: "white", lineHeight: 1.1,
              maxWidth: "800px", whiteSpace: "pre-line",
            }}>
            {T.heroHeading[lang]}
          </motion.h1>
        </div>
      </section>

      {/* Section 1 */}
      <section style={{ maxWidth: "1340px", margin: "0 auto", padding: "clamp(52px,8vw,100px) clamp(20px,5vw,80px)" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "28px" }}>
            <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(20px, 2vw, 30px)", fontWeight: 400, color: "var(--ocean)", margin: 0, whiteSpace: "nowrap", lineHeight: 1 }}>
              {T.s1Script[lang]}
            </p>
            <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.12)" }} />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 300,
            fontSize: "clamp(24px, 3.6vw, 52px)",
            letterSpacing: "0.04em", lineHeight: 1.18,
            color: "var(--navy)", textTransform: "uppercase",
            maxWidth: "90%", margin: "0 0 clamp(32px,5vw,64px) 0", whiteSpace: "pre-line",
          }}>
            {T.s1Heading[lang]}
          </h2>
        </Reveal>
        <div data-os-two-col style={{ display: "grid", gridTemplateColumns: "clamp(140px, 20%, 260px) 1fr", gap: "clamp(24px,4vw,60px)", alignItems: "start" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(44,44,44,0.45)", lineHeight: 1.75, margin: 0 }}>
              {T.s1Label[lang]}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.15vw, 18px)", fontWeight: 300, lineHeight: 1.85, color: "var(--ocean)", margin: "0 0 20px 0" }}>
              <span style={{ float: "left", fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(44px, 5.5vw, 76px)", lineHeight: 0.78, marginRight: "8px", marginTop: "8px", color: "var(--gold)" }}>
                {T.s1Body1[lang][0]}
              </span>
              {T.s1Body1[lang].slice(1)}
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.15vw, 18px)", fontWeight: 300, lineHeight: 1.85, color: "var(--ocean)", margin: 0 }}>
              {T.s1Body2[lang]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy split — image left, text right */}
      <section data-os-split style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "clamp(360px, 55vw, 700px)" }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=85"
            alt="Lake Kivu"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div style={{ background: "var(--cream)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(36px,6vw,96px) clamp(24px,5vw,96px)" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
              <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(18px, 1.8vw, 26px)", fontWeight: 400, color: "var(--ocean)", margin: 0, whiteSpace: "nowrap" }}>
                {T.s2Script[lang]}
              </p>
              <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.12)" }} />
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "clamp(22px, 3vw, 44px)",
              letterSpacing: "0.04em", textTransform: "uppercase",
              color: "var(--navy)", margin: "0 0 24px 0", lineHeight: 1.2,
            }}>
              {T.s2Heading[lang]}
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(13px, 1.1vw, 17px)", fontWeight: 300, lineHeight: 1.85, color: "var(--ocean)", margin: "0 0 32px 0" }}>
              {T.s2Body[lang]}
            </p>
            <Link to="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase",
              color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--gold)", paddingBottom: "4px",
            }}>
              {lang === "en" ? "Contact Us" : "Nous Contacter"} <ArrowRight size={12} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Unmatched Service — cream colour break before the navy Core Beliefs */}
      <Reveal>
        <div style={{ textAlign: "center", padding: "clamp(48px,8vw,120px) clamp(20px,5vw,80px)", background: "var(--cream)" }}>
          <h2 style={{ fontFamily: "var(--font-script)", fontSize: "clamp(36px, 8vw, 120px)", fontWeight: 400, color: "var(--ocean)", lineHeight: 1.15, margin: 0, whiteSpace: "pre-line" }}>
            {T.bigQuote2[lang]}
          </h2>
        </div>
      </Reveal>

      {/* Core values — comes first */}
      <section style={{ background: "var(--navy)", padding: "clamp(52px,8vw,120px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: "1340px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "28px" }}>
              <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(20px, 2vw, 30px)", fontWeight: 400, color: "var(--gold)", margin: 0, whiteSpace: "nowrap" }}>
                {lang === "en" ? "Values That Guide Us" : "Valeurs Qui Nous Guident"}
              </p>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.15)" }} />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(24px, 3.6vw, 52px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "white", margin: "0 0 clamp(40px,6vw,64px) 0" }}>
              {T.s3Heading[lang]}
            </h2>
          </Reveal>
          <div data-os-values style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(24px,4vw,60px)" }}>
            {T.values.map((v, i) => (
              <ValueCard key={v.en} title={lang === "en" ? v.en : v.fr} desc={lang === "en" ? v.descEn : v.descFr} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Big quote 1 — now after Core Beliefs */}
      <Reveal>
        <div style={{ textAlign: "center", padding: "clamp(48px,8vw,120px) clamp(20px,5vw,80px)" }}>
          <h2 style={{ fontFamily: "var(--font-script)", fontSize: "clamp(36px, 8vw, 120px)", fontWeight: 400, color: "var(--ocean)", lineHeight: 1.15, margin: 0, whiteSpace: "pre-line" }}>
            {T.bigQuote1[lang]}
          </h2>
        </div>
      </Reveal>

      {/* CTA */}
      <section style={{ position: "relative", height: "clamp(360px, 55vw, 680px)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=2000&q=85"
          alt="Lake Kivu aerial"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.48)" }} />
        <Reveal>
          <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 clamp(20px,4vw,60px)" }}>
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(15px, 1.5vw, 20px)", color: "rgba(255,255,255,0.7)", margin: "0 0 18px 0" }}>
              {T.ctaSub[lang]}
            </p>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "clamp(28px, 4.5vw, 64px)",
              letterSpacing: "0.05em", textTransform: "uppercase",
              color: "white", margin: "0 0 36px 0", lineHeight: 1.1,
            }}>
              {T.heroLabel[lang]}
            </h2>
            <Link to="/contact" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              gap: "12px", padding: "14px clamp(28px,4vw,56px)",
              background: "var(--gold)", color: "white",
              fontFamily: "var(--font-label)", fontSize: "11px",
              letterSpacing: "0.32em", textTransform: "uppercase",
              textDecoration: "none", transition: "opacity 0.3s ease",
            }}>
              {T.ctaLabel[lang]} <ArrowRight size={13} />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}