// Cocktail Corner recipes, from the 3Two1 reference site (3two1.pplx.app/cocktails.html).

export interface Recipe {
  tag: string;
  name: string;
  lede: string;
  ingredients: [string, string][];
  method: string;
}

export interface RecipeHouse {
  id: string;
  name: string;
  meta: string;
  image: string;
  recipes: Recipe[];
}

export const recipeHouses: RecipeHouse[] = [
  {
    id: 'giffard',
    name: 'Giffard',
    meta: 'Angers, France · Since 1885',
    image: '/images/brands/giffard/backbar.webp',
    recipes: [
      {
        tag: 'Signature',
        name: 'Caribbean Pineapple Sour',
        lede: 'A clean, sun-bright sour built on Giffard Caribbean Pineapple - the #7 bestselling cocktail liqueur of 2026.',
        ingredients: [
          ['Giffard Caribbean Pineapple', '30 ml'],
          ['Blanco rum', '45 ml'],
          ['Lime juice', '22.5 ml'],
          ['Sugar syrup (2:1)', '10 ml'],
          ['Egg white', '1'],
        ],
        method: 'Dry shake then shake hard with ice. Double strain into a chilled coupe. Garnish with three drops of angostura on the foam, drawn through with a pick.',
      },
      {
        tag: 'Spritz',
        name: 'Giffard Garden Spritz',
        lede: 'Brunch-list ready. Built directly in the glass for high-volume venues.',
        ingredients: [
          ['Giffard Aperitif Spritz', '60 ml'],
          ['Prosecco', '90 ml'],
          ['Soda', '30 ml'],
        ],
        method: 'Build over ice in a large wine glass. Garnish with an orange wheel and a sprig of fresh mint.',
      },
      {
        tag: 'Twist',
        name: 'Crème de Pêche Bellini',
        lede: 'A grown-up bellini using Giffard Crème de Pêche de Vigne for stone-fruit depth no purée can match.',
        ingredients: [
          ['Giffard Crème de Pêche', '15 ml'],
          ['White peach purée', '20 ml'],
          ['Prosecco', '100 ml'],
        ],
        method: 'Add peach purée and Giffard to a chilled flute. Top with prosecco, stir gently with a barspoon.',
      },
      {
        tag: 'Café',
        name: 'Vanille de Madagascar Latte',
        lede: 'For cafés running a "spiked drinks" hour. Giffard syrup, no spirit - same brand, two channels.',
        ingredients: [
          ['Giffard Vanille de Madagascar syrup', '15 ml'],
          ['Double espresso', '60 ml'],
          ['Steamed milk', '180 ml'],
        ],
        method: 'Pour syrup into the cup, pull the shot over it, top with steamed milk. Dust with cocoa.',
      },
    ],
  },
  {
    id: 'black-tears',
    name: 'Black Tears',
    meta: 'Havana, Cuba · Spiced Rum',
    image: '/images/brands/black-tears/highball.webp',
    recipes: [
      {
        tag: 'Signature',
        name: 'Black Tears & Cola',
        lede: 'The simplest serve. Done correctly it sells itself - house highball in three pours.',
        ingredients: [
          ['Black Tears', '45 ml'],
          ['Premium cola', '120 ml'],
          ['Lime wedge', '1'],
        ],
        method: 'Build over fresh block ice in a tall glass. Squeeze the lime and drop it in. Single sip stir.',
      },
      {
        tag: 'Twist',
        name: 'Havana Espresso',
        lede: 'An Espresso Martini that finally tastes like rum.',
        ingredients: [
          ['Black Tears', '45 ml'],
          ['Cold-brew coffee', '20 ml'],
          ['Coffee liqueur', '15 ml'],
          ['Sugar syrup', '5 ml'],
        ],
        method: 'Shake hard with cubed ice. Double strain into a chilled coupe. Three coffee beans.',
      },
      {
        tag: 'Stirred',
        name: 'Black Old Fashioned',
        lede: 'Spiced rum stands up to the format - chocolate & clove notes carry.',
        ingredients: [
          ['Black Tears', '50 ml'],
          ['Demerara syrup', '5 ml'],
          ['Angostura bitters', '2 dashes'],
        ],
        method: 'Stir over ice 25 turns. Strain over a single rock. Express orange peel.',
      },
    ],
  },
  {
    id: 'pueblo-viejo',
    name: 'Pueblo Viejo',
    meta: 'Los Altos, Jalisco · 100% Agave Tequila',
    image: '/images/brands/pueblo-viejo/paloma.webp',
    recipes: [
      {
        tag: 'Signature',
        name: "Tommy's Margarita",
        lede: "The bartender's margarita. Pueblo Viejo Blanco built right.",
        ingredients: [
          ['Pueblo Viejo Blanco', '60 ml'],
          ['Fresh lime juice', '30 ml'],
          ['Agave nectar (2:1)', '15 ml'],
        ],
        method: 'Shake with ice. Strain over fresh ice in a rocks glass. Optional salt half-rim.',
      },
      {
        tag: 'Highball',
        name: 'Paloma Brava',
        lede: 'For long Sundays. Build directly in the glass.',
        ingredients: [
          ['Pueblo Viejo Blanco', '45 ml'],
          ['Fresh pink grapefruit juice', '60 ml'],
          ['Lime juice', '10 ml'],
          ['Soda water', 'top'],
          ['Pinch of salt', ''],
        ],
        method: 'Build over ice. Garnish with a grapefruit twist.',
      },
    ],
  },
  {
    id: 'burnt-ends',
    name: 'Burnt Ends',
    meta: 'Smoked spirit · House special',
    image: '/images/brands/burnt-ends/serve-manhattan.webp',
    recipes: [
      {
        tag: 'Stirred',
        name: 'Burnt Manhattan',
        lede: 'Smoke meets vermouth. Built for the back-bar that takes a stirred drink seriously.',
        ingredients: [
          ['Burnt Ends', '60 ml'],
          ['Sweet vermouth', '20 ml'],
          ['Angostura bitters', '2 dashes'],
        ],
        method: 'Stir 30 turns over ice. Strain into a chilled coupe. Brandied cherry.',
      },
      {
        tag: 'Sour',
        name: 'Smoke Signal',
        lede: 'A sour twist that lets the char run through.',
        ingredients: [
          ['Burnt Ends', '45 ml'],
          ['Lemon juice', '22.5 ml'],
          ['Honey syrup (3:1)', '15 ml'],
          ['Egg white', '1'],
        ],
        method: 'Dry shake. Shake again with ice. Double strain into a coupe.',
      },
    ],
  },
  {
    id: 'worthy-park',
    name: 'Worthy Park',
    meta: 'St. Catherine, Jamaica · Estate Rum & Rumbar Overproof',
    image: '/images/brands/worthy-park/serve-daiquiri.webp',
    recipes: [
      {
        tag: 'Signature',
        name: 'Worthy Park Daiquiri',
        lede: 'The benchmark daiquiri. Estate-funky pot-still Jamaican rum, lime, sugar.',
        ingredients: [
          ['Worthy Park Estate Rum', '60 ml'],
          ['Lime juice', '25 ml'],
          ['Sugar syrup (1:1)', '15 ml'],
        ],
        method: 'Shake hard. Double strain into a frozen coupe. Lime peel discarded.',
      },
      {
        tag: 'Tiki',
        name: 'Rumbar Mai Tai',
        lede: 'Overproof split - funk forward, balanced with orgeat & orange curaçao.',
        ingredients: [
          ['Worthy Park Estate', '30 ml'],
          ['Rumbar Overproof', '15 ml'],
          ['Orange curaçao', '15 ml'],
          ['Orgeat', '15 ml'],
          ['Lime juice', '25 ml'],
        ],
        method: 'Whip-shake. Pour over crushed ice in a rocks glass. Mint sprig, lime shell.',
      },
    ],
  },
  {
    id: 'whiskey-row',
    name: 'Whiskey Row',
    meta: 'Kentucky · Bourbon & Rye',
    image: '/images/brands/whiskey-row/cask-serve.webp',
    recipes: [
      {
        tag: 'Stirred',
        name: 'Whiskey Row Old Fashioned',
        lede: 'The drink the brand is built for.',
        ingredients: [
          ['Whiskey Row Bourbon', '60 ml'],
          ['Demerara sugar cube', '1'],
          ['Angostura bitters', '3 dashes'],
          ['Orange bitters', '1 dash'],
        ],
        method: 'Muddle sugar with bitters & a splash of water. Add bourbon, stir over a single block. Orange peel.',
      },
      {
        tag: 'Sour',
        name: 'Penicillin (Row Edit)',
        lede: 'A bourbon-base spin on the classic - honey, ginger and a smoky float.',
        ingredients: [
          ['Whiskey Row Bourbon', '50 ml'],
          ['Honey-ginger syrup', '20 ml'],
          ['Lemon juice', '22.5 ml'],
          ['Burnt Ends float', '5 ml'],
        ],
        method: 'Shake the first three with ice. Strain over fresh rocks. Float Burnt Ends across the back of a spoon.',
      },
    ],
  },
  {
    id: 'san-matias',
    name: 'San Matías',
    meta: 'Tequila, Jalisco · Since 1886',
    image: '/images/brands/san-matias/serve-old-fashioned.webp',
    recipes: [
      {
        tag: 'Sipping',
        name: 'Reposado, Neat',
        lede: 'The house we ask sipping bars to try first. A short pour, a small glass.',
        ingredients: [
          ['San Matías Reposado', '30 ml'],
          ['Orange wedge', '1'],
        ],
        method: 'Pour at room temperature into a copita. Serve with a wedge of orange on the side - Mexican style.',
      },
      {
        tag: 'Signature',
        name: 'Añejo Old Fashioned',
        lede: 'For lists looking for an agave entry above the margarita.',
        ingredients: [
          ['San Matías Añejo', '50 ml'],
          ['Agave syrup (1:1)', '5 ml'],
          ['Orange bitters', '2 dashes'],
        ],
        method: 'Stir 25 turns. Strain over a single rock. Express orange peel and drop.',
      },
    ],
  },
];
