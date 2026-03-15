import Link from 'next/link';
import { categories } from '@/data/homeData';
import styles from './CategoryGrid.module.css';

// limit — homepage pe 6, category page pe sab
export default function CategoryGrid({ limit }) {
  const items = limit ? categories.slice(0, limit) : categories;

  return (
    <div className={styles.grid}>
      {items.map((cat) => (
        <Link key={cat.id} href={`/category/${cat.slug}`} className={styles.item}>
          <div className={styles.iconWrap}>
            <span className={styles.icon}>{cat.icon}</span>
          </div>
          <span className={styles.label}>{cat.label}</span>
        </Link>
      ))}
    </div>
  );
}