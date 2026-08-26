/** Prefix public asset paths with Vite BASE_URL (needed for GitHub Pages subpaths). */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const normalized = path.replace(/^\//, "");
  return `${base}${normalized}`;
}
