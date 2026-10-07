// The Giffard range shown on the homepage panel and the Giffard brand page shelf.
import type { GalleryCategory } from '../sections/ServicesSection';

export const giffardGallery: GalleryCategory[] = [
  {
    label: 'Liqueurs',
    note: '35 more liqueurs',
    items: [
      { imageUrl: '/images/giffard-abricot-du-roussillon-apricot-liqueur.webp', label: 'Apricot Liqueur', imageAlt: 'Giffard Abricot du Roussillon apricot liqueur bottle in a French terroir scene', scene: true },
      { imageUrl: '/images/giffard-caribbean-pineapple-liqueur.webp',           label: 'Caribbean Pineapple', imageAlt: 'Giffard Caribbean Pineapple liqueur bottle with fresh pineapple and palms', scene: true },
      { imageUrl: '/images/giffard-lychee-liqueur.webp',                        label: 'Lychee Liqueur',   imageAlt: 'Giffard Lychee-Li lychee liqueur bottle with fresh lychees and blossom',           scene: true },
      { imageUrl: '/images/giffard-watermelon-liqueur.webp',                    label: 'Watermelon Liqueur', imageAlt: 'Giffard Watermelon liqueur bottle with fresh watermelon at Angers',              scene: true },
    ],
  },
  {
    label: 'Syrups',
    note: '40 more syrups',
    items: [
      { imageUrl: '/images/giffard-coconut-syrup.webp', label: 'Coconut Syrup', imageAlt: 'Giffard Coconut syrup bottle with fresh coconuts and palm leaves',    scene: true },
      { imageUrl: '/images/giffard-grenadine-syrup.webp',     label: 'Grenadine Syrup',     imageAlt: 'Giffard Grenadine syrup bottle with pomegranate, raspberries and a red serve',  scene: true },
      { imageUrl: '/images/giffard-mango-syrup.webp',   label: 'Mango Syrup',   imageAlt: 'Giffard Mango syrup bottle with ripe mangoes in a tropical scene',   scene: true },
      { imageUrl: '/images/giffard-passion-fruit-syrup.webp', label: 'Passion Fruit Syrup', imageAlt: 'Giffard Fruit de la Passion syrup bottle with fresh passion fruit and a serve', scene: true },
    ],
  },
  {
    label: 'Purees',
    note: '4 more purees',
    items: [
      { imageUrl: '/images/giffard-kiwi-puree.webp',  label: 'Kiwi Puree',  imageAlt: 'Giffard Kiwi Fruit for Mix puree bottle with fresh kiwi and a crushed-ice serve', scene: true },
      { imageUrl: '/images/giffard-mango-puree.webp', label: 'Mango Puree', imageAlt: 'Giffard Mango Fruit for Mix puree bottle with fresh mango and a chilled serve', scene: true },
      { imageUrl: '/images/giffard-passion-fruit-puree.webp', label: 'Passion Fruit Puree', imageAlt: 'Giffard Passion Fruit puree bottle with tropical island backdrop', scene: true },
      { imageUrl: '/images/giffard-yuzu-puree.webp',  label: 'Yuzu Puree',  imageAlt: 'Giffard Yuzu Fruit for Mix puree bottle with fresh yuzu, blossom and a highball', scene: true },
    ],
  },
  {
    label: 'Non Alcoholic Spirits',
    note: '4 more Non-Alcoholic Spirits',
    items: [
      { imageUrl: '/images/giffard-na-smoky-agave.webp',      label: 'Agave Non-Alcoholic',    imageAlt: 'Giffard Smoky Agave non-alcoholic base with agave, lime and a salted serve',       scene: true },
      { imageUrl: '/images/giffard-na-aperitif-bitter.webp',  label: 'Bitter Non-Alcoholic',   imageAlt: 'Giffard Aperitif Bitter non-alcoholic base with orange and a negroni-style serve', scene: true },
      { imageUrl: '/images/giffard-na-herbal-juniper.webp',   label: 'Brits Non-Alcoholic',    imageAlt: 'Giffard Herbal Juniper non-alcoholic base with juniper berries and a tall serve',  scene: true },
      { imageUrl: '/images/giffard-na-ruby-grape.webp',       label: 'Vermouth Non-Alcoholic', imageAlt: 'Giffard Ruby Grape non-alcoholic base with red grapes and a chilled serve',        scene: true },
    ],
  },
];
