import Link from 'next/link';
import styles from './SectionWrapper.module.css';

export default function SectionWrapper({ title, viewAllLink, children }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {viewAllLink && (
          <Link href={viewAllLink} className={styles.viewAll}>View All &rsaquo;</Link>
        )}
      </div>
      <hr className={styles.divider} />
      <div className={styles.body}>{children}</div>
    </section>
  );
}
