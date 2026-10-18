import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  integrations: [sitemap({ filter: (url) => !url.includes('/contact/thanks/') })],
  markdown: { rehypePlugins: [externeLinks] },
});
