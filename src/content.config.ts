import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Elke pagina is een Markdown-bestand. `path` is de URL, `lang` de taal en `land` het landmenu.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(), // korte titel voor Google (<title>), als de kop te lang is
    path: z.string(),
    description: z.string().optional(),
    lang: z.enum(['nl', 'de', 'en', 'fr', 'es', 'pt', 'da', 'sv', 'nb', 'fi']),
    land: z.enum(['global', 'nl', 'de', 'at', 'ch', 'uk', 'be', 'fr', 'es', 'pt', 'ie', 'lu', 'dk', 'se', 'no', 'fi', 'guides']).default('global'),
    crumb: z.string().optional(), // korte naam in het kruimelpad
    kicker: z.string().optional(), // regel boven de titel
    byline: z.string().optional(), // "Door [AUTEUR] · Bijgewerkt op [DATUM]"
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false), // concept: wordt niet gebouwd
    noindex: z.boolean().default(false),
    vertaling: z.string().optional(), // pad van dezelfde pagina in een andere taal (hreflang); hoeft maar aan één kant
    zoekwoorden: z.string().optional(), // extra zoektermen voor de zoekfunctie (synoniemen, schrijfwijzen), niet zichtbaar
  }),
});

export const collections = { pages };
