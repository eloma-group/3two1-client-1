import { ArrowUpRight } from 'lucide-react';
import { Instagram } from '../components/icons';
import { brand, footerColumns, contact } from '../data/content';
import { scrollToHash } from '../hooks/useLenis';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grain} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <img src="/images/logotype-white.png" alt="3two1 drinks" className={styles.logo} />
            <p className={styles.tagline}>{brand.tagline}.</p>
            <p className={styles.regions}>{brand.regions}</p>
            <a href={contact.instagram} target="_blank" rel="noreferrer" className={styles.social} data-cursor="Follow">
              <Instagram size={18} /> Instagram
            </a>
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
                        onClick={(e) => { e.preventDefault(); scrollToHash(l.to.replace('/', '')); }}
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
              </ul>
            </div>
          </div>
        </div>

        <p className={styles.ack}>{brand.acknowledgement}</p>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} {brand.name} drinks. {brand.slogan}.</span>
          <span className={styles.legal}>ABN {contact.abn} · Liquor Licence {contact.licence}</span>
          <span className={styles.legal}>Enjoy 3two1 responsibly. Not for anyone under 18.</span>
        </div>
      </div>
    </footer>
  );
}
