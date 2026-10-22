// Product pages for the Giffard range shown on the homepage panel and the
// Giffard shelf. Content researched from giffard.com, Difford's Guide and
// other sources listed per product; supporting photos are free-licence
// images from Wikimedia Commons, credited on each page.

import type { HouseProduct } from './houseProducts';

export const giffardProducts: HouseProduct[] = [
  {
    "slug": "apricot-liqueur",
    "label": "Apricot Liqueur",
    "fullName": "Giffard Abricot du Roussillon",
    "category": "Liqueur",
    "image": "/images/giffard-abricot-du-roussillon-apricot-liqueur.webp",
    "imageAlt": "Giffard Abricot du Roussillon apricot liqueur bottle in a French terroir scene",
    "accent": "#f0a04b",
    "tagline": "Roussillon apricots, slowly macerated in the Loire",
    "lede": "Abricot du Roussillon is Giffard's premium apricot liqueur, made by slowly macerating apricots from the Roussillon in the far south of France. It pours golden with orange glints and tastes like a pot of caramelised apricot compote, which makes it a natural fit for juleps, sours and sparkling serves.",
    "facts": [
      {
        "value": "25%",
        "label": "ABV"
      },
      {
        "value": "700 ml",
        "label": "Bottle"
      },
      {
        "value": "Roussillon, France",
        "label": "Fruit"
      },
      {
        "value": "Angers, France",
        "label": "Made in"
      }
    ],
    "about": [
      "Giffard is a family-owned liqueur house in Angers, in France's Loire Valley. Abricot du Roussillon sits in its Premium range and is made by a slow maceration of Rouge du Roussillon apricots in neutral alcohol, a gentle method that pulls flavour from the flesh and skin. Giffard chose Roussillon fruit for its firm, sweet and very fragrant flesh.",
      "At 25% ABV it carries more fruit and less heat than an apricot brandy, so it reads clearly in a mixed drink without dominating the base spirit. Giffard lists it as lactose free, gluten free, vegan and made without preservatives. It took a silver medal at the Internationaler Spirituosen Wettbewerb (ISW) in Germany in 2008 and was \"Recommended\" by the International Spirits Challenge jury in 2018."
    ],
    "fruit": {
      "heading": "The red apricots of the Roussillon",
      "paras": [
        "The Roussillon is the Catalan corner of France, in the Pyrénées-Orientales between the Mediterranean and the Pyrenees. Its apricot orchards sit in roughly a hundred communes across the lower and middle valleys and first hillsides, running from the coast to the foothills of the Corbières and the Canigou massif.",
        "The local fruit is easy to spot: an orange skin splashed with bright red, small to medium in size (about 35 to 55 mm across), sweet, low in acidity and very aromatic. The fruit is fragile and picked by hand, and since February 2016 \"Abricots rouges du Roussillon\" has been a Protected Designation of Origin (AOP) covering the Rouge du Roussillon variety and a handful of related ones."
      ],
      "image": {
        "src": "/images/brands/giffard/products/apricot-liqueur/apricots-sunlit-branch.webp",
        "alt": "Ripe apricots with a red blush hanging on a branch against a blue sky",
        "caption": "Ripe apricots with a red blush, the look of the Roussillon type"
      }
    },
    "tasting": {
      "appearance": "Golden yellow with orange hues; clear, mid-golden amber in the glass.",
      "nose": "Very ripe apricot first, then a light vegetal note, sweet spice and vanilla, with caramel on the finish.",
      "palate": "Very round and smooth, like caramelised apricot compote, with baked apricot flesh, honey and a hint of almond.",
      "finish": "Dried apricot and honey, lifted by a touch of citrus-like acidity that keeps the sweetness in check."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 4,
        "note": "Rich and jammy, but not cloying"
      },
      {
        "label": "Acidity",
        "value": 2,
        "note": "Gentle, tart lift on the finish"
      },
      {
        "label": "Fruit intensity",
        "value": 5,
        "note": "Unmistakably ripe, cooked apricot"
      },
      {
        "label": "Body",
        "value": 4,
        "note": "Round and smooth, coats the palate"
      },
      {
        "label": "Spice",
        "value": 2,
        "note": "Soft vanilla and sweet spice in the background"
      }
    ],
    "cocktails": [
      {
        "name": "Apricot Julep",
        "glass": "Rocks",
        "ice": "Crushed",
        "garnish": "Lime zest",
        "spec": [
          {
            "amount": "20",
            "unit": "ml",
            "what": "Cognac"
          },
          {
            "amount": "20",
            "unit": "ml",
            "what": "Giffard Abricot du Roussillon"
          },
          {
            "amount": "8–12",
            "unit": "leaves",
            "what": "fresh mint"
          }
        ],
        "method": [
          "Clap the mint leaves between your hands and drop them into the glass.",
          "Half-fill the glass with crushed ice.",
          "Add the Cognac and Abricot du Roussillon and stir to combine.",
          "Top with more crushed ice, garnish and serve."
        ],
        "note": "Created by eight international bartenders at a Giffard workshop led by Fernando Castellon. A short, summery julep where the liqueur does the sweetening.",
        "source": "https://www.giffard.com/en/cocktail/2045-apricot-julep-3"
      },
      {
        "name": "Roussillon Bubble",
        "glass": "Flute",
        "ice": "None",
        "garnish": "Lemon or orange zest",
        "spec": [
          {
            "amount": "1",
            "unit": "cube",
            "what": "sugar"
          },
          {
            "amount": "3",
            "unit": "dashes",
            "what": "aromatic bitters"
          },
          {
            "amount": "5",
            "unit": "ml",
            "what": "gin"
          },
          {
            "amount": "10",
            "unit": "ml",
            "what": "Giffard Abricot du Roussillon"
          },
          {
            "amount": "Top",
            "unit": "",
            "what": "Champagne"
          }
        ],
        "method": [
          "Soak the sugar cube with the bitters and drop it into the flute.",
          "Pour in the gin and Abricot du Roussillon; do not stir.",
          "Top with Champagne and garnish with a citrus zest."
        ],
        "note": "A Champagne Cocktail with an apricot accent, from the same Fernando Castellon workshop.",
        "source": "https://www.giffard.com/en/cocktail/2047-roussillon-bubble-3"
      }
    ],
    "uses": [
      {
        "title": "Classic apricot cocktails",
        "body": "Reach for it in older recipes that call for apricot liqueur, such as the Pendennis Club or Hotel Nacional. Expect a fresher, juicier apricot than older-style apricot brandies."
      },
      {
        "title": "Neat or on crushed ice",
        "body": "Giffard suggests serving it neat over crushed ice. A small pour also works as a digestif alongside a cheese board, especially with blue cheeses."
      },
      {
        "title": "In the pastry section",
        "body": "Brush it over sponge layers, fold it through crème pâtissière or use it to glaze apricot tarts. A splash in a pan sauce for pork or duck adds fruit and gloss."
      },
      {
        "title": "Storage",
        "body": "Keep the bottle sealed, upright and out of direct sunlight. As with any fruit liqueur, the brightest aromatics are in the first months after opening, so rotate stock rather than leaving a bottle open on the back bar for a year."
      }
    ],
    "faq": [
      {
        "q": "Is Abricot du Roussillon the same as apricot brandy?",
        "a": "No. It is a liqueur made by macerating apricots in neutral alcohol and is bottled at 25% ABV. Giffard also makes a separate, classic Apricot Liqueur (formerly sold as Apricot Brandy), but Abricot du Roussillon is the premium, single-origin version."
      },
      {
        "q": "Where do the apricots come from?",
        "a": "From the Roussillon, in the Pyrénées-Orientales department of southern France. The liqueur itself is made by Giffard in Angers, in the Loire Valley."
      },
      {
        "q": "What ABV is it, and what bottle size?",
        "a": "25% ABV, in a 700 ml bottle."
      },
      {
        "q": "Is it vegan and gluten free?",
        "a": "Giffard lists it as vegan, gluten free and lactose free, with no preservatives."
      },
      {
        "q": "What spirits does it pair with?",
        "a": "Cognac and other brandies are the classic match, as in the Apricot Julep. It also sits well with gin, aged rum, bourbon and sparkling wine."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/apricot-liqueur/apricots-on-branch.webp",
        "alt": "Two golden apricots among green leaves on the tree",
        "caption": "Apricots ripening in the summer sun"
      },
      {
        "src": "/images/brands/giffard/products/apricot-liqueur/canigou-massif.webp",
        "alt": "Snow-capped Canigou massif rising behind green fields",
        "caption": "The Canigou massif, the backdrop to the Roussillon's apricot orchards"
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/apricot-liqueur/apricots-on-branch.webp",
        "author": "Chris Light",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Apricots_7841.jpg"
      },
      {
        "file": "/images/brands/giffard/products/apricot-liqueur/canigou-massif.webp",
        "author": "Alan Mattingly",
        "licence": "CC0",
        "url": "https://commons.wikimedia.org/wiki/File:Canigou_massif_from_north-east.jpg"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/liqueurs-premium/367-abricot-du-roussillon-3.html",
      "https://www.diffordsguide.com/beer-wine-spirits/1676/giffard-abricot-du-roussillon",
      "https://www.giffard.com/en/cocktail/2045-apricot-julep-3",
      "https://www.giffard.com/en/cocktail/2047-roussillon-bubble-3",
      "https://extranet.inao.gouv.fr/fichier/PNOCDCAbricotsRougesRoussillon.pdf",
      "https://en.wikipedia.org/wiki/Apricot"
    ]
  },
  {
    "slug": "caribbean-pineapple-liqueur",
    "label": "Caribbean Pineapple",
    "fullName": "Giffard Caribbean Pineapple",
    "category": "Liqueur",
    "image": "/images/giffard-caribbean-pineapple-liqueur.webp",
    "imageAlt": "Giffard Caribbean Pineapple liqueur bottle with fresh pineapple and palms",
    "accent": "#f2c230",
    "tagline": "Fresh and candied pineapple, lifted by aged Caribbean rum",
    "lede": "Caribbean Pineapple is Giffard's premium pineapple liqueur: fresh Caribbean pineapple, a second infusion of candied pineapple and a measure of 7-year-old Caribbean rum. It tastes of ripe, flambéed pineapple with a little spice, and it is built for daiquiris, coladas and tiki.",
    "facts": [
      {
        "value": "20%",
        "label": "ABV"
      },
      {
        "value": "700 ml",
        "label": "Bottle"
      },
      {
        "value": "Caribbean pineapple",
        "label": "Fruit"
      },
      {
        "value": "7-year-old rum",
        "label": "Base"
      }
    ],
    "about": [
      "Edith Giffard describes it as a blend of an infusion of fresh pineapples ripened under the Caribbean sun, reinforced by a candied pineapple infusion, then enhanced with a 7-year-old Caribbean rum and spices. Launched in May 2017, it took more than a year of trials to settle on the right pineapple variety, and flavour is drawn from the skin, leaves and flesh. Careful filtration gives the liqueur its clarity and stability.",
      "The two infusions do different jobs: fresh fruit brings the bright, juicy top notes, while the candied pineapple adds depth and a caramelised, grilled character. The rum gives backbone, and at 20% ABV it is easy to balance in a shaken drink. It was named a Liqueur Master in The Spirits Business Masters 2017, and Giffard lists it as lactose free, gluten free, vegan and preservative free."
    ],
    "fruit": {
      "heading": "A fruit of the Americas",
      "paras": [
        "The pineapple (Ananas comosus) is native to South America and had spread through the Caribbean long before Europeans arrived. Christopher Columbus's expedition met it on Guadeloupe in 1493, and it soon became a symbol of luxury in Europe, where it was grown at great expense in heated hothouses.",
        "Each pineapple is in fact many fruitlets fused around a central core, and it does not keep ripening once picked, so fruit harvested at full ripeness carries far more aroma and sugar. That is the character Giffard is after: golden flesh, buttery tropical aromatics and a balancing acidity, which the candied-fruit infusion then deepens."
      ],
      "image": {
        "src": "/images/brands/giffard/products/caribbean-pineapple-liqueur/pineapple-ripening.webp",
        "alt": "Several pineapples ripening on spiky plants in a field",
        "caption": "Pineapples ripening on the plant, building sugar and aroma"
      }
    },
    "tasting": {
      "appearance": "Very bright, clear golden yellow.",
      "nose": "Strong and buttery: freshly sliced ripe pineapple, grilled pineapple and candied pineapple.",
      "palate": "Warm notes of flambéed pineapple, rich and ripe, with faint vanilla, delicate cinnamon and peppery spice.",
      "finish": "Long, with cooked pineapple and light citric acidity that stops it feeling heavy."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 4,
        "note": "Rich, but balanced by acidity"
      },
      {
        "label": "Acidity",
        "value": 3,
        "note": "Light citric lift keeps it fresh"
      },
      {
        "label": "Fruit intensity",
        "value": 5,
        "note": "Fresh, grilled and candied pineapple"
      },
      {
        "label": "Body",
        "value": 3,
        "note": "Medium weight, silky"
      },
      {
        "label": "Spice",
        "value": 2,
        "note": "Cinnamon, pepper and a touch of vanilla"
      }
    ],
    "cocktails": [
      {
        "name": "Tropical Pineapple Daiquiri",
        "glass": "Coupe or cocktail glass",
        "ice": "None (shaken, served up)",
        "garnish": "None",
        "spec": [
          {
            "amount": "40",
            "unit": "ml",
            "what": "white rum"
          },
          {
            "amount": "25",
            "unit": "ml",
            "what": "Giffard Caribbean Pineapple"
          },
          {
            "amount": "20",
            "unit": "ml",
            "what": "fresh lime juice"
          },
          {
            "amount": "10",
            "unit": "ml",
            "what": "orgeat syrup"
          }
        ],
        "method": [
          "Chill the glass.",
          "Add everything to a shaker and fill two-thirds with ice.",
          "Shake hard for 7 to 10 seconds.",
          "Strain into the chilled glass."
        ],
        "note": "The orgeat adds a soft almond note that plays well with the candied-pineapple side of the liqueur.",
        "source": "https://www.giffard.com/en/cocktail/4900-tropical-pineapple-daiquiri-2"
      },
      {
        "name": "Pineapple Sour",
        "glass": "Rocks",
        "ice": "Cubed",
        "garnish": "Pineapple leaves and/or a pineapple wedge",
        "spec": [
          {
            "amount": "50",
            "unit": "ml",
            "what": "bourbon"
          },
          {
            "amount": "40",
            "unit": "ml",
            "what": "Giffard Caribbean Pineapple"
          },
          {
            "amount": "20",
            "unit": "ml",
            "what": "fresh lemon juice"
          },
          {
            "amount": "5",
            "unit": "ml",
            "what": "Giffard Vanille de Madagascar"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "egg white"
          }
        ],
        "method": [
          "Add everything to a shaker and dry shake (no ice) for 15 seconds.",
          "Fill the shaker two-thirds with ice and shake hard again for 7 to 10 seconds.",
          "Strain into an ice-filled rocks glass and garnish."
        ],
        "note": "Created by Theodoros Spiropoulos in 2017. Bourbon's vanilla and oak meet the pineapple's caramelised side.",
        "source": "https://www.giffard.com/en/cocktail/4902-pineapple-sour-3"
      }
    ],
    "uses": [
      {
        "title": "Tiki and tropical",
        "body": "Use it to reinforce fresh pineapple juice in a Piña Colada or Jungle Bird, or to replace part of the sugar so the pineapple comes through without extra juice."
      },
      {
        "title": "Stirred drinks",
        "body": "Its rum backbone means it holds up in stirred serves. Try a bar spoon or two in a rum Old Fashioned, or in place of some of the sweet vermouth in a rum Manhattan."
      },
      {
        "title": "Simple serves",
        "body": "Giffard suggests it neat over crushed ice. It also makes an easy highball with soda water or ginger ale and a lime wedge."
      },
      {
        "title": "Kitchen and storage",
        "body": "Spoon it over grilled pineapple or vanilla ice cream, or use it in a glaze for ham. Store sealed, upright and away from sunlight, and use within a few months of opening for the freshest fruit."
      }
    ],
    "faq": [
      {
        "q": "Does it contain rum?",
        "a": "Yes. Giffard blends in a 7-year-old Caribbean rum alongside the fresh and candied pineapple infusions."
      },
      {
        "q": "What ABV is it, and what bottle size?",
        "a": "20% ABV, in a 700 ml bottle."
      },
      {
        "q": "Is it vegan and gluten free?",
        "a": "Giffard lists it as vegan, gluten free and lactose free, with no preservatives."
      },
      {
        "q": "Has it won any awards?",
        "a": "It was named a Liqueur Master in The Spirits Business Masters 2017."
      },
      {
        "q": "Can I use it in place of pineapple juice?",
        "a": "Not one for one. It is sweeter and more concentrated, so use it alongside fresh juice or in place of some of the syrup in a recipe."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/caribbean-pineapple-liqueur/candied-pineapple.webp",
        "alt": "Close-up of sugared candied pineapple rings",
        "caption": "Candied pineapple, the source of the liqueur's second, deeper infusion"
      },
      {
        "src": "/images/brands/giffard/products/caribbean-pineapple-liqueur/ripe-pineapple.webp",
        "alt": "A ripe golden pineapple standing on a dark table",
        "caption": "Fully ripe pineapple, golden and fragrant"
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/caribbean-pineapple-liqueur/pineapple-ripening.webp",
        "author": "Forest and Kim Starr",
        "licence": "CC BY 3.0 US",
        "url": "https://commons.wikimedia.org/wiki/File:Starr-160729-0432-Ananas_comosus-fruit_ripening-Hawea_Pl_Olinda-Maui_(29632704836).jpg"
      },
      {
        "file": "/images/brands/giffard/products/caribbean-pineapple-liqueur/candied-pineapple.webp",
        "author": "Fumikas Sagisavas",
        "licence": "CC0",
        "url": "https://commons.wikimedia.org/wiki/File:Pineapple_candied_fruit_(1).jpg"
      },
      {
        "file": "/images/brands/giffard/products/caribbean-pineapple-liqueur/ripe-pineapple.webp",
        "author": "Wilfredor",
        "licence": "CC0",
        "url": "https://commons.wikimedia.org/wiki/File:Pineapple_fruit_2.jpg"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/liqueurs-premium/4898-caribbean-pineapple-2.html",
      "https://www.diffordsguide.com/beer-wine-spirits/liqueurs-alc-cordials/fruit-liqueurs/BWS005986/giffard-premium-pineapple-liqueur",
      "https://www.giffard.com/en/cocktail/4900-tropical-pineapple-daiquiri-2",
      "https://www.giffard.com/en/cocktail/4902-pineapple-sour-3",
      "https://en.wikipedia.org/wiki/Pineapple"
    ]
  },
  {
    "slug": "lychee-liqueur",
    "label": "Lychee Liqueur",
    "fullName": "Giffard Lichi-Li",
    "category": "Liqueur",
    "image": "/images/giffard-lychee-liqueur.webp",
    "imageAlt": "Giffard Lychee-Li lychee liqueur bottle with fresh lychees and blossom",
    "accent": "#f2a6b8",
    "tagline": "Fragrant lychee with notes of rose",
    "lede": "Lichi-Li is Giffard's lychee liqueur, a light pink pour with the floral, rose-scented notes of fresh lychee. It is the bottle behind a proper Lychee Martini and a gentle, aromatic lift in spritzes and long drinks.",
    "facts": [
      {
        "value": "18%",
        "label": "ABV"
      },
      {
        "value": "700 ml",
        "label": "Bottle"
      },
      {
        "value": "Lychee",
        "label": "Fruit"
      },
      {
        "value": "Angers, France",
        "label": "Made in"
      }
    ],
    "about": [
      "Lichi-Li is made by Giffard in Angers, in the Loire Valley. According to Difford's Guide, it is built on a distillate made by macerating and then redistilling lychees from Asia, mainly Taiwan, and is also flavoured with passion fruit. Distilling the macerate captures the lychee's delicate, floral top notes.",
      "At 18% ABV it is one of the lighter liqueurs in the Giffard range, so it adds aroma and sweetness without much alcohol. The colour is a pale pink, close to the blush of the fruit itself. Giffard lists it as lactose free, gluten free, vegan and made without preservatives."
    ],
    "fruit": {
      "heading": "An ancient fruit of southern China",
      "paras": [
        "The lychee (Litchi chinensis) is a tropical tree in the soapberry family, native to southern China, where it has been cultivated for more than two thousand years. It was prized at the imperial court: Tang dynasty accounts tell of fresh lychees rushed by relay riders to the capital for the consort Yang Guifei.",
        "Giffard notes that it is now grown in China, India, Madagascar and Thailand, and Taiwan is also a notable producer. Under the bumpy, rose-red shell is translucent white flesh around a glossy brown seed, with a scent often compared to rose. That perfume is what Lichi-Li sets out to capture."
      ],
      "image": {
        "src": "/images/brands/giffard/products/lychee-liqueur/lychees-peeled.webp",
        "alt": "A whole lychee, a peeled lychee and its brown seed",
        "caption": "The lychee: bumpy red shell, translucent flesh and a single glossy seed"
      }
    },
    "tasting": {
      "appearance": "Clear, light salmon pink.",
      "nose": "Very intense, fresh and lively: fresh lychee and rose.",
      "palate": "Characteristic lychee with very floral notes and a hint of vanilla, plus a little citrus and peach-sweet character.",
      "finish": "Fruity lychee with a dry, slightly bitter edge reminiscent of tonic water."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 4,
        "note": "Soft and sweet, but light-bodied"
      },
      {
        "label": "Acidity",
        "value": 2,
        "note": "A gentle citrus lift"
      },
      {
        "label": "Fruit intensity",
        "value": 4,
        "note": "Fresh lychee, clear and true"
      },
      {
        "label": "Floral",
        "value": 5,
        "note": "Rose and blossom dominate the nose"
      },
      {
        "label": "Body",
        "value": 2,
        "note": "Light, at 18% ABV"
      }
    ],
    "cocktails": [
      {
        "name": "Lychee Martini",
        "glass": "Martini or coupe",
        "ice": "None (stirred, served up)",
        "garnish": "Lychees",
        "spec": [
          {
            "amount": "60",
            "unit": "ml",
            "what": "vodka"
          },
          {
            "amount": "30",
            "unit": "ml",
            "what": "Giffard Lichi-Li"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "dry vermouth"
          }
        ],
        "method": [
          "Chill the glass.",
          "Add everything to a mixing glass and fill two-thirds with ice.",
          "Stir for 15 to 20 seconds.",
          "Strain into the chilled glass and garnish with a lychee."
        ],
        "note": "Thought to have been created around 2001 in a Korean restaurant in New York. The dry vermouth keeps it from tipping too sweet.",
        "source": "https://www.giffard.com/en/cocktail/6183-lychee-martini"
      },
      {
        "name": "Lychee & Elderflower Spritz",
        "glass": "Rocks",
        "ice": "Cubed",
        "garnish": "Lychees",
        "spec": [
          {
            "amount": "15",
            "unit": "ml",
            "what": "Giffard Lichi-Li"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "Giffard Fleur de Sureau Sauvage (wild elderflower)"
          },
          {
            "amount": "45",
            "unit": "ml",
            "what": "sparkling wine"
          },
          {
            "amount": "Top",
            "unit": "",
            "what": "soda water"
          }
        ],
        "method": [
          "Fill the glass with ice.",
          "Add the liqueurs and sparkling wine.",
          "Top with soda water, stir gently and briefly, and garnish."
        ],
        "note": "Created by Simon Difford in 2013 at Jamie's Italian bar in London. A low-alcohol, floral aperitif.",
        "source": "https://www.giffard.com/en/cocktail/6184-lychee-elderflower-spritz"
      }
    ],
    "uses": [
      {
        "title": "Floral pairings",
        "body": "Lychee loves rose, elderflower, peach, raspberry and gin botanicals. Use it to soften a gin sour or add perfume to a French 75."
      },
      {
        "title": "Long and light",
        "body": "Giffard suggests it neat over crushed ice, in long drinks or in cocktails. Try 30 ml over ice topped with tonic or soda and a squeeze of lime."
      },
      {
        "title": "With Asian food",
        "body": "Its floral sweetness sits well with spicy Thai and Sichuan dishes. A splash in a fruit salad or sorbet base also works well."
      },
      {
        "title": "Storage",
        "body": "Store sealed, upright and away from light. The lychee aromatics are delicate, so it is at its best in the first few months after opening."
      }
    ],
    "faq": [
      {
        "q": "Why is it called Lichi-Li?",
        "a": "Lichi-Li is Giffard's name for its lychee liqueur. In Australia it is often listed as Giffard Lychee Liqueur (Lichi-Li)."
      },
      {
        "q": "What ABV is it, and what bottle size?",
        "a": "18% ABV, in a 700 ml bottle."
      },
      {
        "q": "Where do the lychees come from?",
        "a": "Difford's Guide reports that the lychees come from Asia, mainly Taiwan. The liqueur is made in Angers, France."
      },
      {
        "q": "Is it vegan and gluten free?",
        "a": "Giffard lists it as vegan, gluten free and lactose free, with no preservatives."
      },
      {
        "q": "What makes a good Lychee Martini?",
        "a": "Balance. Use a clean vodka, add a little dry vermouth to cut the sweetness, stir rather than shake for clarity, and garnish with a lychee."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/lychee-liqueur/lychee-cluster.webp",
        "alt": "A small group of red lychees on a pale background",
        "caption": "Fresh lychees, their red shells a sign of ripeness"
      },
      {
        "src": "/images/brands/giffard/products/lychee-liqueur/lychee-harvest.webp",
        "alt": "Workers on a tall ladder picking lychees from a large tree, with nets below",
        "caption": "Picking lychees by hand in Dahanu, India"
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/lychee-liqueur/lychee-cluster.webp",
        "author": "rajucreddy",
        "licence": "CC0",
        "url": "https://commons.wikimedia.org/wiki/File:Exotic_Lychee_Cluster_By_Raju_C_Reddy.jpg"
      },
      {
        "file": "/images/brands/giffard/products/lychee-liqueur/lychees-peeled.webp",
        "author": "Ivar Leidus",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Lychee_fruits_and_seed.jpg"
      },
      {
        "file": "/images/brands/giffard/products/lychee-liqueur/lychee-harvest.webp",
        "author": "Raman Patel",
        "licence": "CC BY 3.0",
        "url": "https://commons.wikimedia.org/wiki/File:Harvesting_of_Lychees_Fruit,_Golvad,_Dahanu_-_panoramio.jpg"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/classic-liqueurs/370-lichi-li-3.html",
      "https://www.diffordsguide.com/beer-wine-spirits/1678/giffard-lichi-li",
      "https://www.danmurphys.com.au/product/DM_ER_2000003154_GL-CL-LIC-070",
      "https://www.giffard.com/en/cocktail/6183-lychee-martini",
      "https://www.giffard.com/en/cocktail/6184-lychee-elderflower-spritz",
      "https://en.wikipedia.org/wiki/Lychee"
    ]
  },
  {
    "slug": "watermelon-liqueur",
    "label": "Watermelon Liqueur",
    "fullName": "Giffard Watermelon Liqueur",
    "category": "Liqueur",
    "image": "/images/giffard-watermelon-liqueur.webp",
    "imageAlt": "Giffard Watermelon liqueur bottle with fresh watermelon at Angers",
    "accent": "#ef4f5f",
    "tagline": "Fresh-cut watermelon with a clean, slightly bitter finish",
    "lede": "Giffard Watermelon Liqueur captures the taste of fresh-cut watermelon, from the juicy red flesh to a hint of the rind. It pours pinkish red, finishes clean with a faint bitterness, and brings summer to highballs, margaritas and martinis.",
    "facts": [
      {
        "value": "20%",
        "label": "ABV"
      },
      {
        "value": "500 ml & 700 ml",
        "label": "Bottle"
      },
      {
        "value": "Spain",
        "label": "Fruit"
      },
      {
        "value": "Angers, France",
        "label": "Made in"
      }
    ],
    "about": [
      "Watermelon is one of the hardest fruits to capture in a liqueur: it is mostly water and its flavour is delicate and fleeting. Giffard's version, made in Angers in the Loire Valley, is based on an infusion of Spanish watermelons, according to Difford's Guide, and tastes of the fruit rather than of a sweet, artificial \"watermelon\" flavour.",
      "The nose has a slight candy note with a mix of watermelon and melon, and the palate finishes with a lasting watermelon note that is slightly bitter, much like biting close to the rind. That bitterness is useful behind the bar, as it keeps the liqueur from tasting flat in long drinks. It is bottled at 20% ABV and listed by Giffard as lactose free, gluten free, vegan and made without preservatives."
    ],
    "fruit": {
      "heading": "From Africa to summer tables",
      "paras": [
        "The watermelon (Citrullus lanatus) originated in Africa, and its wild relatives grow in dry regions where the fruit was valued as much for its stored water as for its taste. It was grown in the Nile Valley in ancient Egyptian times, and seeds have been found in pharaonic tombs. From there it spread around the Mediterranean, across Asia and eventually to the Americas.",
        "Spain is one of Europe's major watermelon growers, with hot, sunny summers that build sugar in the fruit. A ripe watermelon has deep red, crisp flesh, a sweet, grassy scent and a refreshing, almost cucumber-like edge near the rind, all of which come through in Giffard's liqueur."
      ],
      "image": {
        "src": "/images/brands/giffard/products/watermelon-liqueur/watermelon-slice.webp",
        "alt": "A wedge of bright red watermelon on a white board",
        "caption": "Ripe watermelon: crisp red flesh and a pale green rind"
      }
    },
    "tasting": {
      "appearance": "Pinkish red; clear rose-pink in the glass.",
      "nose": "Slightly candied: fresh-cut watermelon and watermelon skin, with cantaloupe melon and a hint of boiled sweets.",
      "palate": "Rich but delicate ripe melon, clean, with a balancing, refreshing acidity.",
      "finish": "Long, with a watermelon note that turns slightly bitter, and a touch of candy floss."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 3,
        "note": "Sweet but clean"
      },
      {
        "label": "Acidity",
        "value": 3,
        "note": "Refreshing, keeps it lively"
      },
      {
        "label": "Fruit intensity",
        "value": 4,
        "note": "True watermelon with a melon edge"
      },
      {
        "label": "Bitterness",
        "value": 2,
        "note": "A gentle rind-like bite on the finish"
      },
      {
        "label": "Body",
        "value": 2,
        "note": "Light and juicy"
      }
    ],
    "cocktails": [
      {
        "name": "Watermelon Man",
        "glass": "Highball",
        "ice": "Cubed",
        "garnish": "Lime wedge",
        "spec": [
          {
            "amount": "60",
            "unit": "ml",
            "what": "vodka"
          },
          {
            "amount": "30",
            "unit": "ml",
            "what": "Giffard Watermelon Liqueur"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "fresh lime juice"
          },
          {
            "amount": "Top",
            "unit": "",
            "what": "lemon soda"
          }
        ],
        "method": [
          "Fill the glass with ice.",
          "Add the vodka, Watermelon Liqueur and lime juice.",
          "Top with lemon soda, stir gently and briefly, and garnish."
        ],
        "note": "Created in Berlin in the 1990s. An easy, refreshing highball where the liqueur's slight bitterness keeps it from being too sweet.",
        "source": "https://www.giffard.com/en/cocktail/6208-watermelon-man"
      },
      {
        "name": "Chad's Watermelon Martini",
        "glass": "Martini",
        "ice": "None (served up)",
        "garnish": "None listed",
        "spec": [
          {
            "amount": "50",
            "unit": "ml",
            "what": "vodka"
          },
          {
            "amount": "30",
            "unit": "ml",
            "what": "Giffard Watermelon Liqueur"
          },
          {
            "amount": "10",
            "unit": "ml",
            "what": "dry vermouth"
          },
          {
            "amount": "30",
            "unit": "ml",
            "what": "coconut water"
          }
        ],
        "method": [
          "Add everything to a shaker with ice.",
          "Shake and fine strain into a chilled martini glass."
        ],
        "note": "A community recipe by Chad Cunningham on Difford's Guide. Difford's only shows the full method to members, so the steps here are the standard approach. Coconut water adds a light, savoury freshness.",
        "source": "https://www.diffordsguide.com/cocktails/recipe/8460/chads-watermelon-martini"
      }
    ],
    "uses": [
      {
        "title": "Margaritas and Palomas",
        "body": "Replace part of the triple sec in a Margarita with Watermelon Liqueur, or add 15 ml to a Paloma. Tequila's vegetal notes and watermelon are a natural match."
      },
      {
        "title": "Spritzes and highballs",
        "body": "Giffard suggests it neat over crushed ice. It also works topped with soda, tonic or prosecco, with a little lime, mint or basil."
      },
      {
        "title": "Savoury pairings",
        "body": "Watermelon pairs well with mint, basil, cucumber, chilli, lime and salt. Try it with a salted or chilli-salt rim."
      },
      {
        "title": "Storage",
        "body": "Store sealed, upright and away from sunlight. The fresh watermelon aroma is delicate, so it is best used within a few months of opening."
      }
    ],
    "faq": [
      {
        "q": "What does it taste like?",
        "a": "Fresh-cut watermelon with a little melon and a light candy note, finishing with a slight, rind-like bitterness."
      },
      {
        "q": "What ABV is it, and what bottle sizes?",
        "a": "20% ABV. Giffard lists 500 ml and 700 ml bottles."
      },
      {
        "q": "Where do the watermelons come from?",
        "a": "Difford's Guide reports an infusion of Spanish watermelons. The liqueur is made by Giffard in Angers, France."
      },
      {
        "q": "Is it vegan and gluten free?",
        "a": "Giffard lists it as vegan, gluten free and lactose free, with no preservatives."
      },
      {
        "q": "Is this the same as Giffard Watermelon Syrup?",
        "a": "No. The syrup is alcohol-free and made for soft drinks and mocktails. The liqueur is 20% ABV."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/watermelon-liqueur/watermelon-halved.webp",
        "alt": "Close-up of juicy red watermelon flesh with black seeds",
        "caption": "Juicy watermelon flesh"
      },
      {
        "src": "/images/brands/giffard/products/watermelon-liqueur/watermelon-field.webp",
        "alt": "Rows of young watermelon plants under plastic covers beside a lake",
        "caption": "Young watermelon vines under row covers in spring"
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/watermelon-liqueur/watermelon-field.webp",
        "author": "Zeynel Cebeci",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Karpuz_tarlas%C4%B1_-_Watermelon_field_01.jpg"
      },
      {
        "file": "/images/brands/giffard/products/watermelon-liqueur/watermelon-halved.webp",
        "author": "P.gibellini",
        "licence": "CC BY-SA 3.0",
        "url": "https://commons.wikimedia.org/wiki/File:Citrullus_lanatus_01.jpg"
      },
      {
        "file": "/images/brands/giffard/products/watermelon-liqueur/watermelon-slice.webp",
        "author": "John Phelan",
        "licence": "CC BY-SA 3.0",
        "url": "https://commons.wikimedia.org/wiki/File:Slice_of_Watermelon_from_Wilson_Farm,_Lexington_MA.jpg"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/classic-liqueurs/415-watermelon-liqueur.html",
      "https://www.diffordsguide.com/beer-wine-spirits/1683/giffard-watermelon",
      "https://www.giffard.com/en/cocktail/6208-watermelon-man",
      "https://www.diffordsguide.com/cocktails/recipe/8460/chads-watermelon-martini",
      "https://en.wikipedia.org/wiki/Watermelon"
    ]
  },
  {
    "slug": "coconut-syrup",
    "label": "Coconut Syrup",
    "fullName": "Giffard Coconut Syrup",
    "category": "Syrup",
    "image": "/images/giffard-coconut-syrup.webp",
    "imageAlt": "Giffard Coconut syrup bottle with fresh coconuts and palm leaves",
    "accent": "#d9c3a0",
    "tagline": "Real coconut cream, bottled for the bar and café",
    "lede": "Giffard's Coconut Syrup is one of the few on the market made with genuine coconut cream, which is why it pours an opaque milky white and tastes of fresh coconut milk rather than sunscreen. It brings body and island flavour to tropical cocktails, and slips just as easily into a latte or an iced tea.",
    "facts": [
      {
        "value": "Alcohol-free",
        "label": "ABV"
      },
      {
        "value": "1 L",
        "label": "Bottle"
      },
      {
        "value": "Coconut cream",
        "label": "Key ingredient"
      },
      {
        "value": "Contains milk",
        "label": "Allergen"
      }
    ],
    "about": [
      "Giffard is a family-run house in Angers, in France's Loire Valley, founded in 1885 when pharmacist Émile Giffard created his Menthe-Pastille mint liqueur. Five generations on, the company still makes its liqueurs and syrups there, and its syrup range is built for professional use: concentrated, pump-friendly and sized for a speed rail.",
      "The Coconut Syrup is a pure sugar syrup made with coconut cream, natural coconut flavouring and a little milk protein, with no preservatives. Giffard points out that the coconut cream is what gives it its intensity and characteristic taste. Because it carries a touch of fat (1.9 g per 100 ml), it adds a rounder, silkier texture to a drink than a clear flavoured syrup would."
    ],
    "fruit": {
      "heading": "From the coconut palm",
      "paras": [
        "The coconut palm grows throughout the tropics and, as Giffard notes, the whole plant gets used: the flesh, the water, the oil, the palm fronds and even the trunk. A single coconut can reach 30 cm across, on a palm that can stand 25 metres tall.",
        "Coconut milk and coconut cream are made by grating the white flesh of a mature coconut and pressing it with a little hot water. The first, thickest pressing gives coconut cream, at roughly 20 to 50 per cent fat; later pressings give the thinner milk. That cream is the base Giffard builds its syrup on, and it's the backbone of drinks from the Piña Colada to the coconut iced coffees of South-East Asia."
      ],
      "image": {
        "src": "/images/brands/giffard/products/coconut-syrup/coconut-halves.webp",
        "alt": "A coconut split into two halves showing the white flesh",
        "caption": "Fresh coconut flesh, the source of coconut cream. Photo: Clockery, CC BY 3.0"
      }
    },
    "tasting": {
      "appearance": "Opaque, milky white.",
      "nose": "Medium intensity: the sweetness of coconut milk with a note of grated coconut.",
      "palate": "Very aromatic. Fresh coconut milk and grated coconut flesh.",
      "finish": "A lightly toasted coconut aftertaste."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 4,
        "note": "78 g of sugars per 100 ml, so use it in measured doses"
      },
      {
        "label": "Coconut intensity",
        "value": 4,
        "note": "Coconut cream gives a fuller flavour than clear coconut syrups"
      },
      {
        "label": "Body",
        "value": 4,
        "note": "A little fat from the coconut cream adds a creamy texture"
      },
      {
        "label": "Acidity",
        "value": 1,
        "note": "No added acid. Balance it with citrus or pineapple"
      },
      {
        "label": "Toastiness",
        "value": 2,
        "note": "A gentle toasted-coconut note on the finish"
      }
    ],
    "cocktails": [
      {
        "name": "Macoris Daiquiri",
        "glass": "Cocktail glass (chilled)",
        "ice": "Shaken with ice cubes, served up",
        "garnish": "Grated nutmeg",
        "spec": [
          {
            "amount": "50",
            "unit": "ml",
            "what": "aged rum (Giffard specifies Ron Barceló Gran Añejo)"
          },
          {
            "amount": "10",
            "unit": "ml",
            "what": "Giffard Coconut Syrup"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "fresh lime juice"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "pineapple juice"
          }
        ],
        "method": [
          "Pour all ingredients into a shaker.",
          "Fill the shaker two-thirds with ice cubes and shake hard for 7 to 10 seconds.",
          "Strain into a pre-chilled cocktail glass with no ice.",
          "Garnish with grated nutmeg and serve."
        ],
        "note": "Created by Baptiste Roullier, Barceló brand ambassador for France. Just 10 ml of syrup rounds the daiquiri out without turning it into a colada.",
        "source": "https://www.giffard.com/en/cocktail/7124-macoris-daiquiri"
      },
      {
        "name": "Bounty Coffee",
        "glass": "Mug",
        "ice": "None (served hot)",
        "garnish": "Cocoa powder and whipped cream",
        "spec": [
          {
            "amount": "30",
            "unit": "ml",
            "what": "Giffard Coconut Syrup"
          },
          {
            "amount": "60",
            "unit": "ml",
            "what": "espresso (a double shot)"
          },
          {
            "amount": "120",
            "unit": "ml",
            "what": "milk"
          }
        ],
        "method": [
          "Pour the espresso and the syrup into a mug.",
          "Heat and froth the milk until creamy.",
          "Pour the milk onto the coffee.",
          "Finish with whipped cream and a dusting of cocoa powder."
        ],
        "note": "Alcohol-free. Giffard's coffee-house take on the coconut-and-chocolate bar. Reduce the syrup to 15 to 20 ml for a less sweet cup.",
        "source": "https://www.giffard.com/en/cocktail/2353-bounty-coffee"
      }
    ],
    "uses": [
      {
        "title": "Cocktails",
        "body": "Use it in place of simple syrup to give a daiquiri, rum sour or tiki serve a coconut accent, or alongside pineapple and rum for a quick colada-style drink. Because it brings body as well as sweetness, start with 10 to 15 ml and taste."
      },
      {
        "title": "Coffee",
        "body": "Giffard recommends it for hot and iced coffees, teas, hot chocolates and milks. In a latte, Giffard's Latte Coco & Caramel uses 15 ml of coconut syrup and 20 ml of Caramel Syrup with 30 ml of espresso and 120 ml of frothed milk."
      },
      {
        "title": "Iced tea and soda",
        "body": "Giffard's Coconut Iced Black Tea is simply 10 ml of syrup and 20 ml of Giffard Black Tea Concentrated Base over ice, topped with water. It can also be lengthened with sparkling water."
      },
      {
        "title": "Kitchen and storage",
        "body": "Drizzle it over ice cream or yoghurt, or blend it into milkshakes. Store the bottle in a clean, dry, cool place, no warmer than 25°C."
      }
    ],
    "faq": [
      {
        "q": "Is Giffard Coconut Syrup dairy-free or vegan?",
        "a": "No. The ingredients list includes milk protein, and Giffard lists milk as an allergen. Keep that in mind for guests with dairy allergies and for drinks sold as vegan."
      },
      {
        "q": "Why is it white rather than clear?",
        "a": "It's made with real coconut cream, so it's an opaque, milky emulsion rather than a clear flavoured syrup."
      },
      {
        "q": "Does it contain alcohol?",
        "a": "No. It's an alcohol-free syrup, so it works in mocktails, coffees and kids' drinks as well as cocktails."
      },
      {
        "q": "Does it have preservatives?",
        "a": "No. Giffard describes it as a pure sugar syrup with no preservatives. Its ingredients are sugar, water, coconut cream, natural coconut flavouring, milk protein and an emulsifier (sucrose esters of fatty acids)."
      },
      {
        "q": "Can I use it in a Piña Colada?",
        "a": "Yes. It's a natural fit alongside rum and pineapple. Giffard also makes a dedicated Piña Colada Syrup if you want a one-bottle solution."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/coconut-syrup/coconut-plantation.webp",
        "alt": "Rows of coconut palms over green grass on Koh Mak island, Thailand",
        "caption": "A coconut palm plantation on Koh Mak, Thailand. Photo: Vyacheslav Argenberg, CC BY 4.0"
      },
      {
        "src": "/images/brands/giffard/products/coconut-syrup/latte-noosa.webp",
        "alt": "A latte with rosetta latte art in a cup on a marble table",
        "caption": "A latte in Noosa Heads, Queensland, the kind of cup a dash of coconut syrup suits. Photo: Kgbo, CC BY-SA 4.0"
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/coconut-syrup/coconut-halves.webp",
        "author": "Clockery",
        "licence": "CC BY 3.0",
        "url": "https://commons.wikimedia.org/wiki/File:Coconut_halves.JPG"
      },
      {
        "file": "/images/brands/giffard/products/coconut-syrup/coconut-plantation.webp",
        "author": "Vyacheslav Argenberg",
        "licence": "CC BY 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Koh_Mak_(island),_Thailand,_Coconut_palm_plantation.jpg"
      },
      {
        "file": "/images/brands/giffard/products/coconut-syrup/latte-noosa.webp",
        "author": "Kgbo",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Aromas_Latte_art,_Noosa_Heads,_Queensland.jpg"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/fruits-and-plants-syrups/463-177-coconut-syrup.html",
      "https://www.giffard.com/en/cocktail/7124-macoris-daiquiri",
      "https://www.giffard.com/en/cocktail/2353-bounty-coffee",
      "https://www.giffard.com/en/cocktail/2255-latte-coco-caramel-2",
      "https://www.giffard.com/en/cocktail/6430-coconut-iced-black-tea",
      "https://www.giffard.com/en/maison-giffard",
      "https://en.wikipedia.org/wiki/Coconut_milk",
      "https://www.diffordsguide.com/en-au/beer-wine-spirits/6422/giffard-coconut-syrup"
    ]
  },
  {
    "slug": "grenadine-syrup",
    "label": "Grenadine Syrup",
    "fullName": "Giffard Grenadine Syrup",
    "category": "Syrup",
    "image": "/images/giffard-grenadine-syrup.webp",
    "imageAlt": "Giffard Grenadine syrup bottle with pomegranate, raspberries and a red serve",
    "accent": "#d8283f",
    "tagline": "Red fruits, a touch of vanilla, a bar classic",
    "lede": "Giffard's Grenadine is made the French way, from concentrated red-fruit juices with a soft note of vanilla, rather than from pomegranate. It's bright, jammy and tart, and it's the red in everything from a Mary Pickford to a grenadine and soda.",
    "facts": [
      {
        "value": "Alcohol-free",
        "label": "ABV"
      },
      {
        "value": "1 L",
        "label": "Bottle"
      },
      {
        "value": "13% min.",
        "label": "Red-fruit juice equivalent"
      },
      {
        "value": "Red fruits & vanilla",
        "label": "Flavour"
      }
    ],
    "about": [
      "Giffard has made liqueurs and syrups in Angers, in the Loire Valley, since 1885, and the business is still family-run five generations later. Its syrups are concentrated and built for the bar: easy to grip, sized for a speed rail and ready for a pump.",
      "Giffard calls its Grenadine 'a great bar classic, but also a sweet memory of our childhood'. It's a pure sugar syrup made with concentrated red-fruit and lemon juices and natural flavouring, with citric acid for lift and no preservatives. The vanilla is what sets it apart: it softens the tart berry fruit and gives the syrup a rounder, more gourmand finish than a plain red syrup."
    ],
    "fruit": {
      "heading": "Grenadine, pomegranate and red fruits",
      "paras": [
        "The name comes from the French grenade, meaning pomegranate, and grenadine was originally made from pomegranate juice, sugar and water. Because the term is barely regulated, today's grenadines range from pomegranate-based syrups to blends of red fruits and, at the cheaper end, little more than coloured sugar.",
        "Giffard's version follows the French red-fruit tradition. Its aroma is of redcurrants, blackberries and strawberries with vanilla pod, and the palate leans to raspberry and blackcurrant. For a pomegranate-only syrup, Giffard makes a separate Pomegranate Syrup."
      ],
      "image": {
        "src": "/images/brands/giffard/products/grenadine-syrup/redcurrants.webp",
        "alt": "A cluster of glossy redcurrants on a light background",
        "caption": "Redcurrants, one of the red fruits behind Giffard's grenadine. Photo: Ivar Leidus, CC BY-SA 4.0"
      }
    },
    "tasting": {
      "appearance": "Intense, bright red.",
      "nose": "Powerful, gourmand aromas of red fruits (currants, blackberries, strawberries) and vanilla pod, which adds sweetness.",
      "palate": "An explosion of red fruits with a hint of acidity (raspberries, blackcurrants). The vanilla adds a rounder, softer note.",
      "finish": "Tart red berries softened by vanilla."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 4,
        "note": "75 g of sugars per 100 ml"
      },
      {
        "label": "Red-fruit intensity",
        "value": 4,
        "note": "Jammy currant, raspberry and blackberry"
      },
      {
        "label": "Acidity",
        "value": 3,
        "note": "Citric acid and lemon juice keep it bright"
      },
      {
        "label": "Vanilla",
        "value": 2,
        "note": "A soft vanilla roundness in the background"
      },
      {
        "label": "Colour impact",
        "value": 5,
        "note": "A small dose gives a vivid red, or a sunrise layer"
      }
    ],
    "cocktails": [
      {
        "name": "Mary Pickford",
        "glass": "Cocktail glass (chilled)",
        "ice": "Shaken with ice cubes, served up",
        "garnish": "Cherry",
        "spec": [
          {
            "amount": "60",
            "unit": "ml",
            "what": "white rum"
          },
          {
            "amount": "5",
            "unit": "ml",
            "what": "maraschino liqueur"
          },
          {
            "amount": "45",
            "unit": "ml",
            "what": "pineapple juice"
          },
          {
            "amount": "5",
            "unit": "ml",
            "what": "Giffard Grenadine Syrup"
          }
        ],
        "method": [
          "Pour all ingredients into a shaker.",
          "Fill the shaker two-thirds with ice cubes and shake hard for 7 to 10 seconds.",
          "Strain into a pre-chilled cocktail glass with no ice.",
          "Garnish with a cherry and serve."
        ],
        "note": "According to Giffard, created by Fred Kaufman at the Hotel Nacional in Havana in the 1920s for the silent-film star Mary Pickford. A barspoon of grenadine is all it needs.",
        "source": "https://www.giffard.com/en/cocktail/6255-mary-pickford"
      },
      {
        "name": "Red Lemon",
        "glass": "Highball",
        "ice": "Ice cubes",
        "garnish": "None specified",
        "spec": [
          {
            "amount": "15",
            "unit": "ml",
            "what": "Giffard Acid Lemon Syrup"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "Giffard Grenadine Syrup"
          },
          {
            "amount": "200",
            "unit": "ml",
            "what": "sparkling water"
          }
        ],
        "method": [
          "Fill a highball glass with ice cubes.",
          "Pour in both syrups and top with sparkling water.",
          "Stir gently and briefly, then serve."
        ],
        "note": "Alcohol-free. A grown-up grenadine soda, with Giffard's Acid Lemon Syrup supplying the sourness that fresh lemon would.",
        "source": "https://www.giffard.com/en/cocktail/2209-red-lemon"
      }
    ],
    "uses": [
      {
        "title": "Cocktails",
        "body": "Grenadine is a supporting player in classics such as the Mary Pickford, Hurricane and Singapore Sling, usually at 5 to 15 ml. Pour it last down the inside of the glass for the layered look of a Tequila Sunrise."
      },
      {
        "title": "Sodas and mocktails",
        "body": "Giffard's basic serve is grenadine diluted with still or sparkling water. It also lifts lemonades, smoothies and fizzy drinks, and Giffard's Red Paradise (20 ml Acid Lemon Syrup, 5 ml grenadine, 70 ml orange juice and 50 ml apricot juice, shaken) is an easy alcohol-free option for the menu."
      },
      {
        "title": "Kitchen",
        "body": "A spoonful brightens fruit salads, sorbets and yoghurt, or drizzle it over ice cream."
      },
      {
        "title": "Storage",
        "body": "Store the bottle in a clean, dry, cool place, no warmer than 25°C."
      }
    ],
    "faq": [
      {
        "q": "Is Giffard Grenadine made from pomegranate?",
        "a": "No. It's made from concentrated red-fruit and lemon juices with natural flavouring and a vanilla note. Grenadine takes its name from the French for pomegranate, and Giffard sells a separate Pomegranate Syrup if that's what you need."
      },
      {
        "q": "What colouring does it use?",
        "a": "The current label lists E129 (Allura Red). As required for that colour, the label states that it may have an adverse effect on activity and attention in children."
      },
      {
        "q": "How much fruit is in it?",
        "a": "Giffard states that the equivalent of at least 13% red-fruit juice is used."
      },
      {
        "q": "Does it contain alcohol or preservatives?",
        "a": "Neither. It's an alcohol-free sugar syrup with no preservatives."
      },
      {
        "q": "How much should I use in a soda?",
        "a": "Giffard's Red Lemon uses 15 ml of grenadine with 15 ml of Acid Lemon Syrup and 200 ml of sparkling water. For grenadine with water alone, start around 20 ml to 200 ml and adjust to taste."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/grenadine-syrup/pomegranate.webp",
        "alt": "An opened pomegranate showing its deep red arils",
        "caption": "The pomegranate, or grenade in French, gave grenadine its name. Photo: Ivar Leidus, CC BY-SA 4.0"
      },
      {
        "src": "/images/brands/giffard/products/grenadine-syrup/mary-pickford.webp",
        "alt": "A pink Mary Pickford cocktail in a coupe with three skewered cherries",
        "caption": "A Mary Pickford, coloured with a dash of grenadine. Photo: Will Shenton, CC BY-SA 3.0"
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/grenadine-syrup/redcurrants.webp",
        "author": "Ivar Leidus",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Redcurrant_(Ribes_rubrum)_fruits.jpg"
      },
      {
        "file": "/images/brands/giffard/products/grenadine-syrup/pomegranate.webp",
        "author": "Ivar Leidus",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Pomegranate_(opened).jpg"
      },
      {
        "file": "/images/brands/giffard/products/grenadine-syrup/mary-pickford.webp",
        "author": "Will Shenton",
        "licence": "CC BY-SA 3.0",
        "url": "https://commons.wikimedia.org/wiki/File:Mary_Pickford_Cocktail.jpg"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/fruits-and-plants-syrups/454-165-grenadine-syrup.html",
      "https://www.giffard.com/en/cocktail/6255-mary-pickford",
      "https://www.giffard.com/en/cocktail/2209-red-lemon",
      "https://www.giffard.com/en/cocktail/2201-red-paradise-3",
      "https://www.giffard.com/en/maison-giffard",
      "https://en.wikipedia.org/wiki/Grenadine",
      "https://www.diffordsguide.com/beer-wine-spirits/4260/giffard-grenadine-syrup"
    ]
  },
  {
    "slug": "mango-syrup",
    "label": "Mango Syrup",
    "fullName": "Giffard Mango Syrup",
    "category": "Syrup",
    "image": "/images/giffard-mango-syrup.webp",
    "imageAlt": "Giffard Mango syrup bottle with ripe mangoes in a tropical scene",
    "accent": "#f7a823",
    "tagline": "Ripe, juicy mango with a floral lift",
    "lede": "Giffard's Mango Syrup is made from concentrated mango juice and tastes of very ripe, juicy fruit with a light floral edge. It's an easy way to put consistent tropical flavour into daiquiris, iced teas, smoothies and sodas all year round.",
    "facts": [
      {
        "value": "Alcohol-free",
        "label": "ABV"
      },
      {
        "value": "1 L",
        "label": "Bottle"
      },
      {
        "value": "16% min.",
        "label": "Mango juice equivalent"
      },
      {
        "value": "No preservatives",
        "label": "Recipe"
      }
    ],
    "about": [
      "Giffard has been making liqueurs and syrups in Angers, in France's Loire Valley, since 1885, and the company is still family-run. The syrup range is designed for working bars and cafés: concentrated, easy to handle, sized for a speed rail and suitable for a pump.",
      "The Mango Syrup is a pure sugar syrup made from concentrated mango juice, with natural flavouring, citric acid and a little lemon juice for freshness, and no preservatives. Giffard uses at least the equivalent of 16% mango juice, and colours the syrup with carotenoids (beta-carotene and E160e) for its deep golden-orange tone."
    ],
    "fruit": {
      "heading": "The mango",
      "paras": [
        "The mango tree, Mangifera indica, comes originally from South Asia, roughly the region that is now north-eastern India, Bangladesh and Myanmar. Giffard notes that it grows 20 to 30 metres tall in tropical climates, flowering after the dry season, with the fruit taking four to five months to ripen.",
        "Mangoes are now grown throughout the tropics, including northern Australia, and India produces more than any other country. Of the several hundred known varieties, only a few are traded commercially. The mango is the national fruit of India, Pakistan and the Philippines."
      ],
      "image": {
        "src": "/images/brands/giffard/products/mango-syrup/mangoes-halved.webp",
        "alt": "A whole red-green mango beside a halved mango showing orange flesh",
        "caption": "Ripe mangoes, whole and halved. Photo: Ivar Leidus, CC BY-SA 4.0"
      }
    },
    "tasting": {
      "appearance": "Gamboge orange with amber hues.",
      "nose": "Very ripe, juicy mango with a light floral note.",
      "palate": "Lush tropical mango pulp, gently tangy.",
      "finish": "A long, fruity finish with slightly floral and vanilla notes."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 4,
        "note": "77 g of sugars per 100 ml"
      },
      {
        "label": "Fruit intensity",
        "value": 4,
        "note": "Ripe mango pulp, made with at least 16% mango juice"
      },
      {
        "label": "Acidity",
        "value": 2,
        "note": "A gentle tang from citric acid and lemon juice"
      },
      {
        "label": "Floral",
        "value": 2,
        "note": "A light floral lift on the nose and finish"
      },
      {
        "label": "Body",
        "value": 3,
        "note": "Acacia gum gives it a smooth texture"
      }
    ],
    "cocktails": [
      {
        "name": "Mileydi's Mango Daiquiri",
        "glass": "Coupe (chilled)",
        "ice": "Shaken with ice, served up",
        "garnish": "Mango wedge on the rim",
        "spec": [
          {
            "amount": "60",
            "unit": "ml",
            "what": "light Cuban rum (Difford's specifies Havana Club Añejo 3 Años)"
          },
          {
            "amount": "22.5",
            "unit": "ml",
            "what": "fresh lime juice"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "mango syrup (such as Giffard Mango Syrup)"
          }
        ],
        "method": [
          "Shake all ingredients with ice.",
          "Fine strain into a chilled coupe.",
          "Garnish with a mango wedge on the rim."
        ],
        "note": "A simple three-ingredient daiquiri from Difford's Guide. The recipe calls for a generic mango syrup, so Giffard's slots straight in.",
        "source": "https://www.diffordsguide.com/cocktails/recipe/42071/mileydis-mango-daiquiri"
      },
      {
        "name": "Mango Iced Green Tea",
        "glass": "Mason jar",
        "ice": "Ice cubes",
        "garnish": "None specified",
        "spec": [
          {
            "amount": "10",
            "unit": "ml",
            "what": "Giffard Mango Syrup"
          },
          {
            "amount": "20",
            "unit": "ml",
            "what": "Giffard Green Tea Concentrated Base"
          },
          {
            "amount": "",
            "unit": "",
            "what": "water, to top"
          }
        ],
        "method": [
          "Fill the jar with ice cubes.",
          "Pour in the syrup and the tea base, then top with water.",
          "Stir gently and briefly, then serve."
        ],
        "note": "Alcohol-free. Giffard's quick iced tea for cafés: no brewing, and a consistent result every time.",
        "source": "https://www.giffard.com/en/cocktail/6394-mango-iced-green-tea"
      }
    ],
    "uses": [
      {
        "title": "Cocktails",
        "body": "Use 15 ml in place of sugar syrup in a daiquiri, margarita or mojito for a mango twist. It also works alongside passion fruit in tiki-style rum drinks."
      },
      {
        "title": "Iced tea and soda",
        "body": "Giffard suggests diluting it with still or sparkling water. A mango soda or lemonade, or the Mango Iced Green Tea, is an easy alcohol-free addition to a café menu."
      },
      {
        "title": "Smoothies and lassi",
        "body": "Giffard lists smoothies among its uses. A dash adds depth and colour to a mango lassi or a fruit smoothie, especially when fresh mangoes are out of season."
      },
      {
        "title": "Storage",
        "body": "Store the bottle in a clean, dry, cool place, no warmer than 25°C."
      }
    ],
    "faq": [
      {
        "q": "How much mango is in Giffard Mango Syrup?",
        "a": "Giffard states that the equivalent of at least 16% mango juice is used."
      },
      {
        "q": "Is the colour natural?",
        "a": "It's coloured with beta-carotene and E160e (beta-apo-8'-carotenal), both carotenoid colours. There are no azo dyes on the ingredients list."
      },
      {
        "q": "Does it contain alcohol or preservatives?",
        "a": "No. It's an alcohol-free sugar syrup with no preservatives."
      },
      {
        "q": "What does it pair well with?",
        "a": "Lime, passion fruit, pineapple, chilli, mint and green tea, as well as white and aged rums, tequila and vodka."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/mango-syrup/mango-on-tree.webp",
        "alt": "A single yellow-green mango hanging from a tree",
        "caption": "Mango ripening on the tree, Praslin, Seychelles. Photo: NorbertNagel, CC BY-SA 4.0"
      },
      {
        "src": "/images/brands/giffard/products/mango-syrup/mango-lassi.webp",
        "alt": "A glass of mango lassi topped with chopped nuts",
        "caption": "Mango lassi, a natural home for a dash of mango syrup. Photo: Nithyasrm, CC BY-SA 4.0"
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/mango-syrup/mangoes-halved.webp",
        "author": "Ivar Leidus",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Mangos_-_single_and_halved.jpg"
      },
      {
        "file": "/images/brands/giffard/products/mango-syrup/mango-on-tree.webp",
        "author": "NorbertNagel",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Mango_fruit_hanging_on_a_mango_tree_-_Praslin_-_Seychelles.jpg"
      },
      {
        "file": "/images/brands/giffard/products/mango-syrup/mango-lassi.webp",
        "author": "Nithyasrm",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Tasty_Mango_lassi_picture.JPG"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/fruits-and-plants-syrups/455-170-mango-syrup.html",
      "https://www.giffard.com/en/cocktail/6394-mango-iced-green-tea",
      "https://www.diffordsguide.com/cocktails/recipe/42071/mileydis-mango-daiquiri",
      "https://www.giffard.com/en/maison-giffard",
      "https://en.wikipedia.org/wiki/Mango"
    ]
  },
  {
    "slug": "passion-fruit-syrup",
    "label": "Passion Fruit Syrup",
    "fullName": "Giffard Passion Fruit Syrup",
    "category": "Syrup",
    "image": "/images/giffard-passion-fruit-syrup.webp",
    "imageAlt": "Giffard Fruit de la Passion syrup bottle with fresh passion fruit and a serve",
    "accent": "#f2b43a",
    "tagline": "Tangy passion fruit with a dry, refreshing finish",
    "lede": "Giffard's Passion Fruit Syrup (Sirop Fruit de la Passion) is made from concentrated passion fruit juice and natural passion fruit aroma. It's tangy and drier on the finish than most fruit syrups, which makes it a reliable workhorse for Hurricanes, passion fruit sours and alcohol-free coolers.",
    "facts": [
      {
        "value": "Alcohol-free",
        "label": "ABV"
      },
      {
        "value": "1 L",
        "label": "Bottle"
      },
      {
        "value": "12% min.",
        "label": "Passion fruit juice equivalent"
      },
      {
        "value": "No preservatives",
        "label": "Recipe"
      }
    ],
    "about": [
      "Giffard is a family-owned liqueur and syrup house in Angers, in the Loire Valley, dating back to 1885. Its syrups are built for professional use: concentrated, sized to fit a speed rail and suitable for a pump.",
      "The Passion Fruit Syrup is a pure sugar syrup made with concentrated passion fruit juice and natural flavouring, plus citric acid. It's stabilised with acacia gum and coloured with beta-carotene and black carrot concentrate, with no preservatives. Giffard describes it as slightly cloudy with an almost oily texture, and the tang of the fruit keeps the sweetness in check."
    ],
    "fruit": {
      "heading": "The passion fruit",
      "paras": [
        "Passiflora edulis is a vine native to southern Brazil, Paraguay and northern Argentina, and it is now grown across the tropics and subtropics. Its name comes from the flower: around 1700, missionaries in Brazil used its intricate bloom to illustrate the Passion of Christ.",
        "There are two main forms. The purple passion fruit is smaller and sweeter, with a richer aroma, while the yellow type is larger. In Australia the pulp is a classic pavlova topping. The juice is slightly acidic and musky, which is exactly why it cuts through sweet drinks so well."
      ],
      "image": {
        "src": "/images/brands/giffard/products/passion-fruit-syrup/passionfruit-cut.webp",
        "alt": "Purple passion fruits, some halved to show yellow seeded pulp",
        "caption": "Purple passion fruit, whole and halved. Photo: Nana Pearls, CC0"
      }
    },
    "tasting": {
      "appearance": "Hazy gold, slightly cloudy, with an oily texture.",
      "nose": "Reminiscent of blackcurrant bud, sap and elderberry, with lime notes for a kick.",
      "palate": "Tangy passion fruit that balances the sweetness of the syrup.",
      "finish": "Drier on the finish, with a hint of bitterness."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 3,
        "note": "72 g of sugars per 100 ml, the leanest of these four syrups"
      },
      {
        "label": "Tartness",
        "value": 4,
        "note": "The fruit's natural tang, lifted by citric acid"
      },
      {
        "label": "Fruit intensity",
        "value": 4,
        "note": "Made with at least 12% passion fruit juice"
      },
      {
        "label": "Bitterness",
        "value": 2,
        "note": "A light, drying bitterness on the finish"
      },
      {
        "label": "Body",
        "value": 3,
        "note": "Acacia gum gives a slightly oily texture"
      }
    ],
    "cocktails": [
      {
        "name": "Hurricane",
        "glass": "Hurricane glass",
        "ice": "Crushed ice",
        "garnish": "Cherry and orange slice",
        "spec": [
          {
            "amount": "60",
            "unit": "ml",
            "what": "dark rum"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "Giffard Passion Fruit Syrup"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "orange juice"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "fresh lime juice"
          },
          {
            "amount": "5",
            "unit": "ml",
            "what": "Giffard Grenadine Syrup"
          }
        ],
        "method": [
          "Pour all ingredients into a shaker.",
          "Fill the shaker two-thirds with ice cubes and shake hard for 7 to 10 seconds.",
          "Strain into a hurricane glass filled with crushed ice.",
          "Garnish with a cherry and an orange slice, then serve."
        ],
        "note": "Created in the early 1940s at Pat O'Brien's bar in New Orleans. The name comes from the hurricane-lamp shape of the glass.",
        "source": "https://www.giffard.com/en/cocktail/5953-hurricane"
      },
      {
        "name": "South East Mania",
        "glass": "Highball",
        "ice": "Ice cubes",
        "garnish": "None specified",
        "spec": [
          {
            "amount": "10",
            "unit": "ml",
            "what": "Giffard Passion Fruit Syrup"
          },
          {
            "amount": "20",
            "unit": "ml",
            "what": "Giffard Kiwi Syrup"
          },
          {
            "amount": "40",
            "unit": "ml",
            "what": "pineapple juice"
          },
          {
            "amount": "60",
            "unit": "ml",
            "what": "orange juice"
          }
        ],
        "method": [
          "Pour all ingredients into a shaker.",
          "Fill the shaker two-thirds with ice cubes and shake hard for 7 to 10 seconds.",
          "Strain into a highball glass filled with ice and serve."
        ],
        "note": "Alcohol-free. A tropical juice cooler from Giffard that sells well on a mocktail list.",
        "source": "https://www.giffard.com/en/cocktail/2207-south-east-mania-3"
      }
    ],
    "uses": [
      {
        "title": "Cocktails",
        "body": "Use it in the Hurricane, in passion fruit sours and margaritas, or anywhere you'd otherwise rely on fresh pulp, for a more consistent result. Giffard pairs it with its Mangalore mango liqueur and aged rum in the Gateway of Karnataka."
      },
      {
        "title": "Iced tea",
        "body": "Giffard's Passion Fruit Iced Green Tea is 10 ml of syrup and 20 ml of Giffard Green Tea Concentrated Base over ice, topped with water. It's a fast, consistent café serve."
      },
      {
        "title": "Soda and lemonade",
        "body": "Dilute it with sparkling water or add it to lemonade. It's also good in smoothies and fizzy drinks."
      },
      {
        "title": "Kitchen and storage",
        "body": "Drizzle it over pavlova, panna cotta or yoghurt when fresh passionfruit is out of season. Store the bottle in a clean, dry, cool place, no warmer than 25°C."
      }
    ],
    "faq": [
      {
        "q": "How much passion fruit is in it?",
        "a": "Giffard states that the equivalent of at least 12% passion fruit juice is used, alongside natural flavouring."
      },
      {
        "q": "Why is it cloudy?",
        "a": "It's made with real passion fruit juice and stabilised with acacia gum, so it has a slightly hazy, golden look and a fuller texture than a clear syrup."
      },
      {
        "q": "Is it the same as Giffard's Crème de Fruits de la Passion?",
        "a": "No. The Crème de Fruits de la Passion is an alcoholic liqueur, while this is an alcohol-free syrup. Giffard uses both, sometimes in the same drink."
      },
      {
        "q": "Does it contain alcohol or preservatives?",
        "a": "No. It's alcohol-free and contains no preservatives. The colour comes from beta-carotene and black carrot concentrate."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/passion-fruit-syrup/passionfruit-flower.webp",
        "alt": "A white and purple passion fruit flower among green leaves",
        "caption": "The Passiflora edulis flower that gave the fruit its name. Photo: Pkn19, CC BY-SA 4.0"
      },
      {
        "src": "/images/brands/giffard/products/passion-fruit-syrup/passionfruit-vine.webp",
        "alt": "A passionfruit vine climbing over a timber fence against a blue sky",
        "caption": "A backyard passionfruit vine in Sydney. Photo: Jeremy from Sydney, Australia, CC BY 2.0"
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/passion-fruit-syrup/passionfruit-cut.webp",
        "author": "Nana Pearls",
        "licence": "CC0",
        "url": "https://commons.wikimedia.org/wiki/File:Cut_and_uncut_passion_fruits.jpg"
      },
      {
        "file": "/images/brands/giffard/products/passion-fruit-syrup/passionfruit-flower.webp",
        "author": "Pkn19",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Passiflora_edulis_passion_fruit_flower.jpg"
      },
      {
        "file": "/images/brands/giffard/products/passion-fruit-syrup/passionfruit-vine.webp",
        "author": "Jeremy from Sydney, Australia",
        "licence": "CC BY 2.0",
        "url": "https://commons.wikimedia.org/wiki/File:Passionfruit_vine_(25288601394).jpg"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/fruits-and-plants-syrups/468-161-passion-fruit-syrup.html",
      "https://www.giffard.com/en/cocktail/5953-hurricane",
      "https://www.giffard.com/en/cocktail/2207-south-east-mania-3",
      "https://www.giffard.com/en/cocktail/6400-passion-fruit-iced-green-tea",
      "https://www.giffard.com/en/cocktail/6334-gateway-of-karnataka",
      "https://www.giffard.com/en/maison-giffard",
      "https://en.wikipedia.org/wiki/Passiflora_edulis"
    ]
  },
  {
    "slug": "kiwi-puree",
    "label": "Kiwi Puree",
    "fullName": "Giffard Fruit for Mix Kiwi",
    "category": "Puree",
    "image": "/images/giffard-kiwi-puree.webp",
    "imageAlt": "Giffard Kiwi Fruit for Mix puree bottle with fresh kiwi and a crushed-ice serve",
    "accent": "#8cc63f",
    "tagline": "Forest-green kiwi with a sweet, tangy lift",
    "lede": "Giffard's Fruit for Mix Kiwi is a ready-to-pour preparation built on kiwi juice and puree, made at 50% fruit. It brings fresh kiwi flavour, body and a vivid green colour to spritzes, sours and alcohol-free serves without any peeling or blending behind the bar.",
    "facts": [
      {
        "value": "50%",
        "label": "Kiwi juice and puree"
      },
      {
        "value": "1 L",
        "label": "Bottle size"
      },
      {
        "value": "4 weeks",
        "label": "Use within, once opened"
      },
      {
        "value": "≤ 25°C",
        "label": "Store cool and dry"
      }
    ],
    "about": [
      "Fruit for Mix is the Giffard range designed to bring fruit, flavour, texture and colour to a drink in one pour. The kiwi version is made from kiwi juice from concentrate and puree (50%), sweetened with sugar, sharpened with citric acid and given its pouring body with pectin and xanthan gum. It comes in a one-litre bottle sized for the speed rail.",
      "It is worth knowing that the kiwi is one of the few products in the range with added colour: Giffard lists curcumin and E133 (brilliant blue) on the label, which together give it the consistent forest-green shade. Use it to twist a classic, to add fruit and texture to a highball or smoothie, or as a base for lemonades and iced teas."
    ],
    "fruit": {
      "heading": "From the Yangtze to the Bay of Plenty",
      "paras": [
        "Kiwifruit is native to central and eastern China, where it was described as far back as the Song dynasty in the 12th century. Cultivation spread to New Zealand in the early 20th century, and it was there that the first commercial plantings took place. The Hayward cultivar, developed by Hayward Wright in Avondale around 1924, is still the variety most people will find in the shop.",
        "The fruit was sold for years as the Chinese gooseberry until the New Zealand exporter Turners & Growers renamed it kiwifruit in 1959, borrowing the nickname for New Zealanders; by 1970 every export from the country carried the new name. China is now by far the largest producer, with New Zealand and Italy following."
      ],
      "image": {
        "src": "/images/brands/giffard/products/kiwi-puree/kiwi-on-vine.webp",
        "alt": "Clusters of brown, fuzzy kiwifruit hanging from vines on an overhead trellis",
        "caption": "Green kiwifruit on pergola-trained vines, almost ready for harvest."
      }
    },
    "tasting": {
      "appearance": "Forest green.",
      "nose": "Fresh kiwi with a little acidity.",
      "palate": "Sweet and refreshing, with a gentle tanginess.",
      "finish": "Clean and fruity, with the tang carrying through."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 4,
        "note": "Around 82 g of sugars per 100 ml, so it often replaces sugar syrup in a spec."
      },
      {
        "label": "Acidity",
        "value": 3,
        "note": "A soft tang from the fruit and added citric acid; still needs citrus in a sour."
      },
      {
        "label": "Fruit intensity",
        "value": 3,
        "note": "Fresh, green kiwi character rather than a jammy one."
      },
      {
        "label": "Body",
        "value": 3,
        "note": "Pectin and xanthan give a smooth, pourable texture."
      },
      {
        "label": "Colour impact",
        "value": 5,
        "note": "A small pour turns a drink a bright, even green."
      }
    ],
    "cocktails": [
      {
        "name": "Kimosa Spritz",
        "glass": "Wine glass",
        "ice": "Crushed ice",
        "garnish": "Baby's breath",
        "spec": [
          {
            "amount": "20",
            "unit": "ml",
            "what": "Giffard Fruit for Mix Kiwi"
          },
          {
            "amount": "20",
            "unit": "ml",
            "what": "Giffard Elderflower Alcohol Free"
          },
          {
            "amount": "60",
            "unit": "ml",
            "what": "Champagne"
          },
          {
            "amount": "",
            "unit": "top",
            "what": "Sparkling water"
          }
        ],
        "method": [
          "Build everything except the sparkling water in a wine glass over crushed ice.",
          "Mix energetically.",
          "Top with sparkling water.",
          "Garnish and serve."
        ],
        "note": "A kiwi take on the Mimosa: the elderflower picks up the green, floral side of the fruit, and the Champagne keeps it dry and lively.",
        "source": "https://www.giffard.com/en/cocktail/8308-kimosa-spritz"
      },
      {
        "name": "Dai'Kiwi on the Rocks",
        "glass": "Rocks glass",
        "ice": "Clear block ice",
        "garnish": "",
        "spec": [
          {
            "amount": "45",
            "unit": "ml",
            "what": "White rum"
          },
          {
            "amount": "30",
            "unit": "ml",
            "what": "Lemon juice"
          },
          {
            "amount": "25",
            "unit": "ml",
            "what": "Giffard Fruit for Mix Kiwi"
          },
          {
            "amount": "5",
            "unit": "ml",
            "what": "Sugar cane syrup"
          }
        ],
        "method": [
          "Add all the ingredients to a shaker with ice.",
          "Shake well.",
          "Strain into a rocks glass over a clear block of ice.",
          "Garnish and serve."
        ],
        "note": "A Daiquiri built on lemon rather than lime, with the kiwi doing most of the sweetening. Giffard's published card also lists three dashes of an ingredient it doesn't name, which we've left out.",
        "source": "https://www.giffard.com/en/cocktail/8311-dai-kiwi-on-the-rocks"
      }
    ],
    "uses": [
      {
        "title": "Treat it as fruit and sugar",
        "body": "With roughly 82 g of sugars per 100 ml, 20–25 ml of Fruit for Mix usually takes the place of the sugar syrup in a spec. Taste and adjust your citrus rather than adding more sweetener."
      },
      {
        "title": "Spritzes and highballs",
        "body": "Kiwi works well with elderflower, cucumber, mint and sparkling wine. Build it in the glass and stir properly before topping, so the puree doesn't settle at the bottom."
      },
      {
        "title": "Alcohol-free and café",
        "body": "Giffard pitches the range for smoothies, lemonades, iced teas, milkshakes and granitas as well as cocktails, and it can be used in the pastry kitchen too."
      },
      {
        "title": "Storage and shelf life",
        "body": "Giffard's guidance is to store the bottle in a dry, clean, cool place at no more than 25°C, and to use it within four weeks of opening. Date the bottle when you crack it so nobody on the next shift has to guess."
      }
    ],
    "faq": [
      {
        "q": "How much fruit is in it?",
        "a": "Giffard lists kiwi juice from concentrate and puree at 50% of the recipe."
      },
      {
        "q": "Is the green colour natural?",
        "a": "Not entirely. Alongside the fruit, the label lists curcumin and E133 (brilliant blue) as colourings, which keep the shade consistent from bottle to bottle."
      },
      {
        "q": "How long does it keep once opened?",
        "a": "Giffard says to use it within four weeks of opening and to store it in a dry, clean, cool place at no more than 25°C."
      },
      {
        "q": "Is it alcoholic?",
        "a": "No. Fruit for Mix is a non-alcoholic fruit preparation, so it works just as well in mocktails, smoothies and lemonades as in cocktails."
      },
      {
        "q": "Can I use it in food?",
        "a": "Yes. Giffard notes the range can also be used in cooking and baking."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/kiwi-puree/kiwi-cross-section.webp",
        "alt": "A halved green kiwifruit showing its bright green flesh, pale core and ring of black seeds",
        "caption": "A kiwifruit cut in half: green flesh, a creamy core and a ring of tiny black seeds."
      },
      {
        "src": "/images/brands/giffard/products/kiwi-puree/kiwi-orchard.webp",
        "alt": "Rows of trunks under a dense canopy of fruiting kiwifruit vines",
        "caption": "Looking across a kiwifruit orchard, with the vines trained overhead and heavy with fruit."
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/kiwi-puree/kiwi-on-vine.webp",
        "author": "Pseudopanax at English Wikipedia",
        "licence": "Public domain",
        "url": "https://commons.wikimedia.org/wiki/File:Green_kiwifruit_on_vines_-_almost_ready_for_harvesting.jpg"
      },
      {
        "file": "/images/brands/giffard/products/kiwi-puree/kiwi-cross-section.webp",
        "author": "Ivar Leidus",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Kiwifruit_cross_section.jpg"
      },
      {
        "file": "/images/brands/giffard/products/kiwi-puree/kiwi-orchard.webp",
        "author": "Pseudopanax at English Wikipedia",
        "licence": "Public domain",
        "url": "https://commons.wikimedia.org/wiki/File:View_across_kiwifruit_orchard_under_vines_full_with_kiwifruit.jpg"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/fruit-for-mix/8438-458-fruit-for-mix-kiwi-.html",
      "https://www.giffard.com/en/3-fruit-for-mix",
      "https://www.giffard.com/en/cocktail/8308-kimosa-spritz",
      "https://www.giffard.com/en/cocktail/8311-dai-kiwi-on-the-rocks",
      "https://en.wikipedia.org/wiki/Kiwifruit"
    ]
  },
  {
    "slug": "mango-puree",
    "label": "Mango Puree",
    "fullName": "Giffard Fruit for Mix Mango",
    "category": "Puree",
    "image": "/images/giffard-mango-puree.webp",
    "imageAlt": "Giffard Mango Fruit for Mix puree bottle with fresh mango and a chilled serve",
    "accent": "#ffad2e",
    "tagline": "Ripe, rich mango pulp, ready to pour",
    "lede": "Giffard's Fruit for Mix Mango is made with 59% mango puree, the highest fruit content of the four in this set. It gives a drink the deep flavour and silky body of very ripe mango, with no colouring added.",
    "facts": [
      {
        "value": "59%",
        "label": "Mango puree"
      },
      {
        "value": "1 L",
        "label": "Bottle size"
      },
      {
        "value": "4 weeks",
        "label": "Use within, once opened"
      },
      {
        "value": "≤ 25°C",
        "label": "Store cool and dry"
      }
    ],
    "about": [
      "Fruit for Mix is Giffard's range for adding real fruit, flavour, texture and colour in one pour. The mango is a simple recipe: mango puree from concentrate (59%), sugar, malic acid for freshness, pectin for body, ascorbic acid as an antioxidant and potassium sorbate as a preservative. Giffard states there is no colorant; the gamboge-orange colour comes from the fruit.",
      "It comes in a one-litre bottle that fits the speed rail. Use it to give a Mojito, Daiquiri or Margarita a tropical lean, to build texture into smoothies and shakes, or as a quick base for lassis, iced teas and granitas."
    ],
    "fruit": {
      "heading": "The king of fruits, and a Queensland favourite",
      "paras": [
        "The mango, Mangifera indica, originated in the north-east of South Asia, in what is now Bangladesh, north-eastern India and Myanmar, and has been cultivated across South and Southeast Asia since ancient times. It is the national fruit of India, Pakistan and the Philippines, and India alone grows around 43% of the world's crop.",
        "In Australia the story centres on one variety. Kensington Pride, often called the Bowen mango, came from a tree that emerged in Bowen, Queensland, in the late 1880s. It is prized for a distinctive flavour and aroma and still accounts for more than 80% of Australia's commercial mango market."
      ],
      "image": {
        "src": "/images/brands/giffard/products/mango-puree/mango-kensington.webp",
        "alt": "A basket of green-yellow Kensington mangoes with a red blush, beside a printed variety label",
        "caption": "Kensington mangoes, the variety Australians know as the Bowen mango, on display at a mango festival."
      }
    },
    "tasting": {
      "appearance": "Intense yellowy orange (gamboge).",
      "nose": "Very ripe mango, with a peppery note of mango skin.",
      "palate": "A fruity attack of ripe mango, a rich pulpy texture and a deep, intense flavour.",
      "finish": "A hint of green, vegetal notes from the skin and stone."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 4,
        "note": "About 79 g of sugars per 100 ml; it will sweeten a drink as well as flavour it."
      },
      {
        "label": "Acidity",
        "value": 2,
        "note": "Malic acid keeps it fresh, but it relies on your citrus for balance."
      },
      {
        "label": "Fruit intensity",
        "value": 5,
        "note": "59% mango puree gives a deep, very ripe flavour."
      },
      {
        "label": "Body",
        "value": 4,
        "note": "Thick and pulpy; it adds real texture to shaken and blended drinks."
      },
      {
        "label": "Colour impact",
        "value": 4,
        "note": "A warm golden orange, with no added colouring."
      }
    ],
    "cocktails": [
      {
        "name": "Mango Mojito",
        "glass": "Highball",
        "ice": "Crushed ice",
        "garnish": "Mint sprig",
        "spec": [
          {
            "amount": "50",
            "unit": "ml",
            "what": "White rum"
          },
          {
            "amount": "25",
            "unit": "ml",
            "what": "Giffard Fruit for Mix Mango"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "Lime juice"
          },
          {
            "amount": "10",
            "unit": "leaves",
            "what": "Mint"
          },
          {
            "amount": "",
            "unit": "top",
            "what": "Sparkling water"
          }
        ],
        "method": [
          "Clap the mint leaves between your hands and drop them into the glass.",
          "Half-fill the glass with crushed ice.",
          "Add the rum, mango and lime, then churn to combine.",
          "Fill the glass with crushed ice.",
          "Top with sparkling water, garnish and serve."
        ],
        "note": "The mango replaces the sugar in a classic Mojito, so there is no syrup in the spec. For the alcohol-free Virgin Mango Mojito, Giffard uses 20 ml mango, 15 ml lime and 25 ml of its Rum Flavour syrup in place of the rum.",
        "source": "https://www.giffard.com/en/cocktail/6768-mango-mojito"
      },
      {
        "name": "Castaway Smoothie (alcohol-free)",
        "glass": "Highball",
        "ice": "Blended with crushed ice; served without ice",
        "garnish": "Pineapple leaves",
        "spec": [
          {
            "amount": "35",
            "unit": "ml",
            "what": "Giffard Fruit for Mix Mango"
          },
          {
            "amount": "70",
            "unit": "ml",
            "what": "Orange juice"
          },
          {
            "amount": "5",
            "unit": "pieces",
            "what": "Fresh pineapple"
          }
        ],
        "method": [
          "Add the ingredients to a blender.",
          "Add a scoop of crushed ice.",
          "Blend until smooth.",
          "Pour into a highball without ice.",
          "Garnish and serve."
        ],
        "note": "A three-ingredient tropical smoothie that shows how much body the mango brings on its own.",
        "source": "https://www.giffard.com/en/cocktail/6713-castaway-smoothie-2"
      }
    ],
    "uses": [
      {
        "title": "A tropical twist on a classic",
        "body": "Swap the sugar syrup in a Daiquiri, Margarita or Mojito for 20–25 ml of mango and keep the citrus. The fruit carries the sweetness."
      },
      {
        "title": "Built for the blender",
        "body": "Its thick, pulpy texture makes it a natural for smoothies, shakes, lassis and granitas, where it gives body as well as flavour."
      },
      {
        "title": "Pairings",
        "body": "Mango sits happily with lime, passion fruit, pineapple, coconut, chilli and ginger, and with rum, tequila and mezcal."
      },
      {
        "title": "Storage and shelf life",
        "body": "Giffard's guidance is to store the bottle in a dry, clean, cool place at no more than 25°C, and to use it within four weeks of opening. Date the bottle when you crack it so nobody on the next shift has to guess."
      }
    ],
    "faq": [
      {
        "q": "How much fruit is in it?",
        "a": "Giffard lists mango puree from concentrate at 59% of the recipe."
      },
      {
        "q": "Does it contain colouring?",
        "a": "No. Giffard states there is no colorant; the orange colour comes from the mango."
      },
      {
        "q": "How long does it keep once opened?",
        "a": "Use it within four weeks of opening, and store it somewhere dry, clean and cool, at no more than 25°C."
      },
      {
        "q": "How sweet is it?",
        "a": "Quite sweet: about 78.6 g of sugars per 100 ml. In most specs it replaces the sugar syrup rather than sitting alongside it."
      },
      {
        "q": "Is it alcoholic?",
        "a": "No. It is a non-alcoholic fruit preparation, so it suits smoothies, mocktails and the pastry section as well as the bar."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/mango-puree/mango-cut.webp",
        "alt": "Golden mango cheeks and slices arranged in a flower shape on a white plate",
        "caption": "Ripe mango, cut into cheeks and slices."
      },
      {
        "src": "/images/brands/giffard/products/mango-puree/mango-tree.webp",
        "alt": "A leafy mango tree with clusters of green mangoes hanging from its branches",
        "caption": "A mango tree heavy with young fruit."
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/mango-puree/mango-kensington.webp",
        "author": "Asit K. Ghosh Thaumaturgist",
        "licence": "CC BY-SA 3.0",
        "url": "https://commons.wikimedia.org/wiki/File:Mango_Kensington_Asit_ftg.jpg"
      },
      {
        "file": "/images/brands/giffard/products/mango-puree/mango-cut.webp",
        "author": "Shahzaib Damn Cruze",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Cut_mangoes_on_plate.jpg"
      },
      {
        "file": "/images/brands/giffard/products/mango-puree/mango-tree.webp",
        "author": "Muralikrishna m",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Mango_tree_with_mangoes_(3).jpg"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/fruit-for-mix/7038-133-mango-fruit-for-mix.html",
      "https://www.giffard.com/en/3-fruit-for-mix",
      "https://www.giffard.com/en/cocktail/6768-mango-mojito",
      "https://www.giffard.com/en/cocktail/6750-virgin-mango-mojito",
      "https://www.giffard.com/en/cocktail/6713-castaway-smoothie-2",
      "https://en.wikipedia.org/wiki/Mango",
      "https://en.wikipedia.org/wiki/Kensington_Pride"
    ]
  },
  {
    "slug": "passion-fruit-puree",
    "label": "Passion Fruit Puree",
    "fullName": "Giffard Fruit for Mix Passion Fruit",
    "category": "Puree",
    "image": "/images/giffard-passion-fruit-puree.webp",
    "imageAlt": "Giffard Passion Fruit puree bottle with tropical island backdrop",
    "accent": "#e8a33d",
    "tagline": "Sour, musky passion fruit with real pulp",
    "lede": "Giffard's Fruit for Mix Passion Fruit is made with 54% passion fruit juice and pulp, and it tastes like the fruit: sharp, musky and juicy. It is the quickest way to get a consistent passion fruit hit into a Mojito, a sour or a tropical alcohol-free serve.",
    "facts": [
      {
        "value": "54%",
        "label": "Passion fruit juice and pulp"
      },
      {
        "value": "1 L",
        "label": "Bottle size"
      },
      {
        "value": "4 weeks",
        "label": "Use within, once opened"
      },
      {
        "value": "≤ 25°C",
        "label": "Store cool and dry"
      }
    ],
    "about": [
      "Part of Giffard's Fruit for Mix range, the passion fruit is made from passion fruit juice and pulp from concentrate (54%), sugar and citric acid, thickened with pectin and xanthan, with ascorbic acid as an antioxidant and potassium sorbate as a preservative. Giffard states there is no colorant, so the bright saffron-yellow colour is the fruit's own.",
      "Passion fruit is a hard flavour to keep consistent from fresh fruit, which varies a lot in yield and acidity. A one-litre bottle of Fruit for Mix gives you the same sour, aromatic pulp every time, for twisting classics, adding fruit and texture to long drinks, or building lemonades and iced teas."
    ],
    "fruit": {
      "heading": "The flower of five wounds",
      "paras": [
        "Passiflora edulis is native to southern Brazil, through Paraguay and into northern Argentina, and is now grown across the tropics and subtropics. Its name goes back to missionaries in Brazil around 1700, who used the plant's elaborate flower to illustrate the Crucifixion; it was called flor das cinco chagas, the flower of the five wounds.",
        "There are two main forms. The purple fruit is smaller, at around 35 g, less acidic and with a richer aroma and sweeter pulp. The yellow form, flavicarpa, can grow to the size of a grapefruit and has been used in Australia as rootstock for purple passion fruit."
      ],
      "image": {
        "src": "/images/brands/giffard/products/passion-fruit-puree/passionfruit-flower-fruit.webp",
        "alt": "A white and purple passion flower in bloom beside a green passion fruit on the vine",
        "caption": "Passiflora edulis in flower, with a young fruit forming on the same vine."
      }
    },
    "tasting": {
      "appearance": "Bright saffron yellow.",
      "nose": "Unmistakable passion fruit: musky and tart.",
      "palate": "A typically sour attack of fresh, juicy passion fruit, with zingy pulp.",
      "finish": "Pleasantly sour, with a slightly astringent edge from the seeds."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 4,
        "note": "About 82 g of sugars per 100 ml, balanced by plenty of acidity."
      },
      {
        "label": "Acidity",
        "value": 4,
        "note": "The sourest of the four in this set; it can carry part of the sour in a spec."
      },
      {
        "label": "Fruit intensity",
        "value": 5,
        "note": "Very aromatic: a small pour goes a long way."
      },
      {
        "label": "Body",
        "value": 3,
        "note": "Pulpy and pourable, thickened with pectin and xanthan."
      },
      {
        "label": "Astringency",
        "value": 2,
        "note": "A light, seed-like grip on the finish."
      }
    ],
    "cocktails": [
      {
        "name": "Passion Fruit Mojito",
        "glass": "Highball",
        "ice": "Crushed ice",
        "garnish": "Mint sprig",
        "spec": [
          {
            "amount": "50",
            "unit": "ml",
            "what": "White rum"
          },
          {
            "amount": "25",
            "unit": "ml",
            "what": "Giffard Fruit for Mix Passion Fruit"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "Lime juice"
          },
          {
            "amount": "10",
            "unit": "leaves",
            "what": "Mint"
          },
          {
            "amount": "",
            "unit": "top",
            "what": "Sparkling water"
          }
        ],
        "method": [
          "Clap the mint leaves between your hands and drop them into the glass.",
          "Half-fill the glass with crushed ice.",
          "Add the rum, passion fruit and lime, then churn to combine.",
          "Fill the glass with crushed ice.",
          "Top with sparkling water, garnish and serve."
        ],
        "note": "The passion fruit stands in for sugar and part of the sour. For a Virgin Passion Fruit Mojito, Giffard uses 20 ml passion fruit, 15 ml lime and 25 ml of its Rum Flavour syrup instead of the rum.",
        "source": "https://www.giffard.com/en/cocktail/6766-passion-fruit-mojito"
      },
      {
        "name": "A Midsummer Night Dream (alcohol-free)",
        "glass": "Cocktail glass, chilled",
        "ice": "Shaken with ice; served straight up",
        "garnish": "Physalis",
        "spec": [
          {
            "amount": "30",
            "unit": "ml",
            "what": "Giffard Fruit for Mix Passion Fruit"
          },
          {
            "amount": "30",
            "unit": "ml",
            "what": "Pineapple juice"
          },
          {
            "amount": "25",
            "unit": "ml",
            "what": "Giffard Lemonade Base syrup"
          },
          {
            "amount": "5",
            "unit": "ml",
            "what": "Giffard Honey syrup"
          },
          {
            "amount": "3",
            "unit": "slices",
            "what": "Fresh ginger"
          }
        ],
        "method": [
          "Add the ingredients to a shaker.",
          "Fill the shaker two-thirds full with ice cubes.",
          "Shake hard for 7–10 seconds.",
          "Strain into a chilled glass with no ice.",
          "Garnish and serve."
        ],
        "note": "Created by Raphaëlle Chaize, Giffard's beverage expert. Ginger and honey round out the sharpness of the passion fruit in a zero-proof drink served like a short cocktail.",
        "source": "https://www.giffard.com/en/cocktail/6760-a-midsummer-night-dream-2"
      }
    ],
    "uses": [
      {
        "title": "Sweet and sour in one",
        "body": "Because it is both sweet and sharp, passion fruit can cover the syrup and some of the citrus in a sour. Start with 20–25 ml and taste before adding more lime."
      },
      {
        "title": "Pairings",
        "body": "It works with vanilla, coconut, pineapple, mango, ginger and honey, and with rum, vodka, tequila and sparkling wine."
      },
      {
        "title": "Long and zero-proof",
        "body": "Shaken with pineapple and ginger, or lengthened with soda, lemonade or iced tea, it makes a full-flavoured alcohol-free serve."
      },
      {
        "title": "Storage and shelf life",
        "body": "Giffard's guidance is to store the bottle in a dry, clean, cool place at no more than 25°C, and to use it within four weeks of opening. Date the bottle when you crack it so nobody on the next shift has to guess."
      }
    ],
    "faq": [
      {
        "q": "How much fruit is in it?",
        "a": "Giffard lists passion fruit juice and pulp from concentrate at 54% of the recipe."
      },
      {
        "q": "Does it contain seeds?",
        "a": "Giffard describes it as juice and pulp. The tasting note mentions a slightly astringent finish 'from the seeds', but the label doesn't say whether seeds are included, so treat it as pulp rather than whole fruit."
      },
      {
        "q": "Does it contain colouring?",
        "a": "No. Giffard states there is no colorant."
      },
      {
        "q": "How long does it keep once opened?",
        "a": "Use it within four weeks of opening, and store it in a dry, clean, cool place at no more than 25°C."
      },
      {
        "q": "Is it alcoholic?",
        "a": "No. It is a non-alcoholic fruit preparation, and Giffard also suggests it for cooking and baking."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/passion-fruit-puree/passionfruit-halved.webp",
        "alt": "A whole purple passion fruit beside a halved one showing golden pulp and dark seeds",
        "caption": "Purple passion fruit, whole and halved: the golden, seedy pulp is where the flavour lives."
      },
      {
        "src": "/images/brands/giffard/products/passion-fruit-puree/passionfruit-harvest.webp",
        "alt": "A plastic crate filled with freshly picked yellow-orange passion fruit",
        "caption": "A crate of freshly picked passion fruit in Vattavada, in the hills of Kerala, India."
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/passion-fruit-puree/passionfruit-flower-fruit.webp",
        "author": "Heydew",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Passiflora_edulis_flower_and_fruit.jpg"
      },
      {
        "file": "/images/brands/giffard/products/passion-fruit-puree/passionfruit-halved.webp",
        "author": "Ivar Leidus",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Passion_fruits_-_whole_and_halved.jpg"
      },
      {
        "file": "/images/brands/giffard/products/passion-fruit-puree/passionfruit-harvest.webp",
        "author": "Sivahari",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Passion_fruit_vattavada.jpg"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/fruit-for-mix/7027-132-passion-fruit-fruit-for-mix.html",
      "https://www.giffard.com/en/3-fruit-for-mix",
      "https://www.giffard.com/en/cocktail/6766-passion-fruit-mojito",
      "https://www.giffard.com/en/cocktail/6748-virgin-passion-fruit-mojito",
      "https://www.giffard.com/en/cocktail/6760-a-midsummer-night-dream-2",
      "https://en.wikipedia.org/wiki/Passiflora_edulis"
    ]
  },
  {
    "slug": "yuzu-puree",
    "label": "Yuzu Puree",
    "fullName": "Giffard Fruit for Mix Yuzu",
    "category": "Puree",
    "image": "/images/giffard-yuzu-puree.webp",
    "imageAlt": "Giffard Yuzu Fruit for Mix puree bottle with fresh yuzu, blossom and a highball",
    "accent": "#f3d53a",
    "tagline": "Bright yuzu with candied orange and a long finish",
    "lede": "Giffard's Fruit for Mix Yuzu brings the fragrant, sharp character of Japan's favourite citrus to the bar in a ready-to-pour bottle. It is built on yuzu juice backed by orange juice, so expect bright yuzu up front with warm, candied-orange depth behind it.",
    "facts": [
      {
        "value": "12%",
        "label": "Yuzu juice (plus 10% orange juice)"
      },
      {
        "value": "1 L",
        "label": "Bottle size"
      },
      {
        "value": "4 weeks",
        "label": "Use within, once opened"
      },
      {
        "value": "≤ 25°C",
        "label": "Store cool and dry"
      }
    ],
    "about": [
      "Unlike the other Fruit for Mix flavours, the yuzu is a citrus juice preparation rather than a fruit-pulp puree. The recipe is sugar, water, yuzu juice (12%), orange juice from concentrate (10%), citric acid and natural yuzu flavouring, thickened with pectin and xanthan gum and preserved with potassium sorbate. That makes it sweeter and more syrup-like than the pulp-based flavours, with a sharp citrus edge.",
      "A one-litre bottle gives a consistent yuzu note for spritzes, sours and alcohol-free serves, and Giffard notes it can be used in cooking and baking too."
    ],
    "fruit": {
      "heading": "An ancient Chinese citrus, adopted by Japan",
      "paras": [
        "Yuzu (Citrus × junos) is thought to have originated in central China as a hybrid of a mandarin and the Ichang papeda, and was introduced to Japan and Korea during the Tang dynasty. It is unusually frost-hardy for a citrus, growing where winters drop to around −7°C. Its flavour is tart and fragrant, close to grapefruit with overtones of mandarin.",
        "In Japan, yuzu juice is a key part of ponzu, and the zest goes into yuzu kosho, a spicy paste made with chilli and salt. Bathing with whole yuzu on Tōji, the winter solstice, is a custom dating back at least to the early 18th century."
      ],
      "image": {
        "src": "/images/brands/giffard/products/yuzu-puree/yuzu-fruit.webp",
        "alt": "Three bright yellow, knobbly yuzu fruit hanging among green leaves",
        "caption": "Ripe yuzu on the tree: knobbly, sunshine-yellow and intensely fragrant."
      }
    },
    "tasting": {
      "appearance": "Sunshine yellow.",
      "nose": "Bright yuzu, with warm candied orange and a light floral touch.",
      "palate": "Yuzu-forward and refreshingly acidic, with candied-orange notes.",
      "finish": "Powerful and long-lasting."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 4,
        "note": "About 83 g of sugars per 100 ml; behaves more like a citrus syrup than a pulp."
      },
      {
        "label": "Acidity",
        "value": 4,
        "note": "Refreshingly sharp from the yuzu juice and added citric acid."
      },
      {
        "label": "Aromatics",
        "value": 5,
        "note": "Fragrant yuzu with candied orange and a floral lift."
      },
      {
        "label": "Body",
        "value": 2,
        "note": "Lighter than the pulp-based flavours, though pectin and xanthan give some weight."
      },
      {
        "label": "Length",
        "value": 5,
        "note": "Giffard describes a powerful, long finish."
      }
    ],
    "cocktails": [
      {
        "name": "Yuzu Spritz",
        "glass": "Wine glass",
        "ice": "Ice cubes",
        "garnish": "",
        "spec": [
          {
            "amount": "50",
            "unit": "ml",
            "what": "Giffard Spritz Liqueur"
          },
          {
            "amount": "25",
            "unit": "ml",
            "what": "Giffard Fruit for Mix Yuzu"
          },
          {
            "amount": "",
            "unit": "top",
            "what": "Elderflower tonic"
          }
        ],
        "method": [
          "Pour the spritz liqueur and yuzu into the glass.",
          "Stir well.",
          "Add ice cubes.",
          "Top with elderflower tonic and serve."
        ],
        "note": "A citrus-led twist on the bitter-orange spritz; the yuzu lifts the bitterness and the elderflower tonic adds a floral finish.",
        "source": "https://www.giffard.com/en/cocktail/8417-yuzu-spritz"
      },
      {
        "name": "Yuzu Basil Smash (alcohol-free)",
        "glass": "Rocks glass",
        "ice": "Ice cubes",
        "garnish": "Basil leaf",
        "spec": [
          {
            "amount": "50",
            "unit": "ml",
            "what": "Giffard Herbal Juniper non-alcoholic cocktail base"
          },
          {
            "amount": "20",
            "unit": "ml",
            "what": "Lemon juice"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "Giffard Fruit for Mix Yuzu"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "Giffard Basil syrup"
          }
        ],
        "method": [
          "Pour all the ingredients into a shaker filled with ice.",
          "Shake hard.",
          "Strain into a rocks glass.",
          "Garnish and serve."
        ],
        "note": "A zero-proof take on the Gin Basil Smash, using Giffard's juniper-led non-alcoholic base. Giffard flags it as suitable for pre-batching.",
        "source": "https://www.giffard.com/en/cocktail/8418-yuzu-basil-smash"
      }
    ],
    "uses": [
      {
        "title": "A citrus accent, not just a base",
        "body": "Yuzu is intensely aromatic, so 15 ml alongside fresh lemon or lime often does more than a heavy pour. Use it to lift a Margarita, Sour, Collins or Gimlet."
      },
      {
        "title": "Spritzes and tonics",
        "body": "Paired with bitter aperitifs, elderflower or tonic, it adds a fragrant, sharp citrus note to long drinks."
      },
      {
        "title": "Alcohol-free",
        "body": "With a non-alcoholic spirit base, fresh lemon and a herb syrup, it builds proper sours and smashes without alcohol, and it lengthens well into lemonades and iced teas."
      },
      {
        "title": "Storage and shelf life",
        "body": "Giffard's guidance is to store the bottle in a dry, clean, cool place at no more than 25°C, and to use it within four weeks of opening. Date the bottle when you crack it so nobody on the next shift has to guess."
      }
    ],
    "faq": [
      {
        "q": "Is it pure yuzu puree?",
        "a": "No. It is a yuzu juice preparation containing 12% yuzu juice and 10% orange juice from concentrate, with sugar, water, citric acid and natural yuzu flavouring."
      },
      {
        "q": "How does it differ from the other Fruit for Mix flavours?",
        "a": "The kiwi, mango and passion fruit are built on fruit puree or pulp at 50–59%. The yuzu is juice-based, so it is lighter in body and more aromatic, with candied-orange notes from the orange juice."
      },
      {
        "q": "How long does it keep once opened?",
        "a": "Use it within four weeks of opening, and store it in a dry, clean, cool place at no more than 25°C."
      },
      {
        "q": "Is it alcoholic?",
        "a": "No. It is non-alcoholic and works in mocktails, lemonades and iced teas as well as cocktails."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/yuzu-puree/yuzu-branch.webp",
        "alt": "A single ripe yellow yuzu hanging from a thorny branch",
        "caption": "A single yuzu on the branch in Japan; note the thorns, typical of the tree."
      },
      {
        "src": "/images/brands/giffard/products/yuzu-puree/yuzu-tree.webp",
        "alt": "A small yuzu tree covered in yellow fruit",
        "caption": "A yuzu tree laden with fruit in Ikeda, Japan."
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/yuzu-puree/yuzu-fruit.webp",
        "author": "Nikita from Russian Federation",
        "licence": "CC BY 2.0",
        "url": "https://commons.wikimedia.org/wiki/File:Yuzu_oranges_(6459456959).jpg"
      },
      {
        "file": "/images/brands/giffard/products/yuzu-puree/yuzu-branch.webp",
        "author": "Nagarazoku from Tokyo, Japan",
        "licence": "CC BY-SA 2.0",
        "url": "https://commons.wikimedia.org/wiki/File:Yuzufruit.jpg"
      },
      {
        "file": "/images/brands/giffard/products/yuzu-puree/yuzu-tree.webp",
        "author": "Kujiro",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Yuzutreeikeda.png"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/fruit-for-mix/8428-430-copy-of-fruit-for-mix-kiwi.html",
      "https://www.giffard.com/en/3-fruit-for-mix",
      "https://www.giffard.com/en/cocktail/8417-yuzu-spritz",
      "https://www.giffard.com/en/cocktail/8418-yuzu-basil-smash",
      "https://www.giffard.com/en/non-alcoholic-cocktail-base/8414-herbal-juniper-non-alcoholic-cocktail-base.html",
      "https://en.wikipedia.org/wiki/Yuzu"
    ]
  },
  {
    "slug": "na-smoky-agave",
    "label": "Smoky Agave",
    "fullName": "Giffard Smoky Agave Non-Alcoholic Cocktail Base",
    "category": "Non-Alcoholic",
    "image": "/images/giffard-na-smoky-agave.webp",
    "imageAlt": "Giffard Smoky Agave non-alcoholic base with agave, lime and a salted serve",
    "accent": "#8fb3a0",
    "tagline": "Earthy, smoky agave character with no alcohol at all",
    "lede": "Smoky Agave is Giffard’s alcohol-free answer to mezcal, built on agave syrup with a whisper of smoke and wild pepper. It pours in the same proportions as the spirit it stands in for, so your Margarita and Paloma specs barely change.",
    "facts": [
      {
        "value": "Alcohol-free",
        "label": "Strength"
      },
      {
        "value": "70 cl",
        "label": "Bottle"
      },
      {
        "value": "3 g",
        "label": "Sugars per 100 ml"
      },
      {
        "value": "5 months",
        "label": "Shelf life once opened"
      }
    ],
    "about": [
      "Smoky Agave is N°03 in Giffard’s Non-Alcoholic Cocktail Base range, made in Angers, in France’s Loire Valley, by the family house that has been producing liqueurs and syrups since 1885. Giffard describes it as “typical of a mezcal”: an agave-syrup base seasoned with natural flavourings, a pinch of salt and natural chilli flavouring.",
      "The range is designed for the bar rather than the supermarket shelf. Giffard says the bases are meant to be used in the same proportions as traditional spirits, so a 50 ml pour of mezcal becomes a 50 ml pour of Smoky Agave. With just 3 g of sugar per 100 ml it is drier than a syrup, which leaves you room to balance with agave syrup and citrus as you would in the original drink."
    ],
    "fruit": {
      "heading": "Why mezcal tastes of smoke",
      "paras": [
        "Mezcal is distilled from agave hearts, or piñas, that are traditionally roasted in earth-covered pits before being crushed and fermented. That slow roast is where mezcal’s signature smoke and savoury, earthy depth come from, and it is what sets it apart from most tequila.",
        "The workhorse plant is espadín (Agave angustifolia), grown widely in Oaxaca. Giffard keeps agave at the heart of Smoky Agave through agave syrup, then layers on the wet-soil, smoke and pepper notes a mezcal drinker expects, without the alcohol."
      ],
      "image": {
        "src": "/images/brands/giffard/products/na-smoky-agave/espadin-agave.webp",
        "alt": "Espadín agave plants on a rocky hillside above mountain valleys, in black and white",
        "caption": "Espadín agave, the most widely used mezcal agave. Photo: Neda Ruscic, CC BY 2.0"
      }
    },
    "tasting": {
      "appearance": "Ash white.",
      "nose": "Wet soil and smoky notes.",
      "palate": "Aromatic complexity balanced between wild pepper, mild round smoky fruit and herbaceous nuances.",
      "finish": "Long, soft and earthy."
    },
    "profile": [
      {
        "label": "Smoke",
        "value": 4,
        "note": "Gentle, roasted-agave smoke"
      },
      {
        "label": "Earthiness",
        "value": 4,
        "note": "Wet soil on the nose, earthy finish"
      },
      {
        "label": "Spice",
        "value": 3,
        "note": "Wild pepper and a hint of chilli"
      },
      {
        "label": "Sweetness",
        "value": 2,
        "note": "3 g sugars per 100 ml"
      },
      {
        "label": "Herbaceous",
        "value": 3,
        "note": "Green, herbaceous nuances"
      }
    ],
    "cocktails": [
      {
        "name": "Smokin’ Tommy (alcohol-free)",
        "glass": "Rocks",
        "ice": "Clear ice block",
        "garnish": "",
        "spec": [
          {
            "amount": "50",
            "unit": "ml",
            "what": "Giffard Smoky Agave"
          },
          {
            "amount": "25",
            "unit": "ml",
            "what": "Agave syrup"
          },
          {
            "amount": "30",
            "unit": "ml",
            "what": "Fresh lime juice"
          }
        ],
        "method": [
          "Pour the ingredients into a shaker.",
          "Fill the shaker two-thirds with ice cubes.",
          "Shake hard for 7–10 seconds.",
          "Strain into a rocks glass over a clear ice block and serve."
        ],
        "note": "A zero-proof take on the Tommy’s Margarita: just base, agave and lime, so the smoke does the talking.",
        "source": "https://www.giffard.com/en/cocktail/8335-smokin-tommy-alcohol-free"
      },
      {
        "name": "Oh La La Paloma (alcohol-free)",
        "glass": "Highball",
        "ice": "Long clear ice",
        "garnish": "Salt rim and a grapefruit wedge",
        "spec": [
          {
            "amount": "45",
            "unit": "ml",
            "what": "Giffard Smoky Agave"
          },
          {
            "amount": "20",
            "unit": "ml",
            "what": "Giffard Grapefruit Alcohol Free"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "Fresh lime juice"
          },
          {
            "amount": "10",
            "unit": "ml",
            "what": "Agave syrup"
          },
          {
            "amount": "",
            "unit": "top",
            "what": "Tonic water"
          }
        ],
        "method": [
          "Rim a highball glass with salt.",
          "Add the ingredients to the glass over long clear ice.",
          "Top up with tonic water.",
          "Stir gently with a bar spoon, garnish and serve."
        ],
        "note": "Giffard’s alcohol-free grapefruit stands in for the usual grapefruit soda, with tonic adding the bitter lift.",
        "source": "https://www.giffard.com/en/cocktail/8336-oh-la-la-paloma-alcohol-free"
      }
    ],
    "uses": [
      {
        "title": "Swap it one for one",
        "body": "Giffard designed the range to be used in the same proportions as the spirits it replaces, so start with your existing mezcal or tequila spec and adjust the sugar to taste."
      },
      {
        "title": "Margaritas and Palomas first",
        "body": "Giffard recommends it for Margaritas, Palomas and mezcal highballs: drinks where agave, citrus and salt are already the main event."
      },
      {
        "title": "Lean on salt and lime",
        "body": "A salted rim or a few drops of saline bring the smoky, earthy notes forward, and fresh lime keeps the finish bright."
      },
      {
        "title": "Store it like a syrup",
        "body": "Keep the bottle somewhere cool and dark. Once opened it keeps for five months and doesn’t need refrigeration."
      }
    ],
    "faq": [
      {
        "q": "Does Giffard Smoky Agave contain any alcohol?",
        "a": "No. Giffard sells it as an entirely alcohol-free cocktail base."
      },
      {
        "q": "Is it a mezcal or a tequila alternative?",
        "a": "Giffard describes it as “typical of a mezcal”, so expect smoke and earthiness, but it works anywhere you would use an agave spirit, including a Margarita."
      },
      {
        "q": "How much should I use?",
        "a": "Use it in the same proportions as the spirit you are replacing. Giffard’s own recipes call for 45–50 ml per drink."
      },
      {
        "q": "What is it made from?",
        "a": "Water, agave syrup, natural flavourings, stabilisers (acacia gum, xanthan gum), citric acid, preservatives (potassium sorbate, sodium benzoate), salt and natural chilli flavouring."
      },
      {
        "q": "How long does an open bottle last?",
        "a": "Five months once opened, stored in a cool, dry place away from light. No refrigeration needed."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/na-smoky-agave/agave-oaxaca.webp",
        "alt": "Agave angustifolia plants growing near Yagul in Oaxaca",
        "caption": "Agave angustifolia (espadín) near Yagul, Oaxaca. Photo: Thayne Tuason, CC BY 4.0"
      },
      {
        "src": "/images/brands/giffard/products/na-smoky-agave/paloma.webp",
        "alt": "A Paloma cocktail in a tall glass with grapefruit",
        "caption": "The Paloma, one of the serves Giffard suggests for Smoky Agave. Photo: Erich Wagner (www.eventografie.de), CC BY-SA 4.0"
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/na-smoky-agave/espadin-agave.webp",
        "author": "Neda Ruscic",
        "licence": "CC BY 2.0",
        "url": "https://commons.wikimedia.org/wiki/File:Espad%C3%ADn_(22384088802).jpg"
      },
      {
        "file": "/images/brands/giffard/products/na-smoky-agave/agave-oaxaca.webp",
        "author": "Thayne Tuason",
        "licence": "CC BY 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Agave_angustifolia-_plants_near_Yagul_Oaxaca.jpg"
      },
      {
        "file": "/images/brands/giffard/products/na-smoky-agave/paloma.webp",
        "author": "Erich Wagner (www.eventografie.de)",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Paloma_Cocktail2.jpg"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/non-alcoholic-cocktail-base/8416-393-smoky-agave-non-alcoholic-cocktail-base.html",
      "https://www.giffard.com/en/29-non-alcoholic-cocktail-base",
      "https://www.giffard.com/en/cocktail/8335-smokin-tommy-alcohol-free",
      "https://www.giffard.com/en/cocktail/8336-oh-la-la-paloma-alcohol-free",
      "https://www.giffard.com/en/cocktail/8326-guava-margarita-alcohol-free"
    ]
  },
  {
    "slug": "na-aperitif-bitter",
    "label": "Aperitif Bitter",
    "fullName": "Giffard Aperitif Bitter Non-Alcoholic Cocktail Base",
    "category": "Non-Alcoholic",
    "image": "/images/giffard-na-aperitif-bitter.webp",
    "imageAlt": "Giffard Aperitif Bitter non-alcoholic base with orange and a negroni-style serve",
    "accent": "#e2492f",
    "tagline": "Italian-style red bitter, without the alcohol",
    "lede": "Aperitif Bitter is Giffard’s alcohol-free stand-in for a red Italian bitter, bright red and built around gentian, orange and quinine. It is the backbone for zero-proof Spritzes, Americanos and Negroni riffs.",
    "facts": [
      {
        "value": "Alcohol-free",
        "label": "Strength"
      },
      {
        "value": "70 cl",
        "label": "Bottle"
      },
      {
        "value": "Bright red",
        "label": "Colour"
      },
      {
        "value": "37 g",
        "label": "Sugars per 100 ml"
      }
    ],
    "about": [
      "Aperitif Bitter is N°01 in Giffard’s Non-Alcoholic Cocktail Base range, made in Angers, France. Giffard describes it as “typical of a bitter”: a sophisticated, entirely alcohol-free substitute for the red aperitivo bitters behind the Spritz and the Negroni.",
      "It is much sweeter than the other bases in the range (37 g sugars per 100 ml), much as the bitter liqueurs it imitates are, and that sweetness is what buffers the bitterness. Giffard suggests it as a base for a Garibaldi, Jungle Bird, Right Hand and other non-alcoholic cocktails."
    ],
    "fruit": {
      "heading": "Gentian and the art of the bitter",
      "paras": [
        "Great yellow gentian (Gentiana lutea) is a tall mountain plant of European upland meadows, and its root is one of the classic bittering agents in European aperitifs and digestifs. It brings the dry, rooty bitterness that makes a red bitter so moreish before a meal.",
        "Giffard’s Aperitif Bitter puts gentian on the nose alongside fresh orange, grapefruit and berries, then follows with blood-orange zest and quinine on the palate: the same push and pull of citrus and bitterness you look for in a classic aperitivo."
      ],
      "image": {
        "src": "/images/brands/giffard/products/na-aperitif-bitter/gentian-flower.webp",
        "alt": "Yellow flowers of great yellow gentian in an alpine meadow",
        "caption": "Great yellow gentian (Gentiana lutea) in flower at Mont-Saxonnex in the French Alps. Photo: Tournasol7, CC BY 4.0"
      }
    },
    "tasting": {
      "appearance": "Bright red.",
      "nose": "A pleasant harmony of gentian, fresh orange, grapefruit and berries.",
      "palate": "Fresh blood-orange zest, well-balanced quinine bitterness and tart grapefruit.",
      "finish": null
    },
    "profile": [
      {
        "label": "Bitterness",
        "value": 4,
        "note": "Gentian and quinine"
      },
      {
        "label": "Citrus",
        "value": 4,
        "note": "Blood orange and grapefruit"
      },
      {
        "label": "Sweetness",
        "value": 4,
        "note": "37 g sugars per 100 ml balances the bitterness"
      },
      {
        "label": "Berry fruit",
        "value": 2,
        "note": "Soft berry notes on the nose"
      }
    ],
    "cocktails": [
      {
        "name": "Aperitif Spritzer (alcohol-free)",
        "glass": "Wine glass",
        "ice": "Ice cubes",
        "garnish": "Grapefruit slice",
        "spec": [
          {
            "amount": "45",
            "unit": "ml",
            "what": "Giffard Aperitif Bitter"
          },
          {
            "amount": "30",
            "unit": "ml",
            "what": "Giffard Grapefruit Alcohol Free"
          },
          {
            "amount": "10",
            "unit": "ml",
            "what": "Gum syrup"
          },
          {
            "amount": "70",
            "unit": "ml",
            "what": "Non-alcoholic sparkling wine"
          }
        ],
        "method": [
          "Add all the ingredients to a wine glass filled with ice.",
          "Stir gently to bring the flavours together.",
          "Garnish with a grapefruit slice and serve."
        ],
        "note": "A zero-proof Spritz with grapefruit lifting the bitter-orange notes.",
        "source": "https://www.giffard.com/en/cocktail/8316-aperitif-spritzer-alcohol-free"
      },
      {
        "name": "Americano (without alcohol)",
        "glass": "Rocks",
        "ice": "Clear ice block",
        "garnish": "Orange slice",
        "spec": [
          {
            "amount": "30",
            "unit": "ml",
            "what": "Giffard Ruby Grape"
          },
          {
            "amount": "25",
            "unit": "ml",
            "what": "Giffard Aperitif Bitter"
          },
          {
            "amount": "",
            "unit": "top",
            "what": "Sparkling water"
          }
        ],
        "method": [
          "Fill a rocks glass with a clear ice block.",
          "Add the Ruby Grape and Aperitif Bitter.",
          "Top up with sparkling water.",
          "Stir gently with a bar spoon, garnish and serve."
        ],
        "note": "The classic bitter-and-vermouth long drink, rebuilt with two Giffard alcohol-free bases.",
        "source": "https://www.giffard.com/en/cocktail/8330-americano-without-alcohol"
      }
    ],
    "uses": [
      {
        "title": "The Spritz is the obvious start",
        "body": "Pair it with alcohol-free sparkling wine or soda over plenty of ice for a low-effort aperitivo."
      },
      {
        "title": "Build a zero-proof Negroni",
        "body": "Combine it with Giffard Herbal Juniper and Ruby Grape. Giffard publishes its own “NO-groni” using all three bases."
      },
      {
        "title": "Mind the sugar",
        "body": "It is far sweeter than the other bases in the range, so cut back on added syrup when you swap it into an existing spec."
      },
      {
        "title": "Tiki works too",
        "body": "Giffard suggests it for a Jungle Bird with its Gold Cane base, where the bitterness cuts through pineapple and lime."
      }
    ],
    "faq": [
      {
        "q": "Is Giffard Aperitif Bitter alcohol-free?",
        "a": "Yes. Giffard describes it as an entirely alcohol-free substitute for a bitter."
      },
      {
        "q": "What does it replace?",
        "a": "A red Italian-style aperitivo bitter, the kind used in a Spritz, Americano or Negroni."
      },
      {
        "q": "What is in it?",
        "a": "Water, sugar, natural flavourings, citric acid, colourings (plain caramel, E129) and sodium benzoate as a preservative."
      },
      {
        "q": "Which cocktails does Giffard suggest?",
        "a": "A Garibaldi, Jungle Bird, Right Hand and other non-alcoholic cocktails, plus Giffard’s own Aperitif Spritzer, Americano and Old Friend recipes."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/na-aperitif-bitter/gentian-root.webp",
        "alt": "Dried gentian roots",
        "caption": "Dried roots of Gentiana lutea, a classic bittering agent in European aperitifs. Photo: B.navez, CC BY-SA 3.0"
      },
      {
        "src": "/images/brands/giffard/products/na-aperitif-bitter/blood-orange.webp",
        "alt": "Cut blood oranges showing deep red flesh",
        "caption": "Blood orange, the zest note on Aperitif Bitter’s palate. Photo: Rillke, CC BY-SA 2.0"
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/na-aperitif-bitter/gentian-flower.webp",
        "author": "Tournasol7",
        "licence": "CC BY 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Gentiana_lutea_in_Mont-Saxonnex_(4).jpg"
      },
      {
        "file": "/images/brands/giffard/products/na-aperitif-bitter/gentian-root.webp",
        "author": "B.navez",
        "licence": "CC BY-SA 3.0",
        "url": "https://commons.wikimedia.org/wiki/File:Gentiana_lutea_DriedRoots.JPG"
      },
      {
        "file": "/images/brands/giffard/products/na-aperitif-bitter/blood-orange.webp",
        "author": "Rillke",
        "licence": "CC BY-SA 2.0",
        "url": "https://commons.wikimedia.org/wiki/File:Blood_orange_-_25100840061.jpg"
      }
    ],
    "sources": [
      "https://web.archive.org/web/20260306084044/https://www.giffard.com/en/non-alcoholic-cocktail-base/8412-aperitif-bitter-non-alcoholic-cocktail-base.html",
      "https://www.giffard.com/en/cocktail/8316-aperitif-spritzer-alcohol-free",
      "https://www.giffard.com/en/cocktail/8330-americano-without-alcohol",
      "https://www.giffard.com/en/cocktail/8313-jungle-bird-alcohol-free",
      "https://www.giffard.com/en/cocktail/8315-old-friend-alcohol-free"
    ]
  },
  {
    "slug": "na-herbal-juniper",
    "label": "Herbal Juniper",
    "fullName": "Giffard Herbal Juniper Non-Alcoholic Cocktail Base",
    "category": "Non-Alcoholic",
    "image": "/images/giffard-na-herbal-juniper.webp",
    "imageAlt": "Giffard Herbal Juniper non-alcoholic base with juniper berries and a tall serve",
    "accent": "#6fa7a0",
    "tagline": "Juniper, cardamom and coriander for gin-style serves",
    "lede": "Herbal Juniper is Giffard’s alcohol-free alternative to gin, made from juniper and cardamom extracts with coriander seed oil. It brings a proper botanical backbone to zero-proof G&Ts, Gimlets and Clover Clubs.",
    "facts": [
      {
        "value": "Alcohol-free",
        "label": "Strength"
      },
      {
        "value": "70 cl",
        "label": "Bottle"
      },
      {
        "value": "4 g",
        "label": "Sugars per 100 ml"
      },
      {
        "value": "5 months",
        "label": "Shelf life once opened"
      }
    ],
    "about": [
      "Herbal Juniper is N°04 in Giffard’s Non-Alcoholic Cocktail Base range, made in Angers, France. Giffard describes it as “typical of a gin”, built on juniper extract and cardamom extract and finished with coriander seed essential oil, three botanicals closely associated with the spirit.",
      "Like the rest of the range, it is designed to be used in the same proportions as the spirit it replaces, and at 4 g of sugar per 100 ml it stays dry enough for crisp, citrus-led drinks. Giffard recommends it as a base for a Negroni, Gimlet, Clover Club and other non-alcoholic cocktails."
    ],
    "fruit": {
      "heading": "Juniper, the soul of gin",
      "paras": [
        "Gin is, by definition, a juniper-led spirit: the berry-like cones of common juniper (Juniperus communis) give it that piney, resinous, slightly citrusy signature. Coriander seed and cardamom are among the classic supporting botanicals, adding citrus and spice warmth.",
        "Giffard’s Herbal Juniper keeps those three at the centre. The nose is smooth juniper with fresh, grassy citrus and botanical sweetness; the palate is tangy juniper with hints of almond and pine, closing on a woody finish."
      ],
      "image": {
        "src": "/images/brands/giffard/products/na-herbal-juniper/juniper-berries.webp",
        "alt": "Ripe blue juniper berries on a branch of common juniper",
        "caption": "Ripe cones of common juniper (Juniperus communis). Photo: Ivar Leidus, CC BY-SA 4.0"
      }
    },
    "tasting": {
      "appearance": "Cloudy white.",
      "nose": "Aromatic and complex: smooth juniper with fresh grassy citrus notes and botanical sweetness.",
      "palate": "Tangy juniper with hints of almond and pine.",
      "finish": "Woody."
    },
    "profile": [
      {
        "label": "Juniper",
        "value": 5,
        "note": "The lead botanical"
      },
      {
        "label": "Citrus",
        "value": 3,
        "note": "Fresh, grassy citrus on the nose"
      },
      {
        "label": "Spice",
        "value": 3,
        "note": "Cardamom and coriander seed"
      },
      {
        "label": "Sweetness",
        "value": 2,
        "note": "4 g sugars per 100 ml"
      },
      {
        "label": "Woodiness",
        "value": 3,
        "note": "Pine and a woody finish"
      }
    ],
    "cocktails": [
      {
        "name": "Pamplemousse Gin and Tonic (alcohol-free)",
        "glass": "Highball",
        "ice": "Long clear ice",
        "garnish": "Lime wedge",
        "spec": [
          {
            "amount": "60",
            "unit": "ml",
            "what": "Giffard Herbal Juniper"
          },
          {
            "amount": "30",
            "unit": "ml",
            "what": "Giffard Grapefruit Alcohol Free"
          },
          {
            "amount": "",
            "unit": "top",
            "what": "Tonic water"
          }
        ],
        "method": [
          "Add the Herbal Juniper and Grapefruit Alcohol Free to a highball over long clear ice.",
          "Top up with tonic water.",
          "Stir gently with a bar spoon.",
          "Garnish with a lime wedge and serve."
        ],
        "note": "A zero-proof G&T with a grapefruit twist.",
        "source": "https://www.giffard.com/en/cocktail/8321-pamplemousse-gin-and-tonic-alcohol-free"
      },
      {
        "name": "Lemon Grass Gimlet (alcohol-free)",
        "glass": "Coupette",
        "ice": "None (served up)",
        "garnish": "Lemongrass stick",
        "spec": [
          {
            "amount": "60",
            "unit": "ml",
            "what": "Giffard Herbal Juniper"
          },
          {
            "amount": "30",
            "unit": "ml",
            "what": "Fresh lime juice"
          },
          {
            "amount": "20",
            "unit": "ml",
            "what": "Giffard Lemongrass Syrup"
          }
        ],
        "method": [
          "Add all the ingredients to a shaker filled with ice.",
          "Shake hard.",
          "Strain into a coupette.",
          "Garnish with a lemongrass stick and serve."
        ],
        "note": "Lemongrass syrup takes the place of lime cordial, adding a fragrant lift to the juniper.",
        "source": "https://www.giffard.com/en/cocktail/8318-lemon-grass-gimlet-alcohol-free"
      }
    ],
    "uses": [
      {
        "title": "The zero-proof G&T",
        "body": "Use 60 ml over clear ice and top with a good tonic, as in Giffard’s own Pamplemousse G&T."
      },
      {
        "title": "Shaken sours",
        "body": "Its tangy juniper holds up to citrus and raspberry. Giffard builds an alcohol-free Clover Club around it, using its egg white syrup for the foam."
      },
      {
        "title": "Part of a NO-groni",
        "body": "Combine it with Giffard Aperitif Bitter and Ruby Grape for an alcohol-free Negroni."
      },
      {
        "title": "Store it properly",
        "body": "Keep it in a cool, dry place away from light and use it within five months of opening. No refrigeration needed."
      }
    ],
    "faq": [
      {
        "q": "Does Giffard Herbal Juniper contain alcohol?",
        "a": "No. It is an entirely alcohol-free cocktail base."
      },
      {
        "q": "What does it replace?",
        "a": "Gin. Giffard describes it as “typical of a gin”."
      },
      {
        "q": "What botanicals are in it?",
        "a": "Juniper extract, cardamom extract and coriander seed essential oil, alongside natural flavouring. The full list: water, sugar, juniper extract, natural flavouring, cardamom extract, citric acid, xanthan gum, potassium sorbate, sodium benzoate and coriander seed essential oil."
      },
      {
        "q": "Why is it cloudy?",
        "a": "Giffard lists its colour as cloudy white, so a hazy pour is normal."
      },
      {
        "q": "How long does it keep once opened?",
        "a": "Five months, stored in a cool, dry place away from light. No refrigeration needed."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/na-herbal-juniper/cardamom.webp",
        "alt": "Green cardamom pods",
        "caption": "Green cardamom, one of Herbal Juniper’s botanicals. Photo: Misterneedlemouse, CC0"
      },
      {
        "src": "/images/brands/giffard/products/na-herbal-juniper/coriander-seeds.webp",
        "alt": "A pile of dried coriander seeds",
        "caption": "Coriander seed, whose essential oil rounds out Herbal Juniper. Photo: Sanjay Acharya, CC BY-SA 4.0"
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/na-herbal-juniper/juniper-berries.webp",
        "author": "Ivar Leidus",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Juniperus_communis_fruits_-_Keila.jpg"
      },
      {
        "file": "/images/brands/giffard/products/na-herbal-juniper/cardamom.webp",
        "author": "Misterneedlemouse",
        "licence": "CC0",
        "url": "https://commons.wikimedia.org/wiki/File:Green_Cardamom_Pods.jpg"
      },
      {
        "file": "/images/brands/giffard/products/na-herbal-juniper/coriander-seeds.webp",
        "author": "Sanjay Acharya",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Coriander_Seeds.jpg"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/non-alcoholic-cocktail-base/8414-395-herbal-juniper-non-alcoholic-cocktail-base.html",
      "https://www.giffard.com/en/cocktail/8321-pamplemousse-gin-and-tonic-alcohol-free",
      "https://www.giffard.com/en/cocktail/8318-lemon-grass-gimlet-alcohol-free",
      "https://www.giffard.com/en/cocktail/8319-giffard-clover-club-alcohol-free"
    ]
  },
  {
    "slug": "na-ruby-grape",
    "label": "Ruby Grape",
    "fullName": "Giffard Ruby Grape Non-Alcoholic Cocktail Base",
    "category": "Non-Alcoholic",
    "image": "/images/giffard-na-ruby-grape.webp",
    "imageAlt": "Giffard Ruby Grape non-alcoholic base with red grapes and a chilled serve",
    "accent": "#a33a5a",
    "tagline": "Dark-fruited red vermouth character, alcohol-free",
    "lede": "Ruby Grape is Giffard’s alcohol-free take on red vermouth, made with distilled red wine concentrate for genuine grape depth. Dark fruit, caramel and vanilla lead into a gently bitter, herbaceous finish.",
    "facts": [
      {
        "value": "Alcohol-free",
        "label": "Strength"
      },
      {
        "value": "70 cl",
        "label": "Bottle"
      },
      {
        "value": "9 g",
        "label": "Sugars per 100 ml"
      },
      {
        "value": "5 months",
        "label": "Shelf life once opened"
      }
    ],
    "about": [
      "Ruby Grape is N°05 in Giffard’s Non-Alcoholic Cocktail Base range, made in Angers, France. Giffard describes it as “typical of a red vermouth”, made from red wine extract from grapes: a distilled red wine concentrate, with sugar, natural flavourings and lemon juice.",
      "It plays the sweet-vermouth role in the range, in an Americano, Boulevardier or Vermouth Sour, all of which Giffard suggests. With 9 g of sugar per 100 ml it sits between the drier spirit bases and the sweeter Aperitif Bitter."
    ],
    "fruit": {
      "heading": "From the vineyard to the vermouth glass",
      "paras": [
        "Red vermouth starts with wine, which is aromatised with herbs and spices, sweetened and fortified. That wine base is what gives vermouth its fruit and body.",
        "Giffard goes back to the grape: Ruby Grape is made with distilled red wine concentrate, then seasoned to give dark fruit, caramel-vanilla and prune on the nose and a slight bitterness that turns delicately herbaceous on the finish."
      ],
      "image": {
        "src": "/images/brands/giffard/products/na-ruby-grape/red-grapes.webp",
        "alt": "Bunches of dark red wine grapes on the vine",
        "caption": "Red wine grapes in a vineyard at Cruet, Savoie, France. Photo: Florian Pépellin, CC BY-SA 4.0"
      }
    },
    "tasting": {
      "appearance": "Mahogany.",
      "nose": "Greedy notes of dark fruits and caramel-vanilla, with the freshness of prunes.",
      "palate": "Slight bitterness on the palate.",
      "finish": "Delicately herbaceous."
    },
    "profile": [
      {
        "label": "Dark fruit",
        "value": 4,
        "note": "Dark fruits and prune"
      },
      {
        "label": "Sweetness",
        "value": 3,
        "note": "9 g sugars per 100 ml"
      },
      {
        "label": "Bitterness",
        "value": 2,
        "note": "A slight bitterness on the palate"
      },
      {
        "label": "Herbaceous",
        "value": 3,
        "note": "Delicately herbal finish"
      },
      {
        "label": "Caramel-vanilla",
        "value": 3,
        "note": "Rich, rounded notes on the nose"
      }
    ],
    "cocktails": [
      {
        "name": "Ruby Grape Highball (without alcohol)",
        "glass": "Highball",
        "ice": "Long clear ice",
        "garnish": "Lime wedge",
        "spec": [
          {
            "amount": "50",
            "unit": "ml",
            "what": "Giffard Ruby Grape"
          },
          {
            "amount": "",
            "unit": "top",
            "what": "Ginger ale"
          }
        ],
        "method": [
          "Fill a highball glass with long clear ice.",
          "Add the Ruby Grape.",
          "Top up with ginger ale.",
          "Stir gently with a bar spoon, garnish and serve."
        ],
        "note": "Two ingredients, built in the glass: quick enough for a busy service.",
        "source": "https://www.giffard.com/en/cocktail/8328-ruby-grape-highball-without-alcohol"
      },
      {
        "name": "Ruby Grape Sour (without alcohol)",
        "glass": "Rocks",
        "ice": "Clear block ice",
        "garnish": "",
        "spec": [
          {
            "amount": "45",
            "unit": "ml",
            "what": "Giffard Ruby Grape"
          },
          {
            "amount": "25",
            "unit": "ml",
            "what": "Fresh lemon juice"
          },
          {
            "amount": "20",
            "unit": "ml",
            "what": "Giffard Jasmine Syrup"
          },
          {
            "amount": "25",
            "unit": "ml",
            "what": "Giffard Egg White Syrup"
          }
        ],
        "method": [
          "Add all the ingredients to a shaker filled with ice.",
          "Shake hard.",
          "Remove the ice and shake again (dry shake).",
          "Strain into a rocks glass over block ice and serve."
        ],
        "note": "A vermouth-sour-style serve; Giffard tags this recipe vegan, as the foam comes from its egg white syrup.",
        "source": "https://www.giffard.com/en/cocktail/8327-ruby-grape-sour-without-alcohol"
      }
    ],
    "uses": [
      {
        "title": "Treat it like sweet vermouth",
        "body": "Giffard suggests it for an Americano, Vermouth Sour or Boulevardier. Use it wherever red vermouth plays a supporting role."
      },
      {
        "title": "Pair it with Aperitif Bitter",
        "body": "Giffard’s alcohol-free Americano uses 30 ml Ruby Grape and 25 ml Aperitif Bitter, topped with sparkling water."
      },
      {
        "title": "Long and simple",
        "body": "Over ice with ginger ale it makes an easy aperitif for guests who aren’t drinking."
      },
      {
        "title": "Keep it fresh",
        "body": "Store it cool and away from light, and use it within five months of opening. No refrigeration needed."
      }
    ],
    "faq": [
      {
        "q": "Is Ruby Grape alcohol-free if it is made from wine?",
        "a": "Yes. Giffard sells it as an entirely alcohol-free cocktail base, made with a distilled red wine concentrate."
      },
      {
        "q": "What does it replace?",
        "a": "Red (sweet) vermouth. Giffard describes it as “typical of a red vermouth”."
      },
      {
        "q": "What is in it?",
        "a": "Water, sugar, distilled red wine concentrate, natural flavourings, concentrated lemon juice and preservatives (potassium sorbate, sodium benzoate)."
      },
      {
        "q": "Which cocktails does Giffard suggest?",
        "a": "An Americano, Vermouth Sour, Boulevardier and other non-alcoholic cocktails, plus its own Ruby Grape Highball and Ruby Grape Sour."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/giffard/products/na-ruby-grape/savoie-vineyard.webp",
        "alt": "Red grape bunches hanging on vines between Montmélian and Arbin",
        "caption": "Red grapes on the vine between Montmélian and Arbin, Savoie. Photo: Florian Pépellin, CC BY-SA 4.0"
      },
      {
        "src": "/images/brands/giffard/products/na-ruby-grape/zero-proof-negroni.webp",
        "alt": "A zero-proof Negroni on the rocks with a dried orange wheel",
        "caption": "A zero-proof Negroni, the kind of serve Ruby Grape is built for. Photo: Paul Lowry, CC BY 2.0"
      }
    ],
    "credits": [
      {
        "file": "/images/brands/giffard/products/na-ruby-grape/red-grapes.webp",
        "author": "Florian Pépellin",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Grappes_de_raisin_noir_%C3%A0_Cruet_(octobre_2021).JPG"
      },
      {
        "file": "/images/brands/giffard/products/na-ruby-grape/savoie-vineyard.webp",
        "author": "Florian Pépellin",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Grappes_de_raisin_rouge_entre_Montm%C3%A9lian_et_Arbin_(octobre_2021)_1.JPG"
      },
      {
        "file": "/images/brands/giffard/products/na-ruby-grape/zero-proof-negroni.webp",
        "author": "Paul Lowry",
        "licence": "CC BY 2.0",
        "url": "https://commons.wikimedia.org/wiki/File:General_Negroni_at_Cocha_(Zero_Proof).jpg"
      }
    ],
    "sources": [
      "https://www.giffard.com/en/non-alcoholic-cocktail-base/8415-394-base-cocktail-sans-alcool-ruby-grape.html",
      "https://www.giffard.com/en/cocktail/8328-ruby-grape-highball-without-alcohol",
      "https://www.giffard.com/en/cocktail/8327-ruby-grape-sour-without-alcohol",
      "https://www.giffard.com/en/cocktail/8330-americano-without-alcohol"
    ]
  }
];
