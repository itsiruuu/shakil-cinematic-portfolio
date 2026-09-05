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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-ink/10 bg-paper/70 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-6",
        )}
      >
        <div className="mx-auto flex max-w-[1500px] items-center gap-6 px-5 sm:px-8">
          <button
            onClick={() => go("home")}
            className="label-xs shrink-0 tracking-[0.32em] text-ink transition-opacity hover:opacity-60"
          >
            SHORIF<span className="text-ash">.</span>
          </button>

          <nav className="ml-auto hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  "label-xs relative py-1 transition-colors",
                  active === l.id ? "text-ink" : "text-ash hover:text-ink",
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-ink transition-transform duration-500",
                    active === l.id ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </button>
            ))}
          </nav>

          <button
            onClick={() => go("contact")}
            className="label-xs ml-auto hidden overflow-hidden border border-ink px-5 py-3 text-ink transition-colors hover:bg-ink hover:text-paper lg:ml-0 lg:block"
          >
            Let's Talk
          </button>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="ml-auto border border-ink/20 p-2.5 text-ink lg:hidden"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-ink text-paper transition-[opacity,transform] duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <span className="label-xs">Menu</span>
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
                "display-lg border-b border-paper/15 py-4 text-left text-paper transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="label-xs mt-8 border border-paper px-6 py-4 text-paper"
          >
            Let's Talk
          </button>
        </nav>
      </div>
    </>
  );
}
