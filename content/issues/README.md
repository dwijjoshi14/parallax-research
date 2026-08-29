# Newsletter issue archive

Drop a real, already-sent Parallax Morning Brief in here as a .mdx file
and it will automatically show up on /archive and (if recent) on the
homepage. There is nothing else to wire up, the site reads this folder
directly.

## Format

Filename becomes the URL slug, so `2026-08-27-fed-rate-decision.mdx`
becomes `/archive/2026-08-27-fed-rate-decision`.

Each file needs frontmatter like this at the top, followed by the actual
content of the issue as MDX (basically markdown):

```
---
title: "Fed holds rates, markets shrug"
date: "2026-08-27"
summary: "One or two sentence teaser of what this edition covered."
---

The actual body of the newsletter goes here, in Markdown/MDX.
```

## A possible future automation

Right now this is a manual step: after Nirmay's Python pipeline sends an
edition through Resend, someone copies that day's content into a new
.mdx file here and pushes it. Down the line, the Python pipeline could
instead commit this file automatically as part of sending an issue,
worth discussing once the manual version feels like a chore.
