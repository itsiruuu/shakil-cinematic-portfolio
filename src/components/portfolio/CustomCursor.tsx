import { useEffect, useRef, useState } from "react";
import { useDesktopPointer, usePrefersReducedMotion } from "@/hooks/use-reveal";

export function CustomCursor() {
  const isDesktop = useDesktopPointer();
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!isDesktop || reduced) return;
    document.documentElement.classList.add("no-native-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let tx = mx;
    let ty = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest("a,button,[data-cursor='hover']")));
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      tx += (rx - tx) * 0.1;
      ty += (ry - ty) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("no-native-cursor");
    };
  }, [isDesktop, reduced]);

  if (!isDesktop || reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[130] hidden lg:block">
      <div
        ref={ringRef}
        className="glow-ring fixed left-0 top-0 rounded-full border border-neon/70 transition-[width,height,opacity,background-color] duration-300"
        style={{
          width: active ? 68 : 36,
          height: active ? 68 : 36,
          opacity: active ? 1 : 0.75,
          backgroundColor: active ? "rgba(255,255,255,0.9)" : "transparent",
          mixBlendMode: active ? "difference" : "normal",
        }}
      />
      <div
        ref={trailRef}
        className="fixed left-0 top-0 rounded-full bg-neon/40 blur-[6px]"
        style={{ width: 14, height: 14, opacity: active ? 0 : 0.8 }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 rounded-full bg-neon"
        style={{
          width: active ? 5 : 8,
          height: active ? 5 : 8,
          boxShadow: "0 0 14px 2px rgba(34,211,238,0.8)",
        }}
      />
    </div>
  );
}
