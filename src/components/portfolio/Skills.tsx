import {
  AppWindow,
  Layers,
  LayoutDashboard,
  MonitorSmartphone,
  PenTool,
  Share2,
  Shapes,
  Sparkles,
  Type,
  Image as ImageIcon,
  Figma,
  Feather,
} from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { TiltCard } from "./TiltCard";

const SKILLS = [
  { n: "01", name: "UX/UI Design", Icon: Layers },
  { n: "02", name: "Web & Mobile App Design", Icon: MonitorSmartphone },
  { n: "03", name: "Landing Page Design", Icon: AppWindow },
  { n: "04", name: "Dashboard Design", Icon: LayoutDashboard },
  { n: "05", name: "Logo Design", Icon: PenTool },
  { n: "06", name: "Stationery Design", Icon: Shapes },
  { n: "07", name: "Social Media Post Design", Icon: Share2 },
  { n: "08", name: "Banner Design", Icon: Sparkles },
];

const TOOLS = [
  { name: "Adobe Photoshop", short: "Ps", Icon: ImageIcon },
  { name: "Adobe Illustrator", short: "Ai", Icon: Feather },
  { name: "Adobe XD", short: "Xd", Icon: Type },
  { name: "Figma", short: "Fig", Icon: Figma },
];

export function Skills() {
  return (
    <section id="skills" className="bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <SectionLabel index="02" title="Hard Skills" />
        <Reveal>
          <h2 className="display-lg">What I Do</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <Reveal key={s.name} delay={i * 60} className="bg-paper">
              <TiltCard className="group h-full">
                <div className="relative h-full overflow-hidden bg-paper p-7 transition-colors duration-500 hover:bg-ink sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="label-xs text-ash transition-colors group-hover:text-paper/50">
                      {s.n}
                    </span>
                    <s.Icon
                      size={26}
                      strokeWidth={1.2}
                      className="text-ink transition-all duration-500 group-hover:-translate-y-1 group-hover:text-paper"
                    />
                  </div>
                  <h3 className="mt-16 text-xl uppercase leading-[0.95] text-ink transition-colors duration-500 group-hover:text-paper sm:mt-24 sm:text-2xl">
                    {s.name}
                  </h3>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="mx-auto mt-28 max-w-[1500px] px-5 sm:px-8">
        <SectionLabel index="03" title="Software Knowledge" />
        <Reveal>
          <h2 className="display-lg">Tools I Use</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <TiltCard intensity={12}>
                <div
                  className={`group relative flex h-[260px] flex-col justify-between overflow-hidden border border-ink/15 p-7 transition-colors duration-500 ${
                    i % 2 === 0
                      ? "bg-ink text-paper hover:bg-paper hover:text-ink"
                      : "bg-paper text-ink hover:bg-ink hover:text-paper"
                  }`}
                >
                  <t.Icon
                    size={30}
                    strokeWidth={1.2}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div>
                    <div className="font-display text-6xl uppercase leading-none">{t.short}</div>
                    <div className="label-xs mt-4 opacity-60">{t.name}</div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
