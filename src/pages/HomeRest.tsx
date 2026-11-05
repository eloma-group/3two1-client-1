import { ServicesSection } from '../sections/ServicesSection';
import { IndustriesSection } from '../sections/IndustriesSection';
import { IntroductionSection } from '../sections/IntroductionSection';
import NetworkMap from '../sections/NetworkMap';
import Story from '../sections/Story';
import Bartenders from '../sections/Bartenders';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import Contact from '../sections/Contact';

/** The home page below the hero, loaded as its own chunk (see Home.tsx). */
export default function HomeRest() {
  return (
    <>
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
