import type { ElementType } from "react";

type EditableTextProps = {
  value: string;
  onChange?: (next: string) => void;
  onFocusEdit?: () => void;
  className?: string;
  multiline?: boolean;
  as?: ElementType;
  "aria-label"?: string;
  /** Use on dark surfaces (hero right panel). */
  dark?: boolean;
};

/** Static text node — browser editing disabled for published builds. */
export function EditableText({
  value,
  className = "",
  multiline = false,
  as: Tag = "span",
}: EditableTextProps) {
  return (
    <Tag className={`${multiline ? "whitespace-pre-line" : ""} ${className}`.trim()}>
      {value}
    </Tag>
  );
}
