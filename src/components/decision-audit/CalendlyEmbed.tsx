"use client";

import { useEffect, useRef, useState } from "react";

import { fireSchedule } from "@/lib/meta-pixel";
import { pageUtms, withUtms } from "@/lib/page-utm";

const CALENDLY_URL =
  "https://calendly.com/subconscioussurgery/30min?hide_gdpr_banner=1&hide_event_type_details=1&embed_type=Inline";

export function CalendlyEmbed() {
  const [src, setSrc] = useState(CALENDLY_URL);
  const fired = useRef(false);

  useEffect(() => {
    setSrc(withUtms(CALENDLY_URL, pageUtms()));
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data as { event?: string } | null;
      if (!data || data.event !== "calendly.event_scheduled") return;
      if (fired.current) return;
      fired.current = true;
      void fireSchedule();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="relative h-[min(70dvh,38rem)] overflow-hidden border border-hairline sm:h-[700px]">
      <p className="absolute inset-x-4 top-1/2 -translate-y-1/2 text-center text-sm text-muted-foreground">
        Loading the booking calendar…
      </p>
      <iframe
        title="Book a Decision Audit"
        src={src}
        className="relative z-10 h-full w-full border-0"
        loading="eager"
      />
    </div>
  );
}
