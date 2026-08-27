import { useState, useEffect } from "react";

type YoutubePreviewProps = {
  youtubeId: string;
  title: string;
  poster?: string;
  className?: string;
};

/** Click-to-load YouTube embed so real client faces show as the poster first. */
export function YoutubePreview({
  youtubeId,
  title,
  poster,
  className = "",
}: YoutubePreviewProps) {
  const [playing, setPlaying] = useState(false);
  const thumb =
    poster ?? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  if (playing) {
    return (
      <div
        className={`relative overflow-hidden bg-foreground ${className.includes("aspect-") ? "" : "aspect-video"} ${className}`}
      >
        <iframe
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={`group relative w-full overflow-hidden bg-foreground text-left ${className.includes("aspect-") ? "" : "aspect-video"} ${className}`}
      aria-label={`Play video: ${title}`}
    >
      <img
        src={thumb}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="absolute right-3 bottom-3 left-3 truncate text-xs font-semibold tracking-[0.12em] text-background uppercase">
        {title}
      </span>
    </button>
  );
}

type LocalVideoProps = {
  src: string;
  poster: string;
  title: string;
  className?: string;
};

export function LocalVideoPreview({ src, poster, title, className = "" }: LocalVideoProps) {
  return (
    <div className={`relative aspect-video overflow-hidden bg-foreground ${className}`}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        title={title}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

type YoutubeAutoplayProps = {
  youtubeId: string;
  title: string;
  className?: string;
};

/**
 * Muted autoplay YouTube embed for hero VSL use.
 * Poster sits behind the iframe so something always shows if autoplay is blocked.
 * Falls back to a click-to-play control when reduced-motion is preferred.
 */
export function YoutubeAutoplay({ youtubeId, title, className = "" }: YoutubeAutoplayProps) {
  const [mode, setMode] = useState<"autoplay" | "click">("autoplay");
  const poster = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("click");
    }
  }, []);

  if (mode === "click") {
    return <YoutubePreview youtubeId={youtubeId} title={title} poster={poster} className={className} />;
  }

  const src =
    `https://www.youtube.com/embed/${youtubeId}` +
    `?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=1&loop=1&playlist=${youtubeId}&enablejsapi=1`;

  return (
    <div className={`relative overflow-hidden bg-foreground ${className}`}>
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        loading="eager"
        decoding="async"
      />
      <iframe
        title={title}
        src={src}
        className="absolute inset-0 z-10 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
