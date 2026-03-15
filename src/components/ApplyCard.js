import Link from 'next/link';
import styles from './ApplyCard.module.css';

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    // DD/MM/YYYY format handle karo
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const d = new Date(`${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`);
      return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    return dateStr;
  } catch { return dateStr; }
}

// section ke hisab se URL prefix
function getPrefix(section) {
  if (section === 'result')     return '/result';
  if (section === 'admit-card') return '/admit-card';
  if (section === 'answer-key') return '/answer-key';
  if (section === 'syllabus')   return '/syllabus';
  return '/jobs';
}

export default function ApplyCard({ job, section }) {
  const title    = job.title;
  const postDate = formatDate(job.created_at || job.important_dates?.apply_start);
  const lastDate = formatDate(job.important_dates?.last_date);
  const prefix   = getPrefix(section);

  // Section ke hisab se release date dikho
  const releaseDate =
    section === 'result'     ? formatDate(job.result?.release_date) :
    section === 'admit-card' ? formatDate(job.admit_card?.release_date) :
    section === 'answer-key' ? formatDate(job.answer_key?.release_date) :
    null;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.bottom}>
        <div className={styles.dates}>
          {postDate    && <p className={styles.date}>Post Date: <span>{postDate}</span></p>}
          {releaseDate && <p className={styles.date}>Release: <span>{releaseDate}</span></p>}
          {!releaseDate && lastDate && <p className={styles.date}>Last Date: <span>{lastDate}</span></p>}
        </div>
        <Link href={`${prefix}/${job.id}`} className={styles.btn}>
          View Details
        </Link>
      </div>
    </div>
  );
}