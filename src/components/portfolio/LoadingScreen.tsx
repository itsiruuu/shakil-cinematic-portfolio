import { useEffect, useState } from "react";

const WORDS = ["Design", "Create", "Inspire"];

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [word, setWord] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return Math.min(100, p + Math.max(1, Math.round((100 - p) * 0.08)));
      });
    }, 40);
    const swap = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 620);
    return () => {
      clearInterval(tick);
      clearInterval(swap);
    };
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const t = setTimeout(() => setDone(true), 520);
    return () => clearTimeout(t);
  }, [progress]);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-ink transition-opacity duration-500"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
        <span className="spin-slow absolute inset-0 rounded-full border border-line border-t-neon" />
        <span className="font-display text-3xl text-paper">{progress}%</span>
      </div>
      <div className="mt-10 h-6 overflow-hidden">
        <div
          className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateY(-${word * 1.5}rem)` }}
        >
          {WORDS.map((w) => (
            <div key={w} className="accent-italic h-6 text-xl leading-6">
              {w}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 h-px w-56 overflow-hidden bg-line">
        <div
          className="h-px bg-gradient-to-r from-neon to-electric transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
