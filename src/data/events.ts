// Events copy, from the 3Two1 reference site (3two1.pplx.app/events.html).

export const eventsEmail = 'pineapple@3two1.com.au';

export const eventMail = (subject?: string) =>
  `mailto:${eventsEmail}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

export const westCup = {
  // The day in February is still TBC. The page shows the month only; the
  // countdown runs to the first of the month until a date is set.
  date: '2028-02-01',
  startsAt: '2028-02-01T18:00:00+08:00',
  when: 'February 2028 · National',
  body: [
    "Australia's classic-cocktail benchmark, returning to Australia for the eighth year. State heats in June. National final at a venue to be announced - the winner heads to Angers, France in September for the Giffard West Cup International.",
    'Open to working trade only. Registrations open in July.',
  ],
  subject: 'Giffard West Cup 2028',
};

export interface TradeEvent {
  date: string; // ISO, so the calendar can tell what has already happened
  /** The day isn't fixed yet: the badge shows the month and "TBC". */
  dayTbc?: boolean;
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
    city: 'National',
    title: 'Q1 portfolio walk-through',
    body: 'Nine brands, four hours, the full 2026 range tasted side by side. Bar teams welcome.',
    action: 'RSVP',
    subject: 'Q1 Walkthrough',
    image: '/images/about-numbers-pour.webp',
  },
  {
    date: '2026-05-04',
    city: 'Melbourne',
    title: 'San Matías masterclass',
    body: "Casa San Matías' export ambassador joins us to walk the back-bar through highland tequila.",
    action: 'RSVP',
    subject: 'San Matias Masterclass',
    image: '/images/brands/san-matias/agave-valley.webp',
  },
  {
    date: '2026-06-17',
    city: 'Sydney',
    title: 'Worthy Park dinner',
    body: 'Five-course paired dinner with the Worthy Park family - a deep dive into Jamaican single-estate rum.',
    action: 'RSVP',
    subject: 'Worthy Park Dinner',
    image: '/images/brands/worthy-park/serve-mai-tai.webp',
  },
  {
    date: '2026-08-02',
    city: 'Perth',
    title: 'Giffard West Cup - Asia Pacific final',
    body: '',
    action: 'RSVP',
    subject: 'GWC WA Heats',
    image: '/images/brands/giffard/bartender.webp',
  },
  {
    date: '2028-02-01',
    dayTbc: true,
    city: 'National',
    title: 'Giffard West Cup - International final',
    body: "The grand final of Australia's premier classic-cocktail competition. Venue announced August.",
    action: 'Save the date',
    subject: 'GWC Final',
    image: '/images/pages/events-giffard-west-cup.webp',
  },
];
