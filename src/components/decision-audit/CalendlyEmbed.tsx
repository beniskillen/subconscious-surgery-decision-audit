"use client";

const CALENDLY_URL =
  "https://calendly.com/subconscioussurgery/30min?hide_gdpr_banner=1&hide_event_type_details=1&embed_type=Inline";

export function CalendlyEmbed() {
  return (
    <div className="relative h-[min(70dvh,38rem)] overflow-hidden border border-hairline sm:h-[700px]">
      <p className="absolute inset-x-4 top-1/2 -translate-y-1/2 text-center text-sm text-muted-foreground">
        Loading the booking calendar…
      </p>
      <iframe
        title="Book a Decision Audit"
        src={CALENDLY_URL}
        className="relative z-10 h-full w-full border-0"
        loading="eager"
      />
    </div>
  );
}
