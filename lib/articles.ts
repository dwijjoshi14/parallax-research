import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Article, ArticleFrontmatter, ArticleMeta, Category } from "./types";

export type { Category, ArticleFrontmatter, ArticleMeta, Article } from "./types";
export { formatDate } from "./format";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function readArticleFile(filename: string): Article {
  const slug = filename.replace(/\.mdx$/, "");
  const fullPath = path.join(ARTICLES_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: `${Math.max(1, Math.round(stats.minutes))} min read`,
  };
}

/**
 * Returns every article in /content/articles, sorted newest first.
 * Adding a new .mdx file to that folder is all that's needed for it to
 * show up here, on the Research page, and (if recent) on the homepage.
 */
export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));
  const articles = files.map(readArticleFile);

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAllArticleMetas(): ArticleMeta[] {
  return getAllArticles().map(({ content, ...meta }) => meta);
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readArticleFile(`${slug}.mdx`);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getRecentArticles(count: number): ArticleMeta[] {
  return getAllArticleMetas().slice(0, count);
}

export function getArticlesByCategory(category: Category | "All"): ArticleMeta[] {
  const all = getAllArticleMetas();
  if (category === "All") return all;
  return all.filter((a) => a.category === category);
}

/** Articles in the same category as the given article, excluding itself. */
export function getRelatedArticles(current: ArticleMeta, count = 3): ArticleMeta[] {
  return getAllArticleMetas()
    .filter((a) => a.slug !== current.slug && a.category === current.category)
    .slice(0, count);
}
