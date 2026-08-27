import "server-only";
import { randomUUID } from "crypto";
import { getSupabaseServerClient } from "./supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isPlausibleEmail(email: string) {
  return EMAIL_REGEX.test(email);
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

type UpsertResult =
  | { status: "already-active" }
  | { status: "pending-resend"; confirmationToken: string }
  | { status: "created"; confirmationToken: string };

/**
 * Creates or updates a subscriber row per the state rules in the handoff
 * doc. The caller (the /api/subscribe route) decides whether to send a
 * confirmation email based on the returned status; this function never
 * sends email itself, it only touches the database.
 */
export async function upsertSubscriber(rawEmail: string): Promise<UpsertResult> {
  const email = normalizeEmail(rawEmail);
  const supabase = getSupabaseServerClient();

  const { data: existing, error: lookupError } = await supabase
    .from("subscribers")
    .select("id, status, confirmation_token")
    .eq("email", email)
    .maybeSingle();

  if (lookupError) throw lookupError;

  // Already active: no duplicate row, no downgrade, no email needed.
  if (existing && existing.status === "active") {
    return { status: "already-active" };
  }

  // Pending: let the confirmation be retried using the same token rather
  // than minting a new one or creating a second row.
  if (existing && existing.status === "pending") {
    return {
      status: "pending-resend",
      confirmationToken: existing.confirmation_token,
    };
  }

  // Brand new, or previously unsubscribed/bounced/complained: issue a
  // fresh token pair and require a new confirmation. This is what makes
  // re-subscription after an unsubscribe require confirming again rather
  // than instantly going active.
  const confirmationToken = randomUUID();
  const unsubscribeToken = randomUUID();

  if (existing) {
    const { error } = await supabase
      .from("subscribers")
      .update({
        status: "pending",
        confirmation_token: confirmationToken,
        unsubscribe_token: unsubscribeToken,
        subscribed_at: new Date().toISOString(),
        confirmed_at: null,
        unsubscribed_at: null,
      })
      .eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("subscribers").insert({
      email,
      status: "pending",
      confirmation_token: confirmationToken,
      unsubscribe_token: unsubscribeToken,
      source: "website",
    });
    if (error) throw error;
  }

  return { status: "created", confirmationToken };
}

export async function confirmSubscriber(
  token: string
): Promise<{ ok: boolean; alreadyActive?: boolean }> {
  const supabase = getSupabaseServerClient();

  const { data: existing, error: lookupError } = await supabase
    .from("subscribers")
    .select("id, status")
    .eq("confirmation_token", token)
    .maybeSingle();

  if (lookupError) throw lookupError;
  if (!existing) {
    return { ok: false };
  }

  // Clicking an already-used confirmation link is not an error, it's the
  // same successful outcome the person already achieved.
  if (existing.status === "active") {
    return { ok: true, alreadyActive: true };
  }

  if (existing.status !== "pending") {
    // e.g. this token belongs to a row that's since been unsubscribed;
    // that confirmation link is genuinely stale.
    return { ok: false };
  }

  const { error } = await supabase
    .from("subscribers")
    .update({ status: "active", confirmed_at: new Date().toISOString() })
    .eq("id", existing.id);

  if (error) throw error;
  return { ok: true };
}

export async function unsubscribeByToken(
  token: string
): Promise<{ ok: boolean; alreadyUnsubscribed?: boolean }> {
  const supabase = getSupabaseServerClient();

  const { data: existing, error: lookupError } = await supabase
    .from("subscribers")
    .select("id, status")
    .eq("unsubscribe_token", token)
    .maybeSingle();

  if (lookupError) throw lookupError;
  if (!existing) {
    return { ok: false };
  }

  if (existing.status === "unsubscribed") {
    return { ok: true, alreadyUnsubscribed: true };
  }

  const { error } = await supabase
    .from("subscribers")
    .update({
      status: "unsubscribed",
      unsubscribed_at: new Date().toISOString(),
    })
    .eq("id", existing.id);
  if (error) throw error;

  return { ok: true };
}
