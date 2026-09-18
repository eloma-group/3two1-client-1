// All business content extracted from the 3Two1 reference site (3two1.pplx.app)
// Brand identity (name "3two1 drinks", pink-coral palette, "The Taste of Passion")
// comes from the client-supplied logo & splash direction.

export const brand = {
  name: '3two1',
  wordmark: '3two1',
  suffix: 'drinks',
  tagline: 'The Taste of Passion',
  regions: 'Australia — New Zealand — Pacific Islands',
  slogan: 'A house of premium spirits, built for trade',
  mission: "Australia's premier independent spirits distributor",
  intent: 'Imported with intent — placed where it belongs',
  acknowledgement:
    '3two1 acknowledges the Whadjuk Noongar people as Traditional Owners of the land on which we work.',
} as const;

export interface NavItem {
  label: string;
  to: string;
}

export const navItems: NavItem[] = [
  { label: 'Our Story', to: '/#story' },
  { label: 'Brands', to: '/#brands' },
  { label: 'Trade', to: '/#trade' },
  { label: 'Bartenders', to: '/#bartenders' },
  { label: 'Contact', to: '/#contact' },
];

export interface MenuChild {
  label: string;
  to: string;
}
export interface MenuEntry {
  label: string;
  to: string;
  children: MenuChild[];
}

export const navMenu: MenuEntry[] = [
  {
    label: 'About',
    to: '/#story',
    children: [
      { label: 'Contact', to: '/#contact' },
      { label: 'Investors', to: '/#story' },
    ],
  },
  {
    label: 'Brands',
    to: '/#brands',
    children: [
      { label: 'Black Tears', to: '/#brands' },
      { label: 'Giffard', to: '/#brands' },
      { label: 'Pueblo Viejo', to: '/#brands' },
      { label: 'Burnt Ends', to: '/#brands' },
      { label: 'Worthy Park', to: '/#brands' },
      { label: 'Whiskey Row', to: '/#brands' },
      { label: 'San Matías', to: '/#brands' },
    ],
  },
  {
    label: 'Cocktail Corner',
    to: '/#bartenders',
    children: [
      { label: 'All Recipes', to: '/#bartenders' },
      { label: 'Giffard', to: '/#bartenders' },
      { label: 'Black Tears', to: '/#bartenders' },
      { label: 'Pueblo Viejo', to: '/#bartenders' },
      { label: 'Burnt Ends', to: '/#bartenders' },
      { label: 'Worthy Park', to: '/#bartenders' },
      { label: 'Whiskey Row', to: '/#bartenders' },
      { label: 'San Matías', to: '/#bartenders' },
    ],
  },
  {
    label: 'Trade',
    to: '/#trade',
    children: [
      { label: 'Bars & Venues', to: '/#trade' },
      { label: 'Bottle Shops', to: '/#trade' },
      { label: 'Cafés', to: '/#trade' },
    ],
  },
  {
    label: 'Events',
    to: '/#trade',
    children: [
      { label: 'Giffard West Cup', to: '/#trade' },
      { label: 'Trade Shows', to: '/#trade' },
      { label: 'Tastings', to: '/#trade' },
      { label: 'Enquiries', to: '/#contact' },
    ],
  },
];

export const hero = {
  eyebrow: "Australia's Premier Liquor Distributor",
  titleLines: ['Premium Distribution &', 'Brand Representation Across', 'Australia, New Zealand & Pacific Island.'],
  body:
    'Distributed across Australia, New Zealand and the Pacific Islands. In every great bar, bottle shop and café.',
  ctaPrimary: 'Request Price List',
  ctaSecondary: 'Download the Portfolio',
} as const;

export interface Brand {
  id: string;
  name: string;
  category: string;
  country: string;
  since?: string;
  tagline: string;
  description: string;
  accolade?: string;
  cta: string;
  image: string;
  hue: string;
}

export const brands: Brand[] = [
  {
    id: 'black-tears',
    name: 'Black Tears',
    category: 'Spiced Rum',
    country: 'Cuba',
    tagline: 'Coffee, cacao, midnight',
    description:
      'A spiced rum built on a coffee-and-cacao profile — dark, aromatic and unmistakably its own. Made to reinvent the rum & cola.',
    cta: 'Explore Black Tears',
    image: '/images/house-black-tears.webp',
    hue: '#7a3346',
  },
  {
    id: 'giffard',
    name: 'Giffard',
    category: 'Liqueurs & Eaux-de-vie',
    country: 'Angers, France',
    since: '1885',
    tagline: 'Fruit, not fashion',
    description:
      'Five generations of distillers in Angers, working with whole fruit. Chosen by sommeliers and head bartenders because they make the cocktail better.',
    accolade: '#7 Bestselling & #8 Top Trending Brand 2026',
    cta: 'Explore Giffard',
    image: '/images/house-giffard.webp',
    hue: '#e0546f',
  },
  {
    id: 'pueblo-viejo',
    name: 'Pueblo Viejo',
    category: 'Blanco Tequila',
    country: 'Jalisco, Mexico',
    tagline: 'Pure blue agave',
    description:
      'A blanco built on blue agave — clean, bright and made for the margarita. The bartender’s working tequila.',
    cta: 'Explore Pueblo Viejo',
    image: '/images/house-pueblo-viejo.webp',
    hue: '#c98a3a',
  },
  {
    id: 'burnt-ends',
    name: 'Burnt Ends',
    category: 'American Whiskey',
    country: 'USA',
    tagline: 'Charred-oak character',
    description:
      'A charred-oak American whiskey with smoke and sweetness in balance. Built for the stirred-down classics.',
    cta: 'Explore Burnt Ends',
    image: '/images/house-burnt-ends.webp',
    hue: '#8a4b2b',
  },
  {
    id: 'worthy-park',
    name: 'Worthy Park',
    category: 'Single Estate Rum',
    country: 'Jamaica',
    tagline: 'Pure Jamaican funk',
    description:
      'Single-estate Jamaican rum with all the funk and depth the island is famous for. From cane to bottle on one estate.',
    cta: 'Explore Worthy Park',
    image: '/images/house-worthy-park.webp',
    hue: '#b08a2e',
  },
  {
    id: 'whiskey-row',
    name: 'Whiskey Row',
    category: 'Whiskey',
    country: 'USA',
    tagline: 'Straight, honest, easy',
    description:
      'An approachable, easy-pouring whiskey built for the well. Straight, honest and made to move.',
    cta: 'Explore Whiskey Row',
    image: '/images/house-whiskey-row.webp',
    hue: '#9c5a34',
  },
  {
    id: 'san-matias',
    name: 'San Matías',
    category: 'Tequila',
    country: 'Jalisco, Mexico',
    since: '1886',
    tagline: 'The second-oldest tequila house in Mexico',
    description:
      'Casa San Matías has been distilling 100% blue agave in the highlands of Jalisco since 1886 — family-owned, quietly excellent. Reposado, Añejo and Extra-Añejo.',
    cta: 'Explore San Matías',
    image: '/images/house-san-matias.webp',
    hue: '#d98a4a',
  },
];

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: '2018', label: 'Established' },
  { value: '7', label: 'Houses in portfolio' },
  { value: '13', label: 'Cities served' },
  { value: '2,700', label: 'Venues and counting' },
];

export interface TradeSegment {
  id: string;
  title: string;
  kicker: string;
  description: string;
  cta: string;
}

export const tradeSegments: TradeSegment[] = [
  {
    id: 'bars',
    title: 'Bars & Venues',
    kicker: 'Behind the stick',
    description:
      'Cocktail-led range, staff training, brand activations and exclusivity windows.',
    cta: 'Discover',
  },
  {
    id: 'bottle-shops',
    title: 'Bottle Shops',
    kicker: 'Earn the shelf',
    description:
      'Range curation, point-of-sale and customer-led category growth.',
    cta: 'Discover',
  },
  {
    id: 'cafes',
    title: 'Cafés',
    kicker: 'Espresso to evening',
    description:
      'Tight, fast-moving SKUs that earn their counter space.',
    cta: 'Discover',
  },
];

export interface Cocktail {
  name: string;
  brand: string;
  ingredients: string;
  desc: string;
}

export const cocktails: Cocktail[] = [
  { name: 'Garden Spritz', brand: 'Giffard', ingredients: 'Giffard Crème de Pêche, Prosecco, soda', desc: 'Bright, low-ABV and built for daytime. Peach liqueur, prosecco and a splash of soda — built in the glass in under 30 seconds.' },
  { name: 'Coffee Cuba Libre', brand: 'Black Tears', ingredients: 'Black Tears Spiced, cola, lime', desc: 'A Havana classic, rebuilt around a coffee-and-cacao rum. Tall over ice with a fat squeeze of lime — house cola does the rest.' },
  { name: "Tommy's Margarita", brand: 'Pueblo Viejo', ingredients: 'Pueblo Viejo Blanco, agave, lime', desc: 'No triple sec, no shortcuts. Blanco tequila, fresh lime and agave — the margarita, purist style.' },
  { name: 'Estate Daiquiri', brand: 'Worthy Park', ingredients: 'Worthy Park Single Estate Rum, lime, sugar', desc: 'Three ingredients, Jamaican funk. Fresh lime, a hard shake on ice — the daiquiri the way the estate drinks it.' },
  { name: 'Smoked Manhattan', brand: 'Burnt Ends', ingredients: 'Burnt Ends American Whiskey, vermouth, bitters', desc: 'Charred-oak whiskey stirred down with sweet vermouth and a whisper of orange bitters. Served over a single inch with a branded cherry.' },
  { name: 'Paloma Brava', brand: 'San Matías', ingredients: 'San Matías Gran Reserva, pink grapefruit, salt', desc: 'Aged tequila stretched long over pink grapefruit soda and a generous pinch of sea salt. The Mexican highball, done properly.' },
];

export const contact = {
  email: 'orders@3two1.com.au',
  phone: '0420 222 313',
  abn: '00 000 000 000',
  licence: '6090012345',
  instagram: 'https://instagram.com',
} as const;

export const footerColumns = [
  {
    title: 'Brands',
    links: brands.map((b) => ({ label: b.name, to: `/#brands` })),
  },
  {
    title: 'Trade',
    links: [
      { label: 'Become a Stockist', to: '/#contact' },
      { label: 'Download Portfolio', to: '/#trade' },
      { label: 'Events', to: '/#trade' },
      { label: 'Rate Card', to: '/#trade' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', to: '/#story' },
      { label: 'Investors', to: '/#story' },
      { label: 'Contact', to: '/#contact' },
    ],
  },
];
