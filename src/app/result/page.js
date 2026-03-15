import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import JobListingGrid from '@/components/JobListingGrid';
import { getJobs } from '@/lib/blogger';
import styles from '@/components/ListingPage.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Latest Exam Results 2026 | सभी सरकारी परीक्षाओं के परिणाम - Sidhe Naukri',
  description: 'SSC, Railway, UPSC, और State Govt Exams के रिजल्ट और मेरिट लिस्ट (Merit List) यहाँ देखें। अपना रिजल्ट सबसे तेज़ और सीधे लिंक से डाउनलोड करें।',
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