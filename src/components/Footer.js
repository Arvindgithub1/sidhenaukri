import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link href="/about" className={styles.link}>About Us</Link>
        <span className={styles.sep}>|</span>
        <Link href="/contact" className={styles.link}>Contact Us</Link>
        <span className={styles.sep}>|</span>
        <Link href="/privacy-policy" className={styles.link}>Privacy Policy</Link>
        <span className={styles.sep}>|</span>
        <Link href="/disclaimer" className={styles.link}>Disclaimer</Link>
        <span className={styles.sep}>|</span>
        <Link href="/terms-conditions" className={styles.link}>Terms & Conditions</Link>
      </div>
      <p className={styles.copy}>© 2026 <strong>Sidhe Naukri</strong>. All Rights Reserved.</p>
    </footer>
  );
}
