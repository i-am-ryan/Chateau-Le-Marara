import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/reveal";
import { useLang } from "@/components/lang-context";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dining")({
  head: () => ({
    meta: [
      { title: "Dining — Château le Marara" },
      { name: "description", content: "Reserve your table at The Royal Restaurant, Château le Marara, Lake Kivu." },
    ],
  }),
  component: Dining,
});

const DINING_CSS = `
  [data-field] input:focus,
  [data-field] select:focus,
  [data-field] textarea:focus {
    outline: none;
    border-color: var(--gold) !important;
  }
  [data-field] input, [data-field] select, [data-field] textarea {
    transition: border-color 0.25s ease;
  }
  @media (max-width: 900px) {
    [data-dining-layout] { grid-template-columns: 1fr !important; }
    [data-dining-info] { border-right: none !important; border-bottom: 1px solid rgba(44,44,44,0.08) !important; padding-bottom: clamp(32px,5vw,48px) !important; }
  }
  @media (max-width: 640px) {
    [data-dining-form-grid] { grid-template-columns: 1fr !important; }
    [data-experiences-grid] { grid-template-columns: 1fr !important; }
  }
`;



function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div data-field>
      <label style={{ display: "block", fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(44,44,44,0.5)", marginBottom: "7px" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const INPUT = {
  width: "100%", boxSizing: "border-box" as const,
  background: "white", border: "1px solid rgba(44,44,44,0.12)",
  padding: "11px 13px", fontSize: "14px",
  fontFamily: "var(--font-sans)", fontWeight: 300,
  color: "var(--ink)", borderRadius: 0,
};

function Dining() {
  const { lang } = useLang();
  const [sent, setSent] = useState(false);
  const [hovBtn, setHovBtn] = useState(false);

  return (
    <main style={{ background: "var(--cream)" }}>
      <style>{DINING_CSS}</style>

      {/* ── Hero ── */}
      <section style={{ position: "relative", height: "100dvh", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <img
          src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=2400&q=90"
          alt="Dining at Château le Marara"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.06) 100%)" }} />

        <div style={{ position: "absolute", bottom: 0, right: 0, background: "var(--gold)", padding: "16px clamp(20px,3vw,36px)", zIndex: 3 }}>
          <a href="#reserve" style={{ fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            {lang === "en" ? "Reserve a Table" : "Réserver une Table"} <ArrowRight size={12} />
          </a>
        </div>

        <div style={{ position: "relative", zIndex: 2, padding: "clamp(36px,6vw,80px) clamp(24px,5vw,80px)", width: "100%", maxWidth: "900px" }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 18px 0" }}>
            {lang === "en" ? "The Royal Restaurant" : "Le Restaurant Royal"}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.35 }}
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(48px,8vw,116px)", color: "white", lineHeight: 0.92, margin: "0 0 clamp(18px,3vw,28px) 0", whiteSpace: "pre-line" }}>
            {lang === "en" ? "Dining\nExperience" : "Expérience\nGastronomique"}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.6 }}
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(14px,1.5vw,20px)", color: "rgba(255,255,255,0.62)", maxWidth: "480px", margin: 0, lineHeight: 1.6 }}>
            {lang === "en"
              ? "Farm-to-table philosophy. Rwandan produce. French technique. A table unlike any other in Africa."
              : "Philosophie de la ferme à la table. Produits rwandais. Technique française."}
          </motion.p>
          <motion.div initial={{ width: 0 }} animate={{ width: "56px" }} transition={{ duration: 0.8, delay: 0.9 }}
            style={{ height: "1px", background: "var(--gold)", marginTop: "clamp(20px,3vw,36px)", opacity: 0.7 }} />
        </div>
      </section>

      {/* ── The Royal Restaurant ── */}
      <section style={{ background: "var(--cream)", padding: "clamp(56px,8vw,100px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,100px)", alignItems: "center" }}>

            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
                <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(18px,2vw,28px)", color: "var(--ocean)", margin: 0, whiteSpace: "nowrap" }}>
                  {lang === "en" ? "Gastronomy" : "Gastronomie"}
                </p>
                <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.1)" }} />
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(24px,3.2vw,48px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--navy)", margin: "0 0 24px 0", lineHeight: 1.1 }}>
                {lang === "en" ? "THE ROYAL RESTAURANT" : "LE RESTAURANT ROYAL"}
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(13px,1.1vw,17px)", fontWeight: 300, lineHeight: 1.85, color: "var(--ocean)", margin: "0 0 32px 0" }}>
                {lang === "en"
                  ? "Our flagship restaurant offers a culinary journey through Rwanda's finest produce, expertly blended with international techniques. Enjoy breakfast with the sunrise or a romantic dinner under the stars."
                  : "Notre restaurant phare offre un voyage culinaire à travers les meilleurs produits du Rwanda, habilement mélangés aux techniques internationales. Savourez un petit-déjeuner au lever du soleil ou un dîner romantique sous les étoiles."}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
                {(lang === "en" ? [
                  "Farm-to-table philosophy",
                  "Extensive international wine list",
                  "Private dining options available",
                ] : [
                  "Philosophie de la ferme à la table",
                  "Carte des vins internationale étendue",
                  "Options de repas privés disponibles",
                ]).map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "20px", height: "1px", background: "var(--gold)", flexShrink: 0 }} />
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(13px,1vw,15px)", fontWeight: 300, color: "rgba(44,44,44,0.7)", margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>

              <a href="#reserve" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase",
                color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--gold)", paddingBottom: "4px",
              }}>
                {lang === "en" ? "Reserve a Table" : "Réserver une Table"} <ArrowRight size={12} />
              </a>
            </Reveal>

            <Reveal delay={0.12}>
              <div style={{ position: "relative", overflow: "hidden", height: "clamp(320px,40vw,560px)" }}>
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90"
                  alt="The Royal Restaurant"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 0 3px var(--gold)", opacity: 0.4, pointerEvents: "none" }} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Full-width image divider ── */}
      <div style={{ position: "relative", height: "clamp(200px,22vw,340px)", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=2400&q=90"
          alt="Chef preparing dish"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.42)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(24px,4vw,64px)", color: "white", margin: 0, textShadow: "0 2px 32px rgba(0,0,0,0.4)", padding: "0 20px", textAlign: "center" }}>
            {lang === "en" ? "Every plate tells a story" : "Chaque assiette raconte une histoire"}
          </p>
        </div>
      </div>

      {/* ── Reservation form ── */}
      <section id="reserve" style={{ background: "white", padding: "clamp(56px,8vw,100px) clamp(20px,5vw,80px)" }}>
        <div data-dining-layout style={{ maxWidth: "1300px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "clamp(32px,6vw,80px)" }}>

          {/* Left info */}
          <div data-dining-info style={{ borderRight: "1px solid rgba(44,44,44,0.08)", paddingRight: "clamp(24px,4vw,64px)" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "clamp(24px,3vw,36px)" }}>
                <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(18px,1.8vw,26px)", color: "var(--ocean)", margin: 0, whiteSpace: "nowrap" }}>
                  {lang === "en" ? "The Royal Restaurant" : "Le Restaurant Royal"}
                </p>
                <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.1)" }} />
              </div>
              <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 14px 0" }}>
                {lang === "en" ? "Reserve a Table" : "Réserver une Table"}
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(26px,3vw,42px)", color: "var(--navy)", lineHeight: 1.1, margin: "0 0 clamp(20px,3vw,32px) 0" }}>
                {lang === "en" ? "An Evening\nto Remember" : "Une Soirée\ninoubliable"}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,2vw,20px)", marginBottom: "clamp(24px,3vw,40px)" }}>
                {[
                  { en: "Terrace overlooking Lake Kivu",        fr: "Terrasse sur le Lac Kivu" },
                  { en: "Farm-to-table seasonal menus",         fr: "Menus saisonniers de la ferme" },
                  { en: "International wine selection",          fr: "Sélection de vins internationaux" },
                  { en: "Private dining rooms available",        fr: "Salles à manger privées disponibles" },
                  { en: "Dress code: Smart casual",              fr: "Tenue : Casual chic" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "20px", height: "1px", background: "var(--gold)", flexShrink: 0 }} />
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(12px,1vw,14px)", fontWeight: 300, color: "rgba(44,44,44,0.7)", margin: 0 }}>
                      {lang === "en" ? item.en : item.fr}
                    </p>
                  </div>
                ))}
              </div>
              <div style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "18px" }}>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(14px,1.2vw,18px)", color: "var(--ocean)", margin: 0, lineHeight: 1.65 }}>
                  {lang === "en"
                    ? '"For special occasions, our chef can prepare a bespoke menu tailored entirely to your wishes."'
                    : '"Pour les occasions spéciales, notre chef peut préparer un menu sur mesure selon vos souhaits."'}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right form */}
          <div>
            <Reveal delay={0.1}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "clamp(48px,8vw,80px) 0" }}>
                  <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "24px" }}>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 8 8">
                        <polygon points="4,0 5,3 8,3 5.5,5 6.5,8 4,6 1.5,8 2.5,5 0,3 3,3" fill="var(--gold)" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 16px 0" }}>
                    {lang === "en" ? "Reservation Received" : "Réservation Reçue"}
                  </p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(28px,3vw,44px)", color: "var(--navy)", margin: "0 0 14px 0" }}>
                    {lang === "en" ? "Thank You" : "Merci"}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 300, color: "rgba(44,44,44,0.55)", margin: "0 0 36px 0" }}>
                    {lang === "en" ? "Our maître d' will confirm your table within 2 hours." : "Notre maître d'hôtel confirmera votre table dans les 2 heures."}
                  </p>
                  <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--gold)", paddingBottom: "4px" }}>
                    {lang === "en" ? "Return Home" : "Retour"} <ArrowRight size={12} />
                  </Link>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
                  <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 12px 0" }}>
                    {lang === "en" ? "Table Reservation" : "Réservation de Table"}
                  </p>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(26px,3vw,42px)", color: "var(--navy)", margin: "0 0 8px 0" }}>
                    {lang === "en" ? "Reserve Your Table" : "Réservez Votre Table"}
                  </h2>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "rgba(44,44,44,0.5)", margin: "0 0 clamp(24px,3vw,36px) 0" }}>
                    {lang === "en" ? "Complete the form and our maître d' will confirm your table within 2 hours." : "Remplissez le formulaire et notre maître d'hôtel confirmera votre table dans les 2 heures."}
                  </p>

                  <div style={{ width: "48px", height: "1px", background: "var(--gold)", marginBottom: "clamp(24px,3vw,36px)", opacity: 0.6 }} />

                  <div data-dining-form-grid style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px,1.5vw,18px)", marginBottom: "clamp(14px,1.5vw,18px)" }}>
                    <Field label={lang === "en" ? "First Name" : "Prénom"}>
                      <input style={INPUT} type="text" />
                    </Field>
                    <Field label={lang === "en" ? "Last Name" : "Nom"}>
                      <input style={INPUT} type="text" />
                    </Field>
                    <Field label={lang === "en" ? "Email" : "E-mail"}>
                      <input style={INPUT} type="email" />
                    </Field>
                    <Field label={lang === "en" ? "Phone" : "Téléphone"}>
                      <input style={INPUT} type="tel" />
                    </Field>
                    <Field label={lang === "en" ? "Date" : "Date"}>
                      <input style={INPUT} type="date" />
                    </Field>
                    <Field label={lang === "en" ? "Time" : "Heure"}>
                      <select style={INPUT}>
                        {["18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30"].map(t => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label={lang === "en" ? "Guests" : "Convives"}>
                      <select style={INPUT}>
                        {[1,2,3,4,5,6,7,8].map(n => (
                          <option key={n}>{n} {n === 1 ? (lang === "en" ? "Guest" : "Convive") : (lang === "en" ? "Guests" : "Convives")}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label={lang === "en" ? "Occasion" : "Occasion"}>
                      <select style={INPUT}>
                        {(lang === "en"
                          ? ["None","Birthday","Anniversary","Proposal","Business Dinner","Other"]
                          : ["Aucune","Anniversaire","Anniversaire de mariage","Demande en mariage","Dîner d'affaires","Autre"]
                        ).map(o => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>

                  <Field label={lang === "en" ? "Special Requests" : "Demandes Spéciales"}>
                    <textarea
                      rows={3}
                      placeholder={lang === "en" ? "Dietary requirements, allergies, special arrangements…" : "Régimes alimentaires, allergies, arrangements spéciaux…"}
                      style={{ ...INPUT, resize: "vertical", lineHeight: "1.65" }}
                    />
                  </Field>

                  <button
                    type="submit"
                    onMouseEnter={() => setHovBtn(true)}
                    onMouseLeave={() => setHovBtn(false)}
                    style={{
                      width: "100%", marginTop: "clamp(20px,2.5vw,28px)",
                      padding: "clamp(14px,2vw,18px) 32px",
                      background: hovBtn ? "var(--gold)" : "var(--navy)",
                      color: "white", border: "none", cursor: "pointer",
                      fontFamily: "var(--font-label)", fontSize: "11px",
                      letterSpacing: "0.38em", textTransform: "uppercase",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "14px",
                      transition: "background 0.4s ease",
                    }}
                  >
                    {lang === "en" ? "Reserve My Table" : "Réserver Ma Table"} <ArrowRight size={13} />
                  </button>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300, color: "rgba(44,44,44,0.35)", textAlign: "center", margin: "10px 0 0 0" }}>
                    {lang === "en" ? "Confirmation within 2 hours. Cancellations accepted up to 24h before." : "Confirmation sous 2 heures. Annulations acceptées jusqu'à 24h avant."}
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}