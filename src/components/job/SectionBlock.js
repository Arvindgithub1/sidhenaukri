import styles from './SectionBlock.module.css';

export default function SectionBlock({ title, children }) {
  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
