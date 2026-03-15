import Link from 'next/link';
import styles from './AdmitCard.module.css';

export default function AdmitCard({ item }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{item.title}</h3>
      <div className={styles.bottom}>
        <div className={styles.dates}>
          <p className={styles.date}>Post Date: <span>{item.postDate}</span></p>
        </div>
        <Link href={item.downloadLink || '#'} className={styles.btn}>
          Download
        </Link>
      </div>
    </div>
  );
}
