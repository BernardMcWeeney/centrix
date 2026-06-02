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

Contact form submissions post to `/api/contact`. The public Turnstile site key is rendered directly in `src/pages/contact.astro` because it is not a secret. The Worker endpoint verifies the Turnstile token and sends contact email through the `CONTACT_EMAIL` Cloudflare Email binding.

Set these Cloudflare Worker environment variables:

- `TURNSTILE_SECRET_KEY`

Optional AWS SES fallback variables:

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `FROM_EMAIL_ADDRESS`
- `TO_EMAIL_ADDRESS`

Treat `TURNSTILE_SECRET_KEY`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY` as secrets. The code also accepts `CF_TURNSTILE_SECRET_KEY`, `CLOUDFLARE_TURNSTILE_SECRET_KEY`, or `TURNSTILE_SECRET` for the Turnstile secret. In Cloudflare Turnstile, make sure the widget allows `centrix.ie`, `www.centrix.ie`, and any preview domain you use for testing.

The `CONTACT_EMAIL` binding is configured in `wrangler.json` with `destination_address: "hello@centrix.ie"`. Cloudflare Email Routing/Email Service must be enabled for `centrix.ie`, and `hello@centrix.ie` must be a verified destination. If the binding is unavailable, the form falls back to AWS SES.
