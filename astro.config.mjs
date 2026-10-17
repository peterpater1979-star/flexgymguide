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
