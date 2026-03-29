import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import JobListingGrid from '@/components/JobListingGrid';
import { getJobs } from '@/lib/blogger';
import styles from '@/components/ListingPage.module.css';
import Link from 'next/link';
import { categories } from '@/data/homeData';
export const revalidate = 86400;
export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  const label = cat ? cat.label : slug;
  return {
    title: `${label} 2026 | Latest ${label} Notifications - Sidhe Naukri`,
    description: `${label} की सभी latest vacancies, admit card, result और syllabus की जानकारी।`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  const label = cat ? cat.label : slug;

  const all = await getJobs();

  // tags ya title me category match karo
  const filtered = all.filter((job) => {
    const tags = (job.tags || []).join(' ').toLowerCase();
    const title = (job.title || '').toLowerCase();
    return tags.includes(slug) || title.includes(slug);
  });

  return (
    <div className={styles.wrap}>
      <Navbar />
      <PageHero
        title={label}
        subtitle={`${label} की सभी latest vacancies यहाँ देखें`}
        count={filtered.length}
      />
      <div className={styles.container}>
        <p className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/jobs">Latest Jobs</Link>
          <span>›</span>
          {label}
        </p>
        <JobListingGrid jobs={filtered} section="jobs" />
      </div>
      <Footer />
    </div>
  );
}