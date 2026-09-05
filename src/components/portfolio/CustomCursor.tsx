import { useEffect, useRef, useState } from "react";
import { useDesktopPointer, usePrefersReducedMotion } from "@/hooks/use-reveal";

export function CustomCursor() {
  const isDesktop = useDesktopPointer();
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!isDesktop || reduced) return;
    document.documentElement.classList.add("no-native-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
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
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
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
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden lg:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border border-ash/70 mix-blend-difference transition-[width,height,opacity] duration-300"
        style={{
          width: active ? 58 : 34,
          height: active ? 58 : 34,
          opacity: active ? 1 : 0.6,
          borderColor: "#666666",
        }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 rounded-full mix-blend-difference"
        style={{
          width: active ? 4 : 7,
          height: active ? 4 : 7,
          background: "#ffffff",
        }}
      />
    </div>
  );
}
