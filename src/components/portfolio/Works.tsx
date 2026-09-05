import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";

/**
 * Replace the `image` value of any project below with your real project file.
 * Drop your file into src/assets/ and import it at the top of this file.
 */
type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  span: string;
  ratio: string;
};

const PROJECTS: Project[] = [
  {
    title: "Mobile Experience",
    category: "Mobile App Design",
    description: "A calm, content-first mobile interface built on a strict monochrome grid.",
    image: work1,
    span: "lg:col-span-5",
    ratio: "aspect-[4/5]",
  },
  {
    title: "Brand Identity System",
    category: "Brand Identity",
    description: "Logo, stationery and identity rules for a minimal editorial brand.",
    image: work2,
    span: "lg:col-span-7",
    ratio: "aspect-[4/3] lg:aspect-[16/11]",
  },
  {
    title: "Analytics Dashboard",
    category: "UI/UX Design",
    description: "Data-dense dashboard focused on clarity, hierarchy and fast scanning.",
    image: work3,
    span: "lg:col-span-7",
    ratio: "aspect-[4/3] lg:aspect-[16/11]",
  },
  {
    title: "Campaign Posters",
    category: "Social Media Design",
    description: "Bold typographic poster and social set for a launch campaign.",
    image: work4,
    span: "lg:col-span-5",
    ratio: "aspect-[4/5]",
  },
  {
    title: "Landing Page",
    category: "Web Design",
    description: "High-contrast landing page with a clear conversion path.",
    image: work5,
    span: "lg:col-span-6",
    ratio: "aspect-[4/3]",
  },
  {
    title: "Type Experiments",
    category: "Graphic Design",
    description: "Grid and typography studies exploring rhythm and negative space.",
    image: work6,
    span: "lg:col-span-6",
    ratio: "aspect-[4/3] lg:aspect-square",
  },
];

const CATEGORIES = [
  "UI/UX Design",
  "Web Design",
  "Mobile App Design",
  "Brand Identity",
  "Graphic Design",
  "Social Media Design",
];

export function Works() {
  const [open, setOpen] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const shown = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="works" className="bg-ink py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <SectionLabel index="04" title="Portfolio" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <Reveal>
            <h2 className="display-lg text-paper">Selected Works</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-sm leading-relaxed text-paper/60 sm:text-base">
              A collection of creative design projects, digital experiences and visual solutions.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`label-xs border px-4 py-2.5 transition-colors duration-300 ${
                filter === c
                  ? "border-paper bg-paper text-ink"
                  : "border-paper/25 text-paper/60 hover:border-paper hover:text-paper"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {shown.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 100} className={p.span}>
              <button
                onClick={() => setOpen(p)}
                className="group block w-full text-left"
                data-cursor="hover"
              >
                <div className={`relative overflow-hidden bg-graphite ${p.ratio}`}>
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.category}`}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
                  <div className="absolute bottom-4 right-4 flex h-12 w-12 translate-y-3 items-center justify-center bg-paper text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6 border-t border-paper/15 pt-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-xl uppercase text-paper sm:text-2xl">{p.title}</h3>
                    <p className="mt-2 text-sm text-paper/55">{p.description}</p>
                  </div>
                  <span className="label-xs shrink-0 text-paper/50">{p.category}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-md"
          onClick={() => setOpen(null)}
        >
          <div
            className="animate-scale-in max-h-[90svh] w-full max-w-4xl overflow-y-auto bg-paper text-ink"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
              <span className="label-xs text-ash">{open.category}</span>
              <button aria-label="Close project" onClick={() => setOpen(null)} className="p-1">
                <X size={20} />
              </button>
            </div>
            <img
              src={open.image}
              alt={open.title}
              className="w-full object-cover grayscale"
              loading="lazy"
            />
            <div className="px-6 py-8 sm:px-10 sm:py-10">
              <h3 className="display-lg">{open.title}</h3>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ash sm:text-base">
                {open.description} Presented in a monochrome treatment so layout, hierarchy and
                typography carry the work.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-ink/10 pt-6 sm:grid-cols-3">
                <div>
                  <div className="label-xs text-ash">Role</div>
                  <div className="mt-2 text-sm">Design &amp; Direction</div>
                </div>
                <div>
                  <div className="label-xs text-ash">Discipline</div>
                  <div className="mt-2 text-sm">{open.category}</div>
                </div>
                <div>
                  <div className="label-xs text-ash">Designer</div>
                  <div className="mt-2 text-sm">Shorif Ahamed Shakil</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
