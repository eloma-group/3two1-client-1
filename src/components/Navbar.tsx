import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown, Download } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navMenu, contact, portfolioPdf, type MenuEntry } from '../data/content';
import { scrollToHash } from '../hooks/useLenis';
import ThemeToggle from './ThemeToggle';
import { useLiquidGlass, useBackdropTone, trackSheen } from './liquidGlass';
import styles from './Navbar.module.css';

/* Springy, slightly underdamped motion, the way iOS glass settles. */
const spring = { type: 'spring', stiffness: 420, damping: 32, mass: 0.8 } as const;

type Go = (to: string) => void;

function SubMenu({ item, go }: { item: MenuEntry; go: Go }) {
  const { ref, style, filter } = useLiquidGlass<HTMLDivElement>(0.6);
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className={styles.dropdown}>
      <motion.div
        ref={ref}
        style={style}
        className={`${styles.dropInner} ${item.children.length > 4 ? styles.twoCol : ''}`}
        initial={{ opacity: 0, y: -8, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.95, transition: { duration: 0.18 } }}
        transition={spring}
        onPointerMove={trackSheen}
        onMouseLeave={() => setHover(null)}
      >
        {filter}
        {item.children.map((c) => (
          <button
            key={c.label}
            className={styles.dropLink}
            onMouseEnter={() => setHover(c.label)}
            onClick={() => go(c.to)}
          >
            {hover === c.label && (
              <motion.span layoutId={`sub-${item.label}`} className={styles.subCapsule} transition={spring} />
            )}
            <span className={styles.dropLabel}>{c.label}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}

function NavItem({ item, open, setDrop, go }: { item: MenuEntry; open: boolean; setDrop: (l: string | null) => void; go: Go }) {
  return (
    <div className={styles.item} onMouseEnter={() => setDrop(item.label)} onMouseLeave={() => setDrop(null)}>
      {open && <motion.span layoutId="navCapsule" className={styles.capsule} transition={spring} />}
      <button className={styles.link} onClick={() => go(item.to)} aria-expanded={open}>
        {item.label}
        <ChevronDown size={14} className={styles.chev} />
      </button>
      <AnimatePresence>{open && <SubMenu item={item} go={go} />}</AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const [acc, setAcc] = useState<string | null>(null);
  const { ref: barRef, style: barStyle, filter: barFilter } = useLiquidGlass<HTMLDivElement>();
  // Light or dark glass, whichever reads over what is behind the bar right now
  const tone = useBackdropTone(barRef);

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

    const delay = open ? 350 : 0; // let the mobile overlay finish closing first

    // A plain path is its own page; anything with a hash is a section of a
    // page (the home page when no path is given), so route there first when
    // we are somewhere else.
    const hash = to.indexOf('#');
    if (hash === -1) {
      setTimeout(() => navigate(to), delay);
      return;
    }
    const id = to.slice(hash);
    const path = to.slice(0, hash) || '/';
    if (path !== '/' && pathname !== path) {
      // Routed pages scroll themselves to the hash once mounted.
      setTimeout(() => navigate(to), delay);
      return;
    }
    if (pathname !== path) {
      setTimeout(() => {
        navigate('/');
        // The home sections have to mount before they can be scrolled to.
        requestAnimationFrame(() => setTimeout(() => scrollToHash(id), 120));
      }, delay);
      return;
    }
    setTimeout(() => scrollToHash(id), delay);
  };

  return (
    <>
      <motion.header
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${tone === 'dark' ? styles.glassDark : tone === 'light' ? styles.glassLight : ''}`}
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div ref={barRef} style={barStyle} className={styles.bar} onPointerMove={trackSheen}>
          {barFilter}
          {/* Left: logo + links */}
          <div className={styles.left}>
            <a
              href="#top"
              className={styles.brand}
              onClick={(e) => { e.preventDefault(); go('#top'); }}
              data-cursor="Top"
            >
              <img src="/images/logo.svg" alt="3Two1 Drinks" className={styles.logo} />
            </a>
            <nav className={styles.links}>
              {navMenu.map((m) => (
                <NavItem key={m.label} item={m} open={drop === m.label} setDrop={setDrop} go={go} />
              ))}
            </nav>
          </div>

          {/* Right: toggle + portfolio */}
          <div className={styles.right}>
            <ThemeToggle className={styles.themeDesktop} />
            <a className={styles.ctaPill} href={portfolioPdf} download>
              <span>Portfolio</span>
              <Download size={15} className={styles.ctaArrow} />
            </a>
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
              <a className={styles.mCta} href={portfolioPdf} download>
                <Download size={16} /> Download Portfolio
              </a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
