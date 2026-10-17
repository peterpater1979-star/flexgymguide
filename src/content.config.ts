import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Elke pagina is een Markdown-bestand. `path` is de URL, `lang` de taal en `land` het landmenu.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    path: z.string(),
    description: z.string().optional(),
    lang: z.enum(['nl', 'de', 'en']),
    land: z.enum(['global', 'nl', 'de', 'at', 'ch', 'uk', 'guides']).default('global'),
    crumb: z.string().optional(), // korte naam in het kruimelpad
    kicker: z.string().optional(), // regel boven de titel
    byline: z.string().optional(), // "Door [AUTEUR] · Bijgewerkt op [DATUM]"
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false), // concept: wordt niet gebouwd
    noindex: z.boolean().default(false),
  }),
});

export const collections = { pages };
