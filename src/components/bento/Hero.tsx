import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import b from './bento.module.css';

/**
 * Centred product-page hero over a drifting colour mesh. The picture below
 * starts tipped back in 3D and stands upright as it scrolls up.
 */
export default function Hero({
  eyebrow,
  title,
  lede,
  actions,
  image,
  alt = '',
  tag,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  actions?: ReactNode;
  image?: string;
  alt?: string;
  tag?: string;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'start 0.25'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);

  return (
    <header className={b.hero}>
      <div className={b.mesh} aria-hidden="true"><i /></div>
      <div className="container">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className={b.eyebrow}>{eyebrow}</p>
          <h1 className={b.heroTitle}>{title}</h1>
          <p className={b.heroLede}>{lede}</p>
          {actions && <div className={b.heroActions}>{actions}</div>}
        </motion.div>

        {image && (
          <div ref={stage} className={b.stage}>
            <motion.div className={b.stageCard} style={reduce ? undefined : { rotateX, scale }}>
              <img src={image} alt={alt} />
              {tag && <span className={b.stageTag}>{tag}</span>}
            </motion.div>
          </div>
        )}
      </div>
    </header>
  );
}
