import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as: _as,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: never;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </div>
  );
}

export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 flex items-center gap-4 border-b border-current/20 pb-4 opacity-60">
      <span className="label-xs">{index}</span>
      <span className="label-xs">{title}</span>
    </div>
  );
}
