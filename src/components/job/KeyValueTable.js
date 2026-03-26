import { formatDate } from '@/lib/formatDate';
import styles from './KeyValueTable.module.css';

function formatLabel(key) {
  return key.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function renderValue(key, value, showRupee) {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'string' && value.startsWith('http')) {
    return <a href={value} target="_blank" rel="noopener noreferrer" className={styles.link}>Click Here ›</a>;
  }
  if (typeof value === 'string' && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)) {
    return formatDate(value);
  }
  if (showRupee && (typeof value === 'number' || !isNaN(Number(value)))) {
    const num = Number(value);
    return num === 0 ? <span className={styles.free}>Free</span> : `₹ ${num}`;
  }
  return String(value);
}

function renderFeeValue(val) {
  if (val === null || val === undefined || val === '') return '—';
  if (val === 0 || val === '0' || Number(val) === 0) return <span className={styles.free}>Free</span>;
  if (!isNaN(Number(val))) return `₹ ${Number(val)}`;
  return String(val); // text as-is
}

// Application Fee
function FeeTable({ fee }) {
  if (!fee || typeof fee !== 'object') return null;
  const mainKeys = ['general', 'obc', 'sc', 'st'];
  const mainRows = mainKeys.filter(k => fee[k] !== undefined && fee[k] !== null && fee[k] !== '');
  const morecast = Array.isArray(fee.morecast) ? fee.morecast.filter(m => m.label) : [];
  const oneline  = Array.isArray(fee.oneline)  ? fee.oneline.filter(Boolean) : [];

  return (
    <>
      <table className={styles.table}>
        <tbody>
          {mainRows.map(key => (
            <tr key={key}>
              <td className={styles.labelCell}>{formatLabel(key)}</td>
              <td className={styles.valueCell}>{renderFeeValue(fee[key])}</td>
            </tr>
          ))}
          {morecast.map((m, i) => (
            <tr key={`more-${i}`}>
              <td className={styles.labelCell}>{m.label}</td>
              <td className={styles.valueCell}>{renderFeeValue(m.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {oneline.length > 0 && (
        <div className={styles.oneline}>
          {oneline.map((item, i) => (
            <span key={i} className={styles.onelineItem}>{item}</span>
          ))}
        </div>
      )}
    </>
  );
}

// Age Limit — {rows, oneline} structure
function AgeTable({ data }) {
  if (!data) return null;

  // Naya format — {rows: [{title, age}], oneline: []}
  if (data.rows && Array.isArray(data.rows)) {
    const oneline = Array.isArray(data.oneline) ? data.oneline.filter(Boolean) : [];
    return (
      <>
        <table className={styles.table}>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i}>
                <td className={styles.labelCell}>{row.title}</td>
                <td className={styles.valueCell}>{row.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {oneline.length > 0 && (
          <div className={styles.oneline}>
            {oneline.map((item, i) => (
              <span key={i} className={styles.onelineItem}>{item}</span>
            ))}
          </div>
        )}
      </>
    );
  }

  // Old array format [{title, age}]
  if (Array.isArray(data) && data.length > 0) {
    return (
      <table className={styles.table}>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className={styles.labelCell}>{row.title}</td>
              <td className={styles.valueCell}>{row.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return null;
}

// Main export
export default function KeyValueTable({ data = {}, showRupee = false, type = '' }) {
  if (type === 'fee') return <FeeTable fee={data} />;
  if (type === 'age') return <AgeTable data={data} />;

  // Auto detect fee
  if (data && typeof data === 'object' && !Array.isArray(data) && 
      ('general' in data || 'obc' in data) && ('morecast' in data || 'oneline' in data)) {
    return <FeeTable fee={data} />;
  }

  // Auto detect age
  if (data && typeof data === 'object' && !Array.isArray(data) && 'rows' in data) {
    return <AgeTable data={data} />;
  }
  if (Array.isArray(data) && data.length > 0 && data[0]?.title && data[0]?.age) {
    return <AgeTable data={data} />;
  }

  // Normal key-value table
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;

  const rows = Object.entries(data).filter(
    ([, v]) => v !== null && v !== undefined && v !== '' && !Array.isArray(v) && typeof v !== 'object'
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