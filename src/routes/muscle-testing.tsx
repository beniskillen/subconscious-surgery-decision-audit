import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Compass, Orbit, Users, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LocalVideoPreview, YoutubePreview } from "@/components/decision-audit/VideoPreview";
import { CASE_STUDY_VIDEOS, TESTIMONIALS } from "@/components/decision-audit/testimonials";
import { asset } from "@/lib/asset";
import { pageUtms, withUtms } from "@/lib/page-utm";

const PAGE_URL = "https://accelerator.subconscioussurgery.com/";
const PAGE_TITLE = "Find out what sits beneath the surface | Subconscious Surgery";
const PAGE_DESCRIPTION =
  "Learn a practical technique to unlock your Subconscious mind and get to the root of the top limiting belief affecting high performers.";
const PAGE_IMAGE = "https://accelerator.subconscioussurgery.com/brand/human-energy-spectrum.png";

const CHECKOUT_URL = "https://learn.subconscioussurgery.com/offers/dw3hs5SV/checkout";
const CAMPAIGN = "moneyblocks-intro-2026-10";

const COURSE_NAME = "Learning the basics of muscle testing";
const CTA_LABEL = "Start the free course";
const OFFER_LINE =
  "Free during this introductory release. No payment card required. The advanced programme and paid Mastermind are separate.";

const PRIVACY_HREF = "https://www.subconscioussurgery.com/legal/privacy";
const TERMS_HREF = "https://www.subconscioussurgery.com/legal/terms";
const HEALTH_HREF = "https://www.subconscioussurgery.com/legal/health";
const SUPPORT_EMAIL = "subconscioussurgery@gmail.com";

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Orbit,
    title: "Self-assessment",
    body: "A practical self-assessment method that uses principles from quantum physics, so you can conduct Subconscious Surgery on yourself and get to the root of your limiting beliefs.",
  },
  {
    icon: BookOpen,
    title: "Money blocks course",
    body: "A complete introductory course with over 8 full lessons, applying Subconscious Surgery to the biggest limiting belief most high performers have: money blocks.",
  },
  {
    icon: Compass,
    title: "Decision compass",
    body: "A decision framework and testing method that gives you a compass for identifying the beliefs holding you back.",
  },
  {
    icon: Users,
    title: "Relationship testing",
    body: "Testing frameworks you can apply to your relationships, to help resolve issues with loved ones without an emotionally charged conversation.",
  },
];

const STEPS = [
  { n: "01", title: "Get access", body: "Start the free course. The next screen asks for your email." },
  { n: "02", title: "Follow the lessons", body: "Work through what a money block is, the state you decide from, and the muscle-testing practice." },
  { n: "03", title: "Note what sits beneath", body: "Write down what sits beneath the surface for you." },
];

const CLIENT_QUOTES = TESTIMONIALS.filter((item) => !item.youtubeId);
const VIDEO_QUOTES = TESTIMONIALS.filter(
  (item) => item.youtubeId && !CASE_STUDY_VIDEOS.some((video) => video.youtubeId === item.youtubeId),
);

const ABOUT_HREF = "https://www.subconscioussurgery.com/#about";
const ASHTA_HREF = "https://www.theashtaproject.com/";

const linkClass = "underline decoration-hairline underline-offset-4 hover:text-accent";

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Who is Adrian?",
    a: (
      <>
        Adrian Taffinder is the Subconscious Surgeon. He has spent 20 years on one question: what actually
        produces a change in behaviour. Not more strategy. Not more discipline. A precise change at the level
        of belief. He is not a therapist, and he does not offer life advice. Language is his instrument. He
        works with founders and high performers who have already tried the conscious tools.{" "}
        <a className={linkClass} href={ABOUT_HREF}>
          More on Adrian
        </a>
        .
      </>
    ),
  },
  {
    q: "What is this?",
    a: "The Subconscious Accelerator. A free introduction that takes you beneath the surface of the way you decide, starting with the money block: the most limiting belief most high performers hold. You learn a self-assessment method and a compass for the beliefs holding you back. The advanced programme and the paid Mastermind are not included.",
  },
  {
    q: "Is this scientific?",
    a: "The practice is kinesiology, a self-assessment method Adrian teaches from principles studied in physics. You use it on yourself to get to the root of a limiting belief. It is not a medical test, and a muscle-testing response is not proof that a decision is right or wrong. The energy spectrum is the framework he teaches from, not established science. The course shows you the method, and what it can and cannot tell you.",
  },
  {
    q: "Why is it free?",
    a: (
      <>
        Adrian is building the largest experiment in self-development ever conducted, and taking 20 years of
        this work to a group of high performers in 2027. The course is free so you can begin before that. No
        payment card. No call. If you want the wider project, start with{" "}
        <a className={linkClass} href={ASHTA_HREF}>
          the Ashta Project
        </a>
        .
      </>
    ),
  },
  {
    q: "What's the catch?",
    a: "Nothing is charged to start. The next screen asks for your email so you can have access. Joining the email list is a separate choice. If you want to go further, any paid option is described, with the price, before you decide.",
  },
  {
    q: "How does Adrian's private work differ?",
    a: "In private work he uses language as the instrument. He listens to how you describe a situation, finds the belief under it, and works at that root. This course is the part you can do yourself, applied first to money. Private clients, the Mastermind, and the 2027 group are separate. You do not book a call to start.",
  },
];

export const Route = createFileRoute("/muscle-testing")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: PAGE_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
      { name: "twitter:image", content: PAGE_IMAGE },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: MuscleTestingPage,
});

function checkoutHref(): string {
  const utms = pageUtms();
  if (!utms.utm_campaign) utms.utm_campaign = CAMPAIGN;
  return withUtms(CHECKOUT_URL, utms);
}

function useCheckoutHref() {
  const [href, setHref] = useState(CHECKOUT_URL);
  useEffect(() => {
    setHref(checkoutHref());
  }, []);
  return href;
}

function CtaLink({ href, className = "" }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      className={`cta-button inline-flex items-center justify-center bg-accent px-8 py-4 text-center text-sm font-bold tracking-wide text-accent-foreground uppercase hover:bg-accent-soft focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${className}`}
    >
      {CTA_LABEL}
    </a>
  );
}

function ConsentNote() {
  return (
    <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
      The next screen asks for your email so you can access {COURSE_NAME}. The email-list option there is
      separate from course access. No payment card is taken.{" "}
      <a className="underline decoration-hairline underline-offset-4 hover:text-accent" href={PRIVACY_HREF}>
        Privacy Policy
      </a>
      .
    </p>
  );
}

function MuscleTestingPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const href = useCheckoutHref();
  const stickyVisible = useHideNearEnd(heroRef);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex h-11 items-center justify-center border-b border-hairline px-6 sm:h-12 sm:px-10">
        <span className="brand-logo-wrap brand-logo-wrap--header">
          <img
            src={asset("brand/logo.png")}
            alt="Subconscious Surgery"
            width={4096}
            height={804}
            decoding="async"
            className="brand-logo"
          />
        </span>
      </div>

      <header ref={heroRef} className="px-6 pt-7 pb-8 sm:px-10 sm:pt-10 sm:pb-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="font-sans text-[2.05rem] leading-[0.98] font-bold tracking-[-0.04em] uppercase sm:text-5xl lg:text-[3.15rem]">
            Find out what sits beneath the surface.
          </h1>
        </div>

        <figure className="mx-auto mt-5 w-full max-w-3xl sm:mt-6">
          <img
            src={asset("brand/hero-course.jpg")}
            alt="Learning the basics of muscle testing, shown on a laptop, tablet and phone beside the Subconscious Surgery course box"
            width={1024}
            height={532}
            className="w-full"
          />
        </figure>

        <div className="mx-auto mt-5 flex max-w-xl flex-col items-center text-center sm:mt-6">
          <CtaLink href={href} />
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Learn a practical technique to unlock your Subconscious mind and get to the root of
            the top limiting belief affecting high performers.
          </p>
        </div>
      </header>

      <main>
        <section className="border-t border-hairline px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">What's included</p>
            <h2 className="mt-3 max-w-xl font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl">
              What you get
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <article key={feature.title} className="border border-hairline p-6 sm:p-8">
                  <div className="flex h-11 w-11 items-center justify-center bg-accent/10 text-accent">
                    <feature.icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 font-sans text-sm font-bold tracking-wide uppercase">{feature.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl">
              That feeling you can't quite name
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Have you ever felt it? A low-grade anxiety that sits with you through the day. You can't put
                your finger on why certain emotions come up seemingly out of nowhere. You toss and turn at
                night and can't get back to sleep, while your mind runs through everything you just want to
                rest from.
              </p>
              <p>
                That is the state most people actually operate from. Not a crisis. A low hum under the day, and
                under the next decision.
              </p>
              <p>
                Those things aren't random. They're signals. Clues. And what sits beneath the surface is often
                what stops you from hearing them.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-4xl">
                What's holding most successful people back
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  Subconscious Surgery starts with a money block because that is the most common presentation
                  in Adrian's work. Across 20 years with high performers, the story at the door changes. The
                  belief under it often does not. It arrives as a strategy problem. Underneath, it is a belief
                  about money they did not choose. Money is the layer that costs the most, and the one that
                  shows up first. So this is where the work begins.
                </p>
                <p>
                  A money block is a belief about money that sits in your subconscious, the part of your mind
                  that runs automatically without you choosing it. Most of these beliefs form early in life, and
                  they quietly shape decisions every day: the price you don't charge, the opportunity you pass
                  on, the decision you delay for another quarter.
                </p>
                <p>
                  And it goes further than thoughts. When a real money decision lands, your body doesn't treat
                  it like a maths problem. It treats it like a threat. Your heart rate lifts, your chest
                  tightens, and your body switches into the same alarm state it uses for physical danger.
                </p>
                <p>
                  That alarm is the anxiety you already live with, turned up. In that state, you decide from
                  stress, not clarity. You either force the decision or avoid it. Neither comes from a settled
                  place.
                </p>
              </div>
            </div>
            <aside className="border border-hairline">
              <img
                src={asset("brand/adrian-portrait.png")}
                alt="Adrian Taffinder, the Subconscious Surgeon"
                width={837}
                height={1049}
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="space-y-4 p-6 sm:p-8">
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Adrian Taffinder</p>
                  <p className="mt-2 font-display text-2xl font-semibold italic">The Subconscious Surgeon</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Adrian has spent 20 years on one question: what actually produces a change in behaviour. Not
                  more strategy. Not more discipline. A precise change at the level of belief. He is not a
                  therapist, and he does not offer life advice. Language is his instrument. He works with
                  founders and high performers who have already tried the conscious tools.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  This course is free because that work is moving to a group of high performers in 2027. Twenty
                  years of practice, opened to people who are ready to see what sits beneath the surface,
                  starting with the money block.
                </p>
                <a
                  className="inline-block text-sm underline decoration-hairline underline-offset-4 hover:text-accent"
                  href="https://www.subconscioussurgery.com/#about"
                >
                  More on Adrian
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl">
              The reality of belief
              <span className="mt-2 block font-display text-[0.85em] font-semibold tracking-[-0.02em] normal-case italic">
                The energy spectrum
              </span>
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                David Hawkins spent decades mapping human emotion onto a single scale, called the Map of
                Consciousness. Shame, guilt, fear and anger sit at the bottom. Courage, love and peace sit at
                the top. His finding was simple: the state you live in day to day decides the quality of
                everything you do from it.
              </p>
              <p>
                The low-grade anxiety, the tight chest, the decision you delay: that is the lower end of the
                scale, lived as a normal Tuesday. Money blocks keep you operating from there, no matter how
                well the business looks on paper.
              </p>
              <p>
                The work is learning to sit higher, in ease and alignment, where decisions come from clarity
                instead of survival.
              </p>
            </div>
          </div>
          <figure className="mx-auto mt-12 max-w-6xl">
            <div className="overflow-x-auto border border-hairline bg-background">
              <img
                src={asset("brand/human-energy-spectrum.png")}
                alt="Spectrum of Human Consciousness, from shame through courage to enlightenment"
                width={2500}
                height={920}
                className="h-auto w-[920px] max-w-none sm:w-full"
              />
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The energy spectrum, as the framework Adrian teaches from. Not established science.
            </figcaption>
          </figure>
        </section>

        <section className="border-t border-hairline px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl">
              How you actually see what's underneath
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                So how do you look at something your conscious mind keeps hidden? That's what muscle testing is
                for.
              </p>
              <p>
                Muscle testing is a simple physical practice. You make a statement, apply light pressure, and
                your body responds differently depending on whether the statement sits true for you underneath.
                It's not about the muscle. It's about the clarity it gives you.
              </p>
              <p>
                Your thinking mind argues, rationalises and defends. It will explain away the same pattern for
                years, including the anxiety you have learned to work through. Muscle testing lets you ask
                what's underneath and get a signal back, without the commentary. Used consistently, it becomes
                a compass: a way to check what sits beneath the surface before you make the decisions that
                matter.
              </p>
              <p>
                That's what you're actually getting in this course. Not a technique for its own sake. A compass
                you carry into every decision moving forward.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl">
              How it works
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Get access, follow the lessons, then note what sits beneath the surface for you.
            </p>
            <ol className="mt-10 grid gap-4 sm:grid-cols-3">
              {STEPS.map((step) => (
                <li key={step.n} className="border border-hairline p-5">
                  <p className="font-display text-2xl font-semibold text-accent italic">{step.n}</p>
                  <h3 className="mt-3 font-sans text-sm font-bold tracking-wide uppercase">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl">
              Limits
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>Educational and reflective content, not medical treatment or financial advice.</p>
              <p>
                The energy spectrum is presented as the framework Adrian teaches from, not as established
                science. Muscle-testing responses are not an objective decision-making test. Use evidence and
                appropriate professional advice for consequential decisions.
              </p>
              <p>
                <a
                  className="underline decoration-hairline underline-offset-4 hover:text-accent"
                  href={HEALTH_HREF}
                >
                  Health and wellbeing notice
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl">
              FAQ's
            </h2>
            <Accordion type="single" collapsible className="mt-8 w-full">
              {FAQS.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`} className="border-hairline">
                  <AccordionTrigger className="py-6 text-left font-display text-lg font-medium hover:text-accent hover:no-underline sm:text-xl">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4">
            <h2 className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl">
              Start with what sits beneath the surface.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{OFFER_LINE}</p>
            <CtaLink href={href} className="mt-4" />
            <ConsentNote />
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl">
              What clients say
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              From Adrian's private work. Not results of this introductory course.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {CASE_STUDY_VIDEOS.map((video) => (
                <div key={video.youtubeId} className="overflow-hidden border border-hairline bg-card">
                  <LocalVideoPreview
                    src={video.src}
                    poster={video.poster}
                    title={`${video.name}, ${video.role}`}
                  />
                  <div className="flex items-center justify-between gap-3 border-t border-hairline px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{video.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{video.role}</p>
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="shrink-0 text-[10px] font-bold tracking-[0.12em] text-accent uppercase hover:text-accent-soft"
                    >
                      YouTube
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {VIDEO_QUOTES.map((item) => (
                <div key={item.youtubeId} className="overflow-hidden border border-hairline bg-card">
                  <YoutubePreview
                    youtubeId={item.youtubeId!}
                    title={item.name}
                    {...(item.poster ? { poster: item.poster } : {})}
                  />
                  <blockquote className="border-t border-hairline p-5 font-display text-base leading-snug">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <div className="px-5 pb-5">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-px bg-hairline sm:grid-cols-2">
              {CLIENT_QUOTES.map((item) => (
                <figure key={item.name} className="testimonial-card flex h-full flex-col justify-between gap-8 bg-card p-8">
                  <blockquote className="font-display text-lg leading-snug sm:text-xl">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-4 border-t border-hairline pt-4">
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt=""
                        width={48}
                        height={48}
                        className="h-12 w-12 shrink-0 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="continue" className="border-t border-hairline px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4">
            <h2 className="max-w-2xl font-sans text-3xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-5xl">
              You've come this far. Why not take a chance at harnessing your full potential.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{OFFER_LINE}</p>
            <CtaLink href={href} className="mt-4" />
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline px-6 pt-12 pb-[calc(8rem+env(safe-area-inset-bottom))] sm:px-10 sm:pb-12">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 text-sm text-muted-foreground">
          <span className="brand-logo-wrap brand-logo-wrap--footer">
            <img
              src={asset("brand/logo.png")}
              alt="Subconscious Surgery"
              width={4096}
              height={804}
              decoding="async"
              loading="lazy"
              className="brand-logo"
            />
          </span>
          <a className="hover:text-accent" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          <p>Questions about access go to that address.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline pt-6">
            <a className="hover:text-accent" href={PRIVACY_HREF}>
              Privacy Policy
            </a>
            <a className="hover:text-accent" href={TERMS_HREF}>
              Terms of Use
            </a>
            <a className="hover:text-accent" href={HEALTH_HREF}>
              Health and wellbeing
            </a>
          </div>
        </div>
      </footer>

      <div
        data-visible={stickyVisible}
        className="sticky-cta fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden"
      >
        <CtaLink href={href} className="w-full" />
      </div>
    </div>
  );
}

function useHideNearEnd(heroRef: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const pastHero = window.scrollY > hero.offsetTop + hero.offsetHeight * 0.72;
      const end = document.getElementById("continue");
      const rect = end?.getBoundingClientRect();
      const endFillsView = rect ? rect.top < window.innerHeight * 0.72 : false;
      setVisible(pastHero && !endFillsView);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroRef]);

  return visible;
}
