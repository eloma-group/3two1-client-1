import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { brandPage } from '../../data/brandPages';
import { useSeo } from '../../hooks/useSeo';
import { brandMeta, breadcrumbLd, clip } from '../../data/seo';

/* Each of the nine houses gets its own hand-built page and stylesheet, so they load
   on demand rather than shipping seven themes with the home page. */
const PAGES: Record<string, LazyExoticComponent<ComponentType>> = {
  'black-tears': lazy(() => import('./BlackTears')),
  'pueblo-viejo': lazy(() => import('./PuebloViejo')),
  'worthy-park': lazy(() => import('./WorthyPark')),
  'san-matias': lazy(() => import('./SanMatias')),
  giffard: lazy(() => import('./Giffard')),
  'burnt-ends': lazy(() => import('./BurntEnds')),
  'whiskey-row': lazy(() => import('./WhiskeyRow')),
  'demonio-de-los-andes': lazy(() => import('./DemonioDeLosAndes')),
  thoquino: lazy(() => import('./Thoquino')),
};

export default function BrandRoute() {
  const { slug = '' } = useParams();
  const Page = PAGES[slug];
  const data = brandPage(slug);

  const meta = brandMeta[slug];
  useSeo({
    title: meta?.title ?? `${data?.name ?? 'Brands'} | 3Two1 Drinks`,
    description: meta?.description ?? clip(data?.story.paragraphs[0] ?? ''),
    image: meta?.image,
    noindex: !data,
    jsonLd: data
      ? [
          { '@type': 'Brand', name: data.name, description: meta?.description, ...(data.site ? { sameAs: data.site } : {}) },
          breadcrumbLd([['Home', '/'], ['Portfolio', '/portfolio'], [data.name, `/brands/${slug}`]]),
        ]
      : [],
  });

  if (!Page || !data) return <Navigate to="/#brands" replace />;
  return (
    <Suspense fallback={<div style={{ minHeight: '100svh' }} />}>
      <Page />
    </Suspense>
  );
}
