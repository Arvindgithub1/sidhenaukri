import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import JobListingGrid from '@/components/JobListingGrid';
import { getJobs } from '@/lib/blogger';
import styles from '@/components/ListingPage.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Latest Govt Jobs 2026 - नई सरकारी भर्तियां और Online Form | Sidhe Naukri',
  description: 'सभी नवीनतम सरकारी नौकरियों (Latest Vacancies) की लिस्ट यहाँ देखें। SSC, Railway, Bank और State Govt जॉब्स के ऑनलाइन फॉर्म भरने की पूरी जानकारी और डायरेक्ट लिंक सबसे पहले पाएं।',
};

export default async function JobsPage() {
  const all  = await getJobs();
  const jobs = all.filter(j => j.category?.toLowerCase() === 'jobs');
  return (
    <div className={styles.wrap}>
      <Navbar />
      <PageHero title="Latest Government Jobs 2026" subtitle="Sarkari naukri ki sabhi latest notifications" count={jobs.length} />
      <div className={styles.container}>
        <p className={styles.breadcrumb}><Link href="/">Home</Link><span>›</span> Latest Jobs</p>
        <JobListingGrid jobs={jobs} section="jobs" />
      </div>
      <Footer />
    </div>
  );
}