import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";

type V3 = [number, number, number];

type Shape = {
  verts: V3[];
  edges: [number, number][];
  pos: V3;
  rot: V3;
  spin: V3;
  scale: number;
  alpha: number;
};

function cube(): { verts: V3[]; edges: [number, number][] } {
  const verts: V3[] = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];
  return { verts, edges };
}

function octa(): { verts: V3[]; edges: [number, number][] } {
  const verts: V3[] = [
    [0, -1.3, 0],
    [1.1, 0, 0],
    [0, 0, 1.1],
    [-1.1, 0, 0],
    [0, 0, -1.1],
    [0, 1.3, 0],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 1],
  ];
  return { verts, edges };
}

function plane(): { verts: V3[]; edges: [number, number][] } {
  const verts: V3[] = [
    [-1.4, -0.9, 0],
    [1.4, -0.9, 0],
    [1.4, 0.9, 0],
    [-1.4, 0.9, 0],
    [-1.4, -0.3, 0],
    [1.4, -0.3, 0],
    [-1.4, 0.3, 0],
    [1.4, 0.3, 0],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [6, 7],
  ];
  return { verts, edges };
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const factories = [cube, octa, plane];
    const count = isMobile ? 4 : 9;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const shapes: Shape[] = Array.from({ length: count }, (_, i) => {
      const geo = factories[i % factories.length]!();
      return {
        ...geo,
        pos: [rand(-3.4, 3.4), rand(-2.2, 2.2), rand(2.5, 8)],
        rot: [rand(0, 6), rand(0, 6), rand(0, 6)],
        spin: [rand(-0.14, 0.14), rand(-0.16, 0.16), rand(-0.1, 0.1)],
        scale: rand(0.35, 0.95),
        alpha: rand(0.18, 0.6),
      };
    });

    const particles = Array.from({ length: isMobile ? 24 : 70 }, () => ({
      p: [rand(-4, 4), rand(-3, 3), rand(1.5, 9)] as V3,
      s: rand(0.02, 0.06),
    }));

    let dpr = 1;
    let w = 0;
    let h = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let tmx = 0;
    let tmy = 0;
    let mx = 0;
    let my = 0;
    const onMove = (e: MouseEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!isMobile) window.addEventListener("mousemove", onMove, { passive: true });

    const project = (v: V3, s: Shape | null, ox: number, oy: number) => {
      let [x, y, z] = v;
      if (s) {
        const [rx, ry, rz] = s.rot;
        x *= s.scale;
        y *= s.scale;
        z *= s.scale;
        // rotate X
        let ty = y * Math.cos(rx) - z * Math.sin(rx);
        let tz = y * Math.sin(rx) + z * Math.cos(rx);
        y = ty;
        z = tz;
        // rotate Y
        let tx = x * Math.cos(ry) + z * Math.sin(ry);
        tz = -x * Math.sin(ry) + z * Math.cos(ry);
        x = tx;
        z = tz;
        // rotate Z
        tx = x * Math.cos(rz) - y * Math.sin(rz);
        ty = x * Math.sin(rz) + y * Math.cos(rz);
        x = tx;
        y = ty;
        x += s.pos[0];
        y += s.pos[1];
        z += s.pos[2];
      }
      const depth = Math.max(z, 0.4);
      const f = (Math.min(w, h) * 0.9) / depth;
      return {
        x: w / 2 + (x + ox / depth) * f,
        y: h / 2 + (y + oy / depth) * f,
        depth,
      };
    };

    let raf = 0;
    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;

      ctx.clearRect(0, 0, w, h);

      // particles
      for (const pt of particles) {
        const q = project(pt.p, null, mx * 0.9, my * 0.6);
        ctx.beginPath();
        ctx.arc(q.x, q.y, Math.max(pt.s * (140 / q.depth), 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(102,102,102,${Math.max(0.5 - q.depth * 0.05, 0.05)})`;
        ctx.fill();
      }

      for (const s of shapes) {
        if (!reduced) {
          s.rot = [
            s.rot[0] + s.spin[0] * dt,
            s.rot[1] + s.spin[1] * dt,
            s.rot[2] + s.spin[2] * dt,
          ];
        }
        const pts = s.verts.map((v) => project(v, s, mx * 1.6, my * 1.1));
        ctx.lineWidth = Math.max(1.6 / s.pos[2], 0.5);
        ctx.strokeStyle = `rgba(17,17,17,${s.alpha * Math.max(1 - s.pos[2] / 10, 0.15)})`;
        ctx.beginPath();
        for (const [a, b] of s.edges) {
          ctx.moveTo(pts[a]!.x, pts[a]!.y);
          ctx.lineTo(pts[b]!.x, pts[b]!.y);
        }
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduced]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.75)_75%)]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)",
          backgroundSize: "84px 84px",
        }}
      />
    </div>
  );
}
