// src/app/jobs/[slug]/page.js
import { getJobs, getItemBySlug } from '@/lib/blogger';
import DetailPageLayout from '@/components/job/DetailPageLayout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/components/job/DetailPageLayout.module.css';

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({ slug: String(job.id) }));
}

export async function generateMetadata({ params }) {
  const job = await getItemBySlug('Jobs', params.slug);
  if (!job) return { title: 'Job Not Found' };
  return {
    title: `${job.title} | Sidhe Naukri`,
    description: `${job.title} — vacancy, dates, eligibility aur apply link yahan dekho.`,
  };
}

export default async function JobDetailPage({ params }) {
  const job = await getItemBySlug('Jobs', params.slug);

  if (!job) {
    return (
      <div className={styles.page}>
        <Navbar />
        <p className={styles.notFound}>Job not found.</p>
        <Footer />
      </div>
    );
  }

  return <DetailPageLayout item={job} breadcrumbLabel="Latest Jobs" />;
}
