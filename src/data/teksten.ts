// Vaste teksten per taal: advertentiemelding, footer en kruimelpad.
export type Lang = 'nl' | 'de' | 'en';

export const teksten = {
  nl: {
    label: 'Advertentie',
    melding: 'Deze pagina bevat affiliatelinks. Sluit je via ons een abonnement af, dan ontvangen wij een vergoeding. Dat kost jou niets extra.',
    meldingLink: 'Zo werken wij',
    meldingHref: '/disclosure/#nl',
    over: 'FlexGymGuide vergelijkt sportpassen en sportscholen met flexibele abonnementen, per land.',
    footer: [
      { label: 'Over ons', href: '/about/#nl' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Privacy', href: '/privacy/#nl' },
      { label: 'Advertentiemelding', href: '/disclosure/#nl' },
      { label: 'Impressum', href: '/impressum/' },
    ],
    home: 'Home',
  },
  de: {
    label: 'Anzeige',
    melding: 'Diese Seite enthält Affiliate-Links. Schließt du über uns ein Abo ab, erhalten wir eine Provision. Für dich entstehen keine Mehrkosten.',
    meldingLink: 'So arbeiten wir',
    meldingHref: '/disclosure/#de',
    over: 'FlexGymGuide vergleicht Sportpässe und Fitnessstudios mit flexiblen Mitgliedschaften, Land für Land.',
    footer: [
      { label: 'Über uns', href: '/about/#de' },
      { label: 'Kontakt', href: '/contact/' },
      { label: 'Datenschutz', href: '/privacy/#de' },
      { label: 'Werbehinweis', href: '/disclosure/#de' },
      { label: 'Impressum', href: '/impressum/' },
    ],
    home: 'Start',
  },
  en: {
    label: 'Advertising disclosure',
    melding: 'This page contains affiliate links. If you sign up through us, we may earn a commission at no extra cost to you.',
    meldingLink: 'How we work',
    meldingHref: '/disclosure/',
    over: 'FlexGymGuide compares fitness passes and gyms with flexible memberships, country by country.',
    footer: [
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Disclosure', href: '/disclosure/' },
      { label: 'Impressum', href: '/impressum/' },
    ],
    home: 'Home',
  },
} satisfies Record<Lang, unknown>;
