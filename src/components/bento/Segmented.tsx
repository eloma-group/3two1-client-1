import { motion } from 'framer-motion';
import b from './bento.module.css';

/** iOS-style segmented control; the white thumb slides to the chosen option. */
export default function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  id,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (key: T) => void;
  label: string;
  /** Unique per control on the page, so thumbs do not fly between controls. */
  id: string;
}) {
  return (
    <div className={b.segmented} role="group" aria-label={label}>
      {options.map((o) => {
        const on = o.key === value;
        return (
          <button
            key={o.key}
            className={`${b.segment} ${on ? b.segmentOn : ''}`}
            aria-pressed={on}
            onClick={() => onChange(o.key)}
          >
            {on && <motion.span layoutId={`seg-${id}`} className={b.segmentThumb} transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
