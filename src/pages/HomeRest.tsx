import { useEffect, useState } from 'react';
import { ServicesSection } from '../sections/ServicesSection';
import { IndustriesSection } from '../sections/IndustriesSection';
import { IntroductionSection } from '../sections/IntroductionSection';
import NetworkMap from '../sections/NetworkMap';
import Story from '../sections/Story';
import Bartenders from '../sections/Bartenders';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import Contact from '../sections/Contact';

const SECTIONS = [
  IntroductionSection,
  NetworkMap,
  ServicesSection,
  IndustriesSection,
  Story,
  Bartenders,
  TestimonialsSection,
  Contact,
];

/** The home page below the hero, loaded as its own chunk (see Home.tsx). The
    sections mount one per task, top first, so a slow phone gets several short
    tasks instead of one long one. */
export default function HomeRest() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (count >= SECTIONS.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), 0);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <>
      {SECTIONS.slice(0, count).map((Section, i) => <Section key={i} />)}
    </>
  );
}
