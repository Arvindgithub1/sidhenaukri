import styles from './KeyValueTable.module.css';

// DD/MM/YYYY → "12 Mar 2026"
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

// "notification_release" → "Notification Release"
function formatLabel(key) {
  return key.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Value render — date, url, number, free
function renderValue(key, value, showRupee) {
  if (value === null || value === undefined || value === '') return '—';

  // URL
  if (typeof value === 'string' && value.startsWith('http')) {
    return (
      <a href={value} target="_blank" rel="noopener noreferrer" className={styles.link}>
        Click Here ›
      </a>
    );
  }

  // Date — DD/MM/YYYY format
  if (typeof value === 'string' && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)) {
    return formatDate(value);
  }

  // Fee
  if (showRupee && typeof value === 'number') {
    return value === 0
      ? <span className={styles.free}>Free</span>
      : `₹ ${value}`;
  }

  return String(value);
}

export default function KeyValueTable({ data = {}, showRupee = false }) {
  const rows = Object.entries(data).filter(
    ([, v]) => v !== null && v !== undefined && v !== ''
  );

  if (rows.length === 0) return null;

  return (
    <table className={styles.table}>
      <tbody>
        {rows.map(([key, value]) => (
          <tr key={key}>
            <td className={styles.labelCell}>{formatLabel(key)}</td>
            <td className={styles.valueCell}>{renderValue(key, value, showRupee)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
