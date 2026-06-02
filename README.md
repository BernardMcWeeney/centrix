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

Contact form submissions post to `/api/contact` and require these production environment variables:

- `PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `FROM_EMAIL_ADDRESS`
- `TO_EMAIL_ADDRESS`
