import { NextRequest, NextResponse } from "next/server";
import { unsubscribeByToken } from "@/lib/subscribers";

/**
 * GET and POST live in the same file because Next.js does not allow a
 * page.tsx and a route.ts on the same exact path. GET is the human-facing
 * link from the email (renders a plain styled HTML page directly, since
 * Route Handlers do not go through the site's normal React layout). POST
 * is for one-click unsubscribe headers sent by mail clients, and returns
 * a bare JSON response instead of a page.
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
  </head>
  <body style="margin:0; background:#F7F8F6; font-family: Georgia, 'Times New Roman', serif; color:#1a1a1a;">
    <div style="max-width:480px; margin:80px auto; padding:0 24px; text-align:center;">
      <p style="font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#3C9D9B; margin:0 0 16px;">
        Parallax Research Group
      </p>
      <h1 style="font-size:26px; margin:0 0 16px; color:#173B57;">${heading}</h1>
      <p style="font-size:15px; line-height:1.6; color:#4a4a4a;">${body}</p>
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
