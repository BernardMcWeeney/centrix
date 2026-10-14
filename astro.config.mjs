// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://centrix.ie",
	integrations: [
		mdx(),
		sitemap(),
		{
			name: "centrix:separate-vite-caches",
			hooks: {
				"astro:config:setup": ({ command, updateConfig }) => {
					// Builds also start Vite servers to prerender pages. Use Astro's
					// command so they cannot replace a running dev server's modules.
					updateConfig({
						vite: {
							cacheDir: command === "dev" ? "node_modules/.vite-dev" : "node_modules/.vite-build",
						},
					});
				},
			},
		},
	],
	adapter: cloudflare({
		prerenderEnvironment: "node",
	}),
	vite: {
		plugins: [tailwindcss()],
	},
});
