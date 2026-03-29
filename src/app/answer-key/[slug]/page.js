// src/app/answer-key/[slug]/page.js
import { getJobs, getJobById } from '@/lib/blogger';
import { generatePostMetadata } from '@/lib/metadata';
import DetailPageLayout from '@/components/job/DetailPageLayout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/components/job/DetailPageLayout.module.css';
export const revalidate = 86400;
export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({ slug: String(job.id) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getJobById(slug);
  if (!item) return { title: 'Not Found | Sidhe Naukri' };
  return generatePostMetadata(item);
}

export default async function DetailPage({ params }) {
  const { slug } = await params;
  const item = await getJobById(slug);
  if (!item) {
    return (
      <div className={styles.page}>
        <Navbar />
        <p className={styles.notFound}>Data not found.</p>
        <Footer />
      </div>
    );
  }
  return <DetailPageLayout item={item} section="answer-key" />;
}