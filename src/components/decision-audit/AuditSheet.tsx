import { Live } from "./LiveCopy";

const FIELDS = [
  {
    id: "decision",
    label: "The decision",
    sample: "The specific business decision under review",
  },
  {
    id: "cost",
    label: "Cost of delay",
    sample: "Time, money or opportunity affected by continued delay",
  },
  {
    id: "assumptions",
    label: "Assumptions",
    sample: "Current reasoning, recorded in the participant's own words",
  },
  {
    id: "action",
    label: "Next action",
    sample: "One practical step to take",
  },
  {
    id: "when",
    label: "When",
    sample: "The date or window for that action",
  },
];

/** Lab-record card showing what participants document and keep. */
export function AuditSheet() {
  return (
    <article className="border border-hairline bg-card">
      <header className="flex items-center justify-between gap-4 border-b border-hairline px-6 py-4 sm:px-8">
        <Live
          id="sheet.kicker"
          defaultValue="Decision Audit sheet"
          className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase"
        />
        <span className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
          Keep
        </span>
      </header>
      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <Live
          id="sheet.intro"
          defaultValue="What participants document and keep"
          as="p"
          className="text-sm leading-relaxed text-muted-foreground"
        />
        <dl className="mt-8 space-y-0">
          {FIELDS.map((field, i) => (
            <div
              key={field.id}
              className="grid gap-1 border-t border-hairline py-4 sm:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] sm:items-baseline sm:gap-8"
            >
              <dt>
                <Live
                  id={`sheet.${i}.label`}
                  defaultValue={field.label}
                  className="text-xs font-semibold tracking-[0.12em] text-foreground uppercase"
                />
              </dt>
              <dd className="min-h-[1.5rem] border-b border-dashed border-hairline pb-2 font-display text-lg italic text-muted-foreground sm:text-xl">
                <Live id={`sheet.${i}.sample`} defaultValue={field.sample} className="inline" />
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <footer className="border-t border-hairline px-6 py-4 sm:px-8">
        <Live
          id="sheet.caption"
          defaultValue="The session produces a written record. You leave with the sheet."
          as="p"
          className="text-xs leading-relaxed text-muted-foreground"
        />
      </footer>
    </article>
  );
}
