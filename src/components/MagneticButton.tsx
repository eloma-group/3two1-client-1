import { useRef, type ReactNode, type MouseEvent } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import styles from './MagneticButton.module.css';

type Variant = 'solid' | 'outline' | 'ghost' | 'light';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: Variant;
  className?: string;
  cursorLabel?: string;
}

/** Button/link that magnetically drifts toward the pointer. */
export default function MagneticButton({
  children,
  onClick,
  href,
  variant = 'solid',
  className = '',
  cursorLabel,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');

  const onMove = (e: MouseEvent) => {
    if (!fine || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  const cls = `${styles.btn} ${styles[variant]} ${className}`;
  const inner = <span className={styles.inner}>{children}</span>;
  const shared = {
    className: cls,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    'data-cursor': cursorLabel,
  } as const;

  if (href) {
    return (
      <a href={href} onClick={onClick} {...shared}>
        <span ref={ref} className={styles.magnet}>{inner}</span>
      </a>
    );
  }
  return (
    <button onClick={onClick} {...shared}>
      <span ref={ref} className={styles.magnet}>{inner}</span>
    </button>
  );
}
