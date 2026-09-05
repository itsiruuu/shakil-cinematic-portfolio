import { ArrowRight, ArrowUp, Facebook, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

const SOCIALS = [
  { name: "Behance", href: "https://www.behance.com", Icon: null },
  { name: "LinkedIn", href: "https://www.linkdin.com", Icon: Linkedin },
  { name: "Facebook", href: "https://www.facebook.com", Icon: Facebook },
];

function BehanceIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M7.4 5.5c2.6 0 4 1 4 3 0 1.2-.6 2-1.7 2.5 1.5.4 2.3 1.4 2.3 3 0 2.3-1.7 3.5-4.4 3.5H1.5V5.5h5.9Zm-.4 4.8c1 0 1.6-.4 1.6-1.3 0-.9-.6-1.2-1.7-1.2H4.3v2.5h2.7Zm.2 5c1.2 0 1.8-.5 1.8-1.5S8.4 12.3 7 12.3H4.3v3h2.9ZM18.9 8.4c2.7 0 4.4 1.9 4.4 4.9v.7h-6.4c.2 1.3 1 2 2.2 2 .9 0 1.5-.3 1.9-1h2.2c-.5 1.9-2.1 3-4.2 3-2.8 0-4.6-1.9-4.6-4.8 0-2.9 1.8-4.8 4.5-4.8Zm-2 4h4c-.2-1.2-.9-1.9-2-1.9s-1.8.7-2 1.9ZM15.6 5.6h6v1.6h-6V5.6Z" />
    </svg>
  );
}

export function Contact() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <section id="contact" className="relative overflow-hidden bg-ink py-24 text-paper sm:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "96px 96px",
          }}
        />
        <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8">
          <SectionLabel index="10" title="Contact" />

          <Reveal>
            <h2 className="display-lg max-w-5xl text-paper">
              Let&rsquo;s create something great together.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-paper/60 sm:text-base">
              Have a project in mind? Let&rsquo;s turn your idea into a meaningful visual
              experience.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-10 border-t border-paper/15 pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <Reveal delay={160}>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div>
                  <div className="label-xs mb-3 text-paper/40">Location</div>
                  <p className="flex items-start gap-3 text-sm text-paper/85">
                    <MapPin size={15} strokeWidth={1.4} className="mt-0.5 shrink-0" />
                    Uttara, Azampur, Dhaka - 1230
                  </p>
                </div>
                <div>
                  <div className="label-xs mb-3 text-paper/40">Phone</div>
                  <a
                    href="tel:+8801878753502"
                    className="flex items-start gap-3 text-sm text-paper/85 transition-opacity hover:opacity-60"
                  >
                    <Phone size={15} strokeWidth={1.4} className="mt-0.5 shrink-0" />
                    +8801878753502
                  </a>
                </div>
                <div className="min-w-0">
                  <div className="label-xs mb-3 text-paper/40">Email</div>
                  <a
                    href="mailto:Shakilshorif869@gmail.com"
                    className="flex items-start gap-3 break-all text-sm text-paper/85 transition-opacity hover:opacity-60"
                  >
                    <Mail size={15} strokeWidth={1.4} className="mt-0.5 shrink-0" />
                    Shakilshorif869@gmail.com
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <MagneticButton variant="invert" href="mailto:Shakilshorif869@gmail.com">
                Start a Project
                <ArrowRight size={15} />
              </MagneticButton>
            </Reveal>
          </div>

          <Reveal delay={260}>
            <div className="mt-16 flex flex-wrap gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label-xs group flex items-center gap-3 border border-paper/25 px-5 py-4 text-paper/70 transition-all duration-500 hover:-translate-y-1 hover:border-paper hover:bg-paper hover:text-ink"
                >
                  <span className="transition-transform duration-500 group-hover:scale-110">
                    {s.Icon ? <s.Icon size={18} strokeWidth={1.4} /> : <BehanceIcon />}
                  </span>
                  {s.name}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-paper/15 bg-ink py-14 text-paper">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <div className="font-display text-[clamp(1.8rem,5vw,3.5rem)] uppercase leading-none">
                Shorif Ahamed Shakil
              </div>
              <div className="label-xs mt-4 text-paper/50">
                Graphics Designer • UI/UX Designer
              </div>
            </div>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.name}
                  className="flex h-11 w-11 items-center justify-center border border-paper/25 text-paper transition-all duration-500 hover:-translate-y-1 hover:bg-paper hover:text-ink"
                >
                  {s.Icon ? <s.Icon size={17} strokeWidth={1.4} /> : <BehanceIcon size={17} />}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="label-xs text-paper/40">
              © 2026 Shorif Ahamed Shakil. All rights reserved.
            </span>
            <button
              onClick={toTop}
              className="label-xs group flex items-center gap-2 text-paper/60 hover:text-paper"
            >
              Back to top
              <ArrowUp size={14} className="transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
