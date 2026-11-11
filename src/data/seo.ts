// Hulpjes voor zoekmachines: taal + land (hreflang, og:locale) en de datum van de laatste wijziging (uit git).
import { execFileSync } from 'node:child_process';

const landcode: Record<string, string> = { nl: 'NL', de: 'DE', at: 'AT', ch: 'CH', uk: 'GB', be: 'BE', fr: 'FR', es: 'ES', pt: 'PT', ie: 'IE', lu: 'LU', dk: 'DK', se: 'SE', no: 'NO', fi: 'FI' };

/** "nl-NL", "en-NL", "de-AT"; zonder land (gidsen, algemene pagina's) alleen de taal. */
export const hreflang = (lang: string, land: string) => (landcode[land] ? `${lang}-${landcode[land]}` : lang);
export const ogLocale = (lang: string, land: string) => (landcode[land] ? `${lang}_${landcode[land]}` : { en: 'en_GB', pt: 'pt_PT' }[lang] ?? lang);

/** Datum van de laatste commit van een bestand, of undefined als git er niet is. */
const cache = new Map<string, string | undefined>();
export function gewijzigd(bestand?: string): string | undefined {
  if (!bestand) return undefined;
  if (!cache.has(bestand)) {
    let datum: string | undefined;
    try { datum = execFileSync('git', ['log', '-1', '--format=%cI', '--', bestand], { encoding: 'utf8' }).trim() || undefined; } catch { datum = undefined; }
    cache.set(bestand, datum);
  }
  return cache.get(bestand);
}

export const organisatie = { '@type': 'Organization', '@id': 'https://flexgymguide.com/#organisatie', name: 'FlexGymGuide', url: 'https://flexgymguide.com/', logo: 'https://flexgymguide.com/favicon.svg' };

/** Alle pagina's die dezelfde pagina zijn in een andere taal of ander land (inclusief de pagina zelf), voor hreflang.
 *  Bronnen: src/data/vertalingen.ts, dezelfde slug in verschillende landmappen, en `vertaling` in de frontmatter. */
type Taalpagina = { path: string; lang: string; land: string };
let groepCache: Promise<Map<string, Taalpagina[]>> | undefined;
export function hreflangGroep(path: string): Promise<Taalpagina[]> {
  groepCache ??= maakGroepen();
  return groepCache.then((m) => m.get(path) ?? []);
}
async function maakGroepen() {
  const { getCollection } = await import('astro:content');
  const { groepen } = await import('./vertalingen');
  const paginas = (await getCollection('pages', (p) => !p.data.draft && !p.data.noindex)).map((p) => p.data);
  const per = new Map(paginas.map((p) => [p.path, p]));
  const ouder = new Map<string, string>();
  const wortel = (x: string): string => { while (ouder.has(x)) x = ouder.get(x)!; return x; };
  const koppel = (a: string, b: string) => { if (!per.has(a) || !per.has(b)) return; const ra = wortel(a), rb = wortel(b); if (ra !== rb) ouder.set(rb, ra); };
  for (const g of groepen) {
    for (const p of g) if (!per.has(p)) throw new Error(`vertalingen.ts: pagina ${p} bestaat niet (of is noindex/concept)`);
    g.slice(1).forEach((p) => koppel(g[0], p));
  }
  const perSlug = new Map<string, string>();
  for (const p of paginas) {
    const m = p.path.match(/^\/([a-z]{2})\/([^/]+)\/$/);
    if (!m || !(m[1] in landcode)) continue;
    if (perSlug.has(m[2])) koppel(perSlug.get(m[2])!, p.path); else perSlug.set(m[2], p.path);
    if (p.vertaling) koppel(p.path, p.vertaling);
  }
  const uit = new Map<string, Taalpagina[]>();
  for (const p of paginas) {
    const r = wortel(p.path);
    if (!uit.has(r)) uit.set(r, []);
    uit.get(r)!.push(p);
  }
  const res = new Map<string, Taalpagina[]>();
  for (const g of uit.values()) {
    const codes = g.map((p) => hreflang(p.lang, p.land));
    const dubbel = codes.find((c, i) => codes.indexOf(c) !== i);
    if (dubbel) throw new Error(`hreflang ${dubbel} komt twee keer voor in groep: ${g.map((p) => p.path).join(', ')}`);
    for (const p of g) res.set(p.path, g);
  }
  return res;
}
