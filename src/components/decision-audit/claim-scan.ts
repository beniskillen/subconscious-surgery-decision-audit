/**
 * Paid-ad kill-list hits on destination testimonials.
 * Flag for Adrian. Do not silently rewrite quotes.
 */
export type ClaimHit = {
  speaker: string;
  term: string;
  excerpt: string;
  action: string;
};

export const CLAIM_SCAN_HITS: ClaimHit[] = [
  {
    speaker: "Nick Screeton",
    term: "coach",
    excerpt: "Adrian is a fantastic coach",
    action: "Leave copy. Do not run in paid until Adrian signs.",
  },
  {
    speaker: "Steph Skelly",
    term: "anxiety",
    excerpt: "removed a massive chunk of anxiety",
    action: "Health-adjacent. Flag. Do not rewrite.",
  },
  {
    speaker: "Jennifer Nyx",
    term: "finances",
    excerpt: "blockages in my finances",
    action: "Financial-outcome adjacent. Flag.",
  },
  {
    speaker: "Tristen",
    term: "life-changing",
    excerpt: "it has been life-changing",
    action: "Superlative / miracle-adjacent. Flag.",
  },
  {
    speaker: "Latonya",
    term: "life-changing",
    excerpt: "Subconscious surgery is life-changing",
    action: "Flag.",
  },
  {
    speaker: "Dorinda",
    term: "life-changing",
    excerpt: "It is life-changing. Literally.",
    action: "Flag.",
  },
  {
    speaker: "Marian",
    term: "mental health",
    excerpt: "on disability for mental health",
    action: "Hard-banned category. Do not use in ads.",
  },
  {
    speaker: "Latonya",
    term: "finances",
    excerpt: "experience financial freedom",
    action: "Income / financial-outcome claim. Flag.",
  },
];
