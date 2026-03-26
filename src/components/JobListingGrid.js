import Link from 'next/link';
import { formatDate } from '@/lib/formatDate';
import styles from './JobListingGrid.module.css';

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
        <JobCard key={job.id} job={job} section={section} />
      ))}
    </div>
  );
}