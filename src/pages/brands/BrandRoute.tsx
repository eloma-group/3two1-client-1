import { lazy, Suspense, useEffect, type ComponentType, type LazyExoticComponent } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { brandPage } from '../../data/brandPages';

/* Each house gets its own hand-built page and stylesheet, so they load
   on demand rather than shipping seven themes with the home page. */
const PAGES: Record<string, LazyExoticComponent<ComponentType>> = {
  'black-tears': lazy(() => import('./BlackTears')),
  'pueblo-viejo': lazy(() => import('./PuebloViejo')),
  'worthy-park': lazy(() => import('./WorthyPark')),
  'san-matias': lazy(() => import('./SanMatias')),
  giffard: lazy(() => import('./Giffard')),
  'burnt-ends': lazy(() => import('./BurntEnds')),
  'whiskey-row': lazy(() => import('./WhiskeyRow')),
};

export default function BrandRoute() {
  const { slug = '' } = useParams();
  const Page = PAGES[slug];
  const data = brandPage(slug);

  useEffect(() => {
    if (data) document.title = `${data.name} — 3two1 drinks`;
  }, [data]);

  if (!Page || !data) return <Navigate to="/#brands" replace />;
  return (
    <Suspense fallback={<div style={{ minHeight: '100svh' }} />}>
      <Page />
    </Suspense>
  );
}
