// Writes dist/sitemap.xml after `vite build`, listing every indexable route.
// Routes come from the same data files the pages render from, so a new brand,
// product, shelf or trade page lands in the sitemap without editing this file.
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const load = (p) => server.ssrLoadModule(p);
  const { SITE_URL } = await load('/src/data/seo.ts');
  const { brandPages } = await load('/src/data/brandPages.ts');
  const { houses } = await load('/src/data/houseProducts.ts');
  const { giffardShelves } = await load('/src/data/giffardShelves.ts');
  const { tradeSegments } = await load('/src/data/tradePages.ts');

  const routes = [
    ['/', '1.0'],
    ['/portfolio', '0.9'],
    ['/our-story', '0.7'],
    ['/contact', '0.8'],
    ['/cocktails', '0.7'],
    ['/events', '0.5'],
    ['/investors', '0.5'],
    ...tradeSegments.map((t) => [`/trade/${t.slug}`, '0.8']),
    ...brandPages.map((b) => [`/brands/${b.slug}`, '0.9']),
    ['/brands/black-tears/cuba-libre', '0.6'],
    ...giffardShelves.map((s) => [`/brands/giffard/range/${s.slug}`, '0.8']),
    ...Object.values(houses).flatMap((h) => h.products.map((p) => [`/brands/${h.slug}/${p.slug}`, '0.7'])),
  ];

  const today = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(([path, priority]) => `  <url><loc>${SITE_URL}${path}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`).join('\n')}
</urlset>
`;
  writeFileSync(resolve('dist/sitemap.xml'), xml);
  console.log(`sitemap.xml: ${routes.length} URLs`);
} finally {
  await server.close();
}
