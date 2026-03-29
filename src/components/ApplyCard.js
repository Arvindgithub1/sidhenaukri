import Link from 'next/link';
import { formatDate } from '@/lib/formatDate';
import styles from './ApplyCard.module.css';

function getPrefix(section) {
  if (section === 'result')     return '/result';
  if (section === 'admit-card') return '/admit-card';
  if (section === 'answer-key') return '/answer-key';
  if (section === 'syllabus')   return '/syllabus';
  return '/jobs';
}

function getDates(job) {
  let dates = job.important_dates;
  if (typeof dates === 'string') {
    try { dates = JSON.parse(dates); } catch { dates = {}; }
  }
  return dates || {};
}

// ✅ case-insensitive key dhundo — sirf last_date ya last_date_to_apply
function getLastDate(dates) {
  const keys = Object.keys(dates);
  const match = keys.find(k => {
    const lower = k.toLowerCase().replace(/\s+/g, '_');
    return lower === 'last_date' || lower === 'last_date_to_apply';
  });
  return match ? dates[match] : null;
}

export default function ApplyCard({ job, section }) {
  const title    = job.title;
  const dates    = getDates(job);
  const postDate = formatDate(job.created_at || dates.apply_start);
  const lastDate = formatDate(getLastDate(dates));
  const prefix   = getPrefix(section);

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