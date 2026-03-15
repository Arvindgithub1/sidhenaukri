import styles from './BulletList.module.css';

export default function SelectionProcess({ steps = [] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <ol className={styles.numbered}>
      {steps.map((step, i) => (
        <li key={i} className={styles.numberedItem}>
          <span className={styles.number}>{i + 1}</span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}