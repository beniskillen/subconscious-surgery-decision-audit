import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { CalendlyEmbed } from "@/components/decision-audit/CalendlyEmbed";
import { QuantumField } from "@/components/decision-audit/QuantumField";
import { GhostNumeral } from "@/components/decision-audit/GhostNumeral";
import { ProcessDiagram } from "@/components/decision-audit/ProcessDiagram";
import { SurgeryPhases } from "@/components/decision-audit/SurgeryPhases";
import {
  CASE_STUDY_VIDEOS,
  TESTIMONIALS,
} from "@/components/decision-audit/testimonials";
import {
  LocalVideoPreview,
  YoutubeAutoplay,
  YoutubePreview,
} from "@/components/decision-audit/VideoPreview";
import { Live, LiveCopyProvider, useLiveCopy } from "@/components/decision-audit/LiveCopy";
import { Reveal, useStickyCta } from "@/components/decision-audit/useReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { asset } from "@/lib/asset";

const ASSETS = {
  logo: asset("brand/logo.png"),
  portrait: asset("brand/adrian-portrait.png"),
  youtube: asset("brand/social/youtube.png"),
  instagram: asset("brand/social/instagram.png"),
  facebook: asset("brand/social/facebook.png"),
  whatsapp: asset("brand/social/whatsapp.png"),
  linkedin: asset("brand/social/linkedin.png"),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Decision Audit | Subconscious Surgery" },
      {
        name: "description",
        content:
          "A free 40-minute working session for high performers who need clarity.",
      },
      { property: "og:title", content: "The Decision Audit | Subconscious Surgery" },
      {
        property: "og:description",
        content:
          "You already know the move. Something in you keeps you from making it. A free 40-minute Decision Audit for high performers who need clarity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CTA_DEFAULT = "Book your Decision Audit";
const CTA_HREF = "#book";
const HERO_VSL_ID = "6p0Xtf21CyM";

const MECHANISM = [
  {
    n: "01",
    title: "Name the stall",
    body: "Name the one decision. Put your own number on what delay has already cost.",
    keep: "You keep: the cost figure.",
  },
  {
    n: "02",
    title: "Name the belief",
    body: "How you talk about the decision shows the belief underneath it, in its exact wording. Not a category. Not a mood.",
    keep: "You keep: the belief, written down.",
  },
  {
    n: "03",
    title: "Score the baseline",
    body: "That belief, scored 1 to 10, logged.",
    keep: "You keep: your baseline score.",
  },
  {
    n: "04",
    title: "Name the next step",
    body: "One concrete move. When you will take it. Written down before you leave.",
    keep: "You keep: exact next-step clarity.",
  },
];

const FAQS = [
  {
    q: "Is this a sales call?",
    a: "No. The audit is the value. You leave with written outputs either way.",
  },
  {
    q: "Is this a 90-day plan or programme pitch?",
    a: "No. One decision. Exact clarity on the next step.",
  },
  {
    q: "Is this woo?",
    a: "The right starting position is scepticism. Good. Everything is stated, scored and written down.",
  },
  {
    q: "Is this therapy?",
    a: "No. Not therapy. Not medical treatment.",
  },
  {
    q: "What is the Ashta Project?",
    a: "A peer community in groups of eight. One possible next step after the audit, never required to book.",
  },
  {
    q: "What do I need to prepare?",
    a: "One real decision you have been sitting on for more than 30 days.",
  },
];
const SOCIALS = [
  { name: "YouTube", href: "https://www.youtube.com/@subconscioussurgery144", icon: ASSETS.youtube },
  { name: "Instagram", href: "https://www.instagram.com/adrian_taffinder", icon: ASSETS.instagram },
  { name: "Facebook", href: "https://www.facebook.com/subconscioussurgery", icon: ASSETS.facebook },
  { name: "WhatsApp", href: "https://wa.me/447572431214", icon: ASSETS.whatsapp },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/adrian-taffinder-aka-the-subconscious-surgeon-69a53b32/",
    icon: ASSETS.linkedin,
  },
];

function CtaButton({
  className = "",
  onHover,
}: {
  className?: string;
  onHover?: () => void;
}) {
  return (
    <a
      href={CTA_HREF}
      onMouseEnter={onHover}
      onFocus={onHover}
      className={`cta-button inline-flex items-center justify-center bg-accent px-8 py-4 text-sm font-bold tracking-wide text-accent-foreground uppercase hover:bg-accent-soft focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${className}`}
    >
      <Live id="cta.label" defaultValue={CTA_DEFAULT} className="inline" />
    </a>
  );
}

function SectionLabel({
  id,
  defaultValue,
}: {
  id: string;
  defaultValue: string;
}) {
  return (
    <Live
      id={id}
      defaultValue={defaultValue}
      className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase"
    />
  );
}

function CtaBlock({
  microcopyId,
  microcopyDefault,
}: {
  microcopyId: string;
  microcopyDefault: string;
}) {
  return (
    <Reveal className="mt-14 flex flex-col items-start gap-4">
      <CtaButton />
      <Live
        id={microcopyId}
        defaultValue={microcopyDefault}
        as="p"
        multiline
        className="max-w-md text-sm text-muted-foreground"
      />
    </Reveal>
  );
}

function Index() {
  return (
    <LiveCopyProvider>
      <DecisionAuditPage />
    </LiveCopyProvider>
  );
}

function DecisionAuditPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const underlineRef = useRef<HTMLSpanElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const stickyVisible = useStickyCta(heroRef);
  const { get } = useLiveCopy();

  const collapse = useCallback(() => setCollapsed(true), []);

  useEffect(() => {
    if (collapsed) return;
    const onScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      if (window.scrollY > hero.offsetHeight * 0.3) setCollapsed(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [collapsed]);

  const verified = TESTIMONIALS.filter((t) => !t.youtubeId);
  const youtubeOnly = TESTIMONIALS.filter(
    (t) => t.youtubeId && !CASE_STUDY_VIDEOS.some((c) => c.youtubeId === t.youtubeId),
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header ref={heroRef} className="relative overflow-hidden border-b border-hairline">
        <div className="relative z-20 flex h-11 items-center justify-center border-b border-hairline px-6 sm:h-12 sm:px-10">
          <img
            src={ASSETS.logo}
            alt="Subconscious Surgery"
            className="h-5 w-auto sm:h-6"
            width={480}
            height={96}
          />
        </div>
        <div className="relative flex flex-col pt-4 pb-5 sm:pt-5 sm:pb-6">
          <QuantumField collapsed={collapsed} targetRef={underlineRef} />
          <div className="relative z-10 flex w-full flex-col items-center text-center">
            <div className="flex w-full max-w-3xl flex-col items-center px-6 sm:px-10 lg:px-14">
              <Live
                id="hero.eyebrow"
                defaultValue="The Decision Audit | Subconscious Surgery™"
                as="p"
                className="hero-copy text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase"
              />

              <h1
                className="hero-copy mt-3 w-full font-sans text-[2.15rem] leading-[0.98] font-bold tracking-[-0.04em] uppercase sm:mt-3 sm:text-5xl lg:text-[3.1rem]"
                data-step="2"
              >
                <Live id="hero.line1" defaultValue="You already know the move." className="block" />
                <span ref={underlineRef} className="relative inline-block italic">
                  <Live
                    id="hero.line2"
                    defaultValue="Something in you keeps you from making it."
                    className="font-display font-semibold normal-case tracking-[-0.02em]"
                  />
                </span>
              </h1>

              <Live
                id="hero.body"
                defaultValue="A free 40-minute working session for high performers who need clarity."
                as="p"
                multiline
                className="hero-copy mt-3 w-full text-center text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg"
              />
            </div>

            <div className="hero-copy mt-4 flex w-full justify-center px-6 sm:mt-5 sm:px-10 lg:px-14" data-step="3">
              <YoutubeAutoplay
                youtubeId={HERO_VSL_ID}
                title="Decision Audit VSL"
                className="aspect-[9/16] h-[min(72svh,42rem)] w-auto max-w-full"
              />
            </div>

            <div className="hero-copy mt-4 flex w-full max-w-3xl flex-col items-center gap-3 px-6 sm:mt-5 sm:gap-4 sm:px-10 lg:px-14" data-step="4">
              <CtaButton onHover={collapse} />
              <Live
                id="hero.ctaNote"
                defaultValue="Make your next moves in alignment with your highest potential."
                as="p"
                multiline
                className="w-full max-w-md text-center text-sm text-muted-foreground"
              />
            </div>
          </div>
        </div>
        <div className="hero-copy border-t border-hairline px-6 py-5 sm:px-10 sm:py-6" data-step="5">
          <Live
            id="hero.trust"
            defaultValue="Founders and operators · 3+ year average client relationship · Not therapy. Not medical treatment."
            as="p"
            multiline
            className="mx-auto max-w-3xl text-center text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"
          />
        </div>
      </header>

      <section className="border-b border-hairline">
        <div className="min-h-[70vh] lg:min-h-[80vh]">
          <SurgeryPhases />
        </div>
      </section>

      <main>
        <section className="border-t border-hairline px-6 py-24 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Live
                id="problem.headline"
                defaultValue="What decision have you been sitting on for more than 30 days?"
                as="h2"
                multiline
                className="max-w-3xl font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] text-balance uppercase sm:text-5xl"
              />
            </Reveal>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <Reveal delay={80}>
                <div className="space-y-6 text-base leading-relaxed sm:text-lg">
                  <Live
                    id="problem.p1"
                    defaultValue="The hire you keep re-interviewing for. The price you keep not raising. The partner conversation you keep rescheduling. The offer you built and never sent."
                    as="p"
                    multiline
                  />
                  <Live
                    id="problem.p2"
                    defaultValue="You have done the analysis. You have asked smart people. You already know the move. Something in you keeps you from making it."
                    as="p"
                    multiline
                  />
                </div>
              </Reveal>
              <Reveal delay={160}>
                <Live
                  id="problem.aside"
                  defaultValue="The ceiling is not your strategy. It is not your discipline. It is not your circumstances. It is a belief, held below the level of consciousness, that you do not even know is running you."
                  as="p"
                  multiline
                  className="border-l border-hairline pl-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
                />
              </Reveal>
            </div>
            <Reveal delay={200}>
              <Live
                id="problem.punch"
                defaultValue="The maybe is not free. It is costing you months and money you have never written down.
Most founders do not need another plan. They need the next step named with enough precision that delay stops being the default."
                as="p"
                multiline
                className="mt-16 max-w-3xl font-display text-2xl leading-snug font-semibold italic text-accent sm:text-4xl"
              />
            </Reveal>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-24 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionLabel id="mechanism.label" defaultValue="The mechanism" />
              <Live
                id="mechanism.headline"
                defaultValue="What happens in the 40 minutes"
                as="h2"
                className="mt-4 font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl"
              />
            </Reveal>
            <div className="mt-16 grid gap-px bg-hairline sm:grid-cols-2">
              {MECHANISM.map((m, i) => (
                <Reveal key={m.n} delay={i * 100} className="h-full" variant="scale">
                  <article className="mechanism-card relative flex h-full flex-col overflow-hidden bg-card p-8">
                    <GhostNumeral value={m.n} />
                    <div className="relative flex h-full flex-col">
                      <span className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
                        {m.n}
                      </span>
                      <Live
                        id={`mechanism.${i}.title`}
                        defaultValue={m.title}
                        as="h3"
                        className="mt-5 font-sans text-xl font-bold tracking-[-0.02em] uppercase sm:text-2xl"
                      />
                      <Live
                        id={`mechanism.${i}.body`}
                        defaultValue={m.body}
                        as="p"
                        multiline
                        className="mt-4 text-sm leading-relaxed text-muted-foreground"
                      />
                      <Live
                        id={`mechanism.${i}.keep`}
                        defaultValue={m.keep}
                        as="p"
                        className="mt-auto border-t border-hairline pt-4 text-xs font-semibold tracking-[0.08em] text-foreground uppercase"
                      />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={80}>
              <Live
                id="mechanism.close"
                defaultValue="This session runs real work on one decision so you can move."
                as="p"
                className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              />
            </Reveal>
            <CtaBlock
              microcopyId="mechanism.ctaNote"
              microcopyDefault="Make your next moves in alignment with your highest potential."
            />
            <ProcessDiagram />
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-24 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Live
                id="outcomes.headline"
                defaultValue="You leave with exact clarity on what you should do next"
                as="h2"
                multiline
                className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] text-balance uppercase sm:text-5xl"
              />
              <Live
                id="outcomes.intro"
                defaultValue="These are examples of what people walked away with."
                as="p"
                className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              />
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {CASE_STUDY_VIDEOS.map((v, i) => (
                <Reveal key={v.youtubeId} delay={i * 80} variant="scale">
                  <div className="overflow-hidden border border-hairline bg-card">
                    <LocalVideoPreview
                      src={v.src}
                      poster={v.poster}
                      title={`${get(`case.${i}.name`, v.name)} - ${get(`case.${i}.role`, v.role)}`}
                    />
                    <div className="flex items-center justify-between gap-3 border-t border-hairline px-4 py-3">
                      <div className="min-w-0">
                        <Live
                          id={`case.${i}.name`}
                          defaultValue={v.name}
                          className="block truncate text-sm font-semibold"
                        />
                        <Live
                          id={`case.${i}.role`}
                          defaultValue={v.role}
                          className="block truncate text-xs text-muted-foreground"
                        />
                      </div>
                      <a
                        href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="shrink-0 text-[10px] font-bold tracking-[0.12em] text-accent uppercase hover:text-accent-soft"
                      >
                        YouTube
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {youtubeOnly.map((t, i) => (
                <Reveal key={`yt-${t.youtubeId}-${i}`} delay={(i % 3) * 70} variant="scale">
                  <div className="overflow-hidden border border-hairline bg-card">
                    <YoutubePreview
                      youtubeId={t.youtubeId!}
                      title={get(`yt.${i}.name`, t.name)}
                      {...(t.poster ? { poster: t.poster } : {})}
                    />
                    <blockquote className="border-t border-hairline p-5 font-display text-base leading-snug">
                      &ldquo;
                      <Live
                        id={`yt.${i}.quote`}
                        defaultValue={t.quote}
                        multiline
                        className="inline"
                      />
                      &rdquo;
                    </blockquote>
                    <div className="flex items-center justify-between gap-3 px-5 pb-5">
                      <div className="min-w-0">
                        <Live
                          id={`yt.${i}.name`}
                          defaultValue={t.name}
                          className="block truncate text-sm font-semibold"
                        />
                        <Live
                          id={`yt.${i}.role`}
                          defaultValue={t.role}
                          className="block truncate text-xs text-muted-foreground"
                        />
                      </div>
                      <span className="shrink-0 border border-accent px-2 py-1 text-[10px] font-bold tracking-[0.14em] text-accent uppercase">
                        YouTube
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid gap-px bg-hairline sm:grid-cols-2">
              {verified.map((t, i) => (
                <Reveal key={`${t.name}-${i}`} delay={(i % 4) * 70} variant="scale">
                  <figure className="testimonial-card flex h-full flex-col justify-between gap-8 bg-card p-8">
                    <blockquote className="font-display text-lg leading-snug sm:text-xl">
                      &ldquo;
                      <Live
                        id={`verified.${i}.quote`}
                        defaultValue={t.quote}
                        multiline
                        className="inline"
                      />
                      &rdquo;
                    </blockquote>
                    <figcaption className="flex items-center gap-4 border-t border-hairline pt-4">
                      {t.avatar ? (
                        <img
                          src={t.avatar}
                          alt=""
                          className="h-12 w-12 shrink-0 rounded-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                      <div className="min-w-0 flex-1">
                        <Live
                          id={`verified.${i}.name`}
                          defaultValue={t.name}
                          className="block text-sm font-semibold"
                        />
                        <Live
                          id={`verified.${i}.role`}
                          defaultValue={t.role}
                          className="block text-sm text-muted-foreground"
                        />
                      </div>
                      <span className="shrink-0 border border-accent px-2 py-1 text-[10px] font-bold tracking-[0.14em] text-accent uppercase">
                        Verified
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-24 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Live
                id="fit.headline"
                defaultValue="This is for a specific kind of person"
                as="h2"
                className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl"
              />
            </Reveal>
            <div className="mt-14 grid gap-px bg-hairline md:grid-cols-2">
              <Reveal>
                <div className="h-full bg-card p-8">
                  <SectionLabel id="fit.forLabel" defaultValue="For" />
                  <ul className="mt-6 space-y-5 text-base leading-relaxed">
                    <li>
                      <Live
                        id="fit.for1"
                        defaultValue="Founders, executives and operators with a real decision on the table."
                        multiline
                      />
                    </li>
                    <li>
                      <Live
                        id="fit.for2"
                        defaultValue="People who have done the mindset work and hit the same wall anyway."
                        multiline
                      />
                    </li>
                    <li>
                      <Live
                        id="fit.for3"
                        defaultValue="Sceptics, genuinely. The method was built to be tested, not believed."
                        multiline
                      />
                    </li>
                    <li>
                      <Live
                        id="fit.for4"
                        defaultValue="People willing to leave with one next step they will actually take."
                        multiline
                      />
                    </li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="h-full bg-card p-8">
                  <SectionLabel id="fit.notLabel" defaultValue="Not for" />
                  <ul className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
                    <li>
                      <Live id="fit.not1" defaultValue="Anyone looking for a miracle or a guru." />
                    </li>
                    <li>
                      <Live
                        id="fit.not2"
                        defaultValue="Anyone in acute crisis needing clinical care (not therapy or medical treatment)."
                        multiline
                      />
                    </li>
                    <li>
                      <Live
                        id="fit.not3"
                        defaultValue="Anyone unwilling to put one real decision on the table."
                        multiline
                      />
                    </li>
                    <li>
                      <Live
                        id="fit.not4"
                        defaultValue="Anyone hunting for another multi-month plan to hide inside"
                        multiline
                      />
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <Live
                id="fit.note"
                defaultValue="If you want someone to just tell you what to do, this isn't that."
                as="p"
                multiline
                className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground"
              />
            </Reveal>
            <Reveal className="mt-10">
              <CtaButton />
            </Reveal>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-24 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:gap-16">
              <Reveal>
                <div className="overflow-hidden">
                  <img
                    src={ASSETS.portrait}
                    alt="Adrian Taffinder, the Subconscious Surgeon"
                    loading="lazy"
                    className="w-full grayscale"
                  />
                </div>
              </Reveal>
              <Reveal delay={100}>
                <SectionLabel id="about.label" defaultValue="About" />
                <Live
                  id="about.headline"
                  defaultValue="The Subconscious Surgeon"
                  as="h2"
                  className="mt-4 font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl"
                />
                <Live
                  id="about.body"
                  defaultValue="Adrian Taffinder is not a therapist, not a guru, not a hype coach.
He is a precision practitioner. Language is his instrument.
Decades of practice. Average client relationship: more than three years.
Based in Ubud. Works worldwide."
                  as="p"
                  multiline
                  className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg"
                />
                <Live
                  id="about.punch"
                  defaultValue="Not managed. Not reframed. Changed."
                  as="p"
                  className="mt-8 font-display text-2xl font-semibold italic text-accent sm:text-3xl"
                />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-24 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Live
                id="faq.headline"
                defaultValue="Questions"
                as="h2"
                className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl"
              />
            </Reveal>
            <Reveal delay={80} className="mt-10" variant="fade">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((f, i) => (
                  <AccordionItem key={`faq-${i}`} value={`faq-${i}`} className="border-hairline">
                    <AccordionTrigger className="faq-trigger py-6 text-left font-display text-lg font-medium transition-colors hover:text-accent hover:no-underline sm:text-xl">
                      <Live id={`faq.${i}.q`} defaultValue={f.q} className="text-left" />
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                      <Live id={`faq.${i}.a`} defaultValue={f.a} multiline as="p" />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
            <CtaBlock
              microcopyId="faq.ctaNote"
              microcopyDefault="Make your next moves in alignment with your highest potential."
            />
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-24 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <Live
                id="booking.headline"
                defaultValue="Leave knowing exactly what to do next."
                as="h2"
                multiline
                className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] text-balance uppercase sm:text-5xl"
              />
              <Live
                id="booking.body"
                defaultValue="Ten audits this month.
One decision. The cost. The belief. The baseline. The next step.
All written down. Yours to keep."
                as="p"
                multiline
                className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              />
              <div className="mt-10 flex flex-col items-start gap-4">
                <CtaButton />
                <Live
                  id="booking.ctaNote"
                  defaultValue="Make your next moves in alignment with your highest potential."
                  as="p"
                  multiline
                  className="max-w-md text-sm text-muted-foreground"
                />
              </div>
            </Reveal>
            <Reveal delay={120} className="mt-12">
              <CalendlyEmbed />
            </Reveal>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-24 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Live
                id="ashta.headline"
                defaultValue="Where some people take the work next"
                as="h2"
                className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl"
              />
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <Live
                  id="ashta.p1"
                  defaultValue="Some people only need the next step named.
Others want a place to practise with peers who hold the same standard."
                  as="p"
                  multiline
                />
                <Live
                  id="ashta.p2"
                  defaultValue="The Ashta Project is a peer community in carefully curated groups of eight.
If the audit shows that is the right next environment, Adrian will say so.
If deeper private work is the better fit, he will say that instead."
                  as="p"
                  multiline
                />
              </div>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-10 text-sm text-muted-foreground">
                <a
                  href="https://www.theashtaproject.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-hairline underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  <Live id="ashta.link" defaultValue="theashtaproject.com" className="inline" />
                </a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline px-6 pt-16 pb-32 sm:px-10 sm:pb-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <div className="flex flex-col gap-6 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <img
              src={ASSETS.logo}
              alt="Subconscious Surgery"
              loading="lazy"
              className="h-7 w-auto sm:h-8"
              width={480}
              height={96}
            />
            <Live id="footer.location" defaultValue="Sayan, Ubud, Bali" className="inline" />
            <a className="hover:text-accent" href="mailto:subconscioussurgery@gmail.com">
              <Live
                id="footer.email"
                defaultValue="subconscioussurgery@gmail.com"
                className="inline"
              />
            </a>
            <a className="hover:text-accent" href="tel:+447572431214">
              <Live id="footer.phone" defaultValue="+44 7572 431214" className="inline" />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.name}
                className="social-icon opacity-60"
              >
                <img src={s.icon} alt={s.name} loading="lazy" className="h-5 w-5" />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline pt-6 text-sm text-muted-foreground">
            <a
              className="hover:text-accent"
              href="https://www.subconscioussurgery.com/legal/privacy"
            >
              <Live id="footer.privacy" defaultValue="Privacy Policy" className="inline" />
            </a>
            <a className="hover:text-accent" href="https://www.subconscioussurgery.com/legal/terms">
              <Live id="footer.terms" defaultValue="Terms of Use" className="inline" />
            </a>
            <a
              className="hover:text-accent"
              href="https://www.subconscioussurgery.com/legal/health"
            >
              <Live id="footer.health" defaultValue="Health & Wellbeing" className="inline" />
            </a>
          </div>
        </div>
      </footer>

      <div
        data-visible={stickyVisible}
        className="sticky-cta fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-background/95 p-3 backdrop-blur sm:hidden"
      >
        <CtaButton className="w-full" onHover={collapse} />
      </div>
    </div>
  );
}
