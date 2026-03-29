import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import JobListingGrid from '@/components/JobListingGrid';
import { getJobs } from '@/lib/blogger';
import styles from '@/components/ListingPage.module.css';
import Link from 'next/link';
export const revalidate = 86400;

export const metadata = {
  title: 'Sarkari Result 2026 - Latest Exam Results & Merit List | Sidhe Naukri',
  description: 'सभी सरकारी परीक्षाओं के Latest Results और Merit List यहाँ चेक करें। Get direct link for State & Central Govt Job Results on Sidhe Naukri.',
};

export default async function ResultPage() {
  const all = await getJobs();
  const results = all.filter(j => j.category?.toLowerCase() === 'result');
  return (
    <div className={styles.wrap}>
      <Navbar />
      <PageHero title="Latest Sarkari Results 2026" subtitle="Apna result yahan check karo" count={results.length} />
      <div className={styles.container}>
        <p className={styles.breadcrumb}><Link href="/">Home</Link><span>›</span> Result</p>
        <JobListingGrid jobs={results} section="result" />
      </div>
      <Footer />
    </div>
  );
}