// Product pages for the Whiskey Row serves on the homepage panel. Specs and
// history from Difford's Guide, the IBA and the sources listed per product;
// supporting photos are free-licence images from Wikimedia Commons, credited
// on each page.

import type { HouseProduct } from './houseProducts';

export const whiskeyRowProducts: HouseProduct[] = [
  {
    "slug": "old-fashioned",
    "label": "Old Fashioned",
    "fullName": "The Whiskey Row Old Fashioned",
    "category": "Cocktail",
    "image": "/images/brand-whiskey-row-cocktail.webp",
    "imageAlt": "Old Fashioned made with Whiskey Row straight bourbon",
    "accent": "#d9822b",
    "tagline": "Bourbon, sugar, bitters and ice. Nothing to hide behind.",
    "lede": "The Old Fashioned is the original idea of a cocktail: spirit, sugar, water and bitters, stirred down and served over ice. Built on Whiskey Row's high-rye bourbon at 45%, it keeps its caramel and vanilla depth while the rye spice stops it turning sweet.",
    "facts": [
      {
        "value": "Rocks",
        "label": "Glass"
      },
      {
        "value": "Bourbon",
        "label": "Base"
      },
      {
        "value": "Stirred",
        "label": "Method"
      },
      {
        "value": "1880s",
        "label": "Named"
      }
    ],
    "about": [
      "An Old Fashioned is a single-spirit drink seasoned with a little sugar, a few dashes of aromatic bitters and an orange zest, then diluted on ice until it is rounded but still firm. There is no juice, no liqueur and no soda, so the whiskey carries the whole drink and every flaw or virtue in it shows.",
      "That is why the base matters. Whiskey Row is a small-batch, high-rye bourbon bottled at 45% ABV, which gives it the weight to survive dilution and enough rye spice to cut through the sugar. Its caramel, vanilla and orchard-fruit notes sit comfortably with Angostura and orange oil, and the toasted oak and dark-chocolate finish gives the last sip some grip rather than fading out."
    ],
    "fruit": {
      "heading": "From 'cocktail' to 'old-fashioned'",
      "paras": [
        "In 1806 a newspaper in Hudson, New York, The Balance and Columbian Repository, answered a reader's question by defining a cocktail as a stimulating liquor made of spirits, sugar, water and bitters. That is, ingredient for ingredient, an Old Fashioned. As the century went on, bartenders added curaçao, absinthe and other flourishes, and by around 1880 drinkers were asking for their whiskey cocktails made the 'old-fashioned' way. The Chicago Daily Tribune was using the phrase in February 1880.",
        "Louisville tells a better-known story. In the 1930s Albert Stevens Crockett, chronicler of New York's Waldorf-Astoria, wrote that the drink was created at the Pendennis Club in Louisville and carried east by bourbon man James E. Pepper. It is a good legend, but the club was founded in 1881, after the term was already in print, so historians treat it as folklore. Louisville has embraced the drink regardless and named the Old Fashioned its official cocktail in 2015."
      ],
      "image": {
        "src": "/images/brands/whiskey-row/products/old-fashioned/pendennis-club.webp",
        "alt": "Red-brick Georgian Revival facade of the Pendennis Club in downtown Louisville",
        "caption": "The Pendennis Club, Louisville, in its 1928 clubhouse. Legend credits the club with the Old Fashioned. Photo: Nyttend, public domain."
      }
    },
    "tasting": {
      "appearance": "Deep amber with copper lights, glossy over a single large cube.",
      "nose": "Expressed orange oil first, then caramel, vanilla and a warm lift of cinnamon and clove from the bitters.",
      "palate": "Rounded and full. Brown sugar and baked apple up front, rye spice and toasted oak through the middle, with the bitters keeping the sweetness in check.",
      "finish": "Long and drying, with dark chocolate, baking spice and a final trace of orange peel."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 2,
        "note": "Just enough sugar to round the edges of the bourbon."
      },
      {
        "label": "Strength",
        "value": 5,
        "note": "Spirit-forward: almost all bourbon, softened only by dilution."
      },
      {
        "label": "Spice",
        "value": 4,
        "note": "Rye grain and Angostura bring cinnamon, clove and pepper."
      },
      {
        "label": "Bitterness",
        "value": 2,
        "note": "A gentle aromatic bitterness from the bitters and orange zest."
      },
      {
        "label": "Oak",
        "value": 4,
        "note": "Toasted oak and vanilla sit right at the centre of the drink."
      }
    ],
    "cocktails": [
      {
        "name": "Old Fashioned",
        "glass": "Old-fashioned (rocks) glass, chilled",
        "ice": "One large clear cube",
        "garnish": "Orange zest twist, expressed",
        "spec": [
          {
            "amount": "60",
            "unit": "ml",
            "what": "Whiskey Row Bourbon"
          },
          {
            "amount": "12.5",
            "unit": "ml",
            "what": "Rich sugar syrup (2:1)"
          },
          {
            "amount": "3",
            "unit": "dashes",
            "what": "Angostura aromatic bitters"
          }
        ],
        "method": [
          "Chill the rocks glass and cut a wide orange zest.",
          "Stir the bourbon, syrup and bitters over plenty of ice in a mixing glass for 30 to 40 seconds.",
          "Strain over a large fresh cube in the chilled glass.",
          "Express the orange zest over the surface and drop it in."
        ],
        "note": "Difford's builds it stirred and strained for consistency. The IBA spec uses 45 ml whiskey with a sugar cube muddled with bitters and a splash of water, built in the glass: slower, but good theatre at the bar.",
        "source": "Difford's Guide, Old Fashioned; IBA, Old Fashioned"
      },
      {
        "name": "Maple Old Fashioned",
        "glass": "Old-fashioned (rocks) glass, chilled",
        "ice": "One large clear cube",
        "garnish": "Orange zest twist, expressed",
        "spec": [
          {
            "amount": "50",
            "unit": "ml",
            "what": "Whiskey Row Bourbon"
          },
          {
            "amount": "15",
            "unit": "ml",
            "what": "Straight rye whiskey (50% ABV)"
          },
          {
            "amount": "10",
            "unit": "ml",
            "what": "Maple syrup"
          },
          {
            "amount": "1",
            "unit": "dash",
            "what": "Orange bitters"
          },
          {
            "amount": "3",
            "unit": "drops",
            "what": "Saline solution (or a pinch of salt)"
          }
        ],
        "method": [
          "Stir all ingredients with ice until well chilled.",
          "Strain over a large cube in a chilled rocks glass.",
          "Express the orange zest over the drink and use as garnish."
        ],
        "note": "Maple replaces sugar syrup and brings a woody, toffee-like sweetness that suits Whiskey Row's caramel and dried-apple notes. Difford's first came across the drink in 2004 at Indigo Yard in Edinburgh. Use pure maple syrup, not pancake syrup.",
        "source": "Difford's Guide, Maple Old Fashioned"
      }
    ],
    "uses": [
      {
        "title": "Big, cold, clear ice",
        "body": "Serve over one large cube or a chunk of block ice. It melts slowly, so the drink stays at the right strength for longer instead of watering down in the glass."
      },
      {
        "title": "Stir for dilution",
        "body": "Aim for roughly 20 to 25% added water. Thirty to forty seconds of stirring over good ice gets you there; taste and stop when the heat has softened but the bourbon still leads."
      },
      {
        "title": "Zest, not fruit salad",
        "body": "A wide orange zest expressed skin-side down over the glass gives oil and aroma. Muddled orange slices and cherries belong to a sweeter tradition; offer them on request rather than by default."
      },
      {
        "title": "Batch it for service",
        "body": "Pre-mix bourbon, syrup and bitters by the bottle, add about 20% chilled water and keep it in the fridge. Pour 85 to 90 ml over a large cube, zest and serve: consistent drinks in seconds on a busy night."
      }
    ],
    "faq": [
      {
        "q": "Should an Old Fashioned be made with bourbon or rye?",
        "a": "Either is correct. Bourbon gives a rounder, sweeter drink; rye a drier, spicier one. A high-rye bourbon like Whiskey Row sits usefully between the two."
      },
      {
        "q": "Sugar cube or syrup?",
        "a": "Both work. A muddled cube is traditional and looks good at the bar, but rich 2:1 syrup dissolves instantly and gives a more consistent result, which is why most busy bars use it."
      },
      {
        "q": "Is the Old Fashioned really from Louisville?",
        "a": "Louisville's Pendennis Club claims it, but 'old fashioned' whiskey cocktails were in print by 1880, before the club was founded in 1881. Louisville did make it the city's official cocktail in 2015."
      },
      {
        "q": "How strong is it?",
        "a": "Very spirit-forward. Difford's puts its stirred spec at around 29% ABV and 1.5 standard drinks, so it suits slow sipping."
      },
      {
        "q": "Can I batch Old Fashioneds ahead of time?",
        "a": "Yes. Because there is no citrus juice, a pre-diluted batch keeps well chilled in a sealed bottle. Add the orange zest fresh to each serve."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/whiskey-row/products/old-fashioned/old-fashioned-glass.webp",
        "alt": "Old Fashioned on a clear ice sphere with an orange twist, against a dark background",
        "caption": "A whiskey Old Fashioned on a single ice ball with an orange twist. Photo: Erich Wagner (eventografie.de), CC BY-SA 4.0."
      },
      {
        "src": "/images/brands/whiskey-row/products/old-fashioned/whiskey-row-main-street.webp",
        "alt": "Nineteenth-century brick and cast-iron commercial buildings on West Main Street, Louisville",
        "caption": "Part of Louisville's historic Whiskey Row, 123 to 129 West Main Street, including the Hamilton Brothers Warehouse. Photo: Publichall, CC BY-SA 3.0."
      }
    ],
    "credits": [
      {
        "file": "Whiskey Old Fashioned.jpg",
        "author": "Erich Wagner (www.eventografie.de)",
        "licence": "CC BY-SA 4.0",
        "url": "https://commons.wikimedia.org/wiki/File:Whiskey_Old_Fashioned.jpg"
      },
      {
        "file": "Pendennis Club.jpg",
        "author": "Nyttend",
        "licence": "Public domain",
        "url": "https://commons.wikimedia.org/wiki/File:Pendennis_Club.jpg"
      },
      {
        "file": "Louisville - Hamilton Brothers Warehouse.jpg",
        "author": "Publichall",
        "licence": "CC BY-SA 3.0",
        "url": "https://commons.wikimedia.org/wiki/File:Louisville_-_Hamilton_Brothers_Warehouse.jpg"
      }
    ],
    "sources": [
      "https://www.diffordsguide.com/cocktails/recipe/4782/old-fashioned",
      "https://www.diffordsguide.com/cocktails/recipe/1249/maple-old-fashioned",
      "https://iba-world.com/iba-cocktail/old-fashioned/",
      "https://en.wikipedia.org/wiki/Old_fashioned_(cocktail)",
      "https://en.wikipedia.org/wiki/Whiskey_Row,_Louisville",
      "https://www.distillerytrail.com/blog/kentucky-artisan-distillery-releases-its-1st-whiskey-row-bottled-in-bond-kentucky-straight-bourbon/",
      "https://bottleofitaly.com/en/products/straight-bourbon-whiskey-70cl-whiskey-row"
    ]
  },
  {
    "slug": "manhattan",
    "label": "Manhattan",
    "fullName": "The Whiskey Row Manhattan",
    "category": "Cocktail",
    "image": "/images/brand-whiskey-row-manhattan.webp",
    "imageAlt": "Manhattan made with Whiskey Row straight bourbon, served up with a cherry",
    "accent": "#b8323a",
    "tagline": "Whiskey, sweet vermouth and bitters, stirred and served up.",
    "lede": "The Manhattan marries American whiskey with sweet vermouth and a dash of bitters, stirred cold and served straight up. Whiskey Row's high-rye bourbon gives it a rounder, richer body than rye alone, with enough spice to keep the vermouth honest.",
    "facts": [
      {
        "value": "Coupe",
        "label": "Glass"
      },
      {
        "value": "Bourbon",
        "label": "Base"
      },
      {
        "value": "Stirred",
        "label": "Method"
      },
      {
        "value": "1880s",
        "label": "Era"
      }
    ],
    "about": [
      "A Manhattan is roughly two parts whiskey to one part sweet vermouth, seasoned with aromatic bitters, stirred with ice and strained into a chilled glass. The vermouth brings wine, herbs and gentle bitterness, the bitters tie it together, and the whiskey supplies the backbone. It is as much about the balance between two ingredients as about the spirit alone.",
      "Early recipes leaned on rye, and the IBA spec still does. Bourbon makes a softer, more generous Manhattan, and a high-rye bourbon like Whiskey Row gives you both sides: caramel, vanilla and orchard fruit to meet the vermouth's sweetness, and rye spice and toasted oak to stop the drink becoming syrupy. At 45% ABV it holds its shape when stirred down."
    ],
    "fruit": {
      "heading": "The Manhattan Club: legend and evidence",
      "paras": [
        "The best-known origin story places the drink at New York's Manhattan Club in 1874, at a banquet thrown by Jennie Jerome (later Lady Randolph Churchill) for the politician Samuel J. Tilden. It is a charming tale and almost certainly untrue: Jennie had married and moved to Europe that year and was expecting her son Winston at the time of the supposed party. Another account credits a bartender named Black at a bar on Broadway in the 1860s.",
        "What the record does show is the drink appearing in print in the early 1880s, with recipes in bartending manuals by 1884, including O. H. Byron's The Modern Bartender's Guide. There is a neat footnote. In 1899 the Manhattan Club moved into the former mansion of Leonard Jerome, Jennie's father, on Madison Square, and stayed until 1966. So the legend's family and the club did end up under one roof, just a generation late."
      ],
      "image": {
        "src": "/images/brands/whiskey-row/products/manhattan/manhattan-club-cafe.webp",
        "alt": "Black-and-white photograph of a panelled club café decorated with American flags, a chandelier and wooden tables",
        "caption": "The café of the Manhattan Club, about 1901, in Leonard Jerome's former mansion on Madison Square. Photo: Byron Co., via Historic American Buildings Survey, public domain."
      }
    },
    "tasting": {
      "appearance": "Deep mahogany red, clear and bright in a chilled coupe.",
      "nose": "Orange oil and cherry over caramel and vanilla, with herbal vermouth notes and a hint of cinnamon.",
      "palate": "Silky and medium-sweet. Dark fruit, dried apple and vermouth spice, with rye pepper and toasted oak lifting the middle.",
      "finish": "Long and gently bitter, drying to dark chocolate and baking spice."
    },
    "profile": [
      {
        "label": "Sweetness",
        "value": 3,
        "note": "Sweet vermouth gives it a rounder, richer feel than an Old Fashioned."
      },
      {
        "label": "Strength",
        "value": 4,
        "note": "Spirit-forward, though the vermouth softens it a touch."
      },
      {
        "label": "Spice",
        "value": 4,
        "note": "Rye spice, bitters and vermouth botanicals work together."
      },
      {
        "label": "Bitterness",
        "value": 2,
        "note": "A light herbal bitterness from the vermouth and Angostura."
      },
      {
        "label": "Body",
        "value": 4,
        "note": "Silky and full, especially with a bourbon base."
      }
    ],
    "cocktails": [
      {
        "name": "Manhattan",
        "glass": "Coupe or Nick & Nora, chilled",
        "ice": "None in the glass; stirred over cubed ice",
        "garnish": "Orange zest expressed and discarded; maraschino cherry",
        "spec": [
          {
            "amount": "60",
            "unit": "ml",
            "what": "Whiskey Row Bourbon"
          },
          {
            "amount": "30",
            "unit": "ml",
            "what": "Sweet red vermouth"
          },
          {
            "amount": "1",
            "unit": "dash",
            "what": "Angostura aromatic bitters"
          }
        ],
        "method": [
          "Chill the coupe.",
          "Stir the bourbon, vermouth and bitters over plenty of ice for about 30 seconds.",
          "Fine strain into the chilled glass.",
          "Express an orange zest over the top and discard, then garnish with a cherry."
        ],
        "note": "Difford's sweet Manhattan uses 45 ml bourbon plus 15 ml 50% rye with 30 ml sweet vermouth; Whiskey Row's high-rye profile covers both roles from one bottle. The IBA spec is 50 ml rye, 20 ml sweet vermouth and a dash of Angostura, for a drier drink.",
        "source": "Difford's Guide, Manhattan (Sweet), adapted to a single bourbon; IBA, Manhattan"
      },
      {
        "name": "Perfect Manhattan",
        "glass": "Coupe, chilled",
        "ice": "None in the glass; stirred over cubed ice",
        "garnish": "Orange zest expressed and discarded; maraschino cherry",
        "spec": [
          {
            "amount": "60",
            "unit": "ml",
            "what": "Whiskey Row Bourbon"
          },
          {
            "amount": "12.5",
            "unit": "ml",
            "what": "Sweet red vermouth"
          },
          {
            "amount": "12.5",
            "unit": "ml",
            "what": "Dry vermouth"
          },
          {
            "amount": "2",
            "unit": "dashes",
            "what": "Angostura aromatic bitters"
          }
        ],
        "method": [
          "Stir all ingredients with ice.",
          "Strain into the chilled coupe.",
          "Express an orange zest over the drink and discard; garnish with a cherry."
        ],
        "note": "'Perfect' means the vermouth is split equally between sweet and dry. The result is a medium-dry Manhattan that lets more of the bourbon's oak and spice through.",
        "source": "Difford's Guide, Manhattan (Perfect)"
      }
    ],
    "uses": [
      {
        "title": "Stir, never shake",
        "body": "Shaking clouds the drink and leaves ice shards and bubbles. Stir over plenty of cold, dry ice for around 30 seconds for a clear, silky texture."
      },
      {
        "title": "Treat vermouth as wine",
        "body": "Vermouth oxidises once open. Keep it in the fridge, date the bottle and use it within a few weeks. Tired vermouth is the most common reason a Manhattan tastes flat."
      },
      {
        "title": "Chill the glass",
        "body": "A drink served up has no ice to keep it cold, so start with a frozen or iced coupe and keep the serve small. A 90 ml drink stays crisp to the last sip."
      },
      {
        "title": "Batch and freeze-chill",
        "body": "With no citrus, a Manhattan batches perfectly. Mix bourbon, vermouth and bitters, add about 20% water, bottle and keep in the fridge or freezer, then pour straight into a chilled glass."
      }
    ],
    "faq": [
      {
        "q": "Should a Manhattan be made with rye or bourbon?",
        "a": "Rye is the older, drier style and the IBA standard. Bourbon is a long-accepted alternative that makes a rounder drink. A high-rye bourbon like Whiskey Row offers a middle path."
      },
      {
        "q": "Was the Manhattan invented for Winston Churchill's mother?",
        "a": "That is the legend, but Jennie Jerome was in Europe and pregnant with Winston when the 1874 Manhattan Club party supposedly took place. Historians treat the story as myth."
      },
      {
        "q": "What does 'perfect' mean in a Perfect Manhattan?",
        "a": "Equal parts sweet and dry vermouth instead of all sweet vermouth, giving a drier drink. A Dry Manhattan uses dry vermouth only."
      },
      {
        "q": "Can a Manhattan be served on the rocks?",
        "a": "Yes. Strain it over a large cube in a rocks glass if guests prefer. It stays colder for longer but dilutes gradually."
      },
      {
        "q": "Which cherry should I use?",
        "a": "A good Italian maraschino or brandied cherry. Avoid bright red candied cherries, which add sugar and little else."
      }
    ],
    "gallery": [
      {
        "src": "/images/brands/whiskey-row/products/manhattan/manhattan-coupe.webp",
        "alt": "Manhattan cocktail with an ice cube in a stemmed glass on a wooden bar",
        "caption": "A Manhattan in a stemmed cocktail glass. Photo: star5112, CC BY-SA 2.0."
      },
      {
        "src": "/images/brands/whiskey-row/products/manhattan/bourbon-warehouse.webp",
        "alt": "Rows of bourbon barrels on racks along a long wooden warehouse aisle in Kentucky",
        "caption": "Bourbon barrels resting in a Kentucky distillery warehouse. Photo: U.S. National Archives, public domain."
      }
    ],
    "credits": [
      {
        "file": "Manhattan cocktail with ice.jpg",
        "author": "star5112",
        "licence": "CC BY-SA 2.0",
        "url": "https://commons.wikimedia.org/wiki/File:Manhattan_cocktail_with_ice.jpg"
      },
      {
        "file": "Cafe at manhattan club - leonard w jerome mansion.tif",
        "author": "Byron Co. (c. 1901); HABS photocopy by George Eisenman (1962)",
        "licence": "Public domain",
        "url": "https://commons.wikimedia.org/wiki/File:Cafe_at_manhattan_club_-_leonard_w_jerome_mansion.tif"
      },
      {
        "file": "Lincoln Heritage Scenic Highway - Bourbon Barrels in a Local Warehouse - NARA - 7720083.jpg",
        "author": "Unknown (U.S. National Archives and Records Administration)",
        "licence": "Public domain",
        "url": "https://commons.wikimedia.org/wiki/File:Lincoln_Heritage_Scenic_Highway_-_Bourbon_Barrels_in_a_Local_Warehouse_-_NARA_-_7720083.jpg"
      }
    ],
    "sources": [
      "https://www.diffordsguide.com/cocktails/recipe/1247/manhattan",
      "https://www.diffordsguide.com/cocktails/recipe/1246/manhattan-perfect",
      "https://iba-world.com/iba-cocktail/manhattan/",
      "https://en.wikipedia.org/wiki/Manhattan_(cocktail)",
      "https://en.wikipedia.org/wiki/Manhattan_Club_(social_club)",
      "https://en.wikipedia.org/wiki/Jerome_Mansion",
      "https://www.distillerytrail.com/blog/kentucky-artisan-distillery-releases-its-1st-whiskey-row-bottled-in-bond-kentucky-straight-bourbon/",
      "https://bottleofitaly.com/en/products/straight-bourbon-whiskey-70cl-whiskey-row"
    ]
  }
];
