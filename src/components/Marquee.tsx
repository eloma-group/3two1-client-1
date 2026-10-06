import { Link } from 'react-router-dom';
import styles from './Marquee.module.css';

/** A logo rather than a word — same track, different cargo. */
export interface MarqueeLogo {
  src: string;
  alt: string;
  /** Route the logo links to, e.g. the house's brand page. */
  to?: string;
}

interface Props {
  items: (string | MarqueeLogo)[];
  reverse?: boolean;
  className?: string;
}

/** Infinite CSS marquee (duplicated track). */
export default function Marquee({ items, reverse, className = '' }: Props) {
  /* The second copy only exists to close the loop, so it stays hidden from
     assistive tech and out of the tab order. The first copy carries any links. */
  const row = (copy: boolean) => (
    <div className={styles.track} aria-hidden={copy || !items.some((it) => typeof it !== 'string' && it.to)}>
      {items.map((item, i) => {
        if (typeof item === 'string') {
          return (
            <span className={styles.item} key={i}>
              {item}
              <span className={styles.dot}>✦</span>
            </span>
          );
        }
        const img = <img src={item.src} alt="" onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />;
        return item.to ? (
          <Link
            className={`${styles.logo} ${styles.logoLink}`}
            key={i}
            to={item.to}
            aria-label={item.alt}
            tabIndex={copy ? -1 : undefined}
            data-cursor="Explore"
          >
            {img}
          </Link>
        ) : (
          <span className={styles.logo} key={i}>{img}</span>
        );
      })}
    </div>
  );
  return (
    <div className={`${styles.marquee} ${reverse ? styles.reverse : ''} ${className}`}>
      {row(false)}
      {row(true)}
    </div>
  );
}
