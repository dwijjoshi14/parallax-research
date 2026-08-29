export interface IssueFrontmatter {
  title: string;
  date: string; // ISO date string, e.g. "2026-08-27"
  summary: string;
  image?: string;
}

export interface IssueMeta extends IssueFrontmatter {
  slug: string;
  readingTime: string;
}

export interface Issue extends IssueMeta {
  content: string; // raw MDX body, compiled by the issue page
}
