import styles from './ContentBlock.module.css';

function SingleBlock({ data }) {
  if (!data?.title) return null;
  const oneline = Array.isArray(data.oneline) ? data.oneline.filter(Boolean) : [];
  return (
    <div className={styles.wrap}>
      {Array.isArray(data.content) && data.content.length > 0 && (
        <ul className={styles.list}>
          {data.content.map((point, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.dot}>•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
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

export default function ContentBlock({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) return null;
  return (
    <>
      {data.map((block, i) => (
        <SingleBlock key={i} data={block} />
      ))}
    </>
  );
}