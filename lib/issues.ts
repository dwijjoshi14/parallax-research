import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Issue, IssueFrontmatter, IssueMeta } from "./types";

export type { IssueFrontmatter, IssueMeta, Issue } from "./types";
export { formatDate } from "./format";

const ISSUES_DIR = path.join(process.cwd(), "content", "issues");

function readIssueFile(filename: string): Issue {
  const slug = filename.replace(/\.mdx$/, "");
  const fullPath = path.join(ISSUES_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as IssueFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: `${Math.max(1, Math.round(stats.minutes))} min read`,
  };
}

/**
 * Returns every real newsletter issue in /content/issues, sorted newest
 * first. Drop a new .mdx file (with title/date/summary frontmatter) in
 * that folder and it shows up here, on /archive, and on the homepage.
 * This is intentionally empty until real editions exist, no placeholder
 * content is faked in here.
 */
export function getAllIssues(): Issue[] {
  if (!fs.existsSync(ISSUES_DIR)) return [];

  const files = fs.readdirSync(ISSUES_DIR).filter((f) => f.endsWith(".mdx"));
  const issues = files.map(readIssueFile);

  return issues.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAllIssueMetas(): IssueMeta[] {
  return getAllIssues().map(({ content, ...meta }) => meta);
}

export function getIssueBySlug(slug: string): Issue | null {
  const filePath = path.join(ISSUES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readIssueFile(`${slug}.mdx`);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(ISSUES_DIR)) return [];
  return fs
    .readdirSync(ISSUES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getRecentIssues(count: number): IssueMeta[] {
  return getAllIssueMetas().slice(0, count);
}

/** Recent issues excluding the current one, for a "more issues" list. */
export function getOtherIssues(currentSlug: string, count = 3): IssueMeta[] {
  return getAllIssueMetas()
    .filter((i) => i.slug !== currentSlug)
    .slice(0, count);
}
