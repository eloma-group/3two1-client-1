import Hero from '../sections/Hero';
import Reach from '../sections/Reach';
import Story from '../sections/Story';
import Brands from '../sections/Brands';
import Stats from '../sections/Stats';
import Trade from '../sections/Trade';
import Bartenders from '../sections/Bartenders';
import Contact from '../sections/Contact';

export default function Home({ ready }: { ready: boolean }) {
  return (
    <>
      <Hero ready={ready} />
      <Story />
      <Brands />
      <Stats />
      <Trade />
      <Reach />
      <Bartenders />
      <Contact />
    </>
  );
}
