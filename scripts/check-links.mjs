// Controleert na `npm run build` of alle interne links en ankers in dist/ bestaan,
// en of elke /go/-link een regel heeft in public/_redirects.
import fs from 'node:fs';
import path from 'node:path';

const dist = 'dist';
const files = fs.readdirSync(dist, { recursive: true }).filter((f) => f.endsWith('.html'));
const go = fs.readFileSync('public/_redirects', 'utf8').split('\n').filter((l) => l.startsWith('/go/')).map((l) => l.split(/\s+/)[0]);
const ids = {};
for (const f of files) ids['/' + f.replace(/index\.html$/, '').replace(/\\/g, '/')] = new Set([...fs.readFileSync(path.join(dist, f), 'utf8').matchAll(/ id="([^"]+)"/g)].map((m) => m[1]));
let fouten = 0;
for (const f of files) {
  const page = '/' + f.replace(/index\.html$/, '').replace(/\\/g, '/');
  for (const [, href] of fs.readFileSync(path.join(dist, f), 'utf8').matchAll(/ href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|\/_astro\/|\/favicon|\/sitemap)/.test(href)) continue;
    const [p, hash] = href.replace(/&amp;/g, '&').split('?')[0].split('#');
    const doel = p || page;
    if (doel.startsWith('/go/')) { if (!go.includes(doel)) { console.log(`${page}: geen redirect voor ${href}`); fouten++; } continue; }
    if (!ids[doel]) { console.log(`${page}: pagina bestaat niet: ${href}`); fouten++; continue; }
    if (hash && !ids[doel].has(hash)) { console.log(`${page}: anker ontbreekt: ${href}`); fouten++; }
  }
}
console.log(fouten ? `${fouten} probleem/problemen` : `Alle links in ${files.length} pagina's kloppen`);
process.exit(fouten ? 1 : 0);
