import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CategoryGrid from '@/components/CategoryGrid';
import styles from '@/components/ListingPage.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Browse Jobs by Category | Sidhe Naukri',
  description: 'SSC, Railway, Bank, Police, Teaching, Defence, Medical सभी categories की सरकारी नौकरियां एक जगह।',
};

export default function CategoryListPage() {
  return (
    <div className={styles.wrap}>
      <Navbar />
      <PageHero
        title="Browse Jobs by Category"
        subtitle="अपनी पसंद की category चुनें और latest jobs देखें"
      />
      <div className={styles.container}>
        <p className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>›</span> Category
        </p>
        <div style={{ padding: '16px 0' }}>
          <CategoryGrid />
        </div>
      </div>
      <Footer />
    </div>
  );
}