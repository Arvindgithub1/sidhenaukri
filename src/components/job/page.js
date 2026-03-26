import { getJobById, getJobs } from '@/lib/blogger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

import Breadcrumb       from '@/components/job/Breadcrumb';
import JobHero          from '@/components/job/JobHero';
import SectionBlock     from '@/components/job/SectionBlock';
import DatesTable       from '@/components/job/DatesTable';
import FeeTable         from '@/components/job/FeeTable';
import VacancyTable     from '@/components/job/VacancyTable';
import AgeLimit         from '@/components/job/AgeLimit';
import SelectionProcess from '@/components/job/SelectionProcess';
import ImportantLinks   from '@/components/job/ImportantLinks';
import AdSlot           from '@/components/job/AdSlot';


// Helper — check if object has at least one non-null value
function hasData(obj) {
  if (!obj) return false;
  if (Array.isArray(obj)) return obj.length > 0;
  return Object.values(obj).some((v) => v !== null && v !== undefined && v !== '');
}

export default async function JobDetailPage({ params }) {
  const job = await getJobById(params.id);

  if (!job) {
    return (
      <div className={styles.page}>
        <Navbar />
        <p className={styles.notFound}>Job not found.</p>
        <Footer />
      </div>
    );
  }

  // Category se determine karo — ye kis type ka page hai
  const cat = (job.category || '').toLowerCase();
  const isResult    = cat === 'result';
  const isAdmitCard = cat === 'admit-card';
  const isAnswerKey = cat === 'answer-key';
  const isJob       = cat === 'jobs' || (!isResult && !isAdmitCard && !isAnswerKey);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>

        {/* Breadcrumb */}
        <Breadcrumb items={['Home', job.category || 'Jobs', job.title]} />

        {/* Hero — flexible based on available data */}
        <JobHero job={job} />

        {/* Ad */}
        <AdSlot />

        {/* Important Dates — sirf tab dikhe jab data ho */}
        {hasData(job.important_dates) && (
          <SectionBlock title="Important Dates">
            <DatesTable dates={job.important_dates} />
          </SectionBlock>
        )}

        {/* Application Fee — sirf Jobs ke liye */}
        {isJob && hasData(job.application_fee) && (
          <SectionBlock title="Application Fee">
            <FeeTable fee={job.application_fee} />
          </SectionBlock>
        )}

        {/* Age Limit — sirf Jobs ke liye */}
        {isJob && hasData(job.age_limit) && (
          <SectionBlock title="Age Limit">
            <AgeLimit age={job.age_limit} />
          </SectionBlock>
        )}

        {/* Vacancy Details — sirf Jobs ke liye */}
        {isJob && (job.total_vacancy || hasData(job.vacancy_details)) && (
          <SectionBlock title="Vacancy Details">
            <VacancyTable
              postName={job.post_name}
              total={job.total_vacancy}
              details={job.vacancy_details}
            />
          </SectionBlock>
        )}

        {/* Selection Process — Jobs aur Results ke liye */}
        {(isJob || isResult) && hasData(job.selection_process) && (
          <SectionBlock title="Selection Process">
            <SelectionProcess steps={job.selection_process} />
          </SectionBlock>
        )}

        {/* Important Links — har category ke liye, jo link available ho wahi dikhe */}
        {hasData(job.important_links) && (
          <SectionBlock title="Important Links">
            <ImportantLinks links={job.important_links} category={cat} />
          </SectionBlock>
        )}

      </main>
      <Footer />
    </div>
  );
}
