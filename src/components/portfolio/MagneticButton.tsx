import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useDesktopPointer } from "@/hooks/use-reveal";

export function MagneticButton({
  children,
  onClick,
  href,
  variant = "solid",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "solid" | "outline" | "invert";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isDesktop = useDesktopPointer();

  const onMove = (e: React.MouseEvent) => {
    if (!isDesktop || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  const styles = cn(
    "label-xs group relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 transition-[transform,background-color,color,box-shadow] duration-500",
    variant === "solid" &&
      "bg-gradient-to-r from-neon to-electric text-ink hover:glow-soft hover:brightness-110",
    variant === "outline" &&
      "border border-line bg-surface/60 text-paper backdrop-blur-md hover:border-neon hover:text-neon hover:glow-ring",
    variant === "invert" && "bg-paper text-ink hover:bg-neon",
    className,
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={styles}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={styles}
    >
      {children}
    </button>
  );
}
