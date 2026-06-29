import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "@/components/lang-context";
import { MapPin, Mail, Phone, ArrowRight, ArrowLeft, Check, Users, Minus, Plus } from "lucide-react";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Booking — Château le Marara" },
      { name: "description", content: "Reserve direct with our concierge for the best rate at Château le Marara, Lake Kivu, Rwanda." },
    ],
  }),
  component: Contact,
});

const ROOMS_LIST = [
  { id: "comtesse",     nameEn: "Comtesse De Bwishaza",       adults: 2, children: 1, price: 350, cat: "suite",  img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=85" },
  { id: "delicatessen", nameEn: "Delicatessen",               adults: 2, children: 0, price: 350, cat: "deluxe", img: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=85" },
  { id: "dreamoflove",  nameEn: "Dream Of Love",              adults: 2, children: 0, price: 350, cat: "deluxe", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=85" },
  { id: "foudtoi",      nameEn: "Fou De Toi",                 adults: 2, children: 1, price: 350, cat: "suite",  img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=85" },
  { id: "kingkigeli",   nameEn: "King Kigeli",                adults: 2, children: 0, price: 350, cat: "deluxe", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=85" },
  { id: "kingmutara",   nameEn: "King Mutara",                adults: 2, children: 0, price: 350, cat: "deluxe", img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=85" },
  { id: "kingyuhi",     nameEn: "King Yuhi",                  adults: 1, children: 0, price: 350, cat: "deluxe", img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=85" },
  { id: "labelldemai",  nameEn: "La Belle De Mai",            adults: 2, children: 0, price: 350, cat: "deluxe", img: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&q=85" },
  { id: "lanuit",       nameEn: "La Nuit De Madame",          adults: 2, children: 0, price: 350, cat: "deluxe", img: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=85" },
  { id: "lapromesse",   nameEn: "La Promesse De L'Horizon",   adults: 2, children: 0, price: 350, cat: "deluxe", img: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=85" },
  { id: "lareve",       nameEn: "La Rêve De Mademoiselle",    adults: 2, children: 0, price: 350, cat: "suite",  img: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&q=85" },
  { id: "lepresident",  nameEn: "Le Président",               adults: 2, children: 0, price: 250, cat: "deluxe", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=85" },
  { id: "lightofheart", nameEn: "Light Of My Heart",          adults: 2, children: 0, price: 350, cat: "deluxe", img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=85" },
  { id: "princesse",    nameEn: "Princesse De Ishangi",       adults: 2, children: 0, price: 350, cat: "suite",  img: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600&q=85" },
  { id: "queennyira",   nameEn: "Queen Nyiratunga",           adults: 2, children: 0, price: 350, cat: "suite",  img: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&q=85" },
  { id: "queenofheart", nameEn: "Queen Of My Heart",          adults: 2, children: 0, price: 350, cat: "suite",  img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=85" },
  { id: "queenofrom",   nameEn: "Queen Of Romance",           adults: 2, children: 0, price: 350, cat: "suite",  img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=85" },
  { id: "promissoflove",nameEn: "The Promise Of Love",        adults: 2, children: 0, price: 350, cat: "deluxe", img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=85" },
  { id: "vow",          nameEn: "The Vow Of Love",            adults: 2, children: 0, price: 350, cat: "deluxe", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=85" },
  { id: "youname",      nameEn: "Your Name Among The Stars",  adults: 2, children: 0, price: 350, cat: "suite",  img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=85" },
];

const CONTACT_CSS = `
  [data-field] input:focus, [data-field] select:focus, [data-field] textarea:focus {
    outline: none; border-color: var(--gold) !important;
  }
  [data-field] input, [data-field] select, [data-field] textarea { transition: border-color 0.25s ease; }
  @media (max-width: 900px) {
    [data-booking-layout] { grid-template-columns: 1fr !important; }
    [data-summary-panel] { position: static !important; order: -1 !important; }
  }
  @media (max-width: 640px) {
    [data-step1-dates] { grid-template-columns: 1fr 1fr !important; }
    [data-room-card] { grid-template-columns: 72px 1fr auto !important; }
  }
`;

function Field({ label, type = "text", defaultValue, children }: {
  label: string; type?: string; defaultValue?: string; children?: React.ReactNode;
}) {
  return (
    <div data-field>
      <label style={{ display: "block", fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(44,44,44,0.5)", marginBottom: "7px" }}>
        {label}
      </label>
      {children ?? (
        <input type={type} defaultValue={defaultValue} style={{ width: "100%", boxSizing: "border-box", background: "white", border: "1px solid rgba(44,44,44,0.12)", padding: "11px 13px", fontSize: "14px", fontFamily: "var(--font-sans)", fontWeight: 300, color: "var(--ink)", borderRadius: 0 }} />
      )}
    </div>
  );
}

function Stepper({ value, min = 0, max = 10, onChange }: { value: number; min?: number; max?: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(44,44,44,0.12)", background: "white" }}>
      <button onClick={() => onChange(Math.max(min, value - 1))} style={{ width: "36px", height: "36px", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Minus size={13} />
      </button>
      <span style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 300, color: "var(--navy)", minWidth: "32px" }}>{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} style={{ width: "36px", height: "36px", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Plus size={13} />
      </button>
    </div>
  );
}

function Contact() {
  const { lang } = useLang();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [checkIn,  setCheckIn]  = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults,   setAdults]   = useState(1);
  const [children, setChildren] = useState(0);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [hovSend, setHovSend] = useState(false);
  const [roomFilter, setRoomFilter] = useState("all");

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000;
    return Math.max(0, diff);
  }, [checkIn, checkOut]);

  const selectedRooms = ROOMS_LIST.filter(r => (quantities[r.id] ?? 0) > 0);

  const roomLineTotal = (room: typeof ROOMS_LIST[0]) =>
    nights > 0 ? room.price * (quantities[room.id] ?? 0) * nights : room.price * (quantities[room.id] ?? 0);

  const roomsTotal = selectedRooms.reduce((sum, r) => sum + roomLineTotal(r), 0);
  const canProceed = selectedRooms.length > 0;
  const setQty = (id: string, val: number) => setQuantities(q => ({ ...q, [id]: Math.max(0, Math.min(1, val)) }));
  const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "---";

  const filteredRooms = ROOMS_LIST.filter(r => roomFilter === "all" || r.cat === roomFilter);

  return (
    <main style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <style>{CONTACT_CSS}</style>

      {/* Hero */}
      <section style={{ position: "relative", height: "100dvh", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=2400&q=90" alt="Château le Marara"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.06) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, background: "var(--gold)", padding: "16px clamp(20px,3vw,36px)", zIndex: 3 }}>
          <span style={{ fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "white", display: "flex", alignItems: "center", gap: "10px" }}>
            {lang === "en" ? "Secure Your Sanctuary" : "Réservez Votre Sanctuaire"} <ArrowRight size={12} />
          </span>
        </div>
        <div style={{ position: "relative", zIndex: 2, padding: "clamp(36px,6vw,80px) clamp(24px,5vw,80px)", width: "100%", maxWidth: "860px" }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 18px 0" }}>
            {lang === "en" ? "Reserve · Direct" : "Réserver · Direct"}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.35 }}
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(48px,8vw,110px)", color: "white", lineHeight: 0.92, margin: "0 0 clamp(18px,3vw,28px) 0", whiteSpace: "pre-line" }}>
            {lang === "en" ? "Secure Your\nSanctuary" : "Réservez\nVotre Sanctuaire"}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.6 }}
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(14px,1.5vw,20px)", color: "rgba(255,255,255,0.6)", maxWidth: "440px", margin: 0, lineHeight: 1.6 }}>
            {lang === "en" ? "Live availability. Secure payment. Best rate guaranteed direct." : "Disponibilité en direct. Paiement sécurisé. Meilleur tarif garanti."}
          </motion.p>
          <motion.div initial={{ width: 0 }} animate={{ width: "56px" }} transition={{ duration: 0.8, delay: 0.9 }}
            style={{ height: "1px", background: "var(--gold)", marginTop: "clamp(20px,3vw,36px)", opacity: 0.7 }} />
        </div>
      </section>

      {/* Step indicator */}
      {step < 3 && (
        <div style={{ background: "var(--navy)", padding: "0 clamp(24px,5vw,80px)" }}>
          <div style={{ maxWidth: "1300px", margin: "0 auto", display: "flex", alignItems: "stretch" }}>
            {[
              { n: 1, en: "Dates & Rooms",   fr: "Dates & Chambres" },
              { n: 2, en: "Guest & Payment", fr: "Invité & Paiement" },
            ].map(({ n, en, fr }) => (
              <div key={n} onClick={() => n < step && setStep(n as 1 | 2)} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "18px 28px 18px 0", marginRight: "8px",
                borderBottom: step === n ? "2px solid var(--gold)" : "2px solid transparent",
                cursor: n < step ? "pointer" : "default",
              }}>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0,
                  background: step > n ? "var(--gold)" : step === n ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
                  border: `1px solid ${step >= n ? "var(--gold)" : "rgba(255,255,255,0.2)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {step > n
                    ? <Check size={12} color="white" strokeWidth={2.5} />
                    : <span style={{ fontFamily: "var(--font-label)", fontSize: "9px", color: step === n ? "white" : "rgba(255,255,255,0.4)" }}>{n}</span>
                  }
                </div>
                <span style={{ fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: step === n ? "white" : "rgba(255,255,255,0.4)" }}>
                  {lang === "en" ? en : fr}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Body */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "clamp(40px,6vw,72px) clamp(20px,5vw,80px)" }}>
        <AnimatePresence mode="wait">

          {/* STEP 1 */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45 }}>
              <div data-booking-layout style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "clamp(24px,4vw,56px)", alignItems: "start" }}>

                <div>
                  {/* Header */}
                  <div style={{ marginBottom: "clamp(28px,4vw,40px)" }}>
                    <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 10px 0" }}>
                      {lang === "en" ? "Step 1 of 2" : "Étape 1 sur 2"}
                    </p>
                    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(26px,3vw,42px)", color: "var(--navy)", margin: "0 0 6px 0", lineHeight: 1.1 }}>
                      {lang === "en" ? "Dates & Accommodation" : "Dates & Hébergement"}
                    </h2>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "rgba(44,44,44,0.5)", margin: 0 }}>
                      {lang === "en" ? "Select your dates and guests, then choose your room below." : "Sélectionnez vos dates et invités, puis choisissez votre chambre."}
                    </p>
                  </div>

                  {/* Dates + guests */}
                  <div data-step1-dates style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "clamp(10px,1.5vw,18px)", marginBottom: "clamp(28px,4vw,40px)" }}>
                    <Field label={lang === "en" ? "Check-in" : "Arrivée"} type="date">
                      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                        style={{ width: "100%", boxSizing: "border-box", background: "white", border: "1px solid rgba(44,44,44,0.12)", padding: "11px 13px", fontSize: "14px", fontFamily: "var(--font-sans)", fontWeight: 300, color: "var(--ink)", borderRadius: 0 }} />
                    </Field>
                    <Field label={lang === "en" ? "Check-out" : "Départ"} type="date">
                      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
                        style={{ width: "100%", boxSizing: "border-box", background: "white", border: "1px solid rgba(44,44,44,0.12)", padding: "11px 13px", fontSize: "14px", fontFamily: "var(--font-sans)", fontWeight: 300, color: "var(--ink)", borderRadius: 0 }} />
                    </Field>
                    <Field label={lang === "en" ? "Adults" : "Adultes"}>
                      <Stepper value={adults} min={1} max={10} onChange={setAdults} />
                    </Field>
                    <Field label={lang === "en" ? "Children" : "Enfants"}>
                      <Stepper value={children} min={0} max={6} onChange={setChildren} />
                    </Field>
                  </div>

                  {/* ── FILTER TABS ── */}
                  <div style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", marginBottom: "clamp(16px,2.5vw,24px)", display: "flex", flexWrap: "wrap" }}>
                    {[
                      { key: "all",    en: "All Accommodations", fr: "Toutes" },
                      { key: "suite",  en: "Suites",             fr: "Suites" },
                      { key: "deluxe", en: "Deluxe Rooms",       fr: "Chambres Deluxe" },
                    ].map(f => (
                      <button key={f.key} onClick={() => setRoomFilter(f.key)} style={{
                        fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase",
                        padding: "11px clamp(12px,2vw,22px)",
                        background: roomFilter === f.key ? "var(--navy)" : "transparent",
                        color: roomFilter === f.key ? "white" : "var(--ocean)",
                        border: "none", cursor: "pointer",
                        borderBottom: roomFilter === f.key ? "2px solid var(--gold)" : "2px solid transparent",
                        transition: "all 0.3s ease", whiteSpace: "nowrap",
                      }}>
                        {lang === "en" ? f.en : f.fr}
                      </button>
                    ))}
                  </div>

                  {/* Room cards — filtered */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {filteredRooms.map(room => {
                      const qty = quantities[room.id] ?? 0;
                      const selected = qty > 0;
                      return (
                        <div key={room.id} data-room-card style={{
                          display: "grid", gridTemplateColumns: "90px 1fr auto",
                          background: "white",
                          border: `1px solid ${selected ? "var(--gold)" : "rgba(44,44,44,0.09)"}`,
                          transition: "border-color 0.3s ease", overflow: "hidden",
                        }}>
                          <div style={{ position: "relative", overflow: "hidden" }}>
                            <img src={room.img} alt={room.nameEn}
                              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "80px" }} />
                            {selected && <div style={{ position: "absolute", inset: 0, background: "rgba(209,178,116,0.22)" }} />}
                          </div>
                          <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(13px,1.1vw,17px)", color: "var(--navy)", margin: "0 0 4px 0", lineHeight: 1.2 }}>
                              {room.nameEn}
                            </p>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(44,44,44,0.4)" }}>
                              <Users size={9} /> {room.adults} {lang === "en" ? "adults" : "adultes"}{room.children > 0 && `, ${room.children} ${lang === "en" ? "child" : "enfant"}`}
                            </span>
                          </div>
                          <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", gap: "8px", minWidth: "110px" }}>
                            <div style={{ textAlign: "right" }}>
                              <p style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontSize: "clamp(16px,1.6vw,22px)", color: "var(--navy)", margin: 0, lineHeight: 1 }}>${room.price}</p>
                              <p style={{ fontFamily: "var(--font-label)", fontSize: "8px", letterSpacing: "0.15em", color: "rgba(44,44,44,0.4)", margin: "2px 0 0 0" }}>/ {lang === "en" ? "night" : "nuit"}</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(44,44,44,0.15)", background: "var(--cream)" }}>
                              <button onClick={() => setQty(room.id, qty - 1)} style={{ width: "28px", height: "28px", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Minus size={10} color="var(--ink)" />
                              </button>
                              <span style={{ width: "24px", textAlign: "center", fontFamily: "var(--font-label)", fontSize: "12px", color: selected ? "var(--gold)" : "var(--ink)", fontWeight: selected ? "600" : "400" }}>{qty}</span>
                              <button onClick={() => setQty(room.id, qty + 1)} style={{ width: "28px", height: "28px", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Plus size={10} color="var(--ink)" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Next step */}
                  <div style={{ marginTop: "clamp(28px,4vw,44px)" }}>
                    {!canProceed && (
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "rgba(44,44,44,0.45)", margin: "0 0 12px 0", textAlign: "center" }}>
                        {lang === "en" ? "Select at least one room to continue" : "Sélectionnez au moins une chambre pour continuer"}
                      </p>
                    )}
                    <button onClick={() => canProceed && setStep(2)} style={{
                      width: "100%", padding: "clamp(14px,2vw,18px) 32px",
                      background: canProceed ? "var(--navy)" : "rgba(44,44,44,0.15)",
                      color: canProceed ? "white" : "rgba(44,44,44,0.35)",
                      fontFamily: "var(--font-label)", fontSize: "11px", letterSpacing: "0.38em", textTransform: "uppercase",
                      border: "none", cursor: canProceed ? "pointer" : "not-allowed", transition: "background 0.4s ease",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "14px",
                    }}>
                      {lang === "en" ? "Next Step" : "Étape Suivante"} <ArrowRight size={13} />
                    </button>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300, color: "rgba(44,44,44,0.35)", textAlign: "center", margin: "10px 0 0 0" }}>
                      {lang === "en" ? "Continue to guest details" : "Continuer vers les détails de l'invité"}
                    </p>
                  </div>
                </div>

                {/* Summary panel */}
                <div data-summary-panel style={{ position: "sticky", top: "88px" }}>
                  <div style={{ background: "var(--navy)", color: "white", padding: "clamp(24px,3vw,32px)" }}>
                    <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 18px 0" }}>
                      {lang === "en" ? "Reservation Summary" : "Résumé de Réservation"}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
                        {lang === "en" ? "Live Availability" : "Disponibilité en Direct"}
                      </span>
                    </div>
                    {[
                      { label: lang === "en" ? "Check In"  : "Arrivée",  value: fmtDate(checkIn) },
                      { label: lang === "en" ? "Check Out" : "Départ",   value: fmtDate(checkOut) },
                      { label: lang === "en" ? "Guests"    : "Invités",  value: `${adults} ${lang === "en" ? "Adults" : "Adultes"}, ${children} ${lang === "en" ? "Children" : "Enfants"}` },
                      { label: lang === "en" ? "Rooms"     : "Chambres", value: selectedRooms.length > 0 ? selectedRooms.map(r => r.nameEn).join(", ") : "---" },
                      { label: lang === "en" ? "Payment"   : "Paiement", value: lang === "en" ? "Full Payment" : "Paiement Complet" },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "10px", marginBottom: "10px" }}>
                        <p style={{ fontFamily: "var(--font-label)", fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: "0 0 3px 0" }}>{label}</p>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.4 }}>{value}</p>
                      </div>
                    ))}
                    {/* Per-room line totals */}
                    {selectedRooms.length > 0 && (
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "10px" }}>
                        {selectedRooms.map(r => (
                          <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: "140px", lineHeight: 1.3 }}>{r.nameEn}</p>
                            <p style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.8)", margin: 0, whiteSpace: "nowrap" }}>
                              ${roomLineTotal(r).toLocaleString()}{nights === 0 && <span style={{ fontFamily: "var(--font-label)", fontSize: "7px", color: "rgba(255,255,255,0.3)", marginLeft: "2px" }}>/nt</span>}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "14px", marginTop: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                        <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>
                          {nights > 0 ? (lang === "en" ? "Stay Total" : "Total Séjour") : (lang === "en" ? "From / night" : "À partir de / nuit")}
                        </p>
                        <p style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 200, color: "var(--gold)", margin: 0 }}>
                          {selectedRooms.length > 0 ? `$${roomsTotal.toLocaleString()}` : "---"}
                        </p>
                      </div>
                      {nights > 0 && selectedRooms.length > 0 && (
                        <p style={{ fontFamily: "var(--font-label)", fontSize: "8px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)", margin: 0, textAlign: "right" }}>
                          {nights} {lang === "en" ? (nights !== 1 ? "nights" : "night") : (nights !== 1 ? "nuits" : "nuit")}
                        </p>
                      )}
                      {nights === 0 && selectedRooms.length > 0 && (
                        <p style={{ fontFamily: "var(--font-label)", fontSize: "8px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", margin: 0, textAlign: "right" }}>
                          {lang === "en" ? "Add dates to see total" : "Ajoutez des dates pour voir le total"}
                        </p>
                      )}
                    </div>
                    {canProceed && (
                      <button onClick={() => setStep(2)} style={{
                        width: "100%", marginTop: "18px", padding: "13px 20px",
                        background: "var(--gold)", color: "white", border: "none", cursor: "pointer",
                        fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                      }}>
                        {lang === "en" ? "Pay Now" : "Payer Maintenant"} <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                  <div style={{ background: "white", padding: "clamp(16px,2vw,22px)", marginTop: "2px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      { Icon: MapPin, text: "Kibuye, Western Province, Rwanda" },
                      { Icon: Mail,   text: "reservations@chateaulemarara.com" },
                      { Icon: Phone,  text: "+250 788 000 000" },
                    ].map(({ Icon, text }, i) => (
                      <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <Icon size={13} color="var(--gold)" style={{ flexShrink: 0 }} />
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300, color: "rgba(44,44,44,0.65)", margin: 0 }}>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45 }}>
              <div data-booking-layout style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "clamp(24px,4vw,56px)", alignItems: "start" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 12px 0" }}>
                    {lang === "en" ? "Step 2 of 2" : "Étape 2 sur 2"}
                  </p>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(26px,3vw,42px)", color: "var(--navy)", margin: "0 0 32px 0", lineHeight: 1.1 }}>
                    {lang === "en" ? "Guest & Payment" : "Invité & Paiement"}
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px,1.5vw,18px)", marginBottom: "clamp(16px,2vw,20px)" }}>
                    <Field label={lang === "en" ? "First Name" : "Prénom"} />
                    <Field label={lang === "en" ? "Last Name" : "Nom"} />
                    <Field label={lang === "en" ? "Email Address" : "E-mail"} type="email" />
                    <Field label={lang === "en" ? "Phone Number" : "Téléphone"} type="tel" />
                    <Field label={lang === "en" ? "Country" : "Pays"} />
                    <Field label={lang === "en" ? "Special Requests" : "Demandes Spéciales"} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "clamp(24px,3vw,36px) 0 clamp(18px,2vw,24px)" }}>
                    <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.1)" }} />
                    <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", margin: 0, whiteSpace: "nowrap" }}>
                      {lang === "en" ? "Payment Details" : "Détails de Paiement"}
                    </p>
                    <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.1)" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "clamp(12px,1.5vw,18px)", marginBottom: "clamp(24px,3vw,36px)" }}>
                    <div style={{ gridColumn: "span 3" }}><Field label={lang === "en" ? "Card Number" : "Numéro de Carte"} /></div>
                    <Field label={lang === "en" ? "Expiry (MM/YY)" : "Expiration"} />
                    <Field label="CVV" />
                    <Field label={lang === "en" ? "Name on Card" : "Nom sur la Carte"} />
                  </div>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center", background: "rgba(44,44,44,0.04)", padding: "14px 18px", marginBottom: "clamp(24px,3vw,36px)", flexWrap: "wrap" }}>
                    {["🔒 SSL Secure", "✓ Best Rate Guarantee", "✓ Free Cancellation"].map(t => (
                      <span key={t} style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(44,44,44,0.5)", whiteSpace: "nowrap" }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button onClick={() => setStep(1)} style={{
                      padding: "14px 24px", background: "transparent", border: "1px solid rgba(44,44,44,0.2)", cursor: "pointer",
                      fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase",
                      color: "var(--ink)", display: "flex", alignItems: "center", gap: "10px",
                    }}>
                      <ArrowLeft size={12} /> {lang === "en" ? "Back" : "Retour"}
                    </button>
                    <button onClick={() => setStep(3)} onMouseEnter={() => setHovSend(true)} onMouseLeave={() => setHovSend(false)}
                      style={{
                        flex: 1, padding: "14px 32px",
                        background: hovSend ? "var(--gold)" : "var(--navy)",
                        color: "white", border: "none", cursor: "pointer",
                        fontFamily: "var(--font-label)", fontSize: "11px", letterSpacing: "0.38em", textTransform: "uppercase",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", transition: "background 0.4s ease",
                      }}>
                      {lang === "en" ? "Confirm Reservation" : "Confirmer la Réservation"} <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
                {/* Step 2 summary */}
                <div data-summary-panel style={{ position: "sticky", top: "88px" }}>
                  <div style={{ background: "var(--navy)", color: "white", padding: "clamp(24px,3vw,32px)" }}>
                    <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 18px 0" }}>
                      {lang === "en" ? "Your Booking" : "Votre Réservation"}
                    </p>
                    {selectedRooms.map(r => (
                      <div key={r.id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "10px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.3, flex: 1 }}>{r.nameEn}</p>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <p style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 200, color: "white", margin: 0 }}>${roomLineTotal(r).toLocaleString()}</p>
                          {nights === 0 && <p style={{ fontFamily: "var(--font-label)", fontSize: "8px", color: "rgba(255,255,255,0.3)", margin: "2px 0 0 0" }}>/night</p>}
                        </div>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "12px", marginTop: "4px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>
                        {nights > 0 ? "Total" : (lang === "en" ? "From" : "À partir de")}
                      </p>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 200, color: "var(--gold)", margin: 0 }}>
                        ${roomsTotal.toLocaleString()}
                      </p>
                    </div>
                    <p style={{ fontFamily: "var(--font-label)", fontSize: "8px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", margin: "4px 0 0 0", textAlign: "right" }}>
                      {nights > 0
                        ? `${fmtDate(checkIn)} → ${fmtDate(checkOut)} · ${nights} ${lang === "en" ? (nights !== 1 ? "nights" : "night") : (nights !== 1 ? "nuits" : "nuit")}`
                        : lang === "en" ? "Add dates to see full total" : "Ajoutez des dates pour le total"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55 }}>
              <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", padding: "clamp(48px,8vw,80px) 0" }}>
                <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "28px" }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 8 8">
                      <polygon points="4,0 5,3 8,3 5.5,5 6.5,8 4,6 1.5,8 2.5,5 0,3 3,3" fill="var(--gold)" />
                    </svg>
                  ))}
                </div>
                <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.42em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 18px 0" }}>
                  {lang === "en" ? "Reservation Confirmed" : "Réservation Confirmée"}
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(36px,5vw,64px)", color: "var(--navy)", margin: "0 0 18px 0", lineHeight: 1.05 }}>
                  {lang === "en" ? "Thank You" : "Merci"}
                </h2>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(16px,1.5vw,22px)", fontWeight: 300, color: "var(--ocean)", margin: "0 0 36px 0", lineHeight: 1.6 }}>
                  {lang === "en" ? "Your reservation at Château le Marara is being prepared. Our concierge will be in touch within 24 hours." : "Votre réservation est en cours de préparation. Notre concierge vous contactera dans les 24 heures."}
                </p>
                <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--gold)", paddingBottom: "4px" }}>
                  {lang === "en" ? "Return to Château" : "Retour au Château"} <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Google Maps — cream toned */}
      {step < 3 && (
        <div style={{ width: "100%", height: "clamp(320px,40vw,540px)", position: "relative" }}>
          <iframe
            title="Château le Marara location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.9897!2d29.3468!3d-2.0600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dd0f0e8c4de311%3A0x6e02b14c3ad42b28!2sKibuye%2C%20Rwanda!5e0!3m2!1sen!2srw!4v1690000000000!5m2!1sen!2srw"
            width="100%" height="100%"
            style={{ border: 0, display: "block", filter: "grayscale(100%) sepia(25%) contrast(0.9) brightness(1.08)" }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
          <div style={{ position: "absolute", bottom: "24px", left: "24px", background: "var(--navy)", padding: "14px 20px", display: "flex", flexDirection: "column", gap: "4px" }}>
            <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold)", margin: 0 }}>
              {lang === "en" ? "Find Us" : "Nous Trouver"}
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "16px", color: "white", margin: 0 }}>
              Kibuye, Western Province · Rwanda
            </p>
          </div>
        </div>
      )}
    </main>
  );
}