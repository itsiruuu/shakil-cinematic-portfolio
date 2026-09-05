import { Award, GraduationCap, Mail, Phone, Briefcase } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { useReveal } from "@/hooks/use-reveal";

const CERTS = [
  {
    title: "Professional Graphic Design",
    institute: "Creative IT Institute",
    country: "Bangladesh",
    dates: "31/08/2024 – 25/04/2025",
  },
  {
    title: "Professional UX/UI Design",
    institute: "Creative IT Institute",
    country: "Bangladesh",
    dates: "14/03/2025 – 24/10/2025",
  },
];

const EDUCATION = [
  {
    degree: "BBA (Hon’s)",
    place: "Department of BBA (Hon’s) — Dhaka International University – DIU",
    meta: [],
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    place: "Nawab Habibullah Model School and College",
    meta: ["2023", "GPA: 5.00 / 5.00"],
  },
  {
    degree: "Secondary School Certificate (SSC)",
    place: "Nawab Habibullah Model School and College",
    meta: ["2020", "GPA: 4.39 / 5.00"],
  },
];

const LEVELS: Record<string, number> = {
  Beginner: 25,
  Intermediate: 55,
  Advanced: 80,
  Native: 100,
};

const LANGUAGES = [
  {
    name: "English",
    rows: [
      ["Reading", "Beginner"],
      ["Writing", "Intermediate"],
      ["Listening", "Beginner"],
      ["Speaking", "Intermediate"],
    ],
  },
  {
    name: "Bangla",
    rows: [
      ["Reading", "Native"],
      ["Writing", "Advanced"],
      ["Listening", "Native"],
      ["Speaking", "Native"],
    ],
  },
];

const REFERENCES = [
  {
    name: "Joinal Abedin",
    role: "Executive, Faculty Member",
    dept: "Graphics & Multimedia Department",
    email: "joinal.cit.bd@gmail.com",
    phone: "+880 1329723283",
  },
  {
    name: "Afrina Sharmin",
    role: "Assistant Deputy Manager",
    dept: "Creative Business Group",
    email: null,
    phone: null,
  },
];

function Bar({ level, dark }: { level: string; dark?: boolean }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={`h-px w-full ${dark ? "bg-paper/20" : "bg-ink/15"}`}>
      <div
        className={`h-px ${dark ? "bg-paper" : "bg-ink"}`}
        style={{
          width: visible ? `${LEVELS[level] ?? 25}%` : "0%",
          transition: "width 1.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}

export function Journey() {
  return (
    <>
      {/* EXPERIENCE */}
      <section id="experience" className="bg-paper py-24 text-ink sm:py-32">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
          <SectionLabel index="05" title="Experience" />
          <Reveal>
            <h2 className="display-lg">Experience</h2>
          </Reveal>

          <div className="relative mt-16 pl-8 sm:pl-12">
            <div className="absolute bottom-0 left-0 top-0 w-px bg-ink/15" />
            <Reveal>
              <div className="relative">
                <span className="absolute -left-8 top-2 h-2.5 w-2.5 -translate-x-1/2 bg-ink sm:-left-12" />
                <div className="label-xs text-ash">3+ Years Experience</div>
                <h3 className="mt-4 text-3xl uppercase sm:text-5xl">
                  Graphics &amp; UI/UX Designer
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-ash sm:text-base">
                  Three-plus years designing visual identities, digital interfaces, web and mobile
                  experiences, and marketing visuals.
                </p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="relative mt-14 flex items-center gap-4">
                <span className="absolute -left-8 h-2.5 w-2.5 -translate-x-1/2 border border-ink bg-paper sm:-left-12" />
                <Briefcase size={18} strokeWidth={1.3} className="text-ash" />
                <span className="label-xs text-ash">
                  Open to new projects &amp; collaborations
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="bg-ink py-24 text-paper sm:py-32">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
          <SectionLabel index="06" title="Training & Certifications" />
          <Reveal>
            <h2 className="display-lg text-paper">
              Training &amp;
              <br />
              Certifications
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {CERTS.map((c, i) => (
              <Reveal key={c.title} delay={i * 120}>
                <TiltCard intensity={7}>
                  <div className="group relative overflow-hidden border border-paper/20 bg-paper/[0.04] p-8 backdrop-blur-md transition-colors duration-500 hover:bg-paper/[0.09] sm:p-10">
                    <div className="flex items-start justify-between gap-6">
                      <Award
                        size={30}
                        strokeWidth={1.2}
                        className="shrink-0 transition-transform duration-500 group-hover:-translate-y-1"
                      />
                      <span className="label-xs text-paper/50">Certificate: Obtained</span>
                    </div>
                    <h3 className="mt-12 text-2xl uppercase leading-tight sm:text-3xl">
                      {c.title}
                    </h3>
                    <div className="mt-6 space-y-2 text-sm text-paper/60">
                      <p>{c.institute}</p>
                      <p>Country: {c.country}</p>
                      <p className="label-xs pt-2 text-paper/50">{c.dates}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="bg-paper py-24 text-ink sm:py-32">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
          <SectionLabel index="07" title="Education" />
          <Reveal>
            <h2 className="display-lg">Education</h2>
          </Reveal>

          <div className="mt-14 border-t border-ink/15">
            {EDUCATION.map((e, i) => (
              <Reveal key={e.degree} delay={i * 100}>
                <div className="group grid grid-cols-1 gap-4 border-b border-ink/15 py-8 transition-colors duration-500 hover:bg-ink hover:text-paper sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:px-4">
                  <div className="flex items-center gap-4">
                    <GraduationCap size={20} strokeWidth={1.3} />
                    <span className="label-xs opacity-50">0{i + 1}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl uppercase sm:text-4xl">{e.degree}</h3>
                    <p className="mt-3 text-sm opacity-60">{e.place}</p>
                  </div>
                  <div className="flex gap-6 sm:flex-col sm:items-end sm:gap-2">
                    {e.meta.map((m) => (
                      <span key={m} className="label-xs opacity-60">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LANGUAGE */}
      <section className="bg-ink py-24 text-paper sm:py-32">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
          <SectionLabel index="08" title="Language Proficiency" />
          <Reveal>
            <h2 className="display-lg text-paper">Language</h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
            {LANGUAGES.map((l, i) => (
              <Reveal key={l.name} delay={i * 120}>
                <h3 className="text-3xl uppercase sm:text-4xl">{l.name}</h3>
                <div className="mt-8 space-y-7">
                  {l.rows.map(([skill, level]) => (
                    <div key={skill}>
                      <div className="mb-3 flex items-baseline justify-between">
                        <span className="label-xs text-paper/70">{skill}</span>
                        <span className="label-xs text-paper/50">{level}</span>
                      </div>
                      <Bar level={level as string} dark />
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="bg-paper py-24 text-ink sm:py-32">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
          <SectionLabel index="09" title="References" />
          <Reveal>
            <h2 className="display-lg">References</h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {REFERENCES.map((r, i) => (
              <Reveal key={r.name} delay={i * 120}>
                <div className="group h-full border border-ink/15 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-ink sm:p-10">
                  <h3 className="text-2xl uppercase sm:text-3xl">{r.name}</h3>
                  <p className="mt-4 text-sm text-ash">{r.role}</p>
                  <p className="text-sm text-ash">{r.dept}</p>
                  {(r.email || r.phone) && (
                    <div className="mt-8 space-y-3 border-t border-ink/10 pt-6">
                      {r.email && (
                        <a
                          href={`mailto:${r.email}`}
                          className="flex items-center gap-3 text-sm text-ink transition-opacity hover:opacity-60"
                        >
                          <Mail size={15} strokeWidth={1.4} />
                          {r.email}
                        </a>
                      )}
                      {r.phone && (
                        <a
                          href={`tel:${r.phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-3 text-sm text-ink transition-opacity hover:opacity-60"
                        >
                          <Phone size={15} strokeWidth={1.4} />
                          {r.phone}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
