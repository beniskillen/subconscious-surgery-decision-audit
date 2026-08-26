import {
  createContext,
  useContext,
  useMemo,
  type ElementType,
  type ReactNode,
} from "react";

type LiveCopyContextValue = {
  ready: boolean;
  get: (id: string, fallback: string) => string;
  set: (id: string, value: string) => void;
  reset: () => void;
};

const LiveCopyContext = createContext<LiveCopyContextValue | null>(null);

/** Static copy provider — no localStorage, no in-browser editing. */
export function LiveCopyProvider({ children }: { children: ReactNode }) {
  const api = useMemo<LiveCopyContextValue>(
    () => ({
      ready: true,
      get: (_id, fallback) => fallback,
      set: () => undefined,
      reset: () => undefined,
    }),
    [],
  );

  return <LiveCopyContext.Provider value={api}>{children}</LiveCopyContext.Provider>;
}

export function useLiveCopy() {
  const ctx = useContext(LiveCopyContext);
  if (!ctx) throw new Error("useLiveCopy must be used within LiveCopyProvider");
  return ctx;
}

type LiveProps = {
  id: string;
  defaultValue: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
  dark?: boolean;
  onFocusEdit?: () => void;
};

/** Static published copy. `id` / edit props are kept for call-site compatibility. */
export function Live({
  defaultValue,
  as: Tag = "span",
  className = "",
  multiline = false,
}: LiveProps) {
  return (
    <Tag className={`${multiline ? "whitespace-pre-line" : ""} ${className}`.trim()}>
      {defaultValue}
    </Tag>
  );
}

/** No-op — editing toolbar is disabled on the published page. */
export function LiveCopyToolbar() {
  return null;
}
