import { useState } from 'react';
import styles from './SmartImage.module.css';

interface Props {
  src: string;
  alt: string;
  className?: string;
  hue?: string;
  bottle?: boolean;
}

/**
 * Renders an image; if the (placeholder) src fails to load it falls back to an
 * elegant gradient stand-in so the layout never shows a broken image icon.
 * Drop the real .webp files into /public/images later and they appear automatically.
 */
export default function SmartImage({ src, alt, className = '', hue, bottle }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${styles.fallback} ${bottle ? styles.bottle : ''} ${className}`}
        style={hue ? ({ ['--hue' as string]: hue }) : undefined}
        role="img"
        aria-label={alt}
      >
        {bottle && <span className={styles.silhouette} />}
        <span className={styles.shine} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
