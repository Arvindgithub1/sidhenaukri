import Link from 'next/link';
import styles from './Breadcrumb.module.css';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="breadcrumb" className={styles.nav}>
      {items.map((item, i) => (
        <span key={i} className={styles.item}>
          {i < items.length - 1 ? (
            <>
              <Link href={item.href || '/'} className={styles.link}>{item.label}</Link>
              <span className={styles.sep} aria-hidden="true">›</span>
            </>
          ) : (
            <span className={styles.current} aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}