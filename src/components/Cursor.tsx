import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import styles from './Cursor.module.css';

/** Premium mouse-follow cursor with a lagging ring + label on hover targets. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');

  useEffect(() => {
    if (!fine) return;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;

    const move = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]');
      if (target) {
        setActive(true);
        setLabel(target.dataset.cursor || '');
      } else {
        setActive(false);
        setLabel('');
      }
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <>
      <div ref={dot} className={styles.dot} />
      <div ref={ring} className={`${styles.ring} ${active ? styles.active : ''}`}>
        {label && <span className={styles.label}>{label}</span>}
      </div>
    </>
  );
}
