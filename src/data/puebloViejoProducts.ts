// Product pages for the Pueblo Viejo bottles and serve on the homepage panel.
// Content researched from the producer, Difford's Guide and the sources listed
// per product; supporting photos are free-licence images from Wikimedia
// Commons, credited on each page.

import type { HouseProduct } from './houseProducts';

export const puebloViejoProducts: HouseProduct[] = [
  {
    "slug": "tommys-margarita",
    "label": "Tommy's Margarita",
    "fullName": "Tommy's Margarita with Pueblo Viejo Blanco",
    "category": "Cocktail",
    "image": "/images/brand-pueblo-viejo-cocktail.webp",
    "imageAlt": "Tommy's Margarita made with Pueblo Viejo Blanco tequila, fresh lime and agave",
    "accent": "#9fc23a",
    "tagline": "Tequila, lime and agave. Nothing else to hide behind.",
    "lede": "The Tommy's Margarita drops the orange liqueur and lets 100% agave tequila, fresh lime and agave syrup do the talking. Pueblo Viejo Blanco, with its cooked-agave sweetness and citrus lift, is exactly the kind of honest, well-priced tequila the drink was built around.",
    "facts": [
      {
        "value": "Old fashioned",
        "label": "Glass"
      },
      {
        "value": "Pueblo Viejo Blanco",
        "label": "Base"
      },
      {
        "value": "Shake, fine strain",
        "label": "Method"
      },
      {
        "value": "c. 1987–88, San Francisco",
        "label": "Created"
      }
    ],
    "about": [
      "A Tommy's is a Margarita with the triple sec taken out and agave syrup put in its place. Three ingredients, shaken hard and served over fresh ice in a rocks glass: 60 ml of 100% agave tequila, 30 ml of fresh lime and 15 ml of agave syrup. Because there is no orange liqueur to round things off, the tequila sits right at the front, and the agave syrup echoes the spirit rather than masking it.",
      "That makes the choice of tequila matter more than in almost any other Margarita. Pueblo Viejo Blanco is 100% blue Weber agave from Casa San Matías in the Highlands of Jalisco, with the green apple, citrus and cooked-agave caramel notes the brand describes on its own spec sheet. It has enough body to stand up to the lime, it costs sensibly for a pouring tequila, and the brand bills itself as a favourite of the mixology community in the US for exactly this kind of drink."
    ],
    "fruit": {
      "heading": "A family bar in San Francisco",
      "paras": [
        "Tommy's Mexican Restaurant in San Francisco was opened in 1965 by Tomas and Elmy Bermejo. Their son Julio Bermejo took over the bar and, around 1987–88 according to Difford's Guide, started making the house Margarita with agave syrup and hand-squeezed limes instead of triple sec. The idea was simple: use only 100% agave tequila and let the agave speak for itself.",
        "Julio went on to build one of the best-known 100% agave tequila lists anywhere, and Tommy's became a pilgrimage for bartenders. The drink spread through the trade in the 1990s and 2000s, became one of the most ordered modern classics, and served as the template for the Picante-style spicy Margaritas that followed."
      ],
      "image": {
        "src": "/images/brands/pueblo-viejo/products/tommys-margarita/margarita-rocks.webp",
        "alt": "A Margarita on the rocks with a salted rim and a lime wedge on a wooden bar",
        "caption": "Served on the rocks: the Tommy's lives in an old fashioned glass, not a coupe."
      }
    },
    "tasting": {
      "appearance": "Pale, cloudy straw-green with a fine froth from a hard shake, served over fresh cubes.",
      "nose": "Fresh lime zest and juice over cooked agave, with a green, peppery edge from the Blanco.",
      "palate": "Bright and tart up front, then rounded off by the agave syrup; the tequila's herbal, citrus and caramel notes come through cleanly without orange liqueur in the way.",
      "finish": "Clean, zesty and dry-leaning, with a gentle peppery warmth from the agave."
    },
    "profile": [
      {
        "label": "Sour",
        "value": 4,
        "note": "30 ml fresh lime sets the backbone."
      },
      {
        "label": "Sweet",
        "value": 2,
        "note": "Just 15 ml agave syrup; adjust to your limes."
      },
      {
        "label": "Agave",
        "value": 4,
        "note": "No triple sec, so the tequila leads."
      },
      {
        "label": "Strength",
        "value": 3,
        "note": "60 ml of tequila, diluted by shaking."
      },
      {
        "label": "Complexity",
        "value": 2,
        "note": "Three ingredients; the quality comes from freshness."
      }
    ],
    "cocktails": [
      {
        "name": "Tommy's Margarita",
        "glass": "Old fashioned",
        "ice": "Fresh cubed ice",
        "garnish": "Lime wedge",
        "spec": [
          {
            "amount": "60",
            "unit": "ml",
            "what": "Pueblo Viejo Blanco"
          },
          {
            "amount": "30",
            "unit": "ml",
            "what": "Fresh lime juice"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "Agave syrup"
          }
        ],
        "method": [
          "Chill an old fashioned glass.",
          "Add everything to a shaker and shake hard with ice.",
          "Fine strain over fresh ice.",
          "Garnish with a lime wedge."
        ],
        "note": "Difford's lists a 100% agave reposado as the base, and Pueblo Viejo's own site makes it with its Reposado; Blanco gives a fresher, greener drink. Salt rim optional.",
        "source": "https://www.diffordsguide.com/cocktails/recipe/1975/tommys-margarita"
      },
      {
        "name": "Picante de la Casa (Spicy Margarita)",
        "glass": "Old fashioned",
        "ice": "Fresh cubed ice",
        "garnish": "Chilli slices",
        "spec": [
          {
            "amount": "1",
            "unit": "slice",
            "what": "Red chilli (jalapeño or fresno), deseeded"
          },
          {
            "amount": "3",
            "unit": "sprigs",
            "what": "Coriander leaves"
          },
          {
            "amount": "60",
            "unit": "ml",
            "what": "Pueblo Viejo Blanco"
          },
          {
            "amount": "30",
            "unit": "ml",
            "what": "Fresh lime juice"
          },
          {
            "amount": "20",
            "unit": "ml",
            "what": "Agave syrup"
          }
        ],
        "method": [
          "Muddle the chilli and coriander in the base of the shaker.",
          "Add the tequila, lime and agave syrup and shake hard with ice.",
          "Fine strain over fresh ice.",
          "Garnish with chilli slices."
        ],
        "note": "Created by Chris Ojeda at Soho House, West Hollywood. Difford's calls it a Tommy's with coriander and chilli, and the drink that led the spicy Margarita trend.",
        "source": "https://www.diffordsguide.com/cocktails/recipe/4723/picante-de-la-casa-spicy-margarita"
      }
    ],
    "uses": [
      {
        "title": "Squeeze limes to order",
        "body": "With no triple sec to cover for it, stale juice shows. Squeeze on the day, ideally within a few hours of service, and taste a wedge before you set your syrup level."
      },
      {
        "title": "Balance to the fruit",
        "body": "Limes vary in acidity through the year. Hold 60/30/15 as your house spec and nudge the agave syrup by 5 ml rather than changing the lime."
      },
      {
        "title": "Shake hard, serve on fresh ice",
        "body": "A short, hard shake gives the froth and dilution the drink needs. Strain over fresh cubes, never the shaker ice, so it doesn't water down at the table."
      },
      {
        "title": "Batching for volume",
        "body": "For events, pre-batch tequila and agave syrup and add lime on the day. Built with Pueblo Viejo Blanco, a Tommy's keeps the pour cost sensible on a busy Margarita list."
      }
    ],
    "faq": [
      {
        "q": "What's the difference between a Tommy's and a classic Margarita?",
        "a": "A classic Margarita uses tequila, orange liqueur (triple sec) and lime. A Tommy's replaces the orange liqueur with agave syrup, which keeps the focus on the tequila."
      },
      {
        "q": "Who invented the Tommy's Margarita?",
        "a": "Julio Bermejo, at his family's restaurant, Tommy's Mexican Restaurant in San Francisco. Difford's Guide dates it to around 1987–88; it became widely known through the 1990s."
      },
      {
        "q": "Blanco or reposado?",
        "a": "Both work. Blanco gives a fresher, greener drink; reposado adds a touch of vanilla and oak. Difford's specs a 100% agave reposado, and Pueblo Viejo's own recipe uses its Reposado."
      },
      {
        "q": "Should it have a salt rim?",
        "a": "It's usually served without one, but a half salt rim is a fair option if the guest wants it."
      },
      {
        "q": "Can I use sugar syrup instead of agave syrup?",
        "a": "You can, but agave syrup is the point of the drink. It echoes the flavour of the tequila and gives a slightly richer texture."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/pueblo-viejo/products/tommys-margarita/margarita-rocks.webp",
        "alt": "A Margarita on the rocks with a salted rim and lime wedge",
        "caption": "A Margarita on the rocks."
      },
      {
        "src": "/images/brands/pueblo-viejo/products/tommys-margarita/agave-rows-aerial.webp",
        "alt": "Aerial view of rows of blue agave in red soil, Jalisco",
        "caption": "Rows of blue agave in the red earth of Jalisco."
      },
      {
        "src": "/images/brands/pueblo-viejo/products/tommys-margarita/agave-dusk-tequila.webp",
        "alt": "Blue agave fields at dusk below the Tequila volcano",
        "caption": "Agave fields at the foot of the Tequila volcano, Jalisco."
      }
    ],
    "credits": [
      {
        "file": "/images/brands/pueblo-viejo/products/tommys-margarita/margarita-rocks.webp",
        "author": "Neil Conway from Oakland, USA",
        "licence": "CC BY 2.0",
        "url": "https://commons.wikimedia.org/wiki/File:Margarita_(5899250186).jpg"
      },
      {
        "file": "/images/brands/pueblo-viejo/products/tommys-margarita/agave-rows-aerial.webp",
        "author": "Tomascastelazo",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Agave_field_in_Jalisco,_Mexico.jpg"
      },
      {
        "file": "/images/brands/pueblo-viejo/products/tommys-margarita/agave-dusk-tequila.webp",
        "author": "Juan Carlos Fonseca Mata",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Paisaje_agavero_(Tequila,_Jalisco)_I.jpg"
      }
    ],
    "sources": [
      "https://www.diffordsguide.com/cocktails/recipe/1975/tommys-margarita",
      "https://www.diffordsguide.com/cocktails/recipe/4723/picante-de-la-casa-spicy-margarita",
      "https://tequilapuebloviejo.com/us/our_products.html",
      "https://tequilapuebloviejo.com/us/cocktails.html",
      "https://tequilapuebloviejo.com/us/home.html",
      "https://www.danmurphys.com.au/product/DM_ER_2000003154_PV-BLA-070/pueblo-viejo-blanco-tequila-700ml"
    ]
  },
  {
    "slug": "reposado",
    "label": "Reposado",
    "fullName": "Pueblo Viejo Reposado Tequila",
    "category": "Tequila",
    "image": "/images/brand-pueblo-viejo-reposado-bottle.webp",
    "imageAlt": "Pueblo Viejo Reposado tequila bottle with agave, a woven blanket and a serve on the rocks in the sun",
    "accent": "#e0a23c",
    "tagline": "Nine months in American oak, made for mixing.",
    "lede": "Pueblo Viejo Reposado is 100% blue Weber agave from Casa San Matías, rested for nine months in white American oak. It keeps the cooked-agave and citrus character of the Blanco and adds butter, caramel and a little cinnamon spice.",
    "facts": [
      {
        "value": "40%",
        "label": "ABV (Australia)"
      },
      {
        "value": "750 ml",
        "label": "Bottle"
      },
      {
        "value": "9 months, American oak",
        "label": "Ageing"
      },
      {
        "value": "Jalisco, Mexico",
        "label": "Origin"
      }
    ],
    "about": [
      "Pueblo Viejo is made by Casa San Matías, a tequila house that dates its history to 1886 and grows its own agave in the red, iron-rich soils of the Highlands of Jalisco. The brand describes itself as one of the leading tequilas in Mexico, and in the US it has built a strong name with bartenders as a well-made, fairly priced 100% agave pour.",
      "The Reposado is the same 100% agave spirit as the Blanco, rested for nine months in white American oak according to the brand. That's well past the two-month legal minimum for a reposado, and you can taste it: straw-gold in colour, with caramel, butter and ripe fruit on the nose, and pepper and cinnamon on the palate. It's a natural for agave-forward stirred drinks, highballs and a richer Margarita."
    ],
    "fruit": {
      "heading": "From the Highlands to the barrel",
      "paras": [
        "Every bottle starts with blue Weber agave (Agave tequilana), which Casa San Matías leaves to mature for seven to ten years in the Highlands of Jalisco. When the plant is ready, a jimador cuts away the long leaves with a coa, a flat, sharp-edged blade on a long handle, to leave the piña, the heart of the plant.",
        "The piñas are baked for 48 hours at about 90°C, then milled, and the juice is mixed with spring water from the distillery and fermented for 72 hours using selected and native yeasts. After two slow distillations the spirit goes into white American oak. For the Reposado ('rested'), that's nine months, enough to soften the edges and add vanilla and spice without hiding the agave."
      ],
      "image": {
        "src": "/images/brands/pueblo-viejo/products/reposado/jimador-harvest.webp",
        "alt": "A jimador in a straw hat harvesting blue agave with a coa",
        "caption": "A jimador at work in the agave fields near Tequila, Jalisco."
      }
    },
    "tasting": {
      "appearance": "Straw with golden hues; clean and bright, medium to full body.",
      "nose": "Floral citrus blossom, caramel and butter, with ripe fruit underneath.",
      "palate": "Butter and ripe fruit carry through from the nose, with pepper and cinnamon giving gentle spice; cooked agave stays front and centre.",
      "finish": "Medium length and warm, with a little oak sweetness and lingering spice."
    },
    "profile": [
      {
        "label": "Agave",
        "value": 4,
        "note": "Cooked agave still leads."
      },
      {
        "label": "Oak",
        "value": 2,
        "note": "Nine months adds polish, not weight."
      },
      {
        "label": "Sweetness",
        "value": 3,
        "note": "Caramel and butter."
      },
      {
        "label": "Spice",
        "value": 3,
        "note": "Pepper and cinnamon."
      },
      {
        "label": "Mixability",
        "value": 5,
        "note": "Works in sours, highballs and stirred drinks."
      }
    ],
    "cocktails": [
      {
        "name": "El Diablo",
        "glass": "Highball",
        "ice": "Cubed ice",
        "garnish": "Lime wedge",
        "spec": [
          {
            "amount": "45",
            "unit": "ml",
            "what": "Pueblo Viejo Reposado"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "Crème de cassis"
          },
          {
            "amount": "22.5",
            "unit": "ml",
            "what": "Fresh lime juice"
          },
          {
            "amount": "60",
            "unit": "ml",
            "what": "Ginger beer"
          }
        ],
        "method": [
          "Shake the tequila, cassis and lime with ice.",
          "Strain into an ice-filled highball.",
          "Top with ginger beer and stir briefly."
        ],
        "note": "First printed as the 'Mexican El Diablo' in Trader Vic's Book of Food and Drink (1946). The Reposado's spice is a good match for ginger and blackcurrant.",
        "source": "https://www.diffordsguide.com/cocktails/recipe/700/el-diablo"
      },
      {
        "name": "Oaxaca Old Fashioned",
        "glass": "Old fashioned",
        "ice": "Large cube or fresh cubes",
        "garnish": "Flamed orange zest",
        "spec": [
          {
            "amount": "45",
            "unit": "ml",
            "what": "Pueblo Viejo Reposado"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "Mezcal"
          },
          {
            "amount": "7.5",
            "unit": "ml",
            "what": "Agave syrup"
          },
          {
            "amount": "1",
            "unit": "dash",
            "what": "Angostura aromatic bitters"
          }
        ],
        "method": [
          "Stir all ingredients with ice.",
          "Strain over fresh ice.",
          "Flame an orange zest over the drink and drop it in."
        ],
        "note": "Phil Ward's original spec from Death & Co, New York, 2007. Many bars now use chocolate bitters in place of Angostura.",
        "source": "https://www.diffordsguide.com/cocktails/recipe/3003/oaxaca-old-fashioned"
      }
    ],
    "uses": [
      {
        "title": "A richer house Margarita",
        "body": "Pueblo Viejo's own Tommy's Margarita recipe uses the Reposado. The oak and vanilla round out the lime nicely, especially in the cooler months."
      },
      {
        "title": "Stirred agave drinks",
        "body": "Nine months in oak gives enough structure for Old Fashioned and Manhattan-style builds, without the price of an añejo."
      },
      {
        "title": "Highballs",
        "body": "Try it long with ginger beer or grapefruit soda. The caramel and cinnamon notes sit well against spice and bitterness."
      },
      {
        "title": "An easy introduction to sipping",
        "body": "Neat, at room temperature or with a single cube, it's an approachable first sipping tequila for guests who usually drink whisky."
      }
    ],
    "faq": [
      {
        "q": "How long is Pueblo Viejo Reposado aged?",
        "a": "Nine months in white American oak barrels, according to the brand's own product information."
      },
      {
        "q": "What's the ABV?",
        "a": "The brand produces it at 38% or 40% depending on the market. Australian listings show 38% in a 700 ml bottle."
      },
      {
        "q": "Is it 100% agave?",
        "a": "Yes. It's 100% blue Weber agave, grown by Casa San Matías in the Highlands of Jalisco."
      },
      {
        "q": "Who makes Pueblo Viejo?",
        "a": "Casa San Matías (Tequila San Matías de Jalisco), a family tequila house dating to 1886."
      },
      {
        "q": "What does 'reposado' mean?",
        "a": "'Rested'. Under Mexican rules a reposado must spend at least two months in oak. Pueblo Viejo's spends nine."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/pueblo-viejo/products/reposado/jimador-harvest.webp",
        "alt": "A jimador harvesting blue agave with a coa",
        "caption": "A jimador cutting back the leaves to reach the piña."
      },
      {
        "src": "/images/brands/pueblo-viejo/products/reposado/agave-oven.webp",
        "alt": "Halved agave piñas loaded inside a brick distillery oven",
        "caption": "Agave piñas loaded into a traditional oven for slow baking."
      },
      {
        "src": "/images/brands/pueblo-viejo/products/reposado/barrels-stacked.webp",
        "alt": "Stacked oak barrels of resting tequila",
        "caption": "Tequila resting in oak barrels in Jalisco."
      }
    ],
    "credits": [
      {
        "file": "/images/brands/pueblo-viejo/products/reposado/jimador-harvest.webp",
        "author": "Ernesto Catedral",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Tequila,_Jalisco,_M%C3%A9xico,_La_Jima_del_Agave.jpg"
      },
      {
        "file": "/images/brands/pueblo-viejo/products/reposado/agave-oven.webp",
        "author": "Tobias Hesse",
        "licence": "CC BY 2.5",
        "url": "https://commons.wikimedia.org/wiki/File:Distillery_oven_loaded_with_agaves,_Mexico.jpg"
      },
      {
        "file": "/images/brands/pueblo-viejo/products/reposado/barrels-stacked.webp",
        "author": "terri_bateman",
        "licence": "CC0",
        "url": "https://commons.wikimedia.org/wiki/File:Tequila_Cuervo_barrels_(21012710622).jpg"
      }
    ],
    "sources": [
      "https://tequilapuebloviejo.com/us/our_products.html",
      "https://tequilapuebloviejo.com/us/home.html",
      "https://tequilapuebloviejo.com/us/process.html",
      "https://tequilapuebloviejo.com/us/cocktails.html",
      "https://lucacollections.com.au/products/pueblo-viejo-reposado-tequila",
      "https://www.diffordsguide.com/cocktails/recipe/700/el-diablo",
      "https://www.diffordsguide.com/cocktails/recipe/3003/oaxaca-old-fashioned"
    ]
  },
  {
    "slug": "anejo",
    "label": "Añejo",
    "fullName": "Pueblo Viejo Añejo Tequila",
    "category": "Tequila",
    "image": "/images/brand-pueblo-viejo-anejo-bottle.webp",
    "imageAlt": "Pueblo Viejo Anejo tequila bottle with blue agave and a serve on the rocks on sunlit stone steps",
    "accent": "#c8522d",
    "tagline": "Eighteen months in oak, built for slow sipping.",
    "lede": "Pueblo Viejo Añejo spends 18 months in white American oak, half a year longer than the legal minimum for an añejo. It's soft, nutty and chocolatey, with vanilla and dried fruit, and still recognisably agave.",
    "facts": [
      {
        "value": "40%",
        "label": "ABV (Australia)"
      },
      {
        "value": "750 ml",
        "label": "Bottle"
      },
      {
        "value": "18 months, American oak",
        "label": "Ageing"
      },
      {
        "value": "Jalisco, Mexico",
        "label": "Origin"
      }
    ],
    "about": [
      "The Añejo is the oldest expression in the core Pueblo Viejo range. It's made from the same Highland blue Weber agave as the Blanco and Reposado, slow-baked, fermented and double distilled at Casa San Matías, then aged for 18 months in white American oak according to the brand.",
      "That extra time shows. The colour moves to a soft amber-orange, and the nose brings vanilla, toasted almonds, chamomile, ripe orange and peach. On the palate it's oak sweetness, dark chocolate and roasted nuts, finishing long on dried fruit. It's a good-value bottle for a back bar that wants a sipping tequila and a base for spirit-forward cocktails."
    ],
    "fruit": {
      "heading": "Why añejo takes time",
      "paras": [
        "Añejo means 'aged', and under Mexican rules it must spend at least a year in oak barrels of no more than 600 litres. Pueblo Viejo leaves its Añejo for 18 months. The spirit starts out as Highland blue Weber agave, grown for seven to ten years in Casa San Matías's own red-soil fields, baked for 48 hours, fermented for 72 hours and distilled twice.",
        "In the barrel, the tequila draws vanilla, caramel and toasted notes from the American oak, and over time the sharper green edges of a young tequila soften into something rounder. The skill is in stopping before the oak takes over. At 18 months, Pueblo Viejo Añejo keeps the cooked-agave sweetness underneath the chocolate and almond."
      ],
      "image": {
        "src": "/images/brands/pueblo-viejo/products/anejo/barrel-cellar.webp",
        "alt": "Stacked oak barrels ageing tequila in a cellar in Tequila, Jalisco",
        "caption": "An ageing cellar in Tequila, Jalisco."
      }
    },
    "tasting": {
      "appearance": "Soft orange-amber, like a mild sunset; bright and clear, medium to full body.",
      "nose": "Sweet seeds, vanilla and toasted almonds, with chamomile, ripe orange and peach.",
      "palate": "Sweet oak, vanilla, dark chocolate and roasted almonds over a base of cooked agave.",
      "finish": "Long, with dried fruit and a gentle oaky sweetness."
    },
    "profile": [
      {
        "label": "Agave",
        "value": 3,
        "note": "Still there beneath the oak."
      },
      {
        "label": "Oak",
        "value": 4,
        "note": "18 months in American oak."
      },
      {
        "label": "Sweetness",
        "value": 4,
        "note": "Vanilla, chocolate and almond."
      },
      {
        "label": "Spice",
        "value": 2,
        "note": "Gentle and warming."
      },
      {
        "label": "Sipping",
        "value": 5,
        "note": "Made to be taken slowly."
      }
    ],
    "cocktails": [
      {
        "name": "Añejo Old Fashioned",
        "glass": "Old fashioned",
        "ice": "Large cube or fresh cubes",
        "garnish": "Orange zest twist",
        "spec": [
          {
            "amount": "60",
            "unit": "ml",
            "what": "Pueblo Viejo Añejo"
          },
          {
            "amount": "7.5",
            "unit": "ml",
            "what": "Agave syrup"
          },
          {
            "amount": "8",
            "unit": "drops",
            "what": "Margarita bitters (or Angostura aromatic bitters)"
          }
        ],
        "method": [
          "Stir all ingredients with ice.",
          "Strain over fresh ice.",
          "Express an orange zest over the drink and use it as a garnish."
        ],
        "note": "Difford's spec. A little agave syrup and dilution soften the spirit and open up the agave and oak.",
        "source": "https://www.diffordsguide.com/cocktails/recipe/3381/tequila-old-fashioned"
      },
      {
        "name": "Barrio Viejo",
        "glass": "Old fashioned",
        "ice": "Fresh cubed ice",
        "garnish": "Orange twist",
        "spec": [
          {
            "amount": "60",
            "unit": "ml",
            "what": "Pueblo Viejo Añejo"
          },
          {
            "amount": "1",
            "unit": "bar spoon",
            "what": "Agave syrup"
          },
          {
            "amount": "2",
            "unit": "dashes",
            "what": "Peychaud's bitters"
          },
          {
            "amount": "1",
            "unit": "rinse",
            "what": "Absinthe and mezcal"
          }
        ],
        "method": [
          "Rinse a chilled glass with absinthe and mezcal and discard the excess.",
          "Stir the tequila, agave syrup and bitters with ice.",
          "Strain into the rinsed glass.",
          "Garnish with an orange twist."
        ],
        "note": "Pueblo Viejo's own house serve, a Sazerac-style drink built on tequila. The brand gives 2 oz, converted here to 60 ml, and specifies a rocks glass.",
        "source": "https://tequilapuebloviejo.com/us/cocktails.html"
      }
    ],
    "uses": [
      {
        "title": "Neat, with a twist of orange",
        "body": "Serve at room temperature in a small tulip or rocks glass. A slice of orange alongside picks up the citrus on the nose."
      },
      {
        "title": "A whisky drinker's tequila",
        "body": "The vanilla, almond and chocolate notes make it an easy recommendation for guests who usually order bourbon."
      },
      {
        "title": "Spirit-forward stirred drinks",
        "body": "Use it in place of whiskey in Old Fashioned, Sazerac and Manhattan-style builds. Keep sweeteners light so the oak and agave can show."
      },
      {
        "title": "Dessert pairings",
        "body": "Dark chocolate, flan, churros and nut-based desserts sit well with the roasted almond and cocoa notes."
      }
    ],
    "faq": [
      {
        "q": "How long is Pueblo Viejo Añejo aged?",
        "a": "18 months in white American oak, according to the brand. The legal minimum for an añejo is one year."
      },
      {
        "q": "What's the ABV?",
        "a": "The brand produces it at 38% or 40% depending on the market. Dan Murphy's lists it at 38% in a 700 ml bottle."
      },
      {
        "q": "Is it 100% agave?",
        "a": "Yes, 100% blue Weber agave from the Highlands of Jalisco."
      },
      {
        "q": "Should I sip it or mix it?",
        "a": "Both. It's soft enough to sip neat, and it makes an excellent tequila Old Fashioned."
      },
      {
        "q": "How is añejo different from extra añejo?",
        "a": "Añejo must be aged for at least one year; extra añejo for at least three. Pueblo Viejo Añejo sits at 18 months."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/pueblo-viejo/products/anejo/barrel-cellar.webp",
        "alt": "Stacked tequila barrels in an ageing cellar",
        "caption": "Barrels resting in an ageing cellar in Tequila, Jalisco."
      },
      {
        "src": "/images/brands/pueblo-viejo/products/anejo/tequila-old-fashioned.webp",
        "alt": "A tequila Old Fashioned with a large ice cube and cherry on a bar",
        "caption": "A tequila Old Fashioned on the bar."
      },
      {
        "src": "/images/brands/pueblo-viejo/products/anejo/agave-fields.webp",
        "alt": "Blue agave rows and corn fields beneath a flat-topped hill",
        "caption": "Agave and corn fields beneath Cerro de la Mesa, Mexico."
      }
    ],
    "credits": [
      {
        "file": "/images/brands/pueblo-viejo/products/anejo/barrel-cellar.webp",
        "author": "Javier Salazar Villagomez",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Cava_de_barricas_tequileras_para_a%C3%B1ejamiento,_Tequila,_Jalisco.jpg"
      },
      {
        "file": "/images/brands/pueblo-viejo/products/anejo/tequila-old-fashioned.webp",
        "author": "Cocktailmarler",
        "licence": "CC BY-SA 3.0 (cropped)",
        "url": "https://commons.wikimedia.org/wiki/File:Rum,_Manhattan,_Tequila_Old_Fashioned.jpg"
      },
      {
        "file": "/images/brands/pueblo-viejo/products/anejo/agave-fields.webp",
        "author": "Tomascastelazo",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Cerro_de_la_mesa_with_corn_and_agave_fields.jpg"
      }
    ],
    "sources": [
      "https://tequilapuebloviejo.com/us/our_products.html",
      "https://tequilapuebloviejo.com/us/home.html",
      "https://tequilapuebloviejo.com/us/process.html",
      "https://tequilapuebloviejo.com/us/cocktails.html",
      "https://www.danmurphys.com.au/product/DM_ER_2000003154_PV-ANE-070/pueblo-viejo-anejo-tequila-700ml",
      "https://www.diffordsguide.com/cocktails/recipe/3381/tequila-old-fashioned"
    ]
  }
];
