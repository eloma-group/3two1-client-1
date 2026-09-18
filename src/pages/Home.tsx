import Hero from '../sections/Hero';
import Reach from '../sections/Reach';
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
      <Reach />
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
