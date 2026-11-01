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
