import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Tv, Trees, Droplets, Monitor, X } from "lucide-react";
import { useLang } from "@/components/lang-context";

const ROOMS = [
  {
    nameEn: "Deluxe Suite Room",
    nameFr: "Suite Deluxe",
    descEn: "The pinnacle of luxury. Expansive living spaces, a private master bedroom, and breathtaking panoramic views.",
    descFr: "Le summum du luxe. De vastes espaces de vie, une chambre principale privée et des vues panoramiques à couper le souffle.",
    price: 500,
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=90",
  },
  {
    nameEn: "Deluxe Double with Balcony",
    nameFr: "Chambre Double avec Balcon",
    descEn: "Fresh mountain air from your private balcony. Elegant interiors with luxurious velvet furnishings.",
    descFr: "L'air frais de la montagne depuis votre balcon privé. Intérieurs élégants aux garnitures de velours.",
    price: 400,
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=90",
  },
  {
    nameEn: "Deluxe King with Lake View",
    nameFr: "Chambre King Vue Lac",
    descEn: "Wake up to the shimmering waters of Lake Kivu. Floor-to-ceiling windows and opulent seating areas.",
    descFr: "Réveillez-vous face aux eaux du Lac Kivu. Fenêtres du sol au plafond et sièges opulents.",
    price: 350,
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=90",
  },
  {
    nameEn: "Deluxe Double with Garden View",
    nameFr: "Chambre Double Vue Jardin",
    descEn: "A peaceful sanctuary overlooking our manicured gardens. Perfect for quiet reflection in nature.",
    descFr: "Un sanctuaire paisible avec vue sur nos jardins. Parfait pour la réflexion tranquille.",
    price: 250,
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=90",
  },
];

const AMENITIES = [
  { icon: Tv,       en: "Smart TV",    fr: "Smart TV" },
  { icon: Trees,    en: "Garden View", fr: "Vue Jardin" },
  { icon: Droplets, en: "Rain Shower", fr: "Douche Pluie" },
  { icon: Monitor,  en: "Work Desk",   fr: "Bureau" },
];

const T = {
  subtitle: {
    en: "Designed for the discerning traveler, offering privacy, space, and spectacular views.",
    fr: "Conçues pour le voyageur exigeant, offrant intimité, espace et vues spectaculaires.",
  },
  book:    { en: "Book Now",       fr: "Réserver" },
  night:   { en: "/night",         fr: "/nuit" },
  viewAll: { en: "View all rooms", fr: "Voir toutes les chambres" },
  view:    { en: "View details",   fr: "Voir les détails" },
};

const TEASER_CSS = `
  @media (max-width: 640px) {
    [data-rooms-grid] {
      grid-template-columns: 1fr 1fr !important;
      gap: 10px !important;
    }
  }
  @media (max-width: 380px) {
    [data-rooms-grid] {
      grid-template-columns: 1fr !important;
    }
  }
  @media (max-width: 640px) {
    [data-rooms-modal-inner] {
      grid-template-columns: 1fr !important;
      max-height: 85vh !important;
    }
    [data-rooms-modal-inner] > div:first-child {
      min-height: 48vw !important;
    }
  }
`;

export function RoomsTeaser() {
  const { lang } = useLang();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section style={{ background: "white", paddingTop: "clamp(64px,8vw,100px)", overflow: "hidden" }}>
      <style>{TEASER_CSS}</style>

      {/* Header */}
      <div style={{ maxWidth: "1340px", margin: "0 auto", padding: "0 clamp(20px,4vw,52px) clamp(40px,5vw,64px)" }}>
        <motion.div
          initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "28px" }}
        >
          <p style={{
            fontFamily: "var(--font-script)", fontSize: "clamp(20px, 2vw, 30px)",
            fontWeight: 400, color: "var(--ocean)",
            margin: 0, whiteSpace: "nowrap", letterSpacing: "0.01em", lineHeight: 1,
          }}>
            {lang === "en" ? "Sanctuaries of Rest" : "Sanctuaires de Repos"}
          </p>
          <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.12)" }} />
        </motion.div>

        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          style={{
            fontFamily: "var(--font-display)", fontWeight: 300,
            fontSize: "clamp(24px, 3.6vw, 50px)", letterSpacing: "0.04em",
            lineHeight: 1.18, color: "var(--navy)", textTransform: "uppercase",
            maxWidth: "90%", margin: "0 0 20px 0",
          }}
        >
          {["The", "Rooms", "&"].map((word, i) => (
            <motion.span key={i}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              style={{ display: "inline-block", marginRight: "0.22em" }}
            >{word}</motion.span>
          ))}
          <motion.span
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
            style={{ display: "inline-block", fontStyle: "italic", color: "var(--gold)" }}
          >Suites</motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(13px, 1.15vw, 18px)", fontWeight: 300, lineHeight: 1.8, color: "var(--ocean)", margin: 0, maxWidth: "560px" }}
        >
          {T.subtitle[lang]}
        </motion.p>
      </div>

      {/* ── Cards grid — all 4 visible, no overlap ── */}
      <div style={{ padding: "0 clamp(20px,4vw,52px)" }}>
        <div
          data-rooms-grid
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(10px, 1.5vw, 20px)",
          }}
        >
          {ROOMS.map((room, i) => {
            const name = lang === "en" ? room.nameEn : room.nameFr;
            return (
              <motion.div
                key={room.nameEn}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setActive(i)}
                style={{ cursor: "pointer", zIndex: 1 }}
              >
                <div style={{ overflow: "hidden", background: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>
                  {/* Image */}
                  <div style={{ position: "relative", height: "clamp(180px, 20vw, 300px)", overflow: "hidden" }}>
                    <img src={room.img} alt={name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />
                    <div style={{ position: "absolute", bottom: "12px", left: "14px" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.2vw, 32px)", fontWeight: 200, color: "white" }}>
                        ${room.price}
                      </span>
                      <span style={{ fontFamily: "var(--font-label)", fontSize: "9px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.18em", marginLeft: "5px" }}>
                        {T.night[lang]}
                      </span>
                    </div>
                  </div>
                  {/* Name strip */}
                  <div style={{ padding: "14px 16px 16px", background: "white" }}>
                    <p style={{
                      fontFamily: "var(--font-display)", fontStyle: "italic",
                      fontSize: "clamp(13px, 1.2vw, 17px)", fontWeight: 300,
                      color: "var(--ocean)", margin: "0 0 6px 0", lineHeight: 1.3,
                    }}>
                      {name}
                    </p>
                    <span style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "var(--gold)" }}>
                      {T.view[lang]} →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer bar */}
      <div style={{
        marginTop: "clamp(32px,5vw,56px)", borderTop: "1px solid rgba(0,0,0,0.06)",
        padding: "22px clamp(20px,4vw,52px)",
        display: "flex", alignItems: "center", justifyContent: "flex-end",
        flexWrap: "wrap", gap: "16px",
      }}>
        <Link to="/rooms" style={{
          display: "inline-flex", alignItems: "center", gap: "12px",
          fontFamily: "var(--font-label)", fontSize: "10px",
          letterSpacing: "0.35em", textTransform: "uppercase" as const,
          color: "var(--ink)", textDecoration: "none",
          borderBottom: "1px solid var(--gold)", paddingBottom: "4px",
        }}>
          {T.viewAll[lang]} <ArrowRight size={13} />
        </Link>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {active !== null && (() => {
          const room = ROOMS[active];
          const name = lang === "en" ? room.nameEn : room.nameFr;
          const desc = lang === "en" ? room.descEn : room.descFr;
          return (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActive(null)}
              style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(0,0,0,0.72)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "clamp(12px,4vw,48px)",
              }}
            >
              <motion.div
                data-rooms-modal-inner
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={e => e.stopPropagation()}
                style={{
                  background: "var(--cream)", maxWidth: "820px", width: "100%",
                  maxHeight: "90vh", overflowY: "auto",
                  position: "relative",
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                }}
              >
                <button onClick={() => setActive(null)} style={{
                  position: "absolute", top: "12px", right: "12px", zIndex: 10,
                  background: "var(--ink)", border: "none", cursor: "pointer",
                  width: "34px", height: "34px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <X size={15} color="white" strokeWidth={1.5} />
                </button>

                <div style={{ position: "relative", minHeight: "clamp(240px,35vw,400px)" }}>
                  <img src={room.img} alt={name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{
                    position: "absolute", bottom: "18px", left: "18px",
                    background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", padding: "8px 14px",
                  }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 200, color: "white" }}>
                      ${room.price}
                    </span>
                    <span style={{ fontFamily: "var(--font-label)", fontSize: "10px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.2em", marginLeft: "6px" }}>
                      {T.night[lang]}
                    </span>
                  </div>
                </div>

                <div style={{ padding: "clamp(22px,3vw,40px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ width: "36px", height: "1px", background: "var(--gold)", marginBottom: "16px" }} />
                    <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(18px,2.2vw,30px)", fontWeight: 300, color: "var(--ink)", margin: "0 0 14px 0", lineHeight: 1.2 }}>
                      {name}
                    </h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(13px,1vw,15px)", lineHeight: 1.8, color: "rgba(44,44,44,0.65)", fontWeight: 300, margin: "0 0 20px 0" }}>
                      {desc}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "28px" }}>
                      {AMENITIES.map(a => (
                        <div key={a.en} style={{ display: "flex", alignItems: "center", gap: "6px", background: "white", padding: "6px 11px", border: "1px solid rgba(0,0,0,0.07)" }}>
                          <a.icon size={12} color="var(--gold)" />
                          <span style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--ocean)" }}>
                            {lang === "en" ? a.en : a.fr}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to="/contact" onClick={() => setActive(null)} style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "10px", padding: "13px 24px",
                    background: "var(--ink)", color: "white",
                    fontFamily: "var(--font-label)", fontSize: "10px",
                    letterSpacing: "0.32em", textTransform: "uppercase" as const,
                    textDecoration: "none",
                  }}>
                    {T.book[lang]} <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}