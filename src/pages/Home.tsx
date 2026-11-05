import Hero from '../sections/Hero';
import { ServicesSection } from '../sections/ServicesSection';
import { IndustriesSection } from '../sections/IndustriesSection';
import { IntroductionSection } from '../sections/IntroductionSection';
import NetworkMap from '../sections/NetworkMap';
import Story from '../sections/Story';
import Bartenders from '../sections/Bartenders';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import Contact from '../sections/Contact';
import { useSeo } from '../hooks/useSeo';
import { SITE_NAME, SITE_URL, pageMeta } from '../data/seo';

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

  return (
    <>
      <Hero ready={ready} />
      <NetworkMap />
      <ServicesSection />
      <IndustriesSection />
      <IntroductionSection />
      <Story />
      <Bartenders />
      <TestimonialsSection />
      <Contact />
    </>
  );
}
