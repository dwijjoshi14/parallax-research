export type Category = "Markets" | "Technology" | "Company Research";

export interface ArticleFrontmatter {
  title: string;
  author: string;
  date: string; // ISO date string, e.g. "2026-06-12"
  category: Category;
  summary: string;
  image?: string;
}

export interface ArticleMeta extends ArticleFrontmatter {
  slug: string;
  readingTime: string;
}

export interface Article extends ArticleMeta {
  content: string; // raw MDX body, compiled by the article page
}
