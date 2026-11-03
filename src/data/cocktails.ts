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
        name: 'Peach Liqueur Bellini',
        lede: 'A grown-up bellini using Giffard Vineyard Peach Liqueur for stone-fruit depth no purée can match.',
        ingredients: [
          ['Giffard Peach Liqueur', '15 ml'],
          ['White peach purée', '20 ml'],
          ['Prosecco', '100 ml'],
        ],
        method: 'Add peach purée and Giffard to a chilled flute. Top with prosecco, stir gently with a barspoon.',
      },
      {
        tag: 'Café',
        name: 'Madagascar Vanilla Liqueur Latte',
        lede: 'For cafés running a "spiked drinks" hour. Giffard syrup, no spirit - same brand, two channels.',
        ingredients: [
          ['Giffard Madagascar Vanilla Liqueur', '15 ml'],
          ['Double espresso', '60 ml'],
          ['Steamed milk', '180 ml'],
        ],
        method: 'Pour syrup into the cup, pull the shot over it, top with steamed milk. Dust with cocoa.',
      },
      {
        tag: 'Sparkling',
        name: 'Kir Royale',
        lede: 'The French classic: sparkling wine with a measure of Giffard Blackcurrant.',
        ingredients: [
          ['Giffard Blackcurrant Liqueur', '10 ml'],
          ['Sparkling wine', '90 ml'],
          ['Lemon twist', '1 long'],
        ],
        method: 'Build in a flute. Finish with a long lemon twist.',
      },
      {
        tag: 'Classic',
        name: 'Aviation',
        lede: 'Gin and lemon with maraschino and a whisper of Giffard Violet.',
        ingredients: [
          ['Gin', '45 ml'],
          ['Lemon juice', '15 ml'],
          ['Maraschino liqueur', '15 ml'],
          ['Giffard Violet Liqueur', '1 bar spoon'],
        ],
        method: 'Shake with ice. Fine strain into a coupe.',
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
      {
        tag: 'Signature',
        name: 'Cuba Libre',
        lede: "Black Tears' own spec for the Havana classic. The lime is what makes it a Cuba Libre.",
        ingredients: [
          ['Black Tears Dry Spiced', '50 ml'],
          ['Fresh lime juice', '10 ml'],
          ['Cola', '150 ml'],
          ['Lime wedge', '1'],
        ],
        method: 'Fill a highball with fresh cubed ice. Add the rum and lime, top slowly with cold cola and give it one or two gentle lifts with a bar spoon. Lime wedge.',
      },
      {
        tag: 'Sour',
        name: 'Black Tears Daiquiri',
        lede: 'The daiquiri with a cacao edge.',
        ingredients: [
          ['Black Tears', '60 ml'],
          ['Lime juice', '25 ml'],
          ['Demerara syrup', '15 ml'],
          ['Cacao bitters', '2 dashes'],
        ],
        method: 'Shake hard with ice. Fine strain into a coupe.',
      },
      {
        tag: 'Stirred',
        name: 'Café Cubano Old Fashioned',
        lede: 'Spiced rum and espresso, stirred down.',
        ingredients: [
          ['Black Tears', '50 ml'],
          ['Espresso reduction', '10 ml'],
          ['Demerara syrup', '5 ml'],
          ['Orange peel', '1'],
        ],
        method: 'Stir down over ice. Strain over a single rock in a rocks glass.',
      },
      {
        tag: 'Highball',
        name: 'Havana Highball',
        lede: 'Rum and soda, sharpened with lime and a grapefruit peel.',
        ingredients: [
          ['Black Tears', '50 ml'],
          ['Lime juice', '10 ml'],
          ['Soda', '150 ml'],
          ['Grapefruit peel', '1 long'],
        ],
        method: 'Build over cubes in a highball glass.',
      },
    ],
  },
  {
    id: 'pueblo-viejo',
    name: 'Pueblo Viejo',
    meta: 'Los Altos, Jalisco · 100% Agave Tequila',
    image: '/images/brands/san-matias/serve-paloma-bar.webp',
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
        name: 'Paloma',
        lede: 'The Reposado paloma: grapefruit, lime and a pinch of salt.',
        ingredients: [
          ['Pueblo Viejo Reposado', '45 ml'],
          ['Fresh pink grapefruit juice', '60 ml'],
          ['Lime juice', '10 ml'],
          ['Salt', 'pinch'],
          ['Soda', 'top'],
        ],
        method: 'Build over ice in a highball glass. Top with soda.',
      },
      {
        tag: 'Stirred',
        name: 'Añejo Old Fashioned',
        lede: 'Pueblo Viejo Añejo, stirred with agave and mole bitters.',
        ingredients: [
          ['Pueblo Viejo Añejo', '50 ml'],
          ['Agave syrup (1:1)', '5 ml'],
          ['Mole bitters', '2 dashes'],
          ['Orange peel', '1'],
        ],
        method: 'Stir down over ice. Strain into a rocks glass.',
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
      {
        tag: 'Highball',
        name: 'Burnt Ends Highball',
        lede: 'Whiskey and premium soda with a charred lemon peel.',
        ingredients: [
          ['Burnt Ends', '50 ml'],
          ['Premium soda', '150 ml'],
          ['Charred lemon peel', '1'],
        ],
        method: 'Build over cubes in a highball glass.',
      },
      {
        tag: 'Stirred',
        name: 'Smoked Manhattan',
        lede: 'The Manhattan, served in a hickory-smoked glass.',
        ingredients: [
          ['Burnt Ends', '60 ml'],
          ['Sweet vermouth', '20 ml'],
          ['Mole bitters', '2 dashes'],
          ['Hickory smoke', 'for the glass'],
        ],
        method: 'Smoke a chilled coupe with hickory. Stir the rest 30 turns over ice and strain into the smoked glass. Brandied cherry.',
      },
      {
        tag: 'Sour',
        name: 'Ember Sour',
        lede: 'A whiskey sour sweetened with brown sugar.',
        ingredients: [
          ['Burnt Ends', '45 ml'],
          ['Lemon juice', '25 ml'],
          ['Brown sugar syrup', '20 ml'],
          ['Egg white', '1 tsp'],
        ],
        method: 'Dry shake, then shake again with ice. Strain into a rocks glass.',
      },
    ],
  },
  {
    id: 'worthy-park',
    name: 'Worthy Park',
    meta: 'St. Catherine, Jamaica · Estate Rum & Rumbar Overproof',
    image: '/images/brands/worthy-park/serve-daiquiri-coupe.webp',
    recipes: [
      {
        tag: 'Signature',
        name: 'Nuclear Daiquiri',
        lede: 'The benchmark daiquiri. Estate-funky pot-still Jamaican rum, lime, sugar.',
        ingredients: [
          ['Worthy Park Estate Rum', '60 ml'],
          ['Lime juice', '25 ml'],
          ['Sugar syrup (1:1)', '15 ml'],
        ],
        method: 'Shake hard. Double strain into a frozen coupe. Lime peel discarded.',
      },
      {
        tag: 'Stirred',
        name: 'Rum Old Fashioned',
        lede: 'Single Estate rum, stirred down and finished with a flamed orange.',
        ingredients: [
          ['Worthy Park Single Estate', '60 ml'],
          ['Demerara syrup', '7.5 ml'],
          ['Mole bitters', '2 dashes'],
          ['Orange peel', '1, flamed'],
        ],
        method: 'Stir down over ice. Strain into a rocks glass and flame the orange peel over the top.',
      },
      {
        tag: 'Tiki',
        name: 'Jamaican Mai Tai',
        lede: 'The Single Estate Reserve in the classic tiki build.',
        ingredients: [
          ['Worthy Park Single Estate Reserve', '45 ml'],
          ['Lime juice', '25 ml'],
          ['Dry curaçao', '15 ml'],
          ['Orgeat', '15 ml'],
        ],
        method: 'Whip-shake with ice. Pour over crushed ice in a double rocks glass. Mint sprig, lime shell.',
      },
    ],
  },
  {
    id: 'whiskey-row',
    name: 'Whiskey Row',
    meta: 'Kentucky · Bourbon & Rye',
    image: '/images/brand-whiskey-row-cocktail.webp',
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
      {
        tag: 'Sour',
        name: 'Whiskey Sour',
        lede: 'Bourbon, lemon and demerara under a soft foam.',
        ingredients: [
          ['Whiskey Row Bourbon', '45 ml'],
          ['Lemon juice', '25 ml'],
          ['Demerara syrup', '20 ml'],
          ['Egg white', '1'],
          ['Bitters', '3 drops'],
        ],
        method: 'Dry shake, then shake again with ice. Strain into a rocks glass and drop the bitters on the foam.',
      },
      {
        tag: 'Stirred',
        name: 'Boulevardier',
        lede: 'The bourbon cousin of the Negroni.',
        ingredients: [
          ['Whiskey Row Bourbon', '45 ml'],
          ['Campari', '30 ml'],
          ['Sweet vermouth', '30 ml'],
          ['Orange twist', '1 long'],
        ],
        method: 'Stir with ice. Strain into a coupe and finish with a long orange twist.',
      },
    ],
  },
  {
    id: 'san-matias',
    name: 'San Matías',
    meta: 'Tequila, Jalisco · Since 1886',
    image: '/images/brands/san-matias/serve-old-fashioned-gran-reserva.webp',
    recipes: [
      {
        tag: 'Stirred',
        name: 'San Matías Old Fashioned',
        lede: 'Gran Reserva, stirred with agave and mole bitters.',
        ingredients: [
          ['San Matías Gran Reserva', '50 ml'],
          ['Agave syrup (1:1)', '5 ml'],
          ['Mole bitters', '2 dashes'],
          ['Orange peel', '1'],
        ],
        method: 'Stir down over ice. Strain into a rocks glass.',
      },
      {
        tag: 'Highball',
        name: 'Highland Paloma',
        lede: 'Tahona tequila with grapefruit, lime and a pinch of sea salt.',
        ingredients: [
          ['San Matías Tahona', '50 ml'],
          ['Fresh grapefruit juice', '60 ml'],
          ['Lime juice', '10 ml'],
          ['Sea salt', 'pinch'],
          ['Soda', 'top'],
        ],
        method: 'Build over ice in a highball glass. Top with soda.',
      },
    ],
  },
  {
    id: 'demonio-de-los-andes',
    name: 'Demonio de los Andes',
    meta: 'Ica, Peru · Pisco',
    image: '/images/brands/demonio-de-los-andes/serve-pisco-sour.webp',
    recipes: [
      {
        tag: 'Signature',
        name: 'Pisco Sour',
        lede: "Peru's national cocktail, built on the Acholado.",
        ingredients: [
          ['Demonio de los Andes Acholado', '60 ml'],
          ['Fresh lime juice', '20 ml'],
          ['Sugar syrup', '20 ml'],
          ['Egg white', '1'],
          ['Angostura bitters', 'a few drops'],
        ],
        method: 'Shake hard over ice for the foam. Strain into a coupe and finish with a few drops of Angostura.',
      },
      {
        tag: 'Highball',
        name: 'Chilcano',
        lede: 'Pisco and ginger ale: the easy, quick-build highball.',
        ingredients: [
          ['Demonio de los Andes Acholado', '60 ml'],
          ['Fresh lime juice', '15 ml'],
          ['Chilled ginger ale', '120–150 ml'],
          ['Angostura bitters', '2–3 drops'],
        ],
        method: 'Build over ice in a highball glass. Top slowly with ginger ale and stir once. Lime wheel.',
      },
      {
        tag: 'Stirred',
        name: 'El Capitán',
        lede: 'Pisco and vermouth rosso in equal parts.',
        ingredients: [
          ['Demonio de los Andes Quebranta Reserva de Familia', '60 ml'],
          ['Vermouth rosso', '60 ml'],
          ['Orange twist', '1'],
        ],
        method: 'Stir over ice for 20–25 seconds - never shaken. Strain into a coupe and express the orange peel.',
      },
    ],
  },
  {
    id: 'thoquino',
    name: 'Thoquino',
    meta: 'Rio de Janeiro, Brazil · Cachaça · Since 1906',
    image: '/images/brands/thoquino/caipirinha.webp',
    recipes: [
      {
        tag: 'Signature',
        name: 'Caipirinha',
        lede: "Brazil's national cocktail, made with fresh-cane cachaça.",
        ingredients: [
          ['Thoquino Cachaça', '60 ml'],
          ['Fresh lime', '1, in wedges'],
          ['White sugar', '4 tsp'],
          ['Crushed ice', 'fill'],
        ],
        method: 'Muddle the lime with the sugar in a rocks glass. Add Thoquino and crushed ice and build.',
      },
      {
        tag: 'Creamy',
        name: 'Batida de Coco',
        lede: 'Cachaça shaken with coconut and condensed milk.',
        ingredients: [
          ['Thoquino Cachaça', '50 ml'],
          ['Coconut milk', '50 ml'],
          ['Condensed milk', '20 ml'],
          ['Crushed ice', 'fill'],
        ],
        method: 'Blend, or shake hard. Serve in a rocks glass.',
      },
      {
        tag: 'Stirred',
        name: 'Rabo de Galo',
        lede: 'The Brazilian bar classic: cachaça, sweet vermouth and Cynar.',
        ingredients: [
          ['Thoquino Cachaça', '60 ml'],
          ['Sweet vermouth', '20 ml'],
          ['Cynar', '15 ml'],
          ['Orange twist', '1'],
        ],
        method: 'Stir down over ice. Strain into a rocks glass and finish with an orange twist.',
      },
    ],
  },
];
