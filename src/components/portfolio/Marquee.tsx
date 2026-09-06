const ITEMS = ["Creative Design", "UI/UX Experiences", "Visual Identity"];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-graphite py-6">
      <div className="marquee-fast flex w-max shrink-0">
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} className="flex shrink-0 items-center gap-8 pr-8">
            {ITEMS.concat(ITEMS).map((t, i) => (
              <span
                key={`${k}-${i}-${t}`}
                className="flex shrink-0 items-center gap-8 font-display text-3xl uppercase tracking-tight text-paper/80 sm:text-5xl"
              >
                {t}
                <span className="text-neon">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
