import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { useLang } from "@/components/lang-context";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Château le Marara" },
      { name: "description", content: "Host unforgettable weddings, celebrations and corporate events at Château le Marara, Lake Kivu." },
    ],
  }),
  component: Events,
});

const EVENTS_CSS = `
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
    [data-events-layout] { grid-template-columns: 1fr !important; }
    [data-events-info] { border-right: none !important; border-bottom: 1px solid rgba(44,44,44,0.08) !important; padding-bottom: clamp(32px,5vw,48px) !important; }
  }
  @media (max-width: 640px) {
    [data-events-form-grid] { grid-template-columns: 1fr !important; }
  }
`;

const EVENT_TYPES = [
  { icon: "💍", en: "Wedding",           fr: "Mariage" },
  { icon: "🥂", en: "Anniversary",       fr: "Anniversaire" },
  { icon: "👔", en: "Corporate Retreat", fr: "Séminaire d'Entreprise" },
  { icon: "🎂", en: "Birthday Gala",     fr: "Gala d'Anniversaire" },
  { icon: "🎓", en: "Graduation",        fr: "Remise de Diplômes" },
  { icon: "✨", en: "Private Party",     fr: "Soirée Privée" },
];

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

function Events() {
  const { lang } = useLang();
  const [sent, setSent] = useState(false);
  const [hovBtn, setHovBtn] = useState(false);
  const [selectedType, setSelectedType] = useState<number | null>(null);

  return (
    <main style={{ background: "var(--cream)" }}>
      <style>{EVENTS_CSS}</style>

      {/* ── Hero ── */}
      <section style={{ position: "relative", height: "100dvh", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=2400&q=90"
          alt="Events at Château le Marara"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.06) 100%)" }} />

        <div style={{ position: "absolute", bottom: 0, right: 0, background: "var(--gold)", padding: "16px clamp(20px,3vw,36px)", zIndex: 3 }}>
          <a href="#enquire" style={{ fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            {lang === "en" ? "Plan Your Event" : "Planifier Votre Événement"} <ArrowRight size={12} />
          </a>
        </div>

        <div style={{ position: "relative", zIndex: 2, padding: "clamp(36px,6vw,80px) clamp(24px,5vw,80px)", width: "100%", maxWidth: "900px" }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 18px 0" }}>
            {lang === "en" ? "Celebrations & Gatherings" : "Célébrations & Réunions"}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.35 }}
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(48px,8vw,116px)", color: "white", lineHeight: 0.92, margin: "0 0 clamp(18px,3vw,28px) 0", whiteSpace: "pre-line" }}>
            {lang === "en" ? "Unforgettable\nEvents" : "Événements\nInoubliables"}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.6 }}
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(14px,1.5vw,20px)", color: "rgba(255,255,255,0.62)", maxWidth: "480px", margin: 0, lineHeight: 1.6 }}>
            {lang === "en"
              ? "Whether it is an intimate wedding, a milestone celebration, or a sophisticated corporate gathering — every detail, flawlessly executed."
              : "Qu'il s'agisse d'un mariage intime, d'une célébration mémorable ou d'une réunion d'entreprise sophistiquée — chaque détail, exécuté à la perfection."}
          </motion.p>
          <motion.div initial={{ width: 0 }} animate={{ width: "56px" }} transition={{ duration: 0.8, delay: 0.9 }}
            style={{ height: "1px", background: "var(--gold)", marginTop: "clamp(20px,3vw,36px)", opacity: 0.7 }} />
        </div>
      </section>

      {/* ── Event Dedication section ── */}
      <section style={{ background: "var(--cream)", padding: "clamp(56px,8vw,100px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,100px)", alignItems: "center" }}>

            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
                <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(18px,2vw,28px)", color: "var(--ocean)", margin: 0, whiteSpace: "nowrap" }}>
                  {lang === "en" ? "Celebrations" : "Célébrations"}
                </p>
                <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.1)" }} />
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(24px,3.2vw,48px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--navy)", margin: "0 0 24px 0", lineHeight: 1.1 }}>
                {lang === "en" ? "EVENT DEDICATION" : "DÉDICATION À L'ÉVÉNEMENT"}
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(13px,1.1vw,17px)", fontWeight: 300, lineHeight: 1.85, color: "var(--ocean)", margin: "0 0 32px 0" }}>
                {lang === "en"
                  ? "Transform your special moments into unforgettable memories at Château le Marara. Whether it is an intimate wedding, a milestone celebration, or a sophisticated corporate gathering, our dedicated team ensures every detail is executed with precision and elegance."
                  : "Transformez vos moments spéciaux en souvenirs inoubliables au Château le Marara. Notre équipe dévouée veille à chaque détail avec précision et élégance."}
              </p>

              {/* Three bullets — the original content */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {(lang === "en" ? [
                  "Tailored event planning and coordination",
                  "Versatile indoor and outdoor venues",
                  "Customizable culinary packages",
                ] : [
                  "Planification et coordination sur mesure",
                  "Espaces intérieurs et extérieurs polyvalents",
                  "Forfaits culinaires personnalisables",
                ]).map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "20px", height: "1px", background: "var(--gold)", flexShrink: 0 }} />
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(13px,1vw,15px)", fontWeight: 300, color: "rgba(44,44,44,0.7)", margin: 0 }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div style={{ position: "relative", overflow: "hidden", height: "clamp(320px,40vw,560px)" }}>
                <img
                  src="/al-elmes-ULHxWq8reao-unsplash.jpg"
                  alt="Event at Château le Marara"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 0 3px var(--gold)", opacity: 0.4, pointerEvents: "none" }} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Full-width image ── */}
      <div style={{ position: "relative", height: "clamp(200px,22vw,340px)", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=2400&q=90"
          alt="Celebration"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 55%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(24px,4vw,64px)", color: "white", margin: 0, textShadow: "0 2px 32px rgba(0,0,0,0.4)", padding: "0 20px", textAlign: "center" }}>
            {lang === "en" ? "Every moment, perfectly curated" : "Chaque moment, parfaitement orchestré"}
          </p>
        </div>
      </div>

      {/* ── Enquiry form ── */}
      <section id="enquire" style={{ background: "white", padding: "clamp(56px,8vw,100px) clamp(20px,5vw,80px)" }}>
        <div data-events-layout style={{ maxWidth: "1300px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "clamp(32px,6vw,80px)" }}>

          {/* Left info */}
          <div data-events-info style={{ borderRight: "1px solid rgba(44,44,44,0.08)", paddingRight: "clamp(24px,4vw,64px)" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "clamp(24px,3vw,36px)" }}>
                <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(18px,1.8vw,26px)", color: "var(--ocean)", margin: 0, whiteSpace: "nowrap" }}>
                  {lang === "en" ? "Event Planning" : "Planification"}
                </p>
                <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.1)" }} />
              </div>
              <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 14px 0" }}>
                {lang === "en" ? "Enquire Now" : "Demande de Renseignements"}
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(26px,3vw,42px)", color: "var(--navy)", lineHeight: 1.1, margin: "0 0 clamp(20px,3vw,28px) 0", whiteSpace: "pre-line" }}>
                {lang === "en" ? "Let Us Create\nYour Moment" : "Laissez-nous Créer\nVotre Moment"}
              </h2>

              {/* Event type selector */}
              <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(44,44,44,0.45)", margin: "0 0 12px 0" }}>
                {lang === "en" ? "Event Type" : "Type d'Événement"}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "clamp(24px,3vw,36px)" }}>
                {EVENT_TYPES.map((type, i) => (
                  <button key={i} onClick={() => setSelectedType(selectedType === i ? null : i)} style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "7px 14px",
                    background: selectedType === i ? "var(--navy)" : "var(--cream)",
                    color: selectedType === i ? "white" : "var(--ink)",
                    border: `1px solid ${selectedType === i ? "var(--navy)" : "rgba(44,44,44,0.12)"}`,
                    fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase",
                    cursor: "pointer", transition: "all 0.3s ease",
                  }}>
                    <span>{type.icon}</span>
                    {lang === "en" ? type.en : type.fr}
                  </button>
                ))}
              </div>

              <div style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "18px" }}>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(14px,1.2vw,18px)", color: "var(--ocean)", margin: 0, lineHeight: 1.65 }}>
                  {lang === "en"
                    ? '"Our dedicated team ensures every detail is executed with precision and elegance."'
                    : '"Notre équipe dévouée veille à ce que chaque détail soit exécuté avec précision et élégance."'}
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
                    {lang === "en" ? "Enquiry Received" : "Demande Reçue"}
                  </p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(28px,3vw,44px)", color: "var(--navy)", margin: "0 0 14px 0" }}>
                    {lang === "en" ? "Thank You" : "Merci"}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 300, color: "rgba(44,44,44,0.55)", margin: "0 0 36px 0" }}>
                    {lang === "en" ? "Our events coordinator will be in touch within 24 hours." : "Notre coordinateur événementiel vous contactera sous 24 heures."}
                  </p>
                  <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--gold)", paddingBottom: "4px" }}>
                    {lang === "en" ? "Return Home" : "Retour"} <ArrowRight size={12} />
                  </Link>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
                  <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 12px 0" }}>
                    {lang === "en" ? "Event Enquiry" : "Demande Événement"}
                  </p>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(26px,3vw,42px)", color: "var(--navy)", margin: "0 0 8px 0" }}>
                    {lang === "en" ? "Plan Your Event" : "Planifiez Votre Événement"}
                  </h2>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "rgba(44,44,44,0.5)", margin: "0 0 clamp(20px,3vw,32px) 0" }}>
                    {selectedType !== null
                      ? `${lang === "en" ? "Event type:" : "Type:"} ${lang === "en" ? EVENT_TYPES[selectedType].en : EVENT_TYPES[selectedType].fr}`
                      : lang === "en" ? "Tell us about your vision and we will handle the rest." : "Parlez-nous de votre vision, nous nous chargeons du reste."}
                  </p>

                  <div style={{ width: "48px", height: "1px", background: "var(--gold)", marginBottom: "clamp(24px,3vw,32px)", opacity: 0.6 }} />

                  <div data-events-form-grid style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px,1.5vw,18px)", marginBottom: "clamp(12px,1.5vw,16px)" }}>
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
                    <Field label={lang === "en" ? "Event Date" : "Date de l'Événement"}>
                      <input style={INPUT} type="date" />
                    </Field>
                    <Field label={lang === "en" ? "Number of Guests" : "Nombre d'Invités"}>
                      <select style={INPUT}>
                        {["1-10","11-20","21-30","31-40","41-50","51-60"].map(n => (
                          <option key={n}>{n} {lang === "en" ? "guests" : "invités"}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label={lang === "en" ? "Budget Range" : "Budget"}>
                      <select style={INPUT}>
                        {(lang === "en"
                          ? ["Under $5,000","$5,000–$10,000","$10,000–$20,000","$20,000+","Prefer not to say"]
                          : ["Moins de $5 000","$5 000–$10 000","$10 000–$20 000","$20 000+","Préfère ne pas dire"]
                        ).map(b => <option key={b}>{b}</option>)}
                      </select>
                    </Field>
                    <Field label={lang === "en" ? "Catering Required" : "Traiteur Requis"}>
                      <select style={INPUT}>
                        {(lang === "en"
                          ? ["Yes, full catering","Drinks only","No, external caterer","Undecided"]
                          : ["Oui, traiteur complet","Boissons uniquement","Non, traiteur externe","Indécis"]
                        ).map(o => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>

                  <Field label={lang === "en" ? "Tell Us About Your Vision" : "Parlez-nous de Votre Vision"}>
                    <textarea
                      rows={4}
                      placeholder={lang === "en" ? "Theme, special requirements, entertainment wishes, anything else we should know…" : "Thème, exigences spéciales, souhaits d'animation…"}
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
                    {lang === "en" ? "Send My Enquiry" : "Envoyer Ma Demande"} <ArrowRight size={13} />
                  </button>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300, color: "rgba(44,44,44,0.35)", textAlign: "center", margin: "10px 0 0 0" }}>
                    {lang === "en" ? "A personal response within 24 hours." : "Une réponse personnelle sous 24 heures."}
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