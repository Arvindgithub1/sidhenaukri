import Link from 'next/link';
import styles from './ResultCard.module.css';

export default function ResultCard({ result }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{result.title}</h3>
      <div className={styles.bottom}>
        <div className={styles.dates}>
          <p className={styles.date}>Post Date: <span>{result.postDate}</span></p>
        </div>
        <Link href={result.link || '#'} className={styles.btn}>
          View Result
        </Link>
      </div>
    </div>
  );
}
