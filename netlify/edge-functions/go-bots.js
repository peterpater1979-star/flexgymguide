// Houdt bots en crawlers weg bij de /go/-links (affiliate), voor alle netwerken.
// 1. Bekende bots (user-agent, geen taal, HEAD enz.) krijgen een 403.
// 2. Wie nog geen fgg_go-cookie heeft, krijgt eerst een JavaScript-tussenstap
//    (CONTROLE): een echte browser zet de cookie en laadt de link meteen opnieuw.
// 3. Met cookie gaat het verzoek door naar de redirect in public/_redirects.
// Zo levert een bot geen klik op bij Daisycon, Tradedoubler of Awin.
// Alles staat in de Netlify-log van deze functie (Logs > Edge Functions).

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

const HTML_KOP = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>FlexGymGuide</title></head>
<body style="font-family:system-ui,sans-serif;max-width:32rem;margin:3rem auto;padding:0 1rem;line-height:1.5">`;

const GEWEIGERD = `${HTML_KOP}
<p>This link is only available to visitors using a web browser.</p>
<p><a href="/">FlexGymGuide.com</a></p>
</body></html>`;

// Tussenstap voor wie nog geen cookie heeft: een echte browser zet met JavaScript
// een cookie en laadt dezelfde /go/-link meteen opnieuw. Bots die geen JavaScript
// uitvoeren (de meeste crawlers) of zich als automatisering melden
// (navigator.webdriver) komen niet verder en leveren dus geen klik op.
const CONTROLE = `${HTML_KOP}
<p id="t">One moment…</p>
<noscript><p>Please enable JavaScript to continue.</p></noscript>
<script>
(function () {
  var t = document.getElementById('t');
  if (navigator.webdriver) { t.textContent = 'This link is only available to visitors using a web browser.'; return; }
  document.cookie = 'fgg_go=1; Max-Age=2592000; Path=/go/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
  if (document.cookie.indexOf('fgg_go=1') === -1) { t.textContent = 'Please allow cookies for this site to continue.'; return; }
  location.replace(location.href);
})();
</script>
</body></html>`;

const KOPPEN = {
  'content-type': 'text/html; charset=utf-8',
  'cache-control': 'no-store',
  'x-robots-tag': 'noindex, nofollow',
};

export default async (request, context) => {
  const pad = new URL(request.url).pathname;
  const ua = request.headers.get('user-agent') || '-';
  const reden = isBot(request);
  if (reden) {
    console.log(`geweerd (${reden}): ${pad} | ${ua}`);
    return new Response(GEWEIGERD, { status: 403, headers: KOPPEN });
  }
  if (/(?:^|;\s*)fgg_go=1(?:;|$)/.test(request.headers.get('cookie') || '')) {
    console.log(`doorgestuurd: ${pad}`);
    return context.next();
  }
  console.log(`controle getoond: ${pad} | ${ua}`);
  return new Response(CONTROLE, { status: 200, headers: KOPPEN });
};

export const config = { path: '/go/*' };
