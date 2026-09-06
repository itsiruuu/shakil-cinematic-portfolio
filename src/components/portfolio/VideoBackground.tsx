import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

/** Looping HLS motion background with a dark overlay for text legibility. */
export function VideoBackground({
  flipped = false,
  className,
  overlay = "from-ink/85 via-ink/70 to-ink",
}: {
  flipped?: boolean;
  className?: string;
  overlay?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: { destroy: () => void } | null = null;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = SRC;
      void video.play().catch(() => {});
      return;
    }

    let cancelled = false;
    void import("hls.js").then(({ default: Hls }) => {
      if (cancelled || !Hls.isSupported()) return;
      const instance = new Hls({ enableWorker: true, lowLatencyMode: false });
      instance.loadSource(SRC);
      instance.attachMedia(video);
      instance.on(Hls.Events.MANIFEST_PARSED, () => void video.play().catch(() => {}));
      hls = instance;
    });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, []);

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className={cn(
          "h-full w-full object-cover opacity-45 saturate-[0.6]",
          flipped && "scale-y-[-1]",
        )}
      />
      <div className={cn("absolute inset-0 bg-gradient-to-b", overlay)} />
    </div>
  );
}
