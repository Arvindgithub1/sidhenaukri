import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import JobListingGrid from '@/components/JobListingGrid';
import { getJobs } from '@/lib/blogger';
import styles from '@/components/ListingPage.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Admission 2026 | Sidhe Naukri',
  description: 'Latest college aur university admissions 2026 — B.Ed, MBA, Engineering, Medical aur sabhi courses ke admission notifications yahan dekho.',
};

export default async function AdmissionPage() {
  // TODO: Replace with getAdmissions() when separate API ready
  const jobs = await getJobs();

  return (
    <div className={styles.wrap}>
      <Navbar />
      <PageHero
        title="Admission 2026"
        subtitle="Latest college aur university admissions ek jagah — B.Ed, MBA, Engineering aur aur bhi"
        count={jobs.length}
      />
      <div className={styles.container}>
        <p className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>›</span> Admission
        </p>
        <JobListingGrid jobs={jobs} />
      </div>
      <Footer />
    </div>
  );
}
