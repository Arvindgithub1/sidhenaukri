import Link from 'next/link';
import styles from './JobListingGrid.module.css';

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    const parts = String(dateStr).split('/');
    if (parts.length === 3) {
      const d = new Date(`${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`);
      if (isNaN(d)) return dateStr;
      return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    return dateStr;
  } catch { return dateStr; }
}

function getPrefix(section) {
  if (section === 'result')     return '/result';
  if (section === 'admit-card') return '/admit-card';
  if (section === 'answer-key') return '/answer-key';
  if (section === 'syllabus')   return '/syllabus';
  return '/jobs';
}

function JobCard({ job, section }) {
  const prefix      = getPrefix(section);
  const postDate    = formatDate(job.created_at);
  const lastDate    = formatDate(job.important_dates?.last_date);
  const releaseDate =
    section === 'result'     ? formatDate(job.result?.release_date) :
    section === 'admit-card' ? formatDate(job.admit_card?.release_date) :
    section === 'answer-key' ? formatDate(job.answer_key?.release_date) :
    null;

  // Status badge
  const status =
    section === 'result'     ? job.result?.status :
    section === 'admit-card' ? job.admit_card?.status :
    section === 'answer-key' ? job.answer_key?.status :
    null;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{job.title}</h3>
      <div className={styles.meta}>
        {job.organization && <span className={styles.org}>🏛 {job.organization}</span>}
        {job.total_vacancy && <span className={styles.vacancy}>📋 {job.total_vacancy} Posts</span>}
        {status && <span className={styles.status}>{status}</span>}
      </div>
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

export default function JobListingGrid({ jobs, section }) {
  if (!jobs || jobs.length === 0) {
    return <div className={styles.empty}><p>Abhi koi data available nahi hai।</p></div>;
  }
  return (
    <div className={styles.grid}>
      {jobs.map((job) => (
        <JobCard key={job.key} job={job} section={section} />
      ))}
    </div>
  );
}