import Hero from '../sections/Hero';
import NetworkEditorial from '../sections/NetworkEditorial';
import { ServicesSection } from '../sections/ServicesSection';
import { IndustriesSection } from '../sections/IndustriesSection';
import { IntroductionSection } from '../sections/IntroductionSection';
import Story from '../sections/Story';
import Bartenders from '../sections/Bartenders';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import Contact from '../sections/Contact';

export default function Home({ ready }: { ready: boolean }) {
  return (
    <>
      <Hero ready={ready} />
      <NetworkEditorial />
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
