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

function renderPage(success: boolean) {
  const heading = success ? "You're unsubscribed" : "That link isn't valid";
  const body = success
    ? "You will not receive any further Parallax Morning Brief emails. If this was a mistake, you can subscribe again any time from the website."
    : "This unsubscribe link is missing, expired, or has already been used.";

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

async function handleUnsubscribe(token: string | null) {
  if (!token) {
    return { ok: false as const };
  }
  try {
    return await unsubscribeByToken(token);
  } catch (err) {
    console.error("unsubscribe error:", err instanceof Error ? err.message : err);
    return { ok: false as const };
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const result = await handleUnsubscribe(token);

  return new NextResponse(renderPage(result.ok), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const result = await handleUnsubscribe(token);

  return NextResponse.json(
    result.ok ? { ok: true } : { ok: false, error: "Invalid or expired token." },
    { status: result.ok ? 200 : 400 }
  );
}
