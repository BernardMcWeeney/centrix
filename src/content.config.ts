import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const news = defineCollection({
	// Load Markdown and MDX files in the `src/content/news/` directory.
	loader: glob({ base: "./src/content/news", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		sourceName: z.string().optional(),
		sourceUrl: z.string().optional(),
		sourceLogo: z.string().optional(),
	}),
});

const caseStudies = defineCollection({
	loader: glob({ base: "./src/content/case-studies", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		eyebrow: z.string(),
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
		icon: z.string(),
		clientType: z.string(),
		sector: z.string(),
		location: z.string().optional(),
		timeframe: z.string().optional(),
		services: z.array(z.string()),
		work: z.array(z.string()),
		results: z.array(z.string()),
		outcome: z.string(),
		platforms: z.array(z.enum(["microsoft", "google", "cloudflare", "chatgpt", "claude", "unifi"])),
	}),
});

export const collections = { news, caseStudies };
