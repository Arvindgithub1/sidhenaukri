import styles from './AdSlot.module.css';

export default function AdSlot() {
  return (
    <div className={styles.wrap}>
      <span className={styles.adLabel}>Ad</span>
      <div className={styles.box}>
        <span className={styles.text}>Advertisement</span>
      </div>
    </div>
  );
}
