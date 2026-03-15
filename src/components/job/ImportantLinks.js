import Link from 'next/link';
import styles from './ImportantLinks.module.css';

// "official_website" → "Official Website"
function formatLabel(key) {
  return key.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function ImportantLinks({ item = {}, section = '' }) {
  const allLinks = [];

  // Jobs apply link
  if (item.jobs?.apply_online) {
    allLinks.push({ key: 'apply_online', label: 'Apply Online', url: item.jobs.apply_online, cls: 'btnGreen' });
  }

  // Result download
  if (item.result?.download_result) {
    allLinks.push({ key: 'download_result', label: 'Download Result', url: item.result.download_result, cls: 'btnOrange' });
  }

  // Admit Card download
  if (item.admit_card?.download_admit_card) {
    allLinks.push({ key: 'download_admit_card', label: 'Download Admit Card', url: item.admit_card.download_admit_card, cls: 'btnBlue' });
  }

  // Answer Key download
  if (item.answer_key?.download_answer_key) {
    allLinks.push({ key: 'download_answer_key', label: 'Download Answer Key', url: item.answer_key.download_answer_key, cls: 'btnBlue' });
  }

  // Syllabus download
  if (item.syllabus?.download_syllabus) {
    allLinks.push({ key: 'download_syllabus', label: 'Download Syllabus', url: item.syllabus.download_syllabus, cls: 'btnGreen' });
  }

  // important_links — saari keys dynamically dikhao
  if (item.important_links && typeof item.important_links === 'object') {
    Object.entries(item.important_links).forEach(([key, url]) => {
      if (url && typeof url === 'string' && url.startsWith('http')) {
        allLinks.push({ key, label: formatLabel(key), url, cls: 'btnBlue' });
      }
    });
  }

  if (allLinks.length === 0) return null;

  return (
    <div className={styles.listWrap}>
      <ul className={styles.list}>
        {allLinks.map((l) => (
          <li key={l.key} className={styles.row}>
            <span className={styles.dot}>●</span>
            <span className={styles.label}>{l.label}</span>
            <Link
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles[l.cls]}`}
            >
              Click Here ›
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}