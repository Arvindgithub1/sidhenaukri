import styles from './PageHero.module.css';

export default function PageHero({ title, subtitle, count }) {
  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {count > 0 && (
          <span className={styles.badge}>{count} Posts Available</span>
        )}
      </div>
    </div>
  );
}
