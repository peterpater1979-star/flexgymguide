# flexgymguide.com

Affiliatesite over flexibel sporten (sportpassen en sportscholen) per land. Gebouwd met [Astro](https://astro.build) en gehost op Netlify, net als myanmarreizen.com.

## Werken aan de site

```bash
npm install
npm run dev      # lokaal bekijken op http://localhost:4321
npm run build    # bouwt naar dist/
npm run check    # na de build: controleert interne links, ankers en /go/-links
```

## Inhoud

- Elke pagina is een Markdown-bestand in `src/content/pages/`. `path` in de kop is de URL.
- `lang` (nl, de, en) bepaalt de taal van de pagina, de advertentiemelding en de footer. `land` bepaalt welk landmenu oplicht.
- `draft: true` = concept: de pagina wordt niet gebouwd. Nieuwe pagina's gaan via een pull request; Netlify maakt daar een voorbeeldlink van. Pas na de merge staat de pagina live.
- Plaatshouders zoals `[PRIJS]`, `[AANTAL]`, `[AUTEUR]` en `[DATUM]` blijven staan tot de cijfers gecontroleerd zijn.
- Bouwstenen in de tekst (HTML in Markdown): `<div class="kolommen">` met `<div class="kolom">` of `kolom kaart`, `<div class="aanbieder">`, `<div class="knoppen">` met `<a class="knop knop-affiliate">` of `knop knop-rand`, `<p class="kicker">`, `<p class="klein">`, en `<details>` voor veelgestelde vragen.
- Menu: `src/data/menu.json`. Vaste teksten per taal (advertentiemelding, footer): `src/data/teksten.ts`.

## Affiliatelinks (/go/)

- Staan in `public/_redirects` (vervangt ThirstyAffiliates). Het label gaat mee: `/go/classpass-nl/?epi=fgg-nl-amsterdam`.
- Na goedkeuring van een programma vervang je alleen de bestemming in `_redirects`; de pagina's blijven gelijk.
- Elke pagina met een `/go/`-link krijgt automatisch de advertentiemelding bovenaan, en de link krijgt `rel="sponsored nofollow"`.
- `/go/classpass/` stuurt per land door (Netlify `Country=`), voor de Engelse guides.

## Bronnen

De eerste acht pagina's zijn omgezet uit de WordPress-blokbestanden van 11 oktober 2026.
