import { NextRequest, NextResponse } from "next/server";
import { isPlausibleEmail, upsertSubscriber } from "@/lib/subscribers";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const rawEmail =
    typeof body === "object" && body !== null && "email" in body
      ? (body as { email: unknown }).email
      : "";

  if (typeof rawEmail !== "string" || !isPlausibleEmail(rawEmail)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    const result = await upsertSubscriber(rawEmail);

    if (result.status === "created" || result.status === "pending-resend") {
      await sendConfirmationEmail(rawEmail.trim().toLowerCase(), result.confirmationToken);
    }

    // Same generic message regardless of prior state, so this endpoint
    // never reveals whether an address was already subscribed.
    return NextResponse.json({
      message: "Check your inbox to confirm your subscription.",
    });
  } catch (err) {
    console.error("subscribe error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
