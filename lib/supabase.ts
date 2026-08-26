import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the secret (service role) key.
 * "server-only" above will throw a build error if this file is ever
 * imported into a client component, since this key must never reach
 * the browser.
 */
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SECRET_KEY environment variables."
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
