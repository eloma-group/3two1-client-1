import Hero from '../sections/Hero';
import Story from '../sections/Story';
import Brands from '../sections/Brands';
import Stats from '../sections/Stats';
import Trade from '../sections/Trade';
import Bartenders from '../sections/Bartenders';
import Experience from '../sections/Experience';
import Contact from '../sections/Contact';

export default function Home({ ready }: { ready: boolean }) {
  return (
    <>
      <Hero ready={ready} />
      <Story />
      <Brands />
      <Stats />
      <Trade />
      <Experience />
      <Bartenders />
      <Contact />
    </>
  );
}
