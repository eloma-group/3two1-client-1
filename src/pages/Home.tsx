import { lazy, Suspense, useEffect, useState } from 'react';
import Hero from '../sections/Hero';
import { useSeo } from '../hooks/useSeo';
import { SITE_NAME, SITE_URL, pageMeta } from '../data/seo';

/* Everything below the hero is its own chunk, mounted once the splash has its
   lines up (or as soon as it has gone, on a later visit). The splash covers the
   page until then, and keeping that work off the first seconds leaves the main
   thread free for the splash animation on slow phones. */
const HomeRest = lazy(() => import('./HomeRest'));
const REST_AFTER = 3000;

/** `notFound` is set on the catch-all route, which shows the home page under an
    unknown URL: that copy stays out of the index and points its canonical at `/`. */
export default function Home({ ready, notFound = false }: { ready: boolean; notFound?: boolean }) {
  useSeo({
    ...pageMeta['/'],
    path: '/',
    noindex: notFound,
    jsonLd: [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-AU',
      },
    ],
  });

  const [rest, setRest] = useState(ready);
  useEffect(() => {
    if (ready) { setRest(true); return; }
    const t = setTimeout(() => setRest(true), REST_AFTER);
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <>
      <Hero ready={ready} />
      {rest && <Suspense fallback={null}><HomeRest /></Suspense>}
    </>
  );
}
