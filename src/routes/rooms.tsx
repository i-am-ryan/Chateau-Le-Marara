import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/reveal";
import { useLang } from "@/components/lang-context";
import { ArrowRight, Tv, Trees, Droplets, Monitor, ChevronLeft, ChevronRight, X } from "lucide-react";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms & Suites — Château le Marara" },
      { name: "description", content: "Discover our rooms and suites overlooking Lake Kivu — French elegance on the Rwandan shore." },
    ],
  }),
  component: Rooms,
});

const AMENITIES = [
  { icon: Tv,         en: "Smart TV",        fr: "Smart TV" },
  { icon: Trees,      en: "Garden View",     fr: "Vue Jardin" },
  { icon: Droplets,   en: "Rain Shower",     fr: "Douche Pluie" },
  { icon: Monitor,    en: "Work Desk",       fr: "Bureau" },
  { icon: ArrowRight, en: "Private Balcony", fr: "Balcon Privé" },
];

const ROOMS = [
  {
    id: "suite", category: "suite",
    nameEn: "Deluxe Suite Room", nameFr: "Suite Deluxe",
    price: 500,
    descEn: "The pinnacle of luxury. Our Deluxe Suite offers expansive living spaces, a private master bedroom, and breathtaking panoramic views.",
    descFr: "Le summum du luxe. Notre Suite Deluxe offre de vastes espaces de vie, une chambre principale privée et des vues panoramiques à couper le souffle.",
    imgs: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=90",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1400&q=90",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=90",
    ],
  },
  {
    id: "balcony", category: "deluxe",
    nameEn: "Deluxe Double Room with Balcony", nameFr: "Chambre Double Deluxe avec Balcon",
    price: 400,
    descEn: "Enjoy fresh mountain air from your private balcony. Elegant interiors with outdoor relaxation space featuring luxurious velvet furnishings.",
    descFr: "Profitez de l'air frais de la montagne depuis votre balcon privé. Intérieurs élégants avec espace de détente extérieur.",
    imgs: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1400&q=90",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=90",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=90",
    ],
  },
  {
    id: "lake", category: "deluxe",
    nameEn: "Deluxe Double King Room with Lake View", nameFr: "Chambre King Deluxe Vue Lac",
    price: 350,
    descEn: "Wake up to the shimmering waters of Lake Kivu. Designed for romance with floor-to-ceiling windows and opulent seating areas.",
    descFr: "Réveillez-vous face aux eaux scintillantes du Lac Kivu. Conçue pour la romance avec des fenêtres du sol au plafond.",
    imgs: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=90",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1400&q=90",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=90",
    ],
  },
  {
    id: "garden", category: "deluxe",
    nameEn: "Deluxe Double Room with Garden View", nameFr: "Chambre Double Deluxe Vue Jardin",
    price: 250,
    descEn: "A peaceful sanctuary overlooking our manicured gardens. Perfect for quiet reflection and unwinding in nature.",
    descFr: "Un sanctuaire paisible avec vue sur nos jardins. Parfait pour la réflexion tranquille et la détente dans la nature.",
    imgs: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=90",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=90",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1400&q=90",
    ],
  },
];

const FILTERS = [
  { key: "all",    en: "All Accommodations", fr: "Tous" },
  { key: "suite",  en: "Suites",             fr: "Suites" },
  { key: "deluxe", en: "Deluxe Rooms",       fr: "Chambres Deluxe" },
];

const ROOMS_CSS = `
  @media (max-width: 768px) {
    [data-room-card] {
      grid-template-columns: 1fr !important;
      direction: ltr !important;
    }
    [data-room-card] .room-img-area {
      height: clamp(260px, 60vw, 380px) !important;
    }
  }
  @media (max-width: 640px) {
    [data-lb-arrows] button {
      left: 8px !important;
      right: 8px !important;
      width: 36px !important;
      height: 36px !important;
    }
    [data-lb-arrows] button:last-child {
      left: auto !important;
    }
  }
`;

function RoomCard({ room, index, lang }: { room: typeof ROOMS[0]; index: number; lang: "en" | "fr" }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [hoverImg, setHoverImg] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const name = lang === "en" ? room.nameEn : room.nameFr;
  const desc = lang === "en" ? room.descEn : room.descFr;
  const isEven = index % 2 === 0;

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setImgIdx(i => (i - 1 + room.imgs.length) % room.imgs.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setImgIdx(i => (i + 1) % room.imgs.length); };
  const lbPrev = () => setLightboxIdx(i => (i - 1 + room.imgs.length) % room.imgs.length);
  const lbNext = () => setLightboxIdx(i => (i + 1) % room.imgs.length);

  const openLightbox = (i: number) => {
    setLightboxIdx(i);
    setLightbox(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightbox(false);
    document.body.style.overflow = "";
  };

  return (
    <Reveal>
      <div
        data-room-card
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(20px, 5vw, 80px)",
          alignItems: "center",
          direction: isEven ? "ltr" : "rtl",
        }}
      >
        {/* Image carousel */}
        <div
          className="room-img-area"
          style={{ position: "relative", overflow: "hidden", direction: "ltr", height: "clamp(300px, 48vw, 640px)" }}
          onMouseEnter={() => setHoverImg(true)}
          onMouseLeave={() => setHoverImg(false)}
          onClick={() => openLightbox(imgIdx)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={imgIdx}
              src={room.imgs[imgIdx]}
              alt={name}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: hoverImg ? 1.05 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0, cursor: "zoom-in" }}
            />
          </AnimatePresence>

          {/* Gold border on hover */}
          <div style={{
            position: "absolute", inset: 0,
            boxShadow: hoverImg ? "inset 0 0 0 3px var(--gold)" : "inset 0 0 0 0px var(--gold)",
            transition: "box-shadow 0.4s ease", pointerEvents: "none", zIndex: 3,
          }} />

          {/* Arrows */}
          {room.imgs.length > 1 && (
            <>
              <button onClick={prev} style={{
                position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.45)", border: "none", cursor: "pointer",
                width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", zIndex: 4, opacity: hoverImg ? 1 : 0, transition: "opacity 0.3s ease",
              }}>
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} style={{
                position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.45)", border: "none", cursor: "pointer",
                width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", zIndex: 4, opacity: hoverImg ? 1 : 0, transition: "opacity 0.3s ease",
              }}>
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Dots */}
          <div style={{
            position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: "6px", zIndex: 4,
          }}>
            {room.imgs.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setImgIdx(i); }} style={{
                width: i === imgIdx ? "20px" : "6px", height: "2px",
                background: i === imgIdx ? "var(--gold)" : "rgba(255,255,255,0.5)",
                border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease",
              }} />
            ))}
          </div>
        </div>

        {/* Text */}
        <div style={{ direction: "ltr", padding: "clamp(0px, 1vw, 20px) 0" }}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(24px, 3.2vw, 48px)",
            color: "var(--ocean)", lineHeight: 1.15, margin: "0 0 20px 0",
          }}>
            {name}
          </h2>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "clamp(13px, 1.1vw, 16px)",
            fontWeight: 300, lineHeight: 1.85,
            color: "rgba(44,44,44,0.65)", margin: "0 0 24px 0",
          }}>
            {desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "32px" }}>
            {AMENITIES.map((a, ai) => (
              <div key={ai} style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: "var(--cream)", padding: "5px 10px",
                border: "1px solid rgba(0,0,0,0.07)",
              }}>
                <a.icon size={11} color="var(--gold)" />
                <span style={{
                  fontFamily: "var(--font-label)", fontSize: "9px",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--ocean)",
                }}>
                  {lang === "en" ? a.en : a.fr}
                </span>
              </div>
            ))}
          </div>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
            borderTop: "1px solid rgba(201,169,97,0.3)", paddingTop: "20px",
          }}>
            <div>
              <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(44,44,44,0.4)", margin: "0 0 4px 0" }}>
                {lang === "en" ? "From" : "À partir de"}
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 2.8vw, 36px)", fontWeight: 200, color: "var(--navy)", margin: 0, lineHeight: 1 }}>
                ${room.price}
                <span style={{ fontFamily: "var(--font-label)", fontSize: "11px", color: "rgba(44,44,44,0.4)", marginLeft: "6px", letterSpacing: "0.1em" }}>
                  / {lang === "en" ? "night" : "nuit"}
                </span>
              </p>
            </div>
            <Link
              to="/contact"
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "13px 24px",
                background: hoverBtn ? "var(--gold)" : "var(--navy)",
                color: "white",
                fontFamily: "var(--font-label)", fontSize: "10px",
                letterSpacing: "0.32em", textTransform: "uppercase",
                textDecoration: "none", transition: "background 0.4s ease",
                whiteSpace: "nowrap",
              }}
            >
              {lang === "en" ? "Book This Room" : "Réserver"} <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            style={{
              position: "fixed", inset: 0, zIndex: 300,
              background: "rgba(0,0,0,0.92)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "clamp(12px,4vw,60px)",
            }}
          >
            <button onClick={closeLightbox} style={{
              position: "absolute", top: "16px", right: "16px",
              background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer",
              width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", backdropFilter: "blur(8px)", zIndex: 5, borderRadius: "50%",
            }}>
              <X size={18} strokeWidth={1.5} />
            </button>

            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", maxWidth: "900px", width: "100%" }}
              data-lb-arrows
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIdx}
                  src={room.imgs[lightboxIdx]}
                  alt={name}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                  style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", display: "block" }}
                />
              </AnimatePresence>

              {/* Prev / Next — positioned inside the image area safely */}
              <button onClick={lbPrev} style={{
                position: "absolute", left: "clamp(-48px,-5vw,-20px)", top: "50%", transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer",
                width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", backdropFilter: "blur(8px)",
              }}>
                <ChevronLeft size={20} />
              </button>
              <button onClick={lbNext} style={{
                position: "absolute", right: "clamp(-48px,-5vw,-20px)", top: "50%", transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer",
                width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", backdropFilter: "blur(8px)",
              }}>
                <ChevronRight size={20} />
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "14px" }}>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: 0 }}>
                  {name}
                </p>
                <p style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", margin: 0 }}>
                  {String(lightboxIdx + 1).padStart(2, "0")} / {String(room.imgs.length).padStart(2, "0")}
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "10px", justifyContent: "center" }}>
                {room.imgs.map((src, i) => (
                  <button key={i} onClick={() => setLightboxIdx(i)} style={{
                    width: "60px", height: "40px", overflow: "hidden",
                    border: i === lightboxIdx ? "2px solid var(--gold)" : "2px solid transparent",
                    padding: 0, cursor: "pointer", flexShrink: 0,
                    transition: "border 0.25s ease", opacity: i === lightboxIdx ? 1 : 0.5,
                  }}>
                    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

function Rooms() {
  const { lang } = useLang();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? ROOMS : ROOMS.filter(r => r.category === filter);

  return (
    <main style={{ background: "var(--cream)" }}>
      <style>{ROOMS_CSS}</style>

      {/* Hero */}
      <section style={{ position: "relative", height: "100dvh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=2000&q=90"
          alt="Rooms & Suites"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,18,26,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />

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
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--gold)", margin: "0 0 14px 0" }}>
            {lang === "en" ? "The Accommodation" : "L'Hébergement"}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
            style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "clamp(36px, 6vw, 88px)",
              color: "white", lineHeight: 1.0, margin: "0 0 14px 0",
            }}>
            {lang === "en" ? "The Rooms & Suites" : "Les Chambres & Suites"}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.5 }}
            style={{
              fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: "clamp(14px, 1.6vw, 22px)", fontWeight: 300,
              color: "rgba(255,255,255,0.65)", margin: 0, maxWidth: "520px",
            }}>
            {lang === "en" ? "Four bespoke retreats. Each one a window onto Lake Kivu." : "Quatre retraites sur mesure. Chacune une fenêtre sur le Lac Kivu."}
          </motion.p>
        </div>
      </section>

      <div style={{ position: "relative", zIndex: 2, background: "var(--cream)" }}>
        {/* Intro */}
        <section style={{ maxWidth: "1340px", margin: "0 auto", padding: "clamp(52px,8vw,80px) clamp(20px,5vw,80px) 40px" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "28px" }}>
              <p style={{ fontFamily: "var(--font-script)", fontSize: "clamp(20px, 2vw, 30px)", fontWeight: 400, color: "var(--ocean)", margin: 0, whiteSpace: "nowrap" }}>
                {lang === "en" ? "A Royal Retreat" : "Un Séjour Royal"}
              </p>
              <div style={{ flex: 1, height: "1px", background: "rgba(44,44,44,0.12)" }} />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "clamp(22px, 3.2vw, 46px)",
              letterSpacing: "0.04em", textTransform: "uppercase",
              color: "var(--navy)", maxWidth: "90%", margin: "0 0 18px 0", lineHeight: 1.18,
            }}>
              {lang === "en" ? "SIGNATURE COLLECTION" : "COLLECTION SIGNATURE"}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.1vw, 18px)",
              fontWeight: 300, lineHeight: 1.85, color: "var(--ocean)", maxWidth: "600px", margin: 0,
            }}>
              {lang === "en"
                ? "Each room is a testament to refined luxury, where African warmth meets French classicism. Every detail has been thoughtfully curated to ensure your stay is nothing short of extraordinary."
                : "Chaque chambre témoigne du luxe raffiné, là où la chaleur africaine rencontre le classicisme français. Chaque détail a été soigneusement pensé pour que votre séjour soit exceptionnel."}
            </p>
          </Reveal>
        </section>

        {/* Filters */}
        <section style={{ maxWidth: "1340px", margin: "0 auto", padding: "0 clamp(20px,5vw,80px) clamp(40px,5vw,60px)" }}>
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              {FILTERS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  style={{
                    fontFamily: "var(--font-label)", fontSize: "10px",
                    letterSpacing: "0.28em", textTransform: "uppercase",
                    padding: "12px clamp(14px,2.5vw,28px)",
                    background: filter === f.key ? "var(--navy)" : "transparent",
                    color: filter === f.key ? "white" : "var(--ocean)",
                    border: "none", cursor: "pointer",
                    borderBottom: filter === f.key ? "2px solid var(--gold)" : "2px solid transparent",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {lang === "en" ? f.en : f.fr}
                </button>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Room listings */}
        <section style={{ background: "white", padding: "clamp(48px,8vw,100px) clamp(20px,5vw,80px)" }}>
          <div style={{ maxWidth: "1340px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(60px,10vw,140px)" }}>
            <AnimatePresence mode="wait">
              {filtered.map((room, i) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <RoomCard room={room} index={i} lang={lang} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}