import { ArrowUpRight } from 'lucide-react';
import { Facebook, Instagram, Linkedin, Youtube } from '../components/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { brand, footerColumns, contact } from '../data/content';

const isFile = (to: string) => to.endsWith('.pdf');
import { scrollToHash } from '../hooks/useLenis';
import styles from './Footer.module.css';

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  /* A plain path is its own page; a hash is a section of a page (the home
     page when no path is given), so route there first when we are somewhere
     else. Routed pages scroll themselves to the hash once mounted. */
  const go = (to: string) => {
    const hash = to.indexOf('#');
    if (hash === -1) { navigate(to); return; }
    const id = to.slice(hash);
    const path = to.slice(0, hash) || '/';
    if (path !== '/' && pathname !== path) { navigate(to); return; }
    if (pathname !== path) {
      navigate('/');
      requestAnimationFrame(() => setTimeout(() => scrollToHash(id), 120));
      return;
    }
    scrollToHash(id);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.grain} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <img src="/images/logo.png" alt="3Two1 drinks" className={styles.logo} />
            <p className={styles.tagline}>{brand.tagline}.</p>
            <p className={styles.regions}>{brand.regions}</p>
            <div className={styles.socials}>
              <a href={contact.instagram} target="_blank" rel="noreferrer" className={styles.social} data-cursor="Follow" aria-label="Instagram" title="Instagram">
                <Instagram size={18} />
              </a>
              <a href={contact.facebook} target="_blank" rel="noreferrer" className={styles.social} data-cursor="Follow" aria-label="Facebook" title="Facebook">
                <Facebook size={18} />
              </a>
              <a href={contact.youtube} target="_blank" rel="noreferrer" className={styles.social} data-cursor="Follow" aria-label="YouTube" title="YouTube">
                <Youtube size={18} />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className={styles.social} data-cursor="Follow" aria-label="LinkedIn" title="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className={styles.cols}>
            {footerColumns.map((col) => (
              <div key={col.title} className={styles.col}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((l, i) => (
                    <li key={i}>
                      <a
                        href={l.to}
                        {...(isFile(l.to)
                          ? { target: '_blank', rel: 'noopener' }
                          : { onClick: (e: React.MouseEvent) => { e.preventDefault(); go(l.to); } })}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className={styles.col}>
              <h4>Contact</h4>
              <ul>
                <li><a href={`mailto:${contact.email}`}>{contact.email} <ArrowUpRight size={13} /></a></li>
                <li><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li>
                <li className={styles.info}><span>Existing Customer</span>{contact.hours}</li>
                <li className={styles.info}><span>Warehouses</span>{contact.warehouses}</li>
                <li className={styles.info}><span>Wholesalers</span>{contact.wholesalers}</li>
              </ul>
            </div>
          </div>
        </div>

        <p className={styles.ack}>{brand.acknowledgement}</p>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} {brand.name} drinks. {brand.slogan}.</span>
          <span className={styles.legal}>Liquor Licence {contact.licence}</span>
          <span className={styles.legal}>Enjoy 3Two1 responsibly. Not for anyone under 18.</span>
        </div>
      </div>
    </footer>
  );
}
