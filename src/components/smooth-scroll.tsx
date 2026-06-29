import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    let lenis: any;
    let raf: number;
    (async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({ duration: 1.2, smoothWheel: true });
      const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    })();
    return () => { if (lenis) lenis.destroy(); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
