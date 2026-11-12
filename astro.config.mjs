import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

// Sitemap: <lastmod> per pagina = datum van de laatste commit van het Markdown-bestand.
function wijzigingsdata() {
  const data = new Map();
  for (const f of readdirSync('src/content/pages', { recursive: true })) {
    if (!String(f).endsWith('.md')) continue;
    const bestand = `src/content/pages/${f}`;
    const pad = readFileSync(bestand, 'utf8').match(/^path: "?([^"\n]+)"?$/m)?.[1];
    try {
      const datum = execFileSync('git', ['log', '-1', '--format=%cI', '--', bestand], { encoding: 'utf8' }).trim();
      if (pad && datum) data.set(new URL(pad, 'https://flexgymguide.com').href, datum);
    } catch { /* geen git: dan zonder lastmod */ }
  }
  return data;
}
const lastmod = wijzigingsdata();

// Pagina's met noindex: true horen niet in de sitemap.
function noindexPaden() {
  const paden = new Set();
  for (const f of readdirSync('src/content/pages', { recursive: true })) {
    if (!String(f).endsWith('.md')) continue;
    const tekst = readFileSync(`src/content/pages/${f}`, 'utf8');
    const pad = tekst.match(/^path: "?([^"\n]+)"?$/m)?.[1];
    if (pad && /^noindex: true$/m.test(tekst)) paden.add(new URL(pad, 'https://flexgymguide.com').href);
  }
  return paden;
}
const zonderIndex = noindexPaden();

// Links naar /go/ (affiliate) en naar andere websites openen in een nieuw tabblad.
// /go/-links krijgen rel="sponsored nofollow", zoals ThirstyAffiliates dat deed.
function externeLinks() {
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'a') {
      const href = String(node.properties?.href ?? '');
      if (href.startsWith('/go/')) {
        node.properties.target = '_blank';
        node.properties.rel = ['sponsored', 'nofollow', 'noopener'];
      } else if (/^https?:\/\//.test(href) && !/^https?:\/\/(www\.)?flexgymguide\.com/.test(href)) {
        node.properties.target = '_blank';
        node.properties.rel = ['noopener'];
      }
    }
    // Knoppen staan als HTML in de Markdown en komen hier als ruwe tekst langs.
    if (node.type === 'raw') {
      node.value = node.value.replace(/<a ([^>]*?)href="([^"]+)"([^>]*)>/g, (tag, voor, href, na) => {
        if (/\btarget=/.test(tag)) return tag;
        if (href.startsWith('/go/')) return `<a ${voor}href="${href}"${na} target="_blank" rel="sponsored nofollow noopener">`;
        if (/^https?:\/\//.test(href) && !/^https?:\/\/(www\.)?flexgymguide\.com/.test(href)) return `<a ${voor}href="${href}"${na} target="_blank" rel="noopener">`;
        return tag;
      });
    }
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site: 'https://flexgymguide.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({
    filter: (url) => !url.includes('/contact/thanks/') && !zonderIndex.has(url),
    serialize: (item) => (lastmod.has(item.url) ? { ...item, lastmod: lastmod.get(item.url) } : item),
  })],
  markdown: { rehypePlugins: [externeLinks] },
});
