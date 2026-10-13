import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Settles into place as it enters view: from slightly small and clear to full size. */
export default function Rise({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}
