import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { stats, brand } from '../data/content';
import Marquee from '../components/Marquee';
import styles from './Stats.module.css';

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const [display, setDisplay] = useState(value.replace(/[0-9]/g, '0'));

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (Number.isNaN(num)) { setDisplay(value); return; }
    const suffix = value.replace(/[0-9,]/g, '');
    const hasComma = value.includes(',');
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(num * eased);
      setDisplay((hasComma ? current.toLocaleString() : String(current)) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export default function Stats() {
  return (
    <section className={styles.stats}>
      <Marquee
        className={styles.marquee}
        items={brand.regions.split(' — ').concat(['The Taste of Passion', 'Seven Houses', 'One Portfolio'])}
      />
      <div className={`container ${styles.grid}`}>
        {stats.map((s) => (
          <div className={styles.stat} key={s.label}>
            <span className={`gradient-text ${styles.value}`}><CountUp value={s.value} /></span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
