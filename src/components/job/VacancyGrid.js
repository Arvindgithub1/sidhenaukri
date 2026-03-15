import styles from './VacancyGrid.module.css';

function SingleGrid({ data }) {
  if (!data?.rows?.length) return null;
  const { columns = [], rows = [] } = data;
  return (
    <div className={styles.wrap}>
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
