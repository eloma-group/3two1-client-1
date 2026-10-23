// The four Giffard shelves (/brands/giffard/range/:shelf): every bottle 3Two1 carries,
// grouped the way the 2027 portfolio lists them.
import { houses, type HouseProduct } from './houseProducts';

export interface GiffardShelf {
  slug: string;
  label: string;
  /** HouseProduct.category this shelf lists. */
  category: string;
  /** Singular/plural noun for counts, e.g. "36 liqueurs". */
  noun: [string, string];
  lede: string;
  /** Sub-shelves in display order. */
  groups: string[];
}

export const giffardShelves: GiffardShelf[] = [
  {
    slug: 'liqueurs',
    label: 'Liqueurs',
    category: 'Liqueur',
    noun: ['liqueur', 'liqueurs'],
    lede: 'Classic fruit liqueurs and fruit creams, the premium terroir range and the Peppermint Liqueur Émile Giffard first made in 1885. All 700 ml, all made in Angers.',
    groups: ['Classic', 'Premium', 'Peppermint 1885'],
  },
  {
    slug: 'syrups',
    label: 'Syrups',
    category: 'Syrup',
    noun: ['syrup', 'syrups'],
    lede: 'Concentrated 1 L syrups built for the back bar: fruits and plants, confectionery, nuts and spices, and the specialty bases. They fit a speed rail and take a pump.',
    groups: ['Fruits & Plants', 'Confectionery, Nuts & Spices', 'Specialties'],
  },
  {
    slug: 'purees',
    label: 'Purées',
    category: 'Puree',
    noun: ['purée', 'purées'],
    lede: 'Fruit for Mix: 1 L fruit preparations that add real fruit, texture and colour to cocktails, mocktails and smoothies.',
    groups: ['Fruit for Mix'],
  },
  {
    slug: 'non-alcoholic',
    label: 'Non-Alcoholic',
    category: 'Non-Alcoholic',
    noun: ['bottle', 'bottles'],
    lede: 'Alcohol-free spirit bases and liqueurs with the depth of the originals, for zero-proof Negronis, Margaritas and Spritzes.',
    groups: ['Alcohol-Free Bases', 'Alcohol-Free Liqueurs'],
  },
];

/* The hand-written product pages predate the range, so their sub-shelf lives here. */
const GROUP: Record<string, string> = {
  'apricot-liqueur': 'Premium',
  'caribbean-pineapple-liqueur': 'Premium',
  'lychee-liqueur': 'Classic',
  'watermelon-liqueur': 'Classic',
  'coconut-syrup': 'Fruits & Plants',
  'grenadine-syrup': 'Fruits & Plants',
  'mango-syrup': 'Fruits & Plants',
  'passion-fruit-syrup': 'Fruits & Plants',
  'kiwi-puree': 'Fruit for Mix',
  'mango-puree': 'Fruit for Mix',
  'passion-fruit-puree': 'Fruit for Mix',
  'yuzu-puree': 'Fruit for Mix',
  'na-smoky-agave': 'Alcohol-Free Bases',
  'na-aperitif-bitter': 'Alcohol-Free Bases',
  'na-herbal-juniper': 'Alcohol-Free Bases',
  'na-ruby-grape': 'Alcohol-Free Bases',
};

/* Bottle shots on a studio backdrop exist for every product but this one. */
const NO_STUDIO = new Set(['na-aperitif-bitter']);

export const giffardShelf = (slug: string | undefined) => giffardShelves.find((s) => s.slug === slug);
export const shelfForCategory = (category: string) => giffardShelves.find((s) => s.category === category);
export const productGroup = (p: HouseProduct) => p.group ?? GROUP[p.slug] ?? '';
export const bottleImage = (p: HouseProduct) =>
  NO_STUDIO.has(p.slug) ? p.image : `/images/brands/giffard/range/${p.slug}.webp`;

/** Products on a shelf, in portfolio group order, A to Z within each group. */
export const shelfProducts = (shelf: GiffardShelf) =>
  houses.giffard.products
    .filter((p) => p.category === shelf.category)
    .sort((a, b) => {
      const g = shelf.groups.indexOf(productGroup(a)) - shelf.groups.indexOf(productGroup(b));
      return g || a.label.localeCompare(b.label);
    });
