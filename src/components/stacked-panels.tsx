import { useRef, useState } from "react";
import { motion } from "motion/react";

const IMAGES = [
  "https://images.unsplash.com/photo-1562618817-253a2b6ab6c4?w=600&q=80",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80",
  "https://images.unsplash.com/photo-1580746738099-4c4e9e49af4c?w=600&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
];

const OVERLAYS = [
  "linear-gradient(135deg, rgba(0,0,118,0.55) 0%, rgba(16,72,110,0.45) 100%)",
  "linear-gradient(135deg, rgba(209,178,116,0.45) 0%, rgba(50,64,83,0.55) 100%)",
];

const PANEL_COUNT = 22;

export function StackedPanels() {
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* overlay text */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <p className="label-eyebrow">The Experience</p>
        <h2 className="mt-6 font-display text-white text-[40px] md:text-[56px] leading-[1.05] max-w-3xl">
          Where the château meets the lake
        </h2>
        <p className="mt-4 text-white/50 text-sm">Move your cursor to explore</p>
      </div>

      <div ref={ref} className="absolute inset-0 flex" onMouseLeave={() => setActive(null)}>
        {Array.from({ length: PANEL_COUNT }).map((_, i) => {
          const img = IMAGES[i % IMAGES.length];
          const overlay = OVERLAYS[i % OVERLAYS.length];
          const isActive = active === i;
          return (
            <motion.div
              key={i}
              onMouseEnter={() => setActive(i)}
              className="relative h-full cursor-pointer overflow-hidden border-r border-white/5"
              animate={{ flex: isActive ? 6 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{ backgroundImage: `url(${img})`, transform: isActive ? "scale(1.05)" : "scale(1.15)" }}
              />
              <div className="absolute inset-0" style={{ background: overlay }} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
