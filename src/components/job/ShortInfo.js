import { formatDate } from '@/lib/formatDate';
import styles from './ShortInfo.module.css';

export default function ShortInfo({ item }) {
  if (!item) return null;

  const parts = [];

  if (item.organization && item.title) {
    parts.push(`${item.organization} has released the official notification for <strong>${item.title}</strong>.`);
  } else if (item.title) {
    parts.push(`Official notification for <strong>${item.title}</strong> has been released.`);
  }

  if (item.total_vacancy) {
    parts.push(`A total of <strong>${Number(item.total_vacancy).toLocaleString()} vacancies</strong> are available.`);
  }

  if (Array.isArray(item.post_name) && item.post_name.length > 0) {
    const postNames = [];
    item.post_name.forEach((table) => {
      if (Array.isArray(table.rows)) table.rows.forEach((row) => { if (row[0]) postNames.push(row[0]); });
    });
    if (postNames.length > 0) parts.push(`The available posts are: <strong>${postNames.join(', ')}</strong>.`);
  }

  if (Array.isArray(item.qualification1) && item.qualification1.length > 0) {
    parts.push(`Candidates with <strong>${item.qualification1.join(', ')}</strong> qualification are eligible to apply.`);
  }

  // Age Limit — naya {rows, oneline} format
  if (item.age_limit?.rows && Array.isArray(item.age_limit.rows) && item.age_limit.rows.length > 0) {
    const ageStr = item.age_limit.rows.map(a => `${a.title}: ${a.age}`).join(', ');
    parts.push(`Age limit — <strong>${ageStr}</strong>.`);
  } else if (Array.isArray(item.age_limit) && item.age_limit.length > 0) {
    // Old array format
    const ageStr = item.age_limit.map(a => `${a.title}: ${a.age}`).join(', ');
    parts.push(`Age limit — <strong>${ageStr}</strong>.`);
  }

  if (item.job_location) {
    parts.push(`This vacancy is applicable for <strong>${item.job_location}</strong>.`);
  }

  const applyStart = formatDate(item.important_dates?.apply_start);
  const lastDate   = formatDate(item.important_dates?.last_date);
  const examDate   = formatDate(item.important_dates?.exam_date);
  const resultDate = formatDate(item.important_dates?.result_date);
  const admitDate  = formatDate(item.important_dates?.admit_card_date);

  if (applyStart && lastDate) {
    parts.push(`The online application starts from <strong>${applyStart}</strong> and the last date to apply is <strong>${lastDate}</strong>.`);
  } else if (lastDate) {
    parts.push(`The last date to apply is <strong>${lastDate}</strong>.`);
  }

  if (examDate)   parts.push(`The examination is scheduled on <strong>${examDate}</strong>.`);
  if (resultDate) parts.push(`The result is expected to be declared on <strong>${resultDate}</strong>.`);

  if (item.result?.download_result)         parts.push(`The result has been declared and is now available for download.`);
  if (item.admit_card?.download_admit_card) {
    if (admitDate) parts.push(`The admit card is available for download from <strong>${admitDate}</strong>.`);
    else           parts.push(`The admit card is now available for download.`);
  }
  if (item.answer_key?.download_answer_key) parts.push(`The official answer key has been released and is available for download.`);
  if (item.syllabus?.download_syllabus)     parts.push(`The official syllabus PDF is available for download.`);

  if (parts.length === 0) return null;

  return (
    <p className={styles.text} dangerouslySetInnerHTML={{ __html: parts.join(' ') }} />
  );
}