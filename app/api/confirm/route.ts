import { NextRequest, NextResponse } from "next/server";
import { confirmSubscriber } from "@/lib/subscribers";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const siteUrl = req.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(`${siteUrl}/newsletter/confirm-error`);
  }

  try {
    const result = await confirmSubscriber(token);
    if (!result.ok) {
      return NextResponse.redirect(`${siteUrl}/newsletter/confirm-error`);
    }
    return NextResponse.redirect(`${siteUrl}/newsletter/confirmed`);
  } catch (err) {
    console.error("confirm error:", err instanceof Error ? err.message : err);
    return NextResponse.redirect(`${siteUrl}/newsletter/confirm-error`);
  }
}
