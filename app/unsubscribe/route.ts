import { NextRequest, NextResponse } from "next/server";
import { unsubscribeByToken } from "@/lib/subscribers";

/**
 * GET and POST live in the same file because Next.js does not allow a
 * page.tsx and a route.ts on the same exact path. This page is built as
 * raw HTML (not a React page) because Route Handlers bypass the site's
 * normal layout entirely, so the fonts/colors below are hand-matched to
 * globals.css rather than inherited automatically.
 */

type UnsubState = "unsubscribed" | "already" | "invalid";

function renderPage(state: UnsubState) {
  const heading =
    state === "invalid"
      ? "That link isn't valid"
      : state === "already"
        ? "You're already unsubscribed"
        : "You're unsubscribed";

  const body =
    state === "invalid"
      ? "This unsubscribe link is missing, expired, or was never valid."
      : state === "already"
        ? "This address was already unsubscribed from Parallax Morning Brief. No further action is needed."
        : "You will not receive any further Parallax Morning Brief emails. If this was a mistake, you can subscribe again any time from the website.";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${heading} — Parallax Research Group</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body style="margin:0; background:#f7f8f6; font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; color:#151a1f; -webkit-font-smoothing:antialiased;">
    <div style="max-width:480px; margin:80px auto; padding:40px 32px; text-align:center; background:#ffffff; border:1px solid #e2e5e2;">
      <p style="font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:#3c9d9b; margin:0 0 16px;">
        Parallax Research Group
      </p>
      <h1 style="font-size:26px; font-weight:600; letter-spacing:-0.01em; margin:0 0 16px; color:#173b57;">${heading}</h1>
      <p style="font-size:15px; line-height:1.6; color:#667580; margin:0;">${body}</p>
    </div>
  </body>
</html>`;
}

async function resolveState(token: string | null): Promise<UnsubState> {
  if (!token) return "invalid";
  try {
    const result = await unsubscribeByToken(token);
    if (!result.ok) return "invalid";
    return result.alreadyUnsubscribed ? "already" : "unsubscribed";
  } catch (err) {
    console.error("unsubscribe error:", err instanceof Error ? err.message : err);
    return "invalid";
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const state = await resolveState(token);

  return new NextResponse(renderPage(state), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const state = await resolveState(token);

  if (state === "invalid") {
    return NextResponse.json(
      { ok: false, error: "Invalid or expired token." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    alreadyUnsubscribed: state === "already",
  });
}
