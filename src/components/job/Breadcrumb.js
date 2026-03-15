import Link from 'next/link';
import styles from './Breadcrumb.module.css';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className={styles.nav}>
      {items.map((item, i) => (
        <span key={i} className={styles.item}>
          {i < items.length - 1 ? (
            <>
              <Link href="/" className={styles.link}>{item}</Link>
              <span className={styles.sep}>›</span>
            </>
          ) : (
            <span className={styles.current}>{item}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
