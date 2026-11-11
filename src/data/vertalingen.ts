// Groepen van dezelfde pagina in andere talen of landen (hreflang).
// Pagina's met dezelfde slug in verschillende landmappen (bijv. /de/classpass/ en /at/classpass/) worden automatisch gekoppeld;
// `vertaling` in de frontmatter werkt ook nog. Hier staan de groepen waarvan de slug per taal verschilt.
// De eerste pagina van een groep met '/' is x-default.
export const groepen: string[][] = [
  // Landhomepages
  ['/', '/nl/', '/be/', '/de/', '/at/', '/ch/', '/uk/', '/ie/', '/fr/', '/es/', '/pt/', '/lu/', '/dk/', '/se/', '/no/', '/fi/'],
  // Gidsen
  ['/guides/first-class/', '/nl/eerste-les/', '/de/erstes-training/', '/fr/premier-cours/', '/es/primera-clase/', '/pt/primeira-aula/', '/dk/din-foerste-time/', '/se/ditt-forsta-pass/', '/no/din-forste-time/', '/fi/ensimmainen-tunti/'],
  ['/guides/eating-and-drinking-around-your-workout/', '/nl/eten-en-drinken-rond-je-training/', '/de/essen-und-trinken-rund-ums-training/', '/fr/manger-et-boire-autour-du-sport/', '/es/comer-y-beber-al-entrenar/', '/pt/comer-e-beber-no-treino/', '/dk/mad-og-drikke-omkring-traening/', '/se/mat-och-dryck-kring-traning/', '/no/mat-og-drikke-rundt-trening/', '/fi/syominen-ja-juominen-treenin-ymparilla/'],
  ['/guides/gym-pass-or-membership/', '/nl/sportpas-of-abonnement/', '/de/sportpass-oder-mitgliedschaft/', '/fr/pass-sport-ou-abonnement/', '/es/pase-o-gimnasio/', '/pt/passe-ou-ginasio/', '/dk/traeningspas-eller-fitness/', '/se/traningspass-eller-gym/', '/no/treningspass-eller-treningssenter/', '/fi/treenipassi-vai-salijasenyys/'],
  ['/guides/working-out-as-a-student/', '/nl/sporten-als-student/', '/de/sport-im-studium/', '/fr/sport-etudiant/', '/es/deporte-estudiante/', '/pt/desporto-estudante/', '/dk/traening-som-studerende/', '/se/traning-som-student/', '/no/trening-som-student/', '/fi/opiskelijaliikunta/'],
  ['/guides/classpass-free-trial/', '/nl/classpass-proefperiode/', '/de/classpass-probezeit/', '/fr/essai-classpass/', '/es/prueba-classpass/', '/pt/experimentar-classpass/', '/dk/proev-classpass/', '/se/prova-classpass/', '/no/prov-classpass/', '/fi/classpass-kokeilujakso/'],
  ['/guides/classpass-credits/', '/nl/classpass-credits/', '/de/classpass-credits/', '/fr/credits-classpass/', '/es/creditos-classpass/', '/pt/creditos-classpass/', '/dk/classpass-credits/', '/se/classpass-krediter/', '/no/classpass-kreditter/', '/fi/classpass-krediitit/'],
  ['/guides/classpass-while-travelling/', '/nl/classpass-op-reis/', '/de/classpass-auf-reisen/', '/fr/classpass-en-voyage/', '/es/classpass-de-viaje/', '/pt/classpass-em-viagem/', '/dk/classpass-paa-rejse/', '/se/classpass-pa-resa/', '/no/classpass-pa-reise/', '/fi/classpass-matkoilla/'],
  ['/guides/cancel-or-pause-classpass/', '/nl/classpass-opzeggen/', '/de/classpass-kuendigen/', '/fr/resilier-classpass/', '/es/cancelar-classpass/', '/pt/cancelar-classpass/', '/dk/opsig-classpass/', '/se/saga-upp-classpass/', '/no/si-opp-classpass/', '/fi/classpass-irtisanominen/'],
  ['/nl/urban-sports-club-en-classpass/', '/de/urban-sports-club-und-classpass/', '/fr/urban-sports-club-et-classpass/'],
  // Opzegpagina's van dezelfde keten
  ['/nl/basic-fit-opzeggen/', '/nl/cancel-basic-fit/', '/be/basic-fit-opzeggen/', '/de/basic-fit-kuendigen/', '/fr/resilier-basic-fit/', '/es/baja-basic-fit/'],
  ['/fr/resilier-fitness-park/', '/es/baja-fitness-park/'],
  ['/es/baja-vivagym/', '/pt/cancelar-vivagym/'],
  ['/de/fitness-first-kuendigen/', '/de/cancel-fitness-first-germany/', '/uk/cancel-fitness-first/'],
  ['/uk/cancel-puregym/', '/ch/puregym-kuendigen/'],
  ['/nl/urban-sports-club-opzeggen/', '/de/urban-sports-club-kuendigen/'],
];
