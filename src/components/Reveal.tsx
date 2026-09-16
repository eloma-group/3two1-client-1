import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/** Simple scroll-into-view reveal used across sections. */
export default function Reveal({ children, delay = 0, y = 40, className, once = true }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word staggered reveal for headings. */
export function RevealText({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'inline' }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <motion.span
            style={{ display: 'inline-block', paddingRight: '0.28em' }}
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.85, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
