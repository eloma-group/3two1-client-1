import { motion } from 'framer-motion';

/* The 3two1 network — full editorial artwork. */
export default function NetworkEditorial() {
  return (
    <section id="network" style={{ width: '100%', background: '#f8f5f1', lineHeight: 0 }}>
      <motion.img
        src="/images/network-hero.webp"
        alt="The 3two1 network across Australia, New Zealand and the Pacific — in every great bar, bottle shop and café."
        initial={{ opacity: 0, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-12%' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        draggable={false}
      />
    </section>
  );
}
