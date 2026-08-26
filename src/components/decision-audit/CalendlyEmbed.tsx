"use client";

const CALENDLY_URL =
  "https://calendly.com/subconscioussurgery/30min?hide_gdpr_banner=1";

export function CalendlyEmbed() {
  return (
    <div id="book" className="scroll-mt-8">
      <iframe
        title="Book a Decision Audit"
        src={CALENDLY_URL}
        className="h-[700px] w-full min-w-[320px] border-0"
        loading="lazy"
      />
    </div>
  );
}
