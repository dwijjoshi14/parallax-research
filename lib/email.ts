import "server-only";
import { Resend } from "resend";

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }
  return new Resend(key);
}

// Update this once a sending domain is verified in Resend. Until then,
// Resend's own onboarding@resend.dev sender ONLY delivers to the email
// address that owns the Resend account, sends to any other address will
// fail. That's a hard Resend restriction, not a bug in this file.
const FROM_ADDRESS =
  process.env.NEWSLETTER_FROM_EMAIL ||
  "Parallax Research Group <onboarding@resend.dev>";

// Web-safe sans-serif stack, not a custom font import. Email clients
// (especially Outlook) frequently strip <link> tags and @font-face, so
// this uses the closest widely-supported system stack to Inter rather
// than risking a fallback to a serif font that wouldn't match the site.
const EMAIL_FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export async function sendConfirmationEmail(
  toEmail: string,
  confirmationToken: string
) {
  const resend = getResendClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    throw new Error("Missing NEXT_PUBLIC_SITE_URL environment variable.");
  }

  const confirmUrl = `${siteUrl}/api/confirm?token=${confirmationToken}`;

  // Resend's SDK does NOT throw on API-level failures, it returns
  // { data, error }. Checking `error` explicitly here is what makes a
  // failed send actually surface as a failure instead of a false
  // "Check your inbox" success message.
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: toEmail,
    subject: "Confirm your subscription to Parallax Morning Brief",
    html: `
      <div style="font-family: ${EMAIL_FONT_STACK}; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #151a1f;">
        <p style="font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #3c9d9b; margin: 0 0 16px;">
          Parallax Research Group
        </p>
        <h1 style="font-size: 22px; font-weight: 600; margin: 0 0 16px; color: #173b57;">
          Confirm your subscription
        </h1>
        <p style="font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
          Click below to confirm you would like to receive the Parallax Morning Brief.
        </p>
        <a href="${confirmUrl}" style="display: inline-block; background: #173b57; color: #ffffff; text-decoration: none; padding: 12px 20px; font-size: 14px; font-weight: 600;">
          Confirm subscription
        </a>
        <p style="font-size: 13px; color: #667580; margin-top: 24px;">
          If you did not request this, you can ignore this email.
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(
      `Resend failed to send the confirmation email: ${
        typeof error === "object" && error && "message" in error
          ? (error as { message: string }).message
          : JSON.stringify(error)
      }`
    );
  }
}
