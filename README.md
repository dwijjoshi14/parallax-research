# Parallax Research Group

Independent research on markets and technology. Built with Next.js (App
Router), TypeScript, and Tailwind CSS. Articles are plain MDX files; adding
one is the entire publishing workflow.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- MDX articles via `next-mdx-remote/rsc`, parsed with `gray-matter`
- Self-hosted Inter (`@fontsource/inter`) — no external font fetch at build
  or runtime, so builds don't depend on reaching Google Fonts

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

To check a production build before deploying:

```bash
npm run build
npm run start
```

## Adding a new article

This is the part that matters most day to day.

1. Create a new file in `content/articles/`, e.g.
   `content/articles/my-new-piece.mdx`. The filename becomes the URL slug:
   `/research/my-new-piece`.
2. Add frontmatter at the top of the file:

   ```mdx
   ---
   title: "Your Article Title"
   author: "Author Name"
   date: "2026-08-01"
   category: "Markets"   # or "Technology"
   summary: "One sentence for the card and SEO description."
   image: "/images/articles/your-image.png"   # optional, omit if unused
   ---

   Your article body goes here, in normal Markdown/MDX: headings (`##`,
   `###`), paragraphs, bullet or numbered lists, `> blockquotes`, and
   `![alt text](/images/articles/your-image.png)` for images.
   ```

3. If you're using an image, drop the file in
   `public/images/articles/` and reference it with a path starting `/`.
4. Save. That's it — no other file needs to change. The new article will:
   - Appear on the Research page (and in the category filter)
   - Appear on the homepage if it's one of the 3 most recent by `date`
   - Get its own page at `/research/<slug>` with reading time computed
     automatically from word count
   - Show up in the "Related Articles" section of other articles in the
     same `category`

Look at the three files already in `content/articles/` as worked examples,
one is Markets, two are Technology, so both the category filter and the
Related Articles section have something to show.

## Deploying

### Vercel (recommended, zero config)

1. Push this repo to GitHub.
2. Import it in Vercel, framework preset "Next.js" is auto-detected.
3. Deploy. No environment variables are required.

### GitHub Pages (static export)

GitHub Pages serves static files only, so you need Next's static export
mode:

1. In `next.config.ts`, add:
   ```ts
   const nextConfig: NextConfig = {
     output: "export",
     images: { unoptimized: true },
   };
   ```
   (`images.unoptimized` is required because GitHub Pages can't run the
   Next.js image optimization API.)
2. `npm run build` will now produce a static `out/` folder.
3. Deploy `out/` to the `gh-pages` branch, or point a GitHub Actions
   workflow at it (see Next.js's static export docs for a ready-made
   Action).
4. If the site lives at `username.github.io/repo-name` rather than a
   custom domain, also set `basePath: "/repo-name"` in `next.config.ts`.

## Things that are placeholders right now

These were intentionally left as clearly-marked placeholders since the
real content wasn't available yet:

- **Logo mark** (`components/Logo.tsx`): hand-recreated as inline SVG from
  the brand identity boards you shared (saved for reference in
  `public/brand/`), since those were presentation boards rather than
  isolated logo export files. Swap in real SVG/PNG exports when you have
  them — there's a `TODO(replace-logo)` comment marking exactly where.
- **Co-founder bios and photos** (`app/about/page.tsx`): three placeholder
  names, roles, and dashed photo-slot boxes. Replace the `FOUNDERS` array
  and swap the placeholder `<div>` for a real `next/image`.
- **Contact links**: the email address, LinkedIn, and Medium URLs in
  `components/Footer.tsx` and `app/contact/page.tsx` are placeholders.
  Search for `parallaxresearch.group` and `linkedin.com`/`medium.com` to
  find and replace them.
- **Newsletter field** (`app/contact/page.tsx`): the input and button are
  present but disabled and not wired to any email provider. Connect it to
  Mailchimp, Buttondown, ConvertKit, or similar before going live.
- **`metadataBase` URL** (`app/layout.tsx`): set to
  `https://parallaxresearch.group` as a placeholder. Update to your real
  deployed domain so Open Graph/social preview images resolve correctly.

## Project structure

```
app/
  layout.tsx           Root layout: fonts, header, footer, default SEO
  page.tsx              Home
  research/page.tsx      Research listing + category filter
  research/[slug]/page.tsx  Article template
  about/page.tsx
  contact/page.tsx
components/
  Header.tsx, Footer.tsx, Logo.tsx
  ArticleCard.tsx, CategoryTag.tsx, CategoryFilter.tsx
  ArticleBody.tsx       Compiles and styles MDX article content
content/
  articles/*.mdx        Every article lives here
lib/
  articles.ts           Server-only: reads content/articles from disk
  types.ts               Shared TypeScript types (safe for client components)
  format.ts               Date formatting helper (safe for client components)
public/
  brand/                Source brand identity board images, for reference
  images/articles/       Article images
```

`lib/articles.ts` is split from `lib/types.ts`/`lib/format.ts` on purpose:
the former reads the filesystem with Node's `fs` module and can only run on
the server, while the latter two hold plain types and a pure function that
client components (like the category filter) also need.
