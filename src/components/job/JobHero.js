import Link from 'next/link';
import { formatDate } from '@/lib/formatDate';
import { categories } from '@/data/homeData';
import styles from './JobHero.module.css';

const CAT_COLORS = {
  'jobs':       { bg: '#e8f5e9', color: '#2e7d32' },
  'result':     { bg: '#fff3e0', color: '#e67e22' },
  'admit-card': { bg: '#e3f2fd', color: '#1565c0' },
  'answer-key': { bg: '#fce4ec', color: '#c62828' },
  'syllabus':   { bg: '#f3e5f5', color: '#6a1b9a' },
};

// Theme se milte julte gradients
const TAG_GRADIENTS = [
  'linear-gradient(135deg, #4a6fd4, #7b9ef0)',
  'linear-gradient(135deg, #5b8dd9, #89b4f0)',
  'linear-gradient(135deg, #4caf7d, #76c99a)',
  'linear-gradient(135deg, #42a5c8, #6ec6e3)',
  'linear-gradient(135deg, #9575cd, #b39ddb)',
  'linear-gradient(135deg, #e57373, #ef9a9a)',
  'linear-gradient(135deg, #f0a04b, #f5c07a)',
  'linear-gradient(135deg, #4db6a8, #80cbc4)',
];

function getTagInfo(tag) {
  const cat = categories.find(c => c.slug === tag.toLowerCase().replace(/\s+/g, '-'));
  return cat
    ? { icon: cat.icon, label: cat.label, slug: cat.slug, hasIcon: true }
    : { icon: null, label: tag, slug: tag.toLowerCase().replace(/\s+/g, '-'), hasIcon: false };
}

export default function JobHero({ job }) {
  const cat      = (job.category || '').toLowerCase();
  const catStyle = CAT_COLORS[cat] || { bg: '#eef1fb', color: '#1a3fa3' };
  const lastDate = formatDate(job.important_dates?.last_date);
  const postDate = formatDate(job.created_at || job.important_dates?.apply_start);

  const genericTags = ['govt jobs', 'sarkari naukri', 'result', 'admit-card', 'answer-key'];
  const displayTags = Array.isArray(job.tags)
    ? job.tags.filter(t => !genericTags.includes(t.toLowerCase())).slice(0, 4)
    : [];

  return (
    <div className={styles.hero}>

      <span className={styles.catTag} style={{ background: catStyle.bg, color: catStyle.color }}>
        {job.category}
      </span>

      <h1 className={styles.title}>{job.title}</h1>

      <div className={styles.badges}>
        {job.total_vacancy && (
          <span className={styles.badgeBlue}>📋 {Number(job.total_vacancy).toLocaleString()} Posts</span>
        )}
        {lastDate && (
          <span className={styles.badgeOrange}>📅 Last Date: {lastDate}</span>
        )}
        {job.job_location && (
          <span className={styles.badgeGray}>📍 {job.job_location}</span>
        )}
      </div>

      {/* Clickable Tag Badges */}
      {displayTags.length > 0 && (
        <div className={styles.tagBadges}>
          {displayTags.map((tag, i) => {
            const info = getTagInfo(tag);
            const gradient = TAG_GRADIENTS[i % TAG_GRADIENTS.length];
            return (
              <Link
                key={i}
                href={`/category/${info.slug}`}
                className={styles.tagBadge}
                style={{ background: gradient }}
              >
                {info.hasIcon && <span className={styles.tagIcon}>{info.icon}</span>}
                <span className={styles.tagLabel}>{info.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      <ul className={styles.meta}>
        {postDate          && <li><span className={styles.dot}>●</span> Post Date: <strong>{postDate}</strong></li>}
        {job.organization  && <li><span className={styles.dot}>●</span> Organization: <strong>{job.organization}</strong></li>}
        {job.total_vacancy && <li><span className={styles.dot}>●</span> Total Vacancy: <strong>{job.total_vacancy}</strong></li>}
      </ul>

    </div>
  );
}