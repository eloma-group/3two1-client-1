import styles from './Marquee.module.css';

/** A logo rather than a word — same track, different cargo. */
export interface MarqueeLogo {
  src: string;
  alt: string;
}

interface Props {
  items: (string | MarqueeLogo)[];
  reverse?: boolean;
  className?: string;
}

/** Infinite CSS marquee (duplicated track). */
export default function Marquee({ items, reverse, className = '' }: Props) {
  const row = (
    <div className={styles.track} aria-hidden>
      {items.map((item, i) =>
        typeof item === 'string' ? (
          <span className={styles.item} key={i}>
            {item}
            <span className={styles.dot}>✦</span>
          </span>
        ) : (
          <span className={styles.logo} key={i}>
            <img src={item.src} alt="" onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />
          </span>
        ),
      )}
    </div>
  );
  return (
    <div className={`${styles.marquee} ${reverse ? styles.reverse : ''} ${className}`}>
      {row}
      {row}
    </div>
  );
}
