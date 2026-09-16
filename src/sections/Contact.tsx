import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Check } from 'lucide-react';
import { contact, brand } from '../data/content';
import Reveal from '../components/Reveal';
import MagneticButton from '../components/MagneticButton';
import styles from './Contact.module.css';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <Reveal><p className="eyebrow" style={{ color: 'var(--rose-300)' }}>Become a Stockist</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className={`display-lg ${styles.title}`}>
              Put the portfolio <span className="gradient-text">behind your bar.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className={styles.lede}>
              Join {contact.phone ? '2,700+' : ''} venues across Australia, New Zealand and the Pacific.
              Tell us about your venue and we'll build the range around you.
            </p>
          </Reveal>

          <div className={styles.details}>
            <a href={`mailto:${contact.email}`} className={styles.detail} data-cursor="Email">
              <Mail size={18} /> <span>{contact.email}</span>
            </a>
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className={styles.detail} data-cursor="Call">
              <Phone size={18} /> <span>{contact.phone}</span>
            </a>
            <span className={styles.detail}>
              <MapPin size={18} /> <span>{brand.regions}</span>
            </span>
          </div>
        </div>

        <Reveal delay={0.15} className={styles.formWrap}>
          {sent ? (
            <div className={styles.success}>
              <span className={styles.check}><Check size={30} /></span>
              <h3>Thank you.</h3>
              <p>Your enquiry is in. Our trade team will be in touch within two business days.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Your name</span>
                  <input type="text" name="name" required placeholder="Jamie Rivera" />
                </label>
                <label className={styles.field}>
                  <span>Venue</span>
                  <input type="text" name="venue" required placeholder="The Rooftop, Perth" />
                </label>
              </div>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Email</span>
                  <input type="email" name="email" required placeholder="you@venue.com.au" />
                </label>
                <label className={styles.field}>
                  <span>Channel</span>
                  <select name="channel" defaultValue="Bar / Venue">
                    <option>Bar / Venue</option>
                    <option>Bottle Shop</option>
                    <option>Café</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
              <label className={styles.field}>
                <span>Tell us about your venue</span>
                <textarea name="message" rows={4} placeholder="What are you pouring, and what are you looking for?" />
              </label>
              <div className={styles.submit}>
                <MagneticButton variant="solid" cursorLabel="Send">Send enquiry</MagneticButton>
                <a href="#brands" className={styles.dl}>Download the 2026 Portfolio</a>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
