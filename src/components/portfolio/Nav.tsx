import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "works", label: "Works" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
        <div className="glass-card flex w-full max-w-[1100px] items-center gap-4 rounded-full px-4 py-2.5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] sm:px-6">
          <button
            onClick={() => go("home")}
            className="label-xs flex shrink-0 items-center gap-2 tracking-[0.32em] text-paper transition-opacity hover:opacity-70"
          >
            <span className="glow-ring inline-block h-2.5 w-2.5 rounded-full bg-neon" />
            SHORIF
          </button>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  "label-xs rounded-full px-3.5 py-2 transition-all duration-300",
                  active === l.id
                    ? "bg-paper/10 text-neon glow-ring"
                    : "text-ash hover:text-paper",
                )}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => go("contact")}
            className="label-xs ml-auto hidden rounded-full bg-gradient-to-r from-neon to-electric px-5 py-2.5 text-ink transition-all duration-500 hover:brightness-110 lg:ml-2 lg:block"
          >
            Let's Talk
          </button>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="ml-auto rounded-full border border-line p-2.5 text-paper lg:hidden"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-ink/95 text-paper backdrop-blur-xl transition-[opacity,transform] duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <span className="label-xs text-ash">Menu</span>
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2">
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col px-5 pt-4">
          {LINKS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              style={{ transitionDelay: `${open ? 80 + i * 45 : 0}ms` }}
              className={cn(
                "display-lg border-b border-line py-4 text-left text-paper transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="label-xs mt-8 rounded-full bg-gradient-to-r from-neon to-electric px-6 py-4 text-ink"
          >
            Let's Talk
          </button>
        </nav>
      </div>
    </>
  );
}
