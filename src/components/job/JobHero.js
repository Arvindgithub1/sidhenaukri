import styles from './JobHero.module.css';

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

const CAT_COLORS = {
  'jobs':       { bg: '#e8f5e9', color: '#2e7d32' },
  'result':     { bg: '#fff3e0', color: '#e67e22' },
  'admit-card': { bg: '#e3f2fd', color: '#1565c0' },
  'answer-key': { bg: '#fce4ec', color: '#c62828' },
};

export default function JobHero({ job }) {
  const cat      = (job.category || '').toLowerCase();
  const catStyle = CAT_COLORS[cat] || { bg: '#eef1fb', color: '#1a3fa3' };
  const lastDate = formatDate(job.important_dates?.last_date);
  const postDate = formatDate(job.created_at || job.important_dates?.apply_start);

  return (
    <div className={styles.hero}>

      {/* Category Tag */}
      <span className={styles.catTag} style={{ background: catStyle.bg, color: catStyle.color }}>
        {job.category}
      </span>

      {/* Title */}
      <h1 className={styles.title}>{job.title}</h1>

      {/* Badges */}
      <div className={styles.badges}>
        {job.total_vacancy && (
          <span className={styles.badgeBlue}>📋 {Number(job.total_vacancy).toLocaleString()} Posts</span>
        )}
        {lastDate && (
          <span className={styles.badgeOrange}>📅 Last Date: {lastDate}</span>
        )}
        {job.qualification && (
          <span className={styles.badgeGreen}>🎓 {job.qualification}</span>
        )}
        {job.job_location && (
          <span className={styles.badgeGray}>📍 {job.job_location}</span>
        )}
      </div>

      {/* Meta */}
      <ul className={styles.meta}>
        {postDate          && <li><span className={styles.dot}>●</span> Post Date: <strong>{postDate}</strong></li>}
        {job.organization  && <li><span className={styles.dot}>●</span> Organization: <strong>{job.organization}</strong></li>}
        {job.post_name     && <li><span className={styles.dot}>●</span> Post Name: <strong>{job.post_name}</strong></li>}
        {job.total_vacancy && <li><span className={styles.dot}>●</span> Total Vacancy: <strong>{job.total_vacancy}</strong></li>}
      </ul>

    </div>
  );
}
