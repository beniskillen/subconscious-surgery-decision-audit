import { useReveal } from "./useReveal";

/**
 * Oversized ghost numeral: fine double stroke that settles into a single line
 * as the card enters the viewport.
 */
export function GhostNumeral({ value }: { value: string }) {
  const { ref, revealed } = useReveal(0.28);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute -top-4 -right-1 select-none sm:-top-6 sm:right-0"
    >
      <div className="relative h-[5.5rem] w-[7.5rem] sm:h-[7rem] sm:w-[9.5rem]">
        <span
          className="ghost-numeral-layer ghost-numeral-a absolute inset-0 font-display text-[5.5rem] leading-none font-semibold tracking-tighter sm:text-[7rem]"
          data-settled={revealed}
        >
          {value}
        </span>
        <span
          className="ghost-numeral-layer ghost-numeral-b absolute inset-0 font-display text-[5.5rem] leading-none font-semibold tracking-tighter sm:text-[7rem]"
          data-settled={revealed}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
