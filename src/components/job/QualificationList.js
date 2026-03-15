import styles from './ContentBlock.module.css';

export default function QualificationList({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <ul className={styles.list}>
        {data.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.dot}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
