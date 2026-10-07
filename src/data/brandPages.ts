// Brand-page copy. Story, craft, range, tasting and serve text comes from the
// 3Two1 reference site (3two1.pplx.app/brand-*.html) word for word; `facts`,
// `trade` and `extra` are our own additions. The reference has no Demonio de
// los Andes or Thoquino pages, so their copy is ours, built on the home-page
// lines and the producers' published facts. Imagery is from each house's
// official site, under /public/images/brands/<slug>/.

export interface Pillar { title: string; body: string }
export interface Expression { name: string; spec: string; note: string; image?: string }
export interface Serve { name: string; build: string; method: string; glass: string; image?: string }
export interface Fact { value: string; label: string }

export interface BrandPage {
  slug: string;
  name: string;
  eyebrow: string;
  quote: string;
  story: { heading: string; paragraphs: string[] };
  craft: { statement: string; pillars: Pillar[] };
  values?: { label: string; heading: string; paragraphs: string[] };
  range: Expression[];
  tasting: {
    of: string;
    nose: string;
    palate: string;
    finish: string;
    serve: string;
  };
  serves: Serve[];
  stock: string;
  facts: Fact[];
  trade: string[];
  extra: { heading: string; body: string };
  /** Official site — omitted when the house has none of its own. */
  site?: string;
}

const B = (slug: string) => (file: string) => `/images/brands/${slug}/${file}.webp`;

const bt = B('black-tears');
const pv = B('pueblo-viejo');
const wp = B('worthy-park');
const sm = B('san-matias');
const gf = B('giffard');
const wr = B('whiskey-row');
const dm = B('demonio-de-los-andes');

export const brandPages: BrandPage[] = [
  {
    slug: 'black-tears',
    name: 'Black Tears',
    eyebrow: 'Cuba · Spiced Rum',
    quote: 'Cuba, decanted — café culture in a bottle.',
    story: {
      heading: 'A rum that tastes like a Havana afternoon.',
      paragraphs: [
        'Black Tears was born in Havana on a single, stubborn idea: that spiced rum could be the opposite of what spiced rum had become. Where the category had drifted toward vanilla and caramel — sweet, soft, easy — the founders wanted something that felt like the city it came from. Something with shadow in it. Something that tasted of coffee at three in the afternoon, of cocoa beans drying on a courtyard table, of the slow heat that hangs in the air after a sudden rain.',
        'The base is Cuban — aged in the tropical climate where the rum loses around 7% to the angels each year and gains the depth that only that kind of heat can give. Onto that base the team layers locally-sourced cacao nibs and arabica beans, dialed in over years of small batches until the balance reads as one continuous flavour rather than a collage. Nothing artificial. No colouring. No shortcuts.',
        'We import the full Cuban allocation into Western Australia and place it where it belongs — back-bars where someone is going to pay attention to it. Daiquiris with a chocolate edge. Old fashioneds you can taste in slow motion. The kind of pour that earns a second one.',
      ],
    },
    craft: {
      statement:
        'Aged Cuban rum, infused with island-grown cocoa, coffee and arabica — a tribute to the café culture that runs through Havana from sunrise to last orders.',
      pillars: [
        { title: 'Native botanicals', body: 'Cocoa nibs, arabica beans and a measured run of spices — all sourced within Cuba.' },
        { title: 'Tropical ageing', body: 'Aged in ex-bourbon oak under Havana sun. Faster than Scotch, deeper for it.' },
        { title: 'Single-island origin', body: 'Distilled, infused, bottled and shipped from one island. The provenance is the product.' },
      ],
    },
    values: {
      label: 'Provenance',
      heading: 'One island. One spirit. Traceable to the field.',
      paragraphs: [
        'Every batch of Black Tears can be traced back to the farms and the producers that built it. Cuban cane, Cuban barrels, Cuban roasters — and a finished spirit that pays the full price of staying that way. We think that matters. The category has spent two decades blurring its origins; this one refuses to.',
        'Buying Black Tears is buying into a chain of Cuban makers we work directly with. Trade enquiries get the full traceability sheet on request.',
      ],
    },
    range: [
      { name: 'Black Tears Spiced Rum', spec: '40% ABV · 700ml', note: 'Dried cocoa, espresso, baked banana and warm tobacco — long, dry, properly spiced.', image: bt('bottle-label') },
    ],
    tasting: {
      of: 'Black Tears Spiced',
      nose: 'Roasted cacao, dark espresso, dried fig.',
      palate: 'Burnt-sugar sweetness; a slow build of clove, cinnamon, and tobacco leaf.',
      finish: 'Dry and long. Bitter chocolate that lingers.',
      serve: 'Pour neat over a single large rock, or stir into a coffee-forward old fashioned with a swatch of orange peel.',
    },
    serves: [
      { name: 'Black Tears Daiquiri', build: 'Rum, lime, demerara, a whisper of cacao bitters.', method: 'Shake hard, fine strain', glass: 'Coupe', image: bt('serve-tiki') },
      { name: 'Café Cubano Old Fashioned', build: 'Spiced rum, espresso reduction, orange, demerara.', method: 'Stir down, single rock', glass: 'Rocks', image: bt('toast') },
      { name: 'Havana Highball', build: 'Rum, soda, lime cordial, a long peel of grapefruit.', method: 'Build over cubes', glass: 'Highball', image: bt('highball') },
    ],
    stock: 'Speak to our trade team about wholesale allocations, staff training, and Cuban-night activations across Australia.',
    facts: [
      { value: '7%', label: 'Lost to the angels each year in Havana heat' },
      { value: '3', label: 'Cuban botanicals: cacao, arabica, spice' },
      { value: '0', label: 'Added colouring or artificial flavour' },
      { value: '1', label: 'Island, start to finish' },
    ],
    trade: [
      'Rum & cola upgrade — swap the house pour and charge for it',
      'Espresso Martini twist with a cacao backbone',
      'Cuban-night activations with bar staff training',
    ],
    extra: {
      heading: 'Built for after dark.',
      body: 'Black Tears is happiest where the lights are low — late-night cocktail bars, coffee-led menus and venues that want a rum with an opinion. It reads as dry, not sweet, which means it plays with bitter, roast and citrus rather than drowning them.',
    },
    site: 'https://blacktears.com',
  },
  {
    slug: 'pueblo-viejo',
    name: 'Pueblo Viejo',
    eyebrow: 'Jalisco · 100% Agave Tequila',
    quote: '100% agave. 100% Jalisco.',
    story: {
      heading: 'From Lagos de Moreno.',
      paragraphs: [
        "Pueblo Viejo is the everyday workhorse of the Casa San Matías family — produced at the sister distillery in Lagos de Moreno, in the volcanic highlands of Jalisco, where the agave grows slowly and the soil leaves a particular minerality on the spirit. The name translates roughly to 'old town' and that's the spirit of it: a tequila built for the corner cantina, for the bar that pours fifty margaritas a night, for the bottle you'd actually reach for at home.",
        'Everything in the range is one hundred per cent blue Weber agave. There is no mixto here, no shortcut grain spirit, no caramel for colour on the rested expressions. The piñas are cooked in traditional stone ovens — slower than the modern autoclaves — to caramelise the agave sugars properly, then fermented and twice-distilled in copper-pot stills.',
        "We import the Blanco, Reposado and Añejo into Western Australia for trade. Each one is built around the same agave-forward bones, then tuned: clean and peppery, gently oaked, or rested long enough to take on dried fruit and vanilla. They sit on the back-bar where serious bartenders want a tequila that doesn't dilute the cocktail.",
      ],
    },
    craft: {
      statement: 'Stone-oven cooked. Slowly fermented. 100% agave — the way the highlands have always made it.',
      pillars: [
        { title: 'Highland blue Weber', body: "Mature agave grown in the volcanic soil of Jalisco's highlands — slower, sweeter, more mineral." },
        { title: 'Stone-oven cook', body: 'Piñas roasted in traditional ovens for proper caramelisation — never rushed.' },
        { title: 'Copper double-distillation', body: 'Twice through copper pot stills. Clean, expressive, agave-forward.' },
      ],
    },
    range: [
      { name: 'Pueblo Viejo Blanco', spec: '38% ABV · 700ml', note: 'Bright agave, white pepper, citrus pith. Margaritas all night.', image: '/images/house-pueblo-viejo.webp' },
      { name: 'Pueblo Viejo Reposado', spec: '38% ABV · 700ml', note: 'Six months in American oak — softer agave, vanilla, dried herbs.', image: '/images/brand-pueblo-viejo-reposado-bottle.webp' },
      { name: 'Pueblo Viejo Añejo', spec: '38% ABV · 700ml', note: 'A year in oak. Dried fruit, baked apple, gentle cinnamon.', image: '/images/brand-pueblo-viejo-anejo-bottle.webp' },
    ],
    tasting: {
      of: 'Pueblo Viejo Blanco',
      nose: 'Cooked agave, fresh lime zest, a snap of white pepper.',
      palate: 'Clean and peppery, with a green vegetal lift and a long, citrus-driven mid-palate.',
      finish: 'Dry and saline. The mineral signature of the highlands.',
      serve: "A Tommy's margarita built with the Blanco, fresh lime and a teaspoon of agave nectar over a single rock. The agave does the work; the rest gets out of the way.",
    },
    serves: [
      { name: "Tommy's Margarita", build: 'Blanco, lime, agave. Three ingredients, done right.', method: 'Shake, single rock', glass: 'Rocks', image: '/images/brand-pueblo-viejo-cocktail.webp' },
      { name: 'Paloma', build: 'Reposado, fresh grapefruit, lime, a pinch of salt, soda.', method: 'Build, top with soda', glass: 'Highball', image: pv('paloma') },
      { name: 'Añejo Old Fashioned', build: 'Añejo, agave syrup, mole bitters, orange.', method: 'Stir down', glass: 'Rocks', image: pv('chapala') },
    ],
    stock: 'Talk to us about full-range allocations, agave education sessions, and back-bar placement across Australia.',
    facts: [
      { value: '100%', label: 'Blue Weber agave — never mixto' },
      { value: '2×', label: 'Distilled in copper pot stills' },
      { value: '3', label: 'Expressions: Blanco, Reposado, Añejo' },
      { value: '50', label: 'Margaritas a night, built to keep up' },
    ],
    trade: [
      'Well tequila that does not compromise the margarita',
      'Full-range flights for agave education nights',
      'Price point built for high-volume cocktail menus',
    ],
    extra: {
      heading: 'The cantina pour.',
      body: 'Pueblo Viejo is the tequila Mexicans actually drink at home — honest, affordable and 100% agave. That makes it the smart rail pour for any venue that wants a real tequila margarita without top-shelf pricing.',
    },
    site: 'https://tequilapuebloviejo.com',
  },
  {
    slug: 'worthy-park',
    name: 'Worthy Park',
    eyebrow: 'Lluidas Vale · Jamaican Rum · Since 1670',
    quote: 'Single-estate Jamaican rum, since 1670.',
    story: {
      heading: 'One valley. Three and a half centuries.',
      paragraphs: [
        'Worthy Park sits in Lluidas Vale, a basin of rich Jamaican soil ringed by mountains, where sugar has been grown continuously since 1670. The estate is one of the oldest still in operation anywhere in the world and — almost more impressively — still does everything on one property. The cane is grown here. The molasses is made here. The fermentation, the distillation, the ageing, the bottling — all of it happens within sight of the same hills.',
        "That single-estate model is the thing that separates Worthy Park from most of what calls itself rum. Many Jamaican brands buy molasses from elsewhere or blend across distilleries; Worthy Park doesn't. The character of the rum is the character of the valley, and the character of the valley shows up in every bottle: a tropical funk underneath the oak, a long mineral finish, and a kind of vegetal lift that you only get from cane that hasn't travelled.",
        'Everything is one hundred per cent pot-still. Nothing is sweetened, nothing is coloured, nothing is added after distillation. It is, in the best sense, an old-fashioned rum — and the reason serious bar programs around the world now treat Worthy Park as a benchmark for what a Jamaican pour can be.',
      ],
    },
    craft: {
      statement: '100% pot-still. Single estate. No additives, ever — the Worthy Park rule, kept since the day it opened.',
      pillars: [
        { title: 'Cane to bottle, one estate', body: 'Grown, fermented, distilled, aged and bottled within sight of one valley.' },
        { title: '100% pot-still', body: 'Heavy, expressive, character-driven distillation — the Jamaican style, properly.' },
        { title: 'Tropical-aged in ex-bourbon', body: 'Aged in the Jamaican climate. Faster ageing, deeper concentration of flavour.' },
      ],
    },
    values: {
      label: 'Values',
      heading: 'No additives. Family-owned. Independent.',
      paragraphs: [
        "There is a quiet rule at Worthy Park that nothing goes into the rum that doesn't come off the still. No added sugar. No glycerol. No colouring. No flavouring. It is a position the estate has held for centuries, and one that fewer and fewer producers in the category can still claim.",
        "Worthy Park has stayed independent and family-controlled — a rare profile in a category increasingly owned by multinationals. The estate's choices are made on the ground, in Lluidas Vale, by the people who live there.",
      ],
    },
    range: [
      { name: 'Single Estate Reserve', spec: '45% ABV · 700ml', note: 'Tropical-aged for over five years — dried banana, oak, allspice.', image: '/images/house-worthy-park.webp' },
      { name: 'Rum-Bar Gold', spec: '40% ABV · 700ml', note: "The bartender's gold. Lightly aged, vegetal, mixable." },
      { name: 'Rum-Bar Overproof', spec: '63% ABV · 700ml', note: 'Unaged white funk — for tiki, for floats, for serious drinks.' },
      { name: 'Worthy Park 109', spec: '54.5% ABV · 700ml', note: 'Higher-proof aged blend. Big tropical pot-still, dark oak.' },
    ],
    tasting: {
      of: 'Single Estate Reserve',
      nose: 'Dried banana, baked pineapple, vanilla and warm oak.',
      palate: 'Rich and lifted — tropical fruit, a thread of funk, brown sugar and clove.',
      finish: 'Long, dry, mineral. The signature of Lluidas Vale.',
      serve: 'Neat in a Glencairn, or in a rum old fashioned with demerara and a flamed orange peel.',
    },
    serves: [
      { name: 'Worthy Park Daiquiri', build: 'Single Estate, lime, demerara — three ingredients, perfectly balanced.', method: 'Shake, fine strain', glass: 'Coupe', image: wp('serve-daiquiri') },
      { name: 'Rum Old Fashioned', build: 'Single Estate, demerara, mole bitters, flamed orange.', method: 'Stir down', glass: 'Rocks', image: wp('serve-old-fashioned') },
      { name: 'Jamaican Mai Tai', build: 'Worthy Park 109, orgeat, lime, dry curaçao.', method: 'Shake, crushed ice', glass: 'Double rocks', image: wp('serve-mai-tai') },
    ],
    stock: "Talk to our trade team about full-range allocations, rum education, and bar training with the estate's heritage in mind.",
    facts: [
      { value: '1670', label: 'Sugar grown continuously in Lluidas Vale' },
      { value: '100%', label: 'Pot-still distillation' },
      { value: '1', label: 'Estate — cane to bottle' },
      { value: '0', label: 'Sugar, glycerol, colour or flavour added' },
    ],
    trade: [
      'Benchmark Jamaican pour for serious rum menus',
      'Overproof for tiki floats and high-impact serves',
      'Estate heritage training for bar teams',
    ],
    extra: {
      heading: 'Recognised by the trade.',
      body: 'Worthy Park took the IWSC 2025 Rum Producer Trophy — a nod to three and a half centuries of doing it the hard way, on one estate, with nothing added.',
    },
    site: 'https://worthyparkestate.com',
  },
  {
    slug: 'san-matias',
    name: 'San Matías',
    eyebrow: 'Jalisco · Tequila · Since 1886',
    quote: 'The oldest tequila house still in family hands.',
    story: {
      heading: 'A hacienda above the agave fields.',
      paragraphs: [
        'Casa San Matías has been making tequila in the highlands of Jalisco since 1886 — long enough that the original family is still in charge, which is no small claim in a category where most of the recognisable names now sit inside global drinks portfolios. The hacienda looks much as it always did: stone walls, terracotta tile, a courtyard that opens onto rows of blue agave running to the horizon.',
        "The current matriarch is Carmen Villarreal, who took over the business from her late husband and, more than two decades on, has built it into one of the most respected family-owned distilleries in Mexico. Casa San Matías remains one of the very few tequila houses run by a woman — and Carmen's stewardship has shaped the modern portfolio, from the everyday Pueblo Viejo line to the rare expressions that define the high end of Mexican tequila.",
        'Everything is one hundred per cent blue Weber agave from highland Jalisco. Premium expressions are cooked in traditional stone ovens and milled the slow, old way — tahona stone over the agave hearts — for a richer extraction that machine milling will not match. NOM 1247 on every bottle.',
      ],
    },
    craft: {
      statement: 'Stone-oven cooked. Tahona-milled at the premium tier. 100% blue Weber agave — the way it was made in 1886.',
      pillars: [
        { title: 'Highland blue Weber', body: 'Mature agave from the volcanic highlands — mineral, concentrated, slow-grown.' },
        { title: 'Tahona milling', body: 'Heavy stone wheel over cooked agave on the premium tier. Old craft, deeper flavour.' },
        { title: 'Patient ageing', body: 'Aged in French and American oak. Time the rare expressions take seriously.' },
      ],
    },
    values: {
      label: 'Values',
      heading: 'Family-owned. Female-led. NOM 1247.',
      paragraphs: [
        'Casa San Matías is one of a small handful of major tequila houses still owned by the founding family — and one of even fewer to be run by a woman. Carmen Villarreal has spent more than twenty years steering the business while keeping the original Jalisco hacienda producing in the way it always has.',
        "That continuity matters. NOM 1247 isn't just a regulatory number; it's a marker that the spirit comes from one specific distillery, with one specific lineage, and one specific philosophy of how a tequila should be made.",
      ],
    },
    range: [
      { name: 'San Matías Tahona Blanco', spec: '40% ABV · 750ml', note: 'Tahona-milled blanco — rich agave, earth, fresh herbs.', image: sm('bottle-tahona') },
      { name: 'San Matías Tahona Añejo', spec: '40% ABV · 750ml', note: 'Tahona-milled, then aged in oak — a fuller agave character the barrel refines.', image: sm('bottle-tahona-anejo') },
      { name: 'San Matías Cristal', spec: '40% ABV · 750ml', note: 'Añejo filtered crystal-clear — oak smoothness with a clean, bright agave finish.', image: sm('bottle-cristal') },
      { name: 'San Matías Gran Reserva', spec: '40% ABV · 700ml', note: 'Extra Añejo — three years in oak. Dried fruit, vanilla, baked sugar.', image: sm('bottle-gran-reserva') },
    ],
    tasting: {
      of: 'San Matías Tahona Blanco',
      nose: 'Pure citrus, white flowers and intense cooked agave.',
      palate: 'Sweet and mineral — citrus pith, cooked agave, no bitterness.',
      finish: 'Citrus blossom with a hint of pink pepper.',
      serve: 'A Tahona margarita with fresh lime and a half-bar-spoon of agave nectar over a single rock — or simply neat with a slice of grapefruit alongside.',
    },
    serves: [
      { name: 'Tahona Margarita', build: 'Tahona Blanco, fresh lime, agave nectar, fine salt rim.', method: 'Shake, salt rim', glass: 'Coupe', image: sm('serve-margarita') },
      { name: 'San Matías Old Fashioned', build: 'Gran Reserva, agave, mole bitters, orange.', method: 'Stir down', glass: 'Rocks', image: sm('serve-old-fashioned') },
      { name: 'Highland Paloma', build: 'Tahona, grapefruit, lime, a pinch of sea salt, soda.', method: 'Build, top with soda', glass: 'Highball', image: sm('serve-paloma') },
    ],
    stock: 'Talk to our trade team about allocations, tequila education sessions, and the Casa San Matías story.',
    facts: [
      { value: '1886', label: 'Distilling in the Jalisco highlands' },
      { value: '1247', label: 'NOM — one distillery, one lineage' },
      { value: '20+', label: 'Years under Carmen Villarreal' },
      { value: '100%', label: 'Blue Weber agave' },
    ],
    trade: [
      'Sipping tequila list anchor — Extra Añejo at the top',
      'Tahona story for staff training and tastings',
      'Pairs with Pueblo Viejo for a full house range',
    ],
    extra: {
      heading: 'The tahona, explained.',
      body: 'A tahona is a two-tonne volcanic stone wheel that rolls over cooked agave to crush out the juice. It is slow, uneven and almost nobody does it anymore — which is exactly why it keeps more of the fibre, earth and sweetness in the final spirit.',
    },
    site: 'https://www.sanmatias.com',
  },
  {
    slug: 'giffard',
    name: 'Giffard',
    eyebrow: 'Angers · Liqueurs & Eaux-de-vie · Since 1885',
    quote: 'A house built on fruit, not fashion.',
    story: {
      heading: 'Four generations in Angers.',
      paragraphs: [
        'Émile Giffard was a pharmacist in Angers in the 1880s, and the story goes that he distilled his first batch of Menthe-Pastille not for a bar but for a hotel — the Grand Hôtel on the city square, where guests were wilting in a summer too hot for the menu. The mint liqueur he handed over that week became the foundation of a house that has, against all reasonable odds, stayed in the same family for nearly a hundred and forty years.',
        'The current generation is the fourth. The recipes are still measured by hand. The fruit still travels less than two hundred kilometres for most of the eaux-de-vie — Loire pear, Burgundy cassis, Languedoc apricot — and the cellar in Avrillé still smells the way it must have done in 1900. There is a particular kind of stubbornness involved in not scaling, in not selling, in not chasing the gin boom or the seltzer wave. Giffard has it in abundance.',
        "The portfolio runs deep: the Premium Cocktail tier developed with the world's leading bartenders, the Classic liqueurs that anchor a back-bar, the syrups that pour through cocktail and coffee programs, and a small library of single-fruit distillates that drink like the orchard they came from.",
      ],
    },
    craft: {
      statement:
        'Real fruit. Real distillation. No artificial flavours — the Giffard rule, kept since 1885, and the reason the bartenders who use it most never switch.',
      pillars: [
        { title: 'Whole-fruit maceration', body: 'Real fruit pressed, macerated and distilled — never extracts, never artificial flavours.' },
        { title: 'Premium Cocktail tier', body: "Developed with the world's leading bartenders. Built for serious cocktail programs." },
        { title: 'Quiet ageing', body: 'Selected expressions rest in oak in the Loire cellars before release.' },
      ],
    },
    values: {
      label: 'Values',
      heading: 'Family-owned. Still.',
      paragraphs: [
        'Giffard has been in the same family for four generations — a fact that sounds romantic until you understand what it has cost. There are easier ways to make liqueur than buying Loire pears. There are easier ways to run a business than keeping the original 1885 recipes intact. The family has chosen the harder version every time.',
        'That decision shapes everything that comes out of Angers — the AOC ingredients, the long maceration times, the refusal to use artificial colouring. The bottles cost a bit more for a reason; they do a bit more on the back-bar to earn it.',
      ],
    },
    range: [
      { name: 'Crème de Cassis Noir de Bourgogne', spec: '20% ABV · 700ml', note: 'Burgundy blackcurrant — deep, plummy, the gold standard for a Kir.', image: gf('cassis') },
      { name: 'Apricot Brandy', spec: '25% ABV · 700ml', note: 'Sun-ripened Roussillon apricot. Stone-fruit core with brandy depth.', image: '/images/giffard-abricot-du-roussillon-apricot-liqueur.webp' },
      { name: 'Banane du Brésil', spec: '25% ABV · 700ml', note: 'Ripe yellow banana — softly tropical, never sweet.' },
      { name: 'Caribbean Pineapple', spec: '20% ABV · 700ml', note: 'Slow-roasted pineapple with a smoky-sweet edge.', image: '/images/giffard-caribbean-pineapple-liqueur.webp' },
      { name: 'Menthe-Pastille', spec: '24% ABV · 700ml', note: 'The original. Cool, clean peppermint — built in 1885 for a heatwave.', image: gf('menthe') },
      { name: 'Crème de Violette', spec: '16% ABV · 700ml', note: 'Parma violets and crushed petals. The Aviation, properly.' },
    ],
    tasting: {
      of: 'Cassis Noir de Bourgogne',
      nose: 'Black fruit, ripe plum, a hint of forest floor.',
      palate: 'Concentrated blackcurrant — sweet, then quickly dry; brambly tannin.',
      finish: 'Long, savoury, dark-fruit lift.',
      serve: 'Top with chilled crémant for a Kir Royale, or stir into a Bramble with gin, lemon and a barspoon of cassis floated over crushed ice.',
    },
    serves: [
      { name: 'Kir Royale', build: 'Crémant, a measure of Crème de Cassis, a long lemon twist.', method: 'Build in glass', glass: 'Flute', image: '/images/brand-giffard-cocktail.webp' },
      { name: 'Aviation', build: 'Gin, lemon, maraschino, a whisper of Crème de Violette.', method: 'Shake, fine strain', glass: 'Coupe', image: gf('bartender') },
      { name: 'Giffard Spritz', build: 'Apricot Brandy, prosecco, soda, fresh thyme.', method: 'Build over ice', glass: 'Wine glass', image: gf('garnish') },
    ],
    stock: 'Talk to us about the full Giffard portfolio for Australia — wholesale, bar training, and entry to the annual Giffard West Cup competition.',
    facts: [
      { value: '1885', label: 'First Menthe-Pastille, Angers' },
      { value: '4', label: 'Generations of the same family' },
      { value: '<200km', label: 'Most fruit travels to the still' },
      { value: '#7', label: 'Bestselling brand 2026 · #8 top trending' },
    ],
    trade: [
      'Full liqueur, syrup and purée range from one supplier',
      'Giffard West Cup — the annual bartender competition',
      'Café programs: syrups that hold up in milk and espresso',
    ],
    extra: {
      heading: 'The Giffard West Cup.',
      body: "Every year we run the Giffard West Cup for Western Australia's bartenders — a cocktail competition built around the Premium Cocktail range, with the winner's serve going on menus across the state. Ask the trade team about entry.",
    },
    site: 'https://www.giffard.com',
  },
  {
    slug: 'burnt-ends',
    name: 'Burnt Ends',
    eyebrow: 'Scotland × Singapore · Blended Whiskey',
    quote: 'Smoke, oak, conviction.',
    story: {
      heading: 'Built for the fire.',
      paragraphs: [
        "Burnt Ends is the whiskey project that came out of one of Asia's most celebrated kitchens — Burnt Ends in Singapore, a four-tonne wood-burning restaurant where almost everything that hits a plate has spent time near flame. The team there had a problem familiar to anyone who cooks with smoke: most whiskies disappear next to charred food. They wanted one that would hold its own.",
        'The blend was developed in Scotland, in collaboration with master blenders who understood the brief — a whiskey designed to pair with smoke, not retreat from it. Heavier oak. More peat than a balanced dram would normally take. A backbone built for sharing the plate with ember-cooked beef, blackened bone marrow, or a glass of something cold at the end of a long service.',
        'It is, in other words, a back-bar whiskey for restaurants that actually feed people. Australian fire-driven kitchens have taken to it for the obvious reason: it pours well with the food they cook. 3Two1 distributes the bottle nationally and we love it in any bar that takes its highball seriously.',
      ],
    },
    craft: {
      statement: 'A whiskey designed to pair with smoke and char — built around heavier oak, gently peated malt, and a long, mineral finish.',
      pillars: [
        { title: 'Smoke-forward', body: 'Peated malt notes balanced against rich grain and ex-bourbon oak.' },
        { title: 'Charred American oak', body: 'Heavy char on the maturation oak gives the spirit its dark caramel backbone.' },
        { title: 'For fire kitchens', body: 'Developed to stand next to ember-cooked food without fading into it.' },
      ],
    },
    range: [
      { name: 'Burnt Ends Blended Whiskey', spec: '40% ABV · 700ml', note: 'Charred oak, soft peat, baked stone fruit and a long, dry finish.', image: '/images/house-burnt-ends.webp' },
    ],
    tasting: {
      of: 'Burnt Ends Blended',
      nose: 'Charred oak, dried apricot, a thread of campfire smoke.',
      palate: 'Toffee and baked apple up front; warm leather and a gentle peat hum behind.',
      finish: 'Long, mineral, faintly salty.',
      serve: 'A smoked highball with a long lemon swatch, or neat with a single large rock alongside something off the grill.',
    },
    serves: [
      { name: 'Burnt Ends Highball', build: 'Whiskey, premium soda, charred lemon peel.', method: 'Build over cubes', glass: 'Highball', image: '/images/brands/burnt-ends/serve-highball.webp' },
      { name: 'Smoked Manhattan', build: 'Whiskey, sweet vermouth, mole bitters, glass smoked with hickory.', method: 'Stir, smoke the glass', glass: 'Coupe', image: '/images/brands/burnt-ends/serve-manhattan.webp' },
      { name: 'Ember Sour', build: 'Whiskey, lemon, brown sugar, a teaspoon of egg white.', method: 'Dry shake, then wet', glass: 'Rocks', image: '/images/brands/burnt-ends/serve-sour.webp' },
    ],
    stock: 'Talk to our trade team about pairings, allocations, and fire-driven kitchen activations across Australia.',
    facts: [
      { value: '4t', label: 'Wood-burning oven behind the idea' },
      { value: '2', label: 'Countries: blended in Scotland, born in Singapore' },
      { value: '40%', label: 'ABV — built for the highball' },
      { value: '1', label: 'Job: stand up to smoke' },
    ],
    trade: [
      'Fire-driven kitchens and grill restaurants',
      'Smoked highball programs',
      'Whiskey-and-food pairing menus',
    ],
    extra: {
      heading: 'Pair it with the grill.',
      body: 'Ember-cooked beef, blackened bone marrow, charred corn with chilli butter, smoked brisket. The peat and heavy char in Burnt Ends meet the crust on the plate rather than fighting it — so a pour next to the food tastes bigger, not thinner.',
    },
    site: 'https://www.masterofmalt.com/whiskies/burnt-ends/',
  },
  {
    slug: 'whiskey-row',
    name: 'Whiskey Row',
    eyebrow: 'Louisville · Kentucky Bourbon',
    quote: 'Louisville-born. Bar-built.',
    story: {
      heading: 'Named for the street that built bourbon.',
      paragraphs: [
        'Main Street in Louisville used to be called Whiskey Row — a four-block stretch of warehouses, blenders and offices that, at its peak, ran most of the American bourbon trade. Prohibition closed it. Time and decay almost finished it. In the last decade Louisville has spent serious money bringing the district back, and along with it a small wave of distillers who looked at the heritage and said, fine — but it has to be good. The name is not enough.',
        'Whiskey Row is one of those projects. A small-batch, high-rye bourbon mashed and matured under the Kentucky climate, then released only when the team is happy with the proof point. The mash bill leans on rye for spice and structure rather than the corn-sweet route most mass-market bourbons take. The result is a back-bar whiskey built for cocktail work — the Old Fashioned that doesn\'t need sugar to find balance, the Manhattan that holds up against bitter Italian vermouth.',
        'We carry Whiskey Row into Western Australian bars looking for a bourbon with a point of view. It is not the loudest pour on the shelf, but it sits well on a menu and earns its place over time.',
      ],
    },
    craft: {
      statement: 'High-rye mash. Charred American oak. Small-batch releases — bottled when the proof is right, not when the quarter is ending.',
      pillars: [
        { title: 'High-rye mash', body: 'More rye in the mash than the mainstream — spice and structure up front.' },
        { title: 'Char #4 American oak', body: 'Heavy char for caramelised oak sugars and deep amber colour.' },
        { title: 'Small-batch bottling', body: 'Each release is a small batch. No mass-blend chase for consistency.' },
      ],
    },
    range: [
      { name: 'Whiskey Row Bourbon', spec: '45% ABV · 700ml', note: 'Caramel, baking spice, charred oak — a high-rye bourbon built for cocktails.', image: wr('bottle') },
    ],
    tasting: {
      of: 'Whiskey Row Bourbon',
      nose: 'Caramel, vanilla, cinnamon, a whiff of orchard fruit.',
      palate: 'Rich and warm — toasted oak, dried apple, baking spice from the rye.',
      finish: 'Long and lightly drying, with a final note of dark chocolate.',
      serve: 'An Old Fashioned with demerara and orange peel — the rye in the mash means the cocktail almost builds itself.',
    },
    serves: [
      { name: 'Old Fashioned', build: 'Bourbon, demerara, Angostura, a flamed orange peel.', method: 'Stir down, big rock', glass: 'Rocks', image: '/images/brand-whiskey-row-cocktail.webp' },
      { name: 'Whiskey Sour', build: 'Bourbon, lemon, demerara, egg white, three drops of bitters.', method: 'Dry shake, then wet', glass: 'Rocks', image: wr('bib-serve') },
      { name: 'Boulevardier', build: 'Bourbon, sweet vermouth, Campari, a long orange twist.', method: 'Stir, strain', glass: 'Coupe', image: '/images/brand-whiskey-row-manhattan.webp' },
    ],
    stock: 'Talk to our trade team about allocations, bourbon nights and back-bar education across Australia.',
    facts: [
      { value: '4', label: 'Blocks of Main Street, Louisville' },
      { value: '#4', label: 'Char on new American oak' },
      { value: '45%', label: 'ABV — proof that holds in a cocktail' },
      { value: '1', label: 'Small batch at a time' },
    ],
    trade: [
      'House bourbon for Old Fashioned and Manhattan programs',
      'Bourbon nights and Kentucky-themed activations',
      'Back-bar education on mash bills and char',
    ],
    extra: {
      heading: 'Why high-rye matters.',
      body: 'Most bourbon leans on corn for sweetness. Whiskey Row pushes the rye up, which brings pepper, baking spice and a drier frame. In a cocktail that means less sugar, more structure, and a drink that still tastes of whiskey after the ice has done its work.',
    },
    site: 'https://whiskeyrowbourbon.com',
  },
  {
    slug: 'demonio-de-los-andes',
    name: 'Demonio de los Andes',
    eyebrow: 'Ica, Peru · Pisco',
    quote: 'Peru, in a single pass.',
    story: {
      heading: 'A devil of a name, from a very old vineyard.',
      paragraphs: [
        'Demonio de los Andes is made by Viña Tacama in the Ica Valley, on an estate whose vines trace back to the 1540s — among the oldest planted anywhere in South America. Ica is desert country: hot days, cold nights, almost no rain, and river water brought down from the Andes. Grapes there ripen hard and keep their acidity, which is exactly what a pisco wants.',
        'The name belongs to Francisco de Carvajal, the sixteenth-century conquistador Peru remembers as the Demon of the Andes — feared, near-unbeatable in the field, and impossible to forget. His mounted figure rides across every label. It is a deliberately loud name for a spirit that is, underneath, made in the most disciplined way the category allows.',
        'Pisco made the Peruvian way — grape spirit taken to proof in one distillation, with nothing added and nothing pulled back out. No water to bring the strength down, no sugar, no wood, no colour. What the grape and the still give you is what goes in the bottle. We bring it to Australia for the Pisco Sour and for everything that comes after it.',
      ],
    },
    craft: {
      statement: 'One distillation of freshly fermented grape must, straight to bottling strength. Nothing added, nothing taken away — the rules Peru writes into pisco itself.',
      pillars: [
        { title: 'Single distillation', body: 'Fermented must goes through the still once and comes off at proof. No redistilling, no dilution afterwards.' },
        { title: 'Desert-grown grapes', body: 'Quebranta, Italia and friends from the Ica Valley — sun-ripened, with cold-night acidity, on river-fed vines.' },
        { title: 'Rested, never aged', body: 'The spirit rests in neutral vessels before bottling. No wood, so the grape stays front and centre.' },
      ],
    },
    values: {
      label: 'The rules',
      heading: 'What Peru does not allow.',
      paragraphs: [
        'Peruvian pisco is one of the most tightly defined spirits in the world. It must be distilled once, to proof. It cannot be cut with water. It cannot be sweetened, coloured or flavoured, and it cannot touch wood. It must rest before release. Each rule takes a shortcut off the table.',
        'That is why a good pisco tastes so obviously of grapes — it has nowhere to hide. Demonio de los Andes leans into it: three expressions that show what the grape does, rather than what the distiller added.',
      ],
    },
    range: [
      { name: 'Demonio de los Andes Acholado', spec: '40% ABV · 700ml', note: 'The blend. Lime, orange and jasmine on the nose; dried nuts and blond tobacco in the mouth. Built for every cocktail.', image: dm('acholado') },
      { name: 'Demonio de los Andes Quebranta', spec: '40% ABV · 700ml', note: 'The non-aromatic workhorse grape of pisco — earthy, rounded and quietly fruity. The classic Pisco Sour base.', image: dm('quebranta') },
      { name: 'Demonio de los Andes Italia', spec: '40% ABV · 700ml', note: 'An aromatic grape — floral, juicy and perfumed. Lovely in a Chilcano, or neat and cold.', image: dm('italia') },
    ],
    tasting: {
      of: 'Demonio de los Andes Acholado',
      nose: 'Lime zest, orange peel and jasmine.',
      palate: 'Bright and clean, with dried nuts and blond tobacco under the fruit.',
      finish: 'Smooth, dry and pleasantly long.',
      serve: 'A Pisco Sour: Acholado, fresh lime, sugar syrup and egg white, shaken hard and finished with a few drops of Angostura bitters.',
    },
    serves: [
      { name: 'Pisco Sour', build: 'Acholado, fresh lime and sugar syrup at 3 : 1 : 1, egg white, a few drops of Angostura bitters.', method: 'Shake hard over ice for the foam', glass: 'Coupe', image: dm('serve-pisco-sour') },
      { name: 'Chilcano', build: 'Acholado (60 ml), fresh lime (15 ml), chilled ginger ale (120–150 ml), 2–3 drops of Angostura.', method: 'Build over ice, top slowly with ginger ale, stir once; lime wheel', glass: 'Highball', image: dm('serve-chilcano') },
      { name: 'El Capitán', build: 'Quebranta Reserva de Familia (60 ml), vermouth rosso (60 ml), an orange twist.', method: 'Stir over ice for 20–25 seconds — never shaken; express the orange peel', glass: 'Coupe', image: dm('serve-capitan') },
    ],
    stock: 'Talk to our trade team about pisco allocations, Pisco Sour training, and Peruvian-night activations across Australia.',
    facts: [
      { value: '1540s', label: 'Roots of the Tacama vineyard in Ica' },
      { value: '1', label: 'Distillation — straight to proof' },
      { value: '0', label: 'Water, sugar, wood or colour added' },
      { value: '40%', label: 'ABV across the range' },
    ],
    trade: [
      'The Pisco Sour, done properly — with training to match',
      'Chilcano as an easy, quick-build highball',
      'A grape spirit for agave and gin drinkers to discover',
    ],
    extra: {
      heading: 'Who was the Demon of the Andes?',
      body: 'Francisco de Carvajal was a soldier in the civil wars that tore through sixteenth-century Peru, famous for his speed, his cunning and his ruthlessness — the rider who always seemed to arrive before anyone expected him. The legend stuck. Tacama put him on the label, at full gallop.',
    },
    site: 'https://www.tacama.com',
  },
  {
    slug: 'thoquino',
    name: 'Thoquino Cachaça',
    eyebrow: 'Rio de Janeiro, Brazil · Cachaça · Since 1906',
    quote: 'Cane, straight from the field.',
    story: {
      heading: 'Fresh cane, Campos country.',
      paragraphs: [
        'Thoquino has been distilling since 1906 in the Campos region of northern Rio de Janeiro state — flat, green sugarcane country between the mountains and the Atlantic. The distillery grows its own cane, which means it decides when to cut, and gets the juice to the still while it is still fresh.',
        'That is the whole point of cachaça. It is pressed from fresh-cut sugarcane rather than molasses — grassy, bright and faintly wild. Where most rum starts from a by-product of sugar refining, cachaça starts from the plant itself, so the spirit tastes green and alive in a way molasses rum rarely does.',
        'Thoquino distils at a low strength, keeping more of the cane character in the spirit, and it is ready to bottle soon after it comes off the still. It is the backbone of a Caipirinha worth drinking — and we bring it to Australia for bars that want the real thing in that glass.',
      ],
    },
    craft: {
      statement: 'Estate-grown cane, pressed fresh and distilled at low strength — so what reaches the glass still tastes like the field it came from.',
      pillars: [
        { title: 'Estate cane', body: 'Thoquino grows its own sugarcane, controlling the harvest from planting to cutting.' },
        { title: 'Fresh juice, not molasses', body: 'Cane is pressed and the juice fermented straight away — the defining rule of cachaça.' },
        { title: 'Low-strength distillation', body: 'Distilled gently to keep the grassy, vegetal character of the cane in the spirit.' },
      ],
    },
    range: [
      { name: 'Thoquino Cachaça', spec: '40% ABV · 700ml', note: 'The classic white. Fresh-cut grass, green banana and lime — made for the Caipirinha.', image: '/images/house-thoquino.webp' },
      { name: 'Thoquino Aged', spec: '40% ABV · 700ml', note: 'Rested before bottling for a rounder, softer cane spirit. Sip it, or use it where a white feels too sharp.', image: '/images/brands/thoquino/aged-bottle.webp' },
    ],
    tasting: {
      of: 'Thoquino Cachaça',
      nose: 'Freshly cut cane, green grass, lime peel.',
      palate: 'Bright and lively — sugarcane sweetness, green banana and a peppery edge.',
      finish: 'Clean and fresh, with a faint vegetal snap.',
      serve: 'A Caipirinha: half a lime cut into wedges, muddled with sugar in the glass, then Thoquino and plenty of crushed ice.',
    },
    serves: [
      { name: 'Caipirinha', build: 'Thoquino, fresh lime wedges, sugar, crushed ice.', method: 'Muddle and build', glass: 'Rocks', image: '/images/brands/thoquino/caipirinha.webp' },
      { name: 'Batida de Coco', build: 'Thoquino, coconut milk, condensed milk, crushed ice.', method: 'Blend or hard shake', glass: 'Rocks', image: '/images/brands/thoquino/batida-de-coco.webp' },
      { name: 'Rabo de Galo', build: 'Thoquino, sweet vermouth, Cynar, an orange twist.', method: 'Stir down', glass: 'Rocks', image: '/images/brands/thoquino/rabo-de-galo.webp' },
    ],
    stock: 'Talk to our trade team about cachaça allocations, Caipirinha training, and Brazilian-night activations across Australia.',
    facts: [
      { value: '1906', label: 'Distilling in the Campos region' },
      { value: '100%', label: 'Fresh sugarcane juice — no molasses' },
      { value: '1', label: 'Estate growing its own cane' },
      { value: '40%', label: 'ABV, ready for the Caipirinha' },
    ],
    trade: [
      'A real Caipirinha for the cocktail list',
      'Batidas and frozen serves for summer menus',
      'A fresh-cane story for rum-curious drinkers',
    ],
    extra: {
      heading: 'Cachaça is not rum.',
      body: 'Both come from sugarcane, but most rum is distilled from molasses — the dark syrup left after sugar is made. Cachaça must come from fresh cane juice, fermented and distilled in Brazil. That one rule is why it tastes greener, brighter and wilder than almost any rum on the shelf.',
    },
  },
];

export const brandPage = (slug: string) => brandPages.find((b) => b.slug === slug);
