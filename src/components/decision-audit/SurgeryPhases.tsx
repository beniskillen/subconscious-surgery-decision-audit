import { useEffect, useState } from "react";
import { EditableText } from "./EditableText";
import { Live, useLiveCopy } from "./LiveCopy";

type PhaseVisualKind = "locate" | "extract" | "prescribe" | "activate";

const PHASE_META: Array<{ n: string; visual: PhaseVisualKind; defaults: {
  title: string;
  short: string;
  body: string;
  caption: string;
} }> = [
  {
    n: "01",
    visual: "locate",
    defaults: {
      title: "Name the decision",
      short: "Define the decision",
      body: "Define the specific business decision under review.",
      caption: "THE DECISION",
    },
  },
  {
    n: "02",
    visual: "extract",
    defaults: {
      title: "Estimate the cost",
      short: "Price the delay",
      body: "Document the time, money or opportunity affected by continued delay.",
      caption: "COST OF DELAY",
    },
  },
  {
    n: "03",
    visual: "prescribe",
    defaults: {
      title: "Document the assumptions",
      short: "Write the reasoning",
      body: "Record the participant's current reasoning and working assumptions in their own words.",
      caption: "ASSUMPTIONS",
    },
  },
  {
    n: "04",
    visual: "activate",
    defaults: {
      title: "Define the next step",
      short: "Choose one action",
      body: "Choose one practical action and when it will be taken.",
      caption: "NEXT ACTION",
    },
  },
];

function PhaseVisual({
  kind,
  active,
  captionId,
  captionDefault,
  onFocusEdit,
}: {
  kind: PhaseVisualKind;
  active: boolean;
  captionId: string;
  captionDefault: string;
  onFocusEdit?: () => void;
}) {
  const { get, set } = useLiveCopy();
  const accent = "rgb(214,61,119)";
  const ink = "rgba(255,255,255,0.18)";
  const bright = "rgba(255,255,255,0.92)";

  return (
    <div className="relative">
      <svg viewBox="0 0 320 200" className="h-auto w-full" role="img" aria-hidden>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const r = 54 + (i % 3) * 8;
          const x = 160 + Math.cos(a) * r;
          const y = 100 + Math.sin(a) * r * 0.72;
          const lit =
            (kind === "locate" && active) ||
            (kind === "extract" && i % 3 !== 0 && active) ||
            (kind === "prescribe" && i % 2 === 0 && active) ||
            (kind === "activate" && active);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={lit ? 3 : 2}
              fill={lit ? accent : ink}
              opacity={active ? 1 : 0.45}
              style={{ transition: "fill 400ms ease, opacity 400ms ease" }}
            />
          );
        })}

        <circle
          cx="160"
          cy="100"
          r={kind === "extract" && active ? 18 : 28}
          fill="none"
          stroke={kind === "extract" && active ? accent : ink}
          strokeWidth="1.5"
          style={{ transition: "r 500ms cubic-bezier(0.16,1,0.3,1), stroke 400ms ease" }}
        />

        {kind === "locate" ? (
          <>
            <line x1="160" y1="32" x2="160" y2="168" stroke={accent} strokeWidth="1.5" opacity={active ? 0.9 : 0.35} />
            <line x1="96" y1="100" x2="224" y2="100" stroke={accent} strokeWidth="1.5" opacity={active ? 0.9 : 0.35} />
            <circle cx="160" cy="100" r="6" fill={accent} opacity={active ? 1 : 0.4} />
          </>
        ) : null}

        {kind === "extract" ? (
          <>
            <path d="M118 100 H202" stroke={accent} strokeWidth="2" strokeDasharray={active ? "0" : "4 4"} />
            <path
              d={active ? "M202 100 L214 88 M202 100 L214 112" : "M202 100 L208 94 M202 100 L208 106"}
              stroke={accent}
              strokeWidth="2"
              fill="none"
            />
          </>
        ) : null}

        {kind === "prescribe" ? (
          <>
            <rect x="118" y="68" width="84" height="64" rx="2" fill="none" stroke={accent} strokeWidth="1.5" opacity={active ? 1 : 0.4} />
            <line x1="132" y1="88" x2="188" y2="88" stroke={bright} strokeWidth="1.2" opacity={0.7} />
            <line x1="132" y1="102" x2="176" y2="102" stroke={bright} strokeWidth="1.2" opacity={0.45} />
            <line x1="132" y1="116" x2="184" y2="116" stroke={bright} strokeWidth="1.2" opacity={0.35} />
          </>
        ) : null}

        {kind === "activate" ? (
          <>
            <path d="M110 130 C130 60, 190 60, 210 130" fill="none" stroke={accent} strokeWidth="2" opacity={active ? 1 : 0.35} />
            <circle cx="110" cy="130" r="4" fill={accent} />
            <circle cx="160" cy="68" r="4" fill={bright} opacity={0.8} />
            <circle cx="210" cy="130" r="4" fill={accent} />
          </>
        ) : null}
      </svg>
      <EditableText
        value={get(captionId, captionDefault)}
        onChange={(next) => set(captionId, next)}
        {...(onFocusEdit ? { onFocusEdit } : {})}
        dark
        aria-label={captionId}
        className="mt-1 block w-full text-center text-[10px] font-semibold tracking-[0.2em] text-background/90 uppercase"
      />
    </div>
  );
}

/**
 * Hero-right interactive explainer. Copy is click-to-edit via LiveCopyProvider.
 */
export function SurgeryPhases() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!auto || editing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % PHASE_META.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [auto, editing]);

  const pauseForEdit = () => {
    setEditing(true);
    setAuto(false);
  };

  const phase = PHASE_META[active] ?? PHASE_META[0]!;

  return (
    <div className="relative flex h-full min-h-[52vh] flex-col bg-foreground text-background lg:min-h-full">
      <div className="relative z-10 flex flex-1 flex-col justify-between gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        <div>
          <Live
            id="phases.eyebrow"
            defaultValue="How the Decision Audit works"
            dark
            onFocusEdit={pauseForEdit}
            className="block text-[11px] font-semibold tracking-[0.2em] text-background/50 uppercase"
          />
          <h2 className="mt-3 max-w-md font-sans text-2xl leading-[1.05] font-bold tracking-[-0.03em] uppercase sm:text-3xl">
            <Live
              id="phases.headline"
              defaultValue="Four steps."
              dark
              onFocusEdit={pauseForEdit}
              className="inline"
            />
            <Live
              id="phases.headlineAccent"
              defaultValue="One documented decision."
              dark
              onFocusEdit={pauseForEdit}
              className="mt-1 block font-display text-[1.35em] font-semibold tracking-[-0.02em] text-accent italic normal-case"
            />
          </h2>
          <Live
            id="phases.intro"
            defaultValue="A structured working session. Document the decision, estimate the cost of delay, examine the assumptions involved and leave with one practical next action."
            as="p"
            multiline
            dark
            onFocusEdit={pauseForEdit}
            className="mt-4 max-w-md text-sm leading-relaxed text-background/65"
          />
        </div>

        <div className="mx-auto w-full max-w-md">
          <PhaseVisual
            kind={phase.visual}
            active
            captionId={`phases.${active}.caption`}
            captionDefault={phase.defaults.caption}
            onFocusEdit={pauseForEdit}
          />
        </div>

        <div>
          <ol className="grid grid-cols-4 gap-2 border-b border-background/15 pb-4">
            {PHASE_META.map((p, i) => {
              const on = i === active;
              return (
                <li key={p.n}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setActive(i);
                      setAuto(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(i);
                        setAuto(false);
                      }
                    }}
                    className={`group w-full cursor-pointer text-left transition ${on ? "opacity-100" : "opacity-45 hover:opacity-80"}`}
                    aria-current={on ? "step" : undefined}
                  >
                    <span
                      className={`block font-mono text-[10px] tracking-[0.16em] uppercase ${on ? "text-accent" : "text-background/55"}`}
                    >
                      {p.n}
                    </span>
                    <Live
                      id={`phases.${i}.title`}
                      defaultValue={p.defaults.title}
                      dark
                      onFocusEdit={() => {
                        setActive(i);
                        pauseForEdit();
                      }}
                      className={`mt-1 block text-[11px] font-bold tracking-[0.06em] uppercase sm:text-xs ${on ? "text-background" : "text-background/70"}`}
                    />
                    <span
                      className="mt-2 block h-0.5 w-full origin-left bg-accent transition-transform duration-500"
                      style={{ transform: on ? "scaleX(1)" : "scaleX(0)" }}
                    />
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="pt-5">
            <Live
              id={`phases.${active}.short`}
              defaultValue={phase.defaults.short}
              dark
              onFocusEdit={pauseForEdit}
              className="block text-xs font-semibold tracking-[0.14em] text-accent uppercase"
            />
            <Live
              id={`phases.${active}.body`}
              defaultValue={phase.defaults.body}
              as="p"
              multiline
              dark
              onFocusEdit={pauseForEdit}
              className="mt-3 max-w-lg text-sm leading-relaxed text-background/80 sm:text-[15px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
