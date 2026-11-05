// Search and social metadata: page titles, meta descriptions and the canonical
// domain. Copy on the pages lives with each page; this file only holds what
// goes in the document head.

/** Canonical origin. Every canonical, og:url and sitemap entry is built on it. */
export const SITE_URL = 'https://www.3two1.com.au';
export const SITE_NAME = '3Two1 Drinks';
export const DEFAULT_IMAGE = '/images/logo.png';

export interface PageMeta {
  title: string;
  description: string;
  image?: string;
}

/** Fixed pages, keyed by path. */
export const pageMeta: Record<string, PageMeta> = {
  '/': {
    title: '3Two1 Drinks | Spirits, Liqueurs & Syrups Distributor AU & NZ',
    description:
      'Independent importer and distributor of premium spirits, liqueurs and syrups for bars, bottle shops and cafés across Australia, New Zealand and the Pacific.',
  },
  '/our-story': {
    title: 'Our Story | Independent Drinks Importer | 3Two1 Drinks',
    description:
      'How 3Two1 Drinks grew into an independent house of premium spirits, liqueurs and syrups, built for the trade across Australia, New Zealand and the Pacific.',
    image: '/images/about-hero-bar.webp',
  },
  '/investors': {
    title: 'Investors | Growth Strategy & Roadmap | 3Two1 Drinks',
    description:
      'The 3Two1 Drinks investor story: our portfolio of premium drinks brands, distribution across Australia and New Zealand, and the roadmap for growth.',
  },
  '/contact': {
    title: 'Contact Us | Wholesale & Trade Enquiries | 3Two1 Drinks',
    description:
      'Open a trade account, place a wholesale order or talk to a 3Two1 Drinks rep. Call 1300 021 321 or email orders@3two1.com.au. Mon–Fri, 8.30am–7pm AEST.',
  },
  '/cocktails': {
    title: 'Cocktail Recipes & Bar Specs | Cocktail Corner | 3Two1 Drinks',
    description:
      'Cocktail recipes, specs and builds from the 3Two1 Drinks portfolio: Giffard, Black Tears, Pueblo Viejo, Worthy Park and more, ready for the back bar.',
  },
  '/events': {
    title: 'Events & Bartender Competitions | 3Two1 Drinks',
    description:
      'Bartender competitions, trade tastings and brand events from 3Two1 Drinks, including the Giffard West Cup, across Australia and New Zealand.',
    image: '/images/pages/events-giffard-west-cup.webp',
  },
  '/portfolio': {
    title: 'Brand Portfolio | Rum, Tequila, Whiskey & Liqueurs | 3Two1 Drinks',
    description:
      'Nine premium drinks brands in one portfolio: Giffard liqueurs and syrups, Black Tears and Worthy Park rum, Pueblo Viejo and San Matías tequila, and more.',
  },
  '/brands/black-tears/cuba-libre': {
    title: 'The Cuba Libre with Black Tears Spiced Rum | 3Two1 Drinks',
    description:
      'The story and recipe of the Cuba Libre, Havana’s rum and cola, made with Black Tears Cuban spiced rum. Distributed in Australia by 3Two1 Drinks.',
    image: '/images/black-tears-cuba-libre-bottle-glass-wide.webp',
  },
};

/** The nine houses, keyed by brand slug. */
export const brandMeta: Record<string, PageMeta> = {
  'black-tears': {
    title: 'Black Tears Cuban Spiced Rum | Wholesale Australia | 3Two1 Drinks',
    description:
      'Black Tears, a dry spiced rum from Cuba with cacao, coffee and Cuban chilli. No added colouring. Stock it in Australia and New Zealand through 3Two1 Drinks.',
    image: '/images/black-tears-dry-spiced-rum-cuba.webp',
  },
  'pueblo-viejo': {
    title: 'Pueblo Viejo Tequila | 100% Agave | Wholesale | 3Two1 Drinks',
    description:
      'Pueblo Viejo 100% blue Weber agave tequila from Jalisco: Blanco, Reposado and Añejo, pot-still distilled. Wholesale for bars and bottle shops via 3Two1 Drinks.',
    image: '/images/pueblo-viejo-blanco-tequila-jalisco-mexico.webp',
  },
  'worthy-park': {
    title: 'Worthy Park Jamaican Rum | Single Estate | 3Two1 Drinks',
    description:
      'Worthy Park single-estate pot-still rum from Lluidas Vale, Jamaica, since 1670, including Rum-Bar Overproof. Distributed in Australia and NZ by 3Two1 Drinks.',
    image: '/images/worthy-park-single-estate-jamaica-rum.webp',
  },
  'san-matias': {
    title: 'Casa San Matías Tequila | Since 1886 | 3Two1 Drinks',
    description:
      'Casa San Matías, the Jalisco highlands tequila house founded in 1886 and still family-run. 100% blue Weber agave. Wholesale in Australia via 3Two1 Drinks.',
    image: '/images/brands/san-matias/bottle-tahona.webp',
  },
  giffard: {
    title: 'Giffard Liqueurs, Syrups & Purées | Wholesale | 3Two1 Drinks',
    description:
      'Giffard of Angers, France, since 1885: fruit liqueurs, 1 L bar syrups, Fruit for Mix purées and alcohol-free bases. Wholesale across Australia and NZ.',
    image: '/images/brand-giffard-cocktail.webp',
  },
  'burnt-ends': {
    title: 'Burnt Ends Blended Whiskey | 45% ABV | 3Two1 Drinks',
    description:
      'Burnt Ends, a smoky blended whiskey of wheated whiskey and spicy rye at 45% ABV, built for highballs and bold food. Distributed in Australia by 3Two1 Drinks.',
    image: '/images/brand-burnt-ends-cocktail.webp',
  },
  'whiskey-row': {
    title: 'Whiskey Row Kentucky Bourbon | Louisville | 3Two1 Drinks',
    description:
      'Whiskey Row small-batch Kentucky bourbon from Louisville, aged in #4 char new American oak and made for cocktails. Wholesale via 3Two1 Drinks.',
    image: '/images/brand-whiskey-row-manhattan.webp',
  },
  'demonio-de-los-andes': {
    title: 'Demonio de los Andes Pisco | Peru | 3Two1 Drinks',
    description:
      'Demonio de los Andes pisco from the Tacama estate in Ica, Peru: single distillation, nothing added. Acholado, Quebranta and Italia, distributed by 3Two1 Drinks.',
    image: '/images/brands/demonio-de-los-andes/lineup.webp',
  },
  thoquino: {
    title: 'Thoquino Cachaça | Brazil Since 1906 | 3Two1 Drinks',
    description:
      'Thoquino cachaça from Rio de Janeiro state, distilled from fresh sugarcane juice since 1906 and made for the Caipirinha. Distributed by 3Two1 Drinks.',
  },
};

/** Giffard shelves (/brands/giffard/range/:shelf). */
export const shelfMeta: Record<string, PageMeta> = {
  liqueurs: {
    title: 'Giffard Liqueurs | Full Range | Wholesale | 3Two1 Drinks',
    description:
      'The full Giffard liqueur range: classic fruit liqueurs and crèmes, the premium range and the original Peppermint Liqueur, all 700 ml from Angers, France.',
  },
  syrups: {
    title: 'Giffard Syrups | 1 L Bar & Coffee Syrups | 3Two1 Drinks',
    description:
      'Giffard 1 L cocktail and coffee syrups: fruits and plants, caramel, nuts, spices and tea bases. Wholesale for bars and cafés in Australia and New Zealand.',
  },
  purees: {
    title: 'Giffard Fruit for Mix Purées | 1 L | 3Two1 Drinks',
    description:
      'Giffard Fruit for Mix purées add real fruit, texture and colour to cocktails, mocktails and smoothies. 1 L packs, wholesale through 3Two1 Drinks.',
  },
  'non-alcoholic': {
    title: 'Giffard Non-Alcoholic Spirits & Liqueurs | 3Two1 Drinks',
    description:
      'Giffard alcohol-free spirit bases and liqueurs for zero-proof Negronis, Margaritas and Spritzes. Wholesale in Australia and New Zealand via 3Two1 Drinks.',
  },
};

/** Trade channels (/trade/:segment). */
export const tradeMeta: Record<string, PageMeta> = {
  'bars-venues': {
    title: 'Bar & Venue Drinks Supplier | Spirits Wholesale | 3Two1 Drinks',
    description:
      'Premium spirits, liqueurs and syrups for bars, pubs and venues: nine brands, weekly deliveries and a dedicated rep. Open a trade account with 3Two1 Drinks.',
  },
  'bottle-shops': {
    title: 'Bottle Shop Wholesale | Premium Spirits Supplier | 3Two1 Drinks',
    description:
      'Stock nine world-class drinks brands your customers ask for by name, with shelf-ready packaging, point-of-sale and category data. Wholesale by 3Two1 Drinks.',
  },
  cafes: {
    title: 'Café Syrups & Purées Supplier | Giffard | 3Two1 Drinks',
    description:
      'Giffard coffee syrups, fruit purées and coffee liqueurs for cafés: one supplier for lattes, smoothies, iced drinks and espresso martinis.',
  },
};

/** Trims text to a meta-description length at a word break. */
export function clip(text: string, max = 158) {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s-]+$/, '')}…`;
}

/** `Name | Qualifier | 3Two1 Drinks`, dropping the qualifier when it would run past what search results show. */
export function productTitle(name: string, qualifier: string) {
  const long = `${name} | ${qualifier} | ${SITE_NAME}`;
  if (long.length <= 65) return long;
  const short = `${name} | ${SITE_NAME}`;
  return short.length <= 65 ? short : name;
}

/** Product meta description: the tagline, then the lede unless it only repeats the
    tagline. Short copy gets a line on where to buy, so the snippet is not left thin. */
export function productDescription(tagline: string, lede: string) {
  const t = tagline.replace(/[.\s]+$/, '');
  const text = lede.startsWith(t) ? lede : `${t}. ${lede}`;
  return clip(text.length < 110 ? `${text} Available wholesale in Australia and New Zealand from 3Two1 Drinks.` : text);
}

export const absoluteUrl = (path: string) => (/^https?:/.test(path) ? path : `${SITE_URL}${path}`);

export const organizationLd = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
};

/** BreadcrumbList JSON-LD from [name, path] pairs. */
export function breadcrumbLd(items: [string, string][]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}
