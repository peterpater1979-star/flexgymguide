# FlexGymGuide: afspraken

- Antwoord en schrijf commitberichten in het Nederlands. Paginateksten in de taal van de pagina (`lang`).
- Nieuwe of gewijzigde pagina's gaan via een pull request; Peter bekijkt de Netlify-voorbeeldlink en merget zelf. Nooit direct naar `main` pushen.
- Elke merge naar `main` kost Netlify-credits (15 per livegang). Bundel wijzigingen in één pull request.
- Prijzen en aantallen die Peter niet heeft gecontroleerd blijven plaatshouders: `[PRIJS]`, `[AANTAL]` (EN: `[PRICE]`, `[NUMBER]`; DE: `[PREIS]`, `[ANZAHL]`).
- Affiliatelinks alleen via `/go/`-links uit `public/_redirects`, met label `fgg-[land]-[pagina]` (`epi` voor Tradedoubler, `clickref` voor Awin, `subId1` voor Impact). Sportscholen zonder goedgekeurd programma krijgen een gewone link naar hun eigen site.
- De advertentiemelding komt automatisch op pagina's met een `/go/`-link; niet handmatig toevoegen.
- Na elke wijziging: `npm run build && npm run check`.
