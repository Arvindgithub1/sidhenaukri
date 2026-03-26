import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import JobListingGrid from '@/components/JobListingGrid';
import { getJobs } from '@/lib/blogger';
import styles from '@/components/ListingPage.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Admit Card 2026 - Download Hall Ticket & Exam Dates | Sidhe Naukri',
  description: 'Latest Admit Card और Exam City की जानकारी सबसे पहले। SSC, Railway, Bank और Police Exam Admit Card डाउनलोड करें Sidhe Naukri से।',
};



export default async function AdmitCardPage() {
  const all = await getJobs();
  const admitCards = all.filter(j => j.category?.toLowerCase() === 'admit-card');
  return (
    <div className={styles.wrap}>
      <Navbar />
      <PageHero title="Admit Card 2026" subtitle="Apna admit card yahan se download karo" count={admitCards.length} />
      <div className={styles.container}>
        <p className={styles.breadcrumb}><Link href="/">Home</Link><span>›</span> Admit Card</p>
        <JobListingGrid jobs={admitCards} section="admit-card" />
      </div>
      <Footer />
    </div>
  );
}