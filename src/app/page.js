import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import MobileTabBar from '@/components/MobileTabBar';
import SectionWrapper from '@/components/SectionWrapper';
import ApplyCard from '@/components/ApplyCard';
import CategoryGrid from '@/components/CategoryGrid';
import Footer from '@/components/Footer';
import { getJobs } from '@/lib/blogger';
import styles from './page.module.css';

// Case-insensitive category match

const isCategory = (job, cat) =>
  job.category?.toLowerCase() === cat.toLowerCase();

export default async function Home() {
  const allJobs = await getJobs();

  const jobs      = allJobs.filter(j => isCategory(j, 'jobs'));
  const results   = allJobs.filter(j => isCategory(j, 'result'));
  const admitCards= allJobs.filter(j => isCategory(j, 'admit-card'));
  const answerKeys= allJobs.filter(j => isCategory(j, 'answer-key'));

  return (
    <div className={styles.page}>
      <Navbar />
      <MobileTabBar />
      <HeroBanner />

      <main className={styles.main}>

        <div id="section-jobs">
          <SectionWrapper title="Latest Job Openings" viewAllLink="/jobs">
            <div className={styles.cardGrid}>
              {jobs.slice(0, 8).map((job) => (
                <ApplyCard key={job.id} job={job} section="jobs" />
              ))}
            </div>
          </SectionWrapper>
        </div>

        <div id="section-category">
          <SectionWrapper title="Browse Jobs by Category" viewAllLink="/category">
            <CategoryGrid limit={6} />
          </SectionWrapper>
        </div>

        <div id="section-results">
          <SectionWrapper title="Latest Results" viewAllLink="/results">
            <div className={styles.cardGrid}>
              {results.slice(0, 8).map((job) => (
                <ApplyCard key={job.id} job={job} section="result" />
              ))}
            </div>
          </SectionWrapper>
        </div>

        <div id="section-admitcard">
          <SectionWrapper title="Admit Cards" viewAllLink="/admit-card">
            <div className={styles.cardGrid}>
              {admitCards.slice(0, 8).map((job) => (
                <ApplyCard key={job.id} job={job} section="admit-card" />
              ))}
            </div>
          </SectionWrapper>
        </div>

        <div id="section-answerkey">
          <SectionWrapper title="Answer Key" viewAllLink="/answer-key">
            <div className={styles.cardGrid}>
              {answerKeys.slice(0, 8).map((job) => (
                <ApplyCard key={job.id} job={job} section="answer-key" />
              ))}
            </div>
          </SectionWrapper>
        </div>

        <div id="section-syllabus">
          <SectionWrapper title="Syllabus" viewAllLink="/syllabus">
            <div className={styles.cardGrid}>
              {allJobs.filter(j => j.category?.toLowerCase() === 'syllabus').slice(0, 8).map((job) => (
                <ApplyCard key={job.id} job={job} section="syllabus" />
              ))}
            </div>
          </SectionWrapper>
        </div>

      </main>
      <Footer />
    </div>
  );
}