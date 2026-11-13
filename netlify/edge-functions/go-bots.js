// Houdt bots en crawlers weg bij de /go/-links (affiliate).
// Een gewone browser gaat gewoon door naar de redirect in public/_redirects.
// Een bot krijgt een korte 403-pagina, zodat hij geen klik bij Daisycon,
// Tradedoubler of Awin oplevert. Geblokkeerde verzoeken staan in de
// Netlify-log van deze functie (Logs > Edge Functions).

// Woorden die in de user-agent van bots, scrapers en tools voorkomen.
const BOT_UA = new RegExp(
  [
    // algemene kenmerken
    'bot', 'crawl', 'spider', 'slurp', 'scrap', 'archiver', 'preview', 'checker', 'validator', 'monitor', 'uptime',
    // zoekmachines en SEO-tools
    'ahrefs', 'semrush', 'mj12', 'majestic', 'moz\\.com', 'serpstat', 'seokicks', 'sistrix', 'screaming frog', 'seznam',
    'yandex', 'baidu', 'sogou', 'petalsearch', 'qwant', 'mojeek', 'ia_archiver', 'linkdex', 'barkrowler', 'dataforseo',
    // AI-scrapers
    'gptbot', 'chatgpt', 'oai-searchbot', 'claude', 'anthropic', 'ccbot', 'perplexity', 'bytespider', 'amazonbot',
    'cohere', 'diffbot', 'omgili', 'timpibot', 'imagesift', 'youbot', 'meta-external', 'facebookexternalhit',
    // linkvoorbeelden (de in-app-browsers van Instagram, LinkedIn enz. blijven toegestaan)
    'skypeuripreview', 'embedly', 'vkshare', 'iframely',
    // scripts, bibliotheken en headless browsers
    'curl', 'wget', 'python', 'httpx', 'aiohttp', 'scrapy', 'go-http', 'java/', 'okhttp', 'apache-httpclient', 'axios',
    'node-fetch', 'undici', 'got \\(', 'libwww', 'perl', 'ruby', 'php/', 'guzzle', 'postman', 'insomnia', 'httpclient',
    'headless', 'phantomjs', 'puppeteer', 'playwright', 'selenium', 'webdriver', 'lighthouse', 'pagespeed',
    'gtmetrix', 'pingdom', 'statuscake', 'site24x7', 'zgrab', 'masscan', 'nmap', 'nuclei', 'censys', 'expanse',
  ].join('|'),
  'i',
);

// Telefoonmerken met "bot" in de naam, die wel echte mensen zijn.
const GEEN_BOT = /cubot/gi;

export function isBot(request) {
  if (request.method !== 'GET') return 'methode ' + request.method;
  const ua = (request.headers.get('user-agent') || '').trim();
  if (ua.length < 20) return 'lege of korte user-agent';
  if (!/mozilla\/|opera/i.test(ua)) return 'geen browser';
  const treffer = ua.replace(GEEN_BOT, '').match(BOT_UA);
  if (treffer) return 'user-agent: ' + treffer[0];
  // Elke echte browser stuurt een taalvoorkeur mee; veel bots niet.
  if (!request.headers.get('accept-language')) return 'geen accept-language';
  return null;
}

const PAGINA = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>FlexGymGuide</title></head>
<body style="font-family:system-ui,sans-serif;max-width:32rem;margin:3rem auto;padding:0 1rem;line-height:1.5">
<p>This link is only available to visitors using a web browser.</p>
<p><a href="/">FlexGymGuide.com</a></p>
</body></html>`;

export default async (request, context) => {
  const reden = isBot(request);
  if (!reden) return context.next();
  console.log(`geweerd (${reden}): ${new URL(request.url).pathname} | ${request.headers.get('user-agent') || '-'}`);
  return new Response(PAGINA, {
    status: 403,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow',
    },
  });
};

export const config = { path: '/go/*' };
