import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import profile from "@/assets/shorif-profile.png.asset.json";
import { VideoBackground } from "./VideoBackground";
import { MagneticButton } from "./MagneticButton";
import { useDesktopPointer } from "@/hooks/use-reveal";

const HEADLINE = ["SHORIF", "AHAMED", "SHAKIL"];
const ROLES = ["Creative", "Graphics", "UI/UX", "Visual Brand"];

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState(0);
  const isDesktop = useDesktopPointer();
  const photoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    const r = setInterval(() => setRole((v) => (v + 1) % ROLES.length), 2200);
    return () => {
      clearTimeout(t);
      clearInterval(r);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 26;
      ty = (e.clientY / window.innerHeight - 0.5) * 20;
    };
    const onScroll = () => {
      if (photoRef.current) {
        photoRef.current.style.setProperty("--py", `${window.scrollY * 0.06}px`);
      }
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      if (photoRef.current) {
        photoRef.current.style.setProperty("--mx", `${cx}px`);
        photoRef.current.style.setProperty("--my", `${cy}px`);
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isDesktop]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="home" className="relative min-h-svh overflow-hidden bg-ink pt-32 lg:pt-36">
      <VideoBackground overlay="from-ink/80 via-ink/75 to-ink" />

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-24">
        {/* LEFT */}
        <div>
          <div
            className="label-xs flex items-center gap-3 text-ash transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(14px)",
            }}
          >
            <span className="h-px w-10 bg-gradient-to-r from-neon to-electric" />
            Graphics Designer • UI/UX Designer
          </div>

          <h1 className="display-hero mt-5 text-paper">
            {HEADLINE.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <span
                  className="block transition-transform duration-[1100ms]"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: `${160 + i * 120}ms`,
                    transform: mounted ? "translateY(0)" : "translateY(110%)",
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <div
            className="mt-8 max-w-xl transition-all duration-1000"
            style={{
              transitionDelay: "620ms",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(24px)",
            }}
          >
            <p className="flex flex-wrap items-baseline gap-x-3 font-display text-[clamp(1.1rem,2.1vw,1.75rem)] uppercase leading-[1.05] tracking-tight text-paper">
              A
              <span className="relative inline-flex h-[1.15em] overflow-hidden align-bottom">
                <span
                  className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: `translateY(-${role * 1.15}em)` }}
                >
                  {ROLES.map((r) => (
                    <span key={r} className="accent-italic h-[1.15em] leading-[1.15em]">
                      {r}
                    </span>
                  ))}
                </span>
              </span>
              Designer
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ash sm:text-base">
              Graphics &amp; UI/UX Designer with 3+ years of experience creating meaningful visual
              identities, digital interfaces, websites, mobile experiences, and creative marketing
              designs.
            </p>
          </div>

          <div
            className="mt-9 flex flex-wrap items-center gap-4 transition-all duration-1000"
            style={{
              transitionDelay: "760ms",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(24px)",
            }}
          >
            <MagneticButton onClick={() => go("works")}>
              View My Work
              <ArrowUpRight size={15} />
            </MagneticButton>
            <MagneticButton variant="outline" onClick={() => go("contact")}>
              Contact Me
            </MagneticButton>
          </div>

          <div
            className="mt-12 flex items-center gap-6 border-t border-line pt-6 transition-opacity duration-1000"
            style={{ transitionDelay: "900ms", opacity: mounted ? 1 : 0 }}
          >
            <div>
              <div className="font-display text-5xl leading-none text-paper sm:text-6xl">3+</div>
              <div className="label-xs mt-2 text-ash">Years Experience</div>
            </div>
            <div className="h-12 w-px bg-line" />
            <div className="label-xs max-w-[16rem] leading-relaxed text-ash">
              Visual identity · Interfaces · Web &amp; Mobile · Marketing design
            </div>
          </div>
        </div>

        {/* RIGHT — profile photo */}
        <div className="relative order-last flex justify-center lg:justify-end">
          <div
            ref={photoRef}
            className="relative w-[76%] max-w-[420px] sm:w-[60%] lg:w-full"
            style={{
              transform:
                "translate3d(var(--mx, 0px), calc(var(--my, 0px) + var(--py, 0px)), 0)",
              transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1)",
              opacity: mounted ? 1 : 0,
            }}
          >
            <div className="glow-soft absolute -inset-x-4 bottom-6 top-10 rounded-[2rem] border border-line" />
            <div className="absolute inset-x-8 bottom-0 top-24 rounded-[1.5rem] bg-gradient-to-b from-electric/25 to-neon/10 blur-[2px]" />
            <div className="pointer-events-none absolute -left-6 top-6 hidden lg:block">
              <span className="label-xs rotate-180 text-ash [writing-mode:vertical-rl]">
                Personal Brand
              </span>
            </div>
            <img
              src={profile.url}
              alt="Portrait of Shorif Ahamed Shakil, graphics and UI/UX designer"
              width={900}
              height={1200}
              className="relative w-full select-none object-contain contrast-[1.08] drop-shadow-[0_28px_60px_rgba(0,0,0,0.75)]"
              style={{
                clipPath: mounted ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                transition: "clip-path 1.4s cubic-bezier(0.16,1,0.3,1) 300ms",
              }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => go("about")}
        className="label-xs absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-ash hover:text-neon sm:flex"
      >
        Scroll to explore
        <ArrowDown size={14} className="scroll-hint" />
      </button>
    </section>
  );
}
