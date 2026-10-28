// Events copy, from the 3Two1 reference site (3two1.pplx.app/events.html).

export const eventsEmail = 'events@3two1.com.au';

export const eventMail = (subject?: string) =>
  `mailto:${eventsEmail}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

export const westCup = {
  date: '2026-10-14',
  // Final starts in the evening, Perth time.
  startsAt: '2026-10-14T18:00:00+08:00',
  when: '14 October 2026 · Perth',
  body: [
    "Australia's classic-cocktail benchmark, returning to Perth for the eighth year. State heats from August. National final at a venue to be announced - winners head to Angers, France for the Giffard West Cup International.",
    'Open to working trade only. Registrations open in July.',
  ],
  subject: 'Giffard West Cup 2026',
};

export interface TradeEvent {
  date: string; // ISO, so the calendar can tell what has already happened
  city: string;
  title: string;
  body: string;
  action: string;
  subject: string;
  image: string;
}

export const tradeEvents: TradeEvent[] = [
  {
    date: '2026-03-12',
    city: 'Perth',
    title: 'Q1 portfolio walk-through · Online',
    body: 'Seven brands, four hours, the full 2026 range tasted side by side. Bar teams welcome.',
    action: 'RSVP',
    subject: 'Q1 Walkthrough',
    image: '/images/about-numbers-pour.webp',
  },
  {
    date: '2026-05-04',
    city: 'Melbourne',
    title: 'San Matías masterclass · Bar Liberty',
    body: "Casa San Matías' export ambassador joins us to walk the back-bar through highland tequila.",
    action: 'RSVP',
    subject: 'San Matias Masterclass',
    image: '/images/brands/san-matias/agave-valley.webp',
  },
  {
    date: '2026-06-17',
    city: 'Sydney',
    title: "Worthy Park dinner · Tio's Cerveceria",
    body: 'Five-course paired dinner with the Worthy Park family - a deep dive into Jamaican single-estate rum.',
    action: 'RSVP',
    subject: 'Worthy Park Dinner',
    image: '/images/brands/worthy-park/serve-mai-tai.webp',
  },
  {
    date: '2026-08-02',
    city: 'Perth',
    title: 'Giffard West Cup - WA heats open',
    body: "Three weeks of heats across Perth's best back-bars. Working trade only.",
    action: 'RSVP',
    subject: 'GWC WA Heats',
    image: '/images/brands/giffard/bartender.webp',
  },
  {
    date: '2026-10-14',
    city: 'Perth',
    title: 'Giffard West Cup - National final',
    body: "The grand final of Australia's premier classic-cocktail competition. Venue announced August.",
    action: 'Save the date',
    subject: 'GWC Final',
    image: '/images/pages/events-giffard-west-cup.webp',
  },
];
