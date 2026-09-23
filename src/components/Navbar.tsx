import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown, Download, ArrowRight } from 'lucide-react';
import { navMenu, contact, type MenuEntry } from '../data/content';
import { scrollToHash } from '../hooks/useLenis';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const [acc, setAcc] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', open);
  }, [open]);

  const isExternal = (to: string) => /^https?:\/\//.test(to);

  const go = (to: string) => {
    setOpen(false);
    setDrop(null);
    if (isExternal(to)) {
      window.open(to, '_blank', 'noopener,noreferrer');
      return;
    }
    const id = to.replace('/', '');
    setTimeout(() => scrollToHash(id), open ? 350 : 0);
  };

  const Dropdown = ({ item }: { item: MenuEntry }) => (
    <div
      className={styles.item}
      onMouseEnter={() => setDrop(item.label)}
      onMouseLeave={() => setDrop(null)}
    >
      <button
        className={styles.link}
        onClick={() => go(item.to)}
        aria-expanded={drop === item.label}
      >
        {item.label}
        <ChevronDown size={14} className={styles.chev} />
      </button>
      <AnimatePresence>
        {drop === item.label && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`${styles.dropInner} ${item.children.length > 4 ? styles.twoCol : ''}`}>
              {item.children.map((c) => (
                <button key={c.label} className={styles.dropLink} onClick={() => go(c.to)}>
                  {c.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <motion.header
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.bar}>
          {/* Left: logo + links */}
          <div className={styles.left}>
            <a
              href="#top"
              className={styles.brand}
              onClick={(e) => { e.preventDefault(); go('#top'); }}
              data-cursor="Top"
            >
              <img src="/images/logo.svg" alt="3two1 drinks" className={styles.logo} />
            </a>
            <nav className={styles.links}>{navMenu.map((m) => <Dropdown key={m.label} item={m} />)}</nav>
          </div>

          {/* Right: toggle + portfolio */}
          <div className={styles.right}>
            <ThemeToggle className={styles.themeDesktop} />
            <button className={styles.ctaPill} onClick={() => go('#brands')}>
              <span>Portfolio</span>
              <ArrowRight size={15} className={styles.ctaArrow} />
            </button>
            <button className={styles.burger} onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ clipPath: 'circle(0% at 92% 8%)' }}
            animate={{ clipPath: 'circle(150% at 92% 8%)' }}
            exit={{ clipPath: 'circle(0% at 92% 8%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={30} />
            </button>

            <div className={styles.mobileTop}>
              <ThemeToggle />
            </div>

            <nav className={styles.menuLinks}>
              {navMenu.map((m, i) => (
                <motion.div
                  key={m.label}
                  className={styles.mAcc}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    className={styles.mAccHead}
                    onClick={() => setAcc(acc === m.label ? null : m.label)}
                  >
                    <span>{m.label}</span>
                    <ChevronDown
                      size={22}
                      className={`${styles.mChev} ${acc === m.label ? styles.mChevOpen : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {acc === m.label && (
                      <motion.div
                        className={styles.mChildren}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {m.children.map((c) => (
                          <button key={c.label} className={styles.mChild} onClick={() => go(c.to)}>
                            {c.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </nav>

            <div className={styles.menuFoot}>
              <button className={styles.mCta} onClick={() => go('#brands')}>
                <Download size={16} /> Download Portfolio
              </button>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
