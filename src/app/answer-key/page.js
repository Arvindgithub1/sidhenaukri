import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import JobListingGrid from '@/components/JobListingGrid';
import { getJobs } from '@/lib/blogger';
import styles from '@/components/ListingPage.module.css';
import Link from 'next/link';
export const revalidate = 86400;
export const metadata = {
  title: 'Answer Key 2026 - Latest Govt Exam Answer Key & PDF | Sidhe Naukri',
  description: 'सभी सरकारी परीक्षाओं की Official Answer Key यहाँ से डाउनलोड करें। Get latest updates on Exam Solutions, Question Papers and Objection Links on Sidhe Naukri.',
};

export default async function AnswerKeyPage() {
  const all = await getJobs();
  const answerKeys = all.filter(j => j.category?.toLowerCase() === 'answer-key');
  return (
    <div className={styles.wrap}>
      <Navbar />
      <PageHero title="Answer Key 2026" subtitle="Apne exam ki answer key yahan check karo" count={answerKeys.length} />
      <div className={styles.container}>
        <p className={styles.breadcrumb}><Link href="/">Home</Link><span>›</span> Answer Key</p>
        <JobListingGrid jobs={answerKeys} section="answer-key" />
      </div>
      <Footer />
    </div>
  );
}