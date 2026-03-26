import styles from './ImportantLinks.module.css';

function formatLabel(key) {
  return key.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// URL fix — https:// nahi hai to add karo
function fixUrl(url) {
  if (!url) return '#';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return 'https://' + trimmed;
}

export default function ImportantLinks({ item = {}, section = '' }) {
  const allLinks = [];

  // Category-specific primary links
  if (item.jobs?.apply_online)
    allLinks.push({ key: 'apply_online', label: 'Apply Online', url: fixUrl(item.jobs.apply_online), cls: 'btnGreen' });
  if (item.result?.download_result)
    allLinks.push({ key: 'download_result', label: 'Download Result', url: fixUrl(item.result.download_result), cls: 'btnOrange' });
  if (item.admit_card?.download_admit_card)
    allLinks.push({ key: 'download_admit_card', label: 'Download Admit Card', url: fixUrl(item.admit_card.download_admit_card), cls: 'btnBlue' });
  if (item.answer_key?.download_answer_key)
    allLinks.push({ key: 'download_answer_key', label: 'Download Answer Key', url: fixUrl(item.answer_key.download_answer_key), cls: 'btnBlue' });
  if (item.syllabus?.download_syllabus)
    allLinks.push({ key: 'download_syllabus', label: 'Download Syllabus', url: fixUrl(item.syllabus.download_syllabus), cls: 'btnGreen' });

  // Saare important_links
  if (item.important_links && typeof item.important_links === 'object') {
    Object.entries(item.important_links).forEach(([key, url]) => {
      if (url && typeof url === 'string' && url.trim() !== '') {
        allLinks.push({ key: 'imp_' + key, label: formatLabel(key), url: fixUrl(url), cls: 'btnBlue' });
      }
    });
  }

  if (allLinks.length === 0) return null;

  return (
    <div className={styles.listWrap}>
      <table className={styles.table}>
        <tbody>
          {allLinks.map((l) => (
            <tr key={l.key} className={styles.row}>
              <td className={styles.label}>
                <span className={styles.dot}>●</span>
                {l.label}
              </td>
              <td className={styles.btnCell}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles[l.cls]}`}
                  title={l.label}
                >
                  Click Here ›
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}