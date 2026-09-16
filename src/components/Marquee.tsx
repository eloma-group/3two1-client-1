import styles from './Marquee.module.css';

interface Props {
  items: string[];
  reverse?: boolean;
  className?: string;
}

/** Infinite CSS marquee (duplicated track). */
export default function Marquee({ items, reverse, className = '' }: Props) {
  const row = (
    <div className={styles.track} aria-hidden>
      {items.map((t, i) => (
        <span className={styles.item} key={i}>
          {t}
          <span className={styles.dot}>✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`${styles.marquee} ${reverse ? styles.reverse : ''} ${className}`}>
      {row}
      {row}
    </div>
  );
}
