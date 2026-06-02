import { env } from 'cloudflare:workers';
import { checkedTurnstileSiteKeyNames, getTurnstileSiteKey } from '../../../server/contact-env.js';

export const prerender = false;

export async function GET() {
  const siteKey = getTurnstileSiteKey(env);

  if (!siteKey) {
    console.error('Turnstile site key is not configured. Checked env vars:', checkedTurnstileSiteKeyNames().join(', '));
    return Response.json({ success: false, message: 'Turnstile site key is not configured.' }, { status: 500 });
  }

  return Response.json({ success: true, siteKey });
}
