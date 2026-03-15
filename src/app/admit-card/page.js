import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import JobListingGrid from '@/components/JobListingGrid';
import { getJobs } from '@/lib/blogger';
import styles from '@/components/ListingPage.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Admit Card 2026 | परीक्षा प्रवेश पत्र डाउनलोड करें - Sidhe Naukri',
  description: 'सभी प्रतियोगी परीक्षाओं के एडमिट कार्ड (Admit Cards) और हॉल टिकट डाउनलोड करने का सीधा लिंक। अपनी परीक्षा की तारीख और केंद्र यहाँ चेक करें।',
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