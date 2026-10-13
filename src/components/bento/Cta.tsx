import { useState, type FormEvent, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import Rise from './Rise';
import Pill from './Pill';
import b from './bento.module.css';

/** Dark closing panel. With `placeholder` it carries an email field. */
export default function Cta({
  title,
  text,
  placeholder,
  actions,
}: {
  title: ReactNode;
  text: string;
  placeholder?: string;
  actions?: ReactNode;
}) {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Rise>
      <div className={b.cta}>
        <div className={b.mesh} aria-hidden="true"><i /></div>
        <h2 className={b.ctaTitle}>{title}</h2>
        <p className={b.ctaText}>{text}</p>
        {placeholder ? (
          sent ? (
            <p className={b.done} role="status"><Check size={18} /> Thanks - the rate card is on its way.</p>
          ) : (
            <form className={b.field} onSubmit={onSubmit}>
              <input type="email" required placeholder={placeholder} aria-label="Email" />
              <Pill type="submit">Get rate card</Pill>
            </form>
          )
        ) : (
          <div className={b.ctaActions}>{actions}</div>
        )}
      </div>
    </Rise>
  );
}
