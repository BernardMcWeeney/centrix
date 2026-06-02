# Centrix

Astro site for Centrix business IT consultancy.

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the production site |
| `npm run preview` | Build and preview through Wrangler |
| `npm run deploy` | Deploy to Cloudflare Workers |

## Content

News items live in `src/content/news`.

## Contact Form Setup

Contact form submissions post to `/api/contact`. The page needs the public Turnstile site key so the widget can render, and the Worker endpoint needs the secret keys so it can verify the token and send email through AWS SES.

Set these Cloudflare Worker environment variables:

- `PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `FROM_EMAIL_ADDRESS`
- `TO_EMAIL_ADDRESS`

`PUBLIC_TURNSTILE_SITE_KEY` is the browser widget site key. It can be a normal variable or secret, but it is not the same value as `TURNSTILE_SECRET_KEY`. The code also accepts `TURNSTILE_SITE_KEY`, `CF_TURNSTILE_SITE_KEY`, `CLOUDFLARE_TURNSTILE_SITE_KEY`, or `TURNSTILE_PUBLIC_KEY` for the site key.

Treat `TURNSTILE_SECRET_KEY`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY` as secrets. The code also accepts `CF_TURNSTILE_SECRET_KEY`, `CLOUDFLARE_TURNSTILE_SECRET_KEY`, or `TURNSTILE_SECRET` for the Turnstile secret. In Cloudflare Turnstile, make sure the widget allows `centrix.ie` and any preview domain you use for testing. In AWS SES, the `FROM_EMAIL_ADDRESS` must be verified in the same `AWS_REGION`.
