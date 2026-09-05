import { Reveal, SectionLabel } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <SectionLabel index="01" title="About Me" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="display-lg text-paper">
                About
                <br />
                Me
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-10 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">
                I&rsquo;m a Graphics &amp; UI/UX Designer with 3 years of experience creating visual
                identities, digital interfaces, mobile and web experiences, and engaging marketing
                visuals. I combine creativity, usability, and modern design principles to create
                designs that are both visually strong and user-focused.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="self-end">
            <div className="border border-paper/20 p-8 sm:p-10">
              <div className="font-display text-[clamp(4rem,11vw,8rem)] leading-none text-paper">
                3+
              </div>
              <div className="label-xs mt-4 text-paper/60">Years</div>
              <div className="label-xs mt-1 text-paper/60">Creative Experience</div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 flex overflow-hidden border-y border-paper/15 py-5">
        <div className="marquee-track flex shrink-0 gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 gap-10">
              {[
                "Graphic Design",
                "UI/UX Design",
                "Typography",
                "Digital Creativity",
                "Visual Design",
              ].map((t) => (
                <span key={t} className="font-display text-3xl uppercase text-paper/35 sm:text-5xl">
                  {t} <span className="text-paper/20">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
