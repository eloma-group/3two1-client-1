// Single-product pages (/brands/:house/:product) for the bottles and serves
// shown in each house's panel on the homepage. One template renders them all;
// each house brings its own palette (theme) and wording.
import { giffardProducts } from './giffardProducts';
import { puebloViejoProducts } from './puebloViejoProducts';
import { whiskeyRowProducts } from './whiskeyRowProducts';

export interface ProductImage { src: string; alt: string; caption: string }

export interface HouseProduct {
  slug: string;
  label: string;
  fullName: string;
  /** e.g. Liqueur, Syrup, Tequila, Cocktail. Cocktail pages read as a serve, not a bottle. */
  category: string;
  /** Scene used on the homepage panel. */
  image: string;
  imageAlt: string;
  /** Hero and profile accent. */
  accent: string;
  tagline: string;
  lede: string;
  facts: { value: string; label: string }[];
  about: string[];
  /** The fruit, botanical or history behind the product. */
  fruit: { heading: string; paras: string[]; image: ProductImage | null };
  tasting: { appearance: string | null; nose: string | null; palate: string | null; finish: string | null };
  profile: { label: string; value: number; note: string }[];
  cocktails: {
    name: string;
    glass: string;
    ice: string;
    garnish: string;
    spec: { amount: string; unit: string; what: string }[];
    method: string[];
    note: string;
    source: string;
  }[];
  uses: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  gallery: ProductImage[];
  credits: { file: string; author: string; licence: string; url: string }[];
  sources: string[];
}

export interface House {
  slug: string;
  name: string;
  /** Hero eyebrow, e.g. "Maison Giffard". */
  kicker: string;
  theme: 'giffard' | 'puebloViejo' | 'whiskeyRow';
  /** Section label for the `fruit` block on bottle pages. */
  storyLabel: string;
  /** Shown in place of the raw category in the hero eyebrow. */
  categoryLabel?: Record<string, string>;
  /** "From the same shelf" lists only products of the same category. */
  shelfByCategory: boolean;
  products: HouseProduct[];
}

/** Categories that carry no alcohol, so the page skips the responsible-drinking line. */
export const ALCOHOL_FREE = ['Syrup', 'Puree', 'Non-Alcoholic'];

export const houses: Record<string, House> = {
  giffard: {
    slug: 'giffard',
    name: 'Giffard',
    kicker: 'Maison Giffard',
    theme: 'giffard',
    storyLabel: 'The fruit',
    categoryLabel: { Puree: 'Fruit for Mix', 'Non-Alcoholic': 'Alcohol-free' },
    shelfByCategory: true,
    products: giffardProducts,
  },
  'pueblo-viejo': {
    slug: 'pueblo-viejo',
    name: 'Pueblo Viejo',
    kicker: 'Pueblo Viejo · Jalisco',
    theme: 'puebloViejo',
    storyLabel: 'The agave',
    shelfByCategory: false,
    products: puebloViejoProducts,
  },
  'whiskey-row': {
    slug: 'whiskey-row',
    name: 'Whiskey Row',
    kicker: 'Whiskey Row · Kentucky',
    theme: 'whiskeyRow',
    storyLabel: 'The story',
    shelfByCategory: false,
    products: whiskeyRowProducts,
  },
};

export const houseProduct = (house: string | undefined, slug: string | undefined) => {
  const h = house ? houses[house] : undefined;
  const p = h?.products.find((x) => x.slug === slug);
  return h && p ? { house: h, product: p } : undefined;
};
