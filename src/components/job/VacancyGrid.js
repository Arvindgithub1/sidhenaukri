import styles from './VacancyGrid.module.css';

function SingleGrid({ data }) {
  if (!data?.rows?.length && !data?.oneline?.length) return null;
  const { columns = [], rows = [], oneline = [] } = data;
  return (
    <div className={styles.wrap}>
      {rows.length > 0 && (
        <table className={styles.table}>
          {columns.length > 0 && (
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className={styles.th}>{col}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                {row.map((cell, j) => (
                  <td key={j} className={j === 0 ? styles.tdLabel : styles.tdValue}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {oneline.length > 0 && (
        <div className={styles.oneline}>
          {oneline.map((item, i) => (
            <span key={i} className={styles.onelineItem}>{item}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function VacancyGrid({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) return null;
  return (
    <>
      {data.map((grid, i) => (
        <SingleGrid key={i} data={grid} />
      ))}
    </>
  );
}