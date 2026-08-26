import { useEffect, useState } from "react";
import { Live } from "./LiveCopy";
import { useReveal } from "./useReveal";

const STEPS = [
  {
    id: "decision",
    n: "01",
    titleDefault: "Name the decision",
    detailDefault: "The one stalled move on the table.",
  },
  {
    id: "cost",
    n: "02",
    titleDefault: "Name the stall",
    detailDefault: "Your own number on what delay has already cost.",
  },
  {
    id: "belief",
    n: "03",
    titleDefault: "Name the belief",
    detailDefault: "The exact wording underneath the stall, written down.",
  },
  {
    id: "score",
    n: "04",
    titleDefault: "Score + next step",
    detailDefault: "Baseline 1 to 10, then one concrete move with when.",
  },
];

/**
 * Interactive measurement diagram for the 40-minute audit:
 * superposition of options collapsing into a single logged outcome.
 */
export function ProcessDiagram() {
  const { ref, revealed } = useReveal(0.2);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!revealed || !auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [revealed, auto]);

  const progress = ((active + 1) / STEPS.length) * 100;
  const beamX = 290 + progress * 1.35;

  return (
    <div ref={ref} data-revealed={revealed} className="process-diagram mt-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div className="relative overflow-hidden border border-hairline bg-card/60 p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              Measurement diagram
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
              T+{String((active + 1) * 10).padStart(2, "0")} min
            </span>
          </div>

          <svg
            viewBox="0 0 520 320"
            className="h-auto w-full"
            role="img"
            aria-label="Audit process diagram showing superposition collapsing under measurement"
          >
            <text
              x="70"
              y="48"
              fill="rgba(21,15,62,0.45)"
              style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em" }}
            >
              SUPERPOSITION
            </text>

            {Array.from({ length: 18 }, (_, i) => {
              const a = (i / 18) * Math.PI * 2;
              const r = 58 + (i % 3) * 10;
              const x = 130 + Math.cos(a) * r;
              const y = 150 + Math.sin(a) * r * 0.7;
              const lit = active === 0;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={lit ? 3.2 : 2.2}
                  fill={lit ? "rgba(214,61,119,0.85)" : "rgba(21,15,62,0.22)"}
                  opacity={revealed ? 1 : 0}
                  style={{ transition: `opacity 500ms ease ${i * 30}ms` }}
                />
              );
            })}

            <path
              d="M210 150 H290"
              stroke="rgba(21,15,62,0.2)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 4"
            />
            <path
              d={`M290 150 H${beamX}`}
              stroke="rgb(214,61,119)"
              strokeWidth="2"
              fill="none"
            />

            <rect x="286" y="112" width="8" height="76" rx="1" fill="rgba(21,15,62,0.85)" />
            <text
              x="268"
              y="210"
              fill="rgba(21,15,62,0.45)"
              style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em" }}
            >
              MEASURE
            </text>

            <rect
              x="360"
              y="108"
              width="130"
              height="90"
              rx="2"
              fill="#fff"
              stroke="rgba(214,61,119,0.55)"
              strokeWidth="1"
            />
            <text
              x="372"
              y="132"
              fill="rgb(214,61,119)"
              style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em" }}
            >
              COLLAPSED
            </text>
            <text
              x="372"
              y="158"
              fill="rgba(21,15,62,0.92)"
              style={{ fontFamily: "var(--font-display)", fontSize: 18, fontStyle: "italic" }}
            >
              Next step
            </text>

            {[0, 1, 2, 3].map((i) => (
              <circle
                key={i}
                cx={372 + i * 28}
                cy={178}
                r={3}
                fill={i <= active ? "rgb(214,61,119)" : "rgba(21,15,62,0.18)"}
              />
            ))}
          </svg>

          <div className="mt-4 h-px w-full overflow-hidden bg-hairline">
            <div
              className="h-full bg-accent transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            <Live
              id="diagram.heading"
              defaultValue="Decision · Cost · Belief · Baseline · Next step"
              className="inline"
            />
          </p>
          <ol className="mt-6 space-y-3">
            {STEPS.map((step, i) => {
              const on = i === active;
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    onMouseEnter={() => {
                      setAuto(false);
                      setActive(i);
                    }}
                    onFocus={() => {
                      setAuto(false);
                      setActive(i);
                    }}
                    onClick={() => {
                      setAuto(false);
                      setActive(i);
                    }}
                    className={`group flex w-full items-start gap-4 border px-4 py-4 text-left transition-colors duration-300 ${
                      on
                        ? "border-accent/50 bg-accent/10"
                        : "border-hairline bg-card/40 hover:border-accent/30"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] tracking-[0.18em] uppercase ${
                        on ? "text-accent" : "text-muted-foreground"
                      }`}
                    >
                      {step.n}
                    </span>
                    <span className="min-w-0">
                      <Live
                        id={`diagram.${i}.title`}
                        defaultValue={step.titleDefault}
                        className="block font-display text-lg font-medium sm:text-xl"
                      />
                      <Live
                        id={`diagram.${i}.detail`}
                        defaultValue={step.detailDefault}
                        multiline
                        className={`mt-1 block text-sm leading-relaxed text-muted-foreground transition-opacity duration-300 ${
                          on ? "opacity-100" : "opacity-70"
                        }`}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
