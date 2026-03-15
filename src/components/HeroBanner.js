import { quickTags } from '@/data/homeData';
import styles from './HeroBanner.module.css';
import Link from 'next/link';

const GRADIENTS = [
  'linear-gradient(135deg, #1a3fa3, #2d5be3)',
  'linear-gradient(135deg, #0d2470, #1a3fa3)',
  'linear-gradient(135deg, #2e7d32, #43a047)',
  'linear-gradient(135deg, #0277bd, #29b6f6)',
  'linear-gradient(135deg, #1565c0, #42a5f5)',
  'linear-gradient(135deg, #6a1b9a, #ab47bc)',
  'linear-gradient(135deg, #c62828, #ef5350)',
  'linear-gradient(135deg, #00695c, #26a69a)',
];

export default function HeroBanner() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          Latest Government Jobs <span className={styles.highlight}>in India 2026</span>
        </h1>
        <div className={styles.tags}>
          {quickTags.map((tag, i) => (
            <Link
              key={tag.slug}
              href={`/category/${tag.slug}`}
              className={styles.tag}
              style={{ background: GRADIENTS[i % GRADIENTS.length] }}
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}