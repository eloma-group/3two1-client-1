import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import b from './bento.module.css';

interface Props {
  children: ReactNode;
  /** In-app route. */
  to?: string;
  /** mailto:, tel: or an external link. */
  href?: string;
  onClick?: () => void;
  /** `more` is the text link with a chevron. */
  variant?: 'primary' | 'dark' | 'light' | 'more';
  onDark?: boolean;
  type?: 'button' | 'submit';
}

/** Rounded button, or a "Learn more ›" style link. */
export default function Pill({ children, to, href, onClick, variant = 'primary', onDark, type = 'button' }: Props) {
  const cls = `${b.btn} ${b[variant]} ${onDark ? b.onDark : ''}`;
  const body = (
    <>
      {children}
      {variant === 'more' && <ChevronRight size={17} strokeWidth={2.4} />}
    </>
  );
  if (to) return <Link to={to} className={cls} onClick={onClick}>{body}</Link>;
  if (href) return <a href={href} className={cls} onClick={onClick}>{body}</a>;
  return <button type={type} className={cls} onClick={onClick}>{body}</button>;
}
