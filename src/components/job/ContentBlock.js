import styles from './ContentBlock.module.css';

function SingleBlock({ data }) {
  if (!data?.title) return null;
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
