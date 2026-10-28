// Copy for the three trade-segment pages, from the 3Two1 reference site
// (3two1.pplx.app/trade-*.html). One page component renders all three.

export interface TradeSegment {
  slug: string;
  label: string;
  title: { before: string; accent: string; after?: string };
  lede: string;
  image: string;
  reasonsTitle: { before: string; accent: string; after: string };
  reasons: { icon: 'range' | 'people' | 'margin' | 'shelf' | 'pos' | 'growth' | 'skus' | 'coffee' | 'waste'; title: string; body: string }[];
  products: { brand: string; kind: string; name: string; body: string; image: string; to: string }[];
  quote: { text: string; cite: string };
  steps: { title: string; body: string }[];
  cta: { title: { before: string; accent: string; after: string }; body: string; placeholder: string };
}

const IMG = {
  giffard: '/images/brand-giffard-cocktail.webp',
  worthyPark: '/images/worthy-park-single-estate-jamaica-rum.webp',
  sanMatias: '/images/brands/san-matias/bottle-tahona.webp',
  sanMatiasAnejo: '/images/brands/san-matias/bottle-tahona-anejo.webp',
  sanMatiasBlanco: '/images/brands/san-matias/bottle-cristal.webp',
  blackTears: '/images/black-tears-dry-spiced-rum-cuba.webp',
};

export const tradeSegments: TradeSegment[] = [
  {
    slug: 'bars-venues',
    label: 'For Bars & Venues',
    title: { before: 'Built for the', accent: 'back-bar.' },
    lede:
      'From Northbridge cocktail rooms to neighbourhood pubs - seven premium brands, weekly drops, and a rep who actually picks up the phone.',
    image: '/images/pages/trade-bars-venues.webp',
    reasonsTitle: { before: 'Three reasons your', accent: 'cocktail menu', after: 'grows.' },
    reasons: [
      {
        icon: 'range',
        title: 'Range that pulls weight',
        body: 'From back-bar workhorses to one-bottle headliners - Giffard, Worthy Park, Pueblo Viejo and the rest of the seven, all under one PO.',
      },
      {
        icon: 'people',
        title: 'Service from people who pour',
        body: 'Brand training, menu consults, masterclass nights, takeover support. Your rep used to work behind a stick - they know what the floor needs.',
      },
      {
        icon: 'margin',
        title: 'Margins that work',
        body: 'Volume tiering, exclusivity windows on hero SKUs, and direct-import pricing - every dollar that should sit in your venue, does.',
      },
    ],
    products: [
      { brand: 'Giffard', kind: 'Liqueur', name: 'Crème de Pamplemousse Rosé', body: 'Pink grapefruit, palomas, low-ABV serves. The bottle that lifts a tropical menu.', image: IMG.giffard, to: '/brands/giffard' },
      { brand: 'Worthy Park', kind: 'Rum', name: 'Single Estate Reserve', body: 'Jamaican pot-still funk. Daiquiris with bite, old-fashioneds with weight.', image: IMG.worthyPark, to: '/brands/worthy-park' },
      { brand: 'San Matías', kind: 'Tequila', name: 'Reposado · Highland Agave', body: "Mexico's second-oldest tequila house. Margaritas with a soul, Old-Fashioned riffs with bite.", image: IMG.sanMatias, to: '/brands/san-matias' },
      { brand: 'Black Tears', kind: 'Spiced Rum', name: 'Cuban Spiced Rum', body: 'Coffee, cocoa and cinnamon over Cuban rum. The new Daiquiri pour, the better Espresso Martini.', image: IMG.blackTears, to: '/brands/black-tears' },
    ],
    quote: {
      text: 'One distributor, one delivery day, seven brands worth pouring. We rebuilt our spirit list around the 3Two1 portfolio in a weekend - and our cocktail margin moved 6 points.',
      cite: 'Bar Manager · A neighbourhood bar in Perth',
    },
    steps: [
      { title: 'Apply', body: "Two-minute form. Send your liquor licence and a contact for accounts. We'll come back within a business day." },
      { title: 'Approved', body: "Trade pricing, credit terms and your dedicated rep - locked in. We'll arrange a tasting with your bar team." },
      { title: 'Order via portal', body: 'One PO, seven brands, weekly delivery to Perth metro. Regional and national freight on schedule.' },
    ],
    cta: {
      title: { before: 'Pour', accent: 'better', after: 'next quarter.' },
      body: "Drop your details - we'll send the rate card, organise a tasting and get a first delivery on the next run.",
      placeholder: 'venue@email.com',
    },
  },
  {
    slug: 'bottle-shops',
    label: 'For Bottle Shops',
    title: { before: 'Built for the', accent: 'shelf.' },
    lede:
      'Seven world-class brands your customers ask for by name. Shelf-ready packaging, point-of-sale that earns its space, and category data when the merchant asks.',
    image: '/images/pages/trade-bottle-shops.webp',
    reasonsTitle: { before: 'Three reasons your', accent: 'top shelf', after: 'moves.' },
    reasons: [
      {
        icon: 'shelf',
        title: 'A curated premium tier',
        body: 'Black Tears, Worthy Park, Pueblo Viejo, San Matías - seven brands chosen to lift the top shelf without bloating it.',
      },
      {
        icon: 'pos',
        title: 'Point-of-sale that sells',
        body: 'Shelf-talkers, neckers, branded glassware, in-store tastings. We turn up with the kit - and the team to install it.',
      },
      {
        icon: 'growth',
        title: 'Customer-led category growth',
        body: 'Premium spirits is the category growing in independents. We bring the SKUs, you bring the curation - repeat purchase does the rest.',
      },
    ],
    products: [
      { brand: 'Giffard', kind: 'Liqueur', name: 'Crème de Pamplemousse Rosé', body: 'The bottle that gets noticed in the liqueur set. Visual hook, real shelf-mover.', image: IMG.giffard, to: '/brands/giffard' },
      { brand: 'Worthy Park', kind: 'Rum', name: 'Single Estate Reserve', body: 'The rum your educated customer wants - and the educated customer is the one buying.', image: IMG.worthyPark, to: '/brands/worthy-park' },
      { brand: 'San Matías', kind: 'Tequila', name: 'Añejo · 18mo oak', body: 'The bottle that converts whisky drinkers - dried fruit, leather, caramel. Premium gift-pack ready.', image: IMG.sanMatiasAnejo, to: '/brands/san-matias' },
      { brand: 'Black Tears', kind: 'Spiced Rum', name: 'Cuban Spiced', body: 'Coffee-and-cocoa-led Cuban spiced rum. Self-merchandising on the dark-rum shelf, sells before staff need to talk.', image: IMG.blackTears, to: '/brands/black-tears' },
    ],
    quote: {
      text: "Premium category was static for two years. We brought 3Two1's seven brands in over a quarter - premium spirits did 18% more revenue against the same shelf footprint.",
      cite: 'Owner · An independent bottle shop in WA',
    },
    steps: [
      { title: 'Apply', body: "Two-minute form. Send your packaged-liquor licence and a contact for accounts. We'll come back within a business day." },
      { title: 'Approved', body: "Trade pricing, credit terms and your dedicated rep - locked in. We'll arrange a tasting with your floor team." },
      { title: 'Order via portal', body: 'One PO, seven brands, weekly drops with case-pack pricing. Direct national freight for multi-store groups.' },
    ],
    cta: {
      title: { before: 'Premiumise the', accent: 'shelf.', after: '' },
      body: "Drop your store details - we'll send the rate card, the merchandising kit and a sample box to taste the range with your floor team.",
      placeholder: 'store@email.com',
    },
  },
  {
    slug: 'cafes',
    label: 'For Cafés',
    title: { before: 'Built for', accent: 'espresso to evening.' },
    lede:
      'A handful of bottles that earn their counter space - espresso martinis after lunch, Irish coffees through winter, dessert pairings every weekend service.',
    image: '/images/pages/trade-cafes.webp',
    reasonsTitle: { before: 'Three reasons your', accent: 'after-lunch trade', after: 'grows.' },
    reasons: [
      {
        icon: 'skus',
        title: 'Tight, considered SKUs',
        body: 'Six bottles, not sixty. Giffard liqueurs, San Matías tequila and Worthy Park rum cover 90% of café cocktails without burying your back counter.',
      },
      {
        icon: 'coffee',
        title: 'Espresso martini, perfected',
        body: 'Coffee-liqueur training, recipe cards for your baristas, and the cocktail-coffee pairing kit. The drink that turns a Wednesday lunch into a Friday-night ticket.',
      },
      {
        icon: 'waste',
        title: 'Fast-moving, low waste',
        body: 'Liqueurs that turn over weekly, half-bottles where they make sense, no slow-moving tail. Counter space stays tight, margin stays sharp.',
      },
    ],
    products: [
      { brand: 'Giffard', kind: 'Liqueur', name: 'Crème de Pamplemousse Rosé', body: 'The pretty bottle behind the espresso machine. A signature spritz with one twist of the wrist.', image: IMG.giffard, to: '/brands/giffard' },
      { brand: 'Worthy Park', kind: 'Rum', name: 'Single Estate Reserve', body: 'For the Irish coffee that customers travel for. Pot-still depth in every cup.', image: IMG.worthyPark, to: '/brands/worthy-park' },
      { brand: 'San Matías', kind: 'Tequila', name: 'Blanco · Highland Agave', body: 'The Tequila Sunset and Paloma upgrade. Bright, herbaceous, friendly to a single-source citrus pairing.', image: IMG.sanMatiasBlanco, to: '/brands/san-matias' },
      { brand: 'Black Tears', kind: 'Spiced Rum', name: 'Cuban Spiced', body: "Cuban spiced rum with coffee, cocoa and cinnamon. The Espresso Martini upgrade you don't have to explain.", image: IMG.blackTears, to: '/brands/black-tears' },
    ],
    quote: {
      text: 'We added five spirits and a coffee liqueur. Espresso martini sales tripled inside two months - and we kept our counter footprint the same.',
      cite: 'Owner · A specialty café in Fremantle',
    },
    steps: [
      { title: 'Apply', body: "Two-minute form. Send your on-premise licence and a contact for accounts. We'll come back within a business day." },
      { title: 'Approved', body: "Trade pricing, credit terms and your dedicated rep - locked in. We'll arrange a tasting and an espresso-martini training session with your barista team." },
      { title: 'Order via portal', body: "Small-case pricing, weekly delivery to Perth metro. No minimum that doesn't suit a single-counter venue." },
    ],
    cta: {
      title: { before: 'From', accent: 'espresso', after: 'to evening.' },
      body: "Drop your café details - we'll send the small-footprint range, the espresso martini training kit, and a starter pack on the next run.",
      placeholder: 'cafe@email.com',
    },
  },
];

export const tradeSegment = (slug: string) => tradeSegments.find((s) => s.slug === slug);
