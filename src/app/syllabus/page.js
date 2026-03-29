import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import JobListingGrid from '@/components/JobListingGrid';
import { getJobs } from '@/lib/blogger';
import styles from '@/components/ListingPage.module.css';
import Link from 'next/link';
export const revalidate = 86400;

export const metadata = {
  title: 'Exam Syllabus 2026 - Latest Pattern & PDF Download | Sidhe Naukri',
  description: 'New Govt Job Syllabus और Exam Pattern PDF में डाउनलोड करें। तैयारी के लिए Subject-wise Topics और Selection Process की पूरी जानकारी।',
};

export default async function SyllabusPage() {
  const all = await getJobs();
  const syllabus = all.filter(j => j.category?.toLowerCase() === 'syllabus');
  return (
    <div className={styles.wrap}>
      <Navbar />
      <PageHero title="Syllabus 2026" subtitle="Exam ki taiyari ke liye syllabus yahan dekho" count={syllabus.length} />
      <div className={styles.container}>
        <p className={styles.breadcrumb}><Link href="/">Home</Link><span>›</span> Syllabus</p>
        <JobListingGrid jobs={syllabus} section="syllabus" />
      </div>
      <Footer />
    </div>
  );
}