import { useState, useEffect, type ComponentType } from "react";
import { motion } from "motion/react";

export interface OrbitalItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ComponentType<{ size?: number }>;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export function OrbitalTimeline({ data }: { data: OrbitalItem[] }) {
  const [active, setActive] = useState<number>(data[0]?.id ?? 1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRotation((r) => (r + 0.3) % 360), 50);
    return () => clearInterval(interval);
  }, []);

  const activeItem = data.find((d) => d.id === active);
  const related = activeItem?.relatedIds ?? [];

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* concentric rings */}
      {[200, 280, 360].map((r) => (
        <div
          key={r}
          className="absolute rounded-full border border-[var(--gold)]/15"
          style={{ width: r * 2, height: r * 2 }}
        />
      ))}
      {/* center */}
      <motion.div
        className="absolute w-32 h-32 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle, rgba(209,178,116,0.4) 0%, rgba(0,0,118,0.2) 70%, transparent 100%)",
          boxShadow: "0 0 60px rgba(209,178,116,0.3)",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="text-center">
          <p className="label-eyebrow text-[9px]">Marara</p>
          <p className="font-display text-white text-lg mt-1">Kivu</p>
        </div>
      </motion.div>

      {data.map((item, i) => {
        const angle = (i / data.length) * 360 + rotation;
        const radius = 280;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        const isActive = item.id === active;
        const isRelated = related.includes(item.id);
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className="absolute group"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <div
              className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                isActive
                  ? "bg-[var(--gold)] text-[var(--navy)] scale-125 shadow-[0_0_30px_rgba(209,178,116,0.6)]"
                  : isRelated
                  ? "bg-[var(--ocean)] text-white scale-110"
                  : "bg-white/10 text-white/70 group-hover:bg-white/20"
              }`}
            >
              <Icon size={20} />
            </div>
            <p className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap label-eyebrow text-[10px] transition-opacity ${isActive ? "opacity-100 text-[var(--gold)]" : "opacity-60 text-white"}`}>
              {item.title}
            </p>
          </button>
        );
      })}

      {/* detail card */}
      {activeItem && (
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[340px] bg-black/60 backdrop-blur border border-[var(--gold)]/30 p-6 text-center"
        >
          <p className="label-eyebrow">{activeItem.category} · {activeItem.date}</p>
          <h3 className="font-display text-white text-2xl mt-2">{activeItem.title}</h3>
          <p className="text-white/70 text-sm mt-3 leading-relaxed">{activeItem.content}</p>
          <div className="mt-4 h-px w-full bg-white/10 relative">
            <div className="h-px bg-[var(--gold)]" style={{ width: `${activeItem.energy}%` }} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
